"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeInfo,
  Building2,
  Check,
  GraduationCap,
  MessageCircle,
  Percent,
  Tag,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CountrySelector from "@/components/pricing/CountrySelector";
import TutorCentrePlans from "@/components/pricing/TutorCentrePlans";
import {
  DEFAULT_COUNTRY_CODE,
  PRICING_COUNTRY_STORAGE_KEY,
  formatPrice,
  getCountryPricing,
  getFourthChildPrice,
  isPricedCountry,
} from "@/lib/pricing";
import { detectCountryCode } from "@/lib/pricing/detect";

type Audience = "families" | "tutor" | "centre";
const audiences: { id: Audience; label: string; icon: typeof Users }[] = [
  { id: "families", label: "Families", icon: Users },
  { id: "tutor", label: "Independent Tutor", icon: GraduationCap },
  { id: "centre", label: "Tuition Centre", icon: Building2 },
];

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
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [audience, setAudience] = useState<Audience>("families");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  // Set once the visitor picks a country, so a slow lookup never overrides them.
  const countryChosen = useRef(false);

  useEffect(() => {
    let cancelled = false;

    // A country the visitor chose before wins; otherwise detect it from their IP.
    // Anything outside the priced markets leaves the default in place.
    async function resolveCountry() {
      let code = "";
      try {
        code = window.localStorage.getItem(PRICING_COUNTRY_STORAGE_KEY) ?? "";
      } catch {
        // Storage can be unavailable (private mode); fall through to detection.
      }
      if (!isPricedCountry(code)) code = await detectCountryCode();
      if (!cancelled && !countryChosen.current && isPricedCountry(code)) {
        setCountryCode(code.toUpperCase());
      }
    }

    void resolveCountry();
    return () => {
      cancelled = true;
    };
  }, []);

  function selectCountry(code: string) {
    countryChosen.current = true;
    setCountryCode(code);
    try {
      window.localStorage.setItem(PRICING_COUNTRY_STORAGE_KEY, code);
    } catch {
      // The choice still applies for this visit.
    }
  }

  const pricing = getCountryPricing(countryCode);
  const price = (amount: number) => formatPrice(pricing.currency, amount);
  const fourthChild = price(getFourthChildPrice(pricing.code));
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
            Families pay a household price, not a price per child. Tutors and
            tuition centres pay for the students they manage. Schools are
            quoted. Nothing is blended into a single confusing list.
          </p>
          <div className="mt-4 flex flex-col justify-center gap-3 sm:mt-5 sm:flex-row sm:gap-4">
            <Link
              href="#"
              className="inline-flex h-12 min-w-56 items-center justify-center gap-5 rounded-lg bg-linear-to-r from-[#ff9800] to-[#ffb20b] px-8 font-bold text-white shadow-lg shadow-amber-200/50 sm:h-14"
            >
              Start Free <ArrowRight className="h-5 w-5" />
            </Link>
            {audience !== "families" && (
              <Link
                href="/contact"
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
        <CountrySelector value={pricing.code} onChange={selectCountry} />
      </section>

      <section className="site-container">
        <div className="mx-auto grid max-w-3xl overflow-hidden rounded-xl border border-[#0b7f87] sm:grid-cols-3">
          {audiences.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setAudience(id)}
              className={`flex h-14 items-center justify-center gap-4 border-[#0b7f87] font-bold sm:border-r last:border-r-0 ${audience === id ? "bg-[#056d77] text-white" : "bg-white text-[#075966]"} disabled:cursor-not-allowed`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
        {audience === "families" && (
          <div className="mx-auto mt-8 flex w-fit rounded-full border border-[#0b7f87] bg-white p-1 text-sm font-bold">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-5 py-2 ${billingCycle === "monthly" ? "bg-[#056d77] text-white" : "text-[#075966]"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`rounded-full px-5 py-2 ${billingCycle === "annual" ? "bg-[#056d77] text-white" : "text-[#075966]"}`}
            >
              Yearly
            </button>
          </div>
        )}
        {audience === "families" ? (
          <div className="mt-9">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#075966] sm:text-4xl">
                One plan for the household
              </h2>
              <p className="mt-3 text-base text-slate-600 sm:text-lg">
                Up to three children included. A fourth child costs{" "}
                {fourthChild} per month, not four times as much.
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
                    {price(
                      billingCycle === "monthly"
                        ? pricing.family.monthly
                        : pricing.family.annual,
                    )}
                  </span>
                  <span className="pb-1 text-base">
                    {billingCycle === "monthly" ? "per month" : "per year"}
                  </span>
                </p>
                <p className="text-base text-slate-700">
                  {billingCycle === "monthly"
                    ? `or ${price(pricing.family.annual)} a year — roughly two months free`
                    : `or ${price(pricing.family.monthly)} per month, billed monthly`}
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
        ) : (
          <TutorCentrePlans audience={audience} pricing={pricing} />
        )}
      </section>

      <section className="site-container">
        <div className="flex flex-col items-center gap-7 bg-[#fffaf4] p-7 md:flex-row">
          <span className="relative h-32 w-32 shrink-0">
            <Image
              src="/images/pricing/small-print-icons/published-market.png"
              alt=""
              fill
              sizes="128px"
              className="object-cover"
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
                    className="object-cover"
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
          <div className="mt-5 grid items-center gap-5 rounded-xl border border-[#a9dddd] bg-[#f0fbfb] p-6 text-left md:grid-cols-[80px_1fr]">
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
              {audience !== "families" && (
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
