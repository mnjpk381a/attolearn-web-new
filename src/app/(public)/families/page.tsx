import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Check,
  FileText,
  Gift,
  GraduationCap,
  Headphones,
  Laptop,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Target,
  Timer,
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
  const backgrounds = [
    "bg-[#eef9f5]",
    "bg-[#f2f8e8]",
    "bg-[#f1f1f8]",
    "bg-[#fff0f5]",
  ] as const;

  return (
    <span
      aria-hidden
      className={`relative block size-24 shrink-0 overflow-hidden rounded-full ${backgrounds[index] ?? backgrounds[0]}`}
    >
      <Image
        src="/images/families/family-payment-icons.png"
        alt=""
        width={1983}
        height={793}
        className="absolute top-1/2 h-51.25 w-lg max-w-none -translate-y-1/2"
        style={{ left: `${-16 - index * 128}px` }}
      />
    </span>
  );
}function RevisionPaperIcon() {
  return (
    <Image
      src="/images/families/revision-paper-icon-v2.png"
      alt=""
      aria-hidden
      width={132}
      height={132}
      className="h-28 w-28 shrink-0 object-contain md:h-32 md:w-32"
    />
  );
}

function ParticipatingSchoolIcon() {
  return (
    <Image
      src="/images/families/participating-school-icon-v2.png"
      alt=""
      aria-hidden
      width={144}
      height={112}
      className="h-24 w-32 shrink-0 object-contain md:h-28 md:w-36"
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
      <section className="relative overflow-hidden bg-[#fffaf0] lg:aspect-1674/944">
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/images/families/families-hero-v3.png"
            alt="AttoLearn parent dashboard showing a child profile and learning progress"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="site-container relative flex min-h-150 items-center py-16 lg:absolute lg:inset-0 lg:min-h-0 lg:items-start lg:py-0 lg:pt-[7.2%]">
          <div className="relative z-10 w-full lg:max-w-[43%]">
            <p className="flex items-center gap-4 text-sm font-bold uppercase tracking-wide text-[#087f84]">
              For families
              <span className="h-px w-8 bg-[#168b87]" />
            </p>
            <h1 className="mt-7 text-[40px] font-bold leading-[1.1] tracking-[-.035em] text-[#080d43] sm:text-[46px] xl:text-[52px]">
              Understand your
              <br />
              child&apos;s learning.
              <br />
              <span className="text-[#168b87]">Stay in control.</span>
            </h1>
            <span className="mt-6 block h-1 w-18 rounded-full bg-[#ffae00]" />
            <p className="mt-6 max-w-107.5 text-[17px] leading-8 text-[#202746]">
              Short, focused practice, and clear evidence of what your child
              actually understands — not just a score.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Btn href="/choose-module">
                Start Free <ArrowRight className="h-5 w-5" />
              </Btn>
              <Btn href="/pricing" outline>
                Compare Family Plans
              </Btn>
            </div>
          </div>
        </div>
        <div className="relative h-97.5 w-full overflow-hidden lg:hidden">
          <Image
            src="/images/families/families-hero-v3.png"
            alt="AttoLearn parent dashboard showing a child profile and learning progress"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_center]"
          />
        </div>
      </section>      <section className="bg-linear-to-b from-[#f4faff] to-white py-20">
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
              <RevisionPaperIcon />
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
              <ParticipatingSchoolIcon />
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
      <section className="w-full pb-14">
        <div className="relative min-h-130 w-full overflow-hidden bg-[#bdeee7] sm:min-h-110 lg:aspect-3/1 lg:min-h-0">
          <Image
            src="/images/families/family-cta-complete-v3.png"
            alt="A mother and child learning together with AttoLearn progress cards"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="relative mx-auto grid min-h-130 w-full max-w-295 items-center sm:min-h-110 lg:absolute lg:inset-0 lg:min-h-0 lg:grid-cols-[35%_40%_25%]">
            <div className="hidden lg:block" />
            <div className="relative z-10 px-6 py-12 text-center sm:px-8 lg:pt-20">
              <h2 className="text-[32px] font-bold leading-[1.08] tracking-[-.03em] text-[#082d52] sm:text-[38px]">
                Start understanding
                <br />
                your child&apos;s learning
              </h2>
              <p className="mt-4 text-base text-[#173d49]">
                Free to try. No pressure, no commitment.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Btn href="/choose-module">
                  Start Free <ArrowRight className="h-5 w-5" />
                </Btn>
                <Btn href="/pricing" outline>
                  Compare Family Plans
                </Btn>
              </div>
            </div>
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>      <section className="relative overflow-hidden bg-[#fffdf2] py-12 md:py-14">
        <div className="site-container relative">
          <Title eyebrow="The small print, said plainly">
            Things worth knowing before you pay
          </Title>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {smallPrint.map(([, t, c], i) => (
              <article
                key={t}
                className="min-h-52.5 rounded-2xl border border-[#f0eadf] bg-[#fffef9] px-6 py-5 text-left shadow-[0_8px_24px_rgba(46,65,63,.07)]"
              >
                <div className="flex justify-center">
                  <PaymentIcon index={i} />
                </div>
                <h3 className="mt-1 text-[17px] font-bold leading-6 text-[#123d52]">
                  {t}
                </h3>
                <p className="mt-1.5 text-[14px] leading-[1.55] text-[#3c4252]">
                  {c}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-dashed border-[#f4ab20] bg-[#fffdf7] px-6 py-4 sm:px-8">
            <div className="grid items-center gap-5 md:grid-cols-[110px_1fr_240px]">
              <Image
                src="/images/families/tax-receipt-coins-v3.png"
                alt=""
                aria-hidden
                width={120}
                height={96}
                className="mx-auto h-24 w-28 object-contain"
              />
              <div>
                <h3 className="text-[21px] font-bold leading-7 text-[#f08b00]">
                  On tax
                </h3>
                <p className="mt-1.5 max-w-3xl text-[15px] leading-6 text-[#363b49]">
                  Whether the figures shown include GST or VAT determines the
                  final amount you pay, and consumer price display rules differ
                  by market.
                </p>
                <p className="mt-2 text-[12px] font-extrabold uppercase leading-5 tracking-wide text-[#f08b00]">
                  Tax-inclusive vs tax-exclusive display to be confirmed per
                  market before these prices go live
                </p>
              </div>
              <Image
                src="/images/families/tax-wallet-calculator-v4.png"
                alt=""
                aria-hidden
                width={250}
                height={112}
                className="mx-auto hidden h-28 w-60 object-contain md:block"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#fffdf2] pb-0 pt-8 sm:pt-10" aria-labelledby="families-final-cta-title">
        <div className="relative min-h-140 w-full overflow-hidden bg-[#fbf7ec] sm:min-h-125 lg:aspect-3/1 lg:min-h-0">
          <Image
            src="/images/families/families-final-cta-v2.png"
            alt="A child enjoying learning on a tablet beside books and education icons"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={100}
            className="object-cover object-center max-lg:opacity-50"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,251,242,.18)_30%,rgba(255,251,242,.72)_44%,rgba(255,251,242,.72)_62%,transparent_78%)] max-lg:bg-[#fffaf0]/55" />
          <div className="relative z-10 flex min-h-140 items-center justify-center px-5 py-14 sm:min-h-125 sm:px-8 lg:absolute lg:inset-0 lg:min-h-0 lg:pl-[34%] lg:pr-[24%]">
            <div className="w-full max-w-130 text-center">
              <h2 id="families-final-cta-title" className="text-[38px] font-black leading-[1.05] tracking-[-.035em] text-[#092c50] sm:text-[46px] lg:text-[50px]">
                Start free,
                <span className="block text-[#166f70]">decide later</span>
              </h2>
              <p className="mx-auto mt-5 max-w-97.5 text-[15px] font-medium leading-6 text-[#52606f] sm:text-[16px]">
                No card to try it. Move to a paid plan<br className="hidden sm:block" /> when it&apos;s earning its place.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/choose-module" className="inline-flex min-h-12 min-w-40 items-center justify-center gap-4 rounded-lg bg-[#ffad0a] px-7 text-[15px] font-extrabold text-white shadow-[0_8px_20px_rgba(245,158,11,.22)] transition hover:bg-[#ef9d00]">
                  Start Free <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/contact" className="inline-flex min-h-12 min-w-40 items-center justify-center gap-3 rounded-lg border-2 border-[#16868b] bg-[#fffdf5]/90 px-7 text-[15px] font-extrabold text-[#075f68] transition hover:bg-white">
                  Talk to Sales <Headphones className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
