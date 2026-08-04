"use client";

import React from "react";
import { FaCircleArrowLeft, FaXmark, FaCirclePlay } from "react-icons/fa6";

type AutoMCQsModalProps = {
  isOpen: boolean;
  questionsCount: number;
  setQuestionsCount: (val: number) => void;
  generatingPaper: boolean;

  selectedClass?: { className?: string | null } | null;
  selectedSubject?: { subjectName?: string | null } | null;
  selectedChapterIDs: number[];

  onClose: () => void;
  onGenerate: () => void;
};

export default function AutoMCQsModal({
  isOpen,
  questionsCount,
  setQuestionsCount,
  generatingPaper,
  selectedClass,
  selectedSubject,
  selectedChapterIDs,
  onClose,
  onGenerate,
}: AutoMCQsModalProps) {
  if (!isOpen) return null;

  const handleCancel = () => {
    setQuestionsCount(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded shadow-xl w-full max-w-md mx-4 max-h-[95vh] overflow-y-auto text-black">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={handleCancel}
              className="mr-4 p-2 rounded hover:bg-gray-100 transition-colors"
            >
              <FaCircleArrowLeft className="text-[#007381] text-xl" />
            </button>
            <h2 className="text-xl font-bold text-gray-800">
              Generate Auto MCQs Paper
            </h2>
          </div>

          <button
            onClick={handleCancel}
            className="p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <FaXmark className="text-red-500 text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-200">
            <div className="flex items-start">
              <FaCirclePlay className="text-blue-600 text-xl mt-1 shrink-0" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Auto Paper Generation
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Enter the number of MCQs you want to generate automatically
                  from the selected chapters.
                </p>
              </div>
            </div>
          </div>

          {/* Selection Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Selection Summary
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Class:</span>
                <span className="font-medium">{selectedClass?.className}</span>
              </div>
              <div className="flex justify-between">
                <span>Subject:</span>
                <span className="font-medium">
                  {selectedSubject?.subjectName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Chapters Selected:</span>
                <span className="font-medium">{selectedChapterIDs.length}</span>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of MCQs to Generate
            </label>

            <div className="relative">
              <input
                type="number"
                value={questionsCount === 0 ? "" : questionsCount}
                min={1}
                max={100}
                placeholder="Enter number of MCQs"
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? 0 : parseInt(e.target.value);
                  if (value >= 0) setQuestionsCount(value);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 text-sm">
                MCQs
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Recommended: 10-50 MCQs for optimal paper generation
            </p>
          </div>

          {/* Warnings */}
          {questionsCount > 0 && questionsCount < 5 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
              Consider adding more questions for a comprehensive paper.
            </div>
          )}

          {questionsCount > 50 && (
            <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded text-sm text-orange-700">
              Large number of questions may take longer to generate.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={onGenerate}
              disabled={questionsCount <= 0 || generatingPaper}
              className={`px-6 py-2 rounded flex items-center space-x-2 ${
                questionsCount > 0 && !generatingPaper
                  ? "bg-[#007381] text-white hover:bg-teal-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {generatingPaper ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                "Generate Paper"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
