// components/ResultStep/index.tsx
import { FC } from "react";
import PdfIcon from "@/icons/PdfIcon";
import CheckIcon from "@/icons/CheckIcon";
import { BorderedPanel } from "../common/BorderPanel";
import { ButtonRow } from "../common/ButtonRow";

type Props = { s3Url?: string; onReset: () => void };

export const ResultStep: FC<Props> = ({ s3Url, onReset }) => (
  <BorderedPanel>
    <div className="flex flex-col w-full border border-gray-300 p-4 gap-6 rounded-xl items-center">
      <div className="relative w-fit">
        <PdfIcon />
        <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-[-50%]">
          <CheckIcon />
        </div>
      </div>
      <p className="text-gray-900 leading-8 text-lg font-semibold">
        File converted successfully!
      </p>
    </div>
    <ButtonRow
      buttons={[
        { label: "Convert another", onClick: onReset, variant: "secondary" },
        { label: "Download file", href: s3Url, variant: "primary" },
      ]}
    />
  </BorderedPanel>
);
