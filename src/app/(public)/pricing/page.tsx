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
  Australia: "/images/pricing/country-icons/australia.png",
  USA: "/images/pricing/country-icons/usa.png",
  UK: "/images/pricing/country-icons/uk.png",
  Pakistan: "/images/pricing/country-icons/pakistan.png",
};
const audiences = [
  { label: "Families", icon: Users },
  { label: "Tutors & Centers", icon: UserRound },
  { label: "Schools", icon: Building2 },
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
  const [audience, setAudience] = useState("Schools");
  return (
    <main className="overflow-hidden bg-[#fffefb] text-[#092f3d]">
      <section className="pricing-hero relative h-[390px] overflow-hidden bg-[radial-gradient(circle_at_18%_5%,#149a9b_0%,#087b80_38%,#03545f_100%)] px-4 pb-20 pt-5 text-center text-white sm:pt-6">
        <div className="absolute inset-x-0 bottom-0 h-16 bg-[#fffefb] [clip-path:polygon(0_50%,5%_32%,13%_43%,27%_75%,43%_57%,58%_48%,78%_80%,92%_38%,100%_45%,100%_100%,0_100%)]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2 text-xs font-bold tracking-[.12em]">
            <Tag className="h-4 w-4" /> PRICING
          </p>
          <h1 className="mt-3 font-extrabold">
            Priced by how you use
            <br />
            <span className="text-[#ffad0b]">AttoLearn</span>
          </h1>
          <span className="mx-auto mt-2 block h-1 w-44 -rotate-2 rounded-full bg-[#ffad0b]" />
          <p className="mx-auto mt-3 max-w-xl text-white/95">
            Families pay a household price, not a price per child.
            <br />
            Tutors pay for the students they manage.
            <br />
            Centres and schools are quoted.
            <br />
            Nothing is blended into a single confusing list.
          </p>
          <p className="mx-auto mt-3 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#05858a]">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            Currently available for English, Mathematics and Science.
          </p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-9 w-full max-w-5xl px-4 text-center">
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
                />
              </span>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/choose-module"
            className="inline-flex h-14 min-w-56 items-center justify-center gap-5 rounded-lg bg-linear-to-r from-[#ff8a00] to-[#ffad0b] px-8 font-bold text-white shadow-lg"
          >
            Start Free <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-14 min-w-56 items-center justify-center gap-5 rounded-lg border border-[#07808a] bg-white px-8 font-bold text-[#076d76]"
          >
            Talk to Sales <MessageCircle className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 pt-12">
        <div className="mx-auto grid max-w-3xl overflow-hidden rounded-xl border border-[#0b7f87] sm:grid-cols-3">
          {audiences.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setAudience(label)}
              className={`flex h-14 items-center justify-center gap-4 border-[#0b7f87] font-bold sm:border-r last:border-r-0 ${audience === label ? "bg-[#056d77] text-white" : "bg-white text-[#075966]"}`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
        <div className="mt-7 text-center">
          <h2 className="text-3xl font-extrabold text-[#073a49]">
            {audience === "Schools"
              ? "Schools are quoted by modules and size"
              : audience === "Families"
                ? "Simple family-first pricing"
                : "Flexible pricing for managed learners"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {audience === "Schools"
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
              {card.action && (
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
              Where a school covers adaptive learning for its families, families
              are told plainly that access is school-covered. If that school
              access ends, families keep the learning history and can continue
              independently on a Family Plan.
            </p>
            <p className="mt-2 text-xs font-bold text-[#075966]">
              School licence rates require commercial approval before any figure
              is quoted.
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col items-center gap-7 rounded-xl border border-[#ff9b43] bg-[#fffaf4] p-7 md:flex-row">
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
        <div className="mx-auto max-w-6xl text-center">
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

      <section className="w-full pb-0">
        <div className="relative flex min-h-[270px] items-center justify-center overflow-hidden px-5 py-8 text-center sm:min-h-[250px]">
          <Image
            src="/images/pricing/cta/start-free-wide-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-fill"
          />
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
                href="/choose-module"
                className="inline-flex h-13 min-w-52 items-center justify-center gap-4 rounded-lg bg-linear-to-r from-[#ff8a00] to-[#ffad0b] px-7 font-bold text-white"
              >
                Start Free <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-13 min-w-52 items-center justify-center gap-4 rounded-lg border border-[#07808a] bg-white px-7 font-bold text-[#076d76]"
              >
                Talk to Sales <MessageCircle className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
