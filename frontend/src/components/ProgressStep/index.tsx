// components/ProgressStep/index.tsx
import { FC, useEffect, useState } from "react";
import LoadingCircleIcon from "@/icons/LoadingCircleIcon";
import { getStatus } from "@/lib/api";
import { formatBytes } from "@/lib/format";
import { FileCard } from "../common/FileCard";
import { BorderedPanel } from "../common/BorderPanel";
import { ButtonRow } from "../common/ButtonRow";

type Props = {
  jobId: string;
  file: File;
  onComplete: (s3Url?: string) => void;
  onError?: (error: string) => void;
};

export const ProgressStep: FC<Props> = ({
  jobId,
  file,
  onComplete,
  onError,
}) => {
  const [status, setStatus] = useState<
    "pending" | "running" | "success" | "failure"
  >("pending");

  useEffect(() => {
    const interval = setInterval(() => {
      getStatus(jobId)
        .then((res) => {
          const s = res.data.status as typeof status;
          setStatus(s);

          if (s === "success") {
            clearInterval(interval);
            onComplete(res.data.s3_url);
          } else if (s === "failure") {
            clearInterval(interval);
          }
        })
        .catch((err) => {
          clearInterval(interval);
          onError?.(err.message);
        });
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId, onComplete, onError]);

  return (
    <BorderedPanel>
      {/* File info */}
      <FileCard title={file.name} subtitle={formatBytes(file.size)} />

      {/* Progress indicator */}
      <div className="flex items-center border gap-2 border-gray-300 rounded-xl p-4">
        <div className="animate-spin-pretty">
          <LoadingCircleIcon />
        </div>
        <p className="text-gray-700 font-medium text-sm">
          Converting your file
        </p>
      </div>

      {/* Buttons */}
      <ButtonRow
        buttons={[
          { label: "Cancel", disabled: true, variant: "secondary" },
          { label: "", disabled: true, variant: "primary" /* spinner only */ },
        ]}
      />
    </BorderedPanel>
  );
};
