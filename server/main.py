from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from typing import List, Annotated 
from chatwithpdf import get_pdf_text , get_text_chunks, get_vector_store , user_input

app = FastAPI()
pdf_docs = []


@app.post("/upload")
async def upload_file(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")
    for file in files:
        try:
            # Read the file contents
            contents = await file.read()
            
            # Example validation: check if the file is a PDF
            if file.content_type != 'application/pdf':
                raise HTTPException(status_code=400, detail=f"File '{file.filename}' is not a PDF")

            # Append the file information to pdf_docs
            pdf_docs.append({"filename": file.filename, "content_type": file.content_type, "content": contents})
            raw_text = get_pdf_text(pdf_docs)
            text_chunks = get_text_chunks(raw_text)
            get_vector_store(text_chunks)

            return {'content': "train successfully"}
        
        except HTTPException as e:
            raise e

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal server error while processing file '{file.filename}'")

    return {'content': "Files uploaded successfully"}


# @app.get("/train")
# async def train_data():
#     raw_text = get_pdf_text(pdf_docs)
#     text_chunks = get_text_chunks(raw_text)
#     get_vector_store(text_chunks)

#     return {'content': "train successfully"}
    

@app.post("/userInput")
async def userInput(userQuestion: Annotated[str, Form()]):
    try:
        answer = user_input(userQuestion)
        return {'result': answer}
    except HTTPException as e:
        return HTTPException(status_code=500, content={"detail": e.detail})