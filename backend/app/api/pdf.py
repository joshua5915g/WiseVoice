from fastapi import APIRouter, HTTPException, UploadFile, File
from app.services.pdf import extract_and_clean_pdf

router = APIRouter()


@router.post('/parse')
async def parse_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail='Only PDF files are supported.')

    try:
        contents = await file.read()
        result = extract_and_clean_pdf(contents)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'PDF Processing Error: {str(e)}')
