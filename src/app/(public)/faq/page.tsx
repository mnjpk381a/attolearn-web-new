// app/faq/page.tsx  (Next.js App Router)
// ✅ Tailwind + TypeScript + Responsive + Accordion (only one open) + smooth height animation
// Note: AOS / Bootstrap icons removed (use lucide-react or inline SVG if you want icons)

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type FaqItem = {
  id: string;
  q: string;
  a: React.ReactNode;
};

type FaqGroup = {
  title: string;
  items: FaqItem[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => setMaxH(el.scrollHeight);
    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isOpen]);

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm transition",
        isOpen && "border-slate-300"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-4 py-4 text-left sm:px-5"
        aria-expanded={isOpen}
      >
        {/* Question icon */}
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b7a80]/10 text-[#0b7a80]">
          ?
        </span>

        <span className="flex-1">
          <span className="block text-sm font-extrabold text-[#007381] sm:text-[15px]">
            {item.q}
          </span>
        </span>

        {/* Chevron */}
        <span
          className={cn(
            "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#007381] transition-transform",
            isOpen && "rotate-90"
          )}
          aria-hidden="true"
        >
          ▶
        </span>
      </button>

      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden px-4 pb-4 text-slate-700 transition-[max-height,opacity] duration-300 ease-in-out sm:px-5",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        style={{ maxHeight: isOpen ? maxH : 0 }}
      >
        <div className="text-sm leading-6">{item.a}</div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const groups: FaqGroup[] = useMemo(
    () => [
      {
        title: "General Overview",
        items: [
          {
            id: "gen-1",
            q: "What is the AttoLearn Smart School Management System?",
            a: (
              <p>
                AttoLearn is an all-in-one web portal and mobile app that brings
                academics, administration, and communication together in one
                smart platform.
              </p>
            ),
          },
          {
            id: "gen-2",
            q: "Who can use AttoLearn?",
            a: (
              <p>
                AttoLearn is built for schools of all sizes as well as
                individual users. Schools benefit from features that support
                administrators, teachers, and parents, while students and
                individuals can also use AttoLearn independently for learning,
                communication, and progress tracking.
              </p>
            ),
          },
          {
            id: "gen-3",
            q: "Why should we choose AttoLearn over other systems?",
            a: (
              <p>
                AttoLearn is affordable, customizable, scalable, and secure.
                With quick setup, cloud access, and transparent policies, you
                only pay for what you need – no hidden extras.
              </p>
            ),
          },
          {
            id: "gen-4",
            q: "Is AttoLearn suitable for multi-campus schools?",
            a: (
              <p>
                Yes, AttoLearn supports multi-branch institutions with
                centralized control and flexible reporting.
              </p>
            ),
          },
          {
            id: "gen-5",
            q: "What are the main benefits of using AttoLearn?",
            a: (
              <p>
                AttoLearn reduces paperwork for administrators, improves
                efficiency for educators, supports student learning, and keeps
                parents engaged with real-time communication and analytics.
              </p>
            ),
          },
        ],
      },
      {
        title: "Features & Capabilities",
        items: [
          {
            id: "feat-1",
            q: "What features are included in AttoLearn?",
            a: (
              <p>
                AttoLearn covers student management, attendance, timetables,
                exams, grading, fee management, communication, transport,
                reporting, and more. (View full feature list online.)
              </p>
            ),
          },
          {
            id: "feat-2",
            q: "Can I apply to become a reseller for multiple provinces or countries?",
            a: (
              <p>
                Yes, but approvals are granted case-by-case depending on
                capacity, track record, and market availability.
              </p>
            ),
          },
          {
            id: "feat-3",
            q: "Can students and parents access attendance and grades online?",
            a: (
              <p>
                Yes, both students and parents can view real-time attendance
                records and grade updates.
              </p>
            ),
          },
          {
            id: "feat-4",
            q: "Does AttoLearn support parent-teacher engagement?",
            a: (
              <p>
                Yes, schools can schedule, notify, and track parent-teacher
                meetings, along with fee and progress updates.
              </p>
            ),
          },
          {
            id: "feat-5",
            q: "Can AttoLearn handle fees and reminders?",
            a: (
              <p>
                Yes, schools can send automated fee reminders to parents for
                pending or upcoming payments.
              </p>
            ),
          },
          {
            id: "feat-6",
            q: "Does it support online learning and exams?",
            a: (
              <p>
                Yes, AttoLearn enables online test creation, timed assessments,
                auto-grading, and publishing of results.
              </p>
            ),
          },
          {
            id: "feat-7",
            q: "Does AttoLearn provide reports and performance insights?",
            a: (
              <p>
                Yes, automated reports and performance insights cover academics,
                finances, and attendance, helping identify strengths and areas
                for improvement.
              </p>
            ),
          },
          {
            id: "feat-8",
            q: "Is communication integrated?",
            a: (
              <p>
                Yes, AttoLearn includes built-in messaging and notifications via
                the AttoLearn Comms feature.
              </p>
            ),
          },
        ],
      },
      {
        title: "Setup & Onboarding",
        items: [
          {
            id: "setup-1",
            q: "How quickly can we start using AttoLearn?",
            a: (
              <p>
                Schools can begin using AttoLearn as soon as their account is
                verified. Most are ready within a few days depending on data
                migration needs.
              </p>
            ),
          },
          {
            id: "setup-2",
            q: "Can AttoLearn import our existing school data?",
            a: (
              <p>
                Yes, existing school records can be uploaded via Excel/CSV and
                securely migrated with our team’s assistance.
              </p>
            ),
          },
          {
            id: "setup-3",
            q: "How long does data migration take?",
            a: (
              <p>
                Data migration usually takes 24–48 hours depending on size and
                complexity. All migrated data is securely backed up.
              </p>
            ),
          },
          {
            id: "setup-4",
            q: "Will our staff receive training?",
            a: (
              <p>
                Yes, onboarding includes training sessions, guides, and ongoing
                support for your staff.
              </p>
            ),
          },
          {
            id: "setup-5",
            q: "Do we need special hardware?",
            a: (
              <p>
                No special hardware is needed. AttoLearn runs on PCs, tablets,
                or smartphones with internet access.
              </p>
            ),
          },
        ],
      },
      {
        title: "Pricing & Subscriptions",
        items: [
          {
            id: "price-1",
            q: "How is pricing structured?",
            a: (
              <p>
                Subscriptions are tailored to each institution’s needs based on
                school size, student count, and selected modules.
              </p>
            ),
          },
          {
            id: "price-2",
            q: "Do you offer monthly and yearly plans?",
            a: (
              <p>
                Yes, we offer both flexible monthly and discounted annual plans.
              </p>
            ),
          },
          {
            id: "price-3",
            q: "Do you offer free trials?",
            a: (
              <p>
                Yes, schools can try AttoLearn before committing to a
                subscription.
              </p>
            ),
          },
          {
            id: "price-4",
            q: "Are there discounts for larger schools?",
            a: (
              <p>
                Yes, we provide bulk pricing for larger schools and annual
                subscription discounts.
              </p>
            ),
          },
          {
            id: "price-5",
            q: "Can we switch plans later?",
            a: (
              <p>
                Yes, schools can upgrade or downgrade their plan at any time.
              </p>
            ),
          },
          {
            id: "price-6",
            q: "Are there hidden charges?",
            a: (
              <p>
                No hidden fees – charges only apply for optional add-ons or
                custom integrations. (See Pricing Policy for details.)
              </p>
            ),
          },
          {
            id: "price-7",
            q: "Do you charge setup fees?",
            a: (
              <p>
                Basic setup is free. Custom integrations may involve additional
                charges.
              </p>
            ),
          },
          {
            id: "price-8",
            q: "Is there a pay-per-student option?",
            a: (
              <p>
                Yes, some packages offer per-student pricing for added
                flexibility.
              </p>
            ),
          },
        ],
      },
      {
        title: "Payments, Refunds & Cancellations",
        items: [
          {
            id: "pay-1",
            q: "What payment methods are supported?",
            a: (
              <p>
                We accept credit/debit cards, bank transfers, and regionally
                supported payment gateways.
              </p>
            ),
          },
          {
            id: "pay-2",
            q: "What happens if our payment fails?",
            a: (
              <p>
                If a payment fails, the system will retry automatically and
                you’ll be notified to update details.
              </p>
            ),
          },
          {
            id: "pay-3",
            q: "How do renewals work?",
            a: (
              <p>
                Subscriptions auto-renew unless canceled before the renewal
                date.
              </p>
            ),
          },
          {
            id: "pay-4",
            q: "What is your refund policy?",
            a: (
              <p>
                Refunds are only available for duplicate payments, activation
                failures, or billing errors reported within 60 days. (See Refund
                Policy for details.)
              </p>
            ),
          },
          {
            id: "pay-5",
            q: "How do I cancel my subscription?",
            a: (
              <p>
                You can cancel anytime through your account settings or by
                contacting{" "}
                <a
                  className="font-semibold text-[#0b7a80] underline"
                  href="mailto:info@AttoLearn.com"
                >
                  info@AttoLearn.com
                </a>
                .
              </p>
            ),
          },
          {
            id: "pay-6",
            q: "Will I lose access immediately after cancellation?",
            a: (
              <p>
                No. You will continue to have full access until the end of your
                current billing cycle.
              </p>
            ),
          },
        ],
      },

      {
        title: "Support & Training",
        items: [
          {
            id: "sup-1",
            q: "What support channels are available?",
            a: (
              <p>
                We provide 24/7 email support, a self-service knowledge base,
                and dedicated account managers for premium customers.
              </p>
            ),
          },
          {
            id: "sup-2",
            q: "How long does it take to resolve a support ticket?",
            a: (
              <p>
                Standard tickets are resolved within 24–48 hours. Premium
                support offers faster response times.
              </p>
            ),
          },
          {
            id: "sup-3",
            q: "Do you provide video tutorials?",
            a: <p>Yes, step-by-step video tutorials are available.</p>,
          },
          {
            id: "sup-4",
            q: "Is training included?",
            a: (
              <p>
                Yes, onboarding includes staff training sessions and user
                guides.
              </p>
            ),
          },
          {
            id: "sup-5",
            q: "Do you support parents and students too?",
            a: (
              <p>
                Yes, we support all user groups – parents, teachers, and
                students – with login, app use, and portal navigation.
              </p>
            ),
          },
        ],
      },
      {
        title: "Security & Compliance",
        items: [
          {
            id: "sec-1",
            q: "How secure is my data?",
            a: (
              <p>All data is encrypted and stored securely in cloud servers.</p>
            ),
          },
          {
            id: "sec-2",
            q: "Do you comply with data privacy laws?",
            a: (
              <p>
                Yes, we comply with GDPR and all relevant local regulations.
              </p>
            ),
          },
          {
            id: "sec-3",
            q: "Who has access to sensitive data?",
            a: (
              <p>
                Only authorized users have access, controlled by role-based
                permissions.
              </p>
            ),
          },
          {
            id: "sec-4",
            q: "How often is data backed up?",
            a: (
              <p>
                Data is backed up daily on secure servers to ensure continuity.
              </p>
            ),
          },
          {
            id: "sec-5",
            q: "Can we restrict user access to certain features?",
            a: (
              <p>
                Yes, role-based permissions let administrators control access
                for staff, parents, and students.
              </p>
            ),
          },
          {
            id: "sec-6",
            q: "What happens to my data if I cancel?",
            a: (
              <p>
                Your data is securely archived or deleted in accordance with our
                Data Privacy Policy.
              </p>
            ),
          },
        ],
      },
    ],
    []
  );

  // Only one open item at a time across the whole page:
  const [openId, setOpenId] = useState<string>("gen-1"); // first one open (like faq-active)

  return (
    <section className="bg-[#f4f6f7] pt-20 pb-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-[#007381] sm:text-3xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-lg font-extrabold text-[#007381] sm:text-xl">
                {group.title}
              </h4>

              <div className="space-y-3">
                {group.items.map((item) => (
                  <FaqAccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() =>
                      setOpenId((prev) => (prev === item.id ? "" : item.id))
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
