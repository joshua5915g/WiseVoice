from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=['dialogue'])


class ParseDialogueBody(BaseModel):
    chapter_id: str


@router.post('/parse-dialogue')
def parse_dialogue(body: ParseDialogueBody):
    return {
        'chapter_id': body.chapter_id,
        'segments': [
            {'id': 'seg-1', 'text': 'The narrator introduced the scene.', 'speaker': 'narrator'},
            {'id': 'seg-2', 'text': 'I have never seen such a strange place.', 'speaker': 'male_character'},
            {'id': 'seg-3', 'text': 'Then let us begin the adventure together.', 'speaker': 'female_character'}
        ]
    }
