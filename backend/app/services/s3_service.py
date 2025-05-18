import os
import io
import boto3
from urllib.parse import urlparse, urlunparse
from ..config import S3_ENDPOINT, S3_BUCKET, S3_PUBLIC_URL

s3_client = boto3.client(
    "s3",
    endpoint_url=S3_ENDPOINT,
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION"),
    config=boto3.session.Config(
        s3={'addressing_style': 'path'}
    )
)

# Ensure the bucket exists
try:
    s3_client.create_bucket(Bucket=S3_BUCKET)
except s3_client.exceptions.BucketAlreadyOwnedByYou:
    pass


def upload_to_s3(data: bytes, key: str):
    s3_client.upload_fileobj(io.BytesIO(data), S3_BUCKET, key)


def delete_from_s3(key: str):
    s3_client.delete_object(Bucket=S3_BUCKET, Key=key)


def make_public_presigned_url(key: str, expires: int = 3600) -> str:
    internal_url = s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": S3_BUCKET, "Key": key},
        ExpiresIn=expires,
    )
    parsed = urlparse(internal_url)
    public = parsed._replace(
        scheme=urlparse(S3_PUBLIC_URL).scheme,
        netloc=urlparse(S3_PUBLIC_URL).netloc
    )
    return urlunparse(public)