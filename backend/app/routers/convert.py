import uuid
from fastapi import APIRouter, File, UploadFile, HTTPException, BackgroundTasks
from ..services.conversion_service import jobs, convert_job
from ..services.s3_service import upload_to_s3
from ..config import PPT_FOLDER
from ..models import JobInfo

router = APIRouter()

@router.post("/", summary="Submit a PPT/PPTX/ODP for PDF conversion")
async def submit_conversion(file: UploadFile = File(...), bg: BackgroundTasks = None):
    if not file.filename.lower().endswith((".ppt", ".pptx", ".odp")):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    content = await file.read()
    job_id = uuid.uuid4().hex
    jobs[job_id] = JobInfo(file.filename)

    key_ppt = PPT_FOLDER + file.filename
    try:
        upload_to_s3(content, key_ppt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PPT upload failed: {e}")

    bg.add_task(convert_job, job_id, content, file.filename)

    return {"job_id": job_id, "status": jobs[job_id].status}