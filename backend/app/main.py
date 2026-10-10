from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import pdf, tts

app = FastAPI(title='WiseVoice API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', '*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(pdf.router, prefix='/api/pdf', tags=['PDF'])
app.include_router(tts.router, prefix='/api/tts', tags=['TTS'])


@app.get('/')
def root():
    return {'status': 'WiseVoice Backend Running'}
