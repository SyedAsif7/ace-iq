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
    {"id": 1, "title": "Inter-College Hackathon", "description": "A 24-hour coding challenge for tech enthusiasts to build innovative solutions.", "category": "Tech", "location": "Mumbai", "date": "2026-06-15"},
    {"id": 2, "title": "Robotics Workshop", "description": "Hands-on experience with Arduino, sensors, and autonomous systems.", "category": "Engineering", "location": "Pune", "date": "2026-06-20"},
    {"id": 3, "title": "Music Night 2026", "description": "Annual celebration featuring live performances from top university bands.", "category": "Culture", "location": "Mumbai", "date": "2026-07-02"},
    {"id": 4, "title": "AI & ML Summit", "description": "Explore the latest trends in artificial intelligence and machine learning with industry experts.", "category": "Tech", "location": "Ahmedabad", "date": "2026-06-28"},
    {"id": 5, "title": "Startup Pitch Competition", "description": "Showcase your business ideas and win funding opportunities.", "category": "Business", "location": "Online", "date": "2026-07-10"},
]
zuzu_engine.train_matcher(mock_events)

@router.get("/events", response_model=List[Event])
async def get_all_events():
    return [Event(**event) for event in mock_events]

@router.post("/events/matched", response_model=List[Event])
async def get_matched_events(user_profile: UserProfile):
    events_with_scores = []
    for event_data in mock_events:
        event = Event(**event_data)
        score = match_engine.calculate_score(user_profile.dict(), event_data)
        event.match_score = score
        events_with_scores.append(event)
    # Sort by match score descending
    return sorted(events_with_scores, key=lambda x: x.match_score, reverse=True)

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
