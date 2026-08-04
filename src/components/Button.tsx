"use client";
import { useFormStatus } from "react-dom";

type ButtonProps = {
  pendingLabel: string;
  buttonLabel: string;
  bgColor?: string;
  textColor?: string;
};

export default function Button({
  pendingLabel,
  buttonLabel,
  bgColor,
  textColor,
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <div>
        <button
          type="submit"
          disabled={pending}
          className={`w-full mt-8 mb-4 py-3 rounded font-bold transition text-lg ${
            pending
              ? "bg-teal-400 cursor-not-allowed"
              : bgColor
              ? bgColor
              : "bg-[#007381]"
          } hover:bg-yellow-500 pointer ${
            textColor ? textColor : "text-white"
          }`}
        >
          {pending ? pendingLabel : buttonLabel}
        </button>
      </div>
    </>
  );
}
