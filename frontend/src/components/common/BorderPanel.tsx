// components/common/BorderedPanel.tsx
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const BorderedPanel: FC<Props> = ({ children }) => (
  <div className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-2xl">
    {children}
  </div>
);
