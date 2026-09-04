import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Scale,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

const accountRows = [
  [UserRound, "Parent or guardian", "Creates and owns the child’s profile"],
  [UsersRound, "Tutor or centre", "Uses scoped access, with parent consent"],
  [Bot, "School", "Enrols students under its authorised relationship"],
  [LockKeyhole, "Child, on their own", "Cannot create or own an account"],
] as const;
const aiCards = [
  [
    FileText,
    "Where AI is used",
    "Building and improving learning resources: generating and transforming questions, drafting explanations, mapping curriculum, assisting verification.",
  ],
  [
    ShieldCheck,
    "What governs the learning path",
    "Approved content, the learner’s goals, their actual evidence, review needs, misconception signals, difficulty and complexity rules.",
  ],
  [
    CheckCircle2,
    "AI helps us build, organise and improve learning resources",
    "Your child’s learning path is governed by approved content, structured evidence and explainable rules.",
  ],
] as const;
const roles = [
  [
    "Parent",
    "Own the account and child’s profile; set goals; grant and withdraw tutor access.",
    "—",
  ],
  [
    "Student",
    "See next steps, feedback and recent wins.",
    "Create their own account, change permissions or contact other users.",
  ],
  [
    "Tutor",
    "Work with approved learners; assign work and review evidence.",
    "Add a child, invite other tutors or change consent.",
  ],
  [
    "Teacher",
    "Assign homework and view progress within an authorised relationship.",
    "See practice beyond the authorised scope.",
  ],
  [
    "School admin",
    "Enable teacher permissions and manage access based on role.",
    "Reach beyond the school’s authorised scope into family or tutor learning.",
  ],
] as const;
const countries = [
  [
    "/images/pricing/country-icons/australia.png",
    "Australia",
    "Privacy Act, plus the Children’s Online Privacy Code being developed by the OAIC",
    "The Code must be registered before December 2026; we are tracking the draft.",
  ],
  [
    "/images/pricing/country-icons/uk.png",
    "United Kingdom",
    "UK GDPR and the Age Appropriate Design Code",
    "In force now. Compliance work is a condition of opening family access.",
  ],
  [
    "/images/pricing/country-icons/usa.png",
    "United States",
    "COPPA, including verifiable parental consent for under-13s",
    "Consent model must be in place before family access opens.",
  ],
  [
    "/images/pricing/country-icons/pakistan.png",
    "Pakistan",
    "Existing school agreements",
    "School Management and Paper Generator operate under current school contracts.",
  ],
] as const;
const safe = [
  "Everything on this site about dimensions, mastery and evidence describes how AttoLearn thinks — it is not what is shown to a nine-year-old.",
  "Encouragement rather than labels — no diagnostic terminology on a child’s screen.",
  "One clear next step, not a wall of detail.",
  "Parent alerts are calm and actionable rather than alarming.",
];
const notBuilt = [
  "No streak pressure",
  "No leaderboards",
  "No shame language",
  "No engagement traps",
];

function GeneratedSafetyIcon({
  index,
  size = 56,
}: {
  index: number;
  size?: number;
}) {
  const column = index % 4;
  const row = Math.floor(index / 4);
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 rounded-full bg-transparent bg-no-repeat"
      style={{
        width: size,
        height: size,
        backgroundImage:
          "url('/images/safety-and-trust/generated/safety-icons-atlas.png')",
        backgroundSize: "400% 400%",
        backgroundPosition: `${(column * 100) / 3}% ${(row * 100) / 3}%`,
      }}
    />
  );
}
function TickList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#087b82]" />
          {item}
        </li>
      ))}
    </ul>
  );
}
function SectionTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-xs font-bold uppercase tracking-wide text-[#ed9807]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#075e65] sm:text-4xl">
        {title}
      </h2>
      {copy && <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>}
    </div>
  );
}

export default function SafetyAndTrustPage() {
  return (
    <main className="overflow-hidden bg-[#fcfdfc] text-slate-800">
      <section className="relative min-h-[520px] overflow-hidden bg-[#f5fbfa]">
        <div className="absolute inset-y-0 right-0 hidden w-[68%] lg:block">
          <Image
            src="/images/safety-and-trust/generated/safety-hero.png"
            alt="Child safety and data protection"
            fill
            priority
            sizes="68vw"
            className="object-cover object-right"
          />
        </div>
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-3 py-12 sm:px-4 lg:px-6">
          <div className="relative z-10 max-w-[440px]">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#087b82]">
              Safety and trust
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#092540] sm:text-5xl">
              Built to be safe,
              <br />
              not just compliant
            </h1>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Compliance is a floor. The decisions that actively protect a child
              are made in how content is approved, what the software is allowed
              to decide, who can see what, and what a nine-year-old is shown on
              screen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#protection"
                className="inline-flex h-11 items-center rounded-md bg-[#087b82] px-5 text-sm font-bold text-white"
              >
                Child Safety &amp; Data Protection
              </Link>
              <Link
                href="#ai"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-[#087b82] px-5 text-sm font-bold text-[#087b82]"
              >
                Our Learning Philosophy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative aspect-[16/10] lg:hidden">
          <Image
            src="/images/safety-and-trust/generated/safety-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      <section id="protection" className="py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-3 sm:px-4 lg:grid-cols-2 lg:px-6">
          <article className="rounded-2xl border border-[#e4ece9] bg-white p-7 shadow-sm">
            <p className="text-xs font-bold uppercase text-[#ed9807]">
              Child accounts
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#075e65]">
              No child creates their own account
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              There is no route for a child to sign themselves up to AttoLearn.
              Every learner profile is attached to a responsible adult, school
              or centre.
            </p>
            <TickList
              items={[
                "A parent or guardian sets up and owns the account",
                "A tutor or tuition centre acts only within approved scope",
                "A school enrols a learner under its authorised relationship",
                "A child cannot create, transfer or own an account",
              ]}
            />
          </article>
          <article className="overflow-hidden rounded-2xl border border-[#dce8e5] bg-white shadow-sm">
            <div className="bg-[#087b82] px-5 py-3 font-bold text-white">
              Every route to a learner profile
            </div>
            {accountRows.map(([, title, copy], index) => (
              <div
                key={title}
                className="flex gap-4 border-t border-[#e8eceb] px-5 py-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8f7f5] text-[#087b82]">
                  <GeneratedSafetyIcon index={index} size={40} />
                </span>
                <div>
                  <h3 className="font-bold text-[#075e65]">{title}</h3>
                  <p className="mt-1 text-xs text-slate-600">{copy}</p>
                </div>
              </div>
            ))}
          </article>
        </div>
      </section>

      <section id="ai" className="bg-[#f6fbfa] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <SectionTitle
            eyebrow="Governed and bounded AI"
            title="AI doesn’t freely decide what your child sees next"
            copy="Every recommendation operates inside rules a human designed, reviewed and can inspect."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {aiCards.map(([, title, copy], i) => (
              <article
                key={title}
                className={`${i === 2 ? "md:col-span-2" : ""} flex gap-5 rounded-2xl border border-[#e2ebe8] bg-white p-7 shadow-sm`}
              >
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#e9f8f5] text-[#087b82]">
                  <GeneratedSafetyIcon index={4 + i} size={64} />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#075e65]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <SectionTitle
            eyebrow="Role-based permissions"
            title="Everyone sees only what their role allows"
            copy="Explained rather than asserted — here is who can actually do what."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#dde7e5] bg-white shadow-sm">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[.55fr_1.25fr_1.25fr] bg-[#f4faf9] px-5 py-3 text-xs font-bold uppercase">
                <span>Role</span>
                <span className="text-[#087b82]">Can</span>
                <span className="text-[#e44a4a]">Cannot</span>
              </div>
              {roles.map(([role, can, cannot]) => (
                <div
                  key={role}
                  className="grid grid-cols-[.55fr_1.25fr_1.25fr] gap-5 border-t border-[#e8eceb] px-5 py-4 text-sm leading-5"
                >
                  <b className="text-[#075e65]">{role}</b>
                  <span className="text-slate-600">{can}</span>
                  <span className="text-slate-600">{cannot}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              [UsersRound, "Tutors are invited, never self-served"],
              [LockKeyhole, "Access is reversible"],
              [FileText, "Everything is logged"],
            ].map(([, title], index) => (
              <div
                key={title as string}
                className="flex items-center gap-4 rounded-xl border border-[#e2ebe8] bg-white p-5"
              >
                <GeneratedSafetyIcon index={7 + index} size={52} />
                <b className="text-[#075e65]">{title as string}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7fbfa] py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-3 sm:px-4 lg:grid-cols-2 lg:px-6">
          <article className="rounded-2xl border border-[#e3ece9] bg-white p-7">
            <p className="text-xs font-bold uppercase text-[#ed9807]">
              Child-safe outputs
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#075e65]">
              What a child actually sees
            </h2>
            <TickList items={safe} />
          </article>
          <article className="overflow-hidden rounded-2xl border border-[#e3ece9] bg-white">
            <h2 className="bg-[#087b82] px-6 py-4 text-xl font-extrabold text-white">
              Things we’ve decided not to build
            </h2>
            <div className="grid gap-1 p-5">
              {notBuilt.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-lg bg-[#fbfdfc] p-3"
                >
                  <GeneratedSafetyIcon index={10 + index} size={44} />
                  <b className="text-[#075e65]">{item}</b>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <SectionTitle
            eyebrow="Children’s privacy law"
            title="Different countries, different rules"
            copy="Children’s privacy regulation is not the same across our markets, and we would rather set that out than imply a single global standard."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#dde7e5] bg-white">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-[.65fr_1.25fr_1.45fr] bg-[#f4faf9] px-5 py-3 text-xs font-bold uppercase text-[#075e65]">
                <span>Market</span>
                <span>Framework</span>
                <span>Where we are</span>
              </div>
              {countries.map(([flag, market, framework, status]) => (
                <div
                  key={market}
                  className="grid grid-cols-[.65fr_1.25fr_1.45fr] gap-5 border-t border-[#e8eceb] px-5 py-4 text-xs leading-5"
                >
                  <b className="flex items-center gap-3 text-[#075e65]">
                    <span className="relative h-6 w-8">
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
                  <span>{framework}</span>
                  <span>{status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex gap-5 rounded-2xl border-2 border-dashed border-[#efb32b] bg-[#fffaf0] p-6">
            <GeneratedSafetyIcon index={14} size={72} />
            <div>
              <h3 className="text-lg font-bold text-[#075e65]">
                Availability follows readiness, not the other way round
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Where the consent and child-data model for a market is not
                complete, family access does not open there.
              </p>
              <p className="mt-2 text-xs font-bold uppercase text-[#e99a05]">
                Per-market family access is gated on the consent model
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7fbfa] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <SectionTitle
            eyebrow="The formal documents"
            title="This page explains. These govern."
            copy="Plain English here; the binding detail is in the policies."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              [ShieldCheck, "Child Safety & Data Protection"],
              [FileText, "Privacy Policy"],
              [Scale, "Terms and Conditions"],
            ].map(([, title], index) => (
              <article
                key={title as string}
                className="rounded-2xl border border-[#e2ebe8] bg-white p-6 shadow-sm"
              >
                <GeneratedSafetyIcon index={[14, 4, 5][index]} size={64} />
                <h3 className="mt-4 font-bold text-[#075e65]">
                  {title as string}
                </h3>
                <Link
                  href={
                    title === "Privacy Policy"
                      ? "/privacypolicy"
                      : title === "Terms and Conditions"
                        ? "/termsofservice"
                        : "/contact"
                  }
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#087b82]"
                >
                  Read the policy <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-5 flex flex-col items-center gap-5 rounded-2xl border border-[#dfe9e6] bg-white p-6 sm:flex-row">
            <GeneratedSafetyIcon index={15} size={64} />
            <div className="flex-1">
              <h3 className="font-bold text-[#075e65]">
                Something concerns you?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Safety concerns go to a person, not a form that disappears.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-md bg-[#087b82] px-7 py-3 text-sm font-bold text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="relative min-h-[240px] overflow-hidden text-center text-white">
        <Image
          src="/images/safety-and-trust/generated/safety-cta.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#032f38]/50" />
        <div className="relative z-10 mx-auto flex min-h-[240px] max-w-7xl items-center justify-center px-3 sm:px-4 lg:px-6">
          <div>
            <h2 className="text-3xl font-extrabold">
              Safety is a design decision, not a disclaimer
            </h2>
            <p className="mt-2 text-sm text-white/90">
              See how the same thinking shapes what your child is shown.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/families"
                className="rounded-md bg-[#f4a40a] px-6 py-3 text-sm font-bold"
              >
                Our Learning Philosophy
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-white px-6 py-3 text-sm font-bold"
              >
                Explore Adaptive Learning
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
