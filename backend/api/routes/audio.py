from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=['audio'])


class GenerateAudioBody(BaseModel):
    chapter_id: str


@router.post('/generate-audio')
def generate_audio(body: GenerateAudioBody):
    return {
        'chapter_id': body.chapter_id,
        'audio_url': '/generated/sample-chapter.mp3',
        'duration_seconds': 238.5,
        'status': 'generated'
    }
