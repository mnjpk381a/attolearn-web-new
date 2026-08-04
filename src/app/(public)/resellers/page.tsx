// app/resellers/page.tsx  (Next.js App Router)
// ✅ Next.js + TypeScript + Tailwind + Responsive
// ✅ Country filter tabs
// ✅ Reseller card with Read More / Read Less (clamp)
// ✅ FAQ accordion (pure React, no bootstrap/js)
// ✅ “Become a Reseller” button (top-right on desktop, stacked on mobile)

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

type Country = "Pakistan" | "India" | "Kenya" | "Philippines" | "Sri Lanka";

type Reseller = {
  id: string;
  country: Country;
  name: string;
  role?: string;
  img: string;
  bio: string;
};

type FaqItem = {
  id: string;
  group: string;
  q: string;
  a: React.ReactNode;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ResellersPage() {
  // ---------------- Data ----------------
  const countries: Country[] = useMemo(
    () => ["Pakistan", "India", "Kenya", "Philippines", "Sri Lanka"],
    [],
  );

  const resellers: Reseller[] = useMemo(
    () => [
      {
        id: "pk-ashfaq",
        country: "Pakistan",
        name: "Rana Muhammad Ashfaq",
        img: "/images/team-img/Atto-Ashfaq.png",
        bio: "A seasoned educationist with decades of experience in teaching, curriculum development, educational leadership, and policy formulation. Renowned for shaping academic excellence, mentoring educators, and fostering enriched learning environments across institutions.",
      },
      // Add more resellers here the same way and set their country
    ],
    [],
  );

  const faqs: FaqItem[] = useMemo(
    () => [
      {
        id: "b1",
        group: "Becoming a Reseller",
        q: "Who can become an AttoLearn reseller?",
        a: (
          <p>
            Any organization or proprietorship which is currently engaged with
            educational institutions or schools in capacity of but not limited
            to managing schools, supplying services or hardware tools and
            support, and providing academic consultations. The entity should be
            locally present in the region of service.
          </p>
        ),
      },
      {
        id: "b2",
        group: "Becoming a Reseller",
        q: "What is the process to become a reseller?",
        a: (
          <p>
            You can express your interest by filling out the{" "}
            <Link
              href="/resellers/applicationform"
              className="font-bold text-sky-600 hover:underline"
            >
              reseller application form
            </Link>
            . AttoLearn will perform necessary screening and on successful
            completion a detailed orientation and onboarding will be arranged.
          </p>
        ),
      },
      {
        id: "b3",
        group: "Becoming a Reseller",
        q: "How long does the reseller application review process take?",
        a: (
          <p>
            It typically takes 5–7 working days after submission to review and
            respond to your application.
          </p>
        ),
      },
      {
        id: "b4",
        group: "Becoming a Reseller",
        q: "Can I stop being a reseller at any time?",
        a: (
          <p>
            Yes, after fulfilling the required notice period as per the agreed
            reseller contract to ensure a smooth transition of your assigned
            institutions to a new representative if needed.
          </p>
        ),
      },

      {
        id: "t1",
        group: "Territory & Coverage",
        q: "What regions are currently available for new resellers?",
        a: (
          <p>
            Availability varies by country and province or state. Contact our
            team to see if your desired region is open.
          </p>
        ),
      },
      {
        id: "t2",
        group: "Territory & Coverage",
        q: "Can I apply to become a reseller for multiple provinces or countries?",
        a: (
          <p>
            Yes, but approvals are granted case-by-case depending on capacity,
            track record, and market availability.
          </p>
        ),
      },
      {
        id: "t3",
        group: "Territory & Coverage",
        q: "Can two resellers operate in the same city?",
        a: (
          <p>
            Generally no. Territories are assigned exclusively to one reseller
            per region.
          </p>
        ),
      },
      {
        id: "t4",
        group: "Territory & Coverage",
        q: "What happens if a new school from my region signs up independently?",
        a: (
          <p>
            Any school signing up from your region may still be credited under
            your onboarding (If stated in the reseller agreement).
          </p>
        ),
      },
      {
        id: "t5",
        group: "Territory & Coverage",
        q: "How do I expand my coverage area after onboarding enough schools?",
        a: (
          <p>
            Formally request expansion from the AttoLearn team with a
            performance report.
          </p>
        ),
      },
      {
        id: "t6",
        group: "Territory & Coverage",
        q: "What kind of support is provided for large regions like entire provinces?",
        a: (
          <p>
            Dedicated reseller support team and marketing materials are
            provided.
          </p>
        ),
      },
      {
        id: "t7",
        group: "Territory & Coverage",
        q: "Can I recruit sub-resellers or representatives under me?",
        a: <p>With prior approval from the AttoLearn team.</p>,
      },

      {
        id: "e1",
        group: "Earnings & Commission",
        q: "What commission or earnings model does AttoLearn offer resellers?",
        a: (
          <p>
            Resellers are offered an agreed upon percentage of sales revenue
            generated from their respective regions.
          </p>
        ),
      },
      {
        id: "e2",
        group: "Earnings & Commission",
        q: "When are commissions paid out?",
        a: <p>Monthly, usually in the first week of the following month.</p>,
      },
      {
        id: "e3",
        group: "Earnings & Commission",
        q: "Is there a cap on how much I can earn per school?",
        a: (
          <p>
            No fixed cap. Earnings depend on subscription model and user
            engagement.
          </p>
        ),
      },
      {
        id: "e4",
        group: "Earnings & Commission",
        q: "What currencies are commissions paid in?",
        a: <p>Preferably local currency.</p>,
      },
      {
        id: "e5",
        group: "Earnings & Commission",
        q: "Do I receive recurring commissions for yearly renewals?",
        a: <p>Yes, for institutions you onboarded.</p>,
      },
      {
        id: "e6",
        group: "Earnings & Commission",
        q: "Are there any onboarding targets or performance requirements?",
        a: <p>Yes, resellers must meet quarterly targets to stay active.</p>,
      },
      {
        id: "e7",
        group: "Earnings & Commission",
        q: "What happens if I fail to meet onboarding targets?",
        a: (
          <p>
            Onboarding targets will be reviewed at agreed upon intervals
            (quarterly/semiannually, etc.). In case of failure to meet the
            targets for certain consecutive periods (As per agreement), the
            reseller agreement may be revised or revoked.
          </p>
        ),
      },

      {
        id: "s1",
        group: "School Engagement & Training",
        q: "Do I need to train school staff myself?",
        a: (
          <p>
            You&apos;re encouraged to support initial training. AttoLearn also
            offers support.
          </p>
        ),
      },
      {
        id: "s2",
        group: "School Engagement & Training",
        q: "Are onboarding materials available in local languages?",
        a: <p>Yes, in English and major regional languages like Urdu.</p>,
      },
      {
        id: "s3",
        group: "School Engagement & Training",
        q: "How long does it take to fully onboard a school?",
        a: <p>Typically 5–7 days.</p>,
      },
      {
        id: "s4",
        group: "School Engagement & Training",
        q: "What if a school faces technical issues during onboarding?",
        a: (
          <p>
            The AttoLearn support team resolves all software technical issues.
          </p>
        ),
      },

      {
        id: "m1",
        group: "Tools, Materials & Platform Access",
        q: "What support do resellers receive from AttoLearn?",
        a: (
          <p>
            Product training, marketing materials, backend access, and ongoing
            support.
          </p>
        ),
      },
      {
        id: "m2",
        group: "Tools, Materials & Platform Access",
        q: "Is there a dashboard to monitor school onboarding and user activity?",
        a: <p>Yes, real-time access is provided.</p>,
      },
      {
        id: "m3",
        group: "Tools, Materials & Platform Access",
        q: "What kind of marketing materials will be provided?",
        a: <p>Brochures, Demos, Posters, and Templates.</p>,
      },
      {
        id: "m4",
        group: "Tools, Materials & Platform Access",
        q: "Do resellers get a demo or trial version of the platform?",
        a: <p>Yes, a demo will be provided.</p>,
      },
      {
        id: "m5",
        group: "Tools, Materials & Platform Access",
        q: "Can I create a test account for presentations?",
        a: <p>Yes, a test environment is provided.</p>,
      },
      {
        id: "m6",
        group: "Tools, Materials & Platform Access",
        q: "Are resellers provided with branded marketing materials?",
        a: (
          <p>
            Yes, AttoLearn reseller support team will provide the required
            marketing material.
          </p>
        ),
      },

      {
        id: "d1",
        group: "Data, Privacy & Technical Support",
        q: "How is user data managed and protected?",
        a: (
          <p>
            AttoLearn takes data privacy seriously. All user data is encrypted,
            securely stored, and only accessed by authorized personnel.
            AttoLearn complies with global data protection standards. For more
            details, access the AttoLearn data{" "}
            <Link
              href="/privacypolicy"
              className="font-bold text-sky-600 hover:underline"
            >
              privacy policy
            </Link>
            .
          </p>
        ),
      },
      {
        id: "d2",
        group: "Data, Privacy & Technical Support",
        q: "Is internet access required for all features?",
        a: <p>Most features require internet. Offline access is limited.</p>,
      },
      {
        id: "d3",
        group: "Data, Privacy & Technical Support",
        q: "What platforms is AttoLearn available on?",
        a: <p>Android, IOS, and Web.</p>,
      },
      {
        id: "d4",
        group: "Data, Privacy & Technical Support",
        q: "What if a school faces technical issues during onboarding?",
        a: (
          <p>
            The AttoLearn support team resolves all software technical issues.
          </p>
        ),
      },

      {
        id: "c1",
        group: "Communication & Support",
        q: "Who do I contact for reseller-related issues or escalations?",
        a: <p>Contact your regional reseller coordinator.</p>,
      },
      {
        id: "c2",
        group: "Communication & Support",
        q: "Will I receive updates about new features or changes in policy?",
        a: <p>Yes, via monthly newsletters and direct updates.</p>,
      },
      {
        id: "c3",
        group: "Communication & Support",
        q: "How do I submit feedback or feature requests from schools?",
        a: (
          <p>
            Use the reseller dashboard or email{" "}
            <a
              href="mailto:info@attolearn.com"
              className="font-bold text-sky-600 hover:underline"
            >
              info@attolearn.com
            </a>
            .
          </p>
        ),
      },

      {
        id: "r1",
        group: "Events & Representation",
        q: "Will my institution or name be listed on the AttoLearn website?",
        a: <p>Yes, for verified resellers.</p>,
      },
      {
        id: "r2",
        group: "Events & Representation",
        q: "Can I represent AttoLearn at school expos or education fairs?",
        a: <p>Yes, with prior approval and event details.</p>,
      },
    ],
    [],
  );

  // ---------------- UI state ----------------
  const [activeCountry, setActiveCountry] = useState<Country>("Pakistan");
  const filteredResellers = useMemo(
    () => resellers.filter((r) => r.country === activeCountry),
    [resellers, activeCountry],
  );

  // group FAQs
  const faqGroups = useMemo(() => {
    const map = new Map<string, FaqItem[]>();
    faqs.forEach((f) => {
      map.set(f.group, [...(map.get(f.group) || []), f]);
    });
    return Array.from(map.entries()).map(([group, items]) => ({
      group,
      items,
    }));
  }, [faqs]);

  return (
    <main className="bg-white">
      {/* ------------------- Resellers ------------------- */}
      <section className="bg-slate-50 pt-24 pb-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#007381]">
                AttoLearn Resellers
              </h2>
            </div>

            {/* Button: top-right on md+, stacked on mobile */}
            <div className="mt-4 md:absolute md:right-0 md:top-0 md:mt-0">
              <Link
                href="/resellers/applicationform"
                className="inline-flex w-full items-center justify-center rounded-md bg-teal-600 px-4 py-2 text-sm font-extrabold text-white hover:bg-[#007381] md:w-auto"
              >
                Become a Reseller
              </Link>
            </div>
          </div>

          {/* Country tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {countries.map((c) => {
              const active = c === activeCountry;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCountry(c)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-extrabold transition",
                    active
                      ? "bg-[#007381] text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Reseller cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredResellers.length ? (
              filteredResellers.map((r) => <ResellerCard key={r.id} r={r} />)
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm font-bold text-slate-700 md:col-span-2">
                No resellers listed for {activeCountry} yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ------------------- FAQ ------------------- */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-[#007381]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto max-w-4xl space-y-10">
            {faqGroups.map(({ group, items }) => (
              <div key={group}>
                <h4 className="mb-5 border-b-2 border-[#007381] pb-2 text-xl font-extrabold text-[#007381]">
                  {group}
                </h4>

                <div className="space-y-3">
                  {items.map((item) => (
                    <FaqAccordionItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ------------------- Reseller Card -------------------
function ResellerCard({ r }: { r: Reseller }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <Image
            src={r.img}
            alt={r.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h5 className="text-base font-extrabold text-[#007381]">{r.name}</h5>
          {r.role ? (
            <p className="mt-0.5 text-xs font-bold text-slate-500">{r.role}</p>
          ) : null}

          <p
            className={cn(
              "mt-2 text-sm leading-6 text-slate-700 transition-all",
              expanded ? "" : "line-clamp-3",
            )}
          >
            {r.bio}
          </p>

          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="mt-2 text-sm font-extrabold text-sky-600 hover:underline"
          >
            {expanded ? "Read Less ↑" : "Read More →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------- FAQ Accordion Item -------------------
function FaqAccordionItem({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(item.id === "b1"); // first one open like your markup

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#077784] text-white">
            ?
          </span>
          <span className="text-sm font-extrabold text-[#007381] sm:text-base">
            {item.q}
          </span>
        </div>

        <span className="shrink-0 text-slate-500">{open ? "▾" : "▸"}</span>
      </button>

      {open ? (
        <div className="px-4 pb-4 pl-13 text-sm leading-6 text-slate-700">
          {item.a}
        </div>
      ) : null}
    </div>
  );
}
