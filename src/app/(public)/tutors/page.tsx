"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Eye,
  FileText,
  KeyRound,
  Send,
  ShieldCheck,
  Target,
  Users,
  UserRound,
} from "lucide-react";

const workspaceCards = [
  [
    Users,
    "Assigned learners",
    "Every learner you support, in one list, with their current focus.",
  ],
  [
    KeyRound,
    "Parent-approved access",
    "A parent invites or approves you. You never add a child yourself.",
  ],
  [
    Eye,
    "Scoped visibility",
    "You see the subjects and evidence the parent has agreed to share.",
  ],
  [
    ShieldCheck,
    "Revocable permissions",
    "Access can be narrowed or withdrawn by the parent at any time.",
  ],
  [
    FileText,
    "Audit trail",
    "What was assigned, viewed and changed is recorded — protection for both sides.",
  ],
  [
    UserRound,
    "Your own view",
    "Built for teaching decisions, not a cut-down version of the parent dashboard.",
  ],
  [
    Send,
    "Assign work directly",
    "Goals, practice and assessments, without going through the parent.",
  ],
  [
    Users,
    "Multiple families",
    "Learners from different families, kept properly separate.",
  ],
] as const;

const evidenceRows = [
  [
    "Weakest dimension",
    "Transfer — struggles once the wording changes",
    AlertCircle,
    "#e74843",
  ],
  ["Support use", "Correct, but usually after a hint", AlertCircle, "#df970d"],
  ["Missed prerequisite", "Equivalent fractions, Year 5", BookOpen, "#00666c"],
  [
    "Due for recheck",
    "Order of operations — 3 weeks since last seen",
    Clock3,
    "#00666c",
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

function CollapsibleTickList({ items }: { items: readonly string[] }) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <div>
      <TickList items={visibleItems} />
      {items.length > 3 && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
          className="mt-4 text-sm font-medium text-[#007178] underline-offset-4 transition hover:text-[#005c62] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007178]"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}

function EvidenceCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
      <div className="border-b border-slate-200 px-5 py-3">
        <h3 className="text-sm text-slate-900">Amara, Year 7 — Mathematics</h3>
      </div>
      {evidenceRows.map(([title, copy, Icon, color]) => (
        <div
          key={title}
          className="flex gap-3 border-b border-slate-100 px-5 py-3 last:border-0"
        >
          <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color }} />
          <div>
            <h3 className="text-xs text-slate-900">{title}</h3>
            <p className="mt-1 text-[11px] leading-4 text-slate-600">{copy}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TutorsPage() {
  return (
    <div className="tutors-page overflow-hidden bg-[#f5f9fb] text-slate-800">
      <section className="relative flex flex-col overflow-hidden border-b border-[#08757b] bg-[#075e65] xl:block xl:min-h-152.5">
        <div className="relative order-2 mx-auto aspect-2/1 w-[92%] max-w-3xl xl:absolute xl:inset-y-8 xl:right-8 xl:mx-0 xl:h-auto xl:w-[52%] xl:max-w-none xl:aspect-auto 2xl:right-12 2xl:w-[50%]">
          <Image
            src="/images/tutors/tutor-img.png"
            alt="Learning evidence flowing from identified difficulty to tutor focus and scheduled review"
            fill
            priority
            sizes="100vw"
            className="object-contain object-center"
          />
        </div>
        <div className="relative order-1 mx-auto w-full max-w-345 px-5 py-10 sm:px-8 sm:py-12 md:py-14 lg:px-10 xl:flex xl:min-h-152.5 xl:items-start xl:px-14 xl:pb-16 xl:pt-16 2xl:px-16">
          <div className="max-w-xl xl:max-w-100 2xl:max-w-110">
            <p className="text-xl font-semibold text-[#f4aa17] sm:text-2xl xl:text-3xl">
              For Tutors
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:mt-5 sm:text-5xl md:text-[54px] xl:text-[56px] 2xl:text-[58px]">
              Teach with
              <br />
              clearer evidence
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/90 sm:mt-6 sm:text-base sm:leading-7 xl:mt-7 xl:max-w-100 2xl:max-w-108">
              Walk into the session already knowing what the learner
              understands, what they don’t, and what to do about it — instead of
              spending the first twenty minutes finding out.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                href="https://portal.attolearn.com/auth/login"
                className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-md bg-[#f4aa17] px-5 text-sm text-white shadow-sm transition hover:bg-[#004f54] sm:w-auto 2xl:px-7"
              >
                Join as a Tutor
              </Link>
              <a
                href="#workspace"
                className="inline-flex h-12 w-full items-center justify-center whitespace-nowrap rounded-md border-2 border-white/80 bg-transparent px-5 text-sm text-white transition hover:bg-white/10 sm:w-auto 2xl:px-7"
              >
                Explore Tutor Workspace
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="workspace"
        className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 lg:px-10"
      >
        <p className="text-xl text-[#d48b00]">Tutor Workspace</p>

        <h2 className="mt-3 text-3xl leading-tight text-[#075e65]">
          A professional workspace, not a parent login
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
          Your own account, your own learners, and access that a parent grants
          and can take back.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workspaceCards.map(([Icon, title, copy], index) => (
            <article
              key={title}
              className={`min-h-44 rounded-xl border bg-white p-6 text-center ${
                index % 3 === 1 ? "border-[#e7cc9b]" : "border-[#a9d7d8]"
              }`}
            >
              <Icon
                className="mx-auto h-10 w-10"
                style={{ color: index % 3 === 1 ? "#df970d" : "#00666c" }}
                strokeWidth={1.7}
              />
              <h3 className="mt-4 text-base text-slate-900">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.35fr] lg:px-10">
          <div>
            <p className="text-xl text-[#d48b00]">Understand learner needs</p>

            <h2 className="text-3xl leading-tight text-[#075e65]">
              See where the learning is actually thin
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Not a percentage. The specific things that tell you what to teach:
              which dimension is weak, which prerequisite was never secured,
              where the answers only come with help.
            </p>
            <CollapsibleTickList items={insightBullets} />
          </div>
          <div className="relative min-h-107.5 overflow-hidden rounded-xl">
            <Image
              src="/images/tutors/learning-analytics.png"
              alt="Tutor reviewing learning analytics"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <div className="relative m-5 max-w-sm lg:m-7">
              <EvidenceCard />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 rounded-xl border border-[#e5a52b] bg-[#fffaf0] p-6 lg:flex-row lg:items-center">
            <ShieldCheck className="h-11 w-11 shrink-0 text-[#dc940a]" />
            <div className="flex-1">
              <h3 className="text-base text-[#835500]">
                What tutors can see is set by the permission model
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                The exact evidence a tutor can view — and how much detail sits
                behind each item — depends on the final tutor permission and
                consent model. This page describes the intended workspace, not a
                confirmed field-by-field visibility list.
              </p>
            </div>
            <p className="flex max-w-xs gap-3 text-xs leading-5 text-[#835500]">
              <AlertCircle className="h-6 w-6 shrink-0" />
              Tutor visibility scope to be confirmed against the final
              permission model before publishing as live
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xl text-[#d48b00]">Assign targeted work</p>

            <h2 className="text-3xl leading-tight text-[#075e65]">
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
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-base text-slate-900">Assign to Amara</h3>
            {[
              [Target, "Goal", "Secure equivalent fractions before moving on"],
              [FileText, "Practice", "Three short sessions before Thursday"],
              [
                BookOpen,
                "Revision task",
                "Order of operations — retention check",
              ],
              [
                ClipboardCheck,
                "Online test",
                "Fractions diagnostic, set for Friday",
              ],
            ].map(([Icon, title, detail]) => {
              const RowIcon = Icon as typeof Target;
              return (
                <div
                  key={String(title)}
                  className="mb-2 grid grid-cols-[32px_110px_1fr_20px] items-center rounded-lg border border-slate-200 px-4 py-3 text-sm last:mb-0"
                >
                  <RowIcon className="h-5 w-5 text-[#00777d]" />
                  <h3 className="text-sm text-slate-900">{title as string}</h3>
                  <span className="text-xs text-slate-600">
                    {detail as string}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="grid min-h-120 bg-white lg:grid-cols-2">
            <div className="relative min-h-120 overflow-hidden rounded-xl">
              <Image
                src="/images/tutors/tutor-preparation.png"
                alt="Tutor preparing for a session"
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-xl border border-slate-200 bg-white/95 p-5 shadow-lg backdrop-blur-sm sm:left-6 sm:right-auto sm:w-64 lg:left-auto lg:right-6">
                <h3 className="text-lg text-[#075e65]">
                  Before Thursday’s session
                </h3>
                {[
                  [
                    Clock3,
                    "Since last session:",
                    "4 sessions completed, 1 abandoned",
                  ],
                  [
                    FileText,
                    "Where it broke down:",
                    "Unlike denominators, twice",
                  ],
                  [
                    Target,
                    "Suggested focus:",
                    "Equivalent fractions, then retry",
                  ],
                ].map(([Icon, title, detail]) => {
                  const RowIcon = Icon as typeof Clock3;
                  return (
                    <div
                      key={String(title)}
                      className="mt-4 flex gap-3 border-t border-slate-100 pt-4"
                    >
                      <RowIcon className="h-5 w-5 shrink-0 text-[#00777d]" />
                      <div>
                        <h3 className="text-xs text-slate-900">
                          {title as string}
                        </h3>
                        <p className="mt-1 text-[11px] text-slate-600">
                          {detail as string}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center p-8 sm:p-10 lg:py-12 lg:pl-12 lg:pr-0">
              <div className="max-w-xl">
                <p className="text-xl text-[#d48b00]">
                  Prepare before the session
                </p>
                <h2 className="text-3xl leading-tight text-[#075e65]">
                  Stop paying for cold-start diagnosis
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  The first part of a session is usually spent working out where
                  the learner is. That time is billed to the parent and produces
                  no teaching. Evidence gathered between sessions gives it back.
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
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f5f9fb]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="text-center">
            <p className="text-xl font-medium uppercase tracking-wide text-[#d48b00]">
              Paper Generator for Tutors
            </p>
            <h2 className="mt-1 text-3xl font-semibold leading-tight text-[#00666c] sm:text-4xl">
              Assessment built for how tutors actually work
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              Curriculum-based papers for checking, diagnosing and reviewing —
              printable or online.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                FileText,
                "Topic tests",
                "A focused check on one topic you’ve just taught.",
              ],
              [
                Target,
                "Diagnostic papers",
                "Find out where a new learner actually is, in one sitting.",
              ],
              [
                ClipboardCheck,
                "Homework",
                "Set work between sessions and see the results.",
              ],
              [
                Eye,
                "Progress review",
                "A periodic check you can walk a parent through.",
              ],
              [
                BookOpen,
                "Print or online",
                "Print for the table, or set it as an online test.",
              ],
              [
                ShieldCheck,
                "Keep the records",
                "Results stay attached to the learner’s evidence.",
              ],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof FileText;
              return (
                <article
                  key={String(title)}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-sm"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#eaf6f6]">
                    <CardIcon className="h-4 w-4 text-[#00777d]" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-[#00666c]">
                    {title as string}
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {copy as string}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f9fb] pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 rounded-xl border border-dashed border-[#e8a21a] bg-[#fff9ee] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
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
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-[#07858b] px-6 text-xs font-semibold text-white transition hover:bg-[#006c72]"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl gap-10 px-5 sm:px-8 lg:mt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10">
          <div>
            <p className="text-xl font-semibold uppercase tracking-wide text-[#d48b00]">
              The Parent Relationship
            </p>
            <h2 className="mt-1 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#00666c] sm:text-4xl">
              You support the learner, with
              <br className="hidden sm:block" /> permission
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Tutors support the learner with permission. They do not own the
              family relationship. That boundary is deliberate, and it protects
              you as much as the family — everything you do is on the record,
              within a scope the parent agreed to.
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
                  "The parent owns",
                  "The account, the consent, the child’s profile",
                ],
                ["You hold", "Scoped access to the learner you support"],
                ["You can", "Set goals, assign work, review evidence"],
                [
                  "You cannot",
                  "Add a child, change consent, see other subjects",
                ],
              ].map(([title, copy]) => (
                <div
                  key={title}
                  className="rounded-lg border border-[#d8e1e3] bg-white px-5 py-4"
                >
                  <h4 className="text-sm font-semibold text-[#00666c]">
                    {title}
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f5f9fb]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
          <div className="text-center">
            <p className="text-xl font-semibold uppercase tracking-wide text-[#d48b00]">
              Tutor Commercial Model
            </p>
            <h2 className="mx-auto mt-1 max-w-3xl text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#00666c] sm:text-4xl">
              Free when a parent invites you. Paid when it&apos;s your business.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
              The line is simple: supporting one family&apos;s child on their
              account costs you nothing. Running your own tutoring practice on
              AttoLearn is a Tutor Plan.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
              <h3 className="text-xl font-semibold text-[#00666c]">
                Invited by a parent
              </h3>
              <p className="mt-1 text-sm text-slate-600">No cost to you</p>
              <ul className="mt-4 space-y-2 text-sm leading-5 text-slate-600">
                {[
                  "Included in that family’s plan",
                  "Support that family’s child",
                  "Scoped, revocable access",
                  "No tutor billing involved",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-slate-500">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="relative rounded-xl border border-[#e8a21a] bg-white p-6 sm:p-7">
              <span className="absolute -top-3 left-5 rounded-full bg-[#efa817] px-4 py-1 text-[15px] font-semibold text-white">
                Independent tutors
              </span>
              <h3 className="text-xl font-semibold text-[#00666c]">
                Tutor Plan
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                See Pricing for current rates
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-5 text-slate-600">
                {[
                  "Add your own students and create learner profiles",
                  "Assign work independently",
                  "Starter, Growth and Pro tiers by active student count — same rates for centres",
                  "Extra-student add-ons between tiers",
                  "Billed to you, not to families",
                  "Annual billing available",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-slate-500">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="mt-16 flex flex-col gap-5 rounded-xl border border-[#cce7e8] bg-[#eaf8f8] p-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#00666c]">
                Running a team rather than a solo practice?
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Tuition centres use these same plans, with a workspace designed
                for staff, learners and shared oversight.
              </p>
            </div>
            <Link
              href="/tuition-centres"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-[#07858b] px-7 text-xs font-semibold text-white transition hover:bg-[#006c72]"
            >
              Explore Tuition Centres
            </Link>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-[#e8a21a] bg-[#fff9ee] p-7">
            <h3 className="text-sm font-semibold text-[#00666c]">
              Referring families to AttoLearn
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              A referral arrangement for tutors who bring families to the
              platform.
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase leading-4 text-[#ce8200]">
              Referral terms not yet approved — no commission or reward is
              offered or implied
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#07818a] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Start teaching with evidence behind you
          </h2>
          <p className="mt-3 text-sm text-white/90 sm:text-base">
            Join as a tutor, or explore the workspace first.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://portal.attolearn.com/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#f4aa17] px-7 text-sm font-semibold text-white transition hover:bg-[#dc9411]"
            >
              Join as a Tutor
            </a>
            <a
              href="#workspace"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white px-7 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Tutor Workspace
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f9fb]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="text-center">
            <p className="text-xl font-semibold uppercase tracking-wide text-[#d48b00]">
              The Small Print, Said Plainly
            </p>
            <h2 className="mt-1 text-3xl font-semibold text-[#00666c] sm:text-4xl">
              Things worth knowing before you pay
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                Target,
                "Prices are local",
                "Each market is priced in its own currency, not converted from US dollars.",
              ],
              [
                CheckCircle2,
                "Cancel any time",
                "Monthly plans stop at the end of the period you’ve paid for.",
              ],
              [
                ShieldCheck,
                "Your records stay yours",
                "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
              ],
              [
                Users,
                "One invited tutor is free",
                "A tutor a parent invites is included — the tutor is never billed for that family.",
              ],
            ].map(([Icon, title, copy]) => {
              const InfoIcon = Icon as typeof Target;
              return (
                <article
                  key={String(title)}
                  className="min-h-38 rounded-xl border border-slate-200 bg-white p-6"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#eaf6f6]">
                    <InfoIcon className="h-5 w-5 text-[#00777d]" />
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-[#00666c]">
                    {title as string}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {copy as string}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-[#e8a21a] bg-[#fff9ee] p-7">
            <h3 className="text-sm font-semibold text-[#00666c]">On tax</h3>
            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-600">
              Whether the figures shown include GST or VAT determines the final
              amount you pay, and consumer price display rules differ by market.
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase leading-4 text-[#ce8200]">
              Tax-inclusive vs tax-exclusive display to be confirmed per market
              before these prices go live
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
