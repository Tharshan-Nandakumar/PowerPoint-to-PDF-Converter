import os

# === MinIO / S3 setup ===
os.environ.setdefault("AWS_ACCESS_KEY_ID", "minioadmin")
os.environ.setdefault("AWS_SECRET_ACCESS_KEY", "minioadmin")
os.environ.setdefault("AWS_REGION", "us-east-1")

S3_PUBLIC_URL = os.getenv("LOCAL_S3_PUBLIC_URL", "http://localhost:9000")
S3_ENDPOINT = "http://minio:9000"
S3_BUCKET = "my-bucket"
PPT_FOLDER = "uploads/ppt/"
PDF_FOLDER = "uploads/pdf/"

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

UNOSERVER_API_URL = "http://unoserver:2004/request"