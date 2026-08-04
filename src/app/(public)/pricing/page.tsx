/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useMemo, useReducer, useState } from "react";
import { usePathname } from "next/navigation";
import { SignupLink } from "@/constants/plans";
import {
  BadgeCheck,
  Clock3,
  FileText,
  Headphones,
  Heart,
  Lock,
  ShieldCheck,
  Users,
} from "lucide-react";

type BillingMode = "monthly" | "annual";

type Plan = {
  id: number;
  title: string;
  subtitle: string;
  pricingMode: "fixed" | "toggle";
  trialText?: string;
  fixedPriceText?: string;
  monthly?: string;
  annual?: string;
  selectLink: string;
  sections: Array<{
    heading?: string;
    items: string[];
  }>;
};

type TabKey =
  | "Paper Generator"
  | "Basic School Access Plans"
  | "Core Operations & Growth plans"
  | "Advanced & Enterprise Plans";

type SidebarIconKey = "users" | "lock" | "clock" | "heart";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function TabCardIcon({
  tabKey,
  className,
  strokeWidth = 2.1,
}: {
  tabKey: TabKey;
  className?: string;
  strokeWidth?: number;
}) {
  switch (tabKey) {
    case "Paper Generator":
      return <FileText className={className} strokeWidth={strokeWidth} />;
    case "Basic School Access Plans":
      return <Users className={className} strokeWidth={strokeWidth} />;
    case "Core Operations & Growth plans":
      return <BadgeCheck className={className} strokeWidth={strokeWidth} />;
    case "Advanced & Enterprise Plans":
      return <ShieldCheck className={className} strokeWidth={strokeWidth} />;
    default:
      return null;
  }
}

function SegmentedTabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (v: TabKey) => void;
}) {
  const items: Array<{
    key: TabKey;
    label: string;
    bgColor: string;
  }> = [
    {
      key: "Paper Generator",
      label: "Paper Generator",
      bgColor: "bg-amber-50",
    },
    {
      key: "Basic School Access Plans",
      label: "Basic School Access Plans",
      bgColor: "bg-emerald-50",
    },
    {
      key: "Core Operations & Growth plans",
      label: "Core Operations & Growth plans",
      bgColor: "bg-sky-50",
    },
    {
      key: "Advanced & Enterprise Plans",
      label: "Advanced & Enterprise Plans",
      bgColor: "bg-violet-50",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((it) => {
          const isActive = active === it.key;

          const iconColor = (() => {
            switch (it.key) {
              case "Paper Generator":
                return isActive ? "text-[#117c84]" : "text-amber-700";
              case "Basic School Access Plans":
                return isActive ? "text-[#117c84]" : "text-emerald-700";
              case "Core Operations & Growth plans":
                return isActive ? "text-[#117c84]" : "text-sky-700";
              case "Advanced & Enterprise Plans":
                return isActive ? "text-[#117c84]" : "text-violet-700";
              default:
                return "text-[#117c84]";
            }
          })();

          return (
            <button
              key={it.key}
              type="button"
              onClick={() => onChange(it.key)}
              className={cn(
                "group relative overflow-hidden rounded-3xl border px-6 py-5 text-left shadow-sm transition-all duration-300",
                isActive
                  ? "border-[#117c84] bg-[#117c84] text-white shadow-xl scale-[1.02]"
                  : `${it.bgColor} border-transparent text-[#117c84] hover:-translate-y-1 hover:border-[#117c84]/40 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]`
              )}
            >
              <div className="flex min-h-28 flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <TabCardIcon
                    tabKey={it.key}
                    className={cn("h-6 w-6", iconColor)}
                  />
                </div>

                <h3
                  className={cn(
                    "text-base font-extrabold leading-6 sm:text-[1.05rem]",
                    isActive ? "text-white" : "text-[#117c84]"
                  )}
                >
                  {it.label}
                </h3>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BillingPill({
  billing,
  onChange,
}: {
  billing: BillingMode;
  onChange: (v: BillingMode) => void;
}) {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-xs items-center rounded-full border border-[#dce6e8] bg-white p-1 shadow-sm">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition",
          billing === "monthly"
            ? "bg-[#117c84] text-white"
            : "text-slate-700 hover:bg-slate-50"
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("annual")}
        className={cn(
          "flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition",
          billing === "annual"
            ? "bg-[#117c84] text-white"
            : "text-slate-700 hover:bg-slate-50"
        )}
      >
        Annual
      </button>
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#117c84] text-white">
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className="h-3.5 w-3.5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 10.25L8.15 13.4L15 6.6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function splitPerBranch(text: string) {
  const m = text.match(/^(.*?)(\(\s*Per\s*Branch\s*\))\s*$/i);
  if (!m) return { main: text, perBranch: "" };
  return { main: m[1].trimEnd(), perBranch: m[2] };
}

function PlanIcon({ planId }: { planId: number }) {
  switch (planId) {
    case 1:
      return <FileText className="h-9 w-9 text-[#117c84]" strokeWidth={2.1} />;
    case 2:
    case 3:
      return <Users className="h-9 w-9 text-[#117c84]" strokeWidth={2.1} />;
    case 4:
    case 5:
      return (
        <BadgeCheck className="h-9 w-9 text-[#117c84]" strokeWidth={2.1} />
      );
    default:
      return (
        <ShieldCheck className="h-9 w-9 text-[#117c84]" strokeWidth={2.1} />
      );
  }
}

function SidebarFeatureIcon({
  iconKey,
  className,
  strokeWidth = 2.1,
}: {
  iconKey: SidebarIconKey;
  className?: string;
  strokeWidth?: number;
}) {
  switch (iconKey) {
    case "users":
      return <Users className={className} strokeWidth={strokeWidth} />;
    case "lock":
      return <Lock className={className} strokeWidth={strokeWidth} />;
    case "clock":
      return <Clock3 className={className} strokeWidth={strokeWidth} />;
    case "heart":
      return <Heart className={className} strokeWidth={strokeWidth} />;
    default:
      return null;
  }
}

function FeatureGrid({
  items,
  compact = false,
}: {
  items: string[];
  compact?: boolean;
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#e6edef] md:block" />

      <ul className="grid grid-cols-1 md:grid-cols-2">
        {items.map((item, i) => (
          <li
            key={i}
            className={cn(
              "flex min-w-0 items-start gap-3 border-b border-[#e6edef] text-[#3f4a61]",
              compact
                ? "py-3 text-sm leading-6"
                : "py-3.5 text-[15px] leading-7",
              i % 2 === 0 ? "md:pr-7" : "md:pl-7"
            )}
          >
            <span className="mt-1">
              <CheckIcon />
            </span>
            <span className="block whitespace-normal wrap-break-word">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanHeader({ plan }: { plan: Plan }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <div className="flex h-19 w-19 shrink-0 items-center justify-center rounded-full bg-[#e8f2f3]">
        <PlanIcon planId={plan.id} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-[2rem] font-extrabold leading-none tracking-tight text-teal-700">
          {plan.title}
        </h3>

        <p className="mt-3 text-[16px] font-medium leading-6 text-[#5b647a]">
          {plan.subtitle}
        </p>

        {plan.trialText ? (
          <a
            href={plan.selectLink}
            className="mt-4 inline-flex rounded-full bg-[#f5a623] px-5 py-2 text-sm font-extrabold leading-none text-white shadow-sm transition hover:opacity-95"
          >
            {plan.trialText}
          </a>
        ) : null}
      </div>
    </div>
  );
}

function PriceBlock({ plan, billing }: { plan: Plan; billing: BillingMode }) {
  const isAnnual = billing === "annual";

  const priceText = useMemo(() => {
    if (plan.pricingMode === "fixed") return plan.fixedPriceText ?? "";
    return isAnnual ? plan.annual ?? "" : plan.monthly ?? "";
  }, [plan, isAnnual]);

  const { main, perBranch } = useMemo(
    () => splitPerBranch(priceText),
    [priceText]
  );

  const currencyMatch = main.match(/^(PKR)\s+(.*)$/i);
  const currency = currencyMatch?.[1] ?? "";
  const rest = currencyMatch?.[2] ?? main;

  const amountMatch = rest.match(/^([\d,]+)\s*(.*)$/);
  const amount = amountMatch?.[1] ?? rest;
  const suffix = amountMatch?.[2] ?? "";

  return (
    <div className="pt-7">
      <div className="border-t border-dashed border-[#d7e3e6]" />

      <div className="pt-7">
        <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
          {currency ? (
            <span className="text-[20px] font-medium text-[#24304f]">
              {currency}
            </span>
          ) : null}

          <span className="text-[2.85rem] font-extrabold leading-none text-[#117c84] sm:text-[3rem]">
            {amount}
          </span>

          {suffix ? (
            <span className="text-[20px] font-medium text-[#24304f] sm:text-[1.9rem]">
              {suffix}
            </span>
          ) : null}

          {perBranch ? (
            <span className="text-xs font-semibold text-slate-500">
              {perBranch}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PlanFooter({ selectLink }: { selectLink: string }) {
  return (
    <div className="pt-8">
      <a
        href={selectLink}
        target="_blank"
        rel="noreferrer"
        className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#117c84] px-4 text-center text-[18px] font-extrabold text-white shadow-[0_10px_24px_rgba(17,124,132,0.18)] transition hover:opacity-95"
      >
        Subscribe Now
      </a>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-slate-500">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#117c84]" />
          Secure Payment
        </span>
        <span className="hidden text-slate-300 sm:inline">|</span>
        <span>Cancel Anytime</span>
      </div>
    </div>
  );
}

function WhySidebar() {
  const items: Array<{
    title: string;
    text: string;
    iconKey: SidebarIconKey;
    iconWrap: string;
    iconColor: string;
  }> = [
    {
      title: "Built for Schools",
      text: "Designed specifically for schools and educators.",
      iconKey: "users",
      iconWrap: "bg-[#dfe9ff]",
      iconColor: "text-[#3b82f6]",
    },
    {
      title: "Secure & Reliable",
      text: "Your data is safe with enterprise-grade security.",
      iconKey: "lock",
      iconWrap: "bg-[#dff4e8]",
      iconColor: "text-[#117c84]",
    },
    {
      title: "Saves Time",
      text: "Automate tasks and focus on what matters most.",
      iconKey: "clock",
      iconWrap: "bg-[#dff0ff]",
      iconColor: "text-[#2890ff]",
    },
    {
      title: "Trusted by 500+ Schools",
      text: "Across Pakistan and growing every day.",
      iconKey: "heart",
      iconWrap: "bg-[#ffe3e8]",
      iconColor: "text-[#ef5b72]",
    },
  ];

  return (
    <aside className="rounded-[28px] border border-[#dbe5e7] bg-[#f2f8f8] p-7 shadow-sm">
      <h3 className="text-[1.2rem] font-extrabold leading-tight text-[#117c84] sm:text-[1.35rem]">
        Why Schools Love
        <br />
        AttoLearn
      </h3>

      <div className="mt-6">
        {items.map((item, idx) => (
          <div
            key={item.title}
            className={cn(
              "flex gap-4 py-5",
              idx !== items.length - 1 && "border-b border-[#e3ecee]"
            )}
          >
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
                item.iconWrap
              )}
            >
              <SidebarFeatureIcon
                iconKey={item.iconKey}
                className={cn("h-7 w-7", item.iconColor)}
              />
            </div>

            <div>
              <h4 className="text-[18px] font-extrabold leading-6 text-[#117c84]">
                {item.title}
              </h4>
              <p className="mt-1 text-[15px] leading-7 text-[#5b647a]">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-6 rounded-[22px] bg-white p-6 shadow-sm ring-1 ring-[#e4ecee]">
        <div className="absolute left-4 top-3 text-[42px] leading-none text-[#9bd4cf]">
          “
        </div>
        <div className="absolute bottom-2 right-4 text-[42px] leading-none text-[#9bd4cf]">
          ”
        </div>

        <p className="pt-3 text-[15px] italic leading-8 text-[#4f5870]">
          AttoLearn has simplified our exam process completely. Generating
          papers is now quick, easy and accurate.
        </p>

        <p className="mt-4 text-[15px] font-medium text-slate-500">
          — A School Administrator
        </p>

        <div className="mt-4 flex items-center gap-1 text-[#f5a623]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
    </aside>
  );
}

function BottomSupportBar() {
  return (
    <div className="mt-8 rounded-3xl border border-[#dbe5e7] bg-white px-6 py-5 shadow-sm">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr_auto] lg:items-center">
        <div className="flex items-center gap-4 lg:pr-6 lg:[border-right:1px_solid_#e6edef]">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eaf3f3]">
            <ShieldCheck className="h-7 w-7 text-[#117c84]" />
          </div>
          <div>
            <h4 className="text-[18px] font-extrabold text-[#117c84]">
              14-Day Money Back Guarantee
            </h4>
            <p className="mt-1 text-[15px] text-[#5b647a]">
              Not satisfied? Get a full refund within 14 days.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:px-6 lg:[border-right:1px_solid_#e6edef]">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eaf3f3]">
            <Headphones className="h-7 w-7 text-[#117c84]" />
          </div>
          <div>
            <h4 className="text-[18px] font-extrabold text-[#117c84]">
              Need Help?
            </h4>
            <p className="mt-1 text-[15px] text-[#5b647a]">
              Our team is here to help you choose the right plan.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-start lg:justify-end">
          <a
            href="/contact"
            className="inline-flex h-13 min-w-45 items-center justify-center rounded-2xl border-2 border-[#117c84] px-6 text-[18px] font-extrabold text-[#117c84] transition hover:bg-[#117c84] hover:text-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

function PaperGeneratorLayout({
  plan,
  billing,
}: {
  plan: Plan;
  billing: BillingMode;
}) {
  const allItems = plan.sections.flatMap((section) => section.items);

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.5fr)_440px]">
        <div className="rounded-[30px] border border-[#dbe5e7] bg-white p-6 shadow-sm sm:p-8 lg:p-9">
          <PlanHeader plan={plan} />
          <PriceBlock plan={plan} billing={billing} />

          <div className="mt-4">
            <FeatureGrid items={allItems} />
          </div>

          <PlanFooter selectLink={plan.selectLink} />
        </div>

        <WhySidebar />
      </div>

      <BottomSupportBar />
    </>
  );
}

function StandardPriceCard({
  plan,
  billing,
  featured,
  animateKey,
  index,
}: {
  plan: Plan;
  billing: BillingMode;
  featured?: boolean;
  animateKey: number;
  index: number;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(false);
    const t = window.setTimeout(() => setMounted(true), 80 + index * 90);
    return () => window.clearTimeout(t);
  }, [animateKey, index]);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-[30px] border bg-white p-6 shadow-sm transition-all duration-700 sm:p-8",
        mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        featured ? "border-[#f1c969] ring-2 ring-[#f5dfa8]" : "border-[#dbe5e7]"
      )}
    >
      {featured ? (
        <div className="absolute right-5 top-5 rounded-full bg-[#f5a623] px-3 py-1 text-xs font-extrabold text-white">
          Most Popular
        </div>
      ) : null}

      <PlanHeader plan={plan} />
      <PriceBlock plan={plan} billing={billing} />

      <div className="mt-6 flex-1 space-y-6">
        {plan.sections.map((section, idx) => (
          <div key={idx}>
            {section.heading ? (
              <div className="mb-3 border-b border-[#e6edef] pb-2 text-[17px] font-black tracking-normal text-teal-700">
                {section.heading}
              </div>
            ) : null}
            <FeatureGrid items={section.items} compact />
          </div>
        ))}
      </div>

      <PlanFooter selectLink={plan.selectLink} />
    </div>
  );
}

export default function PricingPage() {
  const plans: Plan[] = useMemo(
    () => [
      {
        id: 1,
        title: "Paper Generator",
        subtitle: "For Schools & Teachers needing paper generation only",
        pricingMode: "fixed",
        trialText: "One Month Free Trial",
        fixedPriceText: "PKR 5,000 / Year",
        selectLink: SignupLink + "?plan=1",
        sections: [
          {
            items: [
              "Unlimited paper generation",
              "Curriculum-aligned papers (Grade, Subject, Chapter, Topic)",
              "Covers KG to Grade 10",
              "MCQs, short, long & mixed question formats",
              "Ready-made paper templates",
              "Instant paper generation",
              "Edit, reorder & refine questions",
              "Built-in review before finalizing",
              "Automatic Paper Library",
              "Search, reopen, duplicate & reuse papers",
              "Exam-ready print layouts",
              "PDF export & bulk printing",
              "Share papers via WhatsApp or files",
              "Teacher & admin collaboration",
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Access",
        subtitle: "For NGOs, foundations, donor-funded and fee-free schools",
        pricingMode: "toggle",
        trialText: "One Month Free Trial",
        monthly: "PKR 2,000 / Month  (Per Branch)",
        annual: "PKR 20,000 / Year ( Per Branch)",
        selectLink: SignupLink + "?plan=2",
        sections: [
          {
            heading: "School Admins",
            items: [
              "Web, mobile & tablet access",
              "Multi-campus & multi-branch control",
              "Centralized governance with data isolation",
              "Campus selector with live KPIs",
              "Student, staff & attendance dashboards",
              "Exams, events & system notifications",
            ],
          },
          {
            heading: "Teachers",
            items: [
              "Role-based teacher dashboard",
              "Exam paper generation & online quizzes",
              "Auto-marked quizzes with stored results",
              "Class & subject management",
              "Assignments, diary notes & goals",
              "View rosters & attendance",
            ],
          },
          {
            heading: "Students",
            items: [
              "Web, mobile & tablet access",
              "Online quizzes & learning activities",
              "Diagnostic tasks for learning gaps",
              "Academic history & results",
              "Awards & certificates with QR codes",
            ],
          },
          {
            heading: "Parents / Guardians",
            items: [
              "Single account for multiple children",
              "Switch between child profiles",
              "View attendance, results & activities",
              "Use student mode on child’s behalf",
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Access Plus",
        subtitle:
          "Ideal for Fee-collecting NGOs, foundations, low-fee private schools",
        pricingMode: "toggle",
        monthly: "PKR 2,500 / Month (Per Branch)",
        annual: "PKR 25,000 / Year (Per Branch)",
        selectLink: SignupLink + "?plan=3",
        sections: [
          {
            heading: "School Admins",
            items: [
              "Web, mobile & tablet access",
              "Complete school operations platform",
              "Exam generator & academic oversight",
              "Student & staff attendance management",
              "Fee heads & fee structures",
              "Monthly or term-based fee vouchers",
              "Student-wise fee ledgers",
              "Paid & unpaid fee tracking",
              "Due dates & overdue visibility",
              "Fee summaries & total dues",
              "Financial overview (no accounting)",
              "Collected vs outstanding fees",
              "Class-wise fee collection view",
              "Multi-branch support",
              "Central & campus-level dashboards",
              "Campus selector with data isolation",
            ],
          },
          {
            heading: "Teachers",
            items: [
              "Teacher dashboard & role-based access",
              "Exam papers & online quizzes",
              "Auto-marked quizzes & diagnostics",
              "Class & section management",
              "Teacher rosters & schedule view",
            ],
          },
          {
            heading: "Students",
            items: [
              "Web, mobile & tablet access",
              "Online quizzes & learning activities",
              "Academic records & results",
              "Awards & certificates (QR-coded)",
            ],
          },
          {
            heading: "Parents / Guardians",
            items: [
              "Single account for multiple children",
              "Switch between child profiles",
              "View fee vouchers & fee history",
              "Track paid & unpaid fees",
              "Download receipts",
              "Parent–teacher communication",
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Core – Growth",
        subtitle:
          "For Private schools starting daily operations (up to ~200 students)",
        pricingMode: "toggle",
        monthly: "PKR 2,500 / Month  (Per Branch)",
        annual: "PKR 25,000 / Year  (Per Branch)",
        selectLink: SignupLink + "?plan=4",
        sections: [
          {
            heading: "School Admins",
            items: [
              "Web, mobile & tablet access",
              "Complete school operations platform",
              "Student, staff & fee dashboards",
              "Exam generator & academic planning",
              "Attendance, leaves & school calendar",
              "Alerts, notices & system notifications",
              "Fee heads & fee structures",
              "Monthly fee vouchers",
              "Student fee ledgers",
              "Paid vs unpaid tracking",
              "Due dates & overdue visibility",
              "Fee summaries & reports",
              "Single-campus focus with multi-branch readiness",
              "Clean upgrade path as school grows",
            ],
          },
          {
            heading: "Teachers",
            items: [
              "Role-based teacher dashboard",
              "Exam papers & online quizzes",
              "Auto-marked quizzes & diagnostics",
              "Class, section & subject management",
              "Teacher rosters & schedule view",
              "Assignments, diary notes & goals",
            ],
          },
          {
            heading: "Students",
            items: [
              "Web, mobile & tablet access",
              "Online quizzes & learning activities",
              "Diagnostic assessments",
              "Academic records & results",
              "Awards & certificates (QR-coded)",
            ],
          },
          {
            heading: "Parents / Guardians",
            items: [
              "Single account for multiple children",
              "Switch between child profiles",
              "View attendance & academic progress",
              "Fee vouchers, history & receipts",
              "Student mode access",
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Core",
        subtitle:
          "Ideal for Private schools running stable daily operations (up to ~500 students)",
        pricingMode: "toggle",
        monthly: "PKR 5,000 / Month  (Per Branch)",
        annual: "PKR 50,000 / Year  (Per Branch)",
        selectLink: SignupLink + "?plan=5",
        sections: [
          {
            heading: "School Admins",
            items: [
              "Web, mobile & tablet access",
              "Full school operations platform",
              "Enhanced dashboards & reporting",
              "Class-wise & school-level analytics",
              "Exam planning & academic oversight",
              "Attendance, leaves & academic calendar",
              "Flexible fee heads & structures",
              "Monthly fee vouchers",
              "Student fee ledgers",
              "Paid, unpaid & arrears tracking",
              "Due dates & overdue visibility",
              "Fee collection & dues overview",
              "Single-campus focus with multi-branch support",
              "Central visibility for multiple campuses",
              "Upgrade-ready for Professional or Enterprise",
            ],
          },
          {
            heading: "Teachers",
            items: [
              "Teacher dashboard & role-based access",
              "Exam papers & online quizzes",
              "Auto-marked quizzes & diagnostics",
              "Class, subject & timetable visibility",
              "Teacher rosters & schedule view",
              "Ad-hoc roster updates",
            ],
          },
          {
            heading: "Students",
            items: [
              "Web, mobile & tablet access",
              "Online quizzes & diagnostics",
              "Academic records & results",
              "Awards & certificates (QR-coded)",
              "Student goals & progress tracking",
            ],
          },
          {
            heading: "Parents / Guardians",
            items: [
              "Single account for multiple children",
              "Switch between child profiles",
              "View attendance & academic records",
              "Fee vouchers, history & receipts",
              "Student mode access",
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Professional",
        subtitle:
          "For Growing private schools and school groups (up to ~1,500 students)",
        pricingMode: "toggle",
        monthly: "PKR 8,000 / Month  (Per Branch)",
        annual: "PKR 80,000 / Year  (Per Branch)",
        selectLink: SignupLink + "?plan=6",
        sections: [
          {
            heading: "School Admins",
            items: [
              "Web, mobile & tablet access",
              "Complete school operations platform",
              "Advanced dashboards & reporting",
              "Class-wise, staff & fee analytics",
              "Exam planning & academic oversight",
              "Attendance, leaves & academic calendar",
              "Flexible fee heads & structures",
              "Monthly fee vouchers",
              "Student fee ledgers",
              "Paid, unpaid & arrears tracking",
              "Due dates & overdue visibility",
              "Fee collection & dues overview",
              "Multi-campus support",
              "Centralized admin dashboards",
              "Campus-level data isolation",
              "Expansion-ready architecture",
              "Standard school website included",
              "School profile, academics & admissions pages",
              "News, gallery & contact information",
              "Mobile-friendly & admin-managed",
            ],
          },
          {
            heading: "Teachers",
            items: [
              "Teacher dashboard & role-based access",
              "Exam papers & online quizzes",
              "Auto-marked quizzes & diagnostics",
              "Class, subject & timetable visibility",
              "Teacher rosters & schedule view",
              "Ad-hoc roster updates",
            ],
          },
          {
            heading: "Students",
            items: [
              "Web, mobile & tablet access",
              "Online quizzes & diagnostics",
              "Academic records & results",
              "Awards & certificates (QR-coded)",
              "Student goals & progress tracking",
            ],
          },
          {
            heading: "Parents / Guardians",
            items: [
              "Single account for multiple children",
              "Switch between child profiles",
              "View attendance & academic records",
              "Fee vouchers, history & receipts",
              "Student mode access",
            ],
          },
        ],
      },
      {
        id: 7,
        title: "Enterprise",
        subtitle:
          "Ideal for Large schools, school groups, and complex organisations (1,500+ students)",
        pricingMode: "toggle",
        monthly: "PKR 12,000 / Month  (Per Branch)",
        annual: "PKR 100,000 / Year  (Per Branch)",
        selectLink: SignupLink + "?plan=7",
        sections: [
          {
            heading: "School Owners & Admins",
            items: [
              "Web, mobile & tablet access",
              "Enterprise-grade school management platform",
              "Central owner account",
              "Unlimited branches & campuses",
              "Campus-level data isolation",
              "Group-wide dashboards & controls",
              "Payroll & salary management",
              "Deductions & staff payment workflows",
              "Income & expense tracking",
              "Financial reports & summaries",
              "Transport management (coming soon)",
              "Routes, vehicles & drivers",
              "Student route assignment",
              "Compliance reminders",
              "Library management",
              "Book inventory & circulation",
              "Fines & usage reports",
              "Front office management",
              "Visitor logs & call records",
              "Complaints & postal tracking",
            ],
          },
          {
            heading: "Teachers",
            items: [
              "Advanced teacher rosters",
              "Cross-campus staff visibility",
              "Relief & substitution tracking",
              "Timetable access at scale",
            ],
          },
          {
            heading: "Dashboards & Oversight",
            items: [
              "Consolidated multi-campus dashboards",
              "Financial, attendance & staffing analytics",
              "Drill-down reporting by campus",
            ],
          },
          {
            heading: "Custom Development (Optional)",
            items: [
              "Custom workflows & reports",
              "Third-party system integrations",
              "Scoped and quoted separately",
            ],
          },
        ],
      },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState<TabKey>("Paper Generator");
  const [billing, setBilling] = useState<BillingMode>("monthly");

  const pathname = usePathname();
  const [animateKey, bumpAnimateKey] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    bumpAnimateKey();
  }, [pathname]);

  const tabPlans = useMemo(() => {
    if (activeTab === "Paper Generator") return plans.filter((p) => p.id === 1);
    if (activeTab === "Basic School Access Plans")
      return plans.filter((p) => [2, 3].includes(p.id));
    if (activeTab === "Core Operations & Growth plans")
      return plans.filter((p) => [4, 5].includes(p.id));
    return plans.filter((p) => [6, 7].includes(p.id));
  }, [activeTab, plans]);

  const hasTogglePlans = tabPlans.some((p) => p.pricingMode === "toggle");

  return (
    <section className="relative overflow-hidden bg-[#f4f7f8] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-300 -translate-x-1/2 rounded-full bg-white/80 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-teal-700 sm:text-5xl">
            Pricing That Grows Fairly With You
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#5b647a]">
            Pricing scales by size, needs, and alignment complexity— not just
            features.
          </p>
        </div>

        <div className="mt-12">
          <SegmentedTabs active={activeTab} onChange={setActiveTab} />

          {hasTogglePlans ? (
            <div className="mt-7">
              <BillingPill billing={billing} onChange={setBilling} />
            </div>
          ) : null}
        </div>

        {activeTab === "Paper Generator" && tabPlans[0] ? (
          <PaperGeneratorLayout plan={tabPlans[0]} billing={billing} />
        ) : (
          <>
            <div
              className={cn(
                "mx-auto mt-12 grid gap-6 lg:gap-8",
                tabPlans.length === 1
                  ? "grid-cols-1 max-w-3xl"
                  : tabPlans.length === 2
                  ? "grid-cols-1 xl:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              )}
            >
              {tabPlans.map((plan, idx) => (
                <StandardPriceCard
                  key={`${plan.id}-${animateKey}-${activeTab}`}
                  plan={plan}
                  billing={billing}
                  featured={
                    activeTab === "Basic School Access Plans" && plan.id === 2
                  }
                  animateKey={animateKey}
                  index={idx}
                />
              ))}
            </div>

            <BottomSupportBar />
          </>
        )}
      </div>
    </section>
  );
}
