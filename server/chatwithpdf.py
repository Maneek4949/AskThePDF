from PyPDF2 import PdfReader
import io
from fastapi import HTTPException
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from typing import List
load_dotenv()

genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))




def get_pdf_text(pdf_docs: List[dict]) -> str:
    text = ""
    for pdf in pdf_docs:
        try:
            pdf_reader = PdfReader(io.BytesIO(pdf["content"]))
            for page in pdf_reader.pages:
                extracted_text = page.extract_text()
                text += extracted_text

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error reading PDF file '{pdf['filename']}'")
    return text



def get_text_chunks(text):
    try:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=2500, chunk_overlap=250)
        chunks = text_splitter.split_text(text)
    except Exception as e:
            raise HTTPException(status_code=500, detail="Error splitting text into chunks")
    return chunks


def get_vector_store(text_chunks):
    try:
        embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
        print("Embedding",embeddings)
        vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
        print("Vector Store",vector_store)
        vector_store.save_local("faiss_index")
    except Exception as e:
            raise HTTPException(status_code=500, detail="Error creating vector store")


def get_conversational_chain():

    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details, if the answer is not in
    provided context just say, "answer is not available in the context", don't provide the wrong answer\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """

    model = ChatGoogleGenerativeAI(model="gemini-pro",temperature=0.3)
    prompt = PromptTemplate(template = prompt_template, input_variables = ["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)

    return chain



def user_input(user_question: str) -> dict:
    try:
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
        docs = new_db.similarity_search(user_question)
        chain = get_conversational_chain()
        response = chain({"input_documents": docs, "question": user_question}, return_only_outputs=True)
        return {'answer': response["output_text"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing user input")



