import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CalendarClock,
  Check,
  ClipboardCheck,
  Clock3,
  Flag,
  GraduationCap,
  Lightbulb,
  LockKeyhole,
  MapPin,
  MessageCircle,
  PlayCircle,
  RefreshCw,
  ShieldCheck,
  Target,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

const goals = [
  [
    Users,
    "Parent goal",
    "A curriculum topic or revision priority selected at home.",
  ],
  [GraduationCap, "Tutor assignment", "Targeted work from an approved tutor."],
  [
    Building2,
    "School homework",
    "School-assigned work with a deadline and authorised visibility.",
  ],
  [
    BookOpen,
    "Curriculum pathway",
    "The next appropriate topic or micro skill.",
  ],
  [
    RefreshCw,
    "Revision need",
    "A skill that should be revisited after time away.",
  ],
  [
    BarChart3,
    "System recommendation",
    "A next step suggested from the available evidence.",
  ],
] as const;
const evidence = [
  [
    Lightbulb,
    "What was understood",
    "Whether the underlying idea appears to have landed.",
  ],
  [
    MessageCircle,
    "What support was used",
    "Hints and examples change what a correct answer means.",
  ],
  [
    CalendarClock,
    "What lasted",
    "Skills are revisited later to see whether learning was retained.",
  ],
  [
    MapPin,
    "What transfers",
    "New contexts help show whether understanding extends beyond familiar questions.",
  ],
] as const;
const evidenceIconImages = [
  "/images/adaptive-learning/evidence-icons/understood.png",
  "/images/adaptive-learning/evidence-icons/support-used.png",
  "/images/adaptive-learning/evidence-icons/what-lasted.png",
  "/images/adaptive-learning/evidence-icons/what-transfers.png",
] as const;
const safety = [
  [
    ShieldCheck,
    "Approved content",
    "Child-facing content passes through a defined review process.",
  ],
  [
    ClipboardCheck,
    "Governed decisions",
    "Recommendations operate within designed and reviewable rules.",
  ],
  [
    LockKeyhole,
    "No uncontrolled generation",
    "A child is not placed in an unrestricted live-generation experience.",
  ],
  [
    MessageCircle,
    "Plain-language reasons",
    "Learners can see why a particular next step was selected.",
  ],
] as const;
const safetyIconImages = [
  "/images/adaptive-learning/safety-icons/approved-content.png",
  "/images/adaptive-learning/safety-icons/governed-decisions.png",
  "/images/adaptive-learning/safety-icons/controlled-generation.png",
  "/images/adaptive-learning/safety-icons/plain-language.png",
] as const;
const safetyAccents = ["#35bd9c", "#4a4df1", "#ad35ed", "#ff9200"] as const;
const safetyTitleColors = ["#08715f", "#25218b", "#68119c", "#e86f00"] as const;
const roles = [
  [
    GraduationCap,
    "Students",
    [
      "One clear next step",
      "Encouraging messages",
      "Hints and recent progress",
    ],
  ],
  [
    Users,
    "Parents",
    [
      "Goals and progress evidence",
      "Support and revision needs",
      "Family account control",
    ],
  ],
  [
    UserRound,
    "Tutors",
    [
      "Approved learner access",
      "Targeted assignments",
      "Evidence before the session",
    ],
  ],
  [
    Building2,
    "Schools",
    [
      "School-assigned homework",
      "Completion and relevant evidence",
      "Authorised school-linked visibility",
    ],
  ],
] as const;
const roleIconImages = [
  "/images/adaptive-learning/role-icons/students.png",
  "/images/adaptive-learning/role-icons/parents.png",
  "/images/adaptive-learning/role-icons/tutors.png",
  "/images/adaptive-learning/role-icons/schools.png",
] as const;
const roleColors = ["#08715f", "#3431c9", "#7515b5", "#ee7900"] as const;
const roleDotColors = ["#54c8ad", "#7888ee", "#c77aea", "#f2a14a"] as const;
function Btn({
  href,
  children,
  outline = false,
  amber = false,
}: {
  href: string;
  children: React.ReactNode;
  outline?: boolean;
  amber?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition hover:-translate-y-0.5 ${outline ? "border border-[#0b969a] bg-white text-[#087e82] shadow-sm" : amber ? "bg-amber-400 text-white shadow-lg" : "bg-linear-to-r from-[#09aaa1] to-[#007d82] text-white shadow-lg"}`}
    >
      {children}
    </Link>
  );
}
function MasteryIcon({ type }: { type: "mastery" | "confidence" }) {
  if (type === "mastery")
    return (
      <svg
        viewBox="0 0 72 72"
        className="h-14.5 w-14.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="33" cy="39" r="23" />
        <circle cx="33" cy="39" r="14" />
        <circle cx="33" cy="39" r="5" />
        <path d="M37 35 55 17" />
        <path d="m48 17 9-2-2 9" />
        <path d="m52 20 6 6" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 72 72"
      className="h-14.5 w-14.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M36 8c8 6 15 8 24 10v17c0 14-9 24-24 31C21 59 12 49 12 35V18c9-2 16-4 24-10Z" />
      <path d="m25 36 8 8 15-17" />
    </svg>
  );
}
function FinePrintIcon({
  type,
}: {
  type: "price" | "cancel" | "records" | "tutor" | "tax";
}) {
  const common = "h-10 w-10";
  if (type === "price")
    return (
      <svg
        viewBox="0 0 56 56"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 28 27 9h17v17L25 45 8 28Z" />
        <circle cx="36" cy="17" r="2.5" />
      </svg>
    );
  if (type === "cancel")
    return (
      <svg
        viewBox="0 0 56 56"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="8" y="11" width="36" height="35" rx="4" />
        <path d="M17 7v9M35 7v9M8 21h36M15 29h13" />
        <circle cx="40" cy="40" r="10" fill="#eef4e9" />
        <path d="m36 40 3 3 6-7" />
      </svg>
    );
  if (type === "records")
    return (
      <svg
        viewBox="0 0 56 56"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M28 6c7 5 13 7 21 9v13c0 11-7 18-21 24C14 46 7 39 7 28V15c8-2 14-4 21-9Z" />
        <rect x="21" y="25" width="14" height="12" rx="2" />
        <path d="M24 25v-4a4 4 0 0 1 8 0v4M28 30v3" />
      </svg>
    );
  if (type === "tutor")
    return (
      <svg
        viewBox="0 0 56 56"
        className={common}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="22" cy="19" r="8" />
        <path d="M7 43c1-10 6-15 15-15s14 5 15 15" />
        <circle cx="39" cy="22" r="6" />
        <path d="M36 31c9-2 14 3 14 12" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 5h29l12 12v23" />
      <path d="M39 5v13h12M10 5v50h27" />
      <circle cx="47" cy="46" r="6" />
      <path d="m28 35 19 19M29 52l19-19" />
    </svg>
  );
}
const goalIconImages = [
  "/images/adaptive-learning/goal-icons/parent-goal.png",
  "/images/adaptive-learning/goal-icons/tutor-assignment.png",
  "/images/adaptive-learning/goal-icons/school-homework.png",
  "/images/adaptive-learning/goal-icons/curriculum-pathway.png",
  "/images/adaptive-learning/goal-icons/revision-need.png",
  "/images/adaptive-learning/goal-icons/system-recommendation.png",
] as const;
function DevelopmentIcon({ type }: { type: "sessions" | "path" | "evidence" }) {
  if (type === "sessions") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M25 7h14" />
        <path d="M28 7v8h8V7" />
        <path d="M43 16l5-5 5 5-5 5" />
        <circle cx="32" cy="37" r="19" />
        <path d="M32 24v14" />
        <circle cx="32" cy="39" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (type === "path") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="h-12 w-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 9v18" />
        <path d="M20 10c8-4 13 5 22 0v12c-9 5-14-4-22 0" />
        <path d="M19 27c-13 3-13 11 1 13 18 3 19 10 3 15" />
        <path d="M23 55c-4 1-8 1-11 0" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 55h47" />
      <path d="M14 55V42h8v13" />
      <path d="M28 55V32h8v23" />
      <path d="M42 55V20h8v35" />
      <path d="M12 34l13-12 9 5 18-18" />
      <path d="M43 9h9v9" />
    </svg>
  );
}
export default function HomePageClient() {
  return (
    <div className="adaptive-page overflow-hidden bg-white text-[#102338]">
      <section className="adaptive-learning-hero relative overflow-hidden bg-[#fffdf2] lg:min-h-215">
        <Image
          src="/images/homepage/adaptive-hero.png"
          alt="A learning path leading toward a target"
          fill
          priority
          sizes="100vw"
          className="adaptive-hero-image object-cover object-[64%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#fffdf2] via-[#fffdf2]/88 to-transparent lg:via-[#fffdf2]/20" />
        <div className="relative mx-auto min-h-215 w-full max-w-7xl px-3 pb-10 pt-14 sm:px-4 lg:px-6 lg:pt-20">
          <div className="max-w-118.75">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#e8f5ec] px-4 py-2 text-[12px] font-bold text-[#178477]">
              <GraduationCap className="h-4 w-4" /> ADAPTIVE LEARNING
            </p>
            <h1 className="mt-7 text-[42px] font-bold leading-[1.08] tracking-[-.035em] text-[#0a1239] sm:text-[52px]">
              Learning that
              <br />
              understands more
              <br />
              than right and wrong.
            </h1>
            <h2 className="adaptive-hero-accent mt-3 text-[42px] font-bold leading-[1.08] tracking-[-.03em] text-[#268b83] sm:text-[50px]">
              One clear next
              <br />
              step at a time.
            </h2>
            <div className="mt-3 h-1 w-80 max-w-full -rotate-2 rounded-full bg-[#f4a617]" />
            <p className="mt-7 max-w-107.5 text-[15px] leading-6 text-[#273148]">
              AttoLearn turns short practice sessions into structured learning
              evidence, then uses that evidence to guide what each learner
              should do next.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Btn href="/choose-module">
                Start Adaptive Learning <ArrowRight className="h-4 w-4" />
              </Btn>
              <Btn href="/papergenerator/demo" outline>
                <PlayCircle className="h-5 w-5" /> Try a Live Demo
              </Btn>
            </div>
          </div>
          <div className="mt-10 rounded-2xl bg-white/95 p-5 shadow-[0_14px_38px_rgba(44,75,67,.14)] lg:absolute lg:bottom-42.5 lg:right-0 lg:mt-0 lg:w-138.75">
            <div className="grid grid-cols-[1fr_116px] items-center">
              <div className="pr-6">
                <h3 className="text-[18px] font-bold text-[#10163b]">
                  Your Learning Path
                </h3>
                <div className="relative mt-7 grid grid-cols-4">
                  <span className="absolute left-[10%] right-[10%] top-3.5 h-1 rounded-full bg-[#e7e0d5]" />
                  <span className="absolute left-[10%] top-3.5 h-1 w-[23%] rounded-full bg-[#2a9b90]" />
                  {["Learn", "Practice", "Master", "Apply"].map((step, i) => (
                    <div key={step} className="relative z-10 text-center">
                      <span
                        className={`mx-auto grid h-7 w-7 place-items-center rounded-full ${i === 0 ? "bg-[#2a9b90] text-white" : "bg-[#ded8cf] text-transparent"}`}
                      >
                        {i === 0 && <Check className="h-4 w-4" />}
                      </span>
                      <span
                        className={`mt-3 block text-[11px] font-semibold ${i === 0 ? "text-[#218a80]" : "text-[#17162c]"}`}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid min-h-26 place-items-center border-l border-[#eadfd2] text-center">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#e8f5ef] text-[#239187]">
                  <Trophy className="h-7 w-7" />
                </span>
                <p className="mt-1 text-[12px] font-bold leading-4 text-[#17162c]">
                  Build
                  <br />
                  confidence
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 grid overflow-hidden rounded-xl bg-white/95 shadow-[0_10px_28px_rgba(44,75,67,.1)] sm:grid-cols-3 lg:absolute lg:bottom-15.5 lg:left-0 lg:mt-0 lg:w-141.25">
            {[
              [GraduationCap, "Foundation to Year 10"],
              [BookOpen, "Maths, English and Science"],
              [Clock3, "7–12 minute sessions"],
            ].map(([Icon, label], i) => (
              <div
                key={String(label)}
                className={`flex min-h-19 items-center gap-3 px-5 ${i ? "sm:border-l sm:border-[#eadfd2]" : ""}`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8f5ef] text-[#238d83]">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-[12px] font-medium leading-4 text-[#23283b]">
                  {String(label)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="adaptive-meaning-section relative overflow-hidden bg-[radial-gradient(circle_at_52%_48%,#fffef8_0%,#fffbed_68%,#fffdf7_100%)] py-20 lg:py-24">
        <div className="pointer-events-none absolute -left-24 bottom-8 h-52 w-52 rounded-full border border-amber-200/40" />
        <div className="pointer-events-none absolute -right-8 bottom-8 h-36 w-44 opacity-35 bg-[radial-gradient(#148f8b_1.5px,transparent_1.5px)] bg-size-[13px_13px]" />
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-3 sm:px-4 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-6">
          <div className="max-w-113.75">
            <p className="inline-flex items-center gap-3 rounded-full border border-[#248c86] px-4 py-2 text-[12px] font-bold tracking-[.04em] text-[#197c76]">
              <span className="h-2 w-2 rounded-full bg-[#f5ac16]" /> ADAPTIVE
              LEARNING
            </p>
            <h2 className="mt-7 text-[34px] font-extrabold leading-[1.12] tracking-[-.03em] text-[#102337] sm:text-[42px]">
              What Adaptive Learning
              <br />
              means in AttoLearn
            </h2>
            <span className="mt-5 block h-1.5 w-14 rounded-full bg-[#f4a617]" />
            <p className="mt-7 text-[15px] leading-7 text-[#56606c]">
              AttoLearn does not simply make questions harder or easier. It
              looks at what a learner attempted, what support they used, what
              they appear to understand, what they may have forgotten and what
              evidence is still missing.
            </p>
            <p className="mt-5 text-[15px] leading-7 text-[#56606c]">
              That picture is then converted into one manageable next step.
            </p>
            <div className="mt-7">
              <Btn href="/why-attolearn">
                See Our Learning Philosophy <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
          </div>
          <div className="relative rounded-2xl border border-[#eee3d4] bg-white/75 p-5 pt-7 shadow-[0_14px_38px_rgba(59,73,61,.08)] sm:p-6 sm:pt-8">
            <span className="absolute -top-4 right-6 rounded-full bg-[#f5a914] px-5 py-2 text-[11px] font-extrabold tracking-[.05em] text-white">
              LIVE LEARNING VIEW
            </span>
            <div className="flex flex-col gap-5 rounded-xl bg-linear-to-r from-[#176d70] to-[#238e87] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#fffdf2] text-[#278e87]">
                  <Target className="h-8 w-8" />
                </span>
                <div>
                  <h3 className="text-[18px] font-extrabold text-white">
                    Today&apos;s Best Step
                  </h3>
                  <p className="mt-1 text-[13px] font-medium text-white/90">
                    Fractions: compare and order
                  </p>
                </div>
              </div>
              <Link
                href="/choose-module"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#f8ad17] px-6 text-[13px] font-extrabold text-white shadow-sm"
              >
                Start My Step
              </Link>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                [Clock3, "8 minutes", "Focused practice session"],
                [BookOpen, "3 skills", "Current goal coverage"],
                [Flag, "1 next step", "Clear and manageable"],
              ].map(([Icon, title, copy]) => (
                <div
                  key={String(title)}
                  className="flex min-h-27.5 items-start gap-3 rounded-xl border border-[#eee3d4] bg-[#fffefa] p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f1f3e9] text-[#208d87]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h4 className="text-[14px] font-extrabold text-[#15263a]">
                      {String(title)}
                    </h4>
                    <p className="mt-1 text-[12px] leading-5 text-[#5d6470]">
                      {String(copy)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-[#eee9df]">
              <span className="w-[53%] bg-[#237f7c]" />
              <span className="w-[17%] bg-[#f8b10f]" />
            </div>
          </div>
        </div>
      </section>
      <section className="learning-development-section bg-[radial-gradient(circle_at_50%_42%,#fffef8_0%,#fffbed_70%,#fffdf7_100%)] py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <h2 className="text-[32px] font-extrabold leading-tight tracking-[-.025em] text-[#123746] sm:text-[40px]">
              Built around how learning actually develops
            </h2>
            <span className="mx-auto mt-4 block h-1 w-11 rounded-full bg-[#f2aa17]" />
            <p className="mx-auto mt-5 max-w-3xl text-[16px] leading-7 text-[#5d6570]">
              Each part of the experience is designed to keep practice focused,
              useful and explainable.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              [
                "sessions",
                "Short learning sessions",
                "Focused 7–12 minute sessions are easier to start and easier to sustain.",
              ],
              [
                "path",
                "One clear next step",
                "The learner sees one manageable action instead of a long list of tasks.",
              ],
              [
                "evidence",
                "Evidence over time",
                "Practice contributes to a broader picture of understanding, retention and independence.",
              ],
            ].map(([type, title, copy]) => (
              <article
                key={String(title)}
                className="learning-development-card relative flex min-h-57.5 overflow-hidden rounded-xl border border-[#f0e8dc] bg-[#fffef8]/95 px-7 py-8 shadow-[0_12px_28px_rgba(77,64,42,.08)]"
              >
                <span className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#e8eee2]/75" />
                <span className="absolute bottom-5 right-5 h-14 w-14 opacity-35 bg-[radial-gradient(#23938d_1.5px,transparent_1.5px)] bg-size-[12px_12px]" />
                <div className="relative z-10 flex items-start gap-6">
                  <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#f0f3e9] text-[#167d7b]">
                    <DevelopmentIcon
                      type={type as "sessions" | "path" | "evidence"}
                    />
                  </span>
                  <div className="pt-3">
                    <h3 className="text-[20px] font-extrabold leading-6 text-[#146b6d]">
                      {String(title)}
                    </h3>
                    <p className="mt-4 text-[15px] leading-7 text-[#5b6068]">
                      {String(copy)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-3 py-20 sm:px-4 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-6">
        <div className="relative aspect-video">
          <Image
            src="/images/adaptive-learning/todays-best-step-generated.png"
            alt="Learner completing a selected fractions activity"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            quality={100}
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="text-4xl leading-tight">
            One useful action,
            <br />
            <span className="text-teal-700">
              not an overwhelming dashboard.
            </span>
          </h2>
          <p className="mt-7 text-[15px] leading-7 text-slate-600">
            Today&apos;s Best Step turns a broader learning goal into something
            the learner can start immediately. Where possible, it balances
            curriculum priorities, deadlines, confidence recovery and what the
            evidence suggests should come next.
          </p>
        </div>
      </section>
      <section className="learning-goals-section bg-[radial-gradient(circle_at_50%_42%,#fffef8_0%,#fffbed_70%,#fffdf7_100%)] py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <h2 className="text-[32px] font-extrabold leading-tight tracking-[-.025em] text-[#0e2136] sm:text-[40px]">
              Learning goals can come from different people
            </h2>
            <p className="mx-auto mt-4 max-w-165 text-[16px] leading-7 text-[#606570]">
              AttoLearn keeps the learner&apos;s experience simple while
              <br className="hidden sm:block" /> respecting the roles of
              parents, tutors and schools.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {goals.map(([, title, copy], i) => {
              return (
                <article
                  key={title}
                  className="learning-goal-card flex min-h-39.5 items-center gap-6 rounded-xl border border-[#efe7da] bg-[#fffef8]/95 px-7 py-6 shadow-[0_10px_26px_rgba(77,64,42,.07)]"
                >
                  <span className="relative h-20.5 w-20.5 shrink-0">
                    <Image
                      src={goalIconImages[i]}
                      alt=""
                      aria-hidden
                      fill
                      sizes="82px"
                      className="object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-extrabold leading-6 text-[#11172b]">
                      {title}
                    </h3>
                    <span className="mt-3 block h-0.75 w-10 rounded-full bg-[#228b86]" />
                    <p className="mt-4 text-[14px] leading-6 text-[#60636d]">
                      {copy}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_15%,#278984_0%,#0b6d69_48%,#075b5c_100%)] py-9 text-white sm:py-10 lg:py-12">
        <div
          aria-hidden="true"
          className="absolute -left-10 top-7 h-48 w-24 opacity-20 bg-[radial-gradient(circle,#9de1d4_2px,transparent_2px)] bg-size-[17px_17px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-8 bottom-10 h-48 w-24 opacity-20 bg-[radial-gradient(circle,#9de1d4_2px,transparent_2px)] bg-size-[17px_17px]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-3 text-center sm:px-4 lg:px-6">
          <h2 className="mx-auto max-w-4xl text-[34px] font-extrabold leading-[1.18] text-[#fffbed] sm:text-[42px] lg:text-[46px]">
            Practice produces evidence.
            <br />
            Evidence shapes the next step.
          </h2>
          <div
            className="mx-auto mt-3 flex items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span className="h-px w-14 bg-[#73c9bd]" />
            <span className="h-2 w-2 rounded-full bg-[#73c9bd]" />
            <span className="h-px w-14 bg-[#73c9bd]" />
          </div>
          <p className="mt-3 text-[17px] font-medium text-[#fffbed]">
            Adaptation is broader than simply changing difficulty.
          </p>
          <div className="mt-6 grid gap-4 sm:mt-6 md:grid-cols-2 lg:grid-cols-4">
            {evidence.map(([, t, c], index) => (
              <article
                key={t}
                className="flex min-h-61 flex-col items-center rounded-[18px] border border-white/20 bg-white/[0.035] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:min-h-62.5"
              >
                <span className="relative block h-20.5 w-20.5 shrink-0 overflow-hidden rounded-full bg-[#69c8bd]/45">
                  <Image
                    src={evidenceIconImages[index]}
                    alt=""
                    fill
                    sizes="82px"
                    className="rounded-full object-cover"
                  />
                </span>
                <span
                  className="mt-2 block h-0.75 w-10 rounded-full bg-[#8fd6c9]"
                  aria-hidden="true"
                />
                <h3 className="mt-3 text-[18px] font-bold text-[#fffbed]">
                  {t}
                </h3>
                <p className="mt-2 max-w-56.25 text-[15px] leading-6 text-[#fffbed]/90">
                  {c}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#fffdf5] py-14 sm:py-16">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="mx-auto text-center">
            <h2 className="text-3xl leading-tight text-[#082d3b] md:text-4xl lg:whitespace-nowrap">
              Mastery and evidence confidence are kept separate
            </h2>
            <div
              className="mx-auto mt-4 flex items-center justify-center gap-2"
              aria-hidden="true"
            >
              <span className="h-px w-10 bg-[#73c9bd]" />
              <span className="h-2 w-2 rounded-full bg-[#36a79e]" />
              <span className="h-px w-10 bg-[#73c9bd]" />
            </div>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              AttoLearn distinguishes the current learning picture from the
              strength of the evidence behind it.
            </p>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {[
              [
                "mastery",
                "Mastery",
                "What the learner currently appears to know or be able to do for a specific skill.",
              ],
              [
                "confidence",
                "Evidence Confidence",
                "How much reliable evidence supports that learning picture right now.",
              ],
            ].map(([type, title, copy]) => (
              <article
                key={title}
                className="flex min-h-41 items-center rounded-2xl border border-[#f3ead7] bg-[#fffef9] px-7 py-6 shadow-[0_10px_24px_rgba(105,75,26,0.07)] sm:px-9"
              >
                <span className="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-[#f1f4e9] text-[#147d7c]">
                  <MasteryIcon type={type as "mastery" | "confidence"} />
                </span>
                <span
                  className="mx-8 h-26 w-px shrink-0 bg-[#73c9bd] sm:mx-9"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-[21px] font-bold text-[#075965]">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-97.5 text-[15px] leading-7 text-[#414756]">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex min-h-18 items-center gap-5 rounded-[14px] border border-[#f8c64d] bg-[#fffaf0] px-6 py-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#ffb20c] text-[25px] font-extrabold leading-none text-white">
              !
            </span>
            <p className="text-[15px] text-[#2f3035]">
              <b className="text-[18px] text-[#202329]">
                Missing evidence is not failure.
              </b>
              <span className="ml-3">
                “Not yet observed” is different from “not achieved.”
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-[#fffdf5] py-14 sm:py-16 lg:py-20">
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-amber-100 opacity-60"
        />
        <div className="relative mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="mx-auto text-center">
            <h2 className="text-3xl leading-tight text-[#083d46] md:text-4xl lg:whitespace-nowrap">
              Safe, governed and explainable adaptation
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#50505d]">
              AI and decision logic operate inside defined product, content and
              permission controls.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {safety.map(([, title, copy], index) => (
              <article
                key={title}
                className="relative flex min-h-74 flex-col items-center rounded-[15px] border border-[#f4eddf] bg-[#fffef9] px-6 pb-7 pt-8 text-center shadow-[0_12px_26px_rgba(91,66,28,0.07)]"
              >
                <span
                  className="absolute left-7 top-0 h-1 w-12 -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: safetyAccents[index] }}
                  aria-hidden="true"
                />
                <span className="relative block h-26 w-26 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={safetyIconImages[index]}
                    alt=""
                    fill
                    sizes="104px"
                    className="rounded-full object-cover"
                  />
                </span>
                <h3
                  className="mt-5 text-[17px] font-bold"
                  style={{ color: safetyTitleColors[index] }}
                >
                  {title}
                </h3>
                <p className="mt-3 max-w-57.5 text-[14px] leading-6 text-[#50505d]">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#fffdf5] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="mx-auto text-center">
            <h2 className="text-3xl leading-tight text-[#083d46] md:text-4xl">
              Different views for different roles
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#50505d]">
              Each person sees the information appropriate to their role and
              permission level.
            </p>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map(([, title, items], index) => (
              <article
                key={title}
                className="relative min-h-65 overflow-hidden rounded-[15px] border border-[#f4eddf] bg-[#fffef9] px-6 py-6 shadow-[0_12px_26px_rgba(91,66,28,0.07)]"
              >
                <div className="relative z-10 flex items-center gap-5">
                  <span className="relative block h-19.5 w-19.5 shrink-0 overflow-hidden rounded-[15px]">
                    <Image
                      src={roleIconImages[index]}
                      alt=""
                      fill
                      sizes="78px"
                      className="object-cover"
                    />
                  </span>
                  <div>
                    <h3
                      className="text-[18px] font-bold"
                      style={{ color: roleColors[index] }}
                    >
                      {title}
                    </h3>
                    <span
                      className="mt-3 block h-0.5 w-9"
                      style={{ backgroundColor: roleColors[index] }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <ul className="relative z-10 mt-5 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[14px] leading-5 text-[#50505d]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#08715f]"
                        strokeWidth={3}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span
                  className="absolute -bottom-12 -right-10 h-32 w-32 rounded-full opacity-10"
                  style={{ backgroundColor: roleColors[index] }}
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-4 right-4 h-12 w-12 opacity-65 bg-[radial-gradient(circle,currentColor_1.4px,transparent_1.4px)] bg-size-[10px_10px]"
                  style={{ color: roleDotColors[index] }}
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="adaptive-learning-cta relative h-93.75 overflow-hidden bg-[#174f52] text-white">
        {/* Background Image */}
        <Image
          src="/images/adaptive-learning/adaptive-learning-cta-v3.png"
          alt="A mother and child exploring adaptive learning together"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[67%_center]"
        />

        {/* Teal Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#174f52]/95 via-[#174f52]/72 to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-340 items-center px-6 sm:px-8 lg:px-10">
          <div className="w-full text-center lg:max-w-250">
            {/* Heading */}
            <h2
              className="
          text-[32px]
          font-bold
          leading-[1.12]
          tracking-[-0.025em]
          text-[#fffbed]
          sm:text-[38px]
          lg:text-[46px]
        "
            >
              See Adaptive Learning in action
            </h2>

            {/* Paragraph */}
            <p
              className="
          mx-auto
          mt-6
          max-w-167.5
          text-[17px]
          font-medium
          leading-[1.55]
          text-[#fffbed]
          sm:text-[18px]
          lg:text-[19px]
        "
            >
              Start free, explore the learning philosophy,
              <br className="hidden sm:block" />
              or try a safe demonstration environment.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap lg:flex-nowrap">
              <Link
                href="/choose-module"
                className="
            inline-flex
            h-12.5
            min-w-53.5
            items-center
            justify-center
            rounded-md
            bg-[#ffad12]
            px-7
            text-[14px]
            font-bold
            text-white
            shadow-[0_8px_20px_rgba(0,0,0,0.18)]
            transition
            duration-200
            hover:-translate-y-0.5
            hover:bg-[#f5a400]
          "
              >
                Start Adaptive Learning
              </Link>

              <Link
                href="/papergenerator/demo"
                className="
            inline-flex
            h-12.5
            min-w-48
            items-center
            justify-center
            gap-3
            rounded-md
            border
            border-[#e5eadf]
            bg-[#fffdf3]
            px-7
            text-[14px]
            font-bold
            text-[#075f66]
            shadow-[0_8px_20px_rgba(0,0,0,0.14)]
            transition
            duration-200
            hover:-translate-y-0.5
            hover:bg-white
          "
              >
                <CalendarClock className="h-5 w-5" />
                Try a Live Demo
              </Link>

              <Link
                href="/why-attolearn"
                className="
            inline-flex
            h-12.5
            min-w-67.5
            items-center
            justify-center
            gap-3
            rounded-md
            border
            border-[#e5eadf]
            bg-[#fffdf3]
            px-7
            text-[14px]
            font-bold
            text-[#075f66]
            shadow-[0_8px_20px_rgba(0,0,0,0.14)]
            transition
            duration-200
            hover:-translate-y-0.5
            hover:bg-white
          "
              >
                <ClipboardCheck className="h-5 w-5" />
                See the Learning Philosophy
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#fffdf5] py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#ef7900]">
              The small print, said plainly
            </p>
            <h2 className="mt-2 text-[#075965]">
              Things worth knowing before you pay
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "price",
                "Prices are local",
                "Each market is priced in its own currency, not converted from US dollars.",
              ],
              [
                "cancel",
                "Cancel any time",
                "Monthly plans stop at the end of the period you’ve paid for.",
              ],
              [
                "records",
                "Your records stay yours",
                "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
              ],
              [
                "tutor",
                "One invited tutor is free",
                "A tutor or parent invite is included — the tutor is never billed for that family.",
              ],
            ].map(([type, title, copy]) => (
              <article
                key={title}
                className="flex min-h-53.5 flex-col items-center rounded-[14px] border border-[#efe6d5] bg-[#fffef9] px-6 py-5 text-center shadow-[0_8px_20px_rgba(93,68,32,0.06)]"
              >
                <span className="grid h-18 w-18 place-items-center rounded-full bg-[#f0f3e7] text-[#176e72]">
                  <FinePrintIcon
                    type={type as "price" | "cancel" | "records" | "tutor"}
                  />
                </span>
                <h3 className="mt-4 text-[15px] font-bold text-[#075965]">
                  {title}
                </h3>
                <p className="mt-2 max-w-57.5 text-[13px] leading-[1.65] text-[#4d4b58]">
                  {copy}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex min-h-28.5 items-center gap-7 rounded-[14px] border border-dashed border-[#f2a019] bg-[#fffaf0] px-8 py-5">
            <span className="shrink-0 text-[#ef8700]">
              <FinePrintIcon type="tax" />
            </span>
            <div>
              <h3 className="text-[17px] font-bold text-[#075965]">On tax</h3>
              <p className="mt-1 text-[13px] leading-5 text-[#494a52]">
                Whether the figures shown include GST or VAT determines the
                final amount you pay,
                <br className="hidden md:block" /> and consumer price display
                rules differ by market.
              </p>
              <p className="mt-1 text-[12px] font-extrabold uppercase tracking-[0.02em] text-[#ef7900]">
                Tax-inclusive vs tax-exclusive display to be confirmed per
                market before these prices go live
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="adaptive-final-cta relative h-111.5 overflow-hidden bg-[#164f50] text-white">
        <Image
          src="/images/adaptive-learning/start-free-cta.png"
          alt="A science learning activity displayed on a tablet"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#145556]/70" />
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 pb-3 text-center">
          <h2 className="text-[#fffbed]">Start free, decide later</h2>
          <p className="mt-4 text-[#fffbed]">
            See the value for yourself. No credit card required.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/choose-module"
              className="inline-flex h-13.5 min-w-40.5 items-center justify-center rounded-[7px] bg-[#ffad12] px-7 text-[17px] font-bold text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Start Free
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-13.5 min-w-43.5 items-center justify-center rounded-[7px] border-2 border-[#fffbed] bg-[#145556]/35 px-7 text-[17px] font-bold text-[#fffbed] transition hover:-translate-y-0.5"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
