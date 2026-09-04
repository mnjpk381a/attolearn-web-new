import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  BarChart3,
  Check,
  FileText,
  Globe2,
  LineChart,
  Flag,
  CalendarDays,
  Star,
  ShieldCheck,
  ShieldX,
  Puzzle,
  UserRound,
  Users,
  Eye,
  LockKeyhole,
  Shield,
} from "lucide-react";

const benefits = [
  [
    "/images/home-education/generated-icons/curriculum-aligned-learning.png",
    "Curriculum-aligned learning",
    "Choose the curriculum, year level, subjects, topics and individual learning goals.",
  ],
  [
    "/images/home-education/generated-icons/parent-led-goals.png",
    "Parent-led goals",
    "You set the priorities and milestones, or use recommendations.",
  ],
  [
    "/images/home-education/generated-icons/adaptive-daily-learning.png",
    "Adaptive daily learning",
    "Today’s Best Step turns your goal into manageable daily practice.",
  ],
  [
    "/images/home-education/generated-icons/coverage-and-progress.png",
    "Coverage and progress",
    "Know what has been practised, what the evidence shows and what needs attention.",
  ],
  [
    "/images/home-education/generated-icons/assessment-tools.png",
    "Assessment tools",
    "Build papers and term assessments, print or set them online.",
  ],
  [
    "/images/home-education/generated-icons/tutor-collaboration.png",
    "Tutor collaboration",
    "Bring in an approved tutor for a subject, without giving up control.",
  ],
  [
    "/images/home-education/generated-icons/multiple-children.png",
    "Multiple children",
    "Switch between children, each with their own learning and evidence.",
  ],
  [
    "/images/home-education/generated-icons/one-parent-view.png",
    "One parent view",
    "Plain-English progress across every child, in one place.",
  ],
] as const;

const smallPrint = [
  [
    "/images/home-education/generated-icons/small-print-prices-local-v2.png",
    "Prices are local",
    "Each market is priced in its own currency, not converted from US dollars.",
  ],
  [
    "/images/home-education/generated-icons/small-print-cancel-any-time-v2.png",
    "Cancel any time",
    "Monthly plans stop at the end of the period you’ve paid for.",
  ],
  [
    "/images/home-education/generated-icons/small-print-records-stay-yours-v2.png",
    "Your records stay yours",
    "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
  ],
  [
    "/images/home-education/generated-icons/small-print-invited-tutor-free-v2.png",
    "One invited tutor is free",
    "A tutor a parent invites is included — the tutor is never billed for that family.",
  ],
] as const;

function Button({
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
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition ${outline ? "border border-[#078b90] bg-white text-[#07757b] hover:bg-teal-50" : "bg-[#f4aa17] text-white hover:bg-[#dc9411]"}`}
    >
      {children}
    </Link>
  );
}

function FeatureCard({
  iconSrc,
  title,
  copy,
  index,
}: {
  iconSrc: string;
  title: string;
  copy: string;
  index: number;
}) {
  const titleColors = [
    "text-[#087f84]",
    "text-[#f36f00]",
    "text-[#338415]",
    "text-[#3d5fd1]",
    "text-[#8c09ac]",
    "text-[#087f84]",
    "text-[#f28b00]",
    "text-[#ef0b5b]",
  ];
  return (
    <article className="min-h-44 rounded-2xl border border-[#f4eadb] bg-white/80 p-5 shadow-[0_8px_24px_rgba(117,82,34,.06)]">
      <Image
        src={iconSrc}
        alt=""
        width={72}
        height={72}
        className="h-16 w-16 object-contain mix-blend-multiply"
      />
      <h3 className={`mt-4 text-[15px] font-bold ${titleColors[index]}`}>
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.45] text-[#20243b]">{copy}</p>
    </article>
  );
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-5 text-slate-700">
          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#078b90] text-white">
            <Check className="h-3 w-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function HomeEducationPage() {
  return (
    <main className="home-education-page overflow-hidden bg-white text-[#10243d]">
      <section className="home-education-hero relative min-h-136 overflow-hidden bg-[#fffaf0] lg:h-[min(56.28vw,941px)] lg:min-h-0">
        <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 lg:max-w-418">
          <Image
            src="/images/home-education/hero-reference-v2.png"
            alt="Parent and child learning with AttoLearn progress dashboards"
            fill
            priority
            quality={100}
            sizes="(min-width: 1672px) 1672px, 100vw"
            className="object-cover object-top lg:object-contain lg:object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#fffaf0]/96 via-[#fffaf0]/72 to-transparent lg:hidden" />
        <div className="site-container relative z-10 flex min-h-136 items-center py-10 lg:absolute lg:inset-0 lg:min-h-0 lg:py-0">
          <div className="max-w-107.5 rounded-2xl bg-[#fffaf0]/82 p-5 backdrop-blur-[2px] sm:p-6 lg:-translate-y-20 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <p className="text-lg font-extrabold text-[#087f84]">
              For Home Schooling
            </p>
            <h1 className="mt-4 text-[36px] font-bold leading-[1.08] tracking-[-.035em] text-[#080d43] sm:text-[44px] lg:text-[46px]">
              Flexible learning
              <br />
              with structure,
              <br />
              evidence and <span className="text-[#078b90]">assessment</span>
            </h1>
            <span className="mt-4 block h-1 w-16 rounded-full bg-[#078b90]" />
            <p className="mt-4 text-base leading-7 text-[#17213d]">
              You set the direction. AttoLearn handles the daily practice, keeps
              the evidence, and gives you assessment tools when you need to
              check.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="/choose-module">Start Home Learning</Button>
              <Button href="/pricing" outline>
                Explore Family Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_48%_40%,#fffef8_0%,#fffbed_65%,#fffdf7_100%)] py-10">
        <div className="site-container grid items-center gap-7 rounded-2xl border border-[#eadfce] bg-white/35 py-5 shadow-[0_5px_18px_rgba(99,70,32,.04)] md:grid-cols-[minmax(0,240px)_minmax(0,1fr)_auto] lg:gap-10">
          <div className="relative mx-auto h-38.75 w-57.5">
            <Image
              src="/images/home-education/pathway-house-generated.png"
              alt="Home education pathway represented by a house, books and plants"
              fill
              sizes="230px"
              quality={100}
              unoptimized
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-[24px] font-bold leading-tight text-[#08736f]">
              A pathway, not a separate product
            </h2>
            <p className="mt-4 max-w-152.5 text-[14px] leading-7 text-[#30354f]">
              Home Education uses AttoLearn’s family learning, planning,
              assessment and tutor-collaboration capabilities in a parent-led
              context. There is no separate “homeschool edition” or different
              account type — you use the same AttoLearn Family account, set up
              around you as the primary educator.
            </p>
          </div>
          <Link
            href="/families"
            className="inline-flex h-14 items-center justify-center gap-5 rounded-xl bg-[#167f7b] px-7 text-base font-semibold text-white shadow-[0_8px_20px_rgba(22,127,123,.22)] transition hover:bg-[#116b68]"
          >
            See the Family product <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_42%,#fffef8_0%,#fffbed_58%,#fffdf7_100%)] py-16 lg:py-20">
        <div className="site-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-base font-bold uppercase tracking-[.12em] text-[#f28a00] md:text-lg">
              What home educators use
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-[1.12] text-[#075f68] md:text-[38px]">
              Structure where you want it, flexibility where you need it
            </h2>
            <div className="mt-4 flex items-center justify-center gap-1.5">
              <span className="h-0.75 w-8 rounded-full bg-[#087f84]" />
              <span className="h-2 w-2 rounded-full bg-[#f4a314]" />
              <span className="h-0.75 w-8 rounded-full bg-[#087f84]" />
            </div>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([iconSrc, title, copy], i) => (
              <FeatureCard
                key={title}
                iconSrc={iconSrc}
                title={title}
                copy={copy}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="home-education-curriculum bg-[radial-gradient(circle_at_48%_45%,#fffef8_0%,#fffbed_62%,#fffdf7_100%)] py-16 lg:py-20">
        <div className="site-container content-split curriculum-split">
          <div className="lg:pl-1">
            <p className="text-sm font-bold uppercase tracking-[.02em] text-[#f16f00]">
              Curriculum-aligned learning
            </p>
            <h2 className="mt-7 text-[30px] sm:text-[36px] font-bold leading-[1.18] tracking-[-.025em] text-[#075f68] md:text-[42px]">
              Choose exactly
              <br />
              what you’re teaching
            </h2>
            <p className="mt-7 max-w-110 text-[15px] leading-7 text-[#30354f]">
              Work top-down from the curriculum, or straight to the one
              microskill your child is stuck on. Nothing forces you into a fixed
              sequence.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "Select the curriculum for your market",
                "Set year level per child, not per family",
                "Maths, English and Science, Foundation to Year 10",
                "Drill down to topics and individual microskills",
                "Work ahead or revisit earlier years freely",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14px] leading-6 text-[#30354f]"
                >
                  <span className="mt-1 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#146f78] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="content-split-media content-split-media-right relative aspect-630/500">
            <Image
              src="/images/home-education/curriculum-choice-generated.png"
              alt="Home learner choosing curriculum, year level, subject and microskill"
              fill
              sizes="(min-width:1024px) 640px, 100vw"
              quality={100}
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_52%_45%,#fffef8_0%,#fffbed_62%,#fffdf7_100%)] py-16 lg:py-20">
        <div className="site-container content-split">
          <div className="content-split-media content-split-media-left relative order-2 aspect-630/500 lg:order-1">
            <Image
              src="/images/home-education/parent-term-plan-generated.png"
              alt="Parent planning home education goals and revision priorities"
              fill
              sizes="(min-width:1024px) 560px, 100vw"
              quality={100}
              className="object-contain"
            />
          </div>
          <div className="order-1 lg:order-2 lg:pl-8 xl:pl-10">
            <p className="text-xs font-bold uppercase tracking-[.04em] text-[#f16f00]">
              Parent-led goals
            </p>
            <h2 className="mt-7 text-[30px] sm:text-[36px] font-bold leading-[1.18] tracking-[-.025em] text-[#075f68] md:text-[42px]">
              You are the primary educator
            </h2>
            <span className="mt-5 block h-0.75 w-12 rounded-full bg-[#146f78]" />
            <p className="mt-7 max-w-110 text-[15px] leading-7 text-[#30354f]">
              Goals and revision plans are set by you. AttoLearn can recommend,
              but it never quietly overrides what you’ve decided your child
              should be working on.
            </p>
            <ul className="mt-7 space-y-4">
              {[
                "Set the term’s priorities yourself",
                "Build revision plans for earlier work",
                "Change direction at any time",
                "Recommendations are suggestions, not instructions",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14px] leading-6 text-[#30354f]"
                >
                  <span className="mt-1 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#146f78] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_48%_42%,#fffef8_0%,#fffbed_64%,#fffdf7_100%)] py-16 lg:py-20">
        <div className="site-container content-split">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.02em] text-[#f07800]">
              Adaptive daily learning
            </p>
            <h2 className="mt-7 max-w-100 text-balance text-[24px] font-bold leading-[1.18] tracking-[-.025em] text-[#101448] md:text-[38px]">
              The plan becomes today’s practice
            </h2>
            <span className="mt-5 block h-0.75 w-12 rounded-full bg-[#13727a]" />
            <p className="mt-6 max-w-107.5 text-[15px] leading-7 text-[#30354f]">
              Your goal is broken into short, manageable sessions. Your child
              opens AttoLearn and finds one clear thing to do — not a syllabus
              to navigate.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                "Short sessions — 7 to 12 minutes",
                "One clear next step, every time",
                "Hints and support instead of penalties",
                "Encouragement, never a score shown to your child",
                "Earlier skills come back deliberately, to check they lasted",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14px] leading-6 text-[#30354f]"
                >
                  <span className="mt-1 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-[#146f78] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="content-split-media content-split-media-right relative aspect-1520/1034 overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(28,55,64,.10)]">
            <Image
              src="/images/home-education/adaptive-daily-complete-tablet.png"
              alt="Tablet showing Todays Best Step adaptive fraction lesson"
              fill
              sizes="(min-width:1024px) 560px, 100vw"
              quality={100}
              priority
              className="object-cover"
            />{" "}
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_40%,#fffef9_0%,#fffbed_68%,#fffdf7_100%)] py-14 lg:py-16">
        <div className="site-container">
          <div className="rounded-2xl border border-[#eee5d8] bg-white/25 px-5 py-9 shadow-[0_10px_30px_rgba(70,61,42,.035)] sm:px-8 lg:px-10">
            <div className="mx-auto max-w-190 text-center">
              <p className="text-sm font-extrabold uppercase tracking-[.035em] text-[#ee8100] md:text-base">
                Coverage and progress
              </p>
              <h2 className="mt-2 text-[31px] font-extrabold leading-[1.12] tracking-[-.025em] text-[#075f68] md:text-[38px]">
                Evidence you can actually look back on
              </h2>
              <p className="mx-auto mt-3 max-w-170 text-[15px] leading-[1.45] text-[#33364f]">
                Home educating means keeping your own picture of what has been
                covered.
                <br className="hidden sm:block" /> AttoLearn builds that picture
                as your child works.
              </p>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "/images/home-education/generated-icons/coverage-topics-practised-v2.png",
                  "Topics practised",
                  "What has been covered, by subject and by child.",
                  "text-[#2da98e] bg-[#e9f8f2]",
                  "bg-[#2da98e]",
                ],
                [
                  "/images/home-education/generated-icons/coverage-evidence-collected-v2.png",
                  "Evidence collected",
                  "What the practice actually showed about understanding.",
                  "text-[#4673d5] bg-[#edf2ff]",
                  "bg-[#4673d5]",
                ],
                [
                  "/images/home-education/generated-icons/coverage-areas-needing-support-v2.png",
                  "Areas needing support",
                  "Where the evidence is thin or shaky, in plain English.",
                  "text-[#ef8b00] bg-[#fff3dc]",
                  "bg-[#ef8b00]",
                ],
                [
                  "/images/home-education/generated-icons/coverage-revision-needs-v2.png",
                  "Revision needs",
                  "Skills due to come back for a check, and when.",
                  "text-[#8f20bc] bg-[#f7eafb]",
                  "bg-[#8f20bc]",
                ],
              ].map(([iconSrc, title, copy, color, line]) => (
                <article
                  key={title as string}
                  className="min-h-48 rounded-xl border border-[#eee5da] bg-white/55 px-5 py-5 shadow-[0_5px_18px_rgba(67,58,43,.035)]"
                >
                  <span
                    className={`mx-auto grid h-15.5 w-15.5 place-items-center rounded-full ${color}`}
                  >
                    <Image
                      src={iconSrc as string}
                      alt=""
                      width={72}
                      height={72}
                      className="h-15.5 w-15.5 object-contain"
                    />
                  </span>
                  <h3 className="mt-4 text-[17px] font-extrabold leading-tight text-[#075f68]">
                    {title as string}
                  </h3>
                  <span className={`mt-2 block h-0.5 w-8 ${line}`} />
                  <p className="mt-3 text-[13px] font-medium leading-[1.55] text-[#30334a]">
                    {copy as string}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-3 grid gap-8 rounded-2xl border border-[#eee5d8] bg-white/25 px-6 py-7 shadow-[0_8px_24px_rgba(70,61,42,.025)] lg:grid-cols-[.9fr_1.1fr] lg:gap-12 lg:px-10 lg:py-8">
            <div className="py-1 lg:pl-1">
              <p className="text-sm font-extrabold uppercase tracking-[.035em] text-[#ee8100]">
                Home education reporting
              </p>
              <h3 className="mt-3 text-[30px] font-extrabold leading-[1.16] tracking-[-.02em] text-[#075f68] md:text-[34px]">
                Your progress report,
                <br />
                without the blank page
              </h3>
              <p className="mt-4 max-w-113.75 text-[14px] leading-[1.65] text-[#34364d]">
                Reporting is usually done by hand in Word, from memory, at the
                end of a long year. AttoLearn prepares the first draft from your
                child’s actual learning — then hands it to you as an editable
                Word document that is entirely yours.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Choose the child, reporting period, country and region",
                  "Draft filled from real activity, not reconstructed from memory",
                  "Prompts for learning that happened away from the screen",
                  "Add external activities, observations and work samples",
                  "Every generated sentence can be edited or deleted",
                  "Exports as Word — edit it anywhere, submit it yourself",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[13px] font-medium leading-5 text-[#34364d]"
                  >
                    <span className="mt-0.5 grid h-4.25 w-4.25 shrink-0 place-items-center rounded-full bg-[#146f78] text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#eee5d8] bg-white/35 p-3 shadow-[0_5px_18px_rgba(70,61,42,.035)]">
              <div className="flex items-center justify-between rounded-lg bg-[#075f68] px-5 py-3 text-white">
                <p className="text-[16px] font-extrabold">
                  Progress report draft — Sofia, Term 1–2
                </p>
                <span className="grid h-8 w-8 place-items-center rounded bg-white/15">
                  <FileText className="h-6 w-6" strokeWidth={2.3} />
                </span>
              </div>
              <div className="mt-2 space-y-1.5">
                {[
                  [
                    LineChart,
                    "Learning overview",
                    "Goals, methods, resources and tutors",
                    "text-[#49a625] bg-[#f1fae8]",
                  ],
                  [
                    BarChart3,
                    "Progress by learning area",
                    "Topics, skills and specific examples",
                    "text-[#4976d8] bg-[#eef3ff]",
                  ],
                  [
                    Users,
                    "External activities",
                    "Museum visit, swimming, community garden — added by you",
                    "text-[#ed8d00] bg-[#fff5df]",
                  ],
                  [
                    Puzzle,
                    "Gaps shown, not filled",
                    "“No Science activity recorded this period”",
                    "text-[#ed5a32] bg-[#fff0e9]",
                  ],
                  [
                    Star,
                    "Future priorities",
                    "Your intended programme for next period",
                    "text-[#8d21bc] bg-[#f8edfc]",
                  ],
                ].map(([Icon, title, copy, color]) => (
                  <div
                    key={title as string}
                    className="flex min-h-13.75 items-center gap-4 rounded-lg border border-[#eee5da] bg-white/75 px-3 py-2"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${color}`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-extrabold leading-tight text-[#075f68]">
                        {title as string}
                      </p>
                      <p className="mt-1 text-[11px] font-medium leading-tight text-[#34364d]">
                        {copy as string}
                      </p>
                    </div>
                    <ChevronRight
                      className="ml-auto h-5 w-5 shrink-0 text-[#181643]"
                      strokeWidth={2.5}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_40%,#fffef9_0%,#fffbed_68%,#fffdf7_100%)] py-14 lg:py-16">
        <div className="site-container">
          <div className="rounded-2xl border border-[#eee5d8] bg-white/25 px-6 py-10 shadow-[0_10px_30px_rgba(70,61,42,.03)] lg:px-10 lg:py-12">
            <div className="text-center">
              <p className="text-base font-extrabold uppercase tracking-[.11em] text-[#ee8100] md:text-lg">
                How the report behaves
              </p>
              <h2 className="mt-3 text-[28px] sm:text-[34px] font-extrabold leading-[1.12] tracking-[-.025em] text-[#075f68] md:text-[45px]">
                Prepared by AttoLearn, owned by you
              </h2>
              <p className="mt-5 text-[16px] leading-7 text-[#4a465f] md:text-[18px]">
                Three rules the report follows, so you always know what you are
                signing your name to.
              </p>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {[
                [
                  "/images/home-education/generated-icons/report-you-own-document-v2.png",
                  "You own the document",
                  "AttoLearn prepares the draft. You edit, approve and submit it — the wording is never locked.",
                  "text-[#268fa0] bg-[#e8f5ee]",
                ],
                [
                  "/images/home-education/generated-icons/report-nothing-invented-v2.png",
                  "Nothing is invented",
                  "Where there is no evidence, the report shows a gap or a prompt. It never writes progress that didn’t happen.",
                  "text-[#456ed0] bg-[#edf0fa]",
                ],
                [
                  Globe2,
                  "Different places, different forms",
                  "Templates are configured by country and region. Where yours isn’t covered yet, you get a general template rather than invented requirements.",
                  "text-[#1d9e67] bg-[#fff1d7]",
                ],
              ].map(([iconAsset, title, copy, color], index) => (
                <article
                  key={title as string}
                  className="min-h-87.5 rounded-2xl border border-[#eee5da] bg-white/50 px-6 py-6 shadow-[0_7px_22px_rgba(67,58,43,.035)]"
                >
                  <span
                    className={`relative mx-auto grid h-33 w-33 place-items-center rounded-full ${color}`}
                  >
                    {index < 2 ? (
                      <Image
                        src={iconAsset as string}
                        alt=""
                        width={122}
                        height={122}
                        className="h-30.5 w-30.5 object-contain drop-shadow-[0_6px_5px_rgba(30,45,55,.16)]"
                      />
                    ) : (
                      <Image
                        src="/images/home-education/different-places-globe-icon.png"
                        alt="Globe with location marker"
                        width={122}
                        height={122}
                        className="h-30.5 w-30.5 object-contain drop-shadow-[0_6px_5px_rgba(30,45,55,.16)]"
                      />
                    )}
                  </span>
                  <h3 className="mt-4 text-center text-[20px] font-extrabold leading-tight text-[#075f68]">
                    {title as string}
                  </h3>
                  <span className="mx-auto mt-4 block h-0.75 w-10 rounded-full bg-[#198081]" />
                  <p className="mt-5 text-[15px] font-medium leading-[1.65] text-[#34364d]">
                    {copy as string}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-7 flex flex-col items-center gap-6 rounded-2xl border-2 border-dashed border-[#f3a52a] bg-[#fffaf0]/80 px-6 py-7 sm:flex-row sm:items-center lg:px-10">
              <div className="relative grid h-32.5 w-37.5 shrink-0 place-items-center text-[#f28a00]">
                <ShieldX
                  className="h-28 w-28 fill-[#fff0d2] drop-shadow-[0_7px_5px_rgba(109,72,17,.18)]"
                  strokeWidth={2.5}
                />
                <span className="absolute left-2 top-5 h-3 w-3 rotate-[-20deg] rounded-full bg-[#f28a00]" />
                <span className="absolute bottom-5 left-4 h-2 w-5 rotate-24 rounded-full bg-[#f28a00]" />
                <span className="absolute right-3 top-4 h-2 w-5 rotate-58 rounded-full bg-[#f28a00]" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-[25px] font-extrabold leading-tight text-[#075f68]">
                  What this does not do
                </h3>
                <p className="mt-3 text-[15px] font-medium leading-[1.65] text-[#34364d]">
                  AttoLearn assists you in preparing documentation. It does not
                  submit anything on your behalf, and it does not guarantee
                  acceptance, registration renewal or legal compliance in any
                  jurisdiction. Meeting your region’s requirements remains your
                  responsibility as the registered educator.
                </p>
                <p className="mt-5 text-[15px] font-extrabold uppercase leading-[1.55] text-[#ef7800]">
                  Reporting templates are configurable by jurisdiction —
                  <br className="hidden lg:block" /> confirm coverage for your
                  region before relying on a specific format
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_40%,#fffef9_0%,#fffbed_68%,#fffdf7_100%)] py-14 lg:py-16">
        <div className="site-container">
          <div className="rounded-2xl border border-[#eee5d8] bg-white/25 px-6 py-9 shadow-[0_10px_30px_rgba(70,61,42,.03)] lg:px-10 lg:py-10">
            <div className="text-center">
              <p className="text-base font-extrabold uppercase tracking-[.11em] text-[#ee8100] md:text-lg">
                Assessment tools
              </p>
              <h2 className="mt-2 text-[28px] sm:text-[34px] font-extrabold leading-[1.12] tracking-[-.025em] text-[#075f68] md:text-[43px]">
                Check progress with a real assessment
              </h2>
              <p className="mt-4 text-[16px] leading-7 text-[#4a465f] md:text-[18px]">
                When you want something more formal than daily practice — a term
                check, or a paper to sit at the kitchen table.
              </p>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {[
                [
                  "Term assessments",
                  "Build a check covering the term’s work.",
                  0,
                  "bg-[#f0eef5]",
                ],
                [
                  "Print or online",
                  "Print it out, or set it as an online check.",
                  1,
                  "bg-[#e6f1e3]",
                ],
                [
                  "Assessment records",
                  "Keep the results alongside the rest of your evidence.",
                  2,
                  "bg-[#f7e5ef]",
                ],
              ].map(([title, copy, iconIndex, bg]) => (
                <article
                  key={title as string}
                  className="min-h-63.75 rounded-2xl border border-[#eee5da] bg-white/50 px-6 py-5 text-center shadow-[0_6px_20px_rgba(67,58,43,.03)]"
                >
                  <span
                    className={`relative mx-auto block h-33 w-33 overflow-hidden rounded-full ${bg}`}
                  >
                    <Image
                      src="/images/home-education/assessment-tools-icons-v2.png"
                      alt=""
                      width={2048}
                      height={1024}
                      className="absolute -top-[40%] h-[180%] w-[400%] max-w-none object-fill mix-blend-multiply"
                      style={{ left: `-${Number(iconIndex) * 100}%` }}
                    />
                  </span>
                  <h3 className="mt-3 text-[20px] font-extrabold text-[#075f68]">
                    {title as string}
                  </h3>
                  <span className="mx-auto mt-3 block h-0.75 w-10 rounded-full bg-[#198081]" />
                  <p className="mt-3 text-[14px] font-medium leading-6 text-[#34364d]">
                    {copy as string}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid items-center gap-5 rounded-2xl border-2 border-dashed border-[#f3a52a] bg-[#fffaf0]/80 px-6 py-5 md:grid-cols-[210px_1fr_auto] lg:px-8">
              <div className="relative mx-auto h-36.25 w-48.75 overflow-hidden">
                <Image
                  src="/images/home-education/assessment-tools-icons-v2.png"
                  alt="Checklist notebook and pen"
                  width={2048}
                  height={1024}
                  className="absolute -top-[40%] h-[180%] w-[400%] max-w-none object-fill mix-blend-multiply"
                  style={{ left: "-300%" }}
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-[25px] font-extrabold leading-tight text-[#075f68]">
                  Combining topics into one paper
                </h3>
                <p className="mt-2 text-[14px] font-medium leading-5 text-[#34364d]">
                  Creating a single paper that combines several topics or
                  chapters across a term.
                </p>
                <p className="mt-2 text-[14px] font-extrabold uppercase leading-[1.45] text-[#ef7800]">
                  Feature availability for family and home-education accounts to
                  be confirmed with engineering before publishing as live
                </p>
              </div>
              <Link
                href="/papergenerator"
                className="inline-flex min-h-14 items-center justify-center gap-5 rounded-xl bg-[#075f68] px-8 text-[17px] font-extrabold text-white shadow-[0_8px_18px_rgba(7,95,104,.18)] transition hover:bg-[#064e56]"
              >
                Learn More <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_45%,#fffef9_0%,#fffbed_68%,#fffdf7_100%)] py-14 lg:py-16">
        <div className="site-container overflow-hidden rounded-2xl border border-[#eee5d8] bg-white/25 py-8 shadow-[0_10px_30px_rgba(70,61,42,.03)]">
          <div className="grid gap-9 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[.035em] text-[#ee8100]">
                Tutor collaboration
              </p>
              <h2 className="mt-4 text-[32px] font-extrabold leading-[1.15] tracking-[-.02em] text-[#075f68] md:text-[38px]">
                Bring in help without handing over control
              </h2>
              <p className="mt-5 max-w-97.5 text-[14px] font-medium leading-6 text-[#34364d]">
                Many home educators outsource one subject. You can invite an
                approved tutor into a single subject and keep everything else
                closed.
              </p>
              <CheckList
                items={[
                  "You invite the tutor — they cannot add your child",
                  "Access is scoped to what you allow",
                  "The tutor sees evidence, not your account",
                  "Withdraw access at any time, without explanation",
                ]}
              />
            </div>
            <div className="rounded-xl border border-[#eee5da] bg-white/45 p-2 shadow-[0_6px_20px_rgba(67,58,43,.035)]">
              <div className="rounded-lg bg-[#075f68] px-5 py-3 text-[16px] font-extrabold text-white">
                Tutor access — Sofia
              </div>
              <div className="mt-2 space-y-1.5">
                <div className="flex min-h-15.5 items-center gap-4 rounded-lg border border-[#eee5da] bg-white/75 px-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f6f4e9] text-[#075f68]">
                    <UserRound className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[13px] font-extrabold text-[#075f68]">
                      Mr. Okafor
                    </p>
                    <p className="text-[11px] font-medium text-[#34364d]">
                      Mathematics only — invited by you
                    </p>
                  </div>
                  <span className="relative ml-auto h-12 w-12 overflow-hidden rounded-full bg-[#f0e3d2]">
                    <Image
                      src="/images/home-education/mr-okafor-generated.png"
                      alt="Mr. Okafor"
                      fill
                      sizes="48px"
                      className="object-cover object-top lg:object-contain lg:object-top"
                    />
                  </span>
                </div>
                <div className="grid min-h-17.5 items-center rounded-lg border border-[#eee5da] bg-white/75 px-4 sm:grid-cols-[1.2fr_.8fr_.8fr]">
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#fff5dc] text-[#f08a00]">
                      <Eye className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#075f68]">
                        Can see
                      </p>
                      <p className="text-[11px] text-[#34364d]">
                        Maths evidence and goals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[conic-gradient(#075f68_0_72%,#e8e4d7_72%)]">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[10px] font-extrabold">
                        72%
                      </span>
                    </span>
                    <p className="text-[10px] font-bold text-[#075f68]">
                      Progress
                      <br />
                      <span className="font-medium text-[#34364d]">
                        72% completed
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Flag className="h-7 w-7 fill-[#f29a00] text-[#f29a00]" />
                    <p className="text-[10px] font-bold text-[#075f68]">
                      Goal
                      <br />
                      <span className="font-medium text-[#34364d]">
                        Master fractions
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex min-h-14.5 items-center gap-4 rounded-lg border border-[#eee5da] bg-white/75 px-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#f5eafb] text-[#8d20bd]">
                    <LockKeyhole className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-[13px] font-extrabold text-[#075f68]">
                      Cannot see
                    </p>
                    <p className="text-[11px] text-[#34364d]">
                      English, Science, account settings
                    </p>
                  </div>
                  <div className="ml-auto flex items-center text-[#53606a]">
                    <FileText className="h-8 w-8" />
                    <LockKeyhole className="-ml-2 mt-4 h-5 w-5 fill-white" />
                  </div>
                </div>
                <div className="flex min-h-14.5 items-center gap-4 rounded-lg border border-[#eee5da] bg-white/75 px-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eef8df] text-[#469d20]">
                    <Shield className="h-6 w-6 fill-current" />
                  </span>
                  <div>
                    <p className="text-[13px] font-extrabold text-[#075f68]">
                      Remove access
                    </p>
                    <p className="text-[11px] text-[#34364d]">
                      Available to you at any time
                    </p>
                  </div>
                  <span className="ml-auto grid h-12 w-12 place-items-center rounded-full bg-[#eef8df] text-[#469d20]">
                    <ShieldCheck className="h-8 w-8" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="my-8 h-px bg-[#eee5d8]" />
          <div className="grid gap-9 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[.035em] text-[#ee8100]">
                Multiple children
              </p>
              <h2 className="mt-4 text-[32px] font-extrabold leading-[1.15] tracking-[-.02em] text-[#075f68] md:text-[38px]">
                One account, each child on their own path
              </h2>
              <p className="mt-5 max-w-100 text-[14px] font-medium leading-6 text-[#34364d]">
                Home educating siblings rarely means teaching them the same
                thing. Every child has their own year level, goals, evidence and
                pace under one family account.
              </p>
              <CheckList
                items={[
                  "Switch between children in one view",
                  "Separate year level and goals per child",
                  "Up to 3 children included, add-ons available beyond that",
                  "Evidence kept separately for each child",
                ]}
              />
            </div>
            <div className="rounded-xl border border-[#eee5da] bg-white/45 p-2 shadow-[0_6px_20px_rgba(67,58,43,.035)]">
              <div className="rounded-lg bg-[#075f68] px-5 py-3 text-[16px] font-extrabold text-white">
                Your children
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {[
                  [
                    "Sofia, Year 5",
                    "Fractions — building confidence",
                    "68%",
                    "#4a9b1e",
                    "bg-[#eef7dc]",
                  ],
                  [
                    "Elias, Year 2",
                    "Reading — steady progress",
                    "45%",
                    "#ef9500",
                    "bg-[#fff3df]",
                  ],
                  [
                    "Nadia, Year 8",
                    "Algebra — ready for the next step",
                    "81%",
                    "#8621bd",
                    "bg-[#f5eafb]",
                  ],
                ].map(([name, copy, score, color, bg]) => (
                  <div
                    key={name as string}
                    className="flex min-h-21.5 items-center gap-4 rounded-lg border border-[#eee5da] bg-white/75 px-4"
                  >
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${bg}`}
                    >
                      <UserRound
                        className="h-8 w-8"
                        style={{ color: color as string }}
                      />
                    </span>
                    <div>
                      <p className="text-[13px] font-extrabold text-[#075f68]">
                        {name as string}
                      </p>
                      <p className="mt-1 text-[11px] font-medium leading-4 text-[#34364d]">
                        {copy as string}
                      </p>
                    </div>
                    <span
                      className="ml-auto grid h-12 w-12 shrink-0 place-items-center rounded-full"
                      style={{
                        background: `conic-gradient(${color} 0 ${score},#eee8da ${score})`,
                      }}
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[11px] font-extrabold">
                        {score as string}
                      </span>
                    </span>
                  </div>
                ))}
                <div className="flex min-h-21.5 items-center gap-4 rounded-lg border border-[#eee5da] bg-white/75 px-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#eef1ff] text-[#536ed1]">
                    <CalendarDays className="h-8 w-8" />
                  </span>
                  <div>
                    <p className="text-[13px] font-extrabold text-[#075f68]">
                      This week
                    </p>
                    <p className="mt-1 text-[11px] text-[#34364d]">
                      11 sessions
                      <br />
                      completed
                    </p>
                  </div>
                  <div className="ml-auto flex h-12 items-end gap-1">
                    {[14, 30, 19, 43, 26, 50, 34].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 bg-[#8d9bdd]"
                        style={{ height: h }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_42%,#fffef9_0%,#fffbed_68%,#fffdf7_100%)] pb-16 pt-4">
        <div className="site-container">
          <div className="text-center">
            <p className="text-sm font-extrabold uppercase tracking-[.08em] text-[#ee8100]">
              The small print, said plainly
            </p>
            <h2 className="mt-3 text-[32px] font-extrabold leading-tight tracking-[-.02em] text-[#075f68] md:text-[38px]">
              Things worth knowing before you pay
            </h2>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {smallPrint.map(([iconSrc, title, copy]) => (
              <article
                key={title}
                className="min-h-43.75 rounded-xl border border-[#eee5da] bg-white/55 px-4 py-4 shadow-[0_6px_18px_rgba(67,58,43,.035)]"
              >
                <Image
                  src={iconSrc}
                  alt=""
                  width={64}
                  height={64}
                  className="h-14 w-14 object-contain"
                />
                <h3 className="mt-3 text-[15px] font-extrabold text-[#075f68]">
                  {title}
                </h3>
                <p className="mt-2 text-[12px] font-medium leading-[1.55] text-[#34364d]">
                  {copy}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-center gap-5 rounded-xl border-2 border-dashed border-[#f3a52a] bg-[#fffaf0]/80 px-6 py-5 sm:flex-row">
            <span className="relative grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-white/70 text-[#735f40]">
              <FileText className="h-14 w-14" strokeWidth={1.6} />
              <span className="absolute bottom-1 right-0 grid h-8 w-8 place-items-center rounded-full bg-[#fff0d7] text-[18px] font-extrabold text-[#ef8700]">
                %
              </span>
            </span>
            <div>
              <h3 className="text-[17px] font-extrabold text-[#075f68]">
                On tax
              </h3>
              <p className="mt-1 text-[12px] font-medium leading-5 text-[#34364d]">
                Whether the figures shown include GST or VAT determines the
                final amount you pay, and consumer price display rules differ by
                market.
              </p>
              <p className="mt-2 text-[11px] font-extrabold uppercase leading-4 text-[#ef7800]">
                Tax-inclusive vs tax-exclusive display to be confirmed per
                market before these prices go live
              </p>
            </div>
          </div>
        </div>
      </section>{" "}
      <section className="relative overflow-hidden bg-[#075f68] text-white lg:aspect-3/1">
        <Image
          src="/images/home-education/pre-footer/home-education-start-free-banner.png"
          alt="Home education planning notebook, books and plant"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover object-top lg:object-contain lg:object-top"
        />
        <div className="absolute inset-0 bg-[#075f68]/78" />
        <div className="site-container relative flex min-h-64 flex-col items-center justify-center py-12 text-center lg:absolute lg:inset-0 lg:min-h-0">
          <h2 className="text-[34px] font-black leading-tight tracking-[-.02em] sm:text-[42px]">
            Start free, decide later
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] font-medium text-white/90 sm:text-[17px]">
            No card to try it. Move to a paid plan when it&apos;s earning its
            place.
          </p>
          <div className="mt-6 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a
              href="https://portal.attolearn.com/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#f6a914] px-9 text-[16px] font-extrabold text-white shadow-[0_8px_20px_rgba(0,0,0,.15)] transition hover:bg-[#df970d]"
            >
              Start Free
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border-2 border-white/80 bg-[#075f68]/25 px-9 text-[16px] font-extrabold text-white transition hover:bg-white/10"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>{" "}
    </main>
  );
}
