from fastapi import APIRouter
from pydantic import BaseModel

from services.tts_service import TTSService

router = APIRouter(tags=['tts'])
tts_service = TTSService(output_dir='./generated')


class TTSRequest(BaseModel):
    text: str
    voice: str = 'en-US-AriaNeural'
    rate: str = '1.0'


@router.post('/tts/generate')
async def generate_tts(payload: TTSRequest):
    audio_url = await tts_service.generate_audio(payload.text, payload.voice, payload.rate)
    return {
        'audio_url': audio_url,
        'status': 'generated'
    }
