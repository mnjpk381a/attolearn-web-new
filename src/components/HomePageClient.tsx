"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CircleHelp,
  Clock3,
  FileText,
  Settings,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Home,
  Layers3,
  Quote,
  ReceiptText,
  School,
  UserRoundCheck,
  Users,
} from "lucide-react";

const pathways = [
  {
    image: "/images/homepage/pathways/families.png",
    title: "Families",
    copy: "Help your child practise, progress and build confidence while you stay in control.",
    href: "/families",
    link: "For Families",
  },
  {
    image: "/images/homepage/pathways/home-schooling.png",
    title: "Home Schooling",
    copy: "Combine curriculum-aligned learning, planning, assessment and tutor support.",
    href: "/home-education",
    link: "Home Schooling",
  },
  {
    image: "/images/homepage/pathways/tutors.png",
    title: "Tutors",
    copy: "See clearer evidence, prepare before lessons and assign targeted work.",
    href: "/tutors",
    link: "Tutor Workspace",
  },
  {
    image: "/images/homepage/pathways/tuition-centres.png",
    title: "Tuition Centres",
    copy: "Bring adaptive learning, assessment and tutor coordination into one pathway.",
    href: "/tuition-centres",
    link: "For Centres",
  },
  {
    image: "/images/homepage/pathways/schools.png",
    title: "Schools",
    copy: "Connect learning, assessment, homework and everyday school operations.",
    href: "/schools",
    link: "School Solutions",
  },
] as const;

const evidence = [
  {
    image: "/images/homepage/evidence-icons/core-understanding.png",
    title: "Core Understanding",
    copy: "Grasp of the underlying concept",
  },
  {
    image: "/images/homepage/evidence-icons/fluency.png",
    title: "Fluency",
    copy: "Speed and accuracy in action",
  },
  {
    image: "/images/homepage/evidence-icons/retention.png",
    title: "Retention",
    copy: "Remembering over time and context",
  },
  {
    image: "/images/homepage/evidence-icons/transfer.png",
    title: "Transfer",
    copy: "Applying learning in new situations",
  },
  {
    image: "/images/homepage/evidence-icons/reasoning.png",
    title: "Reasoning",
    copy: "Thinking critically and logically",
  },
  {
    image: "/images/homepage/evidence-icons/independence.png",
    title: "Independence",
    copy: "Working confidently alone",
  },
  {
    image: "/images/homepage/evidence-icons/consistency.png",
    title: "Consistency",
    copy: "Reliable performance across contexts",
  },
] as const;

const finePrint = [
  {
    image: "/images/homepage/small-print-icons/prices-local.png",
    title: "Prices are local",
    copy: "Each market is priced in its own currency, not converted from US dollars.",
  },
  {
    image: "/images/homepage/small-print-icons/cancel-any-time.png",
    title: "Cancel any time",
    copy: "Monthly plans stop at the end of the period you have paid for.",
  },
  {
    image: "/images/homepage/small-print-icons/records-stay-yours.png",
    title: "Your records stay yours",
    copy: "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
  },
  {
    image: "/images/homepage/small-print-icons/invited-tutor-free.png",
    title: "One invited tutor is free",
    copy: "A tutor a parent invites is included — the tutor is never billed for that family.",
  },
] as const;

function ActionLink({
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
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-bold transition ${outline ? "border border-[#087d83] bg-white text-[#08757b] hover:bg-teal-50" : "bg-[#f5a817] text-white hover:bg-[#de9410]"}`}
    >
      {children}
    </Link>
  );
}

function CapabilityIcon({ index }: { index: number }) {
  return (
    <span
      aria-hidden
      className="relative block h-24 w-28 shrink-0 overflow-hidden"
    >
      <Image
        src="/images/homepage/home-hero-capability-icons-v2.png"
        alt=""
        width={2103}
        height={748}
        className="absolute top-1/2 h-24 w-[270px] max-w-none -translate-y-1/2"
        style={{ left: `${-index * 90}px` }}
      />
    </span>
  );
}
export default function HomePageClient() {
  return (
    <main className="overflow-hidden bg-white text-[#10243d]">
      <section className="home-platform-hero relative overflow-hidden bg-[#fffdf2]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(211,247,244,.92)_0%,rgba(239,251,246,.78)_30%,rgba(255,253,242,.96)_67%)]" />
        <div className="pointer-events-none absolute -right-48 -top-52 h-190 w-190 rounded-full border-85 border-[#bfeee7]/45" />
        <div className="pointer-events-none absolute -left-52 bottom-3 h-105 w-105 rounded-full border-40 border-[#82d7ce]/60" />
        <div className="pointer-events-none absolute -bottom-40 left-[24%] h-95 w-[72%] rotate-[-8deg] rounded-[50%] bg-[#b9eee5]/42" />
        <div className="site-container relative grid items-start gap-9 pb-9 pt-10 lg:grid-cols-[.78fr_1.22fr] lg:pt-12">
          <div className="relative z-10 max-w-130">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#9edbd6] bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#08757b]">
              <Users className="h-4 w-4" /> Learning, assessment and school
              operations
            </span>
            <h1 className="mt-5 text-[38px] font-black leading-[1.04] tracking-[-.035em] text-[#07163f] sm:text-[48px] lg:text-[50px]">
              One connected
              <br />
              platform for every
              <br />
              learner.
              <span className="mt-1 block font-black text-[#168f8c]">
                And everyone
                <br />
                who supports them.
              </span>
            </h1>
            <p className="mt-5 max-w-115 text-[14px] font-medium leading-6 text-[#1d3150]">
              Adaptive learning, assessment and school management, brought
              together — so what a student practises, what a parent sees and
              what a school records are one connected picture.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/chooseplan"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-linear-to-r from-[#168f8c] to-[#08777c] px-6 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(8,119,124,.18)] transition hover:brightness-95"
              >
                Start Free <ArrowRight className="h-4 w-4" />
              </Link>
              <ActionLink href="/adaptive-learning" outline>
                Explore Adaptive Learning
              </ActionLink>
              <ActionLink href="/schools" outline>
                Explore School Solutions
              </ActionLink>
            </div>
          </div>
          <div className="ui-mockup relative mx-auto w-full max-w-175 overflow-hidden rounded-[18px] border-2 border-[#b8dfd8] bg-[#fffdf4] shadow-[0_18px_42px_rgba(20,101,94,.16)]">
            <div className="grid min-h-[540px] grid-cols-[112px_1fr] sm:grid-cols-[136px_1fr]">
              <aside className="flex flex-col bg-linear-to-b from-[#197f79] to-[#258f8b] px-3 py-5 text-white sm:px-4">
                <p className="px-1 text-sm font-extrabold">AttoLearn</p>
                <nav className="mt-6 space-y-1 text-[10px] font-semibold sm:text-xs">
                  {[
                    [Home, "Overview"],
                    [BookOpen, "Learning"],
                    [ClipboardCheck, "Assessments"],
                    [BarChart3, "Reports"],
                    [Users, "Students"],
                    [Layers3, "Classes"],
                    [UserRoundCheck, "Parents"],
                    [School, "School"],
                  ].map(([Icon, label], index) => {
                    const I = Icon as typeof Home;
                    return (
                      <div
                        key={String(label)}
                        className={`flex items-center gap-2 rounded-md px-2 py-2 ${index === 0 ? "bg-white/18" : ""}`}
                      >
                        <I className="h-3.5 w-3.5 shrink-0" />
                        <span>{String(label)}</span>
                      </div>
                    );
                  })}
                </nav>
                <div className="mt-auto flex justify-around pt-5 text-white/85">
                  <Bell className="h-4 w-4" />
                  <CircleHelp className="h-4 w-4" />
                  <Settings className="h-4 w-4" />
                </div>
              </aside>
              <div className="flex min-h-[540px] flex-col p-4 sm:p-5">
                <h2 className="text-[22px] font-black text-[#07163f]">
                  Overview
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-2 xl:grid-cols-4">
                  {[
                    ["Students", "2,145", Users],
                    ["Active Learners", "1,783", BarChart3],
                    ["Assessments", "356", ClipboardCheck],
                    ["Learning Sessions", "8,562", Clock3],
                  ].map(([label, value, Icon]) => {
                    const I = Icon as typeof Users;
                    return (
                      <div
                        key={String(label)}
                        className="flex min-h-26 min-w-0 flex-col rounded-lg bg-white p-3 shadow-[0_4px_16px_rgba(29,86,83,.06)]"
                      >
                        <p className="whitespace-nowrap text-[11px] font-extrabold leading-none text-slate-600 sm:text-xs">
                          {String(label)}
                        </p>
                        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                          <b className="whitespace-nowrap text-[22px] font-black leading-none tracking-[-.02em] text-[#07163f] sm:text-[26px]">
                            {String(value)}
                          </b>
                          <I className="h-4 w-4 text-[#07958f]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 grid flex-1 gap-3 lg:grid-cols-[1.45fr_.85fr]">
                  <div className="rounded-lg bg-white p-4 shadow-[0_4px_16px_rgba(29,86,83,.06)]">
                    <p className="text-sm font-black text-[#07163f]">
                      Learning Progress
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-slate-500">
                      Average progress across all students
                    </p>
                    <div className="mt-4 flex h-28 items-end gap-2">
                      <div className="flex h-full w-8 flex-col justify-between text-[11px] font-semibold text-slate-500">
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
                      </div>
                      <div className="relative h-full flex-1 border-b border-l border-slate-100">
                        <svg
                          viewBox="0 0 260 100"
                          className="absolute inset-0 h-full w-full"
                          aria-hidden="true"
                        >
                          <polyline
                            points="0,78 38,80 70,64 105,69 142,59 176,53 214,33 260,9"
                            fill="none"
                            stroke="#087f82"
                            strokeWidth="4"
                          />
                          <g fill="#087f82">
                            {[
                              [0, 78],
                              [38, 80],
                              [70, 64],
                              [105, 69],
                              [142, 59],
                              [176, 53],
                              [214, 33],
                              [260, 9],
                            ].map(([cx, cy]) => (
                              <circle
                                key={`${cx}-${cy}`}
                                cx={cx}
                                cy={cy}
                                r="4"
                              />
                            ))}
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow-[0_4px_16px_rgba(29,86,83,.06)]">
                    <p className="text-sm font-black text-[#07163f]">
                      Subject Mastery
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-4">
                      <div className="h-23 w-23 rounded-full bg-[conic-gradient(#176b68_0_42%,#f2ac16_42%_70%,#58ad3a_70%)] p-4">
                        <div className="h-full w-full rounded-full bg-white" />
                      </div>
                      <div className="space-y-3 text-xs font-extrabold">
                        <p>
                          <i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#176b68]" />
                          Maths&nbsp;&nbsp;72%
                        </p>
                        <p>
                          <i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#f2ac16]" />
                          English&nbsp;&nbsp;58%
                        </p>
                        <p>
                          <i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#58ad3a]" />
                          Science&nbsp;&nbsp;65%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid min-h-38 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-white p-4 shadow-[0_4px_16px_rgba(29,86,83,.06)]">
                    <p className="text-sm font-black text-[#07163f]">
                      Real-time Activity
                    </p>
                    {[
                      "Algebra: Linear Equations",
                      "English: Reading Comprehension",
                      "Science: Forces and Motion",
                    ].map((item) => (
                      <p
                        key={item}
                        className="mt-2.5 flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-700"
                      >
                        <span className="flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-[#087f82]" />
                          {item}
                        </span>
                        <b className="rounded bg-green-50 px-1.5 py-1 text-green-600">
                          Completed
                        </b>
                      </p>
                    ))}
                  </div>
                  <div className="rounded-lg bg-white p-4 shadow-[0_4px_16px_rgba(29,86,83,.06)]">
                    <p className="text-sm font-black text-[#07163f]">
                      Next Steps
                    </p>
                    {[
                      "5 students practise in Algebra",
                      "3 assessments ready to review",
                      "2 upcoming sessions scheduled",
                    ].map((item) => (
                      <p
                        key={item}
                        className="mt-3.5 flex items-center justify-between gap-2 text-[11px] font-semibold text-slate-700"
                      >
                        <span>{item}</span>
                        <ArrowRight className="h-3 w-3" />
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-container relative pb-8">
          <div className="grid gap-5 rounded-2xl border border-[#d7e6df] bg-[#fffdf4]/95 px-7 py-8 shadow-[0_10px_26px_rgba(21,91,86,.08)] sm:grid-cols-3">
            {[
              "Foundation to Year 10",
              "Maths, English and Science",
              "7–12 minute sessions",
            ].map((label, index) => (
              <div
                key={label}
                className="flex items-center justify-center gap-5 text-center sm:min-h-16 sm:border-r sm:border-[#ddd8c9] sm:last:border-0"
              >
                <CapabilityIcon index={index} />
                <span className="text-base font-black text-[#07163f]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#fffdf4] py-14 lg:py-16">
        <div className="pointer-events-none absolute -left-28 -top-32 h-72 w-72 rounded-full bg-[#dff4ee]/80" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#d9f4ed]/65" />
        <div className="site-container relative">
          <div className="text-center">
            <div className="flex items-center justify-center gap-5">
              <span className="h-1 w-9 rounded-full bg-[#f2a800]" />
              <h2 className="text-[30px] font-black tracking-[-.025em] text-[#075f68] sm:text-[38px]">
                Choose how you use AttoLearn
              </h2>
              <span className="h-1 w-9 rounded-full bg-[#f2a800]" />
            </div>
            <p className="mt-3 text-base font-medium text-slate-500">
              Start with the pathway that matches your role.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {pathways.map(({ image, title, copy, href, link }) => (
              <article
                key={title}
                className="flex min-h-100 flex-col rounded-xl border border-[#ece6d8] bg-[#fffef8] p-5 shadow-[0_8px_24px_rgba(57,78,68,.07)]"
              >
                <div className="relative mx-auto h-28 w-full">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 text-xl font-black text-[#075f68]">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] font-medium leading-7 text-[#3d4548]">
                  {copy}
                </p>
                <Link
                  href={href}
                  className="mt-auto inline-flex items-center gap-1 pt-5 text-[15px] font-extrabold text-[#155d62]"
                >
                  {link} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="site-container">
          <div className="text-center">
            <h2 className="text-[30px] font-extrabold text-[#075f68] sm:text-[38px]">
              Learn. Assess. Manage.
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Three connected capabilities, each useful on its own and stronger
              together.
            </p>
          </div>
          <div className="mt-10">
            {[
              {
                title: "Adaptive Learning is the heart of AttoLearn",
                copy: "Short practice sessions become useful learning evidence. That evidence helps AttoLearn choose one clear, manageable next step.",
                bullets: [
                  "7–12 minute focused sessions",
                  "One clear next step",
                  "Evidence beyond right and wrong",
                  "Plain-language reasons",
                ],
                button: "Explore Adaptive Learning",
                image:
                  "/images/homepage/learn-assess-manage/adaptive-learning-tablet.png",
                href: "/adaptive-learning",
                reverse: false,
              },
              {
                title: "Assessment for everyone",
                copy: "Families, home educators, tutors, centres and schools can use assessment in ways that suit their role.",
                bullets: [],
                button: "Explore Paper Generator",
                image:
                  "/images/homepage/learn-assess-manage/family-assessment.png",
                href: "/papergenerator",
                reverse: true,
              },
              {
                title: "A connected school ecosystem",
                copy: "Schools can connect adaptive learning, homework, assessment, communication and everyday operations.",
                bullets: [],
                button: "Explore School Solutions",
                image:
                  "/images/homepage/learn-assess-manage/school-dashboard.png",
                href: "/schools",
                reverse: false,
              },
            ].map((item) => (
              <article
                key={item.title}
                className="content-split py-12 first:pt-0 last:pb-0"
              >
                <div
                  className={`${item.reverse ? "lg:order-2 lg:pl-4" : "lg:pr-4"}`}
                >
                  <h3 className="text-[28px] font-black leading-[1.16] tracking-[-.02em] text-[#075f68] sm:text-[32px] lg:text-[36px]">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-125 text-[16px] font-medium leading-7 text-[#3d4650] sm:text-[17px]">
                    {item.copy}
                  </p>
                  {item.bullets.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {item.bullets.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-3 text-[15px] font-semibold text-[#283840] sm:text-[16px]"
                        >
                          <CheckCircle2
                            className="h-5 w-5 shrink-0 text-[#087f84]"
                            strokeWidth={2.6}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={item.href}
                    className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-[#08757b] px-5 text-sm font-extrabold text-white"
                  >
                    {item.button} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div
                  className={`content-split-media relative order-2 aspect-630/500 overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(79,55,31,.08)] ${item.reverse ? "content-split-media-left lg:order-1" : "content-split-media-right"}`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 560px,100vw"
                    quality={100}
                    className="object-cover object-center"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff_0%,#fbfffe_100%)] py-16 lg:py-20">
        <div className="site-container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-[34px] font-black leading-[1.12] tracking-[-.025em] text-[#075f68] sm:text-[44px] lg:text-[48px]">
              Learning is not a single score.
              <br />
              <span className="text-[#075f68]">
                Learning is a pattern of evidence.
              </span>
            </h2>
            <p className="mt-5 text-[16px] font-medium leading-7 text-slate-600 sm:text-[17px]">
              A child can get the same answer right for very different reasons.
              AttoLearn looks at the same skill seven ways, so what you see
              reflects understanding rather than a tally of ticks.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            {evidence.map(({ image, title, copy }) => (
              <article
                key={title}
                className="flex min-h-72 flex-col rounded-xl border border-[#eee7da] bg-[#fffef8] p-4 text-center shadow-[0_7px_22px_rgba(63,81,69,.06)]"
              >
                <div className="relative mx-auto h-28 w-28">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 text-[17px] font-black leading-5 text-[#075f68]">
                  {title}
                </h3>
                <p className="mt-3 text-[14px] font-medium leading-6 text-[#596067]">
                  {copy}
                </p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-7 flex max-w-4xl flex-col items-center gap-4 rounded-xl border-l-4 border-[#f0a01a] bg-[#fff8e8] px-5 py-4 sm:flex-row">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f5a817] text-white">
              <GraduationCap className="h-7 w-7" />
            </span>
            <p className="text-sm leading-6 text-slate-700">
              <b>Mastery</b> is what a learner appears to know.{" "}
              <b>Evidence Confidence</b> is how reliable that picture is right
              now — the strength of the evidence, not the child’s self-belief.
            </p>
          </div>
          <div className="mt-6 text-center">
            <ActionLink href="/why-attolearn">
              Read Our Learning Philosophy <ArrowRight className="h-4 w-4" />
            </ActionLink>
          </div>
        </div>
      </section>

      <section className="bg-[#fafbff] py-16">
        <div className="site-container">
          <div className="text-center">
            <h2 className="text-[40px] font-black leading-[1.02] tracking-[-.035em] text-[#075f68] sm:text-[52px] lg:text-[58px]">
              Already supporting
              <br />
              school <span className="text-[#075f68]">communities</span>
            </h2>
            <p className="mt-4 text-[16px] font-medium text-slate-500 sm:text-[17px]">
              Current conservative public reach figures.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              [
                School,
                "50+",
                "Schools",
                "Partnering for better learning.",
                "bg-[#e7f6f2] text-[#168f8c]",
                "text-[#168f8c]",
              ],
              [
                Users,
                "4,000+",
                "Students",
                "Growing every day with AttoLearn.",
                "bg-[#eef7df] text-[#45a627]",
                "text-[#45a627]",
              ],
              [
                GraduationCap,
                "100+",
                "Teachers",
                "Empowering educators to make an impact.",
                "bg-[#f7eafa] text-[#8520c2]",
                "text-[#8520c2]",
              ],
            ].map(([Icon, value, label, copy, iconStyle, valueStyle]) => {
              const I = Icon as typeof School;
              return (
                <article
                  key={String(label)}
                  className="flex min-h-38 items-center rounded-xl border border-[#eee8dc] bg-[#fffef9] p-5 shadow-[0_7px_22px_rgba(63,81,69,.06)]"
                >
                  <span
                    className={`grid h-24 w-24 shrink-0 place-items-center rounded-full ${String(iconStyle)}`}
                  >
                    <I className="h-13 w-13" strokeWidth={1.8} />
                  </span>
                  <span className="mx-5 h-22 w-px shrink-0 bg-[#cfddd5]" />
                  <div>
                    <p
                      className={`text-[36px] font-black leading-none tracking-[-.02em] sm:text-[40px] ${String(valueStyle)}`}
                    >
                      {String(value)}
                    </p>
                    <p className="mt-3 text-[14px] font-black uppercase text-[#111445]">
                      {String(label)}
                    </p>
                    <p className="mt-2 text-[14px] font-medium leading-5 text-slate-600">
                      {String(copy)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          <blockquote className="mt-6 flex items-center gap-6 rounded-xl bg-linear-to-r from-[#075b61] to-[#064a52] px-7 py-6 text-white shadow-[0_8px_22px_rgba(5,72,79,.16)]">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#2c8f90] text-white">
              <Quote className="h-8 w-8 rotate-180 fill-current" />
            </span>
            <span className="h-12 w-px bg-white/35" />
            <div>
              <p className="text-[18px] font-semibold leading-7 sm:text-[20px]">
                “From admissions to exams, it is all in one smart system. Super
                efficient.”
              </p>
              <cite className="mt-1 block text-[14px] font-medium not-italic text-[#56c2bd]">
                School-user feedback
              </cite>
            </div>
            <span className="ml-auto hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-[#2c8f90] text-white sm:grid">
              <Quote className="h-8 w-8 fill-current" />
            </span>
          </blockquote>
        </div>
      </section>

      <section className="py-14">
        <div className="site-container">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-[#075f68]">
              Start with the <span className="text-[#075f68]">AttoLearn</span>{" "}
              pathway that fits you
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Different starting points. One connected platform.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [
                "/images/homepage/pathway-photos/families.png",
                "Families",
                "Start with one child and explore adaptive learning at home.",
                "/families",
                Home,
              ],
              [
                "/images/homepage/pathway-photos/tutors-centres.png",
                "Tutors & Centres",
                "Explore support across your teaching practice.",
                "/tutors",
                Building2,
              ],
              [
                "/images/homepage/pathway-photos/schools.png",
                "Schools",
                "See how learning, assessment and operations connect.",
                "/schools",
                School,
              ],
            ].map(([src, title, copy, href, Icon]) => {
              const I = Icon as typeof Home;
              return (
                <Link
                  key={String(title)}
                  href={String(href)}
                  className="group relative min-h-56 overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(15,74,75,.10)]"
                >
                  <Image
                    src={String(src)}
                    alt=""
                    fill
                    sizes="(min-width:768px) 33vw,100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-[#064f56]/96" />
                  <div className="absolute inset-x-0 bottom-0 flex min-h-24 items-center gap-4 px-5 py-4 text-white">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#fffdf4] text-[#168f8c]">
                      <I className="h-9 w-9" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="text-[18px] font-black">
                        {String(title)}
                      </h3>
                      <p className="mt-1 max-w-70 text-[14px] font-medium leading-5 text-white/90">
                        {String(copy)}
                      </p>
                    </div>
                    <span className="ml-auto grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#168f8c]">
                      <ArrowRight className="h-6 w-6" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfcff] py-16">
        <div className="site-container">
          <div className="text-center">
            <p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#ee8b00]">
              The small print, said plainly
            </p>
            <h2 className="mt-3 text-[30px] font-extrabold text-[#075f68] sm:text-[38px]">
              Things worth knowing before you pay
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {finePrint.map(({ image, title, copy }) => (
              <article
                key={title}
                className="flex min-h-60 flex-col rounded-xl border border-[#eee7da] bg-[#fffef8] p-5 shadow-[0_7px_22px_rgba(63,81,69,.06)]"
              >
                <div className="relative h-20 w-20">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 text-[18px] font-black text-[#075f68]">
                  {title}
                </h3>
                <p className="mt-3 text-[14px] font-medium leading-6 text-[#596067]">
                  {copy}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-5 flex flex-col items-center gap-5 rounded-xl border-2 border-dashed border-[#f0a01a] bg-[#fff9ef] px-6 py-5 sm:flex-row">
            <span className="grid h-18 w-18 shrink-0 place-items-center rounded-xl bg-white text-[#ee8b00]">
              <ReceiptText className="h-11 w-11" />
            </span>
            <div>
              <h3 className="text-lg font-extrabold text-[#075f68]">On tax</h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Whether the figures shown include GST or VAT determines the
                final amount you pay, and consumer price display rules differ by
                market.
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase text-[#ee8b00]">
                Tax-inclusive vs tax-exclusive display to be confirmed per
                market before these prices go live.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden text-white">
        <Image
          src="/images/homepage/pre-footer/home-start-free-banner.png"
          alt="Family learning together at home"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#075f68]/82" />
        <div className="site-container relative flex min-h-64 flex-col items-center justify-center py-12 text-center">
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
      </section>
    </main>
  );
}
