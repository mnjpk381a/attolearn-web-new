import Image from "next/image";
import Link from "next/link";
import { SignupLink } from "@/constants/plans";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileText,
  LockKeyhole,
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
  "Everything on this site about dimensions, mastery and evidence describes how AttoLearn thinks. It is not what is shown to a nine-year-old.",
  "Encouragement rather than labels — no diagnostic terminology on a child’s screen",
  "One clear next step, not a wall of detail",
  "Wrong answers get a hint or an easier way in, not a penalty",
  "Signs of tiredness or frustration change the pace — they are never counted as evidence of what a child knows",
  "Any wellbeing prompt is gentle and framed as learning support, never as diagnosis",
  "Parent alerts are calm and actionable rather than alarming",
];
const notBuilt = [
  ["No streak pressure", "Nothing that punishes a day off"],
  ["No leaderboards", "No ranking against other children"],
  ["No shame language", "Never failure, punishment or comparison"],
  [
    "No engagement traps",
    "Nothing designed to extend screen time for its own sake",
  ],
] as const;

function GeneratedReviewIcon({
  index,
  size = 52,
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
          "url('/images/safety-and-trust/generated/account-review-icons.png')",
        backgroundSize: "400% 200%",
        backgroundPosition: `${(column * 100) / 3}% ${row * 100}%`,
      }}
    />
  );
}
function GeneratedAccountAccentIcon({
  index,
  size = 48,
}: {
  index: number;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 rounded-full bg-transparent bg-no-repeat"
      style={{
        width: size,
        height: size,
        backgroundImage:
          "url('/images/safety-and-trust/generated/account-accent-icons.png')",
        backgroundSize: "200% 100%",
        backgroundPosition: `${index * 100}% 0%`,
      }}
    />
  );
}
function GeneratedAiIcon({
  index,
  size = 88,
}: {
  index: number;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 rounded-full bg-transparent bg-no-repeat"
      style={{
        width: size,
        height: size,
        backgroundImage:
          "url('/images/safety-and-trust/generated/governed-ai-icons.png')",
        backgroundSize: "300% 100%",
        backgroundPosition: `${index * 50}% 0%`,
      }}
    />
  );
}
function GeneratedRoleIcon({
  index,
  size = 52,
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
          "url('/images/safety-and-trust/generated/role-permission-icons.png')",
        backgroundSize: "400% 200%",
        backgroundPosition: `${(column * 100) / 3}% ${row * 100}%`,
      }}
    />
  );
}
function GeneratedChildSafeIcon({
  index,
  size = 58,
}: {
  index: number;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block shrink-0"
      style={{ width: size, height: size }}
    >
      <Image
        src={`/images/safety-and-trust/generated/child-safe-icon-${index}.png`}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </span>
  );
}
function GeneratedFormalIcon({
  index,
  size = 66,
}: {
  index: number;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0 rounded-full bg-transparent bg-no-repeat"
      style={{
        width: size,
        height: size,
        backgroundImage:
          "url('/images/safety-and-trust/generated/formal-document-icons.png')",
        backgroundSize: "400% 100%",
        backgroundPosition: `${(index * 100) / 3}% 0%`,
      }}
    />
  );
}
function GeneratedSmallPrintIcon({
  index,
  size = 72,
}: {
  index: number;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block shrink-0 overflow-hidden rounded-full bg-[#faf3df]"
      style={{ width: size, height: size }}
    >
      <Image
        src={`/images/safety-and-trust/generated/small-print-icon-${index}.png`}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-contain"
      />
    </span>
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
    <main className="safety-trust-page overflow-hidden bg-[#fcfdfc] text-slate-800">
      <section className="relative overflow-hidden bg-[#f8fbf8] lg:min-h-[560px]">
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src="/images/safety-and-trust/generated/safety-hero.png"
            alt="Child safety and data protection"
            fill
            priority
            sizes="100vw"
            className="object-fill"
          />
        </div>
        <div className="absolute inset-y-0 left-0 hidden w-[52%] bg-gradient-to-r from-[#fffef7] via-[#fffef7]/90 to-transparent lg:block" />
        <div className="relative mx-auto flex max-w-7xl items-center px-3 py-12 sm:px-4 lg:min-h-[560px] lg:px-6">
          <div className="relative z-10 max-w-[550px]">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#087b82]">
              Safety and trust
            </p>
            <h1 className="mt-5 text-[44px] font-extrabold leading-[1.08] tracking-[-.035em] text-[#071d38] sm:text-5xl lg:text-[58px]">
              Built to be safe,
              <br />
              not just compliant
            </h1>
            <p className="mt-6 max-w-[510px] text-[15px] leading-7 text-slate-700">
              Compliance is a floor. The decisions that actively protect a child
              are made in how content is approved, what the software is allowed
              to decide, who can see what, and what a nine-year-old is shown on
              screen.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
              <Link
                href="#protection"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#087b82] px-6 text-sm font-bold text-white shadow-[0_7px_18px_rgba(8,123,130,.2)]"
              >
                Child Safety &amp; Data Protection{" "}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#ai"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#087b82] bg-white/80 px-6 text-sm font-bold text-[#087b82]"
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
      <section id="protection" className="bg-[#fffdf7] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
            <article className="px-2 py-3 lg:px-5">
              <p className="text-xs font-bold uppercase text-[#ed9807]">
                How accounts are created
              </p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#08213c]">
                No child creates their
                <br className="hidden sm:block" />{" "}
                <span className="text-[#087b82]">own account</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
                There is no route for a child to sign themselves up to
                AttoLearn. Every learner profile is created by a responsible
                adult, and stays linked to one.
              </p>
              <TickList
                items={[
                  "A parent or guardian sets up their own children",
                  "A tutor or tuition centre sets up learners they are engaged to teach",
                  "A school enrols its own students",
                  "Where the learner is a minor, parental consent governs regardless of who created the profile",
                  "If a learner already exists, profiles are never silently merged — a parent confirms first",
                ]}
              />
              <div className="mt-6 flex gap-4 border-t border-[#eadfce] pt-5">
                <GeneratedAccountAccentIcon index={1} size={58} />
                <p className="max-w-lg text-xs leading-5 text-slate-600">
                  <b className="text-[#075e65]">
                    This is an architectural decision rather than a setting.
                  </b>{" "}
                  Consent isn’t collected by a tick box at the end of a sign-up
                  form a child filled in; there is no such form.
                </p>
              </div>
            </article>
            <article className="overflow-hidden rounded-2xl border border-[#e7ded0] bg-[#fffef9] shadow-[0_12px_32px_rgba(63,45,15,.08)] lg:translate-y-4">
              <div className="flex items-center gap-3 bg-[#087b82] px-5 py-3 font-bold text-white">
                <GeneratedAccountAccentIcon index={0} size={42} /> Every route
                to a learner profile
              </div>
              {accountRows.map(([, title, copy], index) => (
                <div
                  key={title}
                  className="flex min-h-[88px] items-center gap-5 border-t border-[#eee6da] px-5 py-4"
                >
                  <GeneratedReviewIcon index={index} size={62} />
                  <div>
                    <h3
                      className={`font-bold ${index === 3 ? "text-rose-600" : index === 1 ? "text-purple-700" : index === 2 ? "text-orange-600" : "text-[#087b82]"}`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`mt-1 text-xs ${index === 3 ? "font-bold text-rose-500" : "text-slate-600"}`}
                    >
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </article>
          </div>

          <div className="my-10 h-px bg-[#eadfce]" />

          <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
            <article className="px-2 py-3 lg:order-2 lg:col-start-2 lg:px-5 [&_ul]:space-y-2 [&_li]:text-[13px] [&_li]:leading-5">
              <p className="text-xs font-bold uppercase text-[#ed9807]">
                Approved content
              </p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#08213c]">
                Nothing reaches a child
                <br className="hidden sm:block" />{" "}
                <span className="text-[#087b82]">
                  without passing a review step
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
                “Approved content” is a phrase every platform uses. Here is what
                it actually means at AttoLearn.
              </p>
              <TickList
                items={[
                  "Every AI-generated learning asset must pass automated verification before it can be published",
                  "Verification checks curriculum alignment, educational accuracy, the correct answer and the quality of wrong options",
                  "Anything that fails is regenerated and re-checked, then escalated to a human rather than quietly published",
                  "Human reviewers sample published content, and sampling increases automatically where risk is higher",
                  "A topic cannot be released until it meets a defined minimum of educational material",
                  "Every review decision is recorded and auditable",
                ]}
              />
            </article>
            <article className="overflow-hidden rounded-2xl border border-[#e7ded0] bg-[#fffef9] shadow-[0_12px_32px_rgba(63,45,15,.08)] lg:order-1 lg:col-start-1 lg:translate-y-4">
              <div className="flex items-center gap-3 bg-[#087b82] px-5 py-3 font-bold text-white">
                <GeneratedAccountAccentIcon index={1} size={42} /> What raises
                the level of human review
              </div>
              {[
                [
                  "A new curriculum",
                  "Unfamiliar territory gets more eyes",
                  "text-blue-700",
                ],
                [
                  "A new model or prompt",
                  "Changes to how content is produced",
                  "text-green-700",
                ],
                [
                  "Low verification confidence",
                  "Even where the check passed",
                  "text-amber-600",
                ],
                [
                  "High learner error rates",
                  "Real usage signalling a problem",
                  "text-red-600",
                ],
              ].map(([title, copy, tone], index) => (
                <div
                  key={title}
                  className="flex min-h-[92px] items-center gap-5 border-t border-[#eee6da] px-5 py-4"
                >
                  <GeneratedReviewIcon index={4 + index} size={66} />
                  <div>
                    <h3 className={`font-bold ${tone}`}>{title}</h3>
                    <p className="mt-1 text-xs text-slate-600">{copy}</p>
                  </div>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>
      <section id="ai" className="bg-[#f6fbfa] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="w-full text-center">
            <p className="text-xs font-bold uppercase tracking-[.12em] text-[#ed9807]">
              Governed and bounded AI
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#075e65] sm:text-4xl lg:whitespace-nowrap lg:text-[42px]">
              AI doesn’t freely decide what your child sees next
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Every recommendation operates inside rules a human designed,
              reviewed and can inspect.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {aiCards.map(([, title, copy], i) => (
              <article
                key={title}
                className={`${i === 2 ? "md:col-span-2 md:min-h-[180px]" : "md:min-h-[265px]"} flex items-start gap-6 rounded-2xl border border-[#e7ded0] bg-[#fffef9] p-7 shadow-[0_10px_28px_rgba(63,45,15,.07)]`}
              >
                <GeneratedAiIcon index={i} size={88} />
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
              {roles.map(([role, can, cannot], index) => (
                <div
                  key={role}
                  className="grid min-h-[88px] grid-cols-[.55fr_1.25fr_1.25fr] items-center gap-5 border-t border-[#e8eceb] px-5 py-4 text-sm leading-5"
                >
                  <b className="flex items-center gap-3 text-[#08213c]">
                    <GeneratedRoleIcon index={index} size={48} />
                    {role}
                  </b>
                  <span className="text-slate-600">{can}</span>
                  <span className="text-slate-600">{cannot}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              [
                "Tutors are invited, never self-served",
                "Creating a tutor profile grants access to no one. Access begins only when a parent approves it.",
              ],
              [
                "Access is reversible",
                "A parent can narrow or withdraw access at any time, without giving a reason.",
              ],
              [
                "Everything is logged",
                "Who did what, to which learner, and when. Privacy-affecting changes require approval.",
              ],
            ].map(([title, copy], index) => (
              <article
                key={title}
                className="min-h-[190px] rounded-xl border border-[#e7ded0] bg-[#fffef9] p-6 shadow-[0_8px_22px_rgba(63,45,15,.05)]"
              >
                <div className="flex items-center gap-4">
                  <GeneratedRoleIcon index={5 + index} size={56} />
                  <h3
                    className={`font-bold ${index === 1 ? "text-purple-700" : index === 2 ? "text-orange-600" : "text-[#087b82]"}`}
                  >
                    {title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#fffdf7] py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-5 px-3 sm:px-4 lg:grid-cols-2 lg:px-6">
          <article className="min-h-[430px] rounded-2xl border border-[#e7ded0] bg-[#fffef9] p-6 shadow-[0_8px_24px_rgba(63,45,15,.05)]">
            <p className="text-xs font-bold uppercase tracking-wide text-[#087b82]">
              Child-safe outputs
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#08213c] sm:text-3xl">
              What a child actually sees
            </h2>
            <ul className="mt-4 divide-y divide-[#ece4d8]">
              {safe.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 py-3 text-[13px] leading-5 text-slate-600"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-[#087b82] text-white" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className="min-h-[430px] overflow-hidden rounded-2xl border border-[#e7ded0] bg-[#fffef9] shadow-[0_8px_24px_rgba(63,45,15,.05)]">
            <h4 className="bg-[#087b82] px-6 py-4 text-lg font-extrabold text-white">
              Things we’ve decided not to build
            </h4>
            <div className="p-4">
              {notBuilt.map(([title, copy], index) => (
                <div
                  key={title}
                  className="flex min-h-[84px] items-center gap-4 border-b border-[#ece4d8] px-2 py-2 last:border-b-0"
                >
                  <GeneratedChildSafeIcon index={index} size={60} />
                  <div>
                    <h3
                      className={`font-bold ${index === 0 ? "text-red-600" : index === 1 ? "text-blue-700" : index === 2 ? "text-purple-700" : "text-green-700"}`}
                    >
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
      <section className="bg-[#fffdf7] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-[#ed9807]">
              Children’s privacy law
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-[#075e65] sm:text-4xl lg:text-[42px]">
              Different countries, different rules
            </h2>
            <p className="mx-auto mt-3 max-w-4xl text-sm leading-6 text-slate-600">
              Children’s privacy regulation is not the same across our markets,
              and we would rather set that out than imply a single global
              standard. Because no child can create an account, an identified
              responsible adult is present on every learner record from the
              start — which is the foundation each of these frameworks is built
              on.
            </p>
          </div>
          <div className="mt-8 overflow-x-auto rounded-xl border border-[#e7ded0] bg-[#fffef9] shadow-[0_8px_24px_rgba(63,45,15,.06)]">
            <div className="min-w-[850px]">
              <div className="grid grid-cols-[.68fr_1.18fr_1.42fr] bg-[#fbfaf3] px-6 py-4 text-xs font-bold uppercase tracking-wide text-[#075e65]">
                <span>Market</span>
                <span>Framework</span>
                <span>Where we are</span>
              </div>
              {countries.map(([flag, market, framework, status]) => (
                <div
                  key={market}
                  className="grid min-h-[98px] grid-cols-[.68fr_1.18fr_1.42fr] items-center gap-6 border-t border-[#e8dfd3] px-6 py-4 text-xs leading-5"
                >
                  <b className="flex items-center gap-4 text-[#08213c]">
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white shadow-sm">
                      <Image
                        src={flag}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </span>
                    {market}
                  </b>
                  <span className="text-slate-700">{framework}</span>
                  <span className="text-slate-700">{status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-6 rounded-2xl border-2 border-dashed border-[#efb32b] bg-[#fffaf0] p-6 sm:flex-row sm:px-8">
            <span className="relative h-28 w-28 shrink-0">
              <Image
                src="/images/safety-and-trust/generated/privacy-readiness-shield.png"
                alt=""
                fill
                sizes="112px"
                className="object-contain"
              />
            </span>
            <div>
              <h3 className="text-xl font-bold text-[#075e65]">
                Availability follows readiness, not the other way round
              </h3>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
                Where the consent and child-data model for a market is not
                complete, family access does not open there. We would rather be
                late in a market than be early and wrong about a child’s data.
              </p>
              <p className="mt-3 text-xs font-bold uppercase leading-5 text-[#e99a05]">
                Per-market family access is gated on the consent model — confirm
                status before any market is described as open
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#fffdf7] py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <SectionTitle
            eyebrow="The formal documents"
            title="This page explains. These govern."
            copy="Plain English here; the binding detail is in the policies."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              [
                "Child Safety & Data Protection",
                "How children’s data is handled, consent obtained and safety concerns raised.",
                "Read the policy",
                "/contact",
              ],
              [
                "Privacy Policy",
                "What we collect, why, how long we keep it, and your rights over it.",
                "Read the policy",
                "/privacypolicy",
              ],
              [
                "Terms and Conditions",
                "The agreement between you and AttoLearn.",
                "Read the terms",
                "/termsofservice",
              ],
            ].map(([title, copy, action, href], index) => (
              <article
                key={title}
                className="min-h-[250px] rounded-2xl border border-[#e7ded0] bg-[#fffef9] p-6 shadow-[0_8px_24px_rgba(63,45,15,.06)]"
              >
                <div className="flex items-center gap-4">
                  <GeneratedFormalIcon index={index} size={66} />
                  <h3 className="font-bold text-[#075e65]">{title}</h3>
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-600">{copy}</p>
                <Link
                  href={href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#087b82]"
                >
                  {action}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-5 flex flex-col items-center gap-6 rounded-2xl border border-[#e7ded0] bg-[#fffef9] p-6 sm:flex-row sm:px-8">
            <GeneratedFormalIcon index={3} size={78} />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#075e65]">
                Something concerns you?
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Safety concerns go to a person, not a form that disappears.
                Every report is acknowledged, recorded as a case with a named
                owner, and tracked to an outcome.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-lg bg-[#087b82] px-8 py-3 text-sm font-bold text-white shadow-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      <section className="relative min-h-[230px] overflow-hidden text-center text-white">
        <Image
          src="/images/safety-and-trust/generated/safety-cta.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#032f38]/55" />
        <div className="relative z-10 mx-auto flex min-h-[230px] max-w-7xl items-center justify-center px-3 sm:px-4 lg:px-6">
          <div>
            <h2 className="text-3xl font-extrabold">
              Safety is a design decision, not a disclaimer
            </h2>
            <p className="mt-2 text-sm text-white/90">
              See how the same thinking shapes what your child is shown.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/why-attolearn"
                className="rounded-md bg-[#f4a40a] px-6 py-3 text-sm font-bold"
              >
                Our Learning Philosophy
              </Link>
              <Link
                href="/adaptive-learning"
                className="rounded-md border border-white px-6 py-3 text-sm font-bold"
              >
                Explore Adaptive Learning
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="safety-small-print-section bg-[#fffdf7] pb-2 pt-6 lg:pb-2 lg:pt-6">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-[#ed9807]">
              The small print, said plainly
            </p>
            <h2 className="mt-2 text-[clamp(1.35rem,3vw,1.875rem)] font-extrabold leading-tight text-[#075e65] sm:whitespace-nowrap">
              Things worth knowing before you pay
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "Prices are local",
                "Each market is priced in its own currency, not converted from US dollars.",
              ],
              [
                "Cancel any time",
                "Monthly plans stop at the end of the period you’ve paid for.",
              ],
              [
                "Your records stay yours",
                "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
              ],
              [
                "One invited tutor is free",
                "A tutor a parent invites is included — the tutor is never billed for that family.",
              ],
            ].map(([title, copy], index) => (
              <article
                key={title}
                className="flex min-h-[122px] items-start gap-2 rounded-[10px] border border-[#e7ded0] bg-[#fffef9] p-3 shadow-[0_6px_18px_rgba(63,45,15,.04)]"
              >
                <GeneratedSmallPrintIcon index={index} size={64} />
                <div className="min-w-0">
                  <h3 className="whitespace-nowrap text-xs font-bold leading-tight text-[#075e65] xl:text-[13px]">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 flex min-h-[100px] items-center gap-5 rounded-[10px] border border-dashed border-[#efb32b] bg-[#fffaf0] px-5 py-3">
            <GeneratedSmallPrintIcon index={4} size={88} />
            <div>
              <h3 className="font-bold text-[#075e65]">On tax</h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                Whether the figures shown include GST or VAT determines the
                final amount you pay, and consumer price display rules differ by
                market.
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase text-[#e99a05]">
                Tax-inclusive vs tax-exclusive display to be confirmed per
                market before these prices go live
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative min-h-[210px] overflow-hidden text-center text-white">
        <Image
          src="/images/paper-generator/generated/start-free-cta.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#005761]/45" />
        <div className="relative z-10 mx-auto flex min-h-[210px] max-w-7xl items-center justify-center px-3 sm:px-4 lg:px-6">
          <div>
            <h2 className="text-3xl font-extrabold">
              Start free, decide later
            </h2>
            <p className="mt-2 text-sm text-white/90">
              No card to try it. Move to a paid plan when it’s earning its
              place.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Link
                href={SignupLink}
                className="rounded-md bg-[#f4a40a] px-7 py-3 text-sm font-bold"
              >
                Start Free
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-white px-7 py-3 text-sm font-bold"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>{" "}
    </main>
  );
}
