from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from ..services.conversion_service import jobs
from ..services.s3_service import make_public_presigned_url
from ..config import PDF_FOLDER
from ..models import JobStatus

router = APIRouter()

@router.get("/{job_id}", summary="Poll conversion status")
async def get_status(job_id: str):
    job = jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    resp = {"job_id": job_id, "status": job.status}
    if job.status == JobStatus.SUCCESS:
        key_pdf = f"{PDF_FOLDER}{job.filename.rsplit('.', 1)[0]}.pdf"
        resp["s3_url"] = make_public_presigned_url(key_pdf)
    elif job.status == JobStatus.FAILURE:
        resp["error"] = job.error

    return JSONResponse(content=resp)