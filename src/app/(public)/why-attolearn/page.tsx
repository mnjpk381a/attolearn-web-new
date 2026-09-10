import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";

const scoreCards = [
  [
    "/images/why-attolearn/score-question.png",
    "Two correct answers",
    "may not show the same understanding",
    "One learner worked it out; another guessed. A score alone can’t tell the difference.",
  ],
  [
    "/images/why-attolearn/score-lightbulb.png",
    "Hints and",
    "support matter",
    "A correct answer reached after three hints means something different from one reached alone.",
  ],
  [
    "/images/why-attolearn/score-calendar.png",
    "Learning today",
    "may not last",
    "What’s correct this week isn’t automatically still true next month.",
  ],
  [
    "/images/why-attolearn/score-book.png",
    "Success on familiar",
    "questions may not show transfer",
    "Doing well on practice-style questions doesn’t confirm the idea works in a new context.",
  ],
] as const;

const dimensions = [
  [
    "/images/why-attolearn/dimension-core.png",
    "Core Understanding",
    "Does the learner really understand the idea?",
    "explaining why a method works, not just applying it.",
    "#168b8e",
    "bg-[#f0f8ed]",
  ],
  [
    "/images/why-attolearn/dimension-fluency.png",
    "Fluency",
    "Can the learner use it smoothly?",
    "solving without stopping to re-derive each step.",
    "#4d4ee9",
    "bg-[#f5f1fb]",
  ],
  [
    "/images/why-attolearn/dimension-retention.png",
    "Retention",
    "Can the learner still do it later?",
    "the same skill, checked again weeks on.",
    "#2d9737",
    "bg-[#f7f6df]",
  ],
  [
    "/images/why-attolearn/dimension-transfer.png",
    "Transfer",
    "Can the learner apply it in a different situation?",
    "using the idea in a new, unfamiliar question.",
    "#7d14b7",
    "bg-[#fbebef]",
  ],
  [
    "/images/why-attolearn/dimension-reasoning.png",
    "Reasoning",
    "Can the learner explain why?",
    "justifying a choice, not just stating an answer.",
    "#ff8e10",
    "bg-[#fff4dc]",
  ],
  [
    "/images/why-attolearn/dimension-independence.png",
    "Independence",
    "Can the learner do it without too much help?",
    "fewer hints needed over time on the same skill.",
    "#ef3272",
    "bg-[#fcecf0]",
  ],
  [
    "/images/why-attolearn/dimension-consistency.png",
    "Consistency",
    "Is the learning reliable?",
    "getting it right isn’t a one-off.",
    "#26a8a6",
    "bg-[#f0f8f1]",
  ],
] as const;

function EditorialTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`editorial-heading text-[#075e65] ${className}`}>
      {children}
    </h2>
  );
}

export default function WhyAttoLearnPage() {
  return (
    <main className="why-page bg-white text-slate-800">
      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_84%_25%,rgba(214,239,255,.9)_0,rgba(239,248,255,.64)_27%,transparent_48%),linear-gradient(118deg,#f8ffff_0%,#fffdf8_51%,#f4faff_100%)]">
        <div className="pointer-events-none absolute left-0 top-12 h-48 w-28 opacity-35 [background-image:radial-gradient(circle,#71d6db_1.5px,transparent_1.5px)] [background-size:17px_17px]" />
        <div className="pointer-events-none absolute -bottom-52 -left-44 h-96 w-[48rem] rotate-6 rounded-[50%] bg-[#bcebea]/65" />
        <div className="pointer-events-none absolute -bottom-56 -left-36 h-80 w-[42rem] rotate-12 rounded-[50%] border-2 border-white/80" />

        <div className="site-container relative grid min-h-[760px] items-center gap-4 py-12 lg:-translate-y-6 lg:grid-cols-[.83fr_1.17fr] lg:py-16">
          <div className="relative z-20 max-w-[500px] lg:self-start">
            <div className="flex items-center gap-3">
              <p className="text-[12px] font-extrabold uppercase tracking-[.03em] text-[#087f84]">
                Why AttoLearn
              </p>
              <span className="h-px w-12 bg-[#087f84]" />
            </div>
            <h1 className="mt-5 text-[43px] font-extrabold leading-[1.13] tracking-[-.035em] text-[#092e52] sm:text-[56px] lg:text-[58px]">
              Learning is not
              <br />a single score.
              <br />
              <span className="text-[#08a6aa]">It is a pattern</span>
              <br />
              <span className="text-[#7752d3]">of evidence.</span>
            </h1>
            <span className="mt-5 block h-[3px] w-11 rounded-full bg-[#f2a616]" />
            <p className="mt-5 max-w-[390px] text-[16px] leading-[1.55] text-[#526172]">
              The thinking behind Adaptive Learning &mdash;
              <br className="hidden sm:block" /> what AttoLearn actually looks at,
              <br className="hidden sm:block" /> and why it matters.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center gap-3 rounded-md bg-[#087f84] px-7 text-[14px] font-bold text-white shadow-sm transition hover:bg-[#066d72]"
              >
                Start Free <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="#learning-dimensions"
                className="inline-flex h-12 items-center rounded-md border-2 border-[#65bfc1] bg-white/90 px-6 text-[14px] font-bold text-[#087f84] transition hover:bg-[#effafa]"
              >
                Explore How It Works
              </Link>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[660px] items-center justify-center lg:-mr-4 lg:-translate-y-4 lg:self-start xl:-mr-8">
            <Image
              src="/images/why-attolearn/learning-evidence-wheel.png"
              alt="Seven-part AttoLearn learning evidence wheel showing core understanding, fluency, retention, transfer, reasoning, independence, and consistency"
              width={1660}
              height={1660}
              priority
              sizes="(max-width: 1023px) 92vw, 58vw"
              className="h-auto w-full drop-shadow-[0_24px_35px_rgba(48,80,96,.16)]"
            />
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_54%,#fffdf4_0%,#fffaf0_48%,#fffdf8_100%)] px-3 py-14 sm:px-4 lg:px-6 lg:py-18">
        <div className="mx-auto max-w-[1200px] text-center">
          <div className="flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[.025em] text-[#ef9700]">
            <span className="h-px w-11 bg-[#efb34e]" />
            <span>Why right and wrong are not enough</span>
            <span className="h-px w-11 bg-[#efb34e]" />
          </div>
          <EditorialTitle className="mt-3 text-[38px] leading-[1.1] sm:text-[48px]">
            A score doesn&apos;t tell you what happened
          </EditorialTitle>
          <p className="mt-4 text-[17px] text-[#555568]">
            Two correct answers can hide two very different levels of understanding.
          </p>

          <div className="mt-10 grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] lg:gap-8">
            <div className="grid gap-5">
              {[scoreCards[0], scoreCards[2]].map(
                ([iconSrc, lead, highlight, copy], cardIndex) => (
                  <article
                    key={lead}
                    className="grid min-h-[210px] grid-cols-[86px_1px_minmax(0,1fr)] items-center gap-5 rounded-[18px] border border-[#eadfce] bg-white/90 px-5 py-6 text-left shadow-[0_8px_22px_rgba(83,67,38,.09)]"
                  >
                    <div className="flex h-full flex-col items-center justify-between py-1">
                      <Image
                        src={iconSrc}
                        alt=""
                        width={90}
                        height={90}
                        className="h-[74px] w-[74px] rounded-full object-cover"
                      />
                      <div className="text-center">
                        <b className="block text-[26px] leading-none text-[#113d42]">
                          {String(cardIndex * 2 + 1).padStart(2, "0")}
                        </b>
                        <span className="mx-auto mt-3 block h-[3px] w-7 rounded-full bg-[#48b3a9]" />
                      </div>
                    </div>
                    <span className="h-[156px] w-px bg-[#e9ddd1]" />
                    <div>
                      <h3 className="text-[17px] font-bold leading-[1.45] text-[#103f43]">
                        {lead}
                        <span className="block text-[#ee9700]">{highlight}</span>
                      </h3>
                      <p className="mt-6 text-[14px] leading-[1.65] text-[#303548]">{copy}</p>
                    </div>
                  </article>
                ),
              )}
            </div>

            <div className="relative order-first mx-auto flex h-[460px] w-full max-w-[340px] items-center justify-center lg:order-none">
              <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,#fffdf8_0%,#fff8e9_62%,transparent_72%)]" />
              <svg
                aria-hidden="true"
                viewBox="0 0 340 460"
                className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
              >
                <path d="M15 115 H48 L82 155" fill="none" stroke="#55b7b2" strokeWidth="2" strokeDasharray="4 6" />
                <path d="M325 115 H294 L260 155" fill="none" stroke="#f4a20b" strokeWidth="2" strokeDasharray="4 6" />
                <path d="M15 345 H48 L82 305" fill="none" stroke="#8a45c1" strokeWidth="2" strokeDasharray="4 6" />
                <path d="M325 345 H294 L260 305" fill="none" stroke="#73b51d" strokeWidth="2" strokeDasharray="4 6" />
                {[
                  [15, 115, "#55b7b2"], [325, 115, "#f4a20b"],
                  [15, 345, "#8a45c1"], [325, 345, "#73b51d"],
                ].map(([cx, cy, fill]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill={String(fill)} />)}
              </svg>
              <Image
                src="/images/why-attolearn/evidence-target.png"
                alt="Arrow hitting the centre of a teal learning target"
                width={1536}
                height={1536}
                sizes="(max-width: 1023px) 70vw, 320px"
                className="relative z-10 h-auto w-[310px] object-contain drop-shadow-[0_18px_18px_rgba(32,65,65,.18)]"
              />
            </div>

            <div className="grid gap-5">
              {[scoreCards[1], scoreCards[3]].map(
                ([iconSrc, lead, highlight, copy], cardIndex) => (
                  <article
                    key={lead}
                    className="grid min-h-[210px] grid-cols-[86px_1px_minmax(0,1fr)] items-center gap-5 rounded-[18px] border border-[#eadfce] bg-white/90 px-5 py-6 text-left shadow-[0_8px_22px_rgba(83,67,38,.09)]"
                  >
                    <div className="flex h-full flex-col items-center justify-between py-1">
                      <Image
                        src={iconSrc}
                        alt=""
                        width={90}
                        height={90}
                        className="h-[74px] w-[74px] rounded-full object-cover"
                      />
                      <div className="text-center">
                        <b className="block text-[26px] leading-none text-[#113d42]">
                          {String(cardIndex * 2 + 2).padStart(2, "0")}
                        </b>
                        <span className="mx-auto mt-3 block h-[3px] w-7 rounded-full bg-[#48b3a9]" />
                      </div>
                    </div>
                    <span className="h-[156px] w-px bg-[#e9ddd1]" />
                    <div>
                      <h3 className="text-[17px] font-bold leading-[1.45] text-[#103f43]">
                        {lead}
                        <span className="block text-[#ee9700]">{highlight}</span>
                      </h3>
                      <p className="mt-6 text-[14px] leading-[1.65] text-[#303548]">{copy}</p>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
      <section
        id="learning-dimensions"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdf2_0%,#fffef8_100%)] px-3 py-14 sm:px-4 lg:px-6 lg:py-18"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-[radial-gradient(ellipse_at_24%_-20%,rgba(132,185,173,.15),transparent_44%)]" />
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[.16em] text-[#ef8611]">
            <span className="h-px w-7 bg-[#ef9a2a]" />
            <span>The seven learning dimensions</span>
            <span className="h-px w-7 bg-[#ef9a2a]" />
          </div>
          <EditorialTitle className="mt-2 text-[40px] leading-[1.08] sm:text-[49px]">
            What AttoLearn actually looks at
          </EditorialTitle>
          <p className="mx-auto mt-3 max-w-[580px] text-[15px] leading-[1.5] text-[#555568]">
            Each activity collects the evidence it&apos;s suited to collect —
            <br className="hidden sm:block" /> not every dimension, every time.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dimensions.slice(0, 4).map(
              ([iconSrc, title, question, example, accent, exampleBg], index) => (
                <article
                  key={title}
                  className="why-dimension-card relative flex h-full min-h-[226px] min-w-0 flex-col rounded-[14px] border border-[#eee5d7] bg-white/85 px-4 pb-4 pt-6 text-left shadow-[0_7px_18px_rgba(100,76,38,.08)]"
                >
                  <span
                    className="absolute -top-px left-0 inline-flex h-7 min-w-12 items-center justify-center rounded-bl-none rounded-br-[11px] rounded-tl-[14px] rounded-tr-none px-3 text-[15px] font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-2 grid min-h-[104px] min-w-0 grid-cols-[56px_minmax(0,1fr)] items-start gap-3 overflow-hidden">
                    <Image
                      src={iconSrc}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="why-dimension-title whitespace-nowrap text-[#123e43]">{title}</h3>
                      <span className="mt-2 block h-0.5 w-5" style={{ backgroundColor: accent }} />
                      <p className="mt-2 min-h-[52px] text-[12px] leading-[1.45] text-[#303548]">{question}</p>
                    </div>
                  </div>
                  <div className={`mt-auto h-[72px] rounded-md px-4 py-3 ${exampleBg}`}>
                    <p className="text-[12px] font-semibold leading-[1.45] text-[#273442]">
                      <span style={{ color: accent }}>Example:</span> {example}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>

          <div className="mx-auto mt-4 grid max-w-[960px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dimensions.slice(4).map(
              ([iconSrc, title, question, example, accent, exampleBg], index) => (
                <article
                  key={title}
                  className="why-dimension-card relative flex h-full min-h-[226px] min-w-0 flex-col rounded-[14px] border border-[#eee5d7] bg-white/85 px-4 pb-4 pt-6 text-left shadow-[0_7px_18px_rgba(100,76,38,.08)]"
                >
                  <span
                    className="absolute -top-px left-0 inline-flex h-7 min-w-12 items-center justify-center rounded-br-[11px] rounded-tl-[14px] px-3 text-[15px] font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {String(index + 5).padStart(2, "0")}
                  </span>
                  <div className="mt-2 grid min-h-[104px] min-w-0 grid-cols-[56px_minmax(0,1fr)] items-start gap-3 overflow-hidden">
                    <Image
                      src={iconSrc}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="why-dimension-title whitespace-nowrap text-[#123e43]">{title}</h3>
                      <span className="mt-2 block h-0.5 w-5" style={{ backgroundColor: accent }} />
                      <p className="mt-2 min-h-[52px] text-[12px] leading-[1.45] text-[#303548]">{question}</p>
                    </div>
                  </div>
                  <div className={`mt-auto h-[72px] rounded-md px-4 py-3 ${exampleBg}`}>
                    <p className="text-[12px] font-semibold leading-[1.45] text-[#273442]">
                      <span style={{ color: accent }}>Example:</span> {example}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>

          <div className="mx-auto mt-8 grid max-w-[1030px] grid-cols-[4px_48px_minmax(0,1fr)] items-center gap-4 overflow-hidden rounded-lg bg-[#fff9e9] pr-6 text-left shadow-[0_4px_12px_rgba(114,83,31,.04)]">
            <span className="h-full bg-[#ff9215]" />
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff9215] text-xl text-white">★</span>
            <p className="py-3 text-[13px] leading-[1.45] text-[#3b3a42]">
              <strong className="font-extrabold text-[#24242a]">Not every activity measures everything.</strong> Each activity collects the evidence it&apos;s suited to collect.
              <br />Retention, transfer, reasoning and consistency develop through different activities and over time —
              <br className="hidden sm:block" /> not from a single session.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#fffdf3] px-4 py-10 sm:px-6 lg:py-14">
        <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#fff2bd_0%,#fffaf0_56%,#d4eff0_100%)] px-5 pb-9 pt-7 sm:px-8 lg:px-10 lg:pb-11">
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rotate-45 bg-[#8acdd2]/30" />
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 text-[12px] font-bold uppercase tracking-[.04em] text-[#ef8c00]"><span className="h-px w-10 bg-[#ef8c00]" /><span>Mastery and confidence</span><span className="h-px w-10 bg-[#ef8c00]" /></div>
            <EditorialTitle className="mt-2 text-[31px] sm:text-[38px]">Two different questions, kept separate</EditorialTitle>
            <p className="mt-2 text-[14px] text-[#4f5060]">What a learner appears to know, and how reliable that picture actually is, are not the same thing.</p>
          </div>
          <div className="relative mt-8 grid gap-5 md:grid-cols-2">
            <article className="grid min-h-[190px] grid-cols-[118px_1px_minmax(0,1fr)] items-center gap-5 rounded-[13px] bg-white/90 p-6 text-left shadow-[0_8px_22px_rgba(94,67,24,.1)]">
              <div className="grid h-[112px] w-[112px] place-items-center rounded-full bg-[#fff4cd]"><Image src="/images/why-attolearn/mastery-mountain.png" alt="Teal mountain peaks with a success flag" width={180} height={180} className="h-[104px] w-[104px] object-contain" /></div>
              <span className="h-[132px] bg-[#efa316]" />
              <div><h3 className="editorial-heading text-[23px] text-[#164e52]">Mastery</h3><p className="mt-3 text-[14px] leading-[1.55] text-[#414252]">The current picture of capability — what the learner appears to know or be able to do right now, based on everyday practice.</p></div>
            </article>
            <article className="grid min-h-[190px] grid-cols-[118px_1px_minmax(0,1fr)] items-center gap-5 rounded-[13px] bg-white/90 p-6 text-left shadow-[0_8px_22px_rgba(94,67,24,.1)]">
              <div className="grid h-[112px] w-[112px] place-items-center rounded-full bg-[#e9f4e8]"><Image src="/images/why-attolearn/confidence-shield.png" alt="Teal confidence shield with a check mark" width={180} height={180} className="h-[94px] w-[94px] object-contain" /></div>
              <span className="h-[132px] bg-[#187b7d]" />
              <div><h3 className="editorial-heading text-[23px] text-[#164e52]">Confidence</h3><p className="mt-3 text-[14px] leading-[1.55] text-[#414252]">The reliability of the evidence behind that picture. High mastery with low confidence means: promising, but not yet certain.</p></div>
            </article>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-[920px] items-center gap-8 px-2 md:grid-cols-[330px_minmax(0,1fr)] lg:mt-14">
          <div className="flex justify-center"><Image src="/images/why-attolearn/missing-evidence.png" alt="Clipboard with checklist and magnifying glass showing a question mark" width={420} height={500} className="h-auto w-[285px] object-contain" /></div>
          <div className="text-left">
            <div className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[.03em] text-[#ef8c00]"><span className="h-px w-10 bg-[#ef8c00]" /><span>Missing evidence is not failure</span><span className="h-px w-10 bg-[#ef8c00]" /></div>
            <EditorialTitle className="mt-3 text-[32px] leading-[1.08] sm:text-[39px]">&quot;Not yet observed&quot; is different<br />from &quot;not achieved&quot;</EditorialTitle>
            <span className="mt-5 block h-1 w-14 rounded-full bg-[#168387]" />
            <p className="mt-5 max-w-[540px] text-[14px] leading-[1.65] text-[#4b4b59]">If AttoLearn hasn&apos;t seen enough evidence of a skill yet, that&apos;s treated honestly — as a gap in the picture, not as a mark against the learner.</p>
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_18%,#fffef8_0%,#fffdf2_58%,#fff9e9_100%)] px-4 py-12 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[1230px] text-center">
          <div className="flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[.08em] text-[#f06f12]"><span className="h-px w-10 bg-[#f06f12]" /><span>Secure mastery</span><span className="h-px w-10 bg-[#f06f12]" /></div>
          <EditorialTitle className="mt-2 text-[37px] leading-[1.05] text-[#211160] sm:text-[48px]">What &quot;secure&quot; actually means</EditorialTitle>
          <p className="mx-auto mt-3 max-w-[760px] text-[16px] leading-[1.5] text-[#38335f]">Secure Mastery means the learner has shown reliable, sufficiently independent<br className="hidden sm:block" /> learning over time and across appropriate contexts.</p>

          <div className="mt-7 grid min-h-[182px] grid-cols-[150px_1px_minmax(0,1fr)] items-center gap-6 rounded-[15px] border border-[#f5ddad] border-l-[10px] border-l-[#ff9d00] bg-white/75 px-7 py-6 text-left shadow-[0_9px_24px_rgba(109,79,31,.1)]">
            <Image src="/images/why-attolearn/secure-mastery-shield.png" alt="Golden secure mastery shield with check mark" width={220} height={220} className="mx-auto h-[138px] w-[138px] object-contain" />
            <span className="h-[130px] bg-[#e89b24]" />
            <div className="space-y-4">
              <p className="text-[15px] leading-[1.55] text-[#25242b]"><strong className="font-extrabold text-[#f25316]">What we don&apos;t publish:</strong> thresholds, formulas, dimension weights or confidence cut-offs.</p>
              <p className="text-[15px] leading-[1.55] text-[#25242b]">The definition above is the complete public explanation — the exact mechanics stay internal, the same way any assessment system keeps its precise marking logic private.</p>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[.08em] text-[#23a89f]"><span className="h-px w-10 bg-[#23a89f]" /><span>The evidence-to-experience loop</span><span className="h-px w-10 bg-[#23a89f]" /></div>
            <EditorialTitle className="mt-2 text-[31px] leading-[1.08] text-[#211160] sm:text-[39px]">Evidence should improve the next experience</EditorialTitle>
            <p className="mt-2 text-[14px] text-[#484066]">Not a one-off check — a continuous loop.</p>

            <div className="mx-auto mt-7 grid max-w-[1160px] gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {[
                ["/images/why-attolearn/loop-observe.png", "Observe", "Collect meaningful evidence.", "#4669dd", "#f0eef0"],
                ["/images/why-attolearn/loop-understand.png", "Understand", "Turn evidence into insight.", "#24aaa1", "#edf5e9"],
                ["/images/why-attolearn/loop-support.png", "Support", "Provide the right help based on needs.", "#ff9115", "#fff2d7"],
                ["/images/why-attolearn/loop-practise.png", "Practise", "Put learning into practice.", "#ad20c2", "#fbe9ee"],
                ["/images/why-attolearn/loop-recheck.png", "Recheck", "Gather new evidence and reassess.", "#78bc19", "#f7f6d9"],
              ].map(([src, title, copy, color, circle], index) => (
                <article key={title} className="relative flex min-w-0 flex-col items-center text-center">
                  <div className="relative grid h-[174px] w-[174px] place-items-center rounded-full" style={{ backgroundColor: circle }}>
                    <Image src={src} alt="" width={1024} height={1024} className="h-[138px] w-[138px] object-contain" />
                  </div>
                  {index < 4 && <span className="absolute right-[-18px] top-[64px] hidden text-[38px] font-light leading-none text-[#96909a] lg:block">→</span>}
                  <span className="mt-3 block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <h3 className="mt-2 text-[14px] font-bold text-[#242050]">{title}</h3>
                  <p className="mt-1 max-w-[175px] text-[11px] leading-[1.35] text-[#4e4864]">{copy}</p>
                </article>
              ))}
            </div>            <div className="mx-auto mt-2 max-w-[1040px]">
              <svg viewBox="0 0 1040 42" className="h-[42px] w-full overflow-visible" aria-hidden="true">
                <path d="M1025 0 V15 Q1025 30 1010 30 H30 Q15 30 15 15 V3" fill="none" stroke="#aaa2ad" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" />
                <path d="M8 11 L15 3 L22 11" fill="none" stroke="#aaa2ad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_0%,#fffef8_0%,#fffdf2_58%,#fff9e9_100%)] px-4 py-12 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[1230px] text-center">
          <div className="flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[.05em] text-[#f08c00]"><span className="h-px w-9 bg-[#f08c00]" /><span>Child-safe learning</span><span className="h-px w-9 bg-[#f08c00]" /></div>
          <EditorialTitle className="mt-2 text-[38px] leading-[1.06] sm:text-[47px]">Designed to support, not to label</EditorialTitle>
          <p className="mt-3 text-[15px] text-[#555365]">AttoLearn focuses on encouragement, clear next steps, and steady growth.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["/images/why-attolearn/childsafe-encouragement.png", "Encouragement", "over labels", "No raw diagnostic scores or technical terms shown to a child.", "#228d91", "#eff6ed"],
              ["/images/why-attolearn/childsafe-next-step.png", "One clear", "next step", "Never an overwhelming list — always one manageable action.", "#ff9300", "#fff5dc"],
              ["/images/why-attolearn/childsafe-support.png", "Support after", "repeated difficulty", "The system responds to struggle by helping, not by simply repeating.", "#7610a8", "#fbedef"],
              ["/images/why-attolearn/childsafe-growth.png", "Small challenges", "after stable success", "Growth is offered gradually, once a skill is genuinely secure.", "#6da920", "#f6f5dc"],
            ].map(([iconSrc, lineOne, lineTwo, copy, accent, circleBg]) => (
              <article key={lineOne} className="flex min-h-[310px] flex-col items-center rounded-[14px] border border-[#eee5d9] bg-white/55 px-6 pb-7 pt-5 shadow-[0_4px_12px_rgba(105,79,37,.035)]">
                <span className="grid h-[116px] w-[116px] place-items-center rounded-full" style={{ backgroundColor: circleBg }}>
                  <Image src={iconSrc} alt="" width={1280} height={1280} className="h-[72px] w-[72px] object-contain" />
                </span>
                <h3 className="mt-4 text-[18px] font-extrabold leading-[1.25]" style={{ color: accent }}>{lineOne}<br />{lineTwo}</h3>
                <span className="mt-4 block h-[3px] w-10 rounded-full" style={{ backgroundColor: accent }} />
                <p className="mt-5 max-w-[210px] text-[13px] leading-[1.55] text-[#454553]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_0%,#fffef9_0%,#fffdf3_60%,#fffaf0_100%)] px-4 py-12 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[1230px] text-center">
          <div className="flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-[.05em] text-[#f08c00]"><span className="h-px w-9 bg-[#f08c00]" /><span>Explainable adaptation</span><span className="h-px w-9 bg-[#f08c00]" /></div>
          <EditorialTitle className="mt-2 text-[38px] leading-[1.06] sm:text-[46px]">A learner always knows why</EditorialTitle>
          <p className="mt-3 text-[15px] text-[#555365]">Real examples of the plain-language reasons AttoLearn gives.</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              ["/images/why-attolearn/adaptation-memory.png", "“This checks what you", "still remember.”", "#edf5ed", "#eef7f1"],
              ["/images/why-attolearn/adaptation-goal.png", "“This supports your", "current goal.”", "#fff2d5", "#fff9e8"],
              ["/images/why-attolearn/adaptation-practice.png", "“This gives more practice", "before moving on.”", "#fbecef", "#fdf3f3"],
              ["/images/why-attolearn/adaptation-tutor.png", "“This was assigned", "by your tutor.”", "#f4f5dc", "#fbfbea"],
            ].map(([iconSrc, lineOne, lineTwo, bubbleBg, cardBg]) => (
              <article key={lineOne} className="grid min-h-[148px] grid-cols-[150px_minmax(0,1fr)] items-center rounded-[14px] border border-[#eee3cf] px-5 py-4 text-left shadow-[0_3px_10px_rgba(97,72,33,.03)]" style={{ backgroundColor: cardBg }}>
                <div className="relative mx-auto">
                  <span className="grid h-[112px] w-[112px] place-items-center rounded-full" style={{ backgroundColor: bubbleBg }}>
                    <Image src={iconSrc} alt="" width={1280} height={1280} className="h-[66px] w-[66px] object-contain" />
                  </span>
                  <span className="absolute right-[-13px] top-[48px] h-7 w-7 rotate-45" style={{ backgroundColor: bubbleBg }} />
                </div>
                <blockquote className="pl-4 text-[21px] font-semibold italic leading-[1.45] text-[#24536a]">{lineOne}<br />{lineTwo}</blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_0%,#fffef8_0%,#fff9e9_100%)] px-4 py-12 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[1230px] text-center">
          <div className="flex items-center justify-center gap-4 text-[14px] font-bold uppercase tracking-[.06em] text-[#27a99f]"><span className="h-[2px] w-14 bg-[#27a99f]" /><span>The philosophy promise</span><span className="h-[2px] w-14 bg-[#27a99f]" /></div>
          <EditorialTitle className="mt-3 text-[42px] leading-[1.04] sm:text-[56px]">What this means for each person</EditorialTitle>
          <p className="mt-4 text-[17px] leading-[1.5] text-[#555568]">One philosophy. Different experiences. The same promise — meaningful learning for every learner.</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["/images/why-attolearn/promise-students.png", "Students", "Are supported.", "#19566a", "#edf4e8"],
              ["/images/why-attolearn/promise-parents.png", "Parents", "Understand.", "#ef9206", "#fff2d4"],
              ["/images/why-attolearn/promise-tutors.png", "Tutors", "Teach with clearer evidence.", "#7b0ca4", "#f9e9ef"],
              ["/images/why-attolearn/promise-schools.png", "Schools", "Connect learning with purpose.", "#4b8c12", "#f6f4d7"],
            ].map(([imageSrc, title, copy, accent, circleBg]) => (
              <article key={title} className="flex min-h-[360px] flex-col items-center rounded-[18px] border border-[#eee4d5] bg-white/65 px-6 pb-7 pt-5 shadow-[0_10px_24px_rgba(96,70,31,.09)]">
                <span className="grid h-[184px] w-[184px] place-items-center rounded-full" style={{ backgroundColor: circleBg }}>
                  <Image src={imageSrc} alt="" width={1280} height={1280} className="h-[166px] w-[166px] object-contain" />
                </span>
                <h3 className="mt-3 text-[24px] font-extrabold leading-tight" style={{ color: accent }}>{title}</h3>
                <p className="mt-3 text-[15px] leading-[1.45] text-[#555568]">{copy}</p>
                <span className="mt-auto block h-[4px] w-14 rounded-full" style={{ backgroundColor: accent }} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#fffaf0] py-10">
        <div className="relative min-h-[410px] w-full overflow-hidden bg-[radial-gradient(circle_at_68%_54%,rgba(71,199,164,.65)_0%,rgba(21,139,124,.38)_25%,transparent_47%),linear-gradient(115deg,#075660_0%,#08766f_45%,#138f79_100%)] text-white shadow-[0_10px_28px_rgba(3,74,76,.16)]">
          <div className="pointer-events-none absolute -bottom-48 -left-28 h-[330px] w-[760px] rotate-[8deg] rounded-[50%] bg-[#42b59f]/42" />
          <div className="pointer-events-none absolute -bottom-56 left-[22%] h-[330px] w-[900px] -rotate-[7deg] rounded-[50%] bg-[#75cfad]/28" />
          <div className="relative z-10 flex min-h-[410px] items-center px-7 py-10 sm:px-10 lg:w-[49%] lg:px-12">
            <div className="w-full text-center">
              <div className="mx-auto mb-3 flex w-fit items-end gap-3 text-[#71dbc7]"><span className="h-5 w-1 rounded-full bg-current -rotate-40" /><span className="h-8 w-1 rounded-full bg-current" /><span className="h-5 w-1 rounded-full bg-current rotate-40" /></div>
              <h2 className="editorial-heading text-[42px] leading-[1.04] text-[#fff9e8] sm:text-[52px]">See it in practice</h2>
              <p className="mx-auto mt-5 max-w-[460px] text-[19px] leading-[1.45] text-[#fff9e8]">Explore how this philosophy shapes<br className="hidden sm:block" /> every AttoLearn session.</p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/adaptive-learning" className="inline-flex h-[66px] min-w-[305px] items-center justify-center gap-7 rounded-[14px] bg-[linear-gradient(180deg,#ffe36b_0%,#ffc92e_100%)] px-7 text-[17px] font-extrabold text-[#163844] shadow-[0_7px_14px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5">Explore Adaptive Learning <ArrowRight className="h-6 w-6" strokeWidth={2.4} /></Link>
                <Link href="/" className="inline-flex h-[66px] min-w-[220px] items-center justify-center gap-8 rounded-[14px] bg-[#fffdf4] px-7 text-[17px] font-extrabold text-[#273744] shadow-[0_7px_14px_rgba(0,0,0,.16)] transition hover:-translate-y-0.5">Back to Home <ArrowRight className="h-6 w-6" strokeWidth={2.4} /></Link>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-[3%] hidden w-[49%] items-center justify-center lg:flex">
            <Image src="/images/why-attolearn/see-it-in-practice.png" alt="Open learning book with adaptive learning icons" width={1536} height={1024} className="h-[88%] w-full object-contain object-center [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_94%,transparent_100%)]" />
          </div>
        </div>
      </section>
      <section className="bg-[radial-gradient(circle_at_50%_0%,#fffef8_0%,#fff9e9_100%)] px-4 py-12 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-[1230px] text-center">
          <div className="flex items-center justify-center gap-4 text-[14px] font-bold uppercase tracking-[.05em] text-[#ef8500]"><span className="h-[2px] w-10 bg-[#ef8500]" /><span>The small print, said plainly</span><span className="h-[2px] w-10 bg-[#ef8500]" /></div>
          <EditorialTitle className="mt-3 text-[42px] leading-[1.04] sm:text-[55px]">Things worth knowing before you pay</EditorialTitle>
          <span className="mx-auto mt-4 block h-[4px] w-12 rounded-full bg-[#ef8b00]" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["/images/why-attolearn/smallprint-local-prices.png", "Prices are local", "Each market is priced in its own currency, not converted from US dollars."],
              ["/images/why-attolearn/smallprint-cancel.png", "Cancel any time", "Monthly plans stop at the end of the period you’ve paid for."],
              ["/images/why-attolearn/smallprint-records.png", "Your records stay yours", "Learning evidence belongs to the family, including if a school or tutor relationship ends."],
              ["/images/why-attolearn/smallprint-tutor.png", "One invited tutor is free", "A tutor a parent invites is included — the tutor is never billed for that family."],
            ].map(([imageSrc, title, copy]) => (
              <article key={title} className="flex min-h-[270px] flex-col items-center rounded-[16px] border border-[#eee4d5] bg-white/65 px-6 pb-7 pt-4 shadow-[0_8px_22px_rgba(97,70,31,.08)]">
                <span className="grid h-[125px] w-[125px] place-items-center rounded-full bg-[#edf4e8]">
                  <Image src={imageSrc} alt="" width={1280} height={1280} className="h-[112px] w-[112px] object-contain" />
                </span>
                <h3 className="mt-2 text-[18px] font-extrabold leading-tight text-[#173f45]">{title}</h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-[#454553]">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid min-h-[145px] items-center gap-5 rounded-[16px] border-2 border-[#f5bd54] bg-white/45 px-7 py-5 text-left sm:grid-cols-[210px_minmax(0,1fr)]">
            <Image src="/images/why-attolearn/smallprint-tax.png" alt="Tax document with percent symbol" width={1280} height={1280} className="mx-auto h-[125px] w-[145px] object-contain" />
            <div>
              <h3 className="text-[22px] font-extrabold text-[#173f45]">On tax</h3>
              <p className="mt-1 max-w-[860px] text-[15px] leading-[1.45] text-[#333744]">Whether the figures shown include GST or VAT determines the final amount you pay, and consumer price display rules differ by market.</p>
              <p className="mt-2 text-[13px] font-extrabold uppercase tracking-[.02em] text-[#ef770d]">Tax-inclusive vs tax-exclusive display to be confirmed per market before these prices go live</p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative min-h-[280px] overflow-hidden bg-[radial-gradient(circle_at_64%_45%,rgba(43,179,150,.45)_0%,transparent_34%),linear-gradient(108deg,#064b57_0%,#075f63_48%,#087468_100%)] text-white">
        <div className="pointer-events-none absolute -bottom-44 -left-28 h-[290px] w-[620px] rotate-[9deg] rounded-[50%] bg-[#188d7f]/45" />
        <div className="pointer-events-none absolute left-0 top-1/2 h-36 w-24 -translate-y-1/2 rounded-r-full bg-[#0f715f]/45 blur-sm" />
        <div className="relative mx-auto min-h-[280px] max-w-[1230px] px-5 py-7 sm:px-8">
          <div className="relative z-10 flex min-h-[226px] items-center lg:w-[61%]">
            <div className="w-full text-center">
              <h2 className="editorial-heading text-[40px] leading-[1.06] text-[#fff9e8] sm:text-[48px]">Start free, decide later</h2>
              <p className="mt-4 text-[18px] leading-[1.5] text-[#fff9e8]">No card to try it. Move to a paid plan when it&apos;s earning its place.</p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/signup" className="inline-flex h-[62px] min-w-[250px] items-center justify-center gap-12 rounded-[13px] bg-[linear-gradient(180deg,#ffe169_0%,#ffc62d_100%)] px-7 text-[18px] font-extrabold text-[#17434b] shadow-[0_7px_14px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5">Start Free <ArrowRight className="h-6 w-6" strokeWidth={2.4} /></Link>
                <Link href="/contact" className="inline-flex h-[62px] min-w-[255px] items-center justify-center gap-12 rounded-[13px] bg-[#fffdf4] px-7 text-[18px] font-extrabold text-[#263b43] shadow-[0_7px_14px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5">Talk to Sales <ArrowRight className="h-6 w-6" strokeWidth={2.4} /></Link>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-[-5%] hidden w-[52%] items-center justify-end lg:flex">
            <Image src="/images/why-attolearn/start-free-book.png" alt="Glowing open learning book with progress and goal icons" width={1536} height={1024} className="h-[110%] w-full object-cover object-right mix-blend-screen [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_92%,transparent_100%)]" />
          </div>
        </div>
      </section>
    </main>
  );
}




























