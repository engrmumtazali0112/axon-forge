from pydantic import BaseModel, field_validator
from typing import Optional, List
from datetime import datetime
from app.models.blog import PostStatus


class BlogPostCreate(BaseModel):
    title: str
    description: str
    content: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    status: PostStatus = PostStatus.draft
    is_featured: bool = False
    read_time_minutes: Optional[int] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

    @field_validator("title")
    @classmethod
    def title_not_empty(cls, v):
        if len(v.strip()) < 3:
            raise ValueError("Title must be at least 3 characters")
        return v.strip()

    @field_validator("description")
    @classmethod
    def desc_not_empty(cls, v):
        if len(v.strip()) < 10:
            raise ValueError("Description must be at least 10 characters")
        return v.strip()


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[str] = None
    status: Optional[PostStatus] = None
    is_featured: Optional[bool] = None
    read_time_minutes: Optional[int] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None


class BlogPostResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    content: Optional[str]
    photo_url: Optional[str]
    category: Optional[str]
    tags: Optional[str]
    status: PostStatus
    is_featured: bool
    view_count: int
    read_time_minutes: Optional[int]
    created_at: datetime
    updated_at: Optional[datetime]
    published_at: Optional[datetime]

    class Config:
        from_attributes = True


class BlogListResponse(BaseModel):
    items: List[BlogPostResponse]
    total: int
    page: int
    per_page: int