// components/common/ButtonRow.tsx
import LoadingIndicatorIcon from "@/icons/LoadingIndicatorIcon";
import { FC } from "react";

type ButtonDef = {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

type Props = {
  buttons: ButtonDef[];
};

export const ButtonRow: FC<Props> = ({ buttons }) => (
  <div className="flex gap-3">
    {buttons.map((btn, i) => {
      const base =
        "flex-1 text-sm font-semibold px-4 py-2.5 rounded-lg shadow-boxShadow-custom-sm";
      const styles =
        btn.variant === "primary"
          ? "bg-blue-600 justify-items-center text-white hover:bg-blue-700 disabled:bg-blue-200 text-center"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-300";

      if (btn.href) {
        return (
          <a
            key={i}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${base} ${styles}`}
          >
            {btn.label}
          </a>
        );
      }
      return (
        <button
          key={i}
          onClick={btn.onClick}
          disabled={btn.disabled}
          className={`${base} ${styles}`}
        >
          {btn.label ? (
            btn.label
          ) : (
            <div className="h-5 w-5 animate-spin-pretty">
              <LoadingIndicatorIcon />
            </div>
          )}
        </button>
      );
    })}
  </div>
);
