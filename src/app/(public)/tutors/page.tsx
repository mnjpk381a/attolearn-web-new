"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  Lightbulb,
  Target,
  Trophy,
} from "lucide-react";

const workspaceCards = [
  [
    "/images/tutors/workspace-icons/assigned-learners.png",
    "Assigned learners",
    "Every learner you support, in one list, with their current focus.",
  ],
  [
    "/images/tutors/workspace-icons/parent-approved-access.png",
    "Parent-approved access",
    "A parent invites or approves you. You never add a child yourself.",
  ],
  [
    "/images/tutors/workspace-icons/scoped-visibility.png",
    "Scoped visibility",
    "You see the subjects and evidence the parent has agreed to share.",
  ],
  [
    "/images/tutors/workspace-icons/revocable-permissions.png",
    "Revocable permissions",
    "Access can be narrowed or withdrawn by the parent at any time.",
  ],
  [
    "/images/tutors/workspace-icons/audit-trail.png",
    "Audit trail",
    "What was assigned, viewed and changed is recorded \u2014 protection for both sides.",
  ],
  [
    "/images/tutors/workspace-icons/your-own-view.png",
    "Your own view",
    "Built for teaching decisions, not a cut-down version of the parent dashboard.",
  ],
  [
    "/images/tutors/workspace-icons/assign-work-directly.png",
    "Assign work directly",
    "Goals, practice and assessments, without going through the parent.",
  ],
  [
    "/images/tutors/workspace-icons/multiple-families.png",
    "Multiple families",
    "Learners from different families, kept properly separate.",
  ],
] as const;

const evidenceRows = [
  [
    "Weakest dimension",
    "Transfer \u2014 struggles once the wording changes",
    "/images/tutors/learner-needs/weakest-dimension.png",
    "Weak",
    "bg-[#ffe0dc] text-[#d54d45]",
  ],
  [
    "Support use",
    "Correct, but usually after a hint",
    "/images/tutors/learner-needs/support-use.png",
    "High",
    "bg-[#ffedbf] text-[#ca8500]",
  ],
  [
    "Missed prerequisite",
    "Equivalent fractions, Year 5",
    "/images/tutors/learner-needs/missed-prerequisite.png",
    "Missing",
    "bg-[#dcebea] text-[#176f72]",
  ],
  [
    "Due for recheck",
    "Order of operations \u2014 3 weeks since last seen",
    "/images/tutors/learner-needs/due-recheck.png",
    "Due",
    "bg-[#f1dff3] text-[#8e4da0]",
  ],
] as const;

const insightBullets = [
  "Which evidence dimensions are weak for a skill",
  "Likely misconceptions behind repeated errors",
  "How much support is being used to get to correct",
  "Missed prerequisites further back in the sequence",
  "Skills due to be rechecked for retention",
  "Performance that is inconsistent rather than settled",
];

function TickList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#00777d]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function EvidenceCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e6e6dc] bg-[#fffef8] shadow-[0_12px_36px_rgba(34,67,60,.08)]">
      <div className="flex items-center justify-between bg-[#075e65] px-6 py-4 text-white">
        <h3 className="font-bold">Amara, Year 7 &mdash; Mathematics</h3>
        <Target className="h-5 w-5" />
      </div>
      {evidenceRows.map(([title, copy, image, badge, badgeClass]) => (
        <div
          key={title}
          className="grid grid-cols-[52px_1fr_auto_18px] items-center gap-3 border-b border-[#ece9df] px-5 py-4 last:border-0"
        >
          <span className="relative h-11 w-11">
            <Image
              src={image}
              alt=""
              fill
              sizes="44px"
              className="object-contain"
            />
          </span>
          <div>
            <h3 className="text-sm font-bold text-[#075e65]">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">{copy}</p>
          </div>
          <span
            className={`rounded-md px-3 py-1 text-[10px] font-bold ${badgeClass}`}
          >
            {badge}
          </span>
          <ArrowRight className="h-4 w-4 text-[#075e65]" />
        </div>
      ))}
    </div>
  );
}

export default function TutorsPage() {
  return (
    <div className="tutors-page overflow-hidden bg-[#fffef9] text-slate-800">
      <section className="relative overflow-hidden bg-[#fffdf4] lg:min-h-[500px]">
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/images/tutors/generated/tutor-hero-clean-v4.png"
            alt="Tutor using learner evidence to prepare the next lesson"
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#fffdf4_0%,#fffdf4_31%,rgba(255,253,244,.82)_39%,transparent_57%)]" />
        </div>
        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-5 py-10 sm:px-8 lg:px-10">
          <div className="relative z-10 max-w-[500px]">
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-[#07858b] before:h-px before:w-10 before:bg-[#07858b]">
              For Tutors
            </p>
            <h1 className="tutors-hero-title mt-4 text-[clamp(2.25rem,3.3vw,3rem)] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#09233f]">
              Teach with
              <br />
              clearer evidence
            </h1>
            <p className="mt-4 text-base font-semibold leading-snug text-[#07858b]">
              See what learners understand.
              <br />
              Know what to do next.
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-5 text-slate-700">
              Walk into the session already knowing what the learner
              understands, what they don&apos;t, and what to do next &mdash;
              instead of spending the first twenty minutes finding out.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row [&_a]:whitespace-nowrap">
              <Link
                href="https://portal.attolearn.com/auth/login"
                className="inline-flex h-11 items-center justify-center gap-3 rounded-md bg-[#ff9f0a] px-6 text-sm font-bold text-white shadow-md"
              >
                Join as a Tutor <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#workspace"
                className="inline-flex h-11 items-center justify-center gap-3 rounded-md border border-[#07858b] bg-white/90 px-6 text-sm font-bold text-[#076a72]"
              >
                Explore Tutor Workspace <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="hero-evidence-cards pointer-events-none absolute inset-0 hidden lg:block">
            <div className="absolute left-[48%] top-6 w-44 rounded-xl border border-[#dbe9e7] bg-white/95 p-3 shadow-[0_10px_28px_rgba(6,83,88,.16)] ">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#dff4f2] text-[#087a80]">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-[#075c61]">
                    Student Profile
                  </p>
                  <p className="text-[9px] text-slate-500">Emma · Year 6</p>
                </div>
              </div>
              <div className="mt-3 space-y-1.5 text-[8px] text-slate-500">
                <div className="flex justify-between">
                  <span>Subject</span>
                  <b className="text-slate-700">Maths</b>
                </div>
                <div className="flex justify-between">
                  <span>Learning goal</span>
                  <b className="text-slate-700">Problem solving</b>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <span className="block h-full w-[72%] bg-[#27aaa6]" />
              </div>
            </div>

            <div className="absolute right-[5%] top-7 w-44 rounded-xl border border-[#eadfcb] bg-white/95 p-3 shadow-[0_10px_28px_rgba(82,62,15,.14)]">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#dff4f2] text-[#087a80]">
                  <Trophy className="h-5 w-5" />
                </span>
                <p className="text-[10px] font-bold text-[#075c61]">
                  Strengths &amp; needs
                </p>
              </div>
              <div className="mt-3 space-y-2 text-[8px]">
                <p className="font-semibold text-slate-600">Strengths</p>
                {["Algebraic expressions", "Fractions", "Problem solving"].map(
                  (item) => (
                    <p
                      key={item}
                      className="flex items-center gap-1.5 text-slate-600"
                    >
                      <CheckCircle2 className="h-3 w-3 fill-[#55b875] text-white" />
                      {item}
                    </p>
                  ),
                )}
                <p className="pt-1 font-semibold text-[#d47d00]">Needs Focus</p>
                <p className="text-slate-600">Word problems</p>
              </div>
            </div>

            <div className="absolute bottom-16 left-[41%] w-48 rounded-xl border border-[#dbe9e7] bg-white/95 p-3 shadow-[0_10px_28px_rgba(6,83,88,.16)]">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e7f5ef] text-[#087a80]">
                  <BarChart3 className="h-5 w-5" />
                </span>
                <p className="text-[10px] font-bold text-[#075c61]">
                  Progress Overview
                </p>
              </div>
              <svg
                viewBox="0 0 160 58"
                className="mt-2 h-14 w-full"
                aria-hidden="true"
              >
                <path
                  d="M4 52H156M4 6V52"
                  fill="none"
                  stroke="#d8e5e5"
                  strokeWidth="1"
                />
                <polyline
                  points="8,44 30,36 52,30 75,32 98,23 122,20 150,9"
                  fill="none"
                  stroke="#299f9d"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="8,51 30,45 52,39 75,34 98,31 122,24 150,17"
                  fill="none"
                  stroke="#f1a20b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {[
                  "8,44",
                  "30,36",
                  "52,30",
                  "75,32",
                  "98,23",
                  "122,20",
                  "150,9",
                ].map((point) => {
                  const [cx, cy] = point.split(",");
                  return (
                    <circle
                      key={point}
                      cx={cx}
                      cy={cy}
                      r="2.5"
                      fill="#299f9d"
                    />
                  );
                })}
              </svg>
              <div className="mt-3 flex justify-between">
                <div>
                  <b className="text-lg text-[#087a80]">72%</b>
                  <p className="text-[8px] text-slate-500">Overall Mastery</p>
                </div>
                <div>
                  <b className="text-lg text-[#087a80]">+16%</b>
                  <p className="text-[8px] text-slate-500">Improvement</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 right-[6%] w-44 rounded-xl border border-[#eadfcb] bg-white/95 p-3 shadow-[0_10px_28px_rgba(82,62,15,.14)]">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#fff0cf] text-[#ed9b08]">
                  <Lightbulb className="h-5 w-5" />
                </span>
                <p className="text-[10px] font-bold text-[#075c61]">
                  Next Suggested Focus
                </p>
              </div>
              <div className="mt-3 rounded-lg bg-[#fffaf0] p-2">
                <p className="text-[9px] font-semibold text-slate-700">
                  Equivalent fractions
                </p>
                <p className="mt-1 text-[8px] text-slate-500">
                  Guided practice · word problems
                </p>
              </div>
              <p className="mt-2 text-[8px] font-semibold text-[#0b9294]">
                View resources →
              </p>
            </div>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full lg:hidden">
          <Image
            src="/images/tutors/generated/tutor-hero-clean-v4.png"
            alt=""
            fill
            sizes="100vw"
            className="object-contain object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-11 bg-[linear-gradient(155deg,transparent_48%,#dff5f4_49%,#bcebee_72%,#fff_73%)]" />
      </section>

      <section
        id="workspace"
        className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 lg:px-10 lg:py-20"
      >
        <p className="text-xs font-bold uppercase tracking-[.1em] text-[#f19a0a]">
          Tutor Workspace
        </p>

        <h2 className="mt-3 text-3xl leading-tight text-[#075e65]">
          A professional workspace, not a parent login
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
          Your own account, your own learners, and access that a parent grants
          and can take back.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workspaceCards.map(([image, title, copy]) => (
            <article
              key={title}
              className="flex min-h-40 items-start gap-4 rounded-xl border border-[#e8e4d9] bg-[#fffef9] px-5 py-5 text-left shadow-[0_7px_20px_rgba(40,76,72,.05)]"
            >
              <span className="relative h-16 w-16 shrink-0">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </span>
              <div className="pt-1">
                <h3 className="text-sm font-bold text-[#075e65]">{title}</h3>
                <span className="mt-2 block h-0.5 w-8 bg-[#efa817]" />
                <p className="mt-3 text-xs leading-5 text-slate-600">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_50%_45%,#fffef8_0%,#fffbed_70%,#fffdf7_100%)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#ef9707]">
              Understand learner needs
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#075e65]">
              See where the learning is
              <br className="hidden sm:block" /> actually thin
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Not a percentage. The specific things that tell you what to teach:
              which dimension is weak, which prerequisite was never secured,
              where the answers only come with help.
            </p>
            <TickList items={insightBullets} />
          </div>
          <EvidenceCard />
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">
          <div className="grid items-center gap-7 overflow-hidden rounded-2xl border-2 border-[#f3a029] bg-[radial-gradient(circle_at_78%_40%,#fff7e6_0%,#fffaf0_55%,#fff4df_100%)] p-6 sm:p-8 lg:grid-cols-[280px_1fr] lg:p-10">
            <span className="relative mx-auto block h-60 w-60 lg:h-64 lg:w-64">
              <Image
                src="/images/tutors/learner-needs/permission-model.png"
                alt="Permission model"
                fill
                sizes="256px"
                className="object-contain"
              />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold leading-tight text-[#075e65] sm:text-3xl">
                What tutors can see is set by the permission model
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
                The exact evidence a tutor can view &mdash; and how much detail
                sits behind each item &mdash; depends on the final tutor
                permission and consent model. This page describes the intended
                workspace, not a confirmed field-by-field visibility list.
              </p>
              <p className="mt-6 max-w-2xl text-sm font-bold uppercase leading-7 text-[#f06f22]">
                Tutor visibility scope to be confirmed against the final
                permission model before publishing as live
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_50%_45%,#fffef8_0%,#fffbed_70%,#fffdf7_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#f19a0a]">
              Assign targeted work
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#075e65]">
              Set the work, then see whether it landed
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Everything you assign feeds the same evidence picture, so the next
              session starts from what actually happened rather than what you
              hoped happened.
            </p>
            <TickList
              items={[
                "Set goals for the learners you support",
                "Assign practice between sessions",
                "Set revision tasks for skills at risk of fading",
                "Build assessment papers and online tests",
                "See what was completed, and what it showed",
              ]}
            />
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#e7ded0] shadow-[0_16px_36px_rgba(48,63,54,.12)] sm:aspect-[16/9]">
            <Image
              src="/images/tutors/generated/assigned-work-reference.png"
              alt="Tablet showing an assigned fractions activity and learner progress"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#eee9dc] bg-[radial-gradient(circle_at_50%_45%,#fffef8_0%,#fffbed_70%,#fffdf7_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.25fr_.75fr] lg:items-center lg:px-10 lg:py-20">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#e5d9c6] shadow-[0_16px_38px_rgba(51,43,30,.13)] sm:aspect-[16/9]">
            <Image
              src="/images/tutors/generated/session-preparation-reference.png"
              alt="Tutor reviewing learner diagnostic evidence before a session"
              fill
              sizes="(min-width:1024px) 62vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#ef9707]">
              Prepare before the session
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#075e65]">
              Stop paying for
              <br className="hidden sm:block" /> cold-start diagnosis
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600">
              The first part of a session is usually spent working out where the
              learner is. The time is billed to the parent and produces no
              teaching. Evidence gathered between sessions gives it back.
            </p>
            <TickList
              items={[
                "Know the current sticking point before you arrive",
                "See what the learner did since you last met",
                "Spot the prerequisite gap instead of guessing at it",
                "Show parents evidence, not impressions",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#fffef9]">
        <div className="mx-auto max-w-7xl px-3 py-16 sm:px-4 lg:px-6 lg:py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#f19a0a]">
              Paper Generator for Tutors
            </p>
            <h2 className="mt-1 text-3xl font-semibold leading-tight text-[#00666c] sm:text-4xl">
              Assessment built for how tutors actually work
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Curriculum-based papers for checking, diagnosing and reviewing
              &mdash; printable or online.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "/images/tutors/paper-generator-icons/topic-tests.png",
                "Topic tests",
                "A focused check on one topic you've just taught.",
              ],
              [
                "/images/tutors/paper-generator-icons/diagnostic-papers.png",
                "Diagnostic papers",
                "Find out where a new learner actually is, in one sitting.",
              ],
              [
                "/images/tutors/paper-generator-icons/homework.png",
                "Homework",
                "Set work between sessions and see the results.",
              ],
              [
                "/images/tutors/paper-generator-icons/progress-review.png",
                "Progress review",
                "A periodic check you can walk a parent through.",
              ],
              [
                "/images/tutors/paper-generator-icons/print-online.png",
                "Print or online",
                "Print for the table, or set it as an online test.",
              ],
              [
                "/images/tutors/paper-generator-icons/keep-records.png",
                "Keep the records",
                "Results stay attached to the learner's evidence.",
              ],
            ].map(([icon, title, copy]) => (
              <article
                key={title}
                className="flex min-h-32 items-center gap-5 rounded-xl border border-[#eee5d8] bg-[#fffef9] px-5 py-5 shadow-[0_8px_25px_rgba(59,45,12,0.04)] transition-shadow hover:shadow-sm"
              >
                <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={icon}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#075c61]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fffef9] pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 rounded-xl border border-dashed border-[#e8a21a] bg-[#fff9ee] p-5 sm:flex-row sm:items-center">
            <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/tutors/paper-generator-icons/combined-chapter.png"
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-[#00666c]">
                Combined-chapter assessments
              </h2>
              <p className="mt-1 text-xs text-slate-600">
                Building a single paper that spans several chapters or topics at
                once.
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase leading-4 text-[#ce8200]">
                Feature availability for tutor accounts to be confirmed with
                engineering before publishing as live
              </p>
            </div>
            <Link
              href="/papergenerator"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-md bg-[#087078] px-8 text-sm font-semibold text-white transition hover:bg-[#006c72]"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#f19a0a]">
              The Parent Relationship
            </p>
            <h2 className="mt-1 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#00666c] sm:text-4xl">
              You support the learner, with
              <br className="hidden sm:block" /> permission
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Tutors support the learner with permission. They do not own the
              family relationship. That boundary is deliberate, and it protects
              you as much as the family &mdash; everything you do is on the
              record, within a scope the parent agreed to.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "The parent grants access, and can withdraw it",
                "Your view is limited to what was agreed",
                "Actions are logged, so your work is visible and defensible",
                "Tutors are a partner channel, never a replacement for the parent",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-800"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-[#07858b] text-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#d8e3e5] bg-[#f9fcfc] p-5 shadow-[0_14px_35px_rgba(0,80,85,0.10)] sm:p-6">
            <h3 className="rounded-lg bg-[#07858b] px-5 py-4 text-sm font-semibold text-white">
              Where you sit
            </h3>
            <div className="mt-4 space-y-3">
              {[
                [
                  "/images/tutors/parent-relationship-icons/parent-owns.png",
                  "The parent owns",
                  "The account, the consent, the child's profile",
                ],
                [
                  "/images/tutors/parent-relationship-icons/you-hold.png",
                  "You hold",
                  "Scoped access to the learner you support",
                ],
                [
                  "/images/tutors/parent-relationship-icons/you-can.png",
                  "You can",
                  "Set goals, assign work, review evidence",
                ],
                [
                  "/images/tutors/parent-relationship-icons/you-cannot.png",
                  "You cannot",
                  "Add a child, change consent, see other subjects",
                ],
              ].map(([icon, title, copy]) => (
                <div
                  key={title}
                  className="flex items-center gap-4 rounded-lg border border-[#ece4d8] bg-[#fffef9] px-4 py-3"
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={icon}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-[#075c61]">
                      {title}
                    </h4>
                    <p className="mt-1 text-sm leading-5 text-slate-600">
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#eee7db] bg-[#fffdf7]">
        <div className="mx-auto max-w-7xl px-3 py-16 sm:px-4 lg:px-6 lg:py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.08em] text-[#e99a05]">
              Tutor Commercial Model
            </p>
            <h2 className="mx-auto mt-2 whitespace-nowrap text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#075c61] sm:text-3xl">
              Free when a parent invites you. Paid when it&apos;s your business.
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              The line is simple: supporting one family&apos;s child on their
              account costs you nothing.
              <br className="hidden sm:block" /> Running your own tutoring
              practice on AttoLearn is a Tutor Plan.
            </p>
          </div>

          <div className="mt-10 grid w-full gap-5 md:grid-cols-2">
            <article className="flex min-h-[250px] gap-4 rounded-xl border border-[#e8e3d8] bg-[#fffef9] p-5 shadow-[0_8px_24px_rgba(64,47,14,0.035)] sm:p-6">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/tutors/commercial-model-icons/invited-by-parent.png"
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-[#075c61]">
                  Invited by a parent
                </h3>
                <p className="mt-2 text-sm text-slate-600">No cost to you</p>
                <ul className="mt-4 space-y-2 text-sm leading-5 text-slate-600">
                  {[
                    "Included in that family's plan",
                    "Support that family's child",
                    "Scoped, revocable access",
                    "No tutor billing involved",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 fill-[#075c61] text-white" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="relative flex min-h-[250px] gap-4 rounded-xl border-2 border-[#efb327] bg-[#fffef9] p-5 shadow-[0_8px_24px_rgba(64,47,14,0.035)] sm:p-6">
              <span className="absolute -top-3 left-10 rounded-full bg-[#eda912] px-4 py-1 text-xs font-bold text-white">
                Independent tutors
              </span>
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/tutors/commercial-model-icons/tutor-plan.png"
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-[#075c61]">
                  Tutor Plan
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  See Pricing for current rates
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-5 text-slate-600">
                  {[
                    "Add your own students and create learner profiles",
                    "Assign work independently",
                    "Starter, Growth and Pro tiers by active student count \u2014 same rates for centres",
                    "Extra-student add-ons between tiers",
                    "Billed to you, not to families",
                    "Annual billing available",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 fill-[#075c61] text-white" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <div className="mt-5 flex w-full flex-col gap-4 rounded-xl border border-[#d9e8e6] bg-[#f2f8f5] px-5 py-4 sm:flex-row sm:items-center">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/tutors/commercial-model-icons/tuition-centres.png"
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-[#075c61]">
                Running a team rather than a solo practice?
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Tuition centres use these same plans. What differs is the
                workspace: staff accounts, learner allocation between tutors,
                and evidence that stays with the centre when a tutor leaves.
              </p>
            </div>
            <Link
              href="/tuition-centres"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-[#278e91] px-6 text-xs font-semibold text-white transition hover:bg-[#096d72]"
            >
              For Tuition Centres
            </Link>
          </div>

          <div className="mt-4 flex w-full items-center gap-4 rounded-xl border border-dashed border-[#edb531] bg-[#fffaf0] px-5 py-4">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/tutors/commercial-model-icons/referring-families.png"
                alt=""
                fill
                sizes="56px"
                className="object-cover"
              />
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-[#075c61]">
                Referring families to AttoLearn
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                A referral arrangement for tutors who bring families to the
                platform.
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase leading-4 text-[#d98b00]">
                Referral terms not yet approved &mdash; no commission or reward
                is offered or implied
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[230px] overflow-hidden border-y border-[#e5e3dc]">
        <Image
          src="/images/tutors/closing-sections/teaching-cta-v2.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 mx-auto flex min-h-[230px] max-w-7xl items-center justify-center px-5 py-10 text-center sm:px-8 lg:px-10">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-[#075e65] sm:text-4xl">
              Start teaching with evidence behind you
            </h2>
            <p className="mt-3 text-sm text-[#075e65] sm:text-base">
              Join as a tutor, or explore the workspace first.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://portal.attolearn.com/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#f4a50c] px-7 text-sm font-bold text-white"
              >
                Join as a Tutor
              </a>
              <a
                href="#workspace"
                className="inline-flex h-11 items-center justify-center rounded-md border border-[#07818a] bg-white px-7 text-sm font-bold text-[#076a72]"
              >
                Explore Tutor Workspace
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffef9]">
        <div className="mx-auto max-w-7xl px-3 py-16 sm:px-4 lg:px-6 lg:py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#f19a0a]">
              The Small Print, Said Plainly
            </p>
            <h2 className="mt-1 text-3xl font-semibold text-[#00666c] sm:text-4xl">
              Things worth knowing before you pay
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "/images/tutors/closing-sections/prices-local.png",
                "Prices are local",
                "Each market is priced in its own currency, not converted from US dollars.",
              ],
              [
                "/images/tutors/closing-sections/cancel-any-time.png",
                "Cancel any time",
                "Monthly plans stop at the end of the period you've paid for.",
              ],
              [
                "/images/tutors/closing-sections/records-stay-yours.png",
                "Your records stay yours",
                "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
              ],
              [
                "/images/tutors/closing-sections/invited-tutor-free.png",
                "One invited tutor is free",
                "A tutor a parent invites is included \u2014 the tutor is never billed for that family.",
              ],
            ].map(([image, title, copy]) => (
              <article
                key={title}
                className="min-h-[215px] rounded-xl border border-[#ebe5da] bg-[#fffef9] px-5 py-5 text-left shadow-[0_8px_22px_rgba(58,42,12,.06)]"
              >
                <span className="relative block h-20 w-20">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </span>
                <h3 className="mt-2 text-base font-bold text-[#075c61]">
                  {title}
                </h3>
                <p className="mt-2 max-w-[230px] text-sm leading-6 text-slate-600">
                  {copy}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-5 rounded-xl border border-dashed border-[#e8a21a] bg-[#fff9ee] p-6 sm:flex-row sm:items-center">
            <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/tutors/closing-sections/on-tax-v2.png"
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </span>
            <div>
              <h3 className="text-base font-semibold text-[#00666c]">On tax</h3>
              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-600">
                Whether the figures shown include GST or VAT determines the
                final amount you pay, and consumer price display rules differ by
                market.
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase leading-4 text-[#ce8200]">
                Tax-inclusive vs tax-exclusive display to be confirmed per
                market before these prices go live
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[260px] overflow-hidden border-t border-[#174f56]">
        <Image
          src="/images/tutors/closing-sections/start-free-cta.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#003f48]/35" />
        <div className="relative z-10 mx-auto flex min-h-[260px] max-w-7xl items-center justify-center px-3 py-10 text-center sm:px-4">
          {" "}
          lg:px-6
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl">
              Start free, decide later
            </h2>
            <p className="mt-3 text-sm text-[#f4f3e9] sm:text-base">
              No card to try it. Move to a paid plan when it&apos;s earning its
              place.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://portal.attolearn.com/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 min-w-40 items-center justify-center rounded-md bg-[#f4aa08] px-8 text-sm font-bold text-white shadow-[0_8px_22px_rgba(244,170,8,.22)] transition hover:bg-[#e79b00]"
              >
                Start Free
              </a>
              <Link
                href="/contact"
                className="inline-flex h-12 min-w-40 items-center justify-center rounded-md border border-[#f8f3df] bg-transparent px-8 text-sm font-bold text-[#fffbed] transition hover:bg-white/10"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
