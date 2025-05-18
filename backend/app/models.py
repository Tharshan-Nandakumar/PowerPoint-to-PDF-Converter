from enum import Enum

class JobStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    FAILURE = "failure"

class JobInfo:
    def __init__(self, filename: str):
        self.filename = filename
        self.status: JobStatus = JobStatus.PENDING
        self.result: bytes = b""
        self.error: str = ""