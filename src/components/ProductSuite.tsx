"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type FeatureCard = {
  title: string;
  iconType?: "img" | "text";
  iconSrc?: string;
  iconText?: string;
  items: string[];
};

const schoolFeatures: FeatureCard[] = [
  {
    title: "School Admin Dashboard",
    iconType: "text",
    iconText: "📊",
    items: [
      "Central control over school operations",
      "High-level KPIs and shortcuts",
      "Governance-level visibility",
    ],
  },
  {
    title: "Teacher Dashboard",
    iconType: "text",
    iconText: "🧑‍🏫",
    items: [
      "View assigned classes & subjects",
      "Access exams, quizzes & students",
      "Personal schedule visibility",
    ],
  },
  {
    title: "Parent Dashboard",
    iconType: "text",
    iconText: "🏠",
    items: [
      "View child records & progress",
      "Fee vouchers & receipts",
      "School announcements",
    ],
  },
  {
    title: "Student Dashboard",
    iconType: "text",
    iconText: "🎒",
    items: [
      "View classes, exams & quizzes",
      "Academic records access",
      "Personal performance insights",
    ],
  },
  {
    title: "Multi-Branch Management",
    iconType: "text",
    iconText: "🏢",
    items: [
      "One owner account for multiple campuses",
      "Add unlimited branches",
      "Central organisation structure",
    ],
  },
  {
    title: "Student Attendance Analytics",
    iconType: "text",
    iconText: "📈",
    items: [
      "Attendance trends (last 30 days)",
      "Class-wise attendance",
      "Low attendance alerts",
    ],
  },
  {
    title: "Student Demographics",
    iconType: "text",
    iconText: "🧩",
    items: [
      "Gender distribution",
      "Class strength overview",
      "New admissions tracking",
    ],
  },
  {
    title: "Staff Attendance Analytics",
    iconType: "text",
    iconText: "✅",
    items: [
      "Staff attendance trends",
      "Department overview",
      "Teacher–student ratio",
    ],
  },
  // (More… keep adding if you want full list; UI supports it)
  {
    title: "Calendar & Academic Events",
    iconType: "text",
    iconText: "🗓️",
    items: ["Exams & assessments", "Holidays & meetings", "Academic events"],
  },
  {
    title: "Notifications & Alerts",
    iconType: "text",
    iconText: "🔔",
    items: [
      "Low attendance warnings",
      "Absent teacher alerts",
      "System announcements",
    ],
  },
  {
    title: "Student Registration & Profiles",
    iconType: "text",
    iconText: "🪪",
    items: [
      "Student registration",
      "Class & section assignment",
      "Complete academic profile",
    ],
  },
  {
    title: "Academic History & Transcripts",
    iconType: "text",
    iconText: "📄",
    items: [
      "Academic history per student",
      "PDF transcripts",
      "Long-term record storage",
    ],
  },
];

const paperGeneratorFeatures: FeatureCard[] = [
  {
    title: "Curriculum-Aligned Content Engine",
    iconType: "text",
    iconText: "📚",
    items: [
      "Questions mapped by Grade, Subject, Chapter, and Topic",
      "Coverage from KG to Grade 10",
      "Ensures syllabus-accurate exam papers",
      "Eliminates manual curriculum cross-checking",
    ],
  },
  {
    title: "Multiple Question Types & Templates",
    iconType: "text",
    iconText: "🧱",
    items: [
      "Supports MCQs, short questions, long questions, and mixed formats",
      "Ready-to-use paper templates (quizards)",
      "Flexible layouts for different exam needs",
      "Consistent structure across all papers",
    ],
  },
  {
    title: "Exam Paper Generation",
    iconType: "text",
    iconText: "📝",
    items: [
      "Generate papers for Monthly, Mid-term, Final & Practice assessments",
      "Instant paper creation with minimal inputs",
      "Saves hours of manual work",
    ],
  },
  {
    title: "Paper Editing & Refinement",
    iconType: "text",
    iconText: "✏️",
    items: [
      "Edit questions after generation",
      "Re-order questions easily",
      "Adjust difficulty or content as needed",
      "Supports internal review before finalization",
    ],
  },
  {
    title: "Paper Library & History",
    iconType: "text",
    iconText: "🗂️",
    items: [
      "Automatically stores every generated paper",
      "Centralized library for all exams",
      "Papers become long-term institutional assets",
      "No risk of lost or overwritten papers",
    ],
  },
  {
    title: "Advanced Search & Reuse",
    iconType: "text",
    iconText: "🔎",
    items: [
      "Search by grade, subject, term, date, or creator",
      "Reopen previously created papers anytime",
      "Duplicate and reuse papers instantly",
      "Ideal for recurring exams and revisions",
    ],
  },
  {
    title: "Printing, Export & Sharing",
    iconType: "text",
    iconText: "🖨️",
    items: [
      "Exam-ready printable layouts",
      "PDF export for download and archiving",
      "Bulk printing for large exam cohorts",
      "Optimized for school printing workflows",
    ],
  },
  {
    title: "Collaboration & Approvals",
    iconType: "text",
    iconText: "🤝",
    items: [
      "Share papers via WhatsApp or file sharing",
      "Easy collaboration among teachers and admins",
      "Faster review and approval cycles",
      "Reduces coordination delays",
    ],
  },
];

type TabKey = "school" | "paper" | null;

export default function ProductSuite() {
  const [active, setActive] = useState<TabKey>(null);
  const [expanded, setExpanded] = useState(false);

  const description = useMemo(() => {
    if (active === "school")
      return "Explore powerful tools to run your entire school smoothly.";
    if (active === "paper")
      return "Generate exam papers faster with curriculum-aligned templates.";
    return "";
  }, [active]);

  const features =
    active === "school"
      ? schoolFeatures
      : active === "paper"
      ? paperGeneratorFeatures
      : [];

  const visibleCount = active === "school" ? 8 : features.length; // "Read More" only for school like your original script
  const showReadMore = active === "school" && features.length > 8;

  const cardsToShow = !expanded ? features.slice(0, visibleCount) : features;

  return (
    <section id="features" className="w-full bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h5 className="text-center text-xl sm:text-2xl font-extrabold text-gray-900">
          Explore Our Core Products
        </h5>

        {/* Top 3 Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              setActive((prev) => (prev === "school" ? null : "school"));
            }}
            className={[
              "group w-full rounded-2xl border p-5 text-left shadow-sm transition",
              active === "school"
                ? "border-[#077784] bg-[#077784] text-white"
                : "border-gray-200 bg-white hover:border-[#077784]/40",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-xl border",
                  active === "school"
                    ? "border-white/30 bg-white/10"
                    : "border-gray-200 bg-gray-50",
                ].join(" ")}
              >
                <Image
                  src="/images/EducationFeatures/School-Profile-Management.png"
                  alt="School Management"
                  width={26}
                  height={26}
                  className={active === "school" ? "brightness-0 invert" : ""}
                />
              </div>
              <div>
                <div className="text-base font-extrabold">
                  School Management System
                </div>
                <div
                  className={
                    active === "school"
                      ? "text-white/80 text-sm"
                      : "text-gray-500 text-sm"
                  }
                >
                  Operations, dashboards, fees, attendance & more
                </div>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              setActive((prev) => (prev === "paper" ? null : "paper"));
            }}
            className={[
              "group w-full rounded-2xl border p-5 text-left shadow-sm transition",
              active === "paper"
                ? "border-[#077784] bg-[#077784] text-white"
                : "border-gray-200 bg-white hover:border-[#077784]/40",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <div
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-xl border text-xl",
                  active === "paper"
                    ? "border-white/30 bg-white/10"
                    : "border-gray-200 bg-gray-50",
                ].join(" ")}
              >
                🧑‍🏫
              </div>
              <div>
                <div className="text-base font-extrabold">Paper Generator</div>
                <div
                  className={
                    active === "paper"
                      ? "text-white/80 text-sm"
                      : "text-gray-500 text-sm"
                  }
                >
                  Curriculum-aligned paper creation & templates
                </div>
              </div>
            </div>
          </button>

          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left opacity-70"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl">
                👥
              </div>
              <div>
                <div className="text-base font-extrabold text-gray-800">
                  Adaptive Learning
                </div>
                <div className="text-sm text-gray-500">Coming soon</div>
              </div>
            </div>
          </button>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* Description */}
        {description ? (
          <div className="text-center text-sm sm:text-base text-gray-600">
            <span className="font-semibold text-[#077784]">{description}</span>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-400">
            Select a product above to view features.
          </div>
        )}

        {/* Panels */}
        {active && (
          <div className="mt-8">
            <div className="text-center text-sm font-extrabold text-gray-900">
              Feature Overview
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cardsToShow.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#077784]/10 text-[#077784] text-lg">
                      {card.iconType === "img" && card.iconSrc ? (
                        <Image
                          src={card.iconSrc}
                          alt={card.title}
                          width={22}
                          height={22}
                        />
                      ) : (
                        <span>{card.iconText ?? "⭐"}</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h6 className="font-extrabold text-gray-900 text-sm">
                        {card.title}
                      </h6>
                    </div>
                  </div>

                  <ul className="mt-3 space-y-2 text-sm text-gray-600 list-disc pl-5">
                    {card.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Read More / Read Less */}
            {showReadMore && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded((p) => !p)}
                  className="rounded-xl bg-[#077784] px-6 py-2 text-sm font-semibold text-white hover:bg-[#055f66] transition"
                >
                  {expanded ? "Read Less" : "Read More"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
