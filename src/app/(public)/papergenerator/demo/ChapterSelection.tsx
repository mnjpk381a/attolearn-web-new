"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa6";

type Chapter = {
  chapterID: number;
  chapterName: string;
};

type ChapterSelectionProps = {
  selectedSubject?: { subjectName?: string | null } | null;
  selectedClass?: { className?: string | null } | null;

  chapters: Chapter[];

  selectedChapterIDs: number[];

  // disable logic (max 2 etc.)
  isChapterDisabled: (chapterID: number) => boolean;

  // selection handler
  toggleChapterSelection: (chapter: Chapter) => void;

  // Next button handler (opens paper type modal)
  onNext: () => void;

  // NoData component (pass your existing <NoData />)
  NoDataComponent?: React.ReactNode;
};

export default function ChapterSelection({
  selectedSubject,
  selectedClass,
  chapters,
  selectedChapterIDs,
  isChapterDisabled,
  toggleChapterSelection,
  onNext,
  NoDataComponent,
}: ChapterSelectionProps) {
  const canProceed = selectedChapterIDs.length > 0;

  const clickableChapters = (chapters ?? []).slice(0, 2);
  const allClickableSelected =
    clickableChapters.length > 0 &&
    clickableChapters.every((c) =>
      selectedChapterIDs.includes(c.chapterID)
    );

  const handleSelectAllClickable = () => {
    if (clickableChapters.length === 0) return;

    if (allClickableSelected) {
      clickableChapters.forEach((c) => {
        if (selectedChapterIDs.includes(c.chapterID)) {
          toggleChapterSelection(c);
        }
      });
    } else {
      clickableChapters.forEach((c) => {
        if (!selectedChapterIDs.includes(c.chapterID)) {
          toggleChapterSelection(c);
        }
      });
    }
  };

  return (
    <div className="h-[65vh] flex flex-col">
      {/* Sticky Header Section */}
      <div className="bg-white pb-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-semibold text-[#007381]">
            Select the Chapters - {selectedSubject?.subjectName}{" "}
            {selectedClass?.className}
          </h1>

          {/* ✅ Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`flex flex-row justify-between items-center px-4 py-1 text-white rounded ${
                canProceed
                  ? "bg-[#007381] hover:bg-teal-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Next <FaArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable List Section */}
      <div className="overflow-y-auto mt-4 pr-1">
        {chapters?.length === 0 && (NoDataComponent ?? null)}

        <ul className="list-none text-gray-600">
          <li className="flex items-center gap-2 py-2 border-b-2">
            <label
              className={[
                "flex items-center gap-2",
                clickableChapters.length > 0
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50",
              ].join(" ")}
            >
              <input
                type="checkbox"
                disabled={clickableChapters.length === 0}
                checked={allClickableSelected}
                onChange={handleSelectAllClickable}
                className="w-5 h-5 text-[#007381] border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
              />
              <span className="text-gray-700 font-medium">Select All</span>
            </label>
          </li>
          {chapters?.map((chapter: Chapter, index: number) => {
            const isClickable = index < 2;
            const isDisabled =
              !isClickable || isChapterDisabled(chapter.chapterID);

            return (
              <li
                key={chapter.chapterID}
                className={[
                  "py-2 flex flex-row items-center justify-between border-b border-gray-300",
                  isDisabled ? "opacity-60" : "",
                ].join(" ")}
              >
                <div className="flex flex-row justify-between items-center w-[70%] min-w-md">
                  <label
                    className={[
                      "flex items-center",
                      !isDisabled
                        ? "cursor-pointer text-gray-700"
                        : "cursor-not-allowed text-gray-400",
                    ].join(" ")}
                  >
                    <input
                      type="checkbox"
                      checked={selectedChapterIDs.includes(chapter.chapterID)}
                      disabled={isDisabled}
                      onChange={() => {
                        if (isDisabled) return;
                        toggleChapterSelection(chapter);
                      }}
                      className="mr-2 w-5 h-5"
                    />
                    {chapter.chapterName}
                  </label>
                </div>

                {isDisabled && (
                  <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-500">
                    Locked
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Next Button */}
      <div className="flex space-x-4 mt-4 justify-center items-center">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex flex-row justify-between items-center px-4 py-1 text-white rounded ${
            canProceed
              ? "bg-[#007381] hover:bg-teal-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next <FaArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
