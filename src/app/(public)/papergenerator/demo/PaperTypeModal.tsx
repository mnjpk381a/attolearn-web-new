"use client";

import React from "react";
import { FaCirclePlay, FaPenFancy, FaXmark } from "react-icons/fa6";

type Rule = {
  ruleID: number | string;
  attemptQuestions: number;
  totalQuestions: number;
  marksPerQuestion: number;
  questionType: string;
};

type Section = {
  sectionID: number | string;
  sectionName: string;
  rules: Rule[];
};

export type TestTypeWithDetails = {
  testTypeID: number | string;
  name: string;
  description?: string | null;
  sections: Section[];
};

type ExamTypeOption = {
  id: number;
  name: string;
};

type SummaryItem = {
  label: string;
  value: React.ReactNode;
};

type QuickAction = {
  id: string;
  title: string;
  description: string;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  tone?: "primary" | "secondary";
};

type PaperTypeModalProps = {
  isOpen: boolean;
  onClose: () => void;

  title?: string;
  subtitle?: string;

  testTypesWithDetails?: TestTypeWithDetails[];
  testTypes?: TestTypeWithDetails[];

  isGeneratingTestPaper?: boolean;

  onGenerateTestPaper?: (test: TestTypeWithDetails) => void;
  onSelectTestType?: (test: TestTypeWithDetails) => void;

  // For "Custom Test" and "Select Questions Manually"
  onSelectQuestionsManually?: () => void;

  examTypeOptions?: ExamTypeOption[];
  selectedExamTypeID?: number;
  onExamTypeChange?: (examTypeID: number) => void;

  summary?: SummaryItem[];
  quickActions?: QuickAction[];

  manualAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };

  busy?: boolean;
};

export default function PaperTypeModal({
  isOpen,
  onClose,
  title = "Choose A Paper Template",
  subtitle = "Pick a ready-made paper structure or switch to manual question selection.",
  testTypesWithDetails = [],
  testTypes = [],
  isGeneratingTestPaper = false,
  onGenerateTestPaper,
  onSelectTestType,
  onSelectQuestionsManually,
  examTypeOptions = [],
  selectedExamTypeID = 0,
  onExamTypeChange,
  summary = [],
  quickActions = [],
  manualAction,
  busy = false,
}: PaperTypeModalProps) {
  if (!isOpen) return null;

  const resolvedTestTypes =
    testTypes.length > 0 ? testTypes : testTypesWithDetails;
  const isBusy = isGeneratingTestPaper || busy;
  const showQuickActions = quickActions.length > 0;
  const showTestTypes = resolvedTestTypes.length > 0;

  const handleSelectTemplate = (test: TestTypeWithDetails) => {
    if (test.name === "Custom Test") {
      onSelectQuestionsManually?.();
      return;
    }

    if (onSelectTestType) {
      onSelectTestType(test);
      return;
    }

    onGenerateTestPaper?.(test);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 backdrop-blur-[2px]">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white text-black shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 bg-linear-to-r from-[#007381] to-[#1297a8] px-5 py-4 text-white">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-white/85">{subtitle}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        <div className="max-h-[85vh] overflow-y-auto p-5">
          <div className="mb-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Exam Type
            </label>

            <select
              value={selectedExamTypeID > 0 ? String(selectedExamTypeID) : ""}
              onChange={(e) => onExamTypeChange?.(Number(e.target.value || 0))}
              disabled={examTypeOptions.length === 0 || isBusy}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007381]/30 disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              {examTypeOptions.length === 0 ? (
                <option value="">No exam types available</option>
              ) : (
                examTypeOptions.map((type) => (
                  <option key={type.id} value={String(type.id)}>
                    {type.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {summary.length > 0 && (
            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {summary.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {showQuickActions && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {quickActions.map((action) => {
                const isPrimary = action.tone !== "secondary";

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={action.onClick}
                    disabled={action.disabled || isBusy}
                    className={`group rounded-2xl border p-5 text-left transition-all ${
                      isPrimary
                        ? "border-[#007381]/20 bg-linear-to-br from-[#007381]/5 to-white hover:border-[#007381]/40"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-0.5 rounded-full p-3 ${
                          isPrimary
                            ? "bg-[#007381] text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {isPrimary ? <FaCirclePlay /> : <FaPenFancy />}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {action.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {showTestTypes && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {resolvedTestTypes.map((test) => (
                <button
                  key={test.testTypeID}
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleSelectTemplate(test)}
                  className="flex h-full cursor-pointer flex-col justify-start rounded-2xl border border-gray-200 bg-white p-3 text-left shadow-sm transition-all hover:border-[#007381]/40 hover:bg-[#007381]/8 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-[#007381]">
                        {test.name}
                      </h3>

                      {test.description && (
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {test.description}
                        </p>
                      )}
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#007381] ring-1 ring-[#007381]/15">
                      Template
                    </span>
                  </div>

                  {test.sections && test.sections.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {test.sections.map((section) => (
                        <div
                          key={section.sectionID}
                          className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-2"
                        >
                          <p className="text-sm font-semibold text-gray-800">
                            {section.sectionName}
                          </p>

                          <div className="mt-2 space-y-1.5">
                            {section.rules.map((rule) => (
                              <p
                                key={rule.ruleID}
                                className="text-sm text-gray-600"
                              >
                                {rule.attemptQuestions}/{rule.totalQuestions}{" "}
                                questions x {rule.marksPerQuestion} marks
                                <span className="ml-1 text-gray-400">
                                  ({rule.questionType})
                                </span>
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {manualAction && (
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={manualAction.onClick}
                disabled={manualAction.disabled || isBusy}
                className="rounded-xl bg-[#007381] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {manualAction.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
