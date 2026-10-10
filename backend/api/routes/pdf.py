from fastapi import APIRouter, File, UploadFile

from services.pdf_service import PDFService, extract_and_clean_pdf

router = APIRouter(tags=['pdf'])
pdf_service = PDFService(storage_dir='./uploads')


@router.post('/pdf/parse')
async def parse_pdf(file: UploadFile = File(...)):
    content = await file.read()
    parsed = extract_and_clean_pdf(content)

    chapters = [{
        'id': f'chapter-{index + 1}',
        'title': f'Chapter {index + 1}',
        'paragraphs': [chunk['text']],
        'pages': 1,
        'status': 'ready'
    } for index, chunk in enumerate(parsed['chunks'])]

    return {
        'project_id': 'wisevoice-demo',
        'total_pages': parsed['total_pages'],
        'total_chunks': parsed['total_chunks'],
        'chunks': parsed['chunks'],
        'chapters': chapters,
        'status': 'parsed'
    }
