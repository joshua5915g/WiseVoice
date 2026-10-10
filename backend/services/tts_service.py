import math
import struct
import uuid
import wave
from pathlib import Path

import edge_tts


class TTSService:
    def __init__(self, output_dir: str = './generated') -> None:
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True, parents=True)

    def _map_speed(self, speed: str) -> str:
        mapping = {
            '1.0': '+0%',
            '1.25': '+25%',
            '1.5': '+50%',
            '2.0': '+100%',
            '+0%': '+0%',
            '+25%': '+25%',
            '+50%': '+50%',
            '+100%': '+100%',
        }
        return mapping.get(str(speed), '+0%')

    def _create_fallback_audio(self, output_path: Path) -> None:
        sample_rate = 22050
        duration_seconds = 1.5
        amplitude = 0.18
        total_samples = int(sample_rate * duration_seconds)
        base_frequency = 220

        with wave.open(str(output_path), 'wb') as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)
            wav_file.setframerate(sample_rate)

            frames = []
            for i in range(total_samples):
                phrase = (i / sample_rate) * 2
                value = amplitude * 32767 * math.sin(2 * math.pi * (base_frequency + 20 * math.sin(phrase)) * i / sample_rate)
                frames.append(struct.pack('<h', int(value)))
            wav_file.writeframes(b''.join(frames))

    async def generate_audio(self, text: str, voice: str, speed: str) -> str:
        cleaned_text = text.strip()
        if not cleaned_text:
            raise ValueError('Text is required for TTS generation.')

        rate = self._map_speed(speed)
        output_name = f'{uuid.uuid4().hex}.mp3'
        output_path = self.output_dir / output_name

        try:
            communicate = edge_tts.Communicate(cleaned_text, voice=voice, rate=rate)
            await communicate.save(str(output_path))
        except Exception:
            fallback_name = f'{uuid.uuid4().hex}.wav'
            fallback_path = self.output_dir / fallback_name
            self._create_fallback_audio(fallback_path)
            return f'/generated/{fallback_name}'

        return f'/generated/{output_name}'
