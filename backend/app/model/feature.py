from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class FeatureCreate(BaseModel):
    title: str
    description: str
    icon: Optional[str] = None
    order_index: int = 0
    is_active: bool = True
    badge_text: Optional[str] = None


class FeatureUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    order_index: Optional[int] = None
    is_active: Optional[bool] = None
    badge_text: Optional[str] = None


class FeatureResponse(BaseModel):
    id: int
    title: str
    description: str
    photo_url: Optional[str]
    icon: Optional[str]
    order_index: int
    is_active: bool
    badge_text: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True