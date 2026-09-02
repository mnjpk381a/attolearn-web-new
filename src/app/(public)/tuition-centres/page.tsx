import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Ban,
  Building2,
  Check,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import {
  FaAddressCard,
  FaCalendarDays,
  FaChartLine,
  FaCircleCheck,
  FaClock,
  FaCrosshairs,
  FaFileLines,
  FaFolder,
  FaGraduationCap,
  FaGlobe,
  FaChartColumn,
  FaClipboardCheck,
  FaShieldHalved,
  FaPenToSquare,
  FaPrint,
  FaUserGear,
  FaUserGroup,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";

const workspaceCards = [
  [
    FaUserGear,
    "Centre administrators",
    "Manage staff, roster and workspace settings.",
  ],
  [
    FaAddressCard,
    "Tutor accounts",
    "Each tutor has their own account and their own assigned learners.",
  ],
  [
    FaUserGroup,
    "Learner roster",
    "Every learner the centre supports, in one list.",
  ],
  [FaUsers, "Groups", "Organise learners into the groups you actually teach."],
  [
    FaUserPlus,
    "Student assignment",
    "Allocate learners to tutors, and reallocate when staffing changes.",
  ],
  [
    FaClipboardCheck,
    "Assigned work",
    "Practice, revision and assessments set by the tutor responsible.",
  ],
  [
    FaChartColumn,
    "Plan capacity",
    "The workspace tells you when the roster reaches your plan's student cap.",
  ],
  [
    FaShieldHalved,
    "Audit trail",
    "Actions recorded with who did them, when, and to which learner.",
  ],
] as const;

const assessmentCards = [
  [
    FaFileLines,
    "Centre-wide papers",
    "Shared papers your tutors can set consistently.",
  ],
  [FaCrosshairs, "Topic tests", "A focused check after a topic is taught."],
  [FaGraduationCap, "Mock exams", "Longer papers for exam preparation."],
  [
    FaPrint,
    "Printable and online",
    "Print for the centre, or set online for home.",
  ],
  [
    FaPenToSquare,
    "Result review",
    "Review results by learner, group or tutor.",
  ],
  [
    FaFolder,
    "Records kept",
    "Results stay attached to each learner's evidence.",
  ],
] as const;

function TickList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-5 text-slate-700">
          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#07818a]">
            <Check className="h-2.5 w-2.5 text-[#07818a]" strokeWidth={2.5} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function DashboardList({
  title,
  rows,
}: {
  title: string;
  rows: readonly (readonly [string, string, string])[];
}) {
  return (
    <article className="rounded-xl border border-[#e8e2d8] bg-[#fffef9] p-4 shadow-[0_8px_22px_rgba(57,73,70,.08)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-[#10243d]">{title}</h3>
        <span className="text-[10px] font-bold text-[#07818a]">View all</span>
      </div>
      <div className="space-y-4">
        {rows.map(([name, role, stat], index) => (
          <div
            key={name}
            className="grid min-h-12 grid-cols-[48px_1fr_auto] items-center gap-3"
          >
            <span className="relative h-12 w-12 shrink-0 rounded-full border-2 border-white shadow-sm">
              <Image
                src={
                  index % 2 === 0
                    ? "/images/tuition-centres/tutor-woman-v2.png"
                    : "/images/tuition-centres/tutor-man-v2.png"
                }
                alt={`${name} profile`}
                fill
                sizes="48px"
                className="rounded-full object-cover object-center"
              />
              <i className="absolute -bottom-0.5 -right-0.5 z-10 h-3 w-3 rounded-full border-2 border-white bg-[#2db446]" />
            </span>
            <span>
              <b className="block text-xs text-[#12354a]">{name}</b>
              <small className="mt-0.5 block text-[10px] font-semibold text-[#07818a]">
                {role}
              </small>
            </span>
            {title === "Learners" ? (
              <span className="grid h-11 w-11 place-items-center rounded-full border-[5px] border-[#4eb9b3] border-r-[#e9e3d9] text-[10px] font-extrabold text-[#12354a]">
                {stat}
              </span>
            ) : (
              <span className="text-right">
                <b className="block text-xs text-[#12354a]">{stat}</b>
                <small className="text-[9px] text-slate-500">Learners</small>
              </span>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
export default function TuitionCentresPage() {
  return (
    <main className="tuition-centres-page bg-[radial-gradient(circle_at_50%_25%,#fffef9_0%,#fffbed_68%,#fffdf7_100%)] text-[#10243d]">
      <section className="tuition-centres-hero relative overflow-hidden border-b border-[#d9eeee] bg-[#f7fbfb]">
        <div
          className="absolute inset-x-0 bottom-0 h-44 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -bottom-28 -left-[8%] h-56 w-[70%] rotate-3 rounded-[50%] bg-[#c8f0ef]" />
          <div className="absolute -bottom-32 left-[18%] h-56 w-[92%] -rotate-2 rounded-[50%] bg-[#9de1df]" />
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#07818a_1px,transparent_1px)] bg-size-[13px_13px]" />
        </div>
        <div className="site-container relative grid min-h-138.75 gap-10 pb-24 pt-12 lg:grid-cols-[minmax(0,470px)_minmax(0,640px)] lg:items-start lg:justify-between">
          <div className="tuition-centres-hero-copy max-w-117.5 pt-7">
            <p className="text-xs font-extrabold uppercase tracking-[.06em] text-[#07818a]">
              For Tuition Centres
            </p>
            <span className="mt-4 block h-0.5 w-10 bg-[#f4a517]" />
            <h1 className="mt-7 text-[36px] font-extrabold leading-[1.1] tracking-[-.035em] text-[#07163f] sm:text-[46px]">
              <span className="block">Bring adaptive learning</span>
              <span className="block">and assessment</span>
              <span className="block text-[#07818a]">
                into your tuition centre
              </span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-slate-700">
              Run several tutors and many learners from one workspace — with
              consistent practice between sessions, shared assessment tools, and
              a clear record of who did what.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#f4a517] px-6 text-sm font-bold text-white"
              >
                Book a Tuition Centre Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center rounded-lg border border-[#07818a] bg-white px-7 text-sm font-bold text-[#075e65]"
              >
                Contact Sales
              </Link>
            </div>
          </div>
          <div className="ui-mockup grid w-full gap-3 sm:grid-cols-[285px_1fr]">
            <div className="space-y-4">
              <DashboardList
                title="Tutors"
                rows={[
                  ["Sarah Mitchell", "Mathematics Tutor", "28"],
                  ["James Carter", "Physics Tutor", "32"],
                  ["Emily Baxter", "English Tutor", "26"],
                ]}
              />
              <DashboardList
                title="Learners"
                rows={[
                  ["Lachlan Brown", "Year 8 · Mathematics", "82%"],
                  ["Sophie Williams", "Year 7 · Science", "76%"],
                  ["Noah Johnson", "Year 9 · English", "68%"],
                ]}
              />
            </div>
            <div className="space-y-4">
              <article className="rounded-xl border border-[#e8e2d8] bg-[#fffdf5] p-5 shadow-[0_8px_22px_rgba(57,73,70,.08)]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#075e65]">
                      Centre Progress
                    </p>
                    <p className="mt-4 text-xs text-slate-500">
                      Assessments Completed
                    </p>
                    <p className="text-3xl font-extrabold text-[#10243d]">
                      1,342
                    </p>
                    <p className="mt-1 text-xs font-bold text-emerald-600">
                      ↑ 18%
                    </p>
                  </div>
                  <span className="rounded-md border px-2 py-1 text-[10px]">
                    This Month
                  </span>
                </div>
                <div className="mt-5 flex h-20 items-end gap-2 border-b border-l border-slate-200 px-2 pb-1">
                  {[24, 34, 29, 48, 46, 61, 58, 72, 68, 88].map((h, i) => (
                    <span
                      key={i}
                      className="w-full rounded-t bg-[#18a3a9]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </article>
              <div className="space-y-3">
                <article className="flex items-center gap-4 rounded-xl bg-linear-to-r from-[#0c8b93] to-[#075e65] p-4 text-white">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/90 text-[#168b91]">
                    <BadgeCheck className="h-8 w-8" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">Consistent Practice</h3>
                    <p className="mt-1 text-xs text-white/80">
                      Shared Assessments.
                      <br />
                      Better Outcomes.
                    </p>
                  </div>
                </article>
                <article className="rounded-xl border border-[#e8e2d8] bg-[#fffdf5] p-4 shadow-[0_8px_22px_rgba(57,73,70,.08)]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#075e65]">
                      Performance Overview
                    </p>
                    <span className="shrink-0 whitespace-nowrap rounded border px-3 py-1 text-[8px]">
                      By Subject
                    </span>
                  </div>
                  {[
                    ["Mathematics", "78%"],
                    ["Science", "72%"],
                    ["English", "68%"],
                    ["Other", "60%"],
                  ].map(([n, v]) => (
                    <div
                      key={n}
                      className="mt-3 grid grid-cols-[68px_1fr_28px] items-center gap-2 text-[10px]"
                    >
                      <span>{n}</span>
                      <span className="h-1.5 rounded bg-slate-100">
                        <span
                          className="block h-full rounded bg-[#159b8f]"
                          style={{ width: v }}
                        />
                      </span>
                      <b>{v}</b>
                    </div>
                  ))}
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-container py-16">
        <div className="grid gap-6 rounded-2xl border border-[#eee5da] bg-white/80 px-7 py-6 shadow-[0_8px_22px_rgba(72,62,45,.06)] md:grid-cols-[76px_1fr_auto] md:items-center">
          <span className="grid h-19 w-19 place-items-center rounded-full bg-[#16838a] text-white">
            <Building2 className="h-10 w-10" strokeWidth={1.9} />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-[#075e65]">
              A centre is a workspace, not a school system
            </h2>
            <p className="mt-2 max-w-152.5 text-sm leading-6 text-slate-600">
              A tuition centre runs on the AttoLearn Tutor Workspace, scaled for
              several tutors and a larger roster. It is deliberately not a
              school management system — centres that need attendance, fees and
              academic records should look at School Management instead.
            </p>
          </div>
          <Link
            href="/schools"
            className="inline-flex h-14 items-center gap-3 rounded-lg bg-[#08747c] px-7 text-sm font-bold text-white"
          >
            For Schools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="site-container py-16">
        <p className="text-center text-xs font-extrabold uppercase tracking-[.06em] text-[#ee8100]">
          Centre structure
        </p>
        <h2 className="mt-3 text-center text-[30px] sm:text-[36px] font-extrabold tracking-[-.025em] text-[#10243d]">
          Administrators, tutors, learners and groups
        </h2>
        <p className="mt-3 text-center text-base text-slate-600">
          One workspace with real roles, so a centre isn&apos;t run out of a
          shared login.
        </p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workspaceCards.map(([Icon, title, copy], index) => {
            const tones = [
              "bg-[#e8f7f6] text-[#2f9ba0]",
              "bg-[#f5e9ff] text-[#8e36d8]",
              "bg-[#eaf8df] text-[#35ad43]",
              "bg-[#eef0ff] text-[#4b54df]",
              "bg-[#fff3df] text-[#f19c00]",
              "bg-[#fff0ef] text-[#f06c70]",
              "bg-[#e9f7f5] text-[#249da4]",
              "bg-[#f3eaff] text-[#8757d8]",
            ];
            return (
              <article
                key={title}
                className="min-h-49 rounded-xl border border-[#eee5da] bg-white/75 p-5 shadow-[0_5px_18px_rgba(67,58,43,.04)]"
              >
                <span
                  className={`grid h-20 w-20 place-items-center rounded-full ${tones[index]}`}
                >
                  <Icon className="h-10 w-10" />
                </span>
                <h3 className="mt-4 text-base font-extrabold text-[#075e65]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-slate-600">{copy}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-5 grid gap-4 rounded-xl border-2 border-dashed border-[#f0a527] bg-[#fffaf0] p-4 md:grid-cols-[52px_1fr] md:items-center">
          <Ban className="h-12 w-12 text-[#f3a000]" strokeWidth={2.2} />
          <div>
            <h3 className="text-sm font-bold text-[#075e65]">
              What the workspace deliberately does not do
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Workspace invoicing is tracking only — it records what is owed and
              paid, and is not a payment or accounting system. Payroll is scoped
              to the workspace&apos;s own tutors. Assessment reuses the Paper
              Generator rather than a separate centre exam engine.
            </p>
            <p className="mt-2 text-[10px] font-bold uppercase text-[#d88900]">
              Scope boundaries per the Phase 2 backlog — confirm against the
              current build before quoting capability
            </p>
          </div>
        </div>
      </section>
      <section className="site-container grid gap-14 py-16 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[.06em] text-[#ee8100]">
            Learning support
          </p>
          <h2 className="mt-3 max-w-117.5 text-[30px] sm:text-[38px] font-extrabold leading-[1.08] tracking-[-.03em] text-[#10243d]">
            Consistent practice between sessions
          </h2>
          <p className="mt-5 max-w-125 text-base leading-7 text-slate-700">
            Most of a learner&apos;s week happens when your tutors aren&apos;t
            there. Curriculum-aligned practice keeps that time productive, and
            turns it into evidence your tutors can act on.
          </p>
          <TickList
            items={[
              "Curriculum-aligned practice, Foundation to Year 10",
              "Individual goals per learner, not one plan for a group",
              "Targeted revision for skills at risk of fading",
              "Tutor visibility of the learners they are responsible for",
              "Learner evidence that carries across tutors, not held in one person's head",
            ]}
          />
        </div>
        <div className="rounded-2xl border border-[#eee5da] bg-white/75 p-5 shadow-[0_14px_36px_rgba(30,60,65,.12)]">
          <div className="flex h-14 items-center gap-4 rounded-lg bg-linear-to-r from-[#08747c] to-[#16838a] px-5 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#16838a]">
              <FaCalendarDays className="h-5 w-5" />
            </span>
            <h3 className="text-base font-bold">
              Group: Year 9 Maths — Tuesday
            </h3>
          </div>
          <div className="mt-4 space-y-3">
            <article className="flex min-h-20 items-center gap-5 rounded-xl bg-[#f5f8ed] px-5 py-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#e4f0dc] text-[#278d77]">
                <FaUsers className="h-9 w-9" />
              </span>
              <div>
                <h4 className="text-base font-extrabold text-[#10243d]">
                  8 learners
                </h4>
                <p className="mt-1 text-sm text-slate-700">
                  Assigned to Ms. Haruna
                </p>
              </div>
            </article>
            <article className="flex min-h-20 items-center gap-5 rounded-xl bg-[#fbf1f2] px-5 py-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#f1e2f2] text-[#742bb7]">
                <FaChartLine className="h-9 w-9" />
              </span>
              <div>
                <h4 className="text-base font-extrabold text-[#10243d]">
                  Common gap
                </h4>
                <p className="mt-1 text-sm text-slate-700">
                  Linear equations — 5 of 8 need prerequisite work
                </p>
              </div>
            </article>
            <article className="flex min-h-20 items-center gap-5 rounded-xl bg-[#fff8e7] px-5 py-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#fff0c8] text-[#ed9a00]">
                <TbTargetArrow className="h-11 w-11" strokeWidth={2.2} />
              </span>
              <div>
                <h4 className="text-base font-extrabold text-[#10243d]">
                  Set for this week
                </h4>
                <p className="mt-1 text-sm text-slate-700">
                  Targeted practice, then a topic test
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="site-container py-16">
        <p className="text-center text-xs font-extrabold uppercase tracking-[.06em] text-[#ee8100]">
          Assessment
        </p>
        <h2 className="mt-3 text-center text-[28px] sm:text-[34px] font-extrabold tracking-[-.025em] text-[#10243d]">
          One assessment toolset across the centre
        </h2>
        <p className="mt-2 text-center text-base text-slate-600">
          Every tutor building papers the same way, from the same
          curriculum-based bank.
        </p>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {assessmentCards.map(([Icon, title, copy], index) => {
            const tones = [
              "bg-[#edf2f7] text-[#3b86c5]",
              "bg-[#edf5e9] text-[#298f82]",
              "bg-[#f5e7f5] text-[#681bb0]",
              "bg-[#fff0df] text-[#df781a]",
              "bg-[#f3f8dc] text-[#8ebc19]",
              "bg-[#e9f0f7] text-[#4388bd]",
            ];
            return (
              <article
                key={title}
                className="flex min-h-28 items-center gap-5 rounded-xl border border-[#eee5da] bg-white/70 px-5 py-4"
              >
                <span
                  className={`grid h-16 w-16 shrink-0 place-items-center rounded-full ${tones[index]}`}
                >
                  <Icon className="h-8 w-8" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#10243d]">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {copy}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-7 grid gap-5 rounded-xl border-2 border-dashed border-[#f0a527] bg-[#fffaf0] px-6 py-5 md:grid-cols-[150px_1fr_auto] md:items-center">
          <div className="relative mx-auto h-24 w-32 text-[#397bb1]">
            <FaFileLines className="absolute bottom-0 left-7 h-20 w-16 -rotate-6 rounded bg-white p-2 shadow-md" />
            <FaFileLines className="absolute bottom-2 left-13 h-20 w-16 rotate-6 rounded bg-white p-2 shadow-md" />
            <FaCircleCheck className="absolute bottom-1 left-0 h-9 w-9 rounded-full bg-white text-[#91c634]" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#10243d]">
              Combining topics or chapters into one paper
            </h3>
            <p className="mt-1 text-sm leading-5 text-slate-600">
              Building a single paper that spans several topics or chapters at
              once.
            </p>
            <p className="mt-3 max-w-140 text-xs font-extrabold uppercase leading-4 text-[#ee8100]">
              Feature availability for centre accounts to be confirmed with
              engineering before publishing as live
            </p>
          </div>
          <Link
            href="/papergenerator"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-[#08747c] px-7 text-sm font-bold text-white"
          >
            Learn More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <section className="tuition-tutor-coordination site-container py-16">
        <div className="content-split tutor-coordination-split">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.06em] text-[#ee8100]">
              Tutor coordination
            </p>
            <h2 className="mt-3 text-[28px] sm:text-[34px] font-extrabold leading-[1.12] tracking-[-.025em] text-[#075e65]">
              The centre keeps the evidence,
              <br />
              <em className="font-extrabold">not the individual tutor</em>
            </h2>
            <p className="mt-5 max-w-107.5 text-base leading-7 text-slate-700">
              When a tutor leaves, or a learner moves between tutors, the
              learning history doesn&apos;t leave with them. That continuity is
              the main operational reason centres outgrow individual tutor
              accounts.
            </p>
            <TickList
              items={[
                "Allocate and reallocate learners between tutors",
                "Role-based access — administrators and tutors see different things",
                "Consistent expectations across every tutor on staff",
                "Auditable record of assignments, changes and access",
              ]}
            />
          </div>
          <div className="content-split-media content-split-media-right relative h-92 overflow-hidden rounded-2xl border border-[#e8ddd0] shadow-sm">
            <Image
              src="/images/tuition-centres/tutor-coordination-v3.png"
              alt="Tutor working at a computer"
              fill
              sizes="(min-width:1024px) 640px, 100vw"
              className="object-cover object-center"
            />
            <div className="ui-mockup absolute left-[28%] top-1/2 w-[38%] -translate-y-1/2 rounded-xl border border-[#e8ddd0] bg-white/95 p-4 shadow-lg backdrop-blur-sm">
              <h3 className="text-sm font-extrabold text-[#075e65]">
                Staff and access
              </h3>
              {[
                [
                  FaUserGear,
                  "Centre administrator",
                  "Full roster, staff and workspace settings",
                ],
                [FaAddressCard, "Tutor", "Only the learners assigned to them"],
                [
                  FaUserPlus,
                  "Reallocation",
                  "Learner moved to a new tutor — access follows",
                ],
                [
                  FaShieldHalved,
                  "Staff departure",
                  "Access ends; the learner's evidence stays",
                ],
              ].map(([Icon, title, copy], i) => {
                const RowIcon = Icon as typeof FaUserGear;
                const tones = [
                  "text-[#2f9b77] bg-[#ebf7e8]",
                  "text-[#8737d1] bg-[#f4eafa]",
                  "text-[#ef9b16] bg-[#fff3df]",
                  "text-[#477cc6] bg-[#edf2ff]",
                ];
                return (
                  <div key={String(title)} className="mt-3 flex gap-3">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${tones[i]}`}
                    >
                      <RowIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#10243d]">
                        {String(title)}
                      </h4>
                      <p className="text-[9px] leading-3 text-slate-600">
                        {String(copy)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="my-16 h-px bg-[#eadfd2]" />
        <div className="content-split family-permissions-split">
          <div className="content-split-media content-split-media-left relative h-[25.25rem] overflow-hidden rounded-2xl border border-[#e8ddd0] shadow-sm">
            <Image
              src="/images/tuition-centres/family-permissions-v3.png"
              alt="Parent reviewing learning on a tablet"
              fill
              sizes="(min-width:1024px) 656px, 100vw"
              className="object-cover object-center"
            />
            <div className="ui-mockup family-permissions-card absolute left-[5.5%] top-1/2 w-[46%] -translate-y-1/2 rounded-xl border border-[#e8ddd0] bg-white/95 p-4 shadow-lg backdrop-blur-sm">
              <h3 className="text-sm font-extrabold text-[#075e65]">
                How a learner joins your centre
              </h3>
              {[
                [
                  FaCircleCheck,
                  "1. Parent approves",
                  "Access request reviewed by the parent",
                ],
                [
                  FaShieldHalved,
                  "2. Tutor verified",
                  "Verification completed before anything is visible",
                ],
                [
                  FaUserPlus,
                  "3. Allocated",
                  "Learner assigned to a tutor on your staff",
                ],
                [
                  ShieldCheck,
                  "4. Reversible",
                  "Parent can narrow or end access at any point",
                ],
              ].map(([Icon, title, copy], i) => {
                const RowIcon = Icon as typeof FaCircleCheck;
                const tones = [
                  "text-[#38a85a] bg-[#eaf8e9]",
                  "text-[#7c39c4] bg-[#f3eafa]",
                  "text-[#ec9a17] bg-[#fff4df]",
                  "text-[#4a83cf] bg-[#edf3ff]",
                ];
                return (
                  <div key={String(title)} className="mt-3 flex gap-3">
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${tones[i]}`}
                    >
                      <RowIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#10243d]">
                        {String(title)}
                      </h4>
                      <p className="text-[9px] leading-3 text-slate-600">
                        {String(copy)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="family-permissions-copy">
            <p className="text-xs font-extrabold uppercase tracking-[.06em] text-[#ee8100]">
              Family permissions
            </p>
            <h2 className="mt-3 text-[28px] sm:text-[34px] font-extrabold leading-[1.12] tracking-[-.025em] text-[#075e65]">
              The parent still controls the child&apos;s learning
            </h2>
            <p className="mt-5 max-w-107.5 text-base leading-7 text-slate-700">
              This is the part centres most often need explained. A centre
              account does not give the centre ownership of a child&apos;s
              learning record. The parent holds the account and the consent, and
              grants the centre&apos;s tutor access to the learner.
            </p>
            <TickList
              items={[
                "Parents approve tutor access — the centre cannot add a child unilaterally",
                "Access is scoped to what the parent agreed to",
                "Parents can withdraw access at any time",
                "Tutor verification is required before child learning information is visible",
                "Every access decision is recorded",
              ]}
            />
          </div>
        </div>
      </section>
      <section className="site-container py-16">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.06em] text-[#ee8100]">
            Commercial model
          </p>
          <h2 className="mt-3 text-[30px] sm:text-[36px] font-extrabold tracking-[-.03em] text-[#075e65]">
            The same plans as individual tutors
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-base leading-6 text-slate-600">
            Centres are not priced differently. You use the published Starter,
            Growth and Pro plans, sized by how many learners are actually
            active.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-225 gap-4 md:grid-cols-3">
          {[
            [
              FaUsers,
              "Priced by active learners",
              "Not by how many names sit on your roster. Dormant learners don't count.",
            ],
            [
              FaChartColumn,
              "Add students between tiers",
              "Extra-student add-ons mean you never jump a tier for one learner.",
            ],
            [
              FaFileLines,
              "Published rates",
              "The same rate card a solo tutor sees, in your local currency.",
            ],
          ].map(([Icon, title, copy]) => {
            const PriceIcon = Icon as typeof FaUsers;
            return (
              <article
                key={String(title)}
                className="flex min-h-30 gap-4 rounded-xl border border-[#eee5da] bg-white/70 p-5"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#f1f2e9] text-[#238685]">
                  <PriceIcon className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-[#075e65]">
                    {String(title)}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {String(copy)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-4 grid max-w-225 gap-5 rounded-xl border border-[#eee5da] bg-white/70 p-5 md:grid-cols-[64px_1fr_auto] md:items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#e9f5ef] text-[#168276]">
            <FaGlobe className="h-9 w-9" />
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-[#075e65]">
              See the current rates
            </h3>
            <p className="mt-1 max-w-147.5 text-xs leading-5 text-slate-600">
              Starter, Growth and Pro are published for Australia, the USA, the
              UK and Pakistan, with annual billing at approximately ten
              months&apos; price for twelve months&apos; access.
            </p>
          </div>
          <Link
            href="/chooseplan"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[#08747c] px-6 text-xs font-bold text-white"
          >
            View Pricing
          </Link>
        </div>
        <div className="mx-auto mt-4 grid max-w-225 gap-5 rounded-xl border-2 border-dashed border-[#f0a527] bg-[#fffaf0] p-5 md:grid-cols-[64px_1fr] md:items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#fff2ce] text-[#e8a000]">
            <FaShieldHalved className="h-9 w-9" />
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-[#075e65]">
              Two things to confirm before you budget
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Whether a plan covers your whole workspace or each tutor account,
              and what applies once you pass 50 active learners. Both change the
              cost materially for a centre, and neither is settled yet.
            </p>
            <p className="mt-2 text-[10px] font-extrabold uppercase text-[#dc8900]">
              Per-workspace vs per-tutor billing, and the above-50 arrangement,
              still to be confirmed
            </p>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[20rem] items-center overflow-hidden text-white">
        <Image
          src="/images/tuition-centres/roster-cta-v2.png"
          alt="Laptop workspace"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#075f68]/78" />
        <div className="site-container relative py-16 text-center">
          <h2 className="!text-white text-[32px] font-extrabold tracking-[-.025em] sm:text-[40px]">
            See it with your own roster
          </h2>
          <p className="mt-2 text-base text-white/90">
            A demo built around how your centre actually runs.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#f4aa17] px-7 text-sm font-bold text-white"
            >
              Book a Tuition Centre Demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/90 px-7 text-sm font-bold text-white"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
      <section className="site-container py-16">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#ee8100]">
            The small print, said plainly
          </p>
          <h2 className="mt-3 text-[30px] sm:text-[36px] font-extrabold tracking-[-.03em] text-[#075e65]">
            Things worth knowing before you pay
          </h2>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              FaGlobe,
              "Prices are local",
              "Each market is priced in its own currency, not converted from US dollars.",
              "bg-[#f3ddfb] text-[#a300d4]",
            ],
            [
              FaClock,
              "Cancel any time",
              "Monthly plans stop at the end of the period you have paid for.",
              "bg-[#e1f5df] text-[#31a04a]",
            ],
            [
              FaShieldHalved,
              "Your records stay yours",
              "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
              "bg-[#e8e9ff] text-[#4c42ea]",
            ],
            [
              FaUsers,
              "One invited tutor is free",
              "A tutor or parent invite is included — the tutor is never billed for that family.",
              "bg-[#ffeadc] text-[#f16917]",
            ],
          ].map(([Icon, title, copy, tone]) => {
            const InfoIcon = Icon as typeof FaGlobe;
            return (
              <article
                key={String(title)}
                className="flex min-h-37.5 gap-4 rounded-xl border border-[#eee5da] bg-white/70 p-5 shadow-[0_6px_18px_rgba(72,62,45,.05)]"
              >
                <span
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-full ${String(tone)}`}
                >
                  <InfoIcon className="h-8 w-8" />
                </span>
                <div>
                  <h3 className="text-sm font-extrabold text-[#075e65]">
                    {String(title)}
                  </h3>
                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    {String(copy)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-6 grid gap-5 rounded-xl border-2 border-dashed border-[#f0a527] bg-[#fffaf0] px-6 py-5 sm:grid-cols-[76px_1fr] sm:items-center">
          <span className="relative grid h-16 w-16 place-items-center rounded-xl bg-[#fff3d7] text-[#e39a12]">
            <ReceiptText className="h-10 w-10" />
            <b className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-[#ffe8b8] text-sm">
              %
            </b>
          </span>
          <div>
            <h3 className="text-lg font-extrabold text-[#075e65]">On tax</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Whether the figures shown include GST or VAT determines the final
              amount you pay, and consumer price display rules differ by market.
            </p>
            <p className="mt-2 text-[10px] font-extrabold uppercase text-[#ee8100]">
              Tax-inclusive vs tax-exclusive display to be confirmed per market
              before these prices go live
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden text-white">
        <Image
          src="/images/tuition-centres/pre-footer/tuition-centres-start-free-banner.png"
          alt="Tuition centre workspace with a laptop, learning dashboard, books and study plants"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#075f68]/78" />
        <div className="site-container relative flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center sm:min-h-72 sm:px-8">
          <h2 className="text-[30px] font-extrabold leading-tight tracking-[-.025em] sm:text-[38px]">
            Start free, decide later
          </h2>
          <p className="mt-3 text-base leading-6 text-white/95 sm:text-lg">
            No card to try it. Move to a paid plan when it&apos;s earning its
            place.
          </p>
          <div className="mt-7 flex w-full max-w-sm flex-col justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row">
            <a
              href="https://portal.attolearn.com/signup"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#f5aa12] px-9 text-sm font-bold text-white shadow-sm transition hover:bg-[#e99c00]"
            >
              Start Free
            </a>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md border-2 border-white/90 bg-[#075f68]/20 px-9 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
