"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Plan, plans } from "@/constants/plans";

function Radio({ checked }: { checked?: boolean }) {
  return (
    <span
      className={[
        "h-4 w-4 rounded-full border flex items-center justify-center",
        checked ? "border-teal-600" : "border-slate-300",
      ].join(" ")}
      aria-hidden="true"
    >
      {checked ? <span className="h-2 w-2 rounded-full bg-teal-600" /> : null}
    </span>
  );
}

function PlanDetailsModal({
  open,
  plan,
  onClose,
}: {
  open: boolean;
  plan: Plan | null;
  onClose: () => void;
}) {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !plan) return null;

  const badgeText = plan.trialText ?? "";

  const priceNode =
    plan.pricingMode === "fixed" ? (
      <div className="text-[15px] font-semibold text-teal-800">
        {plan.fixedPriceText ?? "—"}
      </div>
    ) : (
      <div className="space-y-3">
        <div className="flex justify-center">
          <div className="inline-flex rounded-full bg-gray-200 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={[
                "px-8 py-2 rounded-full text-sm font-semibold transition-all",
                billing === "monthly"
                  ? "bg-teal-700 text-white shadow-md"
                  : "text-gray-600",
              ].join(" ")}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={[
                "px-8 py-2 rounded-full text-sm font-semibold transition-all",
                billing === "annual"
                  ? "bg-teal-700 text-white shadow-md"
                  : "text-gray-600",
              ].join(" ")}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="text-[15px] font-semibold text-teal-800 text-center">
          {billing === "monthly" ? plan.monthly ?? "—" : plan.annual ?? "—"}
        </div>
      </div>
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Plan Details"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />

      <div className="relative w-full max-w-130 h-135 rounded-2xl bg-white border border-slate-200 shadow-[0_25px_90px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[22px] font-bold text-teal-800 leading-tight">
                {plan.title}
              </div>
              <div className="mt-1 text-[14px] text-slate-500 leading-5">
                {plan.subtitle}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 h-9 w-9 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 grid place-items-center"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {badgeText ? (
            <div className="mt-4 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-amber-400 px-5 py-2 text-[13px] font-semibold text-white shadow-sm">
                {badgeText}
              </span>
            </div>
          ) : null}

          <div className={badgeText ? "mt-5" : "mt-6"}>{priceNode}</div>

          <div className="mt-4 flex-1 overflow-y-auto pr-2 simple-scroll">
            <div className="space-y-5">
              {plan.sections?.map((sec, idx) => (
                <div key={`${plan.id}-${idx}`}>
                  {sec.heading ? (
                    <div className="text-[14px] font-bold text-slate-900 mb-2">
                      {sec.heading}
                    </div>
                  ) : null}

                  <ul className="space-y-2.5">
                    {sec.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[14px] text-slate-700"
                      >
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-emerald-50 grid place-items-center shrink-0">
                          <svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5 text-emerald-600"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M20 6 9 17l-5-5"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span className="leading-5">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <a
              href={plan.selectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-8 rounded-xl bg-[#007381] text-sm font-semibold text-white hover:bg-teal-700 shadow-sm inline-flex items-center justify-center"
            >
              Select Plan
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
  onViewDetails,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
  onViewDetails: () => void;
}) {
  const priceLine =
    plan.pricingMode === "fixed"
      ? plan.fixedPriceText
      : plan.monthly || plan.annual || "";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect();
      }}
      className={[
        "relative w-full rounded-2xl border bg-white shadow-sm overflow-visible",
        "px-5 py-3 text-left",
        "h-30 flex flex-col justify-between",
        "cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-200",
        selected
          ? "border-teal-600 ring-1 ring-teal-100"
          : "border-slate-200 hover:border-slate-300",
      ].join(" ")}
    >
      {plan.isPopular ? (
        <div className="absolute -top-3 left-6 z-10">
          <span className="bg-amber-400 text-white text-[12px] font-semibold px-4 py-1 rounded-full shadow">
            Most Popular
          </span>
        </div>
      ) : null}

      <div className="absolute right-4 top-4">
        <Radio checked={selected} />
      </div>

      <div>
        <div className="text-[18px] font-bold text-slate-900 leading-6">
          {plan.title}
        </div>

        <div className="mt-1 text-[14px] text-slate-500 truncate">
          {plan.subtitle}
        </div>

        <div className="h-3.5 text-[12.5px] text-slate-700 flex items-center" />
      </div>

      <div className="flex items-center justify-between w-full gap-3">
        <div className="text-[13px] whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="text-teal-700 underline underline-offset-2">
            {priceLine || plan.trialText || "View pricing"}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
          className="h-8 px-5 flex items-center justify-center rounded-lg bg-[#007381] text-white text-[12.5px] font-semibold hover:bg-teal-700 shrink-0"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function ChoosePlanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSelected = (() => {
    const planParam = searchParams.get("plan");

    if (!planParam) return null;

    const planId = Number(planParam);
    const validPlan = plans.find((p) => p.id === planId);

    return validPlan ? planId : null;
  })();

  const [selected, setSelected] = useState<number | null>(initialSelected);
  const [open, setOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<Plan | null>(null);

  const hasQueryParam = searchParams.get("plan") !== null;
  const displayPlans = hasQueryParam ? plans.filter((p) => p.id !== 1) : plans;

  const openDetails = (p: Plan) => {
    setActivePlan(p);
    setOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#f6f2ff]">
      <PlanDetailsModal
        key={activePlan?.id ?? "no-plan"}
        open={open}
        plan={activePlan}
        onClose={() => {
          setOpen(false);
          setActivePlan(null);
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <div
            className="relative rounded-3xl overflow-hidden bg-cover bg-center text-white shadow-lg"
            style={{ backgroundImage: "url('/images/Stats/AB.png')" }}
          >
            <div className="h-full px-6 py-8 sm:p-8 flex flex-col">
              <div className="flex justify-center">
                <Image
                  src="/images/Stats/AttoLearn-Logo_footer.png"
                  alt="AttoLearn"
                  width={170}
                  height={50}
                  priority
                  className="h-auto w-auto"
                />
              </div>

              <div className="mt-8 sm:mt-10 text-left">
                <h2 className="text-[18px] sm:text-[20px] font-bold leading-tight">
                  Start Managing Smarter Today
                </h2>

                <p className="mt-4 sm:mt-6 text-[16px] sm:text-[18px] font-medium max-w-[34ch] leading-7">
                  Choose the right plan to power your entire educational
                  ecosystem.
                </p>
              </div>

              <div className="flex-1 grid place-items-center mt-8 sm:mt-10">
                <div className="-translate-y-4 sm:-translate-y-6 w-full max-w-105">
                  <Image
                    src="/images/Banners/School-management.png"
                    alt="Illustration"
                    width={420}
                    height={340}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white/60 backdrop-blur border border-white/60 shadow-lg">
            <div className="p-8">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-[24px] font-bold text-slate-900">
                    Choose a Plan
                  </div>
                  <div className="mt-1 text-[14px] font-medium text-slate-500">
                    Pick the best plan for your school
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                  30-Day Free Trial
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {displayPlans.map((p) => (
                  <PlanCard
                    key={p.id}
                    plan={p}
                    selected={selected === p.id}
                    onSelect={() => {
                      setSelected(p.id);
                      router.replace(p.selectLink);
                    }}
                    onViewDetails={() => openDetails(p)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChoosePlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f6f2ff]" />}>
      <ChoosePlanContent />
    </Suspense>
  );
}
