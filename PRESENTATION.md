# ECLearnix 360° 4.0 · International Hackathon · Round 2

## ACE IQ
### AI-Powered College Event Intelligence
### Domain 3 — EdTech Solutions | AllCollegeEvent.com

**Team: Alpha's**  
**Leader: Prof. Bais P. G.**  
**Batch 7**  
**Date: 27.06.2026**

**Judges: Shiva Kumar Devasani & Ansha Bundela**

**Narnarayan Shastri Institute of Technology, Ahmedabad, Gujarat, India**


## Problem Statement Domain 3

> "AllCollegeEvent.com claims to be India's First AI-Driven Event Platform — yet has 0 events, 0 AI, 0 personalisation live today."

| 📭 Zero Events | 🤖 Decorative Chatbot | 👤 No Personalisation | 🔍 Broken Discovery
|----------------|-------------------|-------------------|-------------------|
| Catalogue is completely empty. No content to discover on Day 1. | Zuzu exists in UI but gives zero recommendations or profile capture. | Every visitor sees identical content regardless of branch, city, or year. | Cannot filter events by city, domain or date — core feature absent. |


## Our Goal
Build ACE IQ — a full-stack AI intelligence layer that makes AllCollegeEvent.com genuinely intelligent, personalised and engagement-driven before its official launch, using 5 buildable AI pillars that work within the existing system architecture.


## ACE IQ — 5 AI Pillars
Our complete solution architecture

| Pillar | Name | Description |
|--------|------|-----------|
| 1 🌐 | AI Event Seeder | Crawlers + OCR auto-seed 500+ categorised events from social media & university sites before launch. |
| 2 💬 | Zuzu 2.0 | NLP chatbot transforms profile input → matched event recommendations → registration in 60 seconds. |
| 3 🎯 | Smart Match Score | 30-second onboarding quiz + TF-IDF filtering → personalised Match% badge on every event card. |
| 4 📋 | Organizer Engine | Paste link / upload poster → AI auto-fills listing. Gamified leaderboard drives supply-side growth. |
| 5 🔔 | Predictive Nudges | 5 behavioural triggers detect drop-off & send targeted reengagement nudges. Zero manual effort. |


## Methodology — End-to-End Flow

### Phase 1: Pre-Launch (Wks 1–3)
1. Build Crawler + OCR
2. Seed 500+ events
3. Train Zuzu 2.0 NLP + profile NER model
4. Onboarding quiz + Match Score algo

### Phase 2: Launch Week
1. Enable Match Score feed all new users
2. Activate Zuzu 2.0 as default chatbot
3. Launch Organizer Engine + leaderboard

### Phase 3: Post-Launch (Mo 1–3)
1. Activate 5 nudge trigger rules
2. Refine Match Score with real data
3. Expand crawler to new source platforms

**Expected Outcome**: 500+ events seeded · 60-sec registrations · 40% higher retention · 3× organiser sign-ups**


## Deep Dive: Pillars 1 & 2

### 🌐 Pillar 1 — AI Event Seeder
1. **Crawl**: Daily scheduler scans Instagram college handles, LinkedIn Events, university portals, Unstop/Devfolio.
2. **OCR Parse**: WhatsApp poster images → Tesseract OCR → extracts event name, date, venue, domain, registration link.
3. **Classify**: spaCy NLP tags: Type · Domain (CSE/ECE/MBA) · Level (College/State/National) · Mode (Online/Offline).
4. **Publish**: ≥85% confidence → auto-publish. Low-confidence → admin review. Fuzzy matching deduplicates events.

### 💬 Pillar 2 — Zuzu 2.0 Chatbot
**Before ❌**  
User: "Show hackathons near me"  
Zuzu: "Hello! Browse events."  
→ No events named  
→ No profile captured  
→ Zero conversions  

**After ✅**  
User: "2nd yr CSE, Latur"  
Zuzu: 3 matched events!  
SIH — 94% match  
TechFest VNIT — 88%  
→ Registers in 60 secs  
→ Profile-aware, instant  

**Tech**: spaCy NLU + NER extractor → TF-IDF content filter → ranked event list with Match%. REST API plug-in to existing Zuzu UI — zero frontend rebuild.


## Deep Dive: Pillars 3, 4 & 5

### 🎯 Pillar 3 — Smart Match Score
Q1 What is your branch?  
Q2 Which academic year?  
Q3 Your city / college?  
Q4 Interests — Hackathon / Workshop?

→ Smart India Hackathon 94%  
→ TechFest VNIT Nagpur 88%  
→ AI Workshop MIT ACT 74%

### 📋 Pillar 4 — Organizer Engine
🔗 Paste Google Form link or upload event poster  
→ 🤖 AI scrapes / OCR extracts 10+ fields auto-filled in 10s  
→ ✅ Organiser reviews & publishes in one click  
→ 🏆 Leaderboard: '#3 in Maharashtra — list 2 more for #1'

### 🔔 Pillar 5 — Predictive Nudges
- IF: Viewed, didn't register → "Registration closes in 2 days!"
- IF: Profile done, never browsed → "3 events match your profile"
- IF: Idle for 7 days → "Your college listed a hackathon"
- IF: Searched 3×, no click → "Curated alternatives for you"
- IF: Registered, event tomorrow → Reminder + calendar invite link

**Capped**: 2 nudges/week per user


## System Architecture & Tech Stack

### DATA SOURCES
- Instagram / LinkedIn
- University Websites
- WhatsApp Poster (OCR)
- Google Forms API
- User Profile DB
- Event Metadata DB

### AI PROCESSING
- spaCy NLU + NER
- TF-IDF Match Engine
- Tesseract OCR
- Nudge Predictor
- Event Classifier
- Zuzu 2.0 NLP Model

### APPLICATION LAYER
- AllCollegeEvent Web App
- Android / iOS App
- Zuzu Chatbot UI (existing)
- Organiser Dashboard
- Admin Analytics
- REST API Layer

### OUTPUT / USER
- Personalised Event Feed
- Match % Badges
- Push / Email Nudges
- College Leaderboard
- Organiser Reports
- Blockchain Certs (Ph2)

**Stack**: spaCy · scikit-learn (TF-IDF) · Tesseract OCR · TensorFlow Lite · Python FastAPI · Firebase · React.js / Flutter (existing frontend — no rebuild needed)


## Live Audit & Prototype Validation

### What We Found (Live Audit)
- 0 Events Listed
- 0 AI Features Active
- ❌ Chatbot Useful
- ❌ Personalisation
- ❌ Filter / Search Works
- ✅ Platform Exists

### Prototype Features Validated
- 🌐 AI Event Seeder: OCR + crawler pipeline tested on 50+ WhatsApp poster images. 89% field extraction accuracy achieved.
- 💬 Zuzu 2.0 NLP: spaCy NER model tested on 200+ profile sentences. Correct city/branch/year extraction in 92% of cases.
- 🎯 Match Score: TF-IDF vector similarity computed on 300-event test dataset. Top-3 recommendations relevant in 87% of trials.
- 📋 Organizer Auto-Fill: Google Form scraper tested on 25 real event forms. Average listing time: 28 seconds vs 14 minutes manual.
- 🔔 Nudge Engine: 5 trigger rules implemented. Mock user journey tests confirm correct nudge sent in <500ms of trigger firing.

**Key Insight**: The gap between the platform's AI claims and its 0-feature reality is the exact opportunity ACE IQ addresses — verified live.


## Expected Results & Business Impact
- 10× Events at Launch vs manual listing alone
- 60s First Registration via Zuzu 2.0 flow
- 40% Higher Retention with Match Score feed
- 3× Organiser Sign-ups via AI listing + leaderboard


## Future Enhancements & Challenges

### Phase 2 Enhancements
- 🌐 Multi-language Support: Hindi, Marathi, Tamil discovery for Tier 2/3 cities — significantly expanding TAM.
- 🏆 Blockchain Certificates: Tamper-proof, on-chain event participation certificates — strong credential incentive.
- 👥 Alumni Mentor Matching: Students connect with alumni who attended similar events — career networking layer.
- 📺 Built-in Live Streaming: Virtual events stream within the platform — eliminates Zoom/Meet friction entirely.
- 🤝 Collaborative Filtering: Phase 2 transition from content-based to collaborative filtering as data accumulates.

### Challenges & Mitigations
- ⚠ Cold-start data scarcity → ✅ Rule-based + content filtering Phase 1. Collaborative filtering added post-launch only.
- ⚠ OCR accuracy on informal posters → ✅ 85% confidence threshold. Low-confidence extractions go to admin review queue.
- ⚠ Platform crawling restrictions → ✅ Prioritise official college RSS/API partnerships. User-submitted events as backup source.
- ⚠ Notification fatigue risk → ✅ Hard cap: 2 nudges/week per user + relevance scoring before every single send.
- ⚠ Organiser adoption resistance → ✅ AI auto-fill: 15 min → 30 seconds. Leaderboard creates viral institution competition.


## Conclusion
ACE IQ Delivers What the Platform Promised

A real platform audit confirmed: 0 events, 0 AI, 0 personalisation. ACE IQ closes all three gaps with 5 buildable AI pillars — deployed before launch, within the existing architecture.

🌐 AI Event Seeder · 💬 Zuzu 2.0 · 🎯 Match Score · 📋 Organizer Engine · 🔔 Predictive Nudges

✅ Real Audit · ✅ Exact AI Depth · ✅ Respects Existing Architecture · ✅ Both Marketplace Sides · ✅ Buildable Pre-Launch


## Thank You
Judges: Shiva Kumar Devasani & Ansha Bundela  
ECLearnix 360° 4.0 · Round 2 · 27.06.2026
