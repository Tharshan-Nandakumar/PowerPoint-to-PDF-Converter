import httpx
from ..models import JobInfo, JobStatus
from ..config import UNOSERVER_API_URL
from .s3_service import upload_to_s3

jobs: dict[str, JobInfo] = {}

async def convert_job(job_id: str, content: bytes, filename: str):
    job = jobs[job_id]
    job.status = JobStatus.RUNNING

    files = {"file": (filename, content)}
    data = {"convert-to": "pdf"}

    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(UNOSERVER_API_URL, files=files, data=data, timeout=None)
        except Exception as e:
            job.status = JobStatus.FAILURE
            job.error = str(e)
            return

    if resp.status_code == 200:
        pdf_bytes = resp.content
        job.result = pdf_bytes
        job.status = JobStatus.SUCCESS
        key_pdf = f"uploads/pdf/{filename.rsplit('.', 1)[0]}.pdf"
        try:
            upload_to_s3(pdf_bytes, key_pdf)
        except Exception as e:
            job.status = JobStatus.FAILURE
            job.error = f"PDF upload failed: {e}"
    else:
        job.status = JobStatus.FAILURE
        job.error = f"Conversion failed: {resp.status_code} {resp.text}"