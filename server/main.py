from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import shutil

app = FastAPI()

@app.post('/upload')
def upload_file(uploaded_file: UploadFile = File(...)):
    path = f"data/{uploaded_file.filename}"
    with open(path, 'w+b') as file:
        shutil.copyfileobj(uploaded_file.file, file)

    return {
        'file': uploaded_file.filename,
        'content': uploaded_file.content_type,
        'path': path,
    }