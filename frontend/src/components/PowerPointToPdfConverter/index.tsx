// components/PowerPointToPdfConverter/index.tsx
"use client";
import { useState } from "react";
import { ChooseFileStep } from "../ChooseFileStep";
import { ConfirmStep } from "../ConfirmStep";
import { ProgressStep } from "../ProgressStep";
import { ResultStep } from "../ResultStep";
import { submitConversion } from "@/lib/api";

type Step = "choose" | "confirm" | "progress" | "result";

export const PowerPointToPdfConverter = () => {
  const [step, setStep] = useState<Step>("choose");
  const [file, setFile] = useState<File>();
  const [jobId, setJobId] = useState<string>();
  const [s3Url, setS3Url] = useState<string>();

  // Called from ChooseFileStep
  const handleFileSelected = (f: File) => {
    setFile(f);
    setStep("confirm");
  };

  // Cancel resets everything
  const handleCancel = () => {
    setFile(undefined);
    setStep("choose");
  };

  // On confirm: kick off conversion, go to progress
  const handleConfirm = () => {
    if (!file) return;
    submitConversion(file).then((res) => {
      setJobId(res.data.job_id);
      setStep("progress");
    });
  };

  // Called when ProgressStep completes
  const handleComplete = (s3?: string) => {
    setS3Url(s3 || "");
    setStep("result");
  };

  // Reset to start over
  const handleReset = () => {
    setFile(undefined);
    setJobId(undefined);
    setS3Url(undefined);
    setStep("choose");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {step === "choose" && (
        <ChooseFileStep onFileSelected={handleFileSelected} />
      )}
      {step === "confirm" && file && (
        <ConfirmStep
          file={file}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
      {step === "progress" && jobId && file && (
        <ProgressStep
          jobId={jobId}
          file={file}
          onComplete={handleComplete}
          onError={(msg) => {
            console.error(msg);
            handleCancel();
          }}
        />
      )}
      {step === "result" && s3Url && (
        <ResultStep s3Url={s3Url} s3Url={s3Url} onReset={handleReset} />
      )}
    </div>
  );
};
