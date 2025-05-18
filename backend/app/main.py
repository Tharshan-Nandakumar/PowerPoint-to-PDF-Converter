from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import origins
from .routers import convert, status, result

app = FastAPI(title="PPT→PDF Converter with Status Polling")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(convert.router, prefix="/convert", tags=["convert"])
app.include_router(status.router, prefix="/status", tags=["status"])
app.include_router(result.router, prefix="/result", tags=["result"])