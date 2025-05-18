// components/common/FileCard.tsx
import { FC } from "react";

type Props = {
  title: string;
  subtitle: string;
};

export const FileCard: FC<Props> = ({ title, subtitle }) => (
  <div className="flex flex-col items-center gap-2 border border-gray-300 rounded-xl p-4 shadow-md">
    <p className="text-gray-800 font-semibold text-lg">{title}</p>
    <p className="text-gray-600 text-sm font-normal">{subtitle}</p>
  </div>
);
