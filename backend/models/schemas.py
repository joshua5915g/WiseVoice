from typing import List, Literal, Optional

from pydantic import BaseModel, Field

SpeakerType = Literal['narrator', 'male_character', 'female_character']


class UploadPdfRequest(BaseModel):
    filename: Optional[str] = None


class PdfChapter(BaseModel):
    id: str
    title: str
    text: str
    pages: Optional[int] = 0


class UploadPdfResponse(BaseModel):
    project_id: str
    chapters: List[PdfChapter]


class DialogueSegment(BaseModel):
    id: str
    text: str
    speaker: SpeakerType


class ParseDialogueResponse(BaseModel):
    chapter_id: str
    segments: List[DialogueSegment]


class GenerateAudioRequest(BaseModel):
    chapter_id: str
    voice_map: dict = Field(default_factory=dict)


class GenerateAudioResponse(BaseModel):
    chapter_id: str
    audio_url: str
    duration_seconds: float
    status: str
