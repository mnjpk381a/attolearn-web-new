"use client";

import { FaCircleInfo, FaXmark } from "react-icons/fa6";

type DemoAlertModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
};

export default function DemoAlertModal({
  isOpen,
  title,
  message,
  buttonText = "Got it",
  onClose,
}: DemoAlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="demo-alert-title"
        className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8 lg:p-10"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-yellow-100">
              <FaCircleInfo className="text-3xl text-[#007381]" />
            </div>

            <div>
              <h2
                id="demo-alert-title"
                className="text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                {title}
              </h2>
              <p className="mt-3 text-lg leading-8 text-gray-700 sm:text-xl">
                {message}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close alert"
          >
            <FaXmark className="text-2xl" />
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#007381] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#005f6a]"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
