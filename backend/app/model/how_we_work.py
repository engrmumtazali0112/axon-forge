from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class HowWeWorkCreate(BaseModel):
    step_number: int
    title: str
    description: str
    icon: Optional[str] = None
    color: Optional[str] = "green"
    duration: Optional[str] = None
    is_active: bool = True


class HowWeWorkUpdate(BaseModel):
    step_number: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    color: Optional[str] = None
    duration: Optional[str] = None
    is_active: Optional[bool] = None


class HowWeWorkResponse(BaseModel):
    id: int
    step_number: int
    title: str
    description: str
    photo_url: Optional[str]
    icon: Optional[str]
    color: Optional[str]
    duration: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True