/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { SignupLink } from "@/constants/plans";

interface PlansProps {
  onClose: () => void;
}

export default function Plans({ onClose }: PlansProps) {
  // Lock background scroll (mobile fix)
  useEffect(() => {
    const body = document.body;
    const scrollY = window.scrollY;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:p-6">
      {/* Modal: full-screen on mobile, centered on desktop */}
      <div
        className="
          relative w-full bg-white shadow-2xl overflow-hidden
          h-dvh rounded-none
          sm:h-auto sm:max-w-4xl sm:rounded-2xl
          max-[700px]:scale-[0.92] max-[650px]:scale-[0.88] origin-top
        "
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700 text-2xl z-10"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Content (NO SCROLL) */}
        <div className="h-full px-4 py-5 sm:p-10 flex flex-col justify-center">
          <h2 className="text-lg sm:text-3xl font-bold text-center text-teal-800 mb-8">
            Choose a solution you&apos;d like to explore.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
            {/* Paper Generator */}
            <div className="rounded-xl border bg-teal-50 p-4 sm:p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#007381] flex items-center justify-center mb-3 sm:mb-4">
                <img
                  src="/images/Banners/Exam-Paper-Generation.png"
                  alt="Paper Generator"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-semibold text-teal-800">
                Paper Generator
              </h2>

              <div className="w-10 sm:w-12 h-0.5 bg-teal-300 my-2 sm:my-3" />

              <p className="text-gray-800 text-xs sm:text-sm mb-3 sm:mb-5">
                Create exam papers in <strong>3 Clicks</strong>
              </p>

              <ul className="text-[11px] sm:text-base text-gray-700 space-y-1 sm:space-y-2 mb-4 sm:mb-8 w-full max-w-xs text-left list-disc pl-5">
                <li>Auto-generate question papers</li>
                <li>Multiple formats & difficulty levels</li>
                <li>Export to PDF instantly</li>
              </ul>

              <div className="mt-auto w-full flex justify-center">
                <a
                  href="/papergenerator/demo"
                  // target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 bg-[#007381] text-white px-6 py-3 rounded-md font-medium hover:bg-teal-800 transition text-center text-sm"
                >
                  Start Demo
                </a>
              </div>
            </div>

            {/* School Management System */}
            <div className="rounded-xl border bg-yellow-50 p-4 sm:p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#f2a824] flex items-center justify-center mb-3 sm:mb-4">
                <img
                  src="/images/Banners/School-Profile-Management.png"
                  alt="School Management System"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-semibold text-teal-800">
                School Management System
              </h2>

              <div className="w-10 sm:w-12 h-0.5 bg-yellow-300 my-2 sm:my-3" />

              <p className="text-gray-800 text-xs sm:text-sm mb-3 sm:mb-5">
                Manage your entire school digitally
              </p>

              <ul className="text-[11px] sm:text-base text-gray-700 space-y-1 sm:space-y-2 mb-4 sm:mb-8 w-full max-w-xs text-left list-disc pl-5">
                <li>Student & staff management</li>
                <li>Attendance, fees & reports</li>
                <li>Parent & teacher portal</li>
              </ul>

              <div className="mt-auto w-full flex justify-center">
                <a
                  href={SignupLink + "?plan=2"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 bg-[#007381] text-white px-6 py-3 rounded-md font-medium hover:bg-teal-800 transition text-center text-sm"
                >
                  Start Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
