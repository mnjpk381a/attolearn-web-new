import Link from "next/link";
import {
  BadgeInfo,
  Building2,
  Check,
  GraduationCap,
  Users,
} from "lucide-react";
import { type CountryPricing, formatPrice } from "@/lib/pricing";

type PlanCard = {
  title: string;
  price: number;
  capacity: string;
  features: string[];
  bestFor: string;
  popular?: boolean;
};

// NOTE (AA-6005): prices and student capacities are approved. The feature
// bullets for Tutor Lite and the three Centre plans are drafted from the
// existing page copy and still need Product Owner sign-off.
function tutorPlans(pricing: CountryPricing): PlanCard[] {
  return [
    {
      title: "Tutor Lite",
      price: pricing.tutor.lite,
      capacity: "5 active students",
      features: [
        "Create learner profiles",
        "Assign practice and revision",
        "Basic diagnostic dashboard",
        "Basic reports",
      ],
      bestFor: "Best for a tutor with a handful of students.",
    },
    {
      title: "Tutor Starter",
      price: pricing.tutor.starter,
      capacity: "10 active students",
      features: [
        "Create learner profiles",
        "Assign practice and revision",
        "Basic diagnostic dashboard",
        "Basic reports",
      ],
      bestFor: "Best for a tutor building a regular practice.",
    },
    {
      title: "Tutor Growth",
      price: pricing.tutor.growth,
      capacity: "25 active students",
      features: [
        "Everything in Starter",
        "Full diagnostic dashboard",
        "Standard reports",
        "Room to grow without changing plan",
      ],
      bestFor: "Best for an established tutor.",
      popular: true,
    },
    {
      title: "Tutor Pro",
      price: pricing.tutor.pro,
      capacity: "50 active students",
      features: [
        "Everything in Growth",
        "Advanced reports",
        "Priority support",
        "Highest published tier capacity",
      ],
      bestFor: "Best for a high-volume tutor.",
    },
  ];
}

function centrePlans(pricing: CountryPricing): PlanCard[] {
  return [
    {
      title: "Centre Starter",
      price: pricing.centre.starter,
      capacity: "10 active students",
      features: [
        "Several tutors, one workspace",
        "Staff accounts and role-based access",
        "Learner allocation across tutors",
        "Learning history stays with the centre",
      ],
      bestFor: "Best for a small or newly opened centre.",
    },
    {
      title: "Centre Growth",
      price: pricing.centre.growth,
      capacity: "25 active students",
      features: [
        "Everything in Centre Starter",
        "Full diagnostic dashboard",
        "Standard reports",
        "Shared assessment from one question bank",
      ],
      bestFor: "Best for a growing centre.",
      popular: true,
    },
    {
      title: "Centre Pro",
      price: pricing.centre.pro,
      capacity: "50 active students",
      features: [
        "Everything in Centre Growth",
        "Advanced reports",
        "Priority support",
        "Highest published tier capacity",
      ],
      bestFor: "Best for an established centre.",
    },
  ];
}

export default function TutorCentrePlans({
  audience,
  pricing,
}: {
  audience: "tutor" | "centre";
  pricing: CountryPricing;
}) {
  const isTutor = audience === "tutor";
  const plans = isTutor ? tutorPlans(pricing) : centrePlans(pricing);

  return (
    <div className="mt-9">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-[#075966] sm:text-4xl">
          {isTutor
            ? "Priced by the students you manage"
            : "Priced for a centre and its team"}
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600">
          {isTutor
            ? "For independent tutors running their own practice. If a parent invites you to support their child, you pay nothing — you pay when you bring your own students."
            : "For tuition centres with more than one tutor or staff account. Each plan includes the shared centre workspace and is priced by the active students the centre manages."}
        </p>
      </div>

      {isTutor ? (
        <div className="mt-7 flex flex-col items-center gap-5 rounded-xl border border-[#c5e7e8] bg-[#eefafa] p-6 text-left md:flex-row">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#d8f4f2] text-[#087f84]">
            <GraduationCap className="size-9" />
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#075966]">
              Invited by a parent? There&apos;s no charge
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              A tutor a family invites is included in that family&apos;s plan.
              You get scoped access to their child, and no bill. A paid plan is
              for running your own practice.
            </p>
          </div>
          <Link
            href="/tutors"
            className="inline-flex h-12 shrink-0 items-center rounded-lg bg-[#067b82] px-7 font-bold text-white"
          >
            How tutor access works
          </Link>
        </div>
      ) : (
        <div className="mt-7 flex flex-col items-center gap-5 rounded-xl border border-[#c5e7e8] bg-[#eefafa] p-6 text-left md:flex-row">
          <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#d8f4f2] text-[#087f84]">
            <Building2 className="size-9" />
          </span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#075966]">
              Tutoring on your own?
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Centre plans are for a team sharing one workspace. If you work
              alone, the Independent Tutor plans cost less for the same number
              of students.
            </p>
          </div>
          <Link
            href="/tuition-centres"
            className="inline-flex h-12 shrink-0 items-center rounded-lg bg-[#067b82] px-7 font-bold text-white"
          >
            For Tuition Centres
          </Link>
        </div>
      )}

      <div
        className={`mt-7 grid gap-5 sm:grid-cols-2 ${isTutor ? "xl:grid-cols-4" : "lg:grid-cols-3"}`}
      >
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={`relative flex min-h-92 flex-col rounded-xl bg-white p-7 text-left shadow-[0_8px_24px_rgba(20,65,68,.06)] ${plan.popular ? "border-2 border-[#f5a000] bg-[#fffdf7]" : "border border-[#cbdde0]"}`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-5 rounded-full bg-[#f5a000] px-5 py-1.5 text-sm font-bold text-white">
                Most popular
              </span>
            )}
            <h3 className="text-xl font-extrabold text-[#075966]">
              {plan.title}
            </h3>
            <p className="mt-1 flex flex-wrap items-end gap-1 text-[#075966]">
              <span className="text-3xl font-extrabold">
                {formatPrice(pricing.currency, plan.price)}
              </span>
              <span className="pb-1 text-sm font-bold">/mo</span>
            </p>
            <p className="text-sm text-slate-600">{plan.capacity}</p>
            <ul className="mt-5 space-y-3">
              {plan.features.map((feature) => (
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
              {plan.bestFor}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-5 text-center text-sm text-slate-600">
        Prices are per month in {pricing.currency}, billed monthly.{" "}
        {isTutor ? "Teaching" : "Managing"} more than 50 active students?{" "}
        <Link href="/contact" className="font-bold text-[#067b82] underline">
          Talk to us
        </Link>{" "}
        about a larger arrangement.
      </p>

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
            billing period. Dormant learners on your roster do not count against
            your plan.
          </p>
        </div>
      </div>

      {!isTutor && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-extrabold text-[#075966]">
            The workspace built for a team
          </h3>
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
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
