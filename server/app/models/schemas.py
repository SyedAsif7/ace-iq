from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class UserProfile(BaseModel):
    branch: str
    year: str
    city: str
    interests: List[str] = []

class Event(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    category: Optional[str] = "General"
    location: Optional[str] = "Remote"
    date: Optional[str] = None
    match_score: Optional[float] = 0.0

class UserBehavior(BaseModel):
    last_active: datetime = Field(default_factory=datetime.now)
    views: List[Event] = []
    registrations: List[Event] = []
    searches: List[str] = []

class ChatMessage(BaseModel):
    message: str

class Nudge(BaseModel):
    type: str
    message: str
