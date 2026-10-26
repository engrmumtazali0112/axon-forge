"""
Axon Forge — AI agent router
============================
POST /api/v1/agent/chat — 24/7 AI customer-service agent.

The endpoint is stateless: the client sends the conversation so far in `history`
and gets the assistant's next reply back.
"""

import os
import time
from collections import defaultdict, deque
from typing import Literal

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field

from app.services import ai_service

router = APIRouter(prefix="/api/v1/agent", tags=["AI Agent"])


# ─── Schemas ──────────────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    # Only user/assistant roles are accepted, so clients can't inject system prompts.
    role:    Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000, description="The visitor's new message")
    history: list[ChatMessage] = Field(default_factory=list, max_length=20, description="Earlier turns, oldest first")


class ChatResponse(BaseModel):
    reply:         str
    lead_captured: bool = Field(False, description="True once a hiring enquiry was passed to the team")


# ─── Rate limiting (per IP, in memory) ────────────────────────────────────────
# Protects your OpenAI credits. On serverless hosts (e.g. Vercel) each instance
# keeps its own counters, so treat this as a basic guard, not a hard limit.

RATE_LIMIT_PER_MIN = int(os.getenv("AGENT_RATE_LIMIT_PER_MIN", "20"))
_WINDOW_SECONDS    = 60
_hits: dict[str, deque] = defaultdict(deque)


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _enforce_rate_limit(request: Request) -> None:
    now = time.monotonic()
    if len(_hits) > 5000:                       # keep memory bounded
        for ip in [k for k, q in _hits.items() if not q or now - q[-1] > _WINDOW_SECONDS]:
            del _hits[ip]
    hits = _hits[_client_ip(request)]
    while hits and now - hits[0] > _WINDOW_SECONDS:
        hits.popleft()
    if len(hits) >= RATE_LIMIT_PER_MIN:
        raise HTTPException(429, "Too many messages. Please wait a minute and try again.",
                            headers={"Retry-After": str(_WINDOW_SECONDS)})
    hits.append(now)


# ─── Endpoint ─────────────────────────────────────────────────────────────────

@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, request: Request):
    """Chat with the Axon Forge AI agent."""
    _enforce_rate_limit(request)
    try:
        result = await ai_service.generate_reply(
            payload.message,
            [m.model_dump() for m in payload.history],
        )
    except ai_service.AgentNotConfiguredError:
        raise HTTPException(503, "The AI agent isn't configured yet. Please try again later.")
    except ai_service.AgentUnavailableError:
        raise HTTPException(
            502,
            f"The AI agent is temporarily unavailable. Please try again, or email {ai_service.CONTACT_EMAIL}.",
        )
    return ChatResponse(**result)
