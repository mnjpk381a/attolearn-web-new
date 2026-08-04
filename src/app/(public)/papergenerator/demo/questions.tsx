"use client";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { FaXmark } from "react-icons/fa6";

type QuestionItem = {
  questionID: number;
  questionType?: "MCQ" | "SQ" | "LQ" | string;
  questionText?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
};

type QuestionsProps = {
  selectedClass?: string;
  subject?: string;
  chapters?: string | string[];
  questions: QuestionItem[];
  onClose: () => void;
  selectedQuestions: number[];
  setSelectedQuestions: Dispatch<SetStateAction<number[]>>;
  onPaperGen: () => void;
};

export default function Questions({
  selectedClass,
  subject,
  chapters,
  questions,
  onClose,
  selectedQuestions,
  setSelectedQuestions,
  onPaperGen,
}: QuestionsProps) {
  const chapterText = Array.isArray(chapters) ? chapters.join(", ") : chapters;
  const mcQsList = questions?.filter(
    (i: QuestionItem) => i.questionType === "MCQ",
  );
  const sQsList = questions?.filter(
    (i: QuestionItem) => i.questionType === "SQ",
  );
  const lQsList = questions?.filter(
    (i: QuestionItem) => i.questionType === "LQ",
  );

  useEffect(() => {
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
  }, []);

  function handleQuestionSelection(id: number): void {
    setSelectedQuestions((prev: number[]) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  function handleGeneratePaperClick(): void {
    if (!selectedQuestions || selectedQuestions.length === 0) {
      window.alert(
        "No question was selected. Please, select some questions to Generate a Paper.",
      );
      return;
    }

    onPaperGen();
  }

  return (
    <div className="fixed inset-0 z-9999 bg-white overflow-hidden">
      <style jsx global>{`
        .questions-modal-scroll {
          height: 100%;
          max-height: 100%;
          overflow-y: scroll !important;
          overscroll-behavior: contain;
          scrollbar-width: auto;
          scrollbar-color: #007381 #d9f3f5;
          touch-action: pan-y;
        }

        .questions-modal-scroll::-webkit-scrollbar {
          width: 14px;
          height: 14px;
        }

        .questions-modal-scroll::-webkit-scrollbar-track {
          background: #d9f3f5;
        }

        .questions-modal-scroll::-webkit-scrollbar-thumb {
          background-color: #007381;
          border-radius: 9999px;
          border: 3px solid #d9f3f5;
        }

        .questions-modal-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #005f69;
        }
      `}</style>

      <div className="flex h-screen w-screen flex-col bg-white text-black overflow-hidden">
        {/* Header / Action Bar */}
        <div className="shrink-0 bg-white z-20 border-b border-gray-200 shadow-sm">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold text-gray-900">
              {`Questions List for ${selectedClass} ${subject}`}
            </h2>

            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <FaXmark className="text-red-500 text-xl" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          className="questions-modal-scroll min-h-0 flex-1 overflow-y-scroll overscroll-contain bg-[#eefafa] px-4 py-4"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="relative bg-white mx-auto w-full max-w-7xl min-h-screen shadow-sm">
            {/* Paper Info */}
            <div className="px-4 pt-4 mt-0 mb-4">
              <h3 className="text-base my-2">
                <strong>Chapters: </strong>
                {chapterText}
              </h3>
              <h3 className="text-base">
                <strong>Note: </strong>Select your questions from the list below
                to generate exam paper:
              </h3>
            </div>

            {/* Questions Content */}
            <div className="px-4 pb-8">
              {/* MCQ Section */}
              <h3 className="font-bold">PART A: Multiple Choice Questions</h3>
              <div className="space-y-4 mt-2">
                {mcQsList.map((q: QuestionItem, questionIndex: number) => (
                  <div
                    key={questionIndex}
                    className="flex flex-row justify-between items-start mx-2 border p-3 rounded bg-white"
                  >
                    <div className="flex-col mx-1">
                      <p>
                        <strong>Q{questionIndex + 1}: </strong>{" "}
                        {q?.questionText}
                      </p>
                      <div className="space-y-2 m-2">
                        {(["A", "B", "C", "D"] as const).map((opt, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center"
                          >
                            <span className="flex-1 ml-6">{`(${opt}) ${
                              q[`option${opt}` as keyof typeof q]
                            }`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <input
                        type="checkbox"
                        checked={selectedQuestions?.includes(q?.questionID)}
                        onChange={() => handleQuestionSelection(q?.questionID)}
                        className="w-5 h-5 text-[#007381] border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Short Questions */}
              <h3 className="font-bold mt-4">PART B: Short Questions</h3>
              <div className="space-y-4 mt-2">
                {sQsList.map((q: QuestionItem, questionIndex: number) => (
                  <div
                    key={questionIndex}
                    className="flex flex-row justify-between items-start mx-2 border p-3 rounded bg-white"
                  >
                    <div className="flex-col mx-1">
                      <p>
                        <strong>Q{questionIndex + 1}: </strong>{" "}
                        {q?.questionText}
                      </p>
                    </div>
                    <div className="text-right">
                      <input
                        type="checkbox"
                        checked={selectedQuestions?.includes(q?.questionID)}
                        onChange={() => handleQuestionSelection(q?.questionID)}
                        className="w-5 h-5 text-[#007381] border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Long Questions */}
              <h3 className="font-bold mt-4">PART C: Long Questions</h3>
              <div className="space-y-4 mt-2 pb-6">
                {lQsList.map((q: QuestionItem, questionIndex: number) => (
                  <div
                    key={questionIndex}
                    className="flex flex-row justify-between items-start mx-2 border p-3 rounded bg-white"
                  >
                    <div className="flex-col mx-1">
                      <p>
                        <strong>Q{questionIndex + 1}: </strong>{" "}
                        {q?.questionText}
                      </p>
                    </div>
                    <div className="text-right">
                      <input
                        type="checkbox"
                        checked={selectedQuestions?.includes(q?.questionID)}
                        onChange={() => handleQuestionSelection(q?.questionID)}
                        className="w-5 h-5 text-[#007381] border-gray-300 rounded focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Generate Paper Button at Last */}
              <div className="mt-8 border-t bg-white py-5 flex justify-end">
                <button
                  className="bg-[#007381] text-white px-5 py-2 rounded shadow-md hover:bg-teal-700 transition"
                  onClick={handleGeneratePaperClick}
                >
                  {"Generate Paper"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
