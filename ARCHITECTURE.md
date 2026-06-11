# Architecture

## Overview
ACE IQ follows a modular 4‑layer architecture to ensure scalability and maintainability.

## Layers

### 1. Data Layer (`server/app/core/`)
- **crawler.py**: Web scraping for events from university portals
- **ocr_engine.py**: OCR extraction from event posters
- **organizer_engine.py**: Tools for event organizers

### 2. Processing Layer (`server/app/core/`)
- **nlp_engine.py**: NLP for user intent and entity extraction
- **match_score.py**: Content‑based filtering for event recommendations
- **nudge_engine.py**: Predictive nudges based on user behavior

### 3. API Layer (`server/app/api/`)
- RESTful endpoints built with FastAPI
- Structured request/response schemas in `server/app/models/schemas.py`

### 4. Application Layer (`client/`)
- React + TypeScript + Vite frontend
- Tailwind CSS for styling
- Framer Motion for animations
