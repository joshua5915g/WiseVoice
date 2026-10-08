from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes.upload import router as upload_router
from api.routes.dialogue import router as dialogue_router
from api.routes.audio import router as audio_router

app = FastAPI(title='PageTale API', version='0.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(upload_router, prefix='/api')
app.include_router(dialogue_router, prefix='/api')
app.include_router(audio_router, prefix='/api')


@app.get('/health')
def health_check() -> dict:
    return {'status': 'ok', 'service': 'pagetale-backend'}
