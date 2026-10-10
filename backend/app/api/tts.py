import io
import math
import struct
import uuid
import wave
from pathlib import Path

import edge_tts
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel

router = APIRouter()

VOICE_MAPPING = {
    'male_us': 'en-US-GuyNeural',
    'female_us': 'en-US-AriaNeural',
    'male_uk': 'en-GB-RyanNeural',
    'female_uk': 'en-GB-SoniaNeural',
}


def create_local_fallback_audio(output_path: Path) -> None:
    output_path.parent.mkdir(exist_ok=True, parents=True)
    sample_rate = 22050
    duration_seconds = 1.5
    amplitude = 0.18
    total_samples = int(sample_rate * duration_seconds)

    with wave.open(str(output_path), 'wb') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)

        frames = []
        for i in range(total_samples):
            value = amplitude * 32767 * math.sin(2 * math.pi * (220 + 18 * math.sin(i / 200)) * i / sample_rate)
            frames.append(struct.pack('<h', int(value)))
        wav_file.writeframes(b''.join(frames))


class TTSRequest(BaseModel):
    text: str
    voice: str = 'male_us'
    rate: str = '+0%'


@router.post('/generate')
async def generate_tts(request: TTSRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail='Text cannot be empty.')

    selected_voice = VOICE_MAPPING.get(request.voice, request.voice)

    try:
        communicate = edge_tts.Communicate(text=request.text, voice=selected_voice, rate=request.rate)
        audio_bytes = io.BytesIO()

        async for chunk in communicate.stream():
            if chunk['type'] == 'audio':
                audio_bytes.write(chunk['data'])

        audio_bytes.seek(0)
        return StreamingResponse(
            audio_bytes,
            media_type='audio/mpeg',
            headers={'Content-Disposition': 'inline; filename=speech.mp3'},
        )
    except Exception:
        fallback_name = f'{uuid.uuid4().hex}.wav'
        fallback_path = Path('generated') / fallback_name
        create_local_fallback_audio(fallback_path)
        return FileResponse(
            fallback_path,
            media_type='audio/wav',
            headers={'Content-Disposition': 'inline; filename=speech-fallback.wav'},
        )
