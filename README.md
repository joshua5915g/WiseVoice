# PageTale

PageTale is an AI-powered PDF-to-audiobook generator that extracts book content, identifies narrator vs. character dialogue, and synthesizes multi-voice audiobook chapters.

## Stack

- Frontend: Next.js 15 + TypeScript + Tailwind CSS
- Backend: FastAPI + Python 3.11+
- AI: Google Gemini via google-genai
- Audio: edge-tts or gTTS + pydub

## Repositories

- Frontend: `/frontend`
- Backend: `/backend`

## Local development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Current phase

This repository is initialized with the Phase 1 project skeleton and MVP UI/API layout.
