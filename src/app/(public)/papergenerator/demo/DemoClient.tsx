"use client";

import React, {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  // FaArrowRight,
  FaChevronDown,
  FaCircleArrowLeft,
  FaCirclePlus,
  FaPenFancy,
  // FaCirclePlay,
  // FaDownload,
  // FaPrint,
  // FaShareNodes,
  // FaXmark,
} from "react-icons/fa6";
import AppLoader from "@/components/AppLoader";
import NoData from "@/components/NoData";
import Image from "next/image";
import toast from "react-hot-toast";
import { getPaperPrintTemplate } from "@/utils/printUtils";
import Select, { components, SingleValue } from "react-select";
import { FaTimes } from "react-icons/fa";
import { ClassesData, EduBoardNames } from "@/constants/education";
import axios from "axios";
import API from "@/constants/API";
import { formatDateTime } from "@/utils/commonMethods";
import Questions from "./questions";
import ChapterQuestions from "./chapterquestions";
import PaperTypeModal, { TestTypeWithDetails } from "./PaperTypeModal";
import PaperModal from "./PaperModal";
import AutoMCQsModal from "./AutoMCQsModal";
import CustomAlert from "@/components/CustomAlert";

const openPaperPrintHtmlInIframe = (html: string) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.setAttribute("aria-hidden", "true");

  document.body.appendChild(iframe);

  const iframeWindow = iframe.contentWindow;
  const iframeDocument = iframe.contentDocument || iframeWindow?.document;

  if (!iframeWindow || !iframeDocument) {
    document.body.removeChild(iframe);
    return;
  }

  iframeDocument.open();
  iframeDocument.write(html);
  iframeDocument.close();

  iframe.onload = () => {
    iframeWindow.focus();
    iframeWindow.print();

    window.setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 1000);
  };
};

type BoardOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

type ExamTypeOption = {
  id: number;
  name: string;
};

type ApiWithExamTypes = typeof API & {
  EXAM_TYPES_GET?: string;
};

type GenerationMode = "auto" | "template" | "manual";

type ClassItem = {
  classID: number;
  className: string;
};

type SubjectItem = {
  subjectID?: number;
  subjectName: string;
  totalMCQs?: string;
  totalSQs?: string;
  totalLQs?: string;
  attemptableMCQs?: string;
  attemptableSQs?: string;
  attemptableLQs?: string;
};

type TopicItem = {
  topicID: number;
  title: string;
};

type ChapterItem = {
  chapterID: number;
  chapterName: string;
  chapterNo?: number | null;
  topics?: TopicItem[];
  isTBChapter?: boolean;
};

type QuestionItem = {
  questionID: number;
  questionText?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
};

type PaperQuestion = {
  questionID?: number;
  chapterID?: number;
  chapterName?: string;
  topic?: string;
  questionText?: string;
  /** Bilingual (GetGeneratedPaper): English stem */
  questionTextEnglish?: string;
  /** Bilingual: Urdu stem */
  questionTextUrdu?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionAEnglish?: string;
  optionAUrdu?: string;
  optionBEnglish?: string;
  optionBUrdu?: string;
  optionCEnglish?: string;
  optionCUrdu?: string;
  optionDEnglish?: string;
  optionDUrdu?: string;
  marks?: number;
};

type PaperDetails = {
  testPaperID?: number;
  title?: string;
  createdAt?: string;
  chapters?: string;
  attemptableMCQs?: number;
  attemptableSQs?: number;
  attemptableLQs?: number;
  /** From API: e.g. BILINGUAL, en, ur */
  savedPaperLangMode?: string;
  renderPaperLangMode?: string;
  /** Set when content is clearly bilingual */
  paperLangMode?: string;
};

type PaperData = {
  testPaperDet?: PaperDetails;
  mcQsList?: PaperQuestion[];
  sQsList?: PaperQuestion[];
  lQsList?: PaperQuestion[];
};

type GeneratedPaperQuestion = {
  questionTypeCode?: string | null;
  questionID?: number;
  chapterID?: number;
  chapterName?: string;
  topic?: string;
  marks?: number | null;
  primaryQuestionText?: string;
  secondaryQuestionText?: string;
  englishQuestionText?: string;
  urduQuestionText?: string;
  englishOptionA?: string;
  englishOptionB?: string;
  englishOptionC?: string;
  englishOptionD?: string;
  urduOptionA?: string;
  urduOptionB?: string;
  urduOptionC?: string;
  urduOptionD?: string;
};

type GeneratedPaperHeader = {
  testPaperID?: number;
  title?: string;
  createdAt?: string;
  chapters?: string;
  attemptableSQs?: number;
  attemptableLQs?: number;
  savedPaperLangMode?: string;
  renderPaperLangMode?: string;
};

type GeneratedPaperApiData = {
  header?: GeneratedPaperHeader;
  questions?: GeneratedPaperQuestion[];
};

type GeneratedPaperApiResponse = {
  success?: boolean;
  data?: GeneratedPaperApiData | null;
};

type MyPaperItem = {
  testPaperID: number;
};

type SubjectApiItem = {
  subjectID: number;
  subjectName: string;
};

type ErrorResponseData = {
  message?: string;
  code?: string;
};

const hasUrdu = (text?: string | null) => /[\u0600-\u06FF]/.test(text || "");

const pickQuestionText = (q: GeneratedPaperQuestion): string =>
  q.primaryQuestionText ||
  q.secondaryQuestionText ||
  q.englishQuestionText ||
  q.urduQuestionText ||
  "";

const pickOption = (english?: string, urdu?: string): string =>
  english || urdu || "";

const norm = (s?: string | null) => (s || "").trim();

/** True when both language strings exist and differ (bilingual row). */
const isBilingualPair = (a: string, b: string) => Boolean(a && b && a !== b);

/**
 * Many mix APIs return `{ success, data: <payload> }`. Walk `.data` until we see
 * a paper-shaped object so `testPaperID` / lists are addressable.
 */
function unwrapPaperApiPayload(raw: unknown, depth = 0): unknown {
  if (raw == null || typeof raw !== "object" || depth > 6) return raw;
  const o = raw as Record<string, unknown>;
  const hasPaperShape =
    "testPaperDet" in o ||
    "TestPaperDet" in o ||
    "header" in o ||
    "Header" in o ||
    "mcQsList" in o ||
    "mcqsList" in o ||
    "mCQsList" in o ||
    Array.isArray(o.questions);
  if (hasPaperShape) return o;
  const inner =
    ("data" in o && o.data != null && typeof o.data === "object"
      ? o.data
      : null) ??
    ("Data" in o && o.Data != null && typeof o.Data === "object"
      ? o.Data
      : null);
  if (inner) return unwrapPaperApiPayload(inner, depth + 1);
  return o;
}

/** Resolve test paper id from generate/get responses, including wrapped envelopes. */
function extractTestPaperIdFromPayload(raw: unknown): number | undefined {
  const walk = (node: unknown, depth: number): number | undefined => {
    if (node == null || typeof node !== "object" || depth > 6) return undefined;
    const o = node as Record<string, unknown>;
    const det = (o.testPaperDet ?? o.TestPaperDet) as
      | Record<string, unknown>
      | undefined;
    const header = (o.header ?? o.Header) as
      | Record<string, unknown>
      | undefined;
    const candidates = [
      det?.testPaperID,
      det?.TestPaperID,
      o.testPaperID,
      o.TestPaperID,
      header?.testPaperID,
      header?.TestPaperID,
    ];
    for (const c of candidates) {
      const n = Number(c);
      if (Number.isFinite(n) && n > 0) return n;
    }
    const next =
      "data" in o && o.data != null && typeof o.data === "object"
        ? o.data
        : "Data" in o && o.Data != null && typeof o.Data === "object"
          ? o.Data
          : null;
    if (next) return walk(next, depth + 1);
    return undefined;
  };
  return walk(raw, 0);
}

const mapGeneratedPaperResponse = (
  payload: GeneratedPaperApiData | null | undefined,
): PaperData | null => {
  if (!payload?.header) return null;

  const questions = Array.isArray(payload.questions) ? payload.questions : [];
  const mcQsList: PaperQuestion[] = [];
  const sQsList: PaperQuestion[] = [];
  const lQsList: PaperQuestion[] = [];

  questions.forEach((q) => {
    const enQ = norm(q.englishQuestionText) || norm(q.primaryQuestionText);
    let urQ = norm(q.urduQuestionText) || norm(q.secondaryQuestionText);
    if (urQ === enQ) urQ = "";
    const questionText =
      enQ && urQ ? `${enQ} / ${urQ}` : pickQuestionText(q) || enQ || urQ;

    const oAEn = norm(q.englishOptionA);
    const oAUr = norm(q.urduOptionA);
    const oBEn = norm(q.englishOptionB);
    const oBUr = norm(q.urduOptionB);
    const oCEn = norm(q.englishOptionC);
    const oCUr = norm(q.urduOptionC);
    const oDEn = norm(q.englishOptionD);
    const oDUr = norm(q.urduOptionD);

    const optionA = pickOption(q.englishOptionA, q.urduOptionA);
    const optionB = pickOption(q.englishOptionB, q.urduOptionB);
    const optionC = pickOption(q.englishOptionC, q.urduOptionC);
    const optionD = pickOption(q.englishOptionD, q.urduOptionD);
    const questionTypeCode = (q.questionTypeCode || "").toUpperCase();

    const mappedQuestion: PaperQuestion = {
      questionID: q.questionID,
      chapterID: q.chapterID,
      chapterName: q.chapterName,
      topic: q.topic,
      marks: q.marks ?? undefined,
      questionText,
      questionTextEnglish: enQ || undefined,
      questionTextUrdu: urQ || undefined,
      optionA,
      optionB,
      optionC,
      optionD,
      optionAEnglish: oAEn || undefined,
      optionAUrdu: oAUr || undefined,
      optionBEnglish: oBEn || undefined,
      optionBUrdu: oBUr || undefined,
      optionCEnglish: oCEn || undefined,
      optionCUrdu: oCUr || undefined,
      optionDEnglish: oDEn || undefined,
      optionDUrdu: oDUr || undefined,
    };

    const hasOptions = Boolean(optionA || optionB || optionC || optionD);
    if (questionTypeCode.includes("LQ")) {
      lQsList.push(mappedQuestion);
    } else if (questionTypeCode.includes("SQ")) {
      sQsList.push(mappedQuestion);
    } else if (questionTypeCode.includes("MCQ") || hasOptions) {
      mcQsList.push(mappedQuestion);
    } else {
      sQsList.push(mappedQuestion);
    }
  });

  const allQs = [...mcQsList, ...sQsList, ...lQsList];
  const inferredBilingual = allQs.some(
    (row) =>
      isBilingualPair(
        norm(row.questionTextEnglish),
        norm(row.questionTextUrdu),
      ) ||
      (["A", "B", "C", "D"] as const).some((k) => {
        const en = norm(
          row[`option${k}English` as keyof PaperQuestion] as string,
        );
        const ur = norm(row[`option${k}Urdu` as keyof PaperQuestion] as string);
        return isBilingualPair(en, ur);
      }),
  );
  const headerModes = `${payload.header.savedPaperLangMode || ""} ${
    payload.header.renderPaperLangMode || ""
  }`.toLowerCase();

  return {
    testPaperDet: {
      testPaperID: payload.header.testPaperID,
      title: payload.header.title,
      createdAt: payload.header.createdAt,
      chapters: payload.header.chapters,
      attemptableMCQs: mcQsList.length,
      attemptableSQs: payload.header.attemptableSQs ?? sQsList.length,
      attemptableLQs: payload.header.attemptableLQs ?? lQsList.length,
      savedPaperLangMode: payload.header.savedPaperLangMode,
      renderPaperLangMode: payload.header.renderPaperLangMode,
      paperLangMode:
        headerModes.includes("bilingual") || inferredBilingual
          ? "BILINGUAL"
          : undefined,
    },
    mcQsList,
    sQsList,
    lQsList,
  };
};

const Reveal = ({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => <div className={className}>{children}</div>;

function DemoClient() {
  const router = useRouter();
  const selectInstanceId = useId();
  const isMcqMode = false;
  const apiWithExamTypes = API as ApiWithExamTypes;

  const paperRef = useRef<HTMLDivElement>(null!);

  const [questionsCount, setQuestionsCount] = useState<number>(0);
  const [questionsCountOpen, setQuestionsCountOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [chapterSearch, setChapterSearch] = useState<string>("");
  const [generationMode] = useState<GenerationMode>(
    isMcqMode ? "auto" : "template",
  );
  const [examSettings, setExamSettings] = useState({
    examTitle: "",
    examTypeID: 0,
    examType: "",
    mcqCount: "",
    resultVisibility: "Immediately after submission",
    difficulty: "Medium",
  });

  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(
    null,
  );

  const [, setShowSubjects] = useState<boolean>(false);
  const [, setShowChapters] = useState<boolean>(false);
  const [showPaper, setShowPaper] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [paperTypeModalOpen, setPaperTypeModalOpen] = useState<boolean>(false);
  const [questionsModalOpen, setQuestionsModalOpen] = useState<boolean>(false);
  const [chapterQsModalOpen, setChapterQsModalOpen] = useState<boolean>(false);
  const [demoAlertOpen, setDemoAlertOpen] = useState<boolean>(false);

  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [selectedChapterIDs, setSelectedChapterIDs] = useState<number[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [selectedChapterTopics, setSelectedChapterTopics] = useState<{
    [key: number]: number[];
  }>({});

  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [chapters, setChapters] = useState<ChapterItem[]>([]);
  const classesData: ClassItem[] = ClassesData as ClassItem[];
  const classesLoading = false;
  const subjectsLoading = loading;
  const chaptersLoading = loading;
  const schoolDets: { isAdmin?: boolean; schoolID?: number } = {};
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [selPaper, setSelPaper] = useState<PaperData | null>(null);

  const [activeChapter, setActiveChapter] = useState<ChapterItem | null>(null);
  const [, setSubjectModal] = useState<boolean>(false);
  const [, setChapterModal] = useState<boolean>(false);
  const [generatingPaper, setGeneratingPaper] = useState<boolean>(false);
  const [openAddQuestionForm] = useState<boolean>(false);

  const [testTypesWithDetails, setTestTypesWithDetails] = useState<
    TestTypeWithDetails[]
  >([]);
  const [examTypeOptions, setExamTypeOptions] = useState<ExamTypeOption[]>([]);

  const [isSelectQuestionsManually, setIsSelectQuestionsManually] =
    useState<boolean>(false);

  // const [hoveredId, setHoveredId] = useState<number | null>(null);

  const [isGeneratingTestPaper, setIsGeneratingTestPaper] =
    useState<boolean>(false);

  const boardOptions: BoardOption[] = EduBoardNames.map((item) => ({
    value: item.value.toString(),
    label: item.label,
    isDisabled: item.value === 1 || item.value === 6 ? false : true,
  }));

  const [selectedBoard, setSelectedBoard] = useState<BoardOption>(
    boardOptions[0],
  );

  const creationSteps = [
    {
      id: "context",
      title: "Context",
      description: "Class, subject and chapters",
    },
    {
      id: "settings",
      title: "Settings",
      description: "Paper configuration",
    },
    {
      id: "review",
      title: "Review",
      description: "Review and create",
    },
  ];

  const filteredChapters = chapters.filter((chapter) =>
    `${chapter?.chapterNo ? `${chapter.chapterNo}. ` : ""}${
      chapter?.chapterName || ""
    }`
      .toLowerCase()
      .includes(chapterSearch.toLowerCase()),
  );

  const totalQuestions = Math.max(0, Number(examSettings.mcqCount) || 0);
  const totalMarks = totalQuestions;

  const isContextStepComplete =
    !!selectedClass && !!selectedSubject && selectedChapterIDs.length > 0;

  const isSettingsStepComplete = (() => {
    if (!examSettings.examTitle.trim()) return false;
    if (isMcqMode) {
      return Number(examSettings.mcqCount) > 0;
    }
    if (generationMode === "auto") return true;
    return true;
  })();

  const canGoToStep = (index: number) => {
    if (index <= 0) return true;
    if (index === 1) return isContextStepComplete;
    if (index === 2) return isContextStepComplete && isSettingsStepComplete;
    return false;
  };

  const handleStepClick = (index: number) => {
    if (index < 0 || index >= creationSteps.length) return;
    if (canGoToStep(index)) setCurrentStep(index);
  };

  const handleNext = () => {
    const nextStep = currentStep + 1;
    if (canGoToStep(nextStep)) {
      setCurrentStep(nextStep);
      return;
    }
    if (currentStep === 0 && !isContextStepComplete) {
      toast.error("Please select class, subject, and at least one chapter.");
    } else if (currentStep === 1 && !isSettingsStepComplete) {
      if (isMcqMode) {
        toast.error("Please enter exam title and a valid number of MCQs.");
      } else {
        toast.error("Please enter exam title.");
      }
    }
  };

  const handleBackSteps = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleCreatePaper = () => {
    if (!canGoToStep(2)) {
      toast.error("Please complete all previous steps first.");
      return;
    }

    if (isMcqMode) {
      const n = Math.max(0, Number(examSettings.mcqCount) || 0);
      if (n < 1) {
        toast.error("Please enter a valid number of MCQs.");
        return;
      }
      void handleGenerateAutoMCQsPaper();
      return;
    }

    if (generationMode === "auto") {
      void handleGeneratePaperManually();
    } else if (generationMode === "template") {
      setPaperTypeModalOpen(true);
    } else if (generationMode === "manual") {
      setIsSelectQuestionsManually(true);
      void handleGetQuestionsList();
    }
  };

  const toggleTopic = (chapterID: number, topicID: number) => {
    setSelectedChapterTopics((prev) => {
      const existing = prev[chapterID] || [];
      const updated = existing.includes(topicID)
        ? existing.filter((id) => id !== topicID)
        : [...existing, topicID];
      return { ...prev, [chapterID]: updated };
    });
  };

  const handleSelectAll = (isChecked: boolean, allIDs: number[]) => {
    if (isChecked) {
      setSelectedChapterIDs(allIDs);
      const allNames = chapters.map((c) => c.chapterName);
      setSelectedChapters(allNames);
      const allTopics: { [key: number]: number[] } = {};
      chapters.forEach((chapter) => {
        allTopics[chapter.chapterID] =
          chapter?.topics?.map((t) => t.topicID) ?? [];
      });
      setSelectedChapterTopics(allTopics);
    } else {
      setSelectedChapterIDs([]);
      setSelectedChapters([]);
      setSelectedChapterTopics({});
    }
  };

  const toggleChapterSelection = (item: ChapterItem) => {
    const isSelected = selectedChapterIDs.includes(item?.chapterID);

    setSelectedChapterIDs((prev) =>
      isSelected
        ? prev.filter((id) => id !== item?.chapterID)
        : [...prev, item?.chapterID],
    );

    setSelectedChapters((prev) =>
      isSelected
        ? prev.filter((chapter) => chapter !== item?.chapterName)
        : [...prev, item?.chapterName],
    );

    setSelectedChapterTopics((prev) => {
      const updated = { ...prev };
      if (isSelected) {
        delete updated[item?.chapterID];
      } else {
        updated[item?.chapterID] = item?.topics?.map((t) => t?.topicID) ?? [];
      }
      return updated;
    });
  };

  const handleGenerateAutoMCQsPaper = async () => {
    if (selectedChapterIDs.length <= 0) {
      toast.error("Please select at least one chapter.", {
        position: "top-center",
      });
      return;
    }

    if (
      !selectedClass?.classID ||
      !selectedSubject?.subjectID ||
      !questionsCount
    ) {
      toast.error(
        "Missing required parameters. Please ensure class, subject, and question count are selected.",
        { position: "top-center" },
      );
      return;
    }

    const obj = {
      chapterIDs: selectedChapterIDs,
      classID: selectedClass.classID,
      subjectID: selectedSubject.subjectID,
      userID: 4,
      totalQuestions: questionsCount,
      examTypeID: examSettings.examTypeID,
    };

    const resp = window.confirm(
      "This will generate a new paper on the basis of your selection. Do you want to proceed?",
    );

    if (!resp) return;

    try {
      setGeneratingPaper(true);
      setLoading(true);

      const apilink = API.MCQPAPER_GENERATE;
      const response = await axios.post<PaperData>(`${apilink}`, obj);

      if (response?.data) {
        setSelPaper(response.data);
        setShowPaper(true);
        toast.success(
          "Paper generated and saved to online exam system successfully!",
          { position: "top-center" },
        );

        if (response.data?.testPaperDet?.testPaperID) {
          await verifyPaperSaved(response.data.testPaperDet.testPaperID);
        }
      } else {
        console.error("No response data received for auto MCQs paper");
        toast.error("No paper data received from server", {
          position: "top-center",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<ErrorResponseData>(error)) {
        toast.error(
          `API Error: ${error.response?.status ?? ""} - ${
            error.response?.data?.message || "Request failed"
          }`,
          { position: "top-center" },
        );
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-center",
        });
      }
    } finally {
      setGeneratingPaper(false);
      setLoading(false);
    }
  };

  const handleGeneratePaperManually = async () => {
    if (!(selectedChapterIDs.length > 0 && selectedQuestions.length > 0)) {
      toast.error(
        "No question was selected. Please, select some questions to Generate a Paper.",
        { position: "top-center" },
      );
      return;
    }

    const obj = {
      chapterIDs: selectedChapterIDs,
      questionIDs: selectedQuestions,
      classID: selectedClass?.classID,
      subjectID: selectedSubject?.subjectID,
      userID: 4,
      schoolID: 1,
      examTypeID: examSettings.examTypeID,
      paperType: "MANUAL",
      isForOnlineExam: true,
    };

    const resp = window.confirm(
      "This will generate a new paper on the basis of your selection. Do you want to proceed?",
    );

    if (!resp) return;

    try {
      setGeneratingPaper(true);
      setLoading(true);

      const apilink = API.MANUALPAPER_GENERATE;
      const response = await axios.post<PaperData>(`${apilink}`, obj);

      if (response?.data) {
        setSelPaper(response.data);
        setShowPaper(true);
        toast.success("Your Paper has been created successfully!", {
          position: "top-center",
        });

        if (response.data?.testPaperDet?.testPaperID) {
          await verifyPaperSaved(response.data.testPaperDet.testPaperID);
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<ErrorResponseData>(error)) {
        toast.error(
          `API Error: ${error.response?.status ?? ""} - ${
            error.response?.data?.message || "Request failed"
          }`,
          { position: "top-center" },
        );
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-center",
        });
      }
    } finally {
      setGeneratingPaper(false);
      setLoading(false);
    }
  };

  const handlePDF = () => handlePrint();

  const handleShare = () => {
    setDemoAlertOpen(true);
  };

  const handlePrint = () => {
    const paperToPrint = selPaper;
    if (!paperToPrint) return;

    if (paperRef.current) {
      const printContent = paperRef.current.cloneNode(true) as HTMLDivElement;
      const inputs = printContent.querySelectorAll("input, textarea");

      inputs.forEach((input) => {
        const element = input as HTMLInputElement | HTMLTextAreaElement;
        const span = document.createElement("span");
        span.textContent = element.value || element.placeholder || "";
        span.className = "print-text";
        element.parentNode?.replaceChild(span, element);
      });

      const pTitle = paperToPrint?.testPaperDet?.title || "Exam Paper";
      const pCreated = paperToPrint?.testPaperDet?.createdAt;
      const formattedCreated = pCreated ? formatDateTime(pCreated) : "";

      const printHtml = getPaperPrintTemplate({
        title: formattedCreated
          ? `"${pTitle}-${formattedCreated}"`
          : `"${pTitle}"`,
        content: printContent.innerHTML,
        watermarkHTML: `<img src="${window.location.origin}/images/Stats/AttoLearn_Logo.png" alt="AttoLearn" />`,
        baseHref: window.location.origin,
      });

      openPaperPrintHtmlInIframe(printHtml);
    }
  };

  const isEntirePaperUrdu = (paper: PaperData | null): boolean => {
    if (!paper) return false;

    const hasUrduMCQs =
      paper.mcQsList?.some(
        (q: PaperQuestion) =>
          hasUrdu(q.questionText) ||
          hasUrdu(q.optionA) ||
          hasUrdu(q.optionB) ||
          hasUrdu(q.optionC) ||
          hasUrdu(q.optionD),
      ) || false;

    const hasUrduSQs =
      paper.sQsList?.some((q: PaperQuestion) => hasUrdu(q.questionText)) ||
      false;

    const hasUrduLQs =
      paper.lQsList?.some((q: PaperQuestion) => hasUrdu(q.questionText)) ||
      false;

    return hasUrduMCQs || hasUrduSQs || hasUrduLQs;
  };

  async function handleClassSelection(item: ClassItem) {
    try {
      setSelectedClass(item);
      setSelectedSubject(null);
      setSelectedChapters([]);
      setSelectedChapterIDs([]);
      setExamSettings((prev) => ({ ...prev, examTitle: "" }));

      let allowedSubjects: string[] = [];

      if (["5th", "6th", "7th", "8th"].includes(item.className)) {
        allowedSubjects = ["Math", "Science", "English", "Urdu"];
      } else if (["9th", "10th"].includes(item.className)) {
        allowedSubjects = [
          "Math",
          "Physics",
          "Chemistry",
          "Biology",
          "English",
          "Urdu",
        ];
      }

      const res = await axios.get<SubjectApiItem[]>(
        `${API.SUBJECTSBYBOARD_GET}?ClassID=${item.classID}&BoardID=${selectedBoard.value}`,
      );

      if (res?.data) {
        const filteredSubjects = res.data.filter((subject) =>
          allowedSubjects.some((allowed) =>
            subject.subjectName.toLowerCase().includes(allowed.toLowerCase()),
          ),
        );
        setSubjects(filteredSubjects);
      } else {
        setSubjects([]);
      }

      setShowSubjects(true);
    } catch {
      setSubjects([]);
    }
  }

  async function handleSubjectSelection(subj: SubjectItem) {
    try {
      setSelectedSubject(subj);
      setSelectedChapters([]);
      setSelectedChapterIDs([]);
      setExamSettings((prev) => ({
        ...prev,
        examTitle:
          subj?.subjectName && selectedClass?.className
            ? `${subj.subjectName} ${selectedClass.className} - Paper`
            : prev.examTitle,
      }));

      const res = await axios.get<ChapterItem[]>(
        `${API.CHAPTERS_GET}?SubjectID=${subj.subjectID}`,
      );

      if (res?.data?.length > 0) {
        setChapters(res.data);
      } else {
        setChapters([]);
      }

      await handleGetTestTypesWithDetails(subj.subjectID);
      setShowChapters(true);
    } catch {
      setChapters([]);
      setTestTypesWithDetails([]);
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      handleBackSteps();
      return;
    }

    router.back();
  };

  const resetPaperCreationState = () => {
    setSelectedChapters([]);
    setSelectedChapterIDs([]);
    setSelectedQuestions([]);
    setSelectedChapterTopics({});
    setSelectedSubject(null);
    setSelectedClass(null);
    setSelPaper(null);
    setShowPaper(false);
    setShowChapters(false);
    setShowSubjects(false);
    setPaperTypeModalOpen(false);
    setQuestionsModalOpen(false);
    setChapterQsModalOpen(false);
    setQuestionsCountOpen(false);
    setIsSelectQuestionsManually(false);
    setCurrentStep(0);
  };

  const handlePaperModalClose = () => {
    resetPaperCreationState();
    router.back();
  };

  const extractExamTypeRows = (payload: unknown): Record<string, unknown>[] => {
    if (Array.isArray(payload)) {
      return payload.filter(
        (item): item is Record<string, unknown> =>
          !!item && typeof item === "object" && !Array.isArray(item),
      );
    }

    if (!payload || typeof payload !== "object") return [];

    const obj = payload as Record<string, unknown>;
    const directKeys = [
      "data",
      "examTypes",
      "examTypeList",
      "examType",
      "result",
      "responseData",
      "records",
      "items",
      "list",
    ];

    for (const key of directKeys) {
      const value = obj[key];
      if (Array.isArray(value)) return extractExamTypeRows(value);
    }

    for (const value of Object.values(obj)) {
      const rows = extractExamTypeRows(value);
      if (rows.length > 0) return rows;
    }

    return [];
  };

  const normalizeExamTypeOptions = (rows: Record<string, unknown>[]) => {
    const normalized: ExamTypeOption[] = rows
      .map((item) => {
        const name = String(
          item?.examTypeName ??
            item?.ExamTypeName ??
            item?.name ??
            item?.Name ??
            item?.title ??
            item?.Title ??
            item?.examType ??
            item?.ExamType ??
            item?.type ??
            item?.Type ??
            "",
        ).trim();

        const idRaw =
          item?.examTypeID ??
          item?.ExamTypeID ??
          item?.examTypeId ??
          item?.ExamTypeId ??
          item?.id ??
          item?.ID ??
          item?.value ??
          item?.Value;

        const id = Number(idRaw);

        if (!name || !Number.isFinite(id) || id <= 0) return null;

        return { id, name };
      })
      .filter((item: ExamTypeOption | null): item is ExamTypeOption => !!item);

    const uniqueMap = new Map<number, ExamTypeOption>();

    normalized.forEach((item) => {
      if (!uniqueMap.has(item.id)) uniqueMap.set(item.id, item);
    });

    return Array.from(uniqueMap.values());
  };

  const handleGetExamTypes = async () => {
    const examTypesUrl = apiWithExamTypes.EXAM_TYPES_GET;

    if (!examTypesUrl) {
      setExamTypeOptions([]);
      setExamSettings((prev) => ({ ...prev, examTypeID: 0, examType: "" }));
      toast.error(
        "EXAM_TYPES_GET is missing in @/constants/API. Add EXAM_TYPES_GET in src/constants/API.ts with the same endpoint used by your working CreatePaper code.",
        { position: "top-center" },
      );
      return;
    }

    try {
      const res = await axios.get(examTypesUrl);
      const raw = extractExamTypeRows(res?.data);
      const unique = normalizeExamTypeOptions(raw);

      setExamTypeOptions(unique);

      setExamSettings((prev) => {
        const stillValid = unique.some((opt) => opt.id === prev.examTypeID);

        if (stillValid) return prev;

        const fallback = unique[0];

        return fallback
          ? { ...prev, examTypeID: fallback.id, examType: fallback.name }
          : { ...prev, examTypeID: 0, examType: "" };
      });
    } catch {
      setExamTypeOptions([]);
      setExamSettings((prev) => ({ ...prev, examTypeID: 0, examType: "" }));
      toast.error("Failed to load exam types.", { position: "top-center" });
    }
  };

  useEffect(() => {
    setSelectedBoard({
      value: EduBoardNames[0].value.toString(),
      label: EduBoardNames[0].label,
    });
    handleGetExamTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (paperTypeModalOpen && examTypeOptions.length === 0) {
      handleGetExamTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperTypeModalOpen]);

  async function handleGetQuestionsList() {
    try {
      const res = await axios.get<QuestionItem[]>(
        `${API.QUESTIONS_GET}?ChapterIDs=${selectedChapterIDs}`,
      );

      if (res?.data?.length > 0) {
        setQuestions(res.data);
        setQuestionsModalOpen(true);
      } else {
        toast.error("No question was found.", { position: "top-center" });
      }
    } catch {}
  }

  // const handleSelectAll = (isChecked: boolean, allIDs: number[]) => {
  //   if (isChecked) {
  //     setSelectedChapterIDs(allIDs);
  //     chapters.forEach((item) => {
  //       setSelectedChapters((prev) =>
  //         prev.includes(item.chapterName)
  //           ? prev.filter((chapter) => chapter !== item.chapterName)
  //           : [...prev, item.chapterName]
  //       );
  //     });
  //   } else {
  //     setSelectedChapterIDs([]);
  //     setSelectedChapters([]);
  //   }
  // };

  const verifyPaperSaved = async (paperID: number) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const papersResponse = await axios.get<MyPaperItem[]>(
        `${API.MYPAPERS_GET}?userID=${4}`,
      );

      if (papersResponse?.data) {
        const papers = papersResponse.data;
        const savedPaper = papers.find(
          (paper) => paper.testPaperID === paperID,
        );

        if (savedPaper) {
          toast.success("Paper successfully saved to online exam system!", {
            position: "top-center",
          });
        }
      }
    } catch {
      // Silent error handling for verification
    }
  };

  const handleGetTestTypesWithDetails = async (
    subjectID = selectedSubject?.subjectID,
  ) => {
    if (!subjectID) {
      setTestTypesWithDetails([]);
      return;
    }

    try {
      const response = await axios.get<TestTypeWithDetails[]>(
        `${API.GET_TEST_TYPE_WITH_DETAILS}?SubjectID=${subjectID}`,
      );

      if (response?.data) {
        setTestTypesWithDetails(response.data);
      } else {
        setTestTypesWithDetails([]);
      }
    } catch {
      console.error("Failed to get test types with details");
      setTestTypesWithDetails([]);
      toast.error("Failed to get test types with details", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (paperTypeModalOpen) {
      handleGetTestTypesWithDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperTypeModalOpen]);

  async function getLangCode(
    classId: number | undefined,
    subjectId: number | undefined,
  ) {
    try {
      const resp = await axios.get(
        `${API.CLASS_SUBJECT_LANG_GET}?ClassID=${classId}&SubjectID=${subjectId}`,
      );
      if (resp?.data?.data) {
        return resp.data.data;
      }
    } catch {
      return "en"; // default to English on any failure
    }
  }
  const getCleanPaperSubjectTitle = () => {
    const subject = selectedSubject?.subjectName?.trim() || "";
    const className = selectedClass?.className?.trim() || "";

    return [subject, className].filter(Boolean).join(" ");
  };

  const applyCleanPaperTitle = (paper: PaperData | null): PaperData | null => {
    if (!paper) return paper;

    const cleanTitle = getCleanPaperSubjectTitle();
    if (!cleanTitle) return paper;

    return {
      ...paper,
      testPaperDet: {
        ...paper.testPaperDet,
        title: cleanTitle,
      },
    };
  };

  const handleGenerateTestPaper = async (test: TestTypeWithDetails) => {
    try {
      setIsGeneratingTestPaper(true);
      const languageCode = await getLangCode(
        selectedClass?.classID,
        selectedSubject?.subjectID,
      );

      const payload = {
        classID: selectedClass?.classID,
        subjectID: selectedSubject?.subjectID,
        userID: 4,
        chapterIDs: selectedChapterIDs,
        testTypeID: Number(test.testTypeID),
        schoolID: 1,
        examTypeID: examSettings.examTypeID,
        selectedQuestionIDs: isSelectQuestionsManually
          ? selectedQuestions
          : [0],
        isManual: Boolean(isSelectQuestionsManually),
        paperLangMode: languageCode,
      };
      const apiLink = API.GENERATE_DEMO_TEST_PAPER;
      const response = await axios.post<unknown>(apiLink, payload);

      if (response?.data) {
        toast.success("Your Paper has been created successfully", {
          position: "top-center",
        });

        setIsSelectQuestionsManually(false);

        const generateBody = response.data;
        const unwrappedForModal = unwrapPaperApiPayload(
          generateBody,
        ) as PaperData;
        const mappedFromGenerate = mapGeneratedPaperResponse(
          unwrappedForModal as unknown as GeneratedPaperApiData,
        );
        const generatedPaperId = extractTestPaperIdFromPayload(generateBody);

        if (generatedPaperId) {
          try {
            const generatedPaperResp =
              await axios.get<GeneratedPaperApiResponse>(
                `${API.GENERATED_PAPER_GET}/${generatedPaperId}`,
              );
            const mappedPaper = mapGeneratedPaperResponse(
              unwrapPaperApiPayload(generatedPaperResp?.data) as
                | GeneratedPaperApiData
                | undefined,
            );
            setSelPaper(
              applyCleanPaperTitle(
                mappedPaper || mappedFromGenerate || unwrappedForModal,
              ),
            );
          } catch {
            setSelPaper(
              applyCleanPaperTitle(mappedFromGenerate || unwrappedForModal),
            );
          }
        } else {
          setSelPaper(
            applyCleanPaperTitle(mappedFromGenerate || unwrappedForModal),
          );
        }

        setPaperTypeModalOpen(false);
        setShowChapters(false);
        // Keep selectedSubject until PaperModal closes so the modal can show clean subject/class context.
        // setSelectedSubject(null);
        setSelectedChapters([]);
        setSelectedChapterIDs([]);
        setShowPaper(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Try to parse response data
        const responseData = error.response?.data;
        if (responseData) {
          alert(responseData.message || "Failed to generate test paper");
        } else {
          toast.error("Failed to generate test paper", {
            position: "top-center",
          });
        }
      }
    } finally {
      setIsGeneratingTestPaper(false);
    }
  };

  return (
    <section className="relative overflow-visible py-4 pb-10">
      <div className="flex flex-col w-full">
        <header className="sticky top-0 z-30 bg-white shadow-sm py-6">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4">
            <span
              className="text-3xl text-teal-700 hover:text-gray-700 cursor-pointer flex items-center"
              onClick={handleBack}
            >
              <FaCircleArrowLeft />
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-teal-700 leading-none">
              Create an Exam Paper
            </h1>
          </div>
        </header>

        <main className="w-full p-4 bg-gray-50">
          <div className="mx-auto max-w-7xl">
            <div className="relative min-w-0 rounded shadow-lg bg-white p-4 sm:p-6">
              {loading && <AppLoader />}

              {/* Step header */}
              <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold tracking-tight text-teal-700">
                    Create New Exam Paper
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Quick 3-step process to build a {isMcqMode ? "MCQ " : ""}
                    paper.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {creationSteps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isDone = index < currentStep;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleStepClick(index)}
                        className={`rounded-xl border px-3 py-3 text-left transition-all ${
                          isActive
                            ? "border-[#007381]/50 bg-[#007381]/10"
                            : isDone
                              ? "border-emerald-300 bg-emerald-50"
                              : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                              isActive
                                ? "bg-[#007381] text-white"
                                : isDone
                                  ? "bg-emerald-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <div>
                            <p
                              className="text-sm text-gray-950"
                              style={{ fontWeight: 900 }}
                            >
                              {step.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 - Context */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Board
                        </label>
                        <Select<BoardOption, false>
                          instanceId={selectInstanceId}
                          inputId={`${selectInstanceId}-board`}
                          options={boardOptions}
                          value={selectedBoard}
                          onChange={(opt: SingleValue<BoardOption>) => {
                            if (opt) setSelectedBoard(opt);
                          }}
                          placeholder="Select Board..."
                          isSearchable
                          isClearable={false}
                          classNamePrefix="select"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              minHeight: "40px",
                              width: "280px",
                              borderColor: "#d1d5db",
                              boxShadow: state.isFocused
                                ? "0 0 0 2px rgba(0, 115, 129, 0.2)"
                                : "none",
                              "&:hover": { borderColor: "#d1d5db" },
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused
                                ? "#e6f7fa"
                                : state.isDisabled
                                  ? "#f3f4f6"
                                  : "white",
                              color: state.isDisabled ? "#9ca3af" : "#000",
                              cursor: state.isDisabled
                                ? "not-allowed"
                                : "pointer",
                            }),
                          }}
                          components={{
                            ClearIndicator: (props) => (
                              <components.ClearIndicator {...props}>
                                <FaTimes className="text-red-500 hover:text-red-600 cursor-pointer" />
                              </components.ClearIndicator>
                            ),
                            DropdownIndicator: (props) => (
                              <components.DropdownIndicator {...props}>
                                <FaChevronDown className="text-gray-500" />
                              </components.DropdownIndicator>
                            ),
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                        <div className="rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-gray-200">
                          <span className="text-gray-500">Class: </span>
                          <span className="font-semibold text-teal-700">
                            {classesLoading ? (
                              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#007381] align-middle" />
                            ) : (
                              selectedClass?.className || "Not selected"
                            )}
                          </span>
                        </div>
                        <div className="rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-gray-200">
                          <span className="text-gray-500">Subject: </span>
                          <span className="font-semibold text-teal-700">
                            {subjectsLoading ? (
                              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#007381] align-middle" />
                            ) : (
                              selectedSubject?.subjectName || "Not selected"
                            )}
                          </span>
                        </div>
                        <div className="rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-gray-200">
                          <span className="text-gray-500">Chapters: </span>
                          <span className="font-semibold text-teal-700">
                            {selectedChapterIDs.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-gray-500">
                      Currently, only Punjab BISEs is supported.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Class column */}
                    <section className="rounded-xl border border-gray-200 bg-white p-4">
                      <h3 className="mb-3 text-lg font-semibold text-teal-700">
                        Select Class
                      </h3>
                      {classesLoading ? (
                        <div className="flex min-h-24 items-center justify-center">
                          <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#007381]" />
                        </div>
                      ) : classesData?.length === 0 ? (
                        <NoData />
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          {classesData?.map((item: ClassItem) => (
                            <button
                              key={item?.classID.toString()}
                              type="button"
                              onClick={() => handleClassSelection(item)}
                              className={`rounded border px-3 py-2 text-sm font-medium transition cursor-pointer ${
                                selectedClass?.classID === item?.classID
                                  ? "bg-[#007381] text-white border-[#007381]"
                                  : "border-gray-300 text-gray-800 hover:bg-[#007381] hover:text-white"
                              }`}
                            >
                              {item?.className}
                            </button>
                          ))}
                        </div>
                      )}
                    </section>

                    {/* Subject column */}
                    <section className="rounded-xl border border-gray-200 bg-white p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-teal-700">
                          Select Subject
                        </h3>
                        {schoolDets?.isAdmin && schoolDets?.schoolID === 1 && (
                          <button
                            type="button"
                            className="rounded p-2 text-[#007381] transition-colors hover:bg-teal-50"
                            onClick={() => {
                              setSelectedSubject({
                                subjectName: "",
                                totalMCQs: "0",
                                totalSQs: "0",
                                totalLQs: "0",
                                attemptableMCQs: "0",
                                attemptableSQs: "0",
                                attemptableLQs: "0",
                              });
                              setSubjectModal(true);
                            }}
                          >
                            <FaCirclePlus size={20} />
                          </button>
                        )}
                      </div>
                      {!selectedClass ? (
                        <p className="text-sm text-gray-500">
                          Select a class first to load subjects.
                        </p>
                      ) : subjectsLoading ? (
                        <div className="flex min-h-24 items-center justify-center">
                          <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#007381]" />
                        </div>
                      ) : subjects?.length === 0 ? (
                        <NoData />
                      ) : (
                        <div className="space-y-2">
                          {subjects.map((subject: SubjectItem) => (
                            <div
                              key={subject?.subjectID}
                              className="flex items-center justify-between rounded border border-gray-200 p-1"
                            >
                              <button
                                type="button"
                                onClick={() => handleSubjectSelection(subject)}
                                className={`flex-1 rounded px-2 py-1.5 text-left text-sm transition-colors cursor-pointer ${
                                  selectedSubject?.subjectID ===
                                  subject?.subjectID
                                    ? "bg-[#007381] text-white"
                                    : "text-teal-700 hover:bg-[#007381] hover:text-white"
                                }`}
                              >
                                {subject?.subjectName}
                              </button>
                              {schoolDets?.isAdmin &&
                                schoolDets?.schoolID === 1 && (
                                  <button
                                    type="button"
                                    className="ml-1 rounded p-1.5 text-[#007381] transition-colors hover:bg-teal-50"
                                    onClick={() => {
                                      setSelectedSubject(subject);
                                      setSubjectModal(true);
                                    }}
                                  >
                                    <FaPenFancy size={14} />
                                  </button>
                                )}
                            </div>
                          ))}
                        </div>
                      )}
                    </section>

                    {/* Chapter column */}
                    <section className="rounded-xl border border-gray-200 bg-white p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-teal-700">
                          Select Chapters
                        </h3>
                        {schoolDets?.isAdmin && schoolDets?.schoolID === 1 && (
                          <button
                            type="button"
                            className="rounded p-2 text-[#007381] transition-colors hover:bg-teal-50"
                            onClick={() => {
                              setActiveChapter(null);
                              setChapterModal(true);
                            }}
                          >
                            <FaCirclePlus size={20} />
                          </button>
                        )}
                      </div>

                      {!selectedSubject ? (
                        <p className="text-sm text-gray-500">
                          Select a subject first to load chapters.
                        </p>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={chapterSearch}
                            onChange={(e) => setChapterSearch(e.target.value)}
                            placeholder="Search chapters..."
                            className="mb-3 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007381]/30"
                          />
                          {chaptersLoading ? (
                            <div className="flex min-h-24 items-center justify-center">
                              <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#007381]" />
                            </div>
                          ) : chapters?.length === 0 ? (
                            <NoData />
                          ) : (
                            <div className="max-h-104 overflow-y-auto pr-1">
                              <ul className="space-y-1 text-gray-700">
                                <li className="sticky top-0 z-10 flex items-center gap-2 border-b bg-white py-2">
                                  <input
                                    type="checkbox"
                                    checked={
                                      chapters?.length > 0 &&
                                      selectedChapterIDs?.length ===
                                        chapters?.length
                                    }
                                    onChange={(e) => {
                                      const allIDs = chapters?.map(
                                        (item: ChapterItem) => item?.chapterID,
                                      );
                                      handleSelectAll(e.target.checked, allIDs);
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 accent-[#007381]"
                                  />
                                  <span className="text-sm font-medium">
                                    Select All
                                  </span>
                                </li>

                                {filteredChapters.map(
                                  (chapter: ChapterItem) => {
                                    const topics = chapter?.topics || [];
                                    const isSelected =
                                      selectedChapterIDs.includes(
                                        chapter?.chapterID,
                                      );
                                    return (
                                      <React.Fragment key={chapter?.chapterID}>
                                        <li className="rounded border border-gray-200 px-2 py-2">
                                          <div className="flex items-center justify-between gap-2">
                                            <label className="flex flex-1 cursor-pointer items-center gap-2">
                                              <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() =>
                                                  toggleChapterSelection(
                                                    chapter,
                                                  )
                                                }
                                                className="h-4 w-4 rounded border-gray-300 accent-[#007381]"
                                              />
                                              <span className="truncate text-sm">
                                                {chapter?.chapterNo
                                                  ? `${chapter.chapterNo}. `
                                                  : ""}
                                                {chapter?.chapterName}
                                              </span>
                                            </label>
                                            <div className="flex items-center gap-1">
                                              {schoolDets?.isAdmin &&
                                                schoolDets?.schoolID === 1 && (
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      setActiveChapter(chapter);
                                                      setChapterModal(true);
                                                    }}
                                                    className="rounded p-1 text-[#007381] hover:bg-teal-50"
                                                    aria-label="Edit chapter"
                                                  >
                                                    <FaPenFancy size={12} />
                                                  </button>
                                                )}
                                            </div>
                                          </div>

                                          {topics.length > 0 && (
                                            <ul className="mt-2 space-y-1 border-t border-gray-100 pl-6 pt-2">
                                              {topics.map(
                                                (topic: TopicItem) => {
                                                  const isTopicChecked =
                                                    selectedChapterTopics[
                                                      chapter?.chapterID
                                                    ]?.includes(
                                                      topic?.topicID,
                                                    ) || false;
                                                  return (
                                                    <li
                                                      key={topic?.topicID}
                                                      className="flex items-center gap-2"
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        checked={isTopicChecked}
                                                        onChange={() =>
                                                          toggleTopic(
                                                            chapter?.chapterID,
                                                            topic?.topicID,
                                                          )
                                                        }
                                                        className="h-3.5 w-3.5 rounded border-gray-300 accent-[#007381]"
                                                      />
                                                      <span className="text-xs text-gray-600">
                                                        {topic?.title}
                                                      </span>
                                                    </li>
                                                  );
                                                },
                                              )}
                                            </ul>
                                          )}
                                        </li>
                                      </React.Fragment>
                                    );
                                  },
                                )}
                              </ul>
                            </div>
                          )}
                        </>
                      )}
                    </section>
                  </div>
                </div>
              )}

              {/* Step 2 - Settings */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  {/* {!isMcqMode && (
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 text-lg font-semibold text-teal-700">
                      Generation Method
                    </h3>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      {(
                        [
                          // {
                          //   id: "auto" as GenerationMode,
                          //   title: "Auto Generate",
                          //   description:
                          //     "Let the system pick balanced questions from selected chapters.",
                          // },
                          {
                            id: "template" as GenerationMode,
                            title: "Use Template",
                            description:
                              "Choose a predefined paper structure (sections, marks, types).",
                          },
                          {
                            id: "manual" as GenerationMode,
                            title: "Manual Selection",
                            description:
                              "Hand-pick the exact questions you want in the paper.",
                          },
                        ] as const
                      ).map((opt) => {
                        const isActive = generationMode === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setGenerationMode(opt.id)}
                            className={`rounded-xl border px-3 py-3 text-left transition-all ${
                              isActive
                                ? "border-[#007381]/50 bg-[#007381]/10"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            }`}
                          >
                            <p className="text-sm font-semibold text-teal-700">
                              {opt.title}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {opt.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )} */}

                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <h3 className="mb-4 text-lg font-semibold text-teal-700">
                      Set Paper Settings
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Paper Title
                        </label>
                        <input
                          type="text"
                          value={examSettings.examTitle}
                          readOnly
                          placeholder="SUBJECT CLASS - Paper"
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007381]/30"
                        />
                      </div>

                      {(isMcqMode || generationMode === "auto") &&
                        isMcqMode && (
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              Number of MCQs
                            </label>
                            <input
                              type="number"
                              min={1}
                              max={100}
                              value={examSettings.mcqCount}
                              placeholder="10"
                              onChange={(e) =>
                                setExamSettings((prev) => ({
                                  ...prev,
                                  mcqCount: e.target.value,
                                }))
                              }
                              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007381]/30"
                            />
                          </div>
                        )}

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Exam Type
                        </label>
                        <select
                          value={
                            examSettings.examTypeID > 0
                              ? String(examSettings.examTypeID)
                              : ""
                          }
                          onChange={(e) =>
                            setExamSettings((prev) => {
                              const selectedId = Number(e.target.value || 0);
                              const selected = examTypeOptions.find(
                                (opt) => opt.id === selectedId,
                              );
                              return {
                                ...prev,
                                examTypeID: selectedId,
                                examType: selected?.name || "",
                              };
                            })
                          }
                          disabled={examTypeOptions.length === 0}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007381]/30"
                        >
                          {examTypeOptions.length === 0 ? (
                            <option value="">No exam types available</option>
                          ) : (
                            examTypeOptions.map((t) => (
                              <option key={t.id} value={String(t.id)}>
                                {t.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      {isMcqMode && (
                        <div>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            Result Visibility
                          </label>
                          <select
                            value={examSettings.resultVisibility}
                            onChange={(e) =>
                              setExamSettings((prev) => ({
                                ...prev,
                                resultVisibility: e.target.value,
                              }))
                            }
                            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007381]/30"
                          >
                            <option value="Immediately after submission">
                              Immediately after submission
                            </option>
                          </select>
                        </div>
                      )}

                      <div className="md:col-span-2">
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Difficulty
                        </label>
                        <select
                          value={examSettings.difficulty}
                          onChange={(e) =>
                            setExamSettings((prev) => ({
                              ...prev,
                              difficulty: e.target.value,
                            }))
                          }
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#007381]/30"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 - Review */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1">
                  <section className="rounded-xl border border-gray-200 bg-white p-4">
                    <h3 className="mb-3 text-lg font-semibold text-teal-700">
                      Review Your {isMcqMode ? "Online Exam" : "Paper"}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex justify-between border-b py-2">
                        <span>Paper Title</span>
                        <span className="font-medium">
                          {examSettings.examTitle || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span>Class / Subject</span>
                        <span className="font-medium">
                          {selectedClass?.className || "-"} /{" "}
                          {selectedSubject?.subjectName || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b py-2">
                        <span>Chapters</span>
                        <span className="font-medium">
                          {selectedChapterIDs.length} selected
                        </span>
                      </div>
                      {isMcqMode && (
                        <>
                          <div className="flex justify-between border-b py-2">
                            <span>Number of MCQs</span>
                            <span className="font-medium">
                              {totalQuestions}
                            </span>
                          </div>
                          <div className="flex justify-between border-b py-2">
                            <span>Total Marks</span>
                            <span className="font-medium">{totalMarks}</span>
                          </div>
                        </>
                      )}
                      {!isMcqMode && (
                        <div className="flex justify-between border-b py-2">
                          <span>Generation Method</span>
                          <span className="font-medium capitalize">
                            {generationMode === "auto"
                              ? "Auto Generate"
                              : generationMode === "template"
                                ? "Use Template"
                                : "Manual Selection"}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between border-b py-2">
                        <span>Exam Type</span>
                        <span className="font-medium">
                          {examSettings.examType || "-"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span>Difficulty</span>
                        <span className="font-medium">
                          {examSettings.difficulty}
                        </span>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {/* Footer nav */}
              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <button
                  type="button"
                  onClick={currentStep === 0 ? handleBack : handleBackSteps}
                  className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300"
                >
                  {currentStep === 0 ? "Exit" : "Back"}
                </button>

                <div className="flex items-center gap-2">
                  {currentStep === 2 ? (
                    <button
                      type="button"
                      onClick={handleCreatePaper}
                      disabled={generatingPaper || isGeneratingTestPaper}
                      className="rounded bg-[#007381] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {generatingPaper || isGeneratingTestPaper
                        ? "Generating..."
                        : "Create Paper"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="rounded bg-[#007381] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Payment Center */}
      <section className="clear-both mt-8 bg-white py-5 sm:py-6">
        <div className="mx-auto max-w-390 px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px max-w-70 flex-1 bg-[#e9e9e9]" />
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#1f2937]">
              Payment Center
            </h2>
            <span className="h-px max-w-70 flex-1 bg-[#e9e9e9]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Bank Account",
                number: "",
                icon: "/images/payment/bank-icon.png",
                waveBg: "bg-[#d9f3f5]",
              },
              {
                title: "Jazz Cash",
                number: "03004419244",
                icon: "/images/payment/jazzcash.png",
                waveBg: "bg-[#f3dfc5]",
              },
              {
                title: "EasyPaisa",
                number: "03167482947",
                icon: "/images/payment/easypaisa.png",
                waveBg: "bg-[#dcefee]",
              },
              {
                title: "WhatsApp Receipts",
                subtitle: "for Payment Verification",
                numbers: ["03167482947", "03004419244"],
                icon: "/images/payment/whatsapp.png",
                waveBg: "bg-[#dfe8c8]",
                isWhatsapp: true,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="min-h-44 overflow-hidden rounded-2xl border border-[#e7e7e7] bg-white shadow-sm flex flex-col"
              >
                <div className="flex flex-1 flex-col items-center px-4 pt-3 pb-2 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#111827]">
                    {item.title}
                  </h3>

                  {item.isWhatsapp && (
                    <p className="mt-1 text-[11px] text-[#6b7280]">
                      {item.subtitle}
                    </p>
                  )}

                  {item.isWhatsapp ? (
                    <div className="mt-2 flex flex-col items-center gap-1">
                      {item.numbers.map((num, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.icon} alt="" className="h-3.5 w-3.5" />
                          <p className="text-[16px] font-medium text-[#111827]">
                            {num}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    item.number && (
                      <p className="mt-2 text-[16px] font-medium text-[#111827]">
                        {item.number}
                      </p>
                    )
                  )}
                </div>

                <div className={`relative mt-auto h-10 ${item.waveBg}`}>
                  <div className="absolute inset-x-0 -top-3 h-6 rounded-[100%] bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Top Heading */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-teal-700 sm:text-4xl">
                Everything you need
              </h2>
              <h3 className="mt-8 mb-6 text-base font-semibold text-gray-700 sm:text-2xl">
                To create exam papers efficiently
              </h3>
            </div>
          </Reveal>

          {/* SECTION 1 */}
          <div className="mt-16 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal>
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Smart Curriculum-Aligned Paper Creation
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  Create syllabus-accurate exam papers in minutes — without
                  manual effort.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>
                    • Grade, Subject, Chapter & Topic mapping (KG–Grade 10)
                  </li>
                  <li>• Monthly, Mid-term, Final & Practice exams</li>
                  <li>• Syllabus-accurate, ready-to-use papers</li>
                  <li>• Eliminates manual curriculum checking</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/images/papergenerator/Exam-Paper1.png"
                  alt="Curriculum aligned paper creation"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>
          </div>

          {/* SECTION 2 (REVERSED) */}
          <div className="mt-20 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal
              delay={0.08}
              className="order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              <div className="w-full flex justify-center lg:justify-start">
                <Image
                  src="/images/papergenerator/paper-Type2.png"
                  alt="Flexible question types"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2">
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Flexible Question Types & Paper Templates
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  Design exams exactly the way your school needs them.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>• MCQs, Short, Long & Mixed questions</li>
                  <li>• Ready-made paper templates (Quizards)</li>
                  <li>• Flexible layouts for different exams</li>
                  <li>• Consistent structure across all papers</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* SECTION 3 */}
          <div className="mt-20 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal>
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Easy Editing & Paper Refinement
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  Fine-tune papers before final submission with complete
                  control.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>• Edit questions after generation</li>
                  <li>• Reorder questions instantly</li>
                  <li>• Adjust difficulty levels easily</li>
                  <li>• Built-in review before finalization</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/images/papergenerator/Editing-Paper3.png"
                  alt="Paper editing"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>
          </div>

          {/* SECTION 4 (REVERSED) */}
          <div className="mt-20 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal
              delay={0.08}
              className="order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              <div className="w-full flex justify-center lg:justify-start">
                <Image
                  src="/images/papergenerator/Paper-Library4.png"
                  alt="Paper library"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2">
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Paper Library, Search & Reuse
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  Never lose an exam paper again — reuse anytime, anywhere.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>• Automatic paper history storage</li>
                  <li>• Search by grade, subject or date</li>
                  <li>• Duplicate papers instantly</li>
                  <li>• Perfect for recurring exams & revisions</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* SECTION 5 */}
          <div className="mt-20 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal>
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Print, Share & Collaborate Seamlessly
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  From creation to approval — everything stays smooth and fast.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>• Exam-ready printable layouts</li>
                  <li>• PDF export & bulk printing</li>
                  <li>• Share via WhatsApp or file sharing</li>
                  <li>• Faster approvals & team collaboration</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/images/papergenerator/Print-paper5.png"
                  alt="Print and share papers"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {paperTypeModalOpen && (
        <PaperTypeModal
          isOpen={paperTypeModalOpen}
          onClose={() => setPaperTypeModalOpen(false)}
          title="Choose A Paper Template"
          subtitle="Pick a ready-made paper structure or switch to manual question selection."
          examTypeOptions={examTypeOptions}
          selectedExamTypeID={examSettings.examTypeID}
          onExamTypeChange={(id: number) =>
            setExamSettings((prev) => {
              const selected = examTypeOptions.find((opt) => opt.id === id);
              return {
                ...prev,
                examTypeID: id,
                examType: selected?.name || "",
              };
            })
          }
          summary={[
            {
              label: "Class",
              value: selectedClass?.className || "Not selected",
            },
            {
              label: "Subject",
              value: selectedSubject?.subjectName || "Not selected",
            },
            { label: "Chapters", value: selectedChapterIDs.length },
          ]}
          testTypesWithDetails={testTypesWithDetails}
          isGeneratingTestPaper={isGeneratingTestPaper}
          onGenerateTestPaper={(test: TestTypeWithDetails) => {
            handleGenerateTestPaper(test);
          }}
          onSelectQuestionsManually={() => {
            setPaperTypeModalOpen(false);
            setIsSelectQuestionsManually(true);
            handleGetQuestionsList();
          }}
          manualAction={{
            label: "Select Questions Manually",
            onClick: () => {
              setPaperTypeModalOpen(false);
              setIsSelectQuestionsManually(true);
              handleGetQuestionsList();
            },
            disabled: isGeneratingTestPaper,
          }}
          busy={isGeneratingTestPaper}
        />
      )}

      {questionsModalOpen && (
        <Questions
          selectedClass={selectedClass?.className}
          subject={selectedSubject?.subjectName}
          chapters={selectedChapters}
          questions={questions}
          onClose={() => setQuestionsModalOpen(false)}
          selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
          onPaperGen={handleGeneratePaperManually}
        />
      )}

      {chapterQsModalOpen && (
        <ChapterQuestions
          selectedClass={selectedClass?.className}
          subject={selectedSubject?.subjectName}
          chapter={activeChapter}
          openAddQuestionForm={openAddQuestionForm}
          onClose={() => setChapterQsModalOpen(false)}
        />
      )}

      {showPaper && (
        <PaperModal
          key={String(selPaper?.testPaperDet?.testPaperID ?? "paper-modal")}
          isOpen={showPaper}
          loading={loading}
          selPaper={selPaper}
          paperRef={paperRef}
          selectedClass={selectedClass}
          selectedChapters={selectedChapters}
          formatDateTime={formatDateTime}
          hasUrdu={hasUrdu}
          isEntirePaperUrdu={isEntirePaperUrdu}
          onShare={handleShare}
          onPrint={handlePrint}
          onPDF={handlePDF}
          onClose={handlePaperModalClose}
          LoaderComponent={<AppLoader />}
        />
      )}

      <CustomAlert
        isOpen={demoAlertOpen}
        title="Demo Feature Notice"
        message="This functionality is not available in the demo."
        onClose={() => setDemoAlertOpen(false)}
      />

      {questionsCountOpen && (
        <AutoMCQsModal
          isOpen={questionsCountOpen}
          questionsCount={questionsCount}
          setQuestionsCount={setQuestionsCount}
          generatingPaper={generatingPaper}
          selectedClass={selectedClass}
          selectedSubject={selectedSubject}
          selectedChapterIDs={selectedChapterIDs}
          onClose={() => setQuestionsCountOpen(false)}
          onGenerate={() => {
            if (questionsCount > 0) {
              setQuestionsCountOpen(false);
              handleGenerateAutoMCQsPaper();
            } else {
              toast.error("Please enter a valid number of questions.", {
                position: "top-center",
              });
            }
          }}
        />
      )}
    </section>
  );
}

export default DemoClient;
