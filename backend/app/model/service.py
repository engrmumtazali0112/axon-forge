from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime


class ServiceCreate(BaseModel):
    title: str
    description: str
    is_active: bool = True

    @field_validator("title")
    @classmethod
    def title_not_empty(cls, v):
        if len(v.strip()) < 2:
            raise ValueError("Title must be at least 2 characters")
        return v.strip()

    @field_validator("description")
    @classmethod
    def desc_not_empty(cls, v):
        if len(v.strip()) < 10:
            raise ValueError("Description must be at least 10 characters")
        return v.strip()


class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None


class ServiceResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    photo_url: Optional[str]
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True


class ServiceListResponse(BaseModel):
    services: list[ServiceResponse]
    total: int