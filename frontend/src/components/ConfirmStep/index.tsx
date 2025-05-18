// components/ConfirmStep/index.tsx
import { FC } from "react";
import { formatBytes } from "@/lib/format"; // helper to format bytes
import { FileCard } from "../common/FileCard";
import { BorderedPanel } from "../common/BorderPanel";
import { ButtonRow } from "../common/ButtonRow";

type Props = {
  file: File;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmStep: FC<Props> = ({ file, onCancel, onConfirm }) => {
  return (
    <BorderedPanel>
      {/* File info */}
      <FileCard title={file.name} subtitle={formatBytes(file.size)} />
      {/* Description */}
      <div className="bg-blue-25 border-2 border-blue-200 rounded-xl p-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked
            readOnly
            className="h-4 w-4 top-0.5 text-blue-600"
          />
          <div className="flex flex-col text-sm">
            <span className="font-medium text-blue-800">Convert to PDF</span>
            <span className="text-blue-700">
              Best quality, retains images and other assets.
            </span>
          </div>
        </label>
      </div>

      {/* Buttons */}
      <ButtonRow
        buttons={[
          { label: "Cancel", onClick: onCancel, variant: "secondary" },
          { label: "Convert", onClick: onConfirm, variant: "primary" },
        ]}
      />
    </BorderedPanel>
  );
};
