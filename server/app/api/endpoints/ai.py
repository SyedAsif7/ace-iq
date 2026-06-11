from fastapi import APIRouter, UploadFile, File, Body, HTTPException
from typing import List, Optional
from app.core.ocr_engine import OCREngine
from app.core.nlp_engine import ZuzuEngine
from app.core.match_score import MatchScoreEngine
from app.core.nudge_engine import NudgeEngine
from app.core.crawler import EventCrawler
from app.models.schemas import UserProfile, Event, UserBehavior, ChatMessage

router = APIRouter()

# Initialize AI Services
ocr_engine = OCREngine()
zuzu_engine = ZuzuEngine()
match_engine = MatchScoreEngine()
nudge_engine = NudgeEngine()
crawler = EventCrawler()

# Mock data for initialization
mock_events = [
    {"id": 1, "title": "Hackathon 360", "description": "International level hackathon for developers and designers.", "category": "Tech"},
    {"id": 2, "title": "Cultural Fest 2026", "description": "Annual cultural celebration with music and dance.", "category": "Culture"},
    {"id": 3, "title": "Startup Summit", "description": "Networking and pitching event for student entrepreneurs.", "category": "Business"},
]
zuzu_engine.train_matcher(mock_events)

@router.post("/ocr", response_model=dict)
async def process_poster(file: UploadFile = File(...)):
    content = await file.read()
    text = ocr_engine.extract_text(content)
    details = ocr_engine.parse_event_details(text)
    return {"raw_text": text, "extracted_details": details}

@router.post("/zuzu/chat")
async def zuzu_chat(payload: ChatMessage):
    entities = zuzu_engine.extract_entities(payload.message)
    matches = zuzu_engine.match_events(payload.message)
    return {
        "response": f"I found some events that might interest you based on your message.",
        "entities": entities,
        "recommendations": matches
    }

@router.post("/match")
async def get_match_score(user_profile: UserProfile, event: Event):
    score = match_engine.calculate_score(user_profile.dict(), event.dict())
    return {"match_score": score}

@router.post("/nudges/check")
async def check_nudges(behavior: UserBehavior, profile: UserProfile):
    nudge = nudge_engine.evaluate_signals(behavior.dict(), profile.dict())
    return {"nudge": nudge}

@router.get("/seed")
async def seed_events(urls: List[str]):
    events = crawler.run_seeder(urls)
    return {"count": len(events), "events": events}
