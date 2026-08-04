"use client";

import NoData from "@/components/NoData";
import SearchDropdown from "@/components/SearchDropdown";
import API from "@/constants/API";
import {
  Complexity,
  QuestionCats,
  SkillTypes,
} from "@/constants/questions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlusCircle } from "react-icons/fa";
import {
  FaPencil,
  FaTrashCan,
  FaX,
} from "react-icons/fa6";
export default function ChapterQuestions({
  selectedClass,
  subject,
  chapter,
  openAddQuestion,
  onClose,
  onCloseAddQuestion,
  onDel,
}: any) {
  const [questions, setQuestions] = useState<any>([]);
  const [eidtMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [editedQuestion, setEditedQuestion] = useState<any>({
    questionID: 0,
    chapterID: chapter?.chapterID,
    topic: "",
    questionText: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    questionType: "",
    marks: 1,
    complexity: "",
    skillType: "",
    questionCategory: "",
  });
  const [filter, setFilter] = useState("All"); // State to manage the selected filter

  // Filter questions based on the selected filter
  const filteredQuestions = questions.filter((q: { questionType: string }) => {
    if (filter === "All") return true; // Show all questions if "All" is selected
    return q.questionType === filter; // Filter by question type
  });
  async function getQuestions() {
    try {
      const res = await axios.get(
        `${API.CHAPTERQUESTIONS_GET}?ChapterID=${chapter?.chapterID}`
      );
      if (res?.data) {
        setQuestions(res?.data);
      }
    } catch {}
  }

  useEffect(() => {
    if (!chapter?.chapterID) return;
    getQuestions();
  }, [chapter?.chapterID]);

  function handleInputChange(val: string, type: string): void {
    setEditedQuestion({
      ...editedQuestion,
      [type]: val,
    });
  }

  async function handleFormSubmit() {
    try {
      if (editedQuestion?.questionText === "") {
        toast.error("Question Text required.");
        return;
      } else if (editedQuestion?.questionType === "") {
        toast.error("Question Type is required.");
        return;
      } else if (editedQuestion?.questionType === "MCQ") {
        if (
          editedQuestion?.optionA.trim() === "" ||
          editedQuestion?.optionB.trim() === "" ||
          editedQuestion?.optionC.trim() === "" ||
          editedQuestion?.optionD.trim() === ""
        ) {
          toast.error("All options are required for MCQs");
          return;
        }
      } else if (editedQuestion?.marks < 1) {
        toast.error("Enter a value for Marks");
        return;
      } else if (editedQuestion?.complexity === "") {
        toast.error("Question complexity is required");
        return;
      } else if (editedQuestion?.questionCategory === "") {
        toast.error("Question category is required");
        return;
      } else if (editedQuestion?.skillType === "") {
        toast.error("Question skill type is required");
        return;
      }

      const res = await axios.post(`${API?.QUESTION_SAVE}`, editedQuestion);
      if (res?.data) {
        await getQuestions();
        setShowModal(false);
        if (onCloseAddQuestion) onCloseAddQuestion();
        toast.success("Question saved successfully.");
      }
    } catch {}
  }

  async function handleDeleteQuestion(questionID: any) {
    try {
      const userResponse = window.confirm(
        "Are you sure you want to remove this question?"
      );
      if (userResponse) {
        const resp = await axios.delete(
          `${API.RECORD_DEL}?tbl=Questions&id=${questionID}`
        );
        if (resp && resp.data) {
          getQuestions();
          toast.success("Question was removed successfully.");
        }
      }
    } catch (error: any) {
      console.error("Error removing question:", error);
      toast.error("Failed to remove question. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-2 rounded shadow-md w-[90%] h-[90%] mb-4 text-gray-950">
        <button
          onClick={onClose}
          className="flex justify-end items-center w-full text-right bg-white pb-2 rounded-full"
        >
          <FaX className="text-lg text-red-500" />
        </button>
        {/* Header (Fixed) */}
        <div className="sticky top-0 p-2 mx-4 z-10 flex flex-row justify-between items-center border-b rounded">
          <div className="flex flex-row justify-start items-center">
            <h2 className="text-xl font-bold ">{`${chapter?.chapterName}`}</h2>{" "}
            <h2 className="ml-4 text-xl">{`(${selectedClass} - ${subject})`}</h2>
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={() => {
                setEditedQuestion({
                  questionID: 0,
                  chapterID: chapter?.chapterID,
                  questionText: "",
                  optionA: "",
                  optionB: "",
                  optionC: "",
                  optionD: "",
                  correctAnswer: "",
                  questionType: "MCQ",
                  marks: 1,
                  complexity: "",
                  skillType: "",
                  questionCategory: "",
                });
                setEditMode(false);
                setShowModal(true);
              }}
              className="text-[#007381] p-2 rounded-full"
            >
              <FaPlusCircle className="text-3xl" />
            </button>
          </div>
        </div>
        <div className="mb-2 md:mb-12 bg-white overflow-scroll text-black">
          {/* Filter Buttons */}
          <div className="flex space-x-4 p-4 border-b">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 rounded ${
                filter === "All" ? "bg-[#007381] text-white" : "bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("MCQ")}
              className={`px-4 py-2 rounded ${
                filter === "MCQ" ? "bg-[#007381] text-white" : "bg-gray-200"
              }`}
            >
              MCQs
            </button>
            <button
              onClick={() => setFilter("SQ")}
              className={`px-4 py-2 rounded ${
                filter === "SQ" ? "bg-[#007381] text-white" : "bg-gray-200"
              }`}
            >
              SQs
            </button>
            <button
              onClick={() => setFilter("LQ")}
              className={`px-4 py-2 rounded ${
                filter === "LQ" ? "bg-[#007381] text-white" : "bg-gray-200"
              }`}
            >
              LQs
            </button>
          </div>

          {/* Question List */}
          <div className="flex-1 overflow-y-auto p-2 max-h-[70vh]">
            {filteredQuestions.length === 0 ? (
              <NoData /> // Show "No Data" message if no questions match the filter
            ) : (
              filteredQuestions.map(
                (
                  q: {
                    [x: string]: any;
                    questionID: React.Key | null | undefined;
                    questionText:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactPortal
                          | React.ReactElement<
                              unknown,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    questionType: string;
                  },
                  questionIndex: number
                ) => (
                  <div
                    key={q?.questionID}
                    className="flex flex-row justify-between items-start mx-2 border p-3 rounded mb-2"
                  >
                    <div className="flex-col mx-1">
                      <strong>Q{questionIndex + 1}: </strong> {q?.questionText}
                      {q?.questionType === "MCQ" && (
                        <div className="flex flex-row justify-start items-center px-6">
                          {(["A", "B", "C", "D"] as const).map((opt, i) => (
                            <div
                              key={i}
                              className="flex justify-start items-center"
                            >
                              <span className="flex-1 ml-4">{`(${opt}) ${
                                q[`option${opt}` as keyof typeof q]
                              }`}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        onClick={() => {
                          setEditedQuestion(q);
                          setEditMode(true);
                          setShowModal(true);
                        }}
                        className="text-[#007381] p-2 rounded-full"
                      >
                        <FaPencil className="text-1xl" />
                      </button>
                      <button
                        onClick={() => {
                          handleDeleteQuestion(q?.questionID);
                        }}
                        className="text-red-500 p-2 rounded-full"
                      >
                        <FaTrashCan className="text-1xl" />
                      </button>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300">
          <div
            className="bg-white p-6 rounded shadow-lg w-100 transform scale-100 transition-transform duration-300
                max-h-[80vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {`${editedQuestion?.questionID > 0 ? "Edit" : "Add"} Question`}
            </h2>
            <div className="text-black">
              {/* Question Type Selector */}
              <div className="mb-4">
                <h3 className="text-lg font-medium">Question Type</h3>
                <div className="flex gap-2 mt-2">
                  {eidtMode ? (
                    <button
                      className={`px-4 py-2 rounded bg-[#007381] text-white`}
                      onClick={() => {}}
                    >
                      {editedQuestion?.questionType}
                    </button>
                  ) : (
                    ["MCQ", "SQ", "LQ"].map((type) => (
                      <button
                        key={type}
                        className={`px-4 py-2 rounded ${
                          editedQuestion?.questionType === type
                            ? "bg-[#007381] text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => {
                          handleInputChange(
                            type as "MCQ" | "SQ" | "LQ",
                            "questionType"
                          );
                        }}
                      >
                        {type}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Question Input */}
              <div className="mb-4">
                <h3 className="text-lg font-medium">Question</h3>
                <textarea
                  className="w-full border p-2 rounded mt-2"
                  placeholder="Enter your question"
                  value={editedQuestion?.questionText}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "questionText")
                  }
                />
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium">Topic</h3>
                <input
                  className="w-full border p-2 rounded mt-2"
                  placeholder="Enter your topic"
                  value={editedQuestion?.topic ?? ""}
                  onChange={(e) => handleInputChange(e.target.value, "topic")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">
                  Complexity
                </label>
                <SearchDropdown
                  key={`complexity-${editedQuestion?.questionID ?? "new"}-${editedQuestion?.complexity ?? ""}`}
                  suggestions={Complexity}
                  onSelect={(val) =>
                    setEditedQuestion((prev: any) => ({
                      ...prev,
                      complexity: val,
                    }))
                  }
                  initialValue={editedQuestion?.complexity}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">
                  Question Category
                </label>
                <SearchDropdown
                  key={`category-${editedQuestion?.questionID ?? "new"}-${editedQuestion?.questionCategory ?? ""}`}
                  suggestions={QuestionCats}
                  onSelect={(val) =>
                    setEditedQuestion((prev: any) => ({
                      ...prev,
                      questionCategory: val,
                    }))
                  }
                  initialValue={editedQuestion?.questionCategory}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">
                  Skill Type
                </label>
                <SearchDropdown
                  key={`skill-${editedQuestion?.questionID ?? "new"}-${editedQuestion?.skillType ?? ""}`}
                  suggestions={SkillTypes}
                  onSelect={(val) =>
                    setEditedQuestion((prev: any) => ({
                      ...prev,
                      skillType: val,
                    }))
                  }
                  initialValue={editedQuestion?.skillType}
                />
              </div>

              {/* MCQ Options */}
              {editedQuestion?.questionType === "MCQ" && (
                <div>
                  <h3 className="text-lg font-medium">Options</h3>
                  {["A", "B", "C", "D"].map((option) => (
                    <div key={option} className="flex items-center gap-2 mt-2">
                      <span>{option}:</span>
                      <input
                        type="text"
                        className="border p-2 rounded w-full"
                        placeholder={`Option ${option}`}
                        value={
                          option === "A"
                            ? editedQuestion?.optionA
                            : option === "B"
                            ? editedQuestion?.optionB
                            : option === "C"
                            ? editedQuestion?.optionC
                            : editedQuestion?.optionD
                        }
                        onChange={(e) =>
                          handleInputChange(e.target.value, `option${option}`)
                        }
                      />
                      <button
                        className={`px-3 py-1 rounded ${
                          editedQuestion?.correctAnswer === option
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                        onClick={() =>
                          handleInputChange(
                            option as "A" | "B" | "C" | "D",
                            "correctAnswer"
                          )
                        }
                      >
                        Correct
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium mt-3">Marks</h3>
                <input
                  type="number"
                  name="marks"
                  min={1}
                  value={editedQuestion?.marks ?? 1}
                  onChange={(e) => handleInputChange(e.target.value, "marks")}
                  className="w-full border p-2 rounded mb-3"
                  placeholder="Marks"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={() => {
                  if (setShowModal) setShowModal(false);
                  if (onCloseAddQuestion) onCloseAddQuestion();
                }}
                className="w-22.5 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFormSubmit}
                className="w-22.5 bg-[#007381] hover:bg-teal-800 text-white px-4 py-2 rounded transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {openAddQuestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300">
          <div
            className="bg-white p-6 rounded shadow-lg w-100 transform scale-100 transition-transform duration-300
                max-h-[80vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              {`${editedQuestion?.questionID > 0 ? "Edit" : "Add"} Question`}
            </h2>
            <div className="text-black">
              {/* Question Type Selector */}
              <div className="mb-4">
                <h3 className="text-lg font-medium">Question Type</h3>
                <div className="flex gap-2 mt-2">
                  {eidtMode ? (
                    <button
                      className={`px-4 py-2 rounded bg-[#007381] text-white`}
                      onClick={() => {}}
                    >
                      {editedQuestion?.questionType}
                    </button>
                  ) : (
                    ["MCQ", "SQ", "LQ"].map((type) => (
                      <button
                        key={type}
                        className={`px-4 py-2 rounded ${
                          editedQuestion?.questionType === type
                            ? "bg-[#007381] text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => {
                          handleInputChange(
                            type as "MCQ" | "SQ" | "LQ",
                            "questionType"
                          );
                        }}
                      >
                        {type}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Question Input */}
              <div className="mb-4">
                <h3 className="text-lg font-medium">Question</h3>
                <textarea
                  className="w-full border p-2 rounded mt-2"
                  placeholder="Enter your question"
                  value={editedQuestion?.questionText}
                  onChange={(e) =>
                    handleInputChange(e.target.value, "questionText")
                  }
                />
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium">Topic</h3>
                <input
                  className="w-full border p-2 rounded mt-2"
                  placeholder="Enter your topic"
                  value={editedQuestion?.topic ?? ""}
                  onChange={(e) => handleInputChange(e.target.value, "topic")}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">
                  Complexity
                </label>
                <SearchDropdown
                  key={`complexity-${editedQuestion?.questionID ?? "new"}-${editedQuestion?.complexity ?? ""}`}
                  suggestions={Complexity}
                  onSelect={(val) =>
                    setEditedQuestion((prev: any) => ({
                      ...prev,
                      complexity: val,
                    }))
                  }
                  initialValue={editedQuestion?.complexity}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">
                  Question Category
                </label>
                <SearchDropdown
                  key={`category-${editedQuestion?.questionID ?? "new"}-${editedQuestion?.questionCategory ?? ""}`}
                  suggestions={QuestionCats}
                  onSelect={(val) =>
                    setEditedQuestion((prev: any) => ({
                      ...prev,
                      questionCategory: val,
                    }))
                  }
                  initialValue={editedQuestion?.questionCategory}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-medium mb-1">
                  Skill Type
                </label>
                <SearchDropdown
                  key={`skill-${editedQuestion?.questionID ?? "new"}-${editedQuestion?.skillType ?? ""}`}
                  suggestions={SkillTypes}
                  onSelect={(val) =>
                    setEditedQuestion((prev: any) => ({
                      ...prev,
                      skillType: val,
                    }))
                  }
                  initialValue={editedQuestion?.skillType}
                />
              </div>

              {/* MCQ Options */}
              {editedQuestion?.questionType === "MCQ" && (
                <div>
                  <h3 className="text-lg font-medium">Options</h3>
                  {["A", "B", "C", "D"].map((option) => (
                    <div key={option} className="flex items-center gap-2 mt-2">
                      <span>{option}:</span>
                      <input
                        type="text"
                        className="border p-2 rounded w-full"
                        placeholder={`Option ${option}`}
                        value={
                          option === "A"
                            ? editedQuestion?.optionA
                            : option === "B"
                            ? editedQuestion?.optionB
                            : option === "C"
                            ? editedQuestion?.optionC
                            : editedQuestion?.optionD
                        }
                        onChange={(e) =>
                          handleInputChange(e.target.value, `option${option}`)
                        }
                      />
                      <button
                        className={`px-3 py-1 rounded ${
                          editedQuestion?.correctAnswer === option
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                        onClick={() =>
                          handleInputChange(
                            option as "A" | "B" | "C" | "D",
                            "correctAnswer"
                          )
                        }
                      >
                        Correct
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium mt-3">Marks</h3>
                <input
                  type="number"
                  name="marks"
                  min={1}
                  value={editedQuestion?.marks ?? 1}
                  onChange={(e) => handleInputChange(e.target.value, "marks")}
                  className="w-full border p-2 rounded mb-3"
                  placeholder="Marks"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={() => {
                  if (setShowModal) setShowModal(false);
                  if (onCloseAddQuestion) onCloseAddQuestion();
                }}
                className="w-22.5 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFormSubmit}
                className="w-22.5 bg-[#007381] hover:bg-teal-800 text-white px-4 py-2 rounded transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
