"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaShareNodes, FaXmark } from "react-icons/fa6";
import { FaPrint, FaDownload } from "react-icons/fa";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import { PaperWatermarkLogo } from "./PaperWatermarkLogo";
import PaperFooter from "./PaperFooter";
import {
  clonePaper,
  isPaperBilingual,
  isPaperEnglish,
  isQuestionBilingual,
  mcqOptionGridOrder,
  optionEnglish,
  optionUrdu,
  optionUrduOrFallback,
  questionEnglishLine,
  questionUrduLine,
  renderLatex,
  renderSQOrLQDisplayText,
  testPaperDetHeaderValue,
  toRomanLower,
  trimStr,
} from "./paperHelpers";

// Unicode isolation characters for bidirectional text (recommended for mixed LTR/RTL)
const RLI = "\u2067"; // Right-to-Left Isolate
const LRI = "\u2066"; // Left-to-Right Isolate (unused but available)
const PDI = "\u2069"; // Pop Directional Isolate

// Regex matching runs of Arabic/Urdu characters (covers common Arabic blocks)
const ARABIC_RUN_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+/g;

function isolateBidi(text?: string) {
  if (!text) return "";
  // Wrap each Arabic run with RLI...PDI so browsers isolate its directionality
  return text.replace(ARABIC_RUN_RE, (m) => `${RLI}${m}${PDI}`);
}

type PaperModalProps = {
  isOpen: boolean;

  loading: boolean;
  selPaper: any; // original paper data

  /** Optional edited paper state used in edit mode */
  editedPaper?: any | null;

  /** Optional edit-mode flag (for edit paper flow) */
  isEditMode?: boolean;

  paperRef: React.RefObject<HTMLDivElement>;

  selectedClass?: { className?: string | null } | null;
  selectedChapters: string[];

  // helpers you already have in your file:
  formatDateTime: (date: any) => string;
  hasUrdu: (text?: string | null) => boolean;
  isEntirePaperUrdu: (paper: any) => boolean;

  // header actions:
  onShare: () => void;
  onPrint: () => void;
  onPDF: () => void;

  /**
   * Optional edit-paper callbacks.
   * When provided, the modal can render Edit / Save / Cancel buttons
   * and editable fields for title + questions (like in messi.tsx).
   */
  onToggleEditMode?: () => void;
  onSavePaper?: () => void;
  onCancelEdit?: () => void;
  onUpdatePaperTitle?: (value: string) => void;
  onUpdateMCQ?: (index: number, field: string, value: string) => void;
  onUpdateSQ?: (index: number, value: string) => void;
  onUpdateLQ?: (index: number, value: string) => void;

  // close + reset (do your state resets in parent)
  onClose: () => void;

  // loader component from parent (optional)
  LoaderComponent?: React.ReactNode;
};

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-urdu",
});

type BilingualPaperColumnProps = {
  side: "en" | "ur";
  paper: any;
  effectiveIsEditMode: boolean;
  hasUrdu: (text?: string | null) => boolean;
  updateMCQ: (index: number, field: string, value: string) => void;
  updateSQ: (index: number, value: string) => void;
  updateSQField: (
    index: number,
    field: "questionTextEnglish" | "questionTextUrdu",
    value: string,
  ) => void;
  updateLQ: (index: number, value: string) => void;
  updateLQField: (
    index: number,
    field: "questionTextEnglish" | "questionTextUrdu",
    value: string,
  ) => void;
};

function BilingualPaperColumn({
  side,
  paper,
  effectiveIsEditMode,
  hasUrdu,
  updateMCQ,
  updateSQ,
  updateSQField,
  updateLQ,
  updateLQField,
}: BilingualPaperColumnProps) {
  const urCol = side === "ur";

  return (
    <div
      className={`min-w-0 px-1 py-0.5 print:px-1 ${
        urCol ? `${notoUrdu.variable} ${notoUrdu.className}` : ""
      }`}
      dir={urCol ? "rtl" : "ltr"}
    >
      {paper?.mcQsList?.length > 0 && (
        <div className="mb-3 px-1 print:mb-2 print:px-0">
          <div className="mb-1 print:mb-0.5">
            <h3 className="text-xs font-bold text-gray-800 inline print:text-[10px]">
              {urCol
                ? "۱- صحیح جواب پر دائرہ لگائیں۔"
                : "1- Circle the correct answer."}
            </h3>
            <span className="text-[10px] text-gray-600 mr-2 ml-2 print:text-[8px]">
              ({paper?.mcQsList?.length}×1={paper?.mcQsList?.length})
            </span>
            {paper?.mcQsList?.length > paper?.testPaperDet?.attemptableMCQs && (
              <span className="text-[8px] text-blue-600 print:text-[6px]">
                [Attempt {paper?.testPaperDet?.attemptableMCQs} out of{" "}
                {paper?.mcQsList?.length}]
              </span>
            )}
          </div>

          <div className="space-y-2 print:space-y-1">
            {paper.mcQsList.map((q: any, questionIndex: number) => (
              <div
                key={questionIndex}
                className="paper-bilingual-mcq-item border-b border-gray-200 pb-2 print:pb-1"
              >
                <div className="flex items-start gap-2 print:gap-1">
                  <span className="font-bold text-gray-800 text-xs print:text-[8px] shrink-0">
                    {toRomanLower(questionIndex + 1)}.
                  </span>
                  <div className="flex-1 min-w-0">
                    {effectiveIsEditMode ? (
                      isQuestionBilingual(q) ? (
                        urCol ? (
                          <textarea
                            value={questionUrduLine(q)}
                            onChange={(e) =>
                              updateMCQ(
                                questionIndex,
                                "questionTextUrdu",
                                e.target.value,
                              )
                            }
                            dir="rtl"
                            className="w-full text-xs text-gray-800 mb-1 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-10 print:text-[9px] font-urdu"
                            placeholder="سوال (اردو)"
                          />
                        ) : (
                          <textarea
                            value={questionEnglishLine(q)}
                            onChange={(e) =>
                              updateMCQ(
                                questionIndex,
                                "questionTextEnglish",
                                e.target.value,
                              )
                            }
                            dir="ltr"
                            className="w-full text-xs text-gray-800 mb-1 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-10 print:text-[9px]"
                            placeholder="Question (English)"
                          />
                        )
                      ) : (
                        <textarea
                          value={q?.questionText || ""}
                          onChange={(e) =>
                            updateMCQ(
                              questionIndex,
                              "questionText",
                              e.target.value,
                            )
                          }
                          dir={hasUrdu(q?.questionText) ? "rtl" : "ltr"}
                          className={`w-full text-xs text-gray-800 mb-1 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-7.5 print:text-[9px] ${
                            hasUrdu(q?.questionText) ? "font-urdu" : ""
                          }`}
                          placeholder="Enter question text"
                        />
                      )
                    ) : isQuestionBilingual(q) ? (
                      <p
                        dir={urCol ? "rtl" : "ltr"}
                        className={`text-xs text-gray-800 mb-1 print:text-[8px] ${
                          urCol ? "font-urdu" : ""
                        }`}
                      >
                        {renderLatex(
                          urCol
                            ? questionUrduLine(q) || questionEnglishLine(q)
                            : questionEnglishLine(q),
                        )}
                      </p>
                    ) : (
                      <p
                        dir={urCol || hasUrdu(q?.questionText) ? "rtl" : "ltr"}
                        className={`text-xs text-gray-800 mb-1 print:text-[8px] ${
                          hasUrdu(q?.questionText) || urCol ? "font-urdu" : ""
                        }`}
                      >
                        {renderLatex(q?.questionText ?? "")}
                      </p>
                    )}

                    <div
                      className={`grid grid-cols-2 gap-1 print:gap-0.5 ${
                        urCol ? "mr-1" : "mr-1"
                      }`}
                    >
                      {mcqOptionGridOrder(urCol).map((opt) => {
                        if (isQuestionBilingual(q)) {
                          const text = urCol
                            ? optionUrduOrFallback(q, opt)
                            : optionEnglish(q, opt);
                          return (
                            <div
                              key={opt}
                              className="flex items-start gap-1 text-[10px] print:text-[8px] print:gap-0.5"
                            >
                              <span className="font-semibold text-gray-700 shrink-0">
                                ({opt})
                              </span>
                              {effectiveIsEditMode ? (
                                <input
                                  type="text"
                                  value={
                                    urCol
                                      ? trimStr(
                                          q?.[
                                            `option${opt}Urdu` as keyof typeof q
                                          ] as string,
                                        )
                                      : optionEnglish(q, opt)
                                  }
                                  onChange={(e) =>
                                    updateMCQ(
                                      questionIndex,
                                      urCol
                                        ? `option${opt}Urdu`
                                        : `option${opt}English`,
                                      e.target.value,
                                    )
                                  }
                                  dir={urCol ? "rtl" : "ltr"}
                                  className={`flex-1 min-w-0 text-[10px] text-gray-700 p-0.5 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 print:text-[8px] ${
                                    urCol ? "font-urdu" : ""
                                  }`}
                                  placeholder={
                                    urCol ? `${opt} اردو` : `${opt} English`
                                  }
                                />
                              ) : (
                                <span
                                  dir={urCol ? "rtl" : "ltr"}
                                  className={`text-gray-700 flex-1 min-w-0 ${
                                    urCol ? "font-urdu" : ""
                                  }`}
                                >
                                  {renderLatex(text)}
                                </span>
                              )}
                            </div>
                          );
                        }
                        const optionText = q[
                          `option${opt}` as keyof typeof q
                        ] as string;
                        const isUrduOption =
                          hasUrdu(optionText) || hasUrdu(q?.questionText);
                        return (
                          <div
                            key={opt}
                            className={`flex items-start gap-1 text-[10px] print:text-[8px] print:gap-0.5 ${
                              isUrduOption && !urCol ? "flex-row-reverse" : ""
                            }`}
                          >
                            <span className="font-semibold text-gray-700 shrink-0">
                              ({opt})
                            </span>
                            {effectiveIsEditMode ? (
                              <input
                                type="text"
                                value={optionText || ""}
                                onChange={(e) =>
                                  updateMCQ(
                                    questionIndex,
                                    `option${opt}`,
                                    e.target.value,
                                  )
                                }
                                dir={isUrduOption || urCol ? "rtl" : "ltr"}
                                className={`flex-1 text-[10px] text-gray-700 p-0.5 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 print:text-[8px] ${
                                  isUrduOption || urCol ? "font-urdu" : ""
                                }`}
                                placeholder={`Option ${opt}`}
                              />
                            ) : (
                              <span
                                dir={isUrduOption || urCol ? "rtl" : "ltr"}
                                className={`text-gray-700 flex-1 ${
                                  isUrduOption || urCol ? "font-urdu" : ""
                                }`}
                              >
                                {renderLatex(optionText ?? "")}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {paper?.sQsList?.length > 0 && (
        <div className="mb-3 px-1 print:mb-2 print:px-0">
          <div className="mb-1 print:mb-0.5">
            <h3 className="text-xs font-bold text-gray-800 inline print:text-[10px]">
              {urCol
                ? "۲- مندرجہ ذیل مختصر سوالات کے جوابات لکھیں۔"
                : "2- Answer the following short questions."}
            </h3>
            <span className="text-[10px] text-gray-600 mr-2 ml-2 print:text-[8px]">
              ({paper?.testPaperDet?.attemptableSQs}×
              {paper?.sQsList?.[0]?.marks || 2}=
              {paper?.testPaperDet?.attemptableSQs *
                (paper?.sQsList?.[0]?.marks || 2)}
              )
            </span>
            {paper?.sQsList?.length > paper?.testPaperDet?.attemptableSQs && (
              <span className="text-[8px] text-blue-600 print:text-[6px]">
                [Attempt {paper?.testPaperDet?.attemptableSQs} out of{" "}
                {paper?.sQsList?.length}]
              </span>
            )}
          </div>
          <div className="space-y-2 print:space-y-1">
            {paper.sQsList.map((q: any, questionIndex: number) => (
              <div
                key={questionIndex}
                className="paper-bilingual-sq-item border-b border-gray-200 pb-2 print:pb-1"
              >
                <div className="flex items-start gap-2 print:gap-1">
                  <span className="font-bold text-gray-800 text-xs print:text-[8px] shrink-0">
                    {toRomanLower(questionIndex + 1)}.
                  </span>
                  <div className="flex-1 min-w-0">
                    {effectiveIsEditMode ? (
                      isQuestionBilingual(q) ? (
                        urCol ? (
                          <textarea
                            value={questionUrduLine(q)}
                            onChange={(e) =>
                              updateSQField(
                                questionIndex,
                                "questionTextUrdu",
                                e.target.value,
                              )
                            }
                            dir="rtl"
                            className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-9 print:text-[9px] font-urdu"
                            placeholder="سوال (اردو)"
                          />
                        ) : (
                          <textarea
                            value={questionEnglishLine(q)}
                            onChange={(e) =>
                              updateSQField(
                                questionIndex,
                                "questionTextEnglish",
                                e.target.value,
                              )
                            }
                            dir="ltr"
                            className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-9 print:text-[9px]"
                            placeholder="Question (English)"
                          />
                        )
                      ) : (
                        <textarea
                          value={q?.questionText || ""}
                          onChange={(e) =>
                            updateSQ(questionIndex, e.target.value)
                          }
                          dir={hasUrdu(q?.questionText) ? "rtl" : "ltr"}
                          className={`w-full text-xs text-gray-800 mb-1 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-7.5 print:text-[9px] ${
                            hasUrdu(q?.questionText) ? "font-urdu" : ""
                          }`}
                          placeholder="Enter question text"
                        />
                      )
                    ) : isQuestionBilingual(q) ? (
                      <p
                        dir={urCol ? "rtl" : "ltr"}
                        className={`text-xs text-gray-800 print:text-[8px] ${
                          urCol ? "font-urdu" : ""
                        }`}
                      >
                        {renderSQOrLQDisplayText(
                          urCol
                            ? questionUrduLine(q) || questionEnglishLine(q)
                            : questionEnglishLine(q),
                        )}
                      </p>
                    ) : (
                      <p
                        dir={urCol || hasUrdu(q?.questionText) ? "rtl" : "ltr"}
                        className={`text-xs text-gray-800 print:text-[8px] ${
                          hasUrdu(q?.questionText) || urCol ? "font-urdu" : ""
                        }`}
                      >
                        {renderSQOrLQDisplayText(q?.questionText ?? "")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {paper?.lQsList?.length > 0 && (
        <div className="mb-3 px-1 print:mb-2 print:px-0">
          <div className="mb-1 print:mb-0.5">
            <h3 className="text-xs font-bold text-gray-800 inline print:text-[10px]">
              {urCol
                ? "۳- مندرجہ ذیل مفصل سوالات کے جوابات لکھیں۔"
                : "3- Answer the following detailed questions."}
            </h3>
            <span className="text-[10px] text-gray-600 mr-2 ml-2 print:text-[8px]">
              ({paper?.testPaperDet?.attemptableLQs}×
              {paper?.lQsList?.[0]?.marks || 5}=
              {paper?.testPaperDet?.attemptableLQs *
                (paper?.lQsList?.[0]?.marks || 5)}
              )
            </span>
            {paper?.lQsList?.length > paper?.testPaperDet?.attemptableLQs && (
              <span className="text-[8px] text-blue-600 print:text-[6px]">
                [Attempt {paper?.testPaperDet?.attemptableLQs} out of{" "}
                {paper?.lQsList?.length}]
              </span>
            )}
          </div>
          <div className="space-y-2 print:space-y-1">
            {paper.lQsList.map((q: any, questionIndex: number) => (
              <div
                key={questionIndex}
                className="paper-bilingual-lq-item border-b border-gray-200 pb-2 print:pb-1"
              >
                <div className="flex items-start gap-2 print:gap-1">
                  <span className="font-bold text-gray-800 text-xs print:text-[8px] shrink-0">
                    {toRomanLower(questionIndex + 1)}.
                  </span>
                  <div className="flex-1 min-w-0">
                    {effectiveIsEditMode ? (
                      isQuestionBilingual(q) ? (
                        urCol ? (
                          <textarea
                            value={questionUrduLine(q)}
                            onChange={(e) =>
                              updateLQField(
                                questionIndex,
                                "questionTextUrdu",
                                e.target.value,
                              )
                            }
                            dir="rtl"
                            className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-9 print:text-[9px] font-urdu"
                            placeholder="سوال (اردو)"
                          />
                        ) : (
                          <textarea
                            value={questionEnglishLine(q)}
                            onChange={(e) =>
                              updateLQField(
                                questionIndex,
                                "questionTextEnglish",
                                e.target.value,
                              )
                            }
                            dir="ltr"
                            className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-9 print:text-[9px]"
                            placeholder="Question (English)"
                          />
                        )
                      ) : (
                        <textarea
                          value={q?.questionText || ""}
                          onChange={(e) =>
                            updateLQ(questionIndex, e.target.value)
                          }
                          dir={hasUrdu(q?.questionText) ? "rtl" : "ltr"}
                          className={`w-full text-xs text-gray-800 mb-1 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-7.5 print:text-[9px] ${
                            hasUrdu(q?.questionText) ? "font-urdu" : ""
                          }`}
                          placeholder="Enter question text"
                        />
                      )
                    ) : isQuestionBilingual(q) ? (
                      <p
                        dir={urCol ? "rtl" : "ltr"}
                        className={`text-xs text-gray-800 print:text-[8px] ${
                          urCol ? "font-urdu" : ""
                        }`}
                      >
                        {renderSQOrLQDisplayText(
                          urCol
                            ? questionUrduLine(q) || questionEnglishLine(q)
                            : questionEnglishLine(q),
                        )}
                      </p>
                    ) : (
                      <p
                        dir={urCol || hasUrdu(q?.questionText) ? "rtl" : "ltr"}
                        className={`text-xs text-gray-800 print:text-[8px] ${
                          hasUrdu(q?.questionText) || urCol ? "font-urdu" : ""
                        }`}
                      >
                        {renderSQOrLQDisplayText(q?.questionText ?? "")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

type PaperBubbleSheetProps = {
  paper: any;
  isUrduOnlyPaperEffective?: boolean;
};

function PaperBubbleSheet({
  paper,
  isUrduOnlyPaperEffective = false,
}: PaperBubbleSheetProps) {
  if (!paper?.mcQsList?.length) return null;

  return (
    <div
      className="paper-bubble-wrap"
      dir={isUrduOnlyPaperEffective ? "rtl" : "ltr"}
    >
      <div className="paper-bubble-box">
        <div className="paper-bubble-grid">
          {paper.mcQsList.map((_: any, index: number) => (
            <div
              key={index}
              className={`paper-bubble-item ${
                isUrduOnlyPaperEffective ? "flex-row-reverse justify-end" : ""
              }`}
            >
              <span className="paper-bubble-number">{index + 1}.</span>
              <div className="paper-bubble-options">
                {(["A", "B", "C", "D"] as const).map((opt) => (
                  <span key={opt} className="paper-bubble-circle">
                    {opt}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PaperModal({
  isOpen,
  loading,
  selPaper,
  editedPaper,
  isEditMode,
  paperRef,
  selectedClass,
  selectedChapters,
  formatDateTime,
  hasUrdu,
  isEntirePaperUrdu,
  onShare,
  onPrint,
  onPDF,
  onToggleEditMode,
  onSavePaper,
  onCancelEdit,
  onUpdatePaperTitle,
  onUpdateMCQ,
  onUpdateSQ,
  onUpdateLQ,
  onClose,
  LoaderComponent,
}: PaperModalProps) {
  const [localEditMode, setLocalEditMode] = useState(false);
  const [localEditedPaper, setLocalEditedPaper] = useState<any>(
    selPaper ? clonePaper(selPaper) : null,
  );
  const [working, setWorking] = useState(false);
  const [showFullSyllabus, setShowFullSyllabus] = useState(false);

  const isEditModeControlled = typeof isEditMode === "boolean";
  const effectiveIsEditMode = isEditModeControlled ? isEditMode : localEditMode;

  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.width = originalBodyWidth;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const paper = editedPaper ?? localEditedPaper ?? selPaper;
  const isPaperBilingualPaper = paper ? isPaperBilingual(paper) : false;
  const isEnglishOnlyPaperMode =
    Boolean(paper) && !isPaperBilingualPaper && isPaperEnglish(paper);
  const isUrduOnlyPaper =
    Boolean(paper) && !isPaperBilingualPaper && isEntirePaperUrdu(paper);
  const isUrduOnlyPaperEffective =
    Boolean(paper) &&
    !isPaperBilingualPaper &&
    !isEnglishOnlyPaperMode &&
    isUrduOnlyPaper;

  const handleToggleEditMode = () => {
    if (onToggleEditMode) onToggleEditMode();
    if (!isEditModeControlled) {
      setLocalEditMode((prev) => !prev);
      if (!localEditedPaper && selPaper) {
        setLocalEditedPaper(clonePaper(selPaper));
      }
    }
  };

  const handleCancelEdit = () => {
    if (onCancelEdit) onCancelEdit();
    if (!isEditModeControlled) {
      setLocalEditMode(false);
      setLocalEditedPaper(selPaper ? clonePaper(selPaper) : null);
    }
  };

  const handleSavePaper = async () => {
    if (onSavePaper) {
      setWorking(true);
      await onSavePaper();
      setWorking(false);
    }
    if (!isEditModeControlled) {
      setLocalEditMode(false);
    }
  };

  const updatePaperTitle = (value: string) => {
    if (onUpdatePaperTitle) return onUpdatePaperTitle(value);
    setLocalEditedPaper((prev: any) => ({
      ...prev,
      testPaperDet: { ...(prev?.testPaperDet ?? {}), title: value },
    }));
  };

  const updateTestPaperDetField = (field: string, value: string) => {
    setLocalEditedPaper((prev: any) => {
      const base = prev ?? selPaper;
      if (!base) return prev;
      return {
        ...base,
        testPaperDet: { ...(base.testPaperDet ?? {}), [field]: value },
      };
    });
  };

  const det = paper?.testPaperDet ?? {};
  const headerStudentName = testPaperDetHeaderValue(
    det,
    "headerStudentName",
    "",
  );
  const headerRollNo = testPaperDetHeaderValue(det, "headerRollNo", "");
  const headerSubject = testPaperDetHeaderValue(
    det,
    "headerSubject",
    paper?.testPaperDet?.title || "N/A",
  );
  const headerTestNumber = testPaperDetHeaderValue(
    det,
    "headerTestNumber",
    String(selPaper?.testPaperDet?.testPaperID ?? ""),
  );
  const headerTestDetail = testPaperDetHeaderValue(
    det,
    "headerTestDetail",
    selectedClass?.className || "N/A",
  );
  const headerTime = testPaperDetHeaderValue(det, "headerTime", "");
  const headerSyllabus = testPaperDetHeaderValue(
    det,
    "headerSyllabus",
    paper?.testPaperDet?.chapters ||
      selectedChapters?.join(", ") ||
      "Selected Chapters",
  );
  const headerExamDate = testPaperDetHeaderValue(
    det,
    "headerExamDate",
    formatDateTime(paper?.testPaperDet?.createdAt).split(",")[0] ?? "",
  );

  const updateMCQ = (index: number, field: string, value: string) => {
    if (onUpdateMCQ) return onUpdateMCQ(index, field, value);
    setLocalEditedPaper((prev: any) => {
      const mcQs = Array.isArray(prev?.mcQsList) ? [...prev.mcQsList] : [];
      const item = { ...(mcQs[index] ?? {}) };
      item[field] = value;

      const optMatch = field.match(/^option([ABCD])(English|Urdu)$/i);
      if (optMatch) {
        const L = optMatch[1].toUpperCase();
        const en = trimStr(
          item[`option${L}English` as keyof typeof item] as string,
        );
        const ur = trimStr(
          item[`option${L}Urdu` as keyof typeof item] as string,
        );
        item[`option${L}` as keyof typeof item] = (en || ur || "") as never;
      }

      if (
        field === "questionTextEnglish" ||
        field === "questionTextUrdu" ||
        field === "questionText"
      ) {
        const en = trimStr(item.questionTextEnglish);
        const ur = trimStr(item.questionTextUrdu);
        if (en || ur)
          item.questionText =
            en && ur ? `${en} / ${ur}` : en || ur || trimStr(item.questionText);
      }

      mcQs[index] = item;
      return { ...prev, mcQsList: mcQs };
    });
  };

  const updateSQ = (index: number, value: string) => {
    if (onUpdateSQ) return onUpdateSQ(index, value);
    setLocalEditedPaper((prev: any) => {
      const sQs = Array.isArray(prev?.sQsList) ? [...prev.sQsList] : [];
      const item = { ...(sQs[index] ?? {}) };
      item.questionText = value;
      sQs[index] = item;
      return { ...prev, sQsList: sQs };
    });
  };

  const updateLQ = (index: number, value: string) => {
    if (onUpdateLQ) return onUpdateLQ(index, value);
    setLocalEditedPaper((prev: any) => {
      const lQs = Array.isArray(prev?.lQsList) ? [...prev.lQsList] : [];
      const item = { ...(lQs[index] ?? {}) };
      item.questionText = value;
      lQs[index] = item;
      return { ...prev, lQsList: lQs };
    });
  };

  const mergeBilingualStem = (item: any) => {
    const en = trimStr(item.questionTextEnglish);
    const ur = trimStr(item.questionTextUrdu);
    if (en || ur)
      item.questionText =
        en && ur ? `${en} / ${ur}` : en || ur || trimStr(item.questionText);
  };

  const updateSQField = (
    index: number,
    field: "questionTextEnglish" | "questionTextUrdu",
    value: string,
  ) => {
    const base = (editedPaper ?? localEditedPaper ?? selPaper) as any;
    const row = { ...(base?.sQsList?.[index] ?? {}), [field]: value };
    mergeBilingualStem(row);
    if (onUpdateSQ) {
      onUpdateSQ(index, row.questionText);
      return;
    }
    setLocalEditedPaper((prev: any) => {
      const sQs = Array.isArray(prev?.sQsList) ? [...prev.sQsList] : [];
      const item = { ...(sQs[index] ?? {}), [field]: value };
      mergeBilingualStem(item);
      sQs[index] = item;
      return { ...prev, sQsList: sQs };
    });
  };

  const updateLQField = (
    index: number,
    field: "questionTextEnglish" | "questionTextUrdu",
    value: string,
  ) => {
    const base = (editedPaper ?? localEditedPaper ?? selPaper) as any;
    const row = { ...(base?.lQsList?.[index] ?? {}), [field]: value };
    mergeBilingualStem(row);
    if (onUpdateLQ) {
      onUpdateLQ(index, row.questionText);
      return;
    }
    setLocalEditedPaper((prev: any) => {
      const lQs = Array.isArray(prev?.lQsList) ? [...prev.lQsList] : [];
      const item = { ...(lQs[index] ?? {}), [field]: value };
      mergeBilingualStem(item);
      lQs[index] = item;
      return { ...prev, lQsList: lQs };
    });
  };

  return (
    <div
      className="fixed inset-0 z-9999 bg-white overflow-hidden"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <style jsx global>{`
        .font-urdu {
          font-family: var(--font-urdu) !important;
        }

        .paper-modal-scroll {
          height: 100%;
          max-height: 100%;
          overflow-y: scroll !important;
          overscroll-behavior: contain;
          scrollbar-width: auto;
          scrollbar-color: #007381 #d9f3f5;
          touch-action: pan-y;
        }

        .paper-modal-scroll::-webkit-scrollbar {
          width: 14px;
          height: 14px;
        }

        .paper-modal-scroll::-webkit-scrollbar-track {
          background: #d9f3f5;
        }

        .paper-modal-scroll::-webkit-scrollbar-thumb {
          background-color: #007381;
          border-radius: 9999px;
          border: 3px solid #d9f3f5;
        }

        .paper-modal-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #005f69;
        }

        /* Bigger readable text for preview, print and downloaded PDF */
        .paper-print-content {
          font-size: 13px;
          line-height: 1.55;
        }

        .paper-print-content p,
        .paper-print-content td,
        .paper-print-content th,
        .paper-print-content input,
        .paper-print-content textarea,
        .paper-print-content
          span:not(.paper-bubble-circle):not(.paper-bubble-number) {
          font-size: 12px !important;
          line-height: 1.55 !important;
        }

        .paper-print-content h1 {
          font-size: 22px !important;
          line-height: 1.25 !important;
        }

        .paper-print-content h2 {
          font-size: 15px !important;
          line-height: 1.35 !important;
        }

        .paper-print-content h3 {
          font-size: 15px !important;
          line-height: 1.45 !important;
        }

        .paper-print-content .paper-bubble-number {
          font-size: 12px !important;
        }

        .paper-print-content .paper-bubble-circle {
          font-size: 10px !important;
        }

        .paper-bubble-wrap {
          padding: 12px 16px;
        }

        .paper-bubble-box {
          border: 2px solid #111827;
          background: #ffffff;
          padding: 12px;
          width: 100%;
          break-inside: avoid;
          page-break-inside: avoid;
        }

        .paper-bubble-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          column-gap: 18px;
          row-gap: 8px;
        }

        .paper-bubble-item {
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 28px;
        }

        .paper-bubble-number {
          font-size: 12px;
          font-weight: 700;
          color: #111827;
          min-width: 28px;
          line-height: 1;
        }

        .paper-bubble-options {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #e5e7eb;
          padding: 4px 6px;
          background: #ffffff;
          white-space: nowrap;
        }

        .paper-bubble-circle {
          width: 18px;
          height: 18px;
          border: 2px solid #111827;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          line-height: 1;
          color: #111827;
        }

        @media print {
          /* Bigger readable text in browser Print and generated PDF */
          .paper-print-content {
            font-size: 12px !important;
            line-height: 1.55 !important;
          }

          .paper-print-content p,
          .paper-print-content td,
          .paper-print-content th,
          .paper-print-content input,
          .paper-print-content textarea,
          .paper-print-content
            span:not(.paper-bubble-circle):not(.paper-bubble-number) {
            font-size: 11px !important;
            line-height: 1.55 !important;
          }

          .paper-print-content h1 {
            font-size: 18px !important;
            line-height: 1.25 !important;
          }

          .paper-print-content h2 {
            font-size: 13px !important;
            line-height: 1.35 !important;
          }

          .paper-print-content h3 {
            font-size: 13px !important;
            line-height: 1.45 !important;
          }

          .paper-print-content table {
            font-size: 11px !important;
          }

          .paper-bubble-wrap {
            padding: 8px 10px !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .paper-bubble-box {
            border: 2px solid #111827 !important;
            padding: 10px !important;
            background: #ffffff !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .paper-bubble-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            column-gap: 14px !important;
            row-gap: 6px !important;
          }

          .paper-bubble-item {
            min-height: 25px !important;
            gap: 6px !important;
          }

          .paper-print-content .paper-bubble-number {
            font-size: 11px !important;
            min-width: 24px !important;
          }

          .paper-bubble-options {
            gap: 5px !important;
            padding: 3px 5px !important;
            border: 1px solid #e5e7eb !important;
          }

          .paper-print-content .paper-bubble-circle {
            width: 16px !important;
            height: 16px !important;
            font-size: 9px !important;
            border: 1.5px solid #111827 !important;
          }
        }
      `}</style>
      <div className="flex h-screen w-screen flex-col bg-white text-black overflow-hidden">
        {/* Header */}
        <div className="shrink-0 bg-white z-20 border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Optional Edit / Save / Cancel buttons for edit-paper flow */}
              {paper && (
                <>
                  {!effectiveIsEditMode ? (
                    <button
                      onClick={handleToggleEditMode}
                      className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                      title="Edit Paper"
                    >
                      <span className="hidden sm:inline">Edit Paper</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        title="Cancel Edit"
                      >
                        <span className="hidden sm:inline">Cancel</span>
                      </button>
                      <button
                        onClick={handleSavePaper}
                        disabled={working}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Save Changes"
                      >
                        {working ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="hidden sm:inline">Saving...</span>
                          </>
                        ) : (
                          <span className="hidden sm:inline">Save</span>
                        )}
                      </button>
                    </>
                  )}
                </>
              )}
              <button
                onClick={onShare}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                title="Share Paper"
              >
                <FaShareNodes size={16} />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                onClick={onPrint}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                title="Print Paper"
              >
                <FaPrint size={16} />
                <span className="hidden sm:inline">Print</span>
              </button>

              <button
                onClick={onPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                title="Download PDF"
              >
                <FaDownload size={16} />
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>

            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to cancel without saving? This action will result in losing your paper.",
                );

                if (confirmed) {
                  onClose();
                }
              }}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <FaXmark className="text-red-500 text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="paper-modal-scroll min-h-0 flex-1 overflow-y-scroll overscroll-contain bg-[#eefafa] px-4 py-4"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {loading ? (
            <div className="flex items-center justify-center p-8">
              {LoaderComponent ?? <div>Loading...</div>}
            </div>
          ) : !paper ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No Paper Data
                </h3>
                <p className="text-gray-500">Paper data is not available.</p>
              </div>
            </div>
          ) : (
            <div
              ref={paperRef}
              dir={isUrduOnlyPaperEffective ? "rtl" : "ltr"}
              className={`paper-print-content relative bg-white mx-auto w-full min-h-300 shadow-sm print:w-[210mm] print:max-w-none print:min-h-[297mm] ${
                isPaperBilingualPaper ? "max-w-280" : "max-w-225"
              } ${
                isUrduOnlyPaperEffective
                  ? `rtl-text ${notoUrdu.variable} ${notoUrdu.className}`
                  : ""
              }`}
            >
              {/* ✅ Watermark layer */}
              <PaperWatermarkLogo />
              <div className="relative z-10">
                {/* Paper Header */}
                <div className="border-b-2 border-gray-800 pb-2 mb-3 print:pb-1 print:mb-2">
                  <div className="px-4 pt-4 print:px-2 print:pt-2">
                    <div
                      className="flex flex-row items-center justify-between text-left"
                      dir="ltr"
                    >
                      <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-teal-700 mb-1 print:text-base uppercase tracking-wide">
                          {"AttoLearn - Demo Paper"}
                        </h1>

                        {effectiveIsEditMode ? (
                          <input
                            type="text"
                            value={paper?.testPaperDet?.title || ""}
                            onChange={(e) => updatePaperTitle(e.target.value)}
                            className="text-sm font-bold text-gray-700 w-full max-w-md text-left border-2 border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 print:text-xs"
                            placeholder="Enter paper title"
                          />
                        ) : (
                          <h2 className="text-sm font-bold text-gray-700 print:text-xs">
                            {paper?.testPaperDet?.title || "Exam Paper"}
                          </h2>
                        )}
                      </div>

                      <Image
                        src="/images/Stats/AttoLearn_Logo.png"
                        alt="AttoLearn Logo"
                        width={100}
                        height={100}
                        className="paper-header-logo rounded-full border border-gray-300 object-contain shrink-0 w-25 h-25"
                        priority
                      />
                    </div>
                  </div>

                  {/* Student Info Table */}
                  <div className="mt-2 px-4 print:px-2 print:mt-1">
                    <table className="w-full table-fixed border-collapse border-2 border-black! text-[12px] print:text-[9px] font-bold">
                      <tbody>
                        <tr>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold w-[16%]"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            Name:
                          </td>
                          <td className="border-2 border-black! px-1 py-1 font-bold w-[25%]">
                            {effectiveIsEditMode ? (
                              <input
                                type="text"
                                value={headerStudentName}
                                onChange={(e) =>
                                  updateTestPaperDetField(
                                    "headerStudentName",
                                    e.target.value,
                                  )
                                }
                                className="w-full font-bold border-2 border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Student name"
                              />
                              ) : (
                              <span className="font-bold">{isolateBidi(headerStudentName)}</span>
                            )}
                          </td>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold w-[8%]"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            Roll No:
                          </td>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold w-[8%]"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            {effectiveIsEditMode ? (
                              <input
                                type="text"
                                value={headerRollNo}
                                onChange={(e) =>
                                  updateTestPaperDetField(
                                    "headerRollNo",
                                    e.target.value,
                                  )
                                }
                                className="w-full font-bold border-2 border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Roll #"
                              />
                            ) : (
                              <span className="font-bold">{isolateBidi(headerRollNo)}</span>
                            )}
                          </td>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold w-[9%]"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            Subject:
                          </td>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold w-[17%]"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            {effectiveIsEditMode ? (
                              <input
                                type="text"
                                value={
                                  Object.prototype.hasOwnProperty.call(
                                    det,
                                    "headerSubject",
                                  )
                                    ? (det.headerSubject ?? "")
                                    : (paper?.testPaperDet?.title ?? "")
                                }
                                onChange={(e) =>
                                  updateTestPaperDetField(
                                    "headerSubject",
                                    e.target.value,
                                  )
                                }
                                style={{ fontSize: "10px", fontWeight: "bold" }}
                                className="w-full font-bold border-2 border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Subject"
                              />
                            ) : (
                              <span className="font-bold" style={{ fontSize: "10px" , fontWeight: "bold" }}>{isolateBidi(headerSubject)}</span>
                            )}
                          </td>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold w-[8%]"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            Test :
                          </td>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold w-[9%]"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            {effectiveIsEditMode ? (
                              <input
                                type="text"
                                value={headerTestNumber}
                                onChange={(e) =>
                                  updateTestPaperDetField(
                                    "headerTestNumber",
                                    e.target.value,
                                  )
                                }
                                style={{ fontSize: "10px", fontWeight: "bold" }}
                                className="w-full font-bold border-2 border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Test #"
                              />
                            ) : (
                              <span className="font-bold">{isolateBidi(headerTestNumber)}</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            Test Detail:
                          </td>
                          <td
                            colSpan={5}
                            className="border-2 border-black! px-4 py-1 font-bold"
                          >
                            {effectiveIsEditMode ? (
                              <input
                                type="text"
                                value={
                                  Object.prototype.hasOwnProperty.call(
                                    det,
                                    "headerTestDetail",
                                  )
                                    ? (det.headerTestDetail ?? "")
                                    : (selectedClass?.className ?? "")
                                }
                                onChange={(e) =>
                                  updateTestPaperDetField(
                                    "headerTestDetail",
                                    e.target.value,
                                  )
                                }
                                style={{ fontSize: "10px", fontWeight: "bold" }}
                                className="w-full font-bold border-2 border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Class / test detail"
                              />
                            ) : (
                              <span className="font-bold">{isolateBidi(headerTestDetail)}</span>
                            )}
                          </td>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            Time:
                          </td>
                          <td className="border-2 border-black! px-1 py-1 font-bold">
                            {effectiveIsEditMode ? (
                              <input
                                type="text"
                                value={headerTime}
                                onChange={(e) =>
                                  updateTestPaperDetField(
                                    "headerTime",
                                    e.target.value,
                                  )
                                }
                                style={{ fontSize: "10px", fontWeight: "bold" }}
                                className="w-full font-bold border-2 border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Time allowed"
                              />
                            ) : (
                              <span className="font-bold">{isolateBidi(headerTime)}</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            Syllabus:
                          </td>
                          <td
                            colSpan={5}
                            className="border-2 border-black! px-4 py-1 font-bold max-w-100"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            {effectiveIsEditMode ? (
                              <input
                                type="text"
                                value={
                                  Object.prototype.hasOwnProperty.call(
                                    det,
                                    "headerSyllabus",
                                  )
                                    ? (det.headerSyllabus ?? "")
                                    : paper?.testPaperDet?.chapters ||
                                      selectedChapters?.join(", ") ||
                                      ""
                                }
                                onChange={(e) =>
                                  updateTestPaperDetField(
                                    "headerSyllabus",
                                    e.target.value,
                                  )
                                }
                                className="w-full font-bold border-2 border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ fontSize: "10px", fontWeight: "bold" }}
                                placeholder="Chapters / syllabus"
                              />
                            ) : (
                              <div className="max-w-full">
                                <p
                                  className="inline whitespace-pre-wrap wrap-break-word"
                                  style={{
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {showFullSyllabus
                                    ? isolateBidi(headerSyllabus)
                                    : headerSyllabus.length > 90
                                    ? isolateBidi(headerSyllabus.slice(0, 90))
                                    : isolateBidi(headerSyllabus)}
                                </p>

                                {!showFullSyllabus &&
                                  headerSyllabus.length > 90 && (
                                    <button
                                      type="button"
                                      onClick={() => setShowFullSyllabus(true)}
                                      className="ml-1 inline font-bold text-blue-600 hover:underline"
                                    >
                                      ...
                                    </button>
                                  )}

                                {showFullSyllabus && (
                                  <button
                                    type="button"
                                    onClick={() => setShowFullSyllabus(false)}
                                    className="ml-1 inline text-blue-600 hover:underline text-sm"
                                  >
                                    ...
                                  </button>
                                )}
                              </div>
                            )}
                          </td>
                          <td
                            className="border-2 border-black! px-1 py-1 font-bold"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                          >
                            Date:
                          </td>
                          <td className="border-2 border-black! px-1 py-1 font-bold">
                            {effectiveIsEditMode ? (
                              <input
                                type="text"
                                value={
                                  Object.prototype.hasOwnProperty.call(
                                    det,
                                    "headerExamDate",
                                  )
                                    ? (det.headerExamDate ?? "")
                                    : (formatDateTime(
                                        paper?.testPaperDet?.createdAt,
                                      ).split(",")[0] ?? "")
                                }
                                onChange={(e) =>
                                  updateTestPaperDetField(
                                    "headerExamDate",
                                    e.target.value,
                                  )
                                }
                                className="w-full font-bold border-2 border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="DD/MM/YYYY"
                              />
                            ) : (
                              <span className="font-bold">{isolateBidi(headerExamDate)}</span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {isPaperBilingualPaper ? (
                  <>
                    <div className="mb-2 px-4 print:mb-1 print:px-2" dir="ltr">
                      <p className="text-[10px] text-gray-700 print:text-[8px]">
                        <span className="font-bold">Instructions:</span> Read
                        all questions carefully. Write your answers clearly.
                      </p>
                    </div>
                    <PaperBubbleSheet paper={paper} />
                    <div className="paper-bilingual-split mt-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 print:grid-cols-2 min-h-0">
                      <BilingualPaperColumn
                        side="en"
                        paper={paper}
                        effectiveIsEditMode={effectiveIsEditMode}
                        hasUrdu={hasUrdu}
                        updateMCQ={updateMCQ}
                        updateSQ={updateSQ}
                        updateSQField={updateSQField}
                        updateLQ={updateLQ}
                        updateLQField={updateLQField}
                      />
                      <BilingualPaperColumn
                        side="ur"
                        paper={paper}
                        effectiveIsEditMode={effectiveIsEditMode}
                        hasUrdu={hasUrdu}
                        updateMCQ={updateMCQ}
                        updateSQ={updateSQ}
                        updateSQField={updateSQField}
                        updateLQ={updateLQ}
                        updateLQField={updateLQField}
                      />
                    </div>
                    <PaperFooter />
                  </>
                ) : (
                  <>
                    {/* Bubble Sheet for MCQs */}
                    <PaperBubbleSheet
                      paper={paper}
                      isUrduOnlyPaperEffective={isUrduOnlyPaperEffective}
                    />

                    <hr className="border border-gray-300 my-2 print:my-1" />

                    {/* Instructions */}
                    <div
                      className={`mb-3 px-4 print:mb-2 print:px-2 ${
                        isEnglishOnlyPaperMode ? "text-left" : ""
                      }`}
                      dir={isEnglishOnlyPaperMode ? "ltr" : undefined}
                    >
                      <p className="text-[10px] text-gray-700 print:text-[8px]">
                        {isUrduOnlyPaperEffective ? (
                          <>
                            <span className="font-bold">ہدایات:</span> تمام
                            سوالات غور سے پڑھیں۔ جوابات واضح لکھیں۔ تمام سوالات
                            لازمی ہیں جب تک کہ دوسری صورت بیان نہ کی گئی ہو۔
                          </>
                        ) : (
                          <>
                            <span className="font-bold">Instructions:</span>{" "}
                            Read all questions carefully. Write your answers
                            clearly. All questions are compulsory unless
                            specified.
                          </>
                        )}
                      </p>
                    </div>

                    {/* MCQs Section */}
                    {paper?.mcQsList?.length > 0 &&
                      (() => {
                        return (
                          <div className="mb-3 px-4 print:mb-2 print:px-2">
                            <div className="mb-2 print:mb-1">
                              <h3 className="text-sm font-bold text-gray-800 inline print:text-xs">
                                {isUrduOnlyPaperEffective
                                  ? "۱- صحیح جواب پر دائرہ لگائیں۔"
                                  : "1- Circle the correct answer."}
                              </h3>
                              <span className="text-xs text-gray-600 ml-2 print:text-[9px]">
                                ({paper?.mcQsList?.length}×1=
                                {paper?.mcQsList?.length})
                              </span>
                              {paper?.mcQsList?.length >
                                paper?.testPaperDet?.attemptableMCQs && (
                                <span className="text-[9px] text-blue-600 ml-2 print:text-[7px]">
                                  [Attempt{" "}
                                  {paper?.testPaperDet?.attemptableMCQs} out of{" "}
                                  {paper?.mcQsList?.length}]
                                </span>
                              )}
                            </div>

                            <div className="space-y-2 print:space-y-1">
                              {paper?.mcQsList?.map(
                                (q: any, questionIndex: number) => (
                                  <div
                                    key={questionIndex}
                                    className="border-b border-gray-200 pb-2 print:pb-1"
                                  >
                                    <div className="flex items-start">
                                      <span
                                        className={`font-bold text-gray-800 text-xs print:text-[9px] shrink-0 ${
                                          isUrduOnlyPaperEffective
                                            ? "ml-2"
                                            : "mr-2"
                                        }`}
                                      >
                                        {toRomanLower(questionIndex + 1)}.
                                      </span>

                                      <div className="flex-1">
                                        {effectiveIsEditMode ? (
                                          isPaperBilingualPaper &&
                                          isQuestionBilingual(q) ? (
                                            <div className="space-y-1 mb-1">
                                              <textarea
                                                value={questionEnglishLine(q)}
                                                onChange={(e) =>
                                                  updateMCQ(
                                                    questionIndex,
                                                    "questionTextEnglish",
                                                    e.target.value,
                                                  )
                                                }
                                                dir="ltr"
                                                className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-10 print:text-[9px]"
                                                placeholder="Question (English)"
                                              />
                                              <textarea
                                                value={questionUrduLine(q)}
                                                onChange={(e) =>
                                                  updateMCQ(
                                                    questionIndex,
                                                    "questionTextUrdu",
                                                    e.target.value,
                                                  )
                                                }
                                                dir="rtl"
                                                className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-10 print:text-[9px] font-urdu"
                                                placeholder="سوال (اردو)"
                                              />
                                            </div>
                                          ) : (
                                            <textarea
                                              value={q?.questionText || ""}
                                              onChange={(e) =>
                                                updateMCQ(
                                                  questionIndex,
                                                  "questionText",
                                                  e.target.value,
                                                )
                                              }
                                              dir={
                                                hasUrdu(q?.questionText)
                                                  ? "rtl"
                                                  : "ltr"
                                              }
                                              className={`w-full text-xs text-gray-800 mb-1 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-7.5 print:text-[9px] ${
                                                hasUrdu(q?.questionText)
                                                  ? "font-urdu"
                                                  : ""
                                              }`}
                                              placeholder="Enter question text"
                                            />
                                          )
                                        ) : isPaperBilingualPaper &&
                                          isQuestionBilingual(q) ? (
                                          <div className="space-y-1 mb-1">
                                            <p
                                              dir="ltr"
                                              className="text-xs text-gray-800 print:text-[9px] print:mb-0.5"
                                            >
                                              {renderLatex(
                                                questionEnglishLine(q),
                                              )}
                                            </p>
                                            <p
                                              dir="rtl"
                                              className="text-xs text-gray-800 font-urdu print:text-[9px] print:mb-0.5"
                                            >
                                              {renderLatex(questionUrduLine(q))}
                                            </p>
                                          </div>
                                        ) : (
                                          <p
                                            dir="ltr"
                                            className={`text-xs text-gray-800 mb-1 print:text-[9px] print:mb-0.5 ${
                                              hasUrdu(q?.questionText)
                                                ? "font-urdu"
                                                : ""
                                            }`}
                                          >
                                            {renderLatex(isolateBidi(q?.questionText ?? ""))}
                                          </p>
                                        )}

                                        <div className="grid grid-cols-2 gap-1 ml-2 print:gap-0.5 print:ml-1">
                                          {(() => {
                                            const isUrduQuestion =
                                              !isPaperBilingualPaper &&
                                              (hasUrdu(q?.questionText) ||
                                                hasUrdu(q?.optionA) ||
                                                hasUrdu(q?.optionB) ||
                                                hasUrdu(q?.optionC) ||
                                                hasUrdu(q?.optionD));

                                            const optionOrder =
                                              isPaperBilingualPaper
                                                ? ([
                                                    "A",
                                                    "B",
                                                    "C",
                                                    "D",
                                                  ] as const)
                                                : isUrduQuestion
                                                  ? isUrduOnlyPaperEffective
                                                    ? ([
                                                        "A",
                                                        "B",
                                                        "C",
                                                        "D",
                                                      ] as const)
                                                    : ([
                                                        "B",
                                                        "A",
                                                        "D",
                                                        "C",
                                                      ] as const)
                                                  : ([
                                                      "A",
                                                      "B",
                                                      "C",
                                                      "D",
                                                    ] as const);

                                            return optionOrder.map((opt) => {
                                              if (isPaperBilingualPaper) {
                                                const enT = optionEnglish(
                                                  q,
                                                  opt,
                                                );
                                                const urT = optionUrdu(q, opt);
                                                return (
                                                  <div
                                                    key={opt}
                                                    className="flex flex-col gap-0.5 text-[10px] print:text-[8px]"
                                                  >
                                                    <div
                                                      className="flex items-start"
                                                      dir="ltr"
                                                    >
                                                      <span className="font-semibold text-gray-700 mr-1 shrink-0">
                                                        ({opt})
                                                      </span>
                                                      {effectiveIsEditMode ? (
                                                        <input
                                                          type="text"
                                                          value={enT}
                                                          onChange={(e) =>
                                                            updateMCQ(
                                                              questionIndex,
                                                              `option${opt}English`,
                                                              e.target.value,
                                                            )
                                                          }
                                                          dir="ltr"
                                                          className="flex-1 text-[10px] text-gray-700 p-0.5 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 print:text-[8px]"
                                                          placeholder={`${opt} English`}
                                                        />
                                                      ) : (
                                                        <span className="text-gray-700 flex-1">
                                                          {renderLatex(enT)}
                                                        </span>
                                                      )}
                                                    </div>
                                                    {(urT ||
                                                      effectiveIsEditMode) && (
                                                      <div
                                                        className="flex items-start font-urdu"
                                                        dir="rtl"
                                                      >
                                                        <span className="font-semibold text-gray-700 ml-1 shrink-0">
                                                          ({opt})
                                                        </span>
                                                        {effectiveIsEditMode ? (
                                                          <input
                                                            type="text"
                                                            value={urT}
                                                            onChange={(e) =>
                                                              updateMCQ(
                                                                questionIndex,
                                                                `option${opt}Urdu`,
                                                                e.target.value,
                                                              )
                                                            }
                                                            dir="rtl"
                                                            className="flex-1 text-[10px] text-gray-700 p-0.5 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 print:text-[8px] font-urdu"
                                                            placeholder={`${opt} اردو`}
                                                          />
                                                        ) : urT ? (
                                                          <span className="text-gray-700 flex-1">
                                                            {renderLatex(urT)}
                                                          </span>
                                                        ) : null}
                                                      </div>
                                                    )}
                                                  </div>
                                                );
                                              }

                                              const optionText = q[
                                                `option${opt}` as keyof typeof q
                                              ] as string;
                                              const isUrduOption =
                                                hasUrdu(optionText) ||
                                                hasUrdu(q?.questionText);

                                              return (
                                                <div
                                                  key={opt}
                                                  className={`flex items-start text-[10px] print:text-[8px] ${
                                                    isUrduOption &&
                                                    !isUrduOnlyPaperEffective
                                                      ? "flex-row-reverse"
                                                      : ""
                                                  }`}
                                                >
                                                  <span
                                                    className={`font-semibold text-gray-700 ${
                                                      isUrduOption
                                                        ? "ml-1"
                                                        : "mr-1"
                                                    }`}
                                                  >
                                                    ({opt})
                                                  </span>
                                                    {effectiveIsEditMode ? (
                                                      <input
                                                        type="text"
                                                        value={optionText || ""}
                                                        onChange={(e) =>
                                                          updateMCQ(
                                                            questionIndex,
                                                            `option${opt}`,
                                                            e.target.value,
                                                          )
                                                        }
                                                        dir={
                                                          isUrduOption
                                                            ? "rtl"
                                                            : "ltr"
                                                        }
                                                        className={`flex-1 text-[10px] text-gray-700 p-0.5 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 print:text-[8px] ${
                                                          isUrduOption
                                                            ? "font-urdu"
                                                            : ""
                                                        }`}
                                                        placeholder={`Option ${opt}`}
                                                      />
                                                    ) : (
                                                      <span
                                                        dir="ltr"
                                                        className={`text-gray-700 flex-1 ${
                                                          isUrduOption
                                                            ? "font-urdu"
                                                            : ""
                                                        }`}
                                                      >
                                                        {renderLatex(
                                                          isolateBidi(optionText ?? ""),
                                                        )}
                                                      </span>
                                                    )}
                                                </div>
                                              );
                                            });
                                          })()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        );
                      })()}

                    {/* SQs Section */}
                    {paper?.sQsList?.length > 0 &&
                      (() => {
                        return (
                          <div
                            className={`mb-3 px-4 print:mb-2 print:px-2 ${
                              isEnglishOnlyPaperMode ? "text-left" : ""
                            }`}
                            dir={isEnglishOnlyPaperMode ? "ltr" : undefined}
                          >
                            <div className="mb-2 print:mb-1">
                              <h3 className="text-sm font-bold text-gray-800 inline print:text-xs">
                                {isUrduOnlyPaperEffective
                                  ? "۲- مندرجہ ذیل مختصر سوالات کے جوابات لکھیں۔"
                                  : "2- Answer the following short questions."}
                              </h3>
                              <span className="text-xs text-gray-600 ml-2 print:text-[9px]">
                                ({paper?.testPaperDet?.attemptableSQs}×
                                {paper?.sQsList?.[0]?.marks || 2}=
                                {paper?.testPaperDet?.attemptableSQs *
                                  (paper?.sQsList?.[0]?.marks || 2)}
                                )
                              </span>
                              {paper?.sQsList?.length >
                                paper?.testPaperDet?.attemptableSQs && (
                                <span className="text-[9px] text-blue-600 ml-2 print:text-[7px]">
                                  [Attempt {paper?.testPaperDet?.attemptableSQs}{" "}
                                  out of {paper?.sQsList?.length}]
                                </span>
                              )}
                            </div>

                            <div className="space-y-2 print:space-y-1">
                              {paper?.sQsList?.map(
                                (q: any, questionIndex: number) => (
                                  <div
                                    key={questionIndex}
                                    className="border-b border-gray-200 pb-2 print:pb-1"
                                  >
                                    <div className="flex items-start">
                                      <span
                                        className={`font-bold text-gray-800 text-xs print:text-[9px] shrink-0 ${
                                          isUrduOnlyPaperEffective
                                            ? "ml-2"
                                            : "mr-2"
                                        }`}
                                      >
                                        {toRomanLower(questionIndex + 1)}.
                                      </span>
                                      <div className="flex-1">
                                        {effectiveIsEditMode ? (
                                          isPaperBilingualPaper &&
                                          isQuestionBilingual(q) ? (
                                            <div className="space-y-1">
                                              <textarea
                                                value={questionEnglishLine(q)}
                                                onChange={(e) =>
                                                  updateSQField(
                                                    questionIndex,
                                                    "questionTextEnglish",
                                                    e.target.value,
                                                  )
                                                }
                                                dir="ltr"
                                                className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-9 print:text-[9px]"
                                                placeholder="Question (English)"
                                              />
                                              <textarea
                                                value={questionUrduLine(q)}
                                                onChange={(e) =>
                                                  updateSQField(
                                                    questionIndex,
                                                    "questionTextUrdu",
                                                    e.target.value,
                                                  )
                                                }
                                                dir="rtl"
                                                className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-9 print:text-[9px] font-urdu"
                                                placeholder="سوال (اردو)"
                                              />
                                            </div>
                                          ) : (
                                            <textarea
                                              value={q?.questionText || ""}
                                              onChange={(e) =>
                                                updateSQ(
                                                  questionIndex,
                                                  e.target.value,
                                                )
                                              }
                                              dir={
                                                hasUrdu(q?.questionText)
                                                  ? "rtl"
                                                  : "ltr"
                                              }
                                              className={`w-full text-xs text-gray-800 mb-1 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-7.5 print:text-[9px] ${
                                                hasUrdu(q?.questionText)
                                                  ? "font-urdu"
                                                  : ""
                                              }`}
                                              placeholder="Enter question text"
                                            />
                                          )
                                        ) : isPaperBilingualPaper &&
                                          isQuestionBilingual(q) ? (
                                          <div className="space-y-1">
                                            <p
                                              dir="ltr"
                                              className="text-xs text-gray-800 print:text-[9px]"
                                            >
                                              {renderSQOrLQDisplayText(
                                                questionEnglishLine(q),
                                              )}
                                            </p>
                                            <p
                                              dir="rtl"
                                              className="text-xs text-gray-800 font-urdu print:text-[9px]"
                                            >
                                              {renderSQOrLQDisplayText(
                                                questionUrduLine(q),
                                              )}
                                            </p>
                                          </div>
                                        ) : (
                                          <p
                                            dir="ltr"
                                            className={`text-xs text-gray-800 print:text-[9px] ${
                                              hasUrdu(q?.questionText)
                                                ? "font-urdu"
                                                : ""
                                            }`}
                                          >
                                            {renderSQOrLQDisplayText(
                                              isolateBidi(q?.questionText ?? ""),
                                            )}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        );
                      })()}

                    {/* LQs Section */}
                    {paper?.lQsList?.length > 0 &&
                      (() => {
                        return (
                          <div className="mb-3 px-4 print:mb-2 print:px-2">
                            <div className="mb-2 print:mb-1">
                              <h3 className="text-sm font-bold text-gray-800 inline print:text-xs">
                                {isUrduOnlyPaperEffective
                                  ? "۳- مندرجہ ذیل مفصل سوالات کے جوابات لکھیں۔"
                                  : "3- Answer the following detailed questions."}
                              </h3>
                              <span className="text-xs text-gray-600 ml-2 print:text-[9px]">
                                ({paper?.testPaperDet?.attemptableLQs}×
                                {paper?.lQsList?.[0]?.marks || 5}=
                                {paper?.testPaperDet?.attemptableLQs *
                                  (paper?.lQsList?.[0]?.marks || 5)}
                                )
                              </span>
                              {paper?.lQsList?.length >
                                paper?.testPaperDet?.attemptableLQs && (
                                <span className="text-[9px] text-blue-600 ml-2 print:text-[7px]">
                                  [Attempt {paper?.testPaperDet?.attemptableLQs}{" "}
                                  out of {paper?.lQsList?.length}]
                                </span>
                              )}
                            </div>

                            <div className="space-y-2 print:space-y-1">
                              {paper?.lQsList?.map(
                                (q: any, questionIndex: number) => (
                                  <div
                                    key={questionIndex}
                                    className="border-b border-gray-200 pb-2 print:pb-1"
                                  >
                                    <div className="flex items-start">
                                      <span
                                        className={`font-bold text-gray-800 text-xs print:text-[9px] shrink-0 ${
                                          isUrduOnlyPaperEffective
                                            ? "ml-2"
                                            : "mr-2"
                                        }`}
                                      >
                                        {toRomanLower(questionIndex + 1)}.
                                      </span>
                                      <div className="flex-1">
                                        {effectiveIsEditMode ? (
                                          isPaperBilingualPaper &&
                                          isQuestionBilingual(q) ? (
                                            <div className="space-y-1">
                                              <textarea
                                                value={questionEnglishLine(q)}
                                                onChange={(e) =>
                                                  updateLQField(
                                                    questionIndex,
                                                    "questionTextEnglish",
                                                    e.target.value,
                                                  )
                                                }
                                                dir="ltr"
                                                className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-9 print:text-[9px]"
                                                placeholder="Question (English)"
                                              />
                                              <textarea
                                                value={questionUrduLine(q)}
                                                onChange={(e) =>
                                                  updateLQField(
                                                    questionIndex,
                                                    "questionTextUrdu",
                                                    e.target.value,
                                                  )
                                                }
                                                dir="rtl"
                                                className="w-full text-xs text-gray-800 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-9 print:text-[9px] font-urdu"
                                                placeholder="سوال (اردو)"
                                              />
                                            </div>
                                          ) : (
                                            <textarea
                                              value={q?.questionText || ""}
                                              onChange={(e) =>
                                                updateLQ(
                                                  questionIndex,
                                                  e.target.value,
                                                )
                                              }
                                              dir={
                                                hasUrdu(q?.questionText)
                                                  ? "rtl"
                                                  : "ltr"
                                              }
                                              className={`w-full text-xs text-gray-800 mb-1 p-1 border-2 border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-7.5 print:text-[9px] ${
                                                hasUrdu(q?.questionText)
                                                  ? "font-urdu"
                                                  : ""
                                              }`}
                                              placeholder="Enter question text"
                                            />
                                          )
                                        ) : isPaperBilingualPaper &&
                                          isQuestionBilingual(q) ? (
                                          <div className="space-y-1">
                                            <p
                                              dir="ltr"
                                              className="text-xs text-gray-800 print:text-[9px]"
                                            >
                                              {renderSQOrLQDisplayText(
                                                questionEnglishLine(q),
                                              )}
                                            </p>
                                            <p
                                              dir="rtl"
                                              className="text-xs text-gray-800 font-urdu print:text-[9px]"
                                            >
                                              {renderSQOrLQDisplayText(
                                                questionUrduLine(q),
                                              )}
                                            </p>
                                          </div>
                                        ) : (
                                          <p
                                            dir="ltr"
                                            className={`text-xs text-gray-800 print:text-[9px] ${
                                              hasUrdu(q?.questionText)
                                                ? "font-urdu"
                                                : ""
                                            }`}
                                          >
                                            {renderSQOrLQDisplayText(
                                              isolateBidi(q?.questionText ?? ""),
                                            )}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>

                            {/* Footer for LQs */}
                            <PaperFooter />
                          </div>
                        );
                      })()}

                    {/* Footer for papers without LQs */}
                    {!(paper?.lQsList?.length > 0) && <PaperFooter />}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
