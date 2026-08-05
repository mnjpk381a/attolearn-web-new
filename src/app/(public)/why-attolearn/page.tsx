import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Binoculars,
  Brain,
  Building2,
  CalendarCheck,
  CircleHelp,
  Clock3,
  Gauge,
  GraduationCap,
  HandHeart,
  Heart,
  HelpCircle,
  Lightbulb,
  LockKeyhole,
  MessageCircleQuestion,
  Pencil,
  RefreshCw,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";

const scoreCards = [
  [
    Users,
    "Two correct answers may not show the same understanding",
    "One learner worked it out; another guessed. A score alone can't tell the difference.",
  ],
  [
    MessageCircleQuestion,
    "Hints and support matter",
    "A correct answer reached after three hints means something different from one reached alone.",
  ],
  [
    Clock3,
    "Learning today may not last",
    "What's correct this week isn't automatically still true next month.",
  ],
  [
    RefreshCw,
    "Success on familiar questions may not show transfer",
    "Doing well on practice-style questions doesn't confirm the idea works in a new context.",
  ],
] as const;

const dimensions = [
  [
    Brain,
    "Core Understanding",
    "Does the learner really understand the idea?",
    "explaining why a method works, not just applying it.",
  ],
  [
    Gauge,
    "Fluency",
    "Can the learner use it smoothly?",
    "solving without stopping to re-derive each step.",
  ],
  [
    CalendarCheck,
    "Retention",
    "Can the learner still do it later?",
    "the same skill, checked again weeks on.",
  ],
  [
    Route,
    "Transfer",
    "Can the learner apply it in a different situation?",
    "using the idea in a new, unfamiliar question.",
  ],
  [
    Lightbulb,
    "Reasoning",
    "Can the learner explain why?",
    "justifying a choice, not just stating an answer.",
  ],
  [
    UserRound,
    "Independence",
    "Can the learner do it without too much help?",
    "fewer hints needed over time on the same skill.",
  ],
  [
    TrendingUp,
    "Consistency",
    "Is the learning reliable?",
    "getting it right isn't a one-off.",
  ],
] as const;

function EditorialTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`editorial-heading text-[#075e65] ${className}`}>
      {children}
    </h2>
  );
}

export default function WhyAttoLearnPage() {
  return (
    <main className="why-page bg-white text-slate-800">
      <section className="relative min-h-135 overflow-hidden bg-[#fbfcfc]">
        <div className="absolute inset-y-0 right-0 hidden w-[62%] bg-[#f7f3ec] md:block">
          <Image
            src="/images/why-attolearn/learning-philosophy-hero.png"
            alt="Tutor helping a learner understand their work"
            fill
            priority
            sizes="62vw"
            className="object-contain object-right"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#fbfcfc] via-[#fbfcfc]/25 to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-135 max-w-7xl items-center px-5 py-14 sm:px-8 lg:px-10">
          <div className="max-w-lg rounded-2xl bg-white/90 p-6 md:bg-transparent md:p-0">
            <p className="text-lg font-semibold text-[#d9910d]">
              Why AttoLearn
            </p>
            <h1 className="editorial-heading mt-4 text-4xl leading-[1.15] text-[#075e65] sm:text-5xl">
              Learning is not a<br />
              single score. It is a<br />
              pattern of evidence.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-slate-700">
              The thinking behind Adaptive Learning — what AttoLearn actually
              looks at, and why.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 lg:px-10">
        <p className="text-sm font-semibold text-[#d9910d]">
          Why right and wrong are not enough
        </p>
        <EditorialTitle className="mt-1 text-3xl sm:text-4xl">
          A score doesn&apos;t tell you what happened
        </EditorialTitle>
        <p className="mt-2 text-sm text-slate-700">
          Two correct answers can hide two very different levels of
          understanding.
        </p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {scoreCards.map(([Icon, title, copy]) => (
            <article
              key={title}
              className="min-h-65 rounded-xl border border-slate-200 bg-white p-6 shadow-md"
            >
              <Icon
                className="mx-auto h-12 w-12 text-[#08777d]"
                strokeWidth={1.5}
              />
              <h3 className="mt-5 text-base font-semibold leading-5 text-[#075e65]">
                {title}
              </h3>
              <p className="mt-5 text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f0fafa]">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 lg:px-10">
          <p className="text-sm font-semibold text-[#d9910d]">
            The seven learning dimensions
          </p>
          <EditorialTitle className="mt-1 text-3xl sm:text-4xl">
            What AttoLearn actually looks at
          </EditorialTitle>
          <p className="mt-2 text-sm text-slate-700">
            Each activity collects the evidence it&apos;s suited to collect — not
            every dimension, every time.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-5">
            {dimensions.map(([Icon, title, question, example], index) => (
              <article
                key={title}
                className="w-full rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
              >
                <div className="flex items-start gap-4 text-left">
                  <span className="text-xl font-semibold text-[#08777d]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className="h-11 w-11 text-[#08777d]"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#075e65]">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-5 text-slate-700">
                  {question}
                </p>
                <p className="mt-3 text-sm leading-5 text-slate-600">
                  Example: {example}
                </p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-7 flex max-w-2xl items-center justify-center gap-3 rounded-lg border border-[#9ccfd1] bg-white px-5 py-3 text-left">
            <CircleHelp className="h-5 w-5 shrink-0 text-[#08777d]" />
            <p className="text-sm">
              <b className="text-[#075e65]">
                Not every activity measures everything.
              </b>
              <br />
              Each activity collects the evidence it&apos;s suited to collect.
              Retention, transfer, reasoning and consistency develop through
              different activities and over time — not from a single session.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#05777d] text-white">
        <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-8">
          <p className="text-sm font-semibold text-[#f5b32b]">
            Mastery and confidence
          </p>
          <h2 className="editorial-heading mt-1 text-3xl text-white sm:text-4xl">
            Two different questions, kept separate
          </h2>
          <p className="mt-2 text-sm text-white/90">
            What a learner appears to know, and how reliable that picture
            actually is, are not the same thing.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article className="flex gap-5 rounded-xl bg-white p-6 text-left text-slate-700">
              <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[#e4f7ef]">
                <Target className="h-12 w-12 text-[#08777d]" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[#075e65]">
                  Mastery
                </h3>
                <p className="mt-3 text-sm leading-6">
                  The current picture of capability — what the learner appears
                  to know or be able to do right now, based on everyday
                  practice.
                </p>
              </div>
            </article>
            <article className="flex gap-5 rounded-xl bg-white p-6 text-left text-slate-700">
              <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[#fff5d9]">
                <Users className="h-12 w-12 text-[#08777d]" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[#075e65]">
                  Confidence
                </h3>
                <p className="mt-3 text-sm leading-6">
                  The reliability of the evidence behind that picture. High
                  mastery with low confidence means: promising, but not yet
                  certain.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold text-[#d9910d]">
            Missing evidence is not failure
          </p>
          <EditorialTitle className="mt-1 text-3xl">
            &quot;Not yet observed&quot; is different
            <br />
            from &quot;not achieved&quot;
          </EditorialTitle>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            If AttoLearn hasn&apos;t seen enough evidence of a skill yet,
            that&apos;s treated honestly — as a gap in the picture, not as a
            mark against the learner.
          </p>
        </div>
        <div className="relative mx-auto grid h-55 w-full max-w-md place-items-center rounded-2xl bg-[#f3fafa]">
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className={`h-16 w-16 border border-[#8bbfc1] ${i === 3 || i === 5 ? "bg-white" : "bg-[#dceeee]"}`}
              />
            ))}
          </div>
          <HelpCircle
            className="absolute bottom-5 right-10 h-24 w-24 text-[#08777d]"
            strokeWidth={1.5}
          />
        </div>
      </section>

      <section className="bg-[#fff8e8]">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div className="text-center">
            <ShieldCheck
              className="mx-auto h-28 w-28 text-[#07818a]"
              strokeWidth={1.2}
            />
            <div className="mx-auto mt-6 flex max-w-xs items-end gap-2">
              <span className="h-2 w-2 rounded-full bg-[#07818a]" />
              <span className="h-8 w-2 rounded-full bg-[#07818a]" />
              <span className="h-12 w-2 rounded-full bg-[#07818a]" />
              <span className="h-10 w-2 rounded-full bg-[#07818a]" />
              <span className="h-16 w-2 rounded-full bg-[#07818a]" />
              <ArrowRight className="ml-2 h-5 w-5" />
            </div>
            <p className="mt-3 text-xs font-semibold">Evidence over time</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#d9910d]">
              Secure Mastery
            </p>
            <EditorialTitle className="mt-1 text-3xl">
              What &quot;secure&quot; actually means
            </EditorialTitle>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              Secure Mastery means the learner has shown reliable, sufficiently
              independent learning over time and across appropriate contexts.
            </p>
            <div className="mt-6 flex gap-4 rounded-lg border border-[#e9c978] bg-[#fff4d8] p-5">
              <LockKeyhole className="h-7 w-7 shrink-0 text-[#075e65]" />
              <p className="text-sm leading-6">
                <b className="text-[#075e65]">What we don&apos;t publish:</b>
                <br />
                Thresholds, formulas, dimension weights or confidence cut-offs.
                The definition above is the complete public explanation — the
                exact mechanics stay internal, the same way any assessment
                system keeps its precise marking logic private.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 lg:px-10">
        <p className="text-sm font-semibold text-[#d9910d]">
          The evidence-to-experience loop
        </p>
        <EditorialTitle className="mt-1 text-3xl sm:text-4xl">
          Evidence should improve the next experience
        </EditorialTitle>
        <p className="mt-2 text-sm text-slate-700">
          Not a one-off check — a continuous loop.
        </p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [Binoculars, "Observe"],
            [Brain, "Understand"],
            [HandHeart, "Support"],
            [Pencil, "Practise"],
            [RefreshCw, "Recheck"],
          ].map(([Icon, title], i) => {
            const I = Icon as typeof Brain;
            return (
              <article key={String(title)} className="relative">
                <span className="absolute left-1/2 top-0 z-10 grid h-8 w-8 -translate-x-12 place-items-center rounded-full bg-[#08777d] text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <span className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-[#9ccfd1] bg-[#f3fbfb]">
                  <I className="h-11 w-11 text-[#08777d]" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-[#075e65]">
                  {String(title)}
                </h3>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#edfafa]">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[#edfafa] md:block">
          <Image
            src="/images/why-attolearn/child-safe-learning.png"
            alt="Learner working independently with support"
            fill
            sizes="50vw"
            className="object-contain object-right"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#edfafa] to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <p className="text-sm font-semibold text-[#d9910d]">
            Child-safe learning
          </p>
          <EditorialTitle className="mt-1 text-3xl">
            Designed to support, not to label
          </EditorialTitle>
          <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
            {[
              [
                Heart,
                "Encouragement over labels",
                "No raw diagnostic scores or technical terms shown to a child.",
              ],
              [
                Route,
                "One clear next step",
                "Never an overwhelming list — always one manageable action.",
              ],
              [
                BadgeCheck,
                "Support after repeated difficulty",
                "The system responds to struggle by helping, not by simply repeating.",
              ],
              [
                Sparkles,
                "Small challenges after stable success",
                "Growth is offered gradually, once a skill is genuinely secure.",
              ],
            ].map(([Icon, title, copy]) => {
              const I = Icon as typeof Heart;
              return (
                <article
                  key={String(title)}
                  className="flex gap-4 rounded-lg border border-slate-200 bg-white/95 p-4"
                >
                  <I className="h-8 w-8 shrink-0 text-[#08777d]" />
                  <div>
                    <h3 className="text-sm font-semibold text-[#075e65]">
                      {String(title)}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {String(copy)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 lg:px-10">
        <p className="text-sm font-semibold text-[#d9910d]">
          Explainable adaptation
        </p>
        <EditorialTitle className="mt-1 text-3xl sm:text-4xl">
          A learner always knows why
        </EditorialTitle>
        <p className="mt-2 text-sm text-slate-700">
          Real examples of the plain-language reasons AttoLearn gives.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            "This checks what you still remember.",
            "This supports your current goal.",
            "This gives more practice before moving on.",
            "This was assigned by your tutor.",
          ].map((quote, i) => (
            <blockquote
              key={quote}
              className={`rounded-xl border p-6 text-sm font-semibold ${i % 2 ? "border-[#e7c471] bg-[#fffaf0]" : "border-[#87c5c8] bg-[#f3fbfb]"}`}
            >
              <span className="editorial-heading mr-2 text-3xl text-[#08777d]">
                “
              </span>
              {quote}
            </blockquote>
          ))}
        </div>
      </section>

      <section className="bg-[#fff8e8]">
        <div className="mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 lg:px-10">
          <p className="text-sm font-semibold text-[#d9910d]">
            The philosophy promise
          </p>
          <EditorialTitle className="mt-1 text-3xl sm:text-4xl">
            What this means for each person
          </EditorialTitle>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [UserRound, "Students", "Are supported."],
              [Users, "Parents", "Understand."],
              [GraduationCap, "Tutors", "Teach with clearer evidence."],
              [Building2, "Schools", "Connect learning with purpose."],
            ].map(([Icon, title, copy]) => {
              const I = Icon as typeof UserRound;
              return (
                <article
                  key={String(title)}
                  className="flex gap-4 rounded-xl border border-[#e7bd58] bg-white p-5 text-left"
                >
                  <I className="h-9 w-9 shrink-0 text-[#08777d]" />
                  <div>
                    <h3 className="text-sm font-semibold text-[#075e65]">
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
        </div>
      </section>

      <section className="bg-[#05777d] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 lg:px-10">
          <p className="text-sm font-semibold text-[#f5b32b]">
            See it in practice
          </p>
          <h2 className="editorial-heading mt-1 text-3xl text-white sm:text-4xl">
            Explore how this philosophy shapes every AttoLearn session.
          </h2>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/choose-module"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#f4aa17] px-7 text-sm font-semibold text-white transition hover:bg-[#dc9411]"
            >
              Explore Adaptive Learning
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/80 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
