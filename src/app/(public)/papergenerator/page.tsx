"use client";

import Image from "next/image";
import Link from "next/link";
import { SignupLink } from "@/constants/plans";
import { ArrowRight, CheckCircle2, FileCheck2 } from "lucide-react";

const coreCapabilities = [
  [
    "/images/paper-generator/core-capability-icons/choose-curriculum.png",
    "Choose curriculum and year",
    "Start from the curriculum you actually teach, at the right year level.",
  ],
  [
    "/images/paper-generator/core-capability-icons/select-subjects.png",
    "Select subjects and topics",
    "Down to individual chapters and topics, not just a subject.",
  ],
  [
    "/images/paper-generator/core-capability-icons/question-types.png",
    "Choose question types",
    "Mix formats, or keep a paper to a single type.",
  ],
  [
    "/images/paper-generator/core-capability-icons/printable-online.png",
    "Printable or online",
    "Exam-ready print layouts, PDF export, or set it as an online test.",
  ],
  [
    "/images/paper-generator/core-capability-icons/edit-refine.png",
    "Edit and refine",
    "Reorder, swap and adjust questions, with a review step before you finalise.",
  ],
  [
    "/images/paper-generator/core-capability-icons/save-reuse.png",
    "Save and reuse",
    "An automatic library — search, reopen, duplicate and reuse any paper.",
  ],
  [
    "/images/paper-generator/core-capability-icons/review-results.png",
    "Review results",
    "See how it went, and keep the result with the learner's record.",
  ],
  [
    "/images/paper-generator/core-capability-icons/work-together.png",
    "Work together",
    "Teachers, admins and tutors can collaborate on the same paper.",
  ],
] as const;

const formats = [
  [
    "/images/paper-generator/question-type-icons/multiple-choice.png",
    "Multiple choice",
    "Quick to answer, quick to check.",
  ],
  [
    "/images/paper-generator/question-type-icons/short-response.png",
    "Short response",
    "A line or two, in the learner's own words.",
  ],
  [
    "/images/paper-generator/question-type-icons/long-response.png",
    "Long response",
    "Extended answers for reasoning and explanation.",
  ],
  [
    "/images/paper-generator/question-type-icons/mixed.png",
    "Mixed",
    "Several formats in a single paper.",
  ],
  [
    "/images/paper-generator/question-type-icons/true-false.png",
    "True / False",
    "Fast checks on recall and misconceptions.",
  ],
  [
    "/images/paper-generator/question-type-icons/matching.png",
    "Fill in the blanks & matching",
    "Useful for vocabulary, terms and definitions.",
  ],
] as const;

const smallPrint = [
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
    "Learning evidence belongs to the family, including if a relationship ends.",
  ],
  [
    "/images/tutors/closing-sections/invited-tutor-free.png",
    "One invited tutor is free",
    "A tutor a parent invites is included — the tutor is never billed for that family.",
  ],
] as const;

function GeneratedCard({
  image,
  title,
  copy,
}: {
  image: string;
  title: string;
  copy: string;
}) {
  return (
    <article className="min-h-[265px] rounded-2xl border border-[#ece6da] bg-[#fffef9] p-5 shadow-[0_10px_28px_rgba(55,43,15,.08)]">
      <span className="relative block h-24 w-24 overflow-hidden rounded-full">
        <Image src={image} alt="" fill sizes="96px" className="object-cover" />
      </span>
      <h3 className="mt-3 text-base font-bold leading-tight text-[#075e65]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
    </article>
  );
}

export default function PaperGeneratorPage() {
  return (
    <main className="paper-generator-page overflow-hidden bg-[#fbfdfc] text-slate-800">
      <section className="relative overflow-hidden bg-[#e7f3f1] lg:min-h-[500px]">
        <div className="absolute inset-y-0 right-0 hidden w-[72%] lg:block">
          <Image
            src="/images/paper-generator/generated/paper-generator-hero.png"
            alt="Paper Generator assessment dashboard"
            fill
            priority
            sizes="72vw"
            className="object-contain object-right"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#eaf8f7_0%,#eaf8f7_34%,rgba(234,248,247,.84)_42%,transparent_58%)]" />
        <div className="relative mx-auto flex max-w-7xl items-center px-3 py-12 sm:px-4 lg:min-h-[500px] lg:px-6 lg:py-10">
          <div className="max-w-[420px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#b8dfdf] bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[.08em] text-[#087a80]">
              <FileCheck2 className="h-4 w-4" /> Assessment &amp; Paper
              Generator
            </p>
            <h1 className="mt-5 text-[38px] font-extrabold leading-[1.04] tracking-[-.035em] text-[#0a233f] sm:text-[42px]">
              Create the right assessment for{" "}
              <span className="text-[#07858b]">
                every learner, class or goal.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-[13px] leading-5 text-slate-700">
              The same assessment tool a school uses for a term exam builds a
              parent a ten-question check at the kitchen table. Choose the
              curriculum, pick the topics, generate the paper.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/papergenerator/demo"
                className="inline-flex h-11 items-center justify-center gap-3 rounded-md bg-[#ff9f0a] px-7 text-sm font-bold text-white shadow-md"
              >
                Create a Paper <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/papergenerator/demo"
                className="inline-flex h-11 items-center justify-center rounded-md border border-[#087b82] bg-white/90 px-7 text-sm font-bold text-[#076a72]"
              >
                Try the Demo
              </Link>
            </div>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full lg:hidden">
          <Image
            src="/images/paper-generator/generated/paper-generator-hero.png"
            alt="Paper Generator assessment dashboard"
            fill
            sizes="100vw"
            className="object-contain object-center"
          />
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_80%_55%,#e7f8f5_0%,#fffdf4_47%,#fffdf8_100%)] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.1em] text-[#ef9707]">
              — One tool, five ways of working —
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#075e65] sm:text-4xl">
              The same generator, used very differently
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Assessment isn&apos;t school-only. Pick the way you&apos;d use it.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              [
                "/images/paper-generator/account-use-icons/families.png",
                "Families",
              ],
              [
                "/images/paper-generator/account-use-icons/home-education.png",
                "Home Education",
              ],
              [
                "/images/paper-generator/account-use-icons/tutors.png",
                "Tutors",
              ],
              [
                "/images/paper-generator/account-use-icons/tuition-centres.png",
                "Tuition Centres",
              ],
              [
                "/images/paper-generator/account-use-icons/schools.png",
                "Schools",
              ],
            ].map(([image, label], index) => (
              <button
                key={label}
                className={`flex h-14 items-center justify-center gap-2 rounded-lg border px-3 text-xs font-bold shadow-[0_5px_14px_rgba(45,57,34,.10)] ${index === 0 ? "border-[#087b82] bg-[#087b82] text-white" : "border-[#e7e2d8] bg-[#fffef9] text-[#173447]"}`}
              >
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="whitespace-nowrap">{label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#075e65]">
                A quick check,{" "}
                <span className="text-[#16a49b]">not an exam</span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
                Your child has been working on fractions for a fortnight. You
                want to know whether it has actually landed, without turning it
                into a test.
              </p>
              <ul className="mt-5 divide-y divide-[#ece8df]">
                {[
                  "Ten questions on one topic, printed in a minute",
                  "Pitched at your child's year level",
                  "Do it on paper, away from a screen",
                  "Results join the rest of their evidence",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 fill-[#087b82] text-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#d9e5e2] bg-[#fffef8] shadow-[0_18px_42px_rgba(0,70,74,.12)]">
              <div className="flex items-center gap-3 bg-[#087b82] px-5 py-3.5 text-white">
                <span className="relative h-10 w-10 overflow-hidden rounded-lg">
                  <Image
                    src="/images/paper-generator/account-use-icons/calculator.png"
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <h3 className="font-bold">Sofia — fractions check</h3>
              </div>
              <div className="space-y-3 p-5">
                {[
                  [
                    "/images/paper-generator/account-use-icons/year-level.png",
                    "Year 5 · Mathematics",
                    "Comparing fractions",
                    "text-[#087b82]",
                  ],
                  [
                    "/images/paper-generator/account-use-icons/questions.png",
                    "10 questions",
                    "MCQ and short response",
                    "text-[#7b17ae]",
                  ],
                  [
                    "/images/paper-generator/account-use-icons/printed.png",
                    "Printed",
                    "One page, answer key separate",
                    "text-[#f27400]",
                  ],
                ].map(([image, title, copy, tone]) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 rounded-xl border border-[#ebe6dc] bg-[#fffef9] px-4 py-3"
                  >
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <div>
                      <h4 className={`font-bold ${tone}`}>{title}</h4>
                      <p className="mt-1 text-xs text-slate-600">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf7] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <p className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wide text-[#efa20a] before:h-px before:w-8 before:bg-[#efa20a] after:h-px after:w-8 after:bg-[#efa20a]">
              Core capabilities
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#075e65] sm:text-4xl">
              From curriculum to finished paper
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              The same sequence whichever account you&apos;re using.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreCapabilities.map(([image, title, copy]) => (
              <GeneratedCard
                key={title}
                image={image}
                title={title}
                copy={copy}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <p className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wide text-[#efa20a] before:h-px before:w-7 before:bg-[#efa20a] after:h-px after:w-7 after:bg-[#efa20a]">
              Question types
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#075e65] sm:text-4xl">
              Formats you can mix in one paper
            </h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {formats.map(([image, title, copy]) => (
              <article
                key={title}
                className="min-h-[220px] rounded-2xl border border-[#ece6da] bg-[#fffef9] p-6 shadow-[0_10px_28px_rgba(55,43,15,.08)]"
              >
                <span className="relative block h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#075e65]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex gap-5 rounded-2xl border border-dashed border-[#9bd5d2] bg-[#f0fbfa] p-6">
            <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/paper-generator/question-type-icons/live-formats.png"
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </span>
            <div>
              <h3 className="font-bold text-[#075e65]">
                Which formats are live today
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Multiple choice, short response, long response and mixed papers
                are advertised on the current live product. True/False, fill in
                the blanks and matching are specified but are not in the current
                published feature list.
              </p>
              <p className="mt-2 text-xs font-bold uppercase text-[#087b82]">
                Confirm availability of True/False, fill-in-the-blanks and
                matching before these appear as live capabilities
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#fffdf5] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <p className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wide text-[#efa20a] before:h-px before:w-7 before:bg-[#efa20a] after:h-px after:w-7 after:bg-[#efa20a]">
              Try it now
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#075e65] sm:text-4xl">
              Build a sample paper without signing up
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              See the whole sequence — curriculum, topics, question types,
              output — in about a minute.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-5 rounded-2xl border-2 border-dashed border-[#efb32b] bg-[#fffdf5] px-6 py-5 shadow-[0_8px_25px_rgba(100,75,20,.04)] sm:flex-row sm:items-center sm:px-8">
            <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/paper-generator/generated/sample-content-icon.png"
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#075e65]">
                This demo uses sample curriculum content only
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                Nothing in the demo touches real student, family or school data,
                and no account is created. Papers you build in the demo are not
                saved.
              </p>
            </div>
            <Link
              href="/papergenerator/demo"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#f5aa05] px-7 text-sm font-bold text-white shadow-[0_8px_18px_rgba(245,170,5,.28)]"
            >
              <span aria-hidden="true">🚀</span> Launch the Demo
            </Link>
          </div>
          <div className="pb-3 pt-12 text-center lg:pt-14">
            <p className="text-xs font-bold uppercase tracking-wide text-[#efa20a]">
              Curriculum availability
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#075e65] sm:text-4xl">
              What&apos;s available, market by market
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Curriculum coverage differs by country. This is where things
              actually stand, rather than a single global claim.
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#d8e3df] bg-[#fffef9] shadow-[0_6px_20px_rgba(0,65,70,.06)]">
            <div className="grid grid-cols-[.8fr_1.45fr_1.6fr] bg-[#09686d] px-5 py-3 text-xs font-bold uppercase tracking-[.08em] text-white">
              <span>◎&nbsp; Market</span>
              <span>▣&nbsp; Curriculum</span>
              <span>◉&nbsp; Status</span>
            </div>
            {[
              [
                "/images/pricing/country-icons/pakistan.png",
                "Pakistan",
                "National and provincial boards, KG to Grade 10",
                "bg-[#43bf69]",
                "Live and in daily use in schools",
              ],
              [
                "/images/pricing/country-icons/australia.png",
                "Australia",
                "Australian Curriculum, Foundation to Year 10",
                "bg-[#f7b719]",
                "Content readiness being confirmed subject by subject",
              ],
              [
                "/images/pricing/country-icons/uk.png",
                "United Kingdom",
                "National Curriculum",
                "bg-[#9a9a96]",
                "Not yet confirmed",
              ],
              [
                "/images/pricing/country-icons/usa.png",
                "United States",
                "State standards vary",
                "bg-[#9a9a96]",
                "Not yet confirmed",
              ],
              [
                "/images/home-education/different-places-globe-icon.png",
                "Other markets",
                "Cambridge, Oxford, Pearson and other international curricula",
                "bg-[#438bd0]",
                "Assessed on demand and content readiness",
              ],
            ].map(([flag, market, curriculum, dot, status]) => (
              <div
                key={market}
                className="grid grid-cols-[.8fr_1.45fr_1.6fr] items-center border-t border-[#ebe7dc] px-5 py-3 text-xs sm:text-sm"
              >
                <b className="flex items-center gap-3 text-[#334155]">
                  <span className="relative h-6 w-8 shrink-0 overflow-hidden rounded-sm">
                    <Image
                      src={flag}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </span>
                  {market}
                </b>
                <span className="pr-4 text-slate-600">{curriculum}</span>
                <span className="flex items-center gap-3 text-slate-600">
                  <i className={`h-3 w-3 shrink-0 rounded-full ${dot}`} />
                  {status}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-5 rounded-xl border-2 border-dashed border-[#efb32b] bg-[#fffdf5] p-5 sm:flex-row sm:items-center">
            <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/paper-generator/generated/market-specifics-icon.png"
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </span>
            <div className="flex-1">
              <h3 className="font-bold text-[#075e65]">
                Pakistan specifics are not global defaults
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Board-specific formats, local payment routes and Grade 10
                syllabus structures apply to Pakistan. They are not how the
                product behaves in Australia, the UK or the USA, and should not
                be read as such.
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase text-[#e99a05]">
                Per-market curriculum readiness to be confirmed before any
                market is described as available
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-[#08777c] px-5 text-xs font-bold text-white"
            >
              ▣&nbsp; View Supported Curricula
            </Link>
          </div>
          <div className="mt-3 flex flex-col gap-5 rounded-xl border-2 border-dashed border-[#efb32b] bg-[#fffdf5] p-5 sm:flex-row sm:items-center">
            <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/paper-generator/generated/sample-content-icon.png"
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </span>
            <div className="flex-1">
              <h3 className="font-bold text-[#075e65]">
                Combining chapters into one paper
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Building a single paper that spans several chapters or topics at
                once. This may already work for school accounts; that does not
                mean it works the same way for a family, home-education or tutor
                account.
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase text-[#e99a05]">
                Availability per account type to be confirmed with engineering
                before publishing as live
              </p>
            </div>
            <span className="relative h-24 w-44 shrink-0 overflow-hidden">
              <Image
                src="/images/paper-generator/generated/combine-chapters-icon.png"
                alt=""
                fill
                sizes="176px"
                className="object-contain"
              />
            </span>
          </div>{" "}
        </div>
      </section>
      <section className="relative min-h-[250px] overflow-hidden">
        <Image
          src="/images/paper-generator/generated/build-first-paper-cta-v2.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#004c55]/55" />
        <div className="relative z-10 mx-auto flex min-h-[250px] max-w-7xl items-center justify-center px-3 text-center sm:px-4 lg:px-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Build your first paper
            </h2>
            <p className="mt-2 text-sm text-white/90">
              Included with every plan. Available on its own for schools that
              want assessment only.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/papergenerator/demo"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#f4a40a] px-7 text-sm font-bold text-white"
              >
                Create a Paper
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center justify-center rounded-md border border-white px-7 text-sm font-bold text-white"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfdfc] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase text-[#ef9707]">
              The small print, said plainly
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#075e65]">
              Things worth knowing before you pay
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {smallPrint.map(([image, title, copy]) => (
              <GeneratedCard
                key={title}
                image={image}
                title={title}
                copy={copy}
              />
            ))}
          </div>
          <div className="mt-5 flex items-center gap-4 rounded-xl border border-dashed border-[#efb32b] bg-[#fffaf0] p-5">
            <Image
              src="/images/tutors/closing-sections/on-tax-v2.png"
              alt=""
              width={72}
              height={72}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold text-[#075e65]">On tax</h3>
              <p className="mt-1 text-xs text-slate-600">
                Whether the figures shown include GST or VAT determines the
                final amount you pay, and consumer price display rules differ by
                market.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-[210px] overflow-hidden text-center text-white">
        <Image
          src="/images/paper-generator/generated/start-free-cta.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#006269]/45" />
        <div className="relative z-10 mx-auto flex min-h-[210px] max-w-7xl items-center justify-center px-3 py-8 sm:px-4 lg:px-6">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Start free, decide later
            </h2>
            <p className="mt-2 text-sm text-white/90">
              No card to try it. Move to a paid plan when it&apos;s earning its
              place.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href={SignupLink}
                className="inline-flex h-11 min-w-32 items-center justify-center rounded-md bg-[#f4a40a] px-7 text-sm font-bold text-white shadow-[0_6px_16px_rgba(244,164,10,.25)]"
              >
                Start Free
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 min-w-32 items-center justify-center rounded-md border border-white/90 bg-[#075d64]/30 px-7 text-sm font-bold text-white"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
