from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from io import BytesIO
from ..services.conversion_service import jobs
from ..config import PDF_FOLDER
from ..services.s3_service import delete_from_s3
from ..models import JobStatus

router = APIRouter()

@router.get("/{job_id}", summary="Download converted PDF")
async def download_result(job_id: str):
    job = jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status != JobStatus.SUCCESS:
        raise HTTPException(status_code=400, detail="Result not available yet")

    key_pdf = f"{PDF_FOLDER}{job.filename.rsplit('.', 1)[0]}.pdf"
    delete_from_s3(key_pdf)

    filename = job.filename.rsplit(".", 1)[0] + ".pdf"
    return StreamingResponse(
        BytesIO(job.result),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""}
    )