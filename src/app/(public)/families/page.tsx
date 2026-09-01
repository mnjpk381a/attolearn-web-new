import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  BarChart3,
  BookOpen,
  Building2,
  CalendarCheck,
  Check,
  FileText,
  Gift,
  GraduationCap,
  Dna,
  Laptop,
  Lightbulb,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Tags,
  Target,
  Timer,
  Triangle,
  UserRound,
  Users,
} from "lucide-react";

const benefits = [
  [
    GraduationCap,
    "Adaptive learning",
    "Curriculum-aligned Maths, English and Science, Foundation to Year 10.",
  ],
  [
    Timer,
    "Short sessions",
    "7-12 minutes - long enough to matter, short enough to finish.",
  ],
  [
    Laptop,
    "Parent dashboard",
    "Plain-English progress, not raw scores or jargon.",
  ],
  [Target, "Goals", "Set a focus area, or let AttoLearn recommend one."],
  [
    BarChart3,
    "Progress evidence",
    "What your child understands, and where they need support.",
  ],
  [
    MessageCircle,
    "Tutor invitations",
    "Invite a tutor with scoped, revocable access - you stay in control.",
  ],
  [
    FileText,
    "Paper creation",
    "Build a revision paper across topics your child needs to check.",
  ],
  [
    Users,
    "Multiple children",
    "Manage each child's learning under one family account.",
  ],
] as const;
const parentChecks = [
  "Create and manage your child's profile",
  "Set and change learning goals",
  "Give and withdraw consent at any time",
  "Invite - and remove - a tutor",
  "See full progress visibility",
  "Control the whole family account",
];
const childChecks = [
  "One clear next step, every time",
  "Encouraging messages, not scores",
  "Hints and support when needed",
  "No technical diagnostic labels shown to your child",
];
const smallPrint = [
  [
    MapPin,
    "Prices are local",
    "Each market is priced in its own currency, not converted from US dollars.",
  ],
  [
    CalendarCheck,
    "Cancel any time",
    "Monthly plans stop at the end of the period you've paid for.",
  ],
  [
    ShieldCheck,
    "Your records stay yours",
    "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
  ],
  [
    Gift,
    "One invited tutor is free",
    "A tutor or parent invite is included - the tutor is never billed for that family.",
  ],
] as const;
function Bubble({
  icon: Icon,
  warm = false,
}: {
  icon: typeof Target;
  warm?: boolean;
}) {
  return (
    <span
      className={`grid h-24 w-24 place-items-center rounded-full ${warm ? "bg-amber-50" : "bg-[#edf9f8]"}`}
    >
      <Icon
        className={`h-13 w-13 ${warm ? "text-amber-500" : "text-[#05878b]"}`}
        strokeWidth={1.7}
      />
    </span>
  );
}
function FeatureIcon({ index }: { index: number }) {
  const x = ["0%", "33.333%", "66.667%", "100%"][index % 4];
  const y = index < 4 ? "0%" : "100%";
  return (
    <span
      aria-hidden
      className="block h-32 w-32 bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/families/family-feature-icons.png")',
        backgroundSize: "400% 200%",
        backgroundPosition: `${x} ${y}`,
      }}
    />
  );
}
function PaymentIcon({ index }: { index: number }) {
  const x = ["0%", "33.333%", "66.667%", "100%"][index];
  return (
    <span
      aria-hidden
      className="block h-20 w-20 bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/families/family-payment-icons.png")',
        backgroundSize: "400% 100%",
        backgroundPosition: `${x} 50%`,
      }}
    />
  );
}
function Title({
  eyebrow,
  children,
  copy,
}: {
  eyebrow?: string;
  children: React.ReactNode;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-amber-500">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl leading-tight text-[#05757a] md:text-[42px]">
        {children}
      </h2>
      <span className="mx-auto mt-5 block h-0.5 w-16 bg-amber-400" />
      {copy && <p className="mt-5 text-lg text-slate-600">{copy}</p>}
    </div>
  );
}
function Btn({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-lg px-8 text-base font-semibold transition hover:-translate-y-0.5 ${outline ? "border-2 border-[#07949a] bg-white/95 text-[#087e82]" : "bg-amber-400 text-white shadow-lg shadow-amber-200/50 hover:bg-amber-500"}`}
    >
      {children}
    </Link>
  );
}
function Checks({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-7 space-y-4">
      {items.map((x) => (
        <li
          key={x}
          className="flex items-start gap-4 text-[15px] text-slate-700"
        >
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#078d91] text-white">
            <Check className="h-3.5 w-3.5" />
          </span>
          {x}
        </li>
      ))}
    </ul>
  );
}
export default function FamiliesPage() {
  return (
    <main className="families-page overflow-hidden bg-white text-[#10243d]">
      <section className="relative h-[clamp(560px,44.5vw,760px)] overflow-hidden bg-[radial-gradient(circle_at_8%_3%,rgba(210,235,244,.58),transparent_18%),radial-gradient(circle_at_88%_15%,rgba(237,218,255,.72),transparent_30%),linear-gradient(112deg,#f6fbff_0%,#fffaf0_35%,#fff5eb_61%,#f7ecff_100%)]">
        <div className="absolute inset-0">
          <Image
            src="/images/families/families-hero-v2.png"
            alt="A parent supporting her child while he learns on a tablet"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <svg
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32 w-full"
          viewBox="0 0 1440 128"
          preserveAspectRatio="none"
        >
          <path
            d="M0 35 C130 78 190 125 310 95 C430 64 500 34 635 83 C745 123 785 128 890 128 H0Z"
            fill="#b8ece8"
            fillOpacity=".82"
          />
          <path
            d="M0 72 C115 101 170 132 285 108 C405 83 475 56 610 101 C700 131 790 128 880 128 H0Z"
            fill="#83d4d2"
            fillOpacity=".62"
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <BookOpen
            className="absolute left-[42%] top-[14%] h-16 w-16 -rotate-12 text-amber-400 drop-shadow-md"
            strokeWidth={1.4}
          />
          <svg
            aria-hidden
            className="absolute left-[42%] top-[23%] h-[40%] w-[31%] overflow-visible"
            viewBox="0 0 500 260"
            fill="none"
          >
            <path
              d="M18 15 C25 175 165 165 224 174 C312 188 362 292 475 167"
              stroke="#9ea7f7"
              strokeWidth="2.5"
              strokeDasharray="9 12"
            />
            <path
              d="M224 76 V174"
              stroke="#76d5df"
              strokeWidth="2"
              strokeDasharray="7 8"
            />
            {[
              [18, 15],
              [98, 157],
              [224, 174],
              [365, 199],
              [475, 167],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="8"
                  fill={i === 2 ? "#ffab00" : "#8175e8"}
                />
                <circle cx={cx} cy={cy} r="3" fill="white" />
              </g>
            ))}
          </svg>
          <div className="absolute left-[52%] top-[14%] w-40 rounded-2xl border border-white/70 bg-[#fffef9]/95 p-3.5 shadow-[0_10px_28px_rgba(48,61,76,.12)]">
            <p className="text-xs font-semibold">Practice Progress</p>
            <svg className="mt-2 h-10 w-full" viewBox="0 0 180 64" fill="none">
              <defs>
                <linearGradient id="familyChart" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#54c6c8" stopOpacity=".35" />
                  <stop offset="1" stopColor="#54c6c8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M4 54 L33 39 L62 46 L86 35 L114 19 L140 26 L174 5 V60 H4Z"
                fill="url(#familyChart)"
              />
              <path
                d="M4 54 L33 39 L62 46 L86 35 L114 19 L140 26 L174 5"
                stroke="#078d91"
                strokeWidth="2.5"
              />
              <g fill="#078d91">
                {[
                  [4, 54],
                  [33, 39],
                  [62, 46],
                  [86, 35],
                  [114, 19],
                  [140, 26],
                  [174, 5],
                ].map(([cx, cy]) => (
                  <circle key={cx} cx={cx} cy={cy} r="2.5" />
                ))}
              </g>
            </svg>
            <b className="absolute right-3 top-8 text-sm">72%</b>
          </div>
          <div className="absolute left-[68%] top-[24%] w-24 rounded-2xl border border-white/70 bg-[#fffef9]/95 p-3 text-center shadow-[0_10px_28px_rgba(48,61,76,.12)]">
            <p className="text-xs font-semibold">Mastery</p>
            <div className="mx-auto mt-2 grid h-14 w-14 place-items-center rounded-full border-6 border-teal-600 text-sm font-bold">
              85%
            </div>
            <p className="mt-2 text-[10px] font-semibold">Great work!</p>
          </div>
          <div className="absolute left-[45%] top-[46%] w-36 rounded-2xl border border-white/70 bg-[#fffef9]/95 p-3.5 shadow-[0_10px_28px_rgba(48,61,76,.12)]">
            <p className="text-sm font-semibold">Today&apos;s Progress</p>
            <div className="mt-3 space-y-2 text-[10px]">
              <p className="flex justify-between">
                <span>Questions Answered</span>
                <b>18</b>
              </p>
              <p className="flex justify-between">
                <span>Correct Answers</span>
                <b>15</b>
              </p>
              <p className="flex justify-between">
                <span>Accuracy</span>
                <b>83%</b>
              </p>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-slate-200">
              <div className="h-full w-4/5 rounded-full bg-teal-500" />
            </div>
          </div>
          <Atom
            className="absolute right-[27%] top-[7%] h-14 w-14 text-teal-500"
            strokeWidth={1.4}
          />
          <Lightbulb
            className="absolute right-[17%] top-[8%] h-16 w-16 text-amber-400"
            strokeWidth={1.5}
          />
          <Triangle
            className="absolute right-[23%] top-[18%] h-10 w-10 rotate-12 text-violet-500"
            strokeWidth={1.8}
          />
          <Dna
            className="absolute right-[2%] top-[33%] h-11 w-11 rotate-12 text-violet-500"
            strokeWidth={1.5}
          />
          <Target
            className="absolute right-[14%] top-[10%] hidden h-14 w-14 text-amber-400"
            strokeWidth={1.5}
          />
          <span className="absolute right-[7%] top-[18%] grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <i key={i} className="h-1 w-1 rounded-full bg-teal-300" />
            ))}
          </span>
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-10">
          <div className="max-w-md">
            <p className="text-sm font-bold uppercase tracking-wide text-[#087f84]">
              For families
            </p>
            <h1 className="mt-8 text-[36px] leading-[1.12] tracking-[-.035em] sm:text-[46px] xl:text-[52px]">
              Understand your
              <br />
              child&apos;s learning.
              <br />
              <span className="bg-linear-to-r from-blue-500 via-violet-500 to-red-500 bg-clip-text text-transparent">
                Stay in control.
              </span>
            </h1>
            <p className="mt-7 max-w-105 text-base leading-7 text-slate-700">
              Short, focused practice, and clear evidence of what your child
              actually understands - not just a score.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Btn href="/choose-module">
                Start Free <ArrowRight className="h-5 w-5" />
              </Btn>
              <Btn href="/pricing" outline>
                Compare Family Plans
              </Btn>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-linear-to-b from-[#f4faff] to-white py-20">
        <div className="site-container">
          <Title eyebrow="What families receive">
            Everything your child needs, in one account
          </Title>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([, t, c], i) => (
              <article
                key={t}
                className="min-h-82 rounded-2xl bg-white p-7 text-center shadow-xl shadow-slate-200/50 ring-1 ring-slate-100"
              >
                <div className="flex justify-center">
                  <FeatureIcon index={i} />
                </div>
                <h3 className="mt-6 text-xl text-[#047f83]">{t}</h3>
                <p className="mt-4 text-[15px] leading-7 text-slate-600">{c}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="site-container border-x border-slate-200 bg-[#fffef8] py-16">
        <div className="content-split">
          <div className="lg:pl-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-amber-500">
              Parent authority
            </p>
            <h2 className="mt-3 text-[28px] sm:text-[34px] font-semibold leading-tight text-[#08797d]">
              You decide what happens
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-slate-600">
              AttoLearn is built so that a parent&apos;s authority is never in
              question - over the account, over access, and over the
              child&apos;s experience.
            </p>
            <ul className="mt-6 space-y-3">
              {parentChecks.map((x) => (
                <li
                  key={x}
                  className="flex items-center gap-3 text-[14px] font-medium text-slate-700"
                >
                  <span className="grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#078d91] text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="content-split-media content-split-media-right relative h-90 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
            <Image
              src="/images/families/parent-authority.png"
              alt="A parent reviewing the family learning dashboard"
              fill
              sizes="(min-width:1024px) 560px, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-y-5 right-5 w-[49%] rounded-xl border border-slate-200 bg-white/97 p-3 shadow-[0_12px_30px_rgba(18,59,73,.16)]">
              <h3 className="rounded-lg bg-[#07888c] px-4 py-2.5 text-xs font-semibold text-white">
                Family Dashboard
              </h3>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {[
                  [
                    "Emma, Year 4",
                    "Fractions - building confidence",
                    "/images/Students/Student-1.png",
                  ],
                  [
                    "Jack, Year 7",
                    "Algebra - ready for the next step",
                    "/images/Students/Student-2.png",
                  ],
                ].map(([t, c, src]) => (
                  <div
                    key={t}
                    className="min-h-26 rounded-lg border border-slate-200 p-2.5"
                  >
                    <Image
                      src={src}
                      alt=""
                      width={30}
                      height={30}
                      className="h-7.5 w-7.5 rounded-full object-cover ring-2 ring-teal-100"
                    />
                    <h4 className="mt-2 text-[11px] font-bold text-teal-800">
                      {t}
                    </h4>
                    <p className="mt-1 text-[9px] leading-3.5 text-slate-600">
                      {c}
                    </p>
                    <span className="mt-2 block h-1 rounded-full bg-slate-200">
                      <i className="block h-full w-2/5 rounded-full bg-teal-600" />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  ["Tutor access", "Ms. Patel - Maths, scoped"],
                  ["This week", "4 sessions completed"],
                ].map(([t, c], i) => (
                  <div
                    key={t}
                    className="min-h-22 rounded-lg border border-slate-200 p-2.5"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e7f7f5] text-teal-700">
                      {i === 0 ? (
                        <UserRound className="h-4 w-4" />
                      ) : (
                        <CalendarCheck className="h-4 w-4" />
                      )}
                    </span>
                    <h4 className="mt-2 text-[11px] font-bold text-teal-800">
                      {t}
                    </h4>
                    <p className="mt-1 text-[9px] leading-3.5 text-slate-600">
                      {c}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="my-16 border-t border-slate-200" />
        <div className="content-split">
          <div className="content-split-media content-split-media-left relative min-h-110 overflow-hidden rounded-xl border border-slate-300 shadow-sm">
            <Image
              src="/images/families/child-experience.png"
              alt="A child completing a short learning activity"
              fill
              sizes="(min-width:1024px) 560px, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute left-5 top-5 w-[42%] rounded-xl border border-slate-200 bg-white/96 p-2.5 shadow-[0_12px_30px_rgba(18,59,73,.18)]">
              <h3 className="rounded-lg bg-[#07888c] px-3 py-2 text-[11px] font-semibold text-white">
                What Emma sees
              </h3>
              <div className="mt-2 rounded-lg border border-slate-200 bg-white p-2.5">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#e5f8f4] text-teal-600">
                    <Target className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-bold text-teal-800">
                      Today&apos;s Best Step
                    </h4>
                    <p className="text-[8px] text-slate-500">
                      One activity, chosen for you
                    </p>
                  </div>
                </div>
                <div
                  aria-hidden
                  className="relative mt-2 h-16 overflow-hidden rounded-md bg-[linear-gradient(180deg,#f7fcfb_0%,#e7f7ed_100%)]"
                >
                  <span className="absolute bottom-0 left-0 h-9 w-28 rounded-[100%_100%_0_0] bg-[#cdebd6]" />
                  <span className="absolute bottom-0 right-0 h-12 w-28 rounded-[100%_100%_0_0] bg-[#75c58f]" />
                  <span className="absolute bottom-7 right-7 h-7 w-0.5 bg-amber-500" />
                  <span className="absolute bottom-12 right-3 h-4 w-5 bg-amber-400 [clip-path:polygon(0_0,100%_25%,0_55%)]" />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#dff4e8] text-sm text-emerald-600">
                  ☺
                </span>
                <div>
                  <p className="text-[10px] font-bold text-teal-700">
                    Nice work!
                  </p>
                  <p className="text-[8px] text-slate-500">
                    Encouragement, not a score
                  </p>
                </div>
                <span
                  aria-hidden
                  className="ml-auto text-base tracking-[-2px] text-amber-400"
                >
                  ✦·✧
                </span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-amber-500">
              Child experience
            </p>
            <h2 className="mt-3 text-[30px] font-semibold leading-tight text-[#057b80]">
              Low-pressure, always encouraging
            </h2>
            <p className="mt-5 text-[14px] leading-6 text-slate-600">
              Your child never sees a raw diagnostic label or an overwhelming
              list - just one clear next step, with hints and support along the
              way.
            </p>
            <Checks items={childChecks} />
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="site-container">
          <Title
            eyebrow="Family plan"
            copy="Full pricing detail lives on the Pricing page - here's the shape of it."
          >
            Simple, family-first pricing
          </Title>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 p-8">
              <div className="flex items-center gap-5">
                <Bubble icon={Gift} />
                <div>
                  <h3 className="text-2xl text-teal-800">Free Starter</h3>
                  <p className="mt-2 text-slate-600">No cost</p>
                </div>
              </div>
              <div className="my-6 border-t" />
              <Checks
                items={[
                  "Try adaptive learning",
                  "One child",
                  "Limited subjects",
                ]}
              />
            </article>
            <article className="relative rounded-2xl border-2 border-amber-400 p-8">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-5 py-1.5 text-sm font-bold text-white">
                Most families
              </span>
              <div className="flex items-center gap-5">
                <Bubble icon={Users} warm />
                <div>
                  <h3 className="text-2xl text-teal-800">AttoLearn Family</h3>
                  <p className="mt-2 text-slate-600">
                    See Pricing for current rates
                  </p>
                </div>
              </div>
              <div className="my-6 border-t" />
              <Checks
                items={[
                  "Up to 3 children included",
                  "Extra-child add-on available",
                  "All Foundation-Year 10 subjects",
                  "Tutor included",
                ]}
              />
            </article>
          </div>
          <div className="mt-16 border-t pt-12">
            <Title eyebrow="Assessment at home">
              Check progress with a real assessment
            </Title>
            <div className="mt-8 flex flex-col items-center gap-6 rounded-xl border border-dashed border-amber-400 bg-amber-50/50 px-8 py-6 md:flex-row">
              <FeatureIcon index={6} />
              <div className="flex-1">
                <h3 className="text-xl text-teal-800">
                  Build a revision paper
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Create a paper combining a few weeks of topics, print it or
                  set it as an online check.
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-amber-600">
                  Feature availability for family accounts to be confirmed
                  before publishing as live
                </p>
              </div>
              <Btn href="/papergenerator">Learn More</Btn>
            </div>
            <div className="mt-5 flex flex-col items-center gap-6 rounded-xl bg-[#eefafa] px-8 py-6 md:flex-row">
              <Bubble icon={Building2} />
              <div className="flex-1">
                <h3 className="text-xl text-teal-800">
                  Already at a participating school?
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Some families receive AttoLearn access through their
                  child&apos;s school. If your school is connected, you may
                  already be eligible.
                </p>
              </div>
              <Btn href="/schools">Check School-Linked Access</Btn>
            </div>
          </div>
        </div>
      </section>
      <section className="site-container pb-14">
        <div className="relative min-h-82.5 overflow-hidden bg-[#c9f4ed]">
          <Image
            src="/images/families/family-cta-banner.png"
            alt="A mother and child learning together"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="relative grid min-h-82.5 items-center lg:grid-cols-[35%_38%_27%]">
            <div />
            <div className="px-5 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow">
                <GraduationCap className="h-8 w-8 text-teal-700" />
              </span>
              <h2 className="mt-4 text-3xl leading-tight text-[#082d52]">
                Start understanding
                <br />
                your child&apos;s learning
              </h2>
              <p className="mt-3 text-base">
                Free to try. No pressure, no commitment.
              </p>
              <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                <Btn href="/choose-module">
                  Start Free <ArrowRight className="h-5 w-5" />
                </Btn>
                <Btn href="/pricing" outline>
                  Compare Family Plans
                </Btn>
              </div>
            </div>
            <div className="hidden space-y-3 pr-8 lg:block">
              <div className="-rotate-1 rounded-xl bg-white/90 p-4 shadow-lg">
                <p className="text-xs font-semibold">Practice Progress</p>
                <p className="mt-1 text-2xl font-bold text-violet-500">72%</p>
              </div>
              <div className="rotate-2 rounded-xl bg-white/90 p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full border-7 border-emerald-400 text-sm font-bold">
                    85%
                  </span>
                  <div>
                    <p className="text-xs font-semibold">Mastery</p>
                    <p className="text-xl font-bold text-emerald-500">85%</p>
                  </div>
                </div>
              </div>
              <div className="-rotate-1 rounded-xl bg-white/90 p-4 shadow-lg">
                <p className="text-xs font-semibold">This Week</p>
                <div className="mt-3 flex h-9 items-end gap-2">
                  {[12, 18, 24, 30, 36, 42].map((h) => (
                    <i
                      key={h}
                      className="w-4 rounded-sm bg-blue-400"
                      style={{ height: h }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffef8_0%,#fffdf4_100%)] py-16 md:py-20">
        <div
          aria-hidden
          className="absolute left-0 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-50/70 blur-2xl"
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-amber-50 blur-2xl"
        />
        <div className="site-container relative">
          <Title eyebrow="The small print, said plainly">
            Things worth knowing before you pay
          </Title>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {smallPrint.map(([, t, c], i) => (
              <article
                key={t}
                className="group min-h-57.5 rounded-2xl border border-[#edf1ee] bg-white px-6 py-6 text-left shadow-[0_10px_32px_rgba(20,63,74,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(20,63,74,.12)]"
              >
                <div className="flex justify-center">
                  <PaymentIcon index={i} />
                </div>
                <h3 className="mt-3 text-[16px] font-bold text-[#075f68]">
                  {t}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-slate-600">{c}</p>
              </article>
            ))}
          </div>
          <div className="relative mt-5 overflow-hidden rounded-2xl border border-dashed border-amber-400 bg-[linear-gradient(100deg,#fffaf0_0%,#fffdf8_55%,#fff8e8_100%)] px-6 py-5 sm:px-8">
            <div
              aria-hidden
              className="absolute -bottom-12 -right-5 h-36 w-36 rounded-full bg-amber-100/70"
            />
            <div className="relative grid items-center gap-6 md:grid-cols-[76px_1fr_170px]">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-sm">
                <Tags className="h-9 w-9 text-amber-500" strokeWidth={1.7} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-600">On tax</h3>
                <p className="mt-2 max-w-3xl text-[15px] leading-6 text-slate-650">
                  Whether the figures shown include GST or VAT determines the
                  final amount you pay, and consumer price display rules differ
                  by market.
                </p>
                <p className="mt-3 text-xs font-extrabold uppercase leading-5 tracking-wide text-amber-600">
                  Tax-inclusive vs tax-exclusive display to be confirmed per
                  market before these prices go live
                </p>
              </div>
              <div
                aria-hidden
                className="hidden items-end justify-center gap-2 md:flex"
              >
                <span className="grid h-20 w-24 place-items-center rounded-3xl bg-teal-600 text-amber-300 shadow-md">
                  <Tags className="h-11 w-11" />
                </span>
                <span className="grid h-16 w-14 place-items-center rounded-xl border-4 border-slate-500 bg-slate-100 text-amber-500 shadow-sm">
                  <span className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <i
                        key={i}
                        className="h-1.5 w-1.5 rounded-sm bg-slate-500"
                      />
                    ))}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
