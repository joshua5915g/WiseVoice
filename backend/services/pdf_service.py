from __future__ import annotations

from pathlib import Path


class PDFService:
    def __init__(self, storage_dir: str = './uploads') -> None:
        self.storage_dir = Path(storage_dir)
        self.storage_dir.mkdir(exist_ok=True, parents=True)

    def extract_text(self, file_path: str) -> str:
        return f'Placeholder text extracted from {file_path}'

    def split_into_chapters(self, text: str) -> list[dict]:
        return [{
            'id': 'chapter-1',
            'title': 'Chapter 1',
            'text': text,
            'pages': 1
        }]
