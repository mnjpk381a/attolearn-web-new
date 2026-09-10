"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeInfo,
  Building2,
  Check,
  FileText,
  MessageCircle,
  Percent,
  Tag,
  UserRound,
  Users,
} from "lucide-react";
import { useState } from "react";

const countries = ["Australia", "USA", "UK", "Pakistan"] as const;
const countryFlags: Record<(typeof countries)[number], string> = {
  Australia: "/images/pricing/country-icons/australia-flag.png",
  USA: "/images/pricing/country-icons/usa.png",
  UK: "/images/pricing/country-icons/uk.png",
  Pakistan: "/images/pricing/country-icons/pakistan.png",
};
const pricingByCountry: Record<
  (typeof countries)[number],
  {
    familyMonthly: string;
    familyAnnual: string;
    fourthChild: string;
    tutorPlans: [string, string, string];
    extraStudent: string;
  }
> = {
  Australia: {
    familyMonthly: "A$10",
    familyAnnual: "A$96",
    fourthChild: "A$3",
    tutorPlans: ["A$29", "A$49", "A$89"],
    extraStudent: "A$2",
  },
  USA: {
    familyMonthly: "US$10",
    familyAnnual: "US$96",
    fourthChild: "US$3",
    tutorPlans: ["US$29", "US$49", "US$89"],
    extraStudent: "US$2",
  },
  UK: {
    familyMonthly: "£9",
    familyAnnual: "£86",
    fourthChild: "£2",
    tutorPlans: ["£25", "£45", "£79"],
    extraStudent: "£2",
  },
  Pakistan: {
    familyMonthly: "PKR 300",
    familyAnnual: "PKR 2,900",
    fourthChild: "PKR 75",
    tutorPlans: ["PKR 900", "PKR 1,500", "PKR 2,500"],
    extraStudent: "PKR 75",
  },
};
const audiences = [
  { label: "Families", icon: Users },
  { label: "Tuition", icon: UserRound },
  { label: "Tuition Centre", icon: Building2 },
] as const;
const schoolCards = [
  {
    title: "Modules",
    copy: "School Management, Paper Generator, Adaptive Learning — or a combination.",
    image: "/images/pricing/school-icons/modules.png",
  },
  {
    title: "School size",
    copy: "Students, staff and campuses covered.",
    image: "/images/pricing/school-icons/school-size.png",
  },
  {
    title: "Custom quote",
    copy: "Agreed in writing, with a pilot-first approach where it fits.",
    image: "/images/pricing/school-icons/custom-quote.png",
  },
  {
    title: "Paper Generator",
    copy: "Create curriculum-aligned assessment papers for your learners.",
    image: "/images/pricing/school-icons/paper-generator.png",
    action: true,
  },
] as const;
const smallPrint = [
  {
    title: "Prices are local",
    copy: "Each market is priced in its own currency, not converted from US dollars.",
    image: "/images/pricing/small-print-icons/prices-local.png",
  },
  {
    title: "Cancel any time",
    copy: "Monthly plans stop at the end of the period you’ve paid for.",
    image: "/images/pricing/small-print-icons/cancel-any-time.png",
  },
  {
    title: "Your records stay yours",
    copy: "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
    image: "/images/pricing/small-print-icons/records-stay-yours.png",
  },
  {
    title: "One invited tutor is free",
    copy: "A tutor a parent invites is included — the tutor is never billed for that family.",
    image: "/images/pricing/small-print-icons/invited-tutor-free.png",
  },
] as const;

export default function PricingPage() {
  const [country, setCountry] =
    useState<(typeof countries)[number]>("Australia");
  const [audience, setAudience] = useState("Families");
  const pricing = pricingByCountry[country];
  return (
    <main className="overflow-hidden bg-[#fffefb] text-[#092f3d]">
      <section className="pricing-hero relative flex min-h-0 items-center overflow-hidden bg-[#f8fdff] px-4 py-7 text-center sm:min-h-130 sm:py-10 lg:h-110 lg:min-h-0 lg:py-6">
        <Image
          src="/images/pricing/pricing-hero-background-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-fill object-center lg:block"
        />
        <div className="site-container relative mx-auto">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#8bd8db] bg-[#eafafa]/90 px-5 py-2 text-xs font-bold tracking-[.12em] text-[#087d86]">
            <Tag className="h-4 w-4" /> PRICING
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl font-extrabold leading-[1.03] text-[#063b57] sm:mt-5">
            Priced by how you use
            <br />
            <span className="text-[42px] font-extrabold text-[#07939b] sm:text-[56px]">
              Atto
            </span>
            <span className="text-[42px] font-extrabold text-[#ffad0b] sm:text-[56px]">
              Learn
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-5 text-[#34445c] sm:mt-4 sm:text-base sm:leading-6">
            Families pay a household price, not a price per child. Tutors pay
            for the students they manage. Centres and schools are quoted.
            Nothing is blended into a single confusing list.
          </p>
          <div className="mt-4 flex flex-col justify-center gap-3 sm:mt-5 sm:flex-row sm:gap-4">
            <Link
              href="#"
              className="inline-flex h-12 min-w-56 items-center justify-center gap-5 rounded-lg bg-linear-to-r from-[#ff9800] to-[#ffb20b] px-8 font-bold text-white shadow-lg shadow-amber-200/50 sm:h-14"
            >
              Start Free <ArrowRight className="h-5 w-5" />
            </Link>
            {audience === "Tuition Centre" && (
              <Link
                href="#"
                className="inline-flex h-12 min-w-56 items-center justify-center gap-5 rounded-lg border-2 border-[#07949a] bg-white/95 px-8 font-bold text-[#087e82] sm:h-14"
              >
                Talk to Sales <MessageCircle className="h-5 w-5" />
              </Link>
            )}
          </div>
          <div className="relative -mx-3 mt-4 aspect-4/3 overflow-hidden sm:-mx-4 lg:hidden">
            <Image
              src="/images/pricing/pricing-hero-mobile-v1.png"
              alt="AttoLearn owl and pricing options"
              fill
              priority
              sizes="100vw"
              className="object-fill object-center"
            />
          </div>
        </div>
      </section>
      <section className="site-container relative z-10 mt-0 text-center lg:-mt-9">
        <h2 className="inline-flex items-center gap-4 text-lg font-bold before:h-px before:w-14 before:bg-[#22b9ae] after:h-px after:w-14 after:bg-[#22b9ae]">
          Your country
        </h2>
        <div className="mx-auto mt-3 grid max-w-2xl grid-cols-2 overflow-hidden rounded-lg bg-white shadow-[0_10px_32px_rgba(20,65,68,.13)] sm:grid-cols-4">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`flex h-14 items-center justify-center gap-3 text-sm font-semibold transition ${country === c ? "bg-[#076d76] text-white" : "text-[#233443] hover:bg-teal-50"}`}
            >
              <span className="relative h-7 w-7 shrink-0">
                <Image
                  src={countryFlags[c]}
                  alt=""
                  fill
                  sizes="28px"
                  className="object-contain"
                />{" "}
              </span>
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="site-container">
        <div className="mx-auto grid max-w-3xl overflow-hidden rounded-xl border border-[#0b7f87] sm:grid-cols-3">
          {audiences.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              disabled={label === "Tuition Centre"}
              onClick={() => setAudience(label)}
              className={`flex h-14 items-center justify-center gap-4 border-[#0b7f87] font-bold sm:border-r last:border-r-0 ${audience === label ? "bg-[#056d77] text-white" : "bg-white text-[#075966]"} disabled:cursor-not-allowed`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
        {audience === "Families" ? (
          <div className="mt-9">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#075966] sm:text-4xl">
                One plan for the household
              </h2>
              <p className="mt-3 text-base text-slate-600 sm:text-lg">
                Up to three children included. A fourth child costs{" "}
                {pricing.fourthChild} per month, not four times as much.
              </p>
            </div>

            <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
              <article className="flex min-h-105 flex-col rounded-xl border border-[#cbdde0] bg-white p-7 text-left shadow-[0_8px_24px_rgba(20,65,68,.06)]">
                <h3 className="text-2xl font-extrabold text-[#075966]">
                  Free Starter
                </h3>
                <p className="mt-1 text-4xl font-extrabold text-[#075966]">
                  Free
                </p>
                <p className="text-base text-slate-700">No card required</p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Try adaptive learning with your child",
                    "See how the parent view works",
                    "Limited practice volume",
                    "Upgrade whenever you’re ready",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-base text-slate-700"
                    >
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#0b9698] text-white">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-slate-200 pt-5 text-sm text-slate-600">
                  No card required. Explore the parent experience before you
                  upgrade.
                </p>
              </article>

              <article className="relative flex min-h-105 flex-col rounded-xl border-2 border-[#f5a000] bg-[#fffdf7] p-7 text-left shadow-[0_8px_24px_rgba(245,160,0,.08)]">
                <span className="absolute -top-4 left-7 rounded-full bg-[#f5a000] px-5 py-1.5 text-sm font-bold text-white">
                  Most popular
                </span>
                <h3 className="text-2xl font-extrabold text-[#075966]">
                  AttoLearn Family
                </h3>
                <p className="mt-1 flex items-end gap-2 text-[#075966]">
                  <span className="text-5xl font-extrabold">
                    {pricing.familyMonthly}
                  </span>
                  <span className="pb-1 text-base">per month</span>
                </p>
                <p className="text-base text-slate-700">
                  or {pricing.familyAnnual} a year — roughly two months free
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Up to 3 children included",
                    "All available subjects for your curriculum",
                    "Full adaptive learning and Today’s Best Step",
                    "Parent dashboard and progress reports",
                    "1 tutor included — a tutor you invite costs nothing",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-base text-slate-700"
                    >
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#f5a000] text-white">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-slate-200 pt-5 text-sm text-slate-600">
                  Up to 3 children included. Add another child whenever your
                  household needs it.
                </p>
              </article>
            </div>

            <div className="mx-auto mt-6 grid max-w-4xl gap-4">
              <div className="flex flex-col gap-5 rounded-xl border border-[#aadbdc] bg-[#f0fbfb] p-6 text-left sm:flex-row sm:items-center">
                <span className="grid size-20 shrink-0 place-items-center rounded-full bg-white text-3xl shadow-sm">
                  👨‍👩‍👧
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#075966]">
                    One plan, one household
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Children share one family account while keeping their own
                    learning path, evidence and progress.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 rounded-xl border border-[#f4cf87] bg-[#fffaf0] p-6 text-left sm:flex-row sm:items-center">
                <span className="grid size-20 shrink-0 place-items-center rounded-full bg-white text-3xl shadow-sm">
                  🌏
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#075966]">
                    Local pricing for your country
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    The displayed family price follows the country selected
                    above and is shown in its local currency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : audience === "Tuition" ? (
          <div className="mt-9">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#075966] sm:text-4xl">
                Priced by the students you manage
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600">
                The same plans whether you tutor alone or run a centre. If a
                parent invites you to support their child, you pay nothing — you
                pay when you bring your own students.
              </p>
            </div>

            <div className="mt-7 flex flex-col items-center gap-5 rounded-xl border border-[#c5e7e8] bg-[#eefafa] p-6 text-left md:flex-row">
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#d8f4f2] text-[#087f84]">
                <UserRound className="size-9" />
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#075966]">
                  Invited by a parent? There&apos;s no charge
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A tutor a family invites is included in that family&apos;s
                  plan. You get scoped access to their child, and no bill. A
                  paid plan is for running your own practice or centre.
                </p>
              </div>
              <Link
                href="/tutors"
                className="inline-flex h-12 shrink-0 items-center rounded-lg bg-[#067b82] px-7 font-bold text-white"
              >
                How tutor access works
              </Link>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {[
                [
                  "Tutor Starter",
                  pricing.tutorPlans[0],
                  "10 active students",
                  [
                    "Create learner profiles",
                    "Assign practice and revision",
                    "Basic diagnostic dashboard",
                    "Basic reports",
                  ],
                ],
                [
                  "Tutor Growth",
                  pricing.tutorPlans[1],
                  "25 active students",
                  [
                    "Everything in Starter",
                    "Full diagnostic dashboard",
                    "Standard reports",
                    "Room to grow without changing plan",
                  ],
                ],
                [
                  "Tutor Pro",
                  pricing.tutorPlans[2],
                  "50 active students",
                  [
                    "Everything in Growth",
                    "Advanced reports",
                    "Priority support",
                    "Highest published tier capacity",
                  ],
                ],
              ].map(([title, price, capacity, features], index) => (
                <article
                  key={title as string}
                  className={`relative flex min-h-92 flex-col rounded-xl bg-white p-7 text-left shadow-[0_8px_24px_rgba(20,65,68,.06)] ${index === 1 ? "border-2 border-[#f5a000] bg-[#fffdf7]" : "border border-[#cbdde0]"}`}
                >
                  {index === 1 && (
                    <span className="absolute -top-4 left-5 rounded-full bg-[#f5a000] px-5 py-1.5 text-sm font-bold text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-extrabold text-[#075966]">
                    {title as string}
                  </h3>
                  <p className="mt-1 flex items-end gap-1 text-[#075966]">
                    <span className="text-4xl font-extrabold">
                      {price as string}
                    </span>
                    <span className="pb-1 text-sm font-bold">/mo</span>
                  </p>
                  <p className="text-sm text-slate-600">{capacity as string}</p>
                  <ul className="mt-5 space-y-3">
                    {(features as string[]).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#0b9698] text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-slate-200 pt-5 text-sm text-slate-600">
                    {index === 0
                      ? "Best for a tutor starting out, or a small centre."
                      : index === 1
                        ? "Best for an established tutor or a growing centre."
                        : "Best for a high-volume tutor or an established centre."}
                  </p>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-7 max-w-4xl text-center">
              <h3 className="text-2xl font-extrabold text-[#075966]">
                Growing past your plan
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Add students between tiers, or move up. You are never forced to
                jump a whole tier for one extra learner.
              </p>
              <div className="mt-5 overflow-hidden rounded-xl border border-[#bcdde0] text-left">
                <div className="grid grid-cols-[0.8fr_2fr] bg-[#eaf8f8] px-5 py-3 text-xs font-extrabold uppercase text-[#075966]">
                  <span>Active students</span>
                  <span>What you pay</span>
                </div>
                {[
                  ["1–10", "Tutor Starter"],
                  ["11–15", "Starter plus extra-student add-ons"],
                  ["16–25", "Tutor Growth"],
                  ["26–35", "Growth plus extra-student add-ons"],
                  ["36–50", "Tutor Pro"],
                  [
                    "More than 50",
                    "Continue with add-ons, or talk to us about a larger arrangement",
                  ],
                ].map(([range, payment]) => (
                  <div
                    key={range}
                    className="grid grid-cols-[0.8fr_2fr] border-t border-[#d6e5e7] px-5 py-3 text-sm text-slate-700"
                  >
                    <span>{range}</span>
                    <span>{payment}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Extra students: {pricing.extraStudent} each per month. Annual
                billing is available at approximately ten months&apos; price for
                twelve months&apos; access.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-5 rounded-xl border border-[#f4cf87] bg-[#fffaf0] p-6 text-left sm:flex-row sm:items-center">
              <span className="grid size-18 shrink-0 place-items-center rounded-full bg-[#fff1c9] text-[#e28a00]">
                <BadgeInfo className="size-9" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#075966]">
                  What counts as an active student
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A learner with an active goal, assignment, learning session,
                  reportable activity or tutor-managed record during the current
                  billing period. Dormant learners on your roster do not count
                  against your plan.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-extrabold text-[#075966]">
                Running a tuition centre
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Centres use these same plans. What you get in addition is the
                workspace built for a team.
              </p>
              <div className="mt-5 grid gap-4 text-left md:grid-cols-3">
                {[
                  [
                    "Several tutors, one workspace",
                    "Staff, accounts, learner allocation and role-based access.",
                  ],
                  [
                    "The centre keeps the evidence",
                    "When a tutor leaves, the learning history stays with the centre.",
                  ],
                  [
                    "Shared assessment",
                    "Every tutor building papers the same way from the same bank.",
                  ],
                ].map(([title, copy]) => (
                  <article
                    key={title}
                    className="rounded-xl border border-[#cbdde0] bg-white p-6"
                  >
                    <Users className="size-7 text-[#078b90]" />
                    <h4 className="mt-4 font-bold text-[#075966]">{title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {copy}
                    </p>
                  </article>
                ))}
              </div>
              <div className="mt-5 flex flex-col items-center gap-5 rounded-xl border border-[#f4cf87] bg-[#fffaf0] p-6 text-left md:flex-row">
                <Building2 className="size-12 shrink-0 text-[#e28a00]" />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#075966]">
                    Two things a centre should confirm with us first
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Whether a plan covers the workspace for each centre account,
                    and what applies beyond 50 active students.
                  </p>
                </div>
                <Link
                  href="/tuition-centres"
                  className="inline-flex h-12 shrink-0 items-center rounded-lg bg-[#078b90] px-7 font-bold text-white"
                >
                  For Tuition Centres
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <div className="mt-7 text-center">
              <h2 className="text-3xl font-extrabold text-[#073a49]">
                {audience === "Tuition Centre"
                  ? "Schools are quoted by modules and size"
                  : audience === "Families"
                    ? "Simple family-first pricing"
                    : "Flexible pricing for managed learners"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {audience === "Tuition Centre"
                  ? "School pricing is kept entirely separate from family pricing. A school licence is not a bundle of family plans."
                  : "Choose the setup that fits how you support learning."}
              </p>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {schoolCards.map((card) => (
                <article
                  key={card.title}
                  className="flex min-h-72 flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-6 text-center shadow-[0_10px_28px_rgba(34,61,65,.08)]"
                >
                  <span className="relative h-24 w-24">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#075966]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {card.copy}
                  </p>
                  {"action" in card && card.action && (
                    <Link
                      href="/papergenerator"
                      className="mt-auto inline-flex items-center gap-2 rounded-md border border-[#07808a] px-3 py-2 text-xs font-bold text-[#076d76]"
                    >
                      <FileText className="h-4 w-4" />
                      Explore Paper Generator
                    </Link>
                  )}
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-col items-center gap-6 rounded-xl border border-[#aadbdc] bg-[#f0fbfb] p-6 md:flex-row">
              <span className="relative h-28 w-36 shrink-0">
                <Image
                  src="/images/pricing/school-icons/school-size.png"
                  alt=""
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#075966]">
                  Family and school pricing never mix
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Where a school covers adaptive learning for its families,
                  families are told plainly that access is school-covered. If
                  that school access ends, families keep the learning history
                  and can continue independently on a Family Plan.
                </p>
                <p className="mt-2 text-xs font-bold text-[#075966]">
                  School licence rates require commercial approval before any
                  figure is quoted.
                </p>
              </div>
              <Link
                href="/schools"
                className="inline-flex h-12 items-center gap-3 rounded-lg bg-[#056d77] px-6 font-bold text-white"
              >
                <Building2 className="h-5 w-5" />
                For Schools
              </Link>
            </div>
            <div className="mt-5 text-center">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center gap-5 rounded-lg bg-linear-to-r from-[#ff8a00] to-[#ffad0b] px-9 font-bold text-white shadow-lg"
              >
                Book a School Demo <ArrowRight className="h-5 w-5" />
              </Link>
            </div>{" "}
          </>
        )}{" "}
      </section>

      <section className="site-container">
        <div className="flex flex-col items-center gap-7 bg-[#fffaf4] p-7 md:flex-row">
          <span className="relative h-32 w-32 shrink-0">
            <Image
              src="/images/pricing/small-print-icons/published-market.png"
              alt=""
              fill
              sizes="128px"
              className="object-contain"
            />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold">
              One published rate, one market
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              PKR 5,000 per year is the standalone Paper Generator rate
              currently published for Pakistan.
              <br />
              Rates for Australia, the USA and the UK have not been set, and the
              school access plans are not reflected here yet.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#f06d00]">
              <BadgeInfo className="h-5 w-5" />
              Non-Pakistan standalone rates and the three school access tiers
              still to be confirmed
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffefb] px-4 pb-12">
        <div className="site-container text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#08777b]">
            The small print, said plainly
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">
            Things worth knowing before you pay
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-teal-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            <span className="h-px w-12 bg-teal-300" />
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {smallPrint.map((item) => (
              <article
                key={item.title}
                className="min-h-72 rounded-xl border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_28px_rgba(34,61,65,.07)]"
              >
                <span className="relative mx-auto block h-24 w-24">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#075966]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-5 grid items-center gap-5 rounded-xl border border-[#a9dddd] bg-[#f0fbfb] p-6 text-left md:grid-cols-[80px_1fr_1px_1fr]">
            <span className="grid h-18 w-18 place-items-center rounded-full bg-[#36c5b9] text-white shadow-lg">
              <Percent className="h-11 w-11" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#075966]">On tax</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Whether the figures shown include GST or VAT determines the
                final amount you pay, and consumer price display rules differ by
                market.
              </p>
            </div>
            <span className="hidden h-24 w-px bg-[#a9dddd] md:block" />
            <p className="flex items-center gap-4 text-sm leading-6 text-slate-700">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#07939a] font-bold text-white">
                i
              </span>
              Tax-inclusive vs tax-exclusive display to be confirmed per market
              before these prices go live
            </p>
          </div>
        </div>
      </section>

      <section className="pricing-final-cta w-full">
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden px-4 py-8 text-center sm:min-h-68 sm:px-6 lg:min-h-64 lg:py-6">
          <Image
            src="/images/pricing/cta/start-free-wide-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-fill object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-white/20 sm:bg-white/10" />
          <div className="relative z-10 mx-auto w-full max-w-3xl">
            <h2 className="text-3xl font-extrabold text-[#07616a] sm:text-4xl">
              Start free, decide later
            </h2>
            <p className="mt-3 text-sm text-[#07616a] sm:text-base">
              No card to try it. Move to a paid plan when it’s earning its
              place.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="inline-flex h-13 min-w-52 items-center justify-center gap-4 rounded-lg bg-linear-to-r from-[#ff8a00] to-[#ffad0b] px-7 font-bold text-white"
              >
                Start Free <ArrowRight className="h-5 w-5" />
              </Link>
              {audience === "Tuition Centre" && (
                <Link
                  href="/contact"
                  className="inline-flex h-13 min-w-52 items-center justify-center gap-4 rounded-lg border border-[#07808a] bg-white px-7 font-bold text-[#076d76]"
                >
                  Talk to Sales <MessageCircle className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
