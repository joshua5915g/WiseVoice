from fastapi import APIRouter, File, UploadFile

router = APIRouter(tags=['upload'])


@router.post('/upload-pdf')
def upload_pdf(file: UploadFile = File(...)):
    return {
        'project_id': 'demo-project',
        'chapters': [
            {
                'id': 'chapter-1',
                'title': 'Chapter 1',
                'text': 'This is a placeholder extracted chapter from the uploaded PDF.',
                'pages': 12
            }
        ]
    }
