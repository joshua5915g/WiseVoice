# Wise Voice (Free Edition)

Wise Voice is a PDF-to-audiobook reader built with free Microsoft Edge neural voices through `edge-tts`. It extracts text from a PDF, cleans it into readable chapters, lets the user choose a voice and playback speed, and generates free local audiobook audio without external API costs.

## Stack

- Frontend: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- Backend: Python 3.11 + FastAPI + Uvicorn
- PDF extraction: PyMuPDF (fitz)
- TTS: edge-tts (free Microsoft Neural voices)

## Workspaces

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

## Phase 1 status

The repository now includes the starter app structure for PDF parsing, voice selection, and free Edge-TTS generation.
