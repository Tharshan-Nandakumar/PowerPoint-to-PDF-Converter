import axios from "axios";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export const submitConversion = (file: File) => {
  const data = new FormData();
  data.append("file", file);
  return API.post<{ job_id: string; status: string }>("/convert/", data);
};

export const getStatus = (jobId: string) => {
  return API.get<{ job_id: string; status: string; s3_url?: string }>(`/status/${jobId}`);
};

export const downloadResult = (jobId: string) => {
  return API.get(`/result/${jobId}`, { responseType: "blob" });
};
