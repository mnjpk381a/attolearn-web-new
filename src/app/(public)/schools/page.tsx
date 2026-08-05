import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Diamond,
  Eye,
  FileText,
  FolderOpen,
  GraduationCap,
  Laptop,
  LockKeyhole,
  Link2,
  Mail,
  MessageSquare,
  PenLine,
  PieChart,
  Printer,
  Puzzle,
  Settings,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

const assessmentCards = [
  [
    FileText,
    "Paper Generator",
    "Curriculum-based papers built in a few clicks.",
  ],
  [CalendarDays, "Class and monthly tests", "Routine checks through the term."],
  [
    Trophy,
    "Term and annual exams",
    "Longer papers for formal assessment points.",
  ],
  [Printer, "Printable papers", "Print-ready output for exam conditions."],
  [Laptop, "Online exams", "Set and sit assessments online where appropriate."],
  [
    CheckCircle2,
    "Automatic checking",
    "Applied where the question type supports it.",
  ],
] as const;

const managementCards = [
  [Users, "Attendance", "Daily attendance recording and follow-up."],
  [CreditCard, "Fees", "Fee management and collection records."],
  [Mail, "Communication", "Messages to families and staff."],
  [FolderOpen, "Academic records", "Results and records held at school level."],
  [BarChart3, "Reporting", "School-level reporting for leadership."],
  [Settings, "Administration", "Day-to-day school operations in one system."],
] as const;

function TickList({
  items,
  goldTicks = false,
}: {
  items: readonly string[];
  goldTicks?: boolean;
}) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
          <CheckCircle2
            className={`mt-1 h-4 w-4 shrink-0 ${goldTicks ? "text-[#dc940a]" : "text-[#00858b]"}`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MiniRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-sm">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f1f8f8]">
        <Icon className="h-5 w-5 text-[#00777d]" />
      </span>
      <div>
        <p className="text-xs font-semibold text-[#075e65]">{label}</p>
        <p className="mt-0.5 text-[11px] text-slate-500">{value}</p>
      </div>
    </div>
  );
}

export default function SchoolsPage() {
  return (
    <div className="schools-page bg-white text-slate-800">
      <section className="relative min-h-150 overflow-hidden border-b border-slate-200 bg-[#fffdfa]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
          <Image
            src="/images/schools/reference/schools-hero.png"
            alt="Teacher and pupils learning together"
            fill
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/35 lg:bg-linear-to-r lg:from-[#fffdfa] lg:via-[#fffdfa]/25 lg:to-transparent" />
        </div>
        <div className="relative mx-auto grid min-h-150 max-w-7xl items-center px-5 py-12 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div className="relative z-10 max-w-lg rounded-2xl bg-white/80 p-6 backdrop-blur-sm lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <h1 className="text-3xl font-semibold text-[#00777d]">
              For Schools
            </h1>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.12] tracking-[-0.035em] text-[#075e65] sm:text-5xl">
              Connect learning,
              <br />
              assessment and
              <br />
              school operations
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-slate-700">
              One platform where adaptive homework, assessment and everyday
              school administration share the same records — instead of three
              systems that don&apos;t talk to each other.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#f4aa17] px-6 text-sm font-semibold text-white transition hover:bg-[#005d62]"
              >
                Book a School Demo
              </Link>
              <a
                href="#management"
                className="inline-flex h-11 items-center justify-center rounded-md border border-[#00777d] bg-white px-6 text-sm font-semibold text-[#006c72] transition hover:bg-[#effafa]"
              >
                Explore School Management
              </a>
            </div>
          </div>
          <div className="relative hidden h-full lg:block">
            <div className="absolute right-0 top-8 w-60 space-y-3">
              {[
                [
                  ShieldCheck,
                  "Adaptive Learning",
                  "Personalised to school curriculum and level",
                  "79%",
                ],
                [
                  ClipboardCheck,
                  "Assessment",
                  "Tests, exams and marking in one place",
                  "124 items",
                ],
                [
                  Building2,
                  "School Operations",
                  "Attendance, fees, reports and more",
                  "View dashboard",
                ],
              ].map(([Icon, title, copy, stat], index) => {
                const CardIcon = Icon as typeof ShieldCheck;
                return (
                  <div
                    key={String(title)}
                    className="rounded-xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-sm"
                  >
                    <div className="flex gap-3">
                      <CardIcon
                        className={`h-7 w-7 shrink-0 ${index === 1 ? "text-[#db970e]" : "text-[#00777d]"}`}
                      />
                      <div>
                        <h3 className="text-xs font-semibold text-[#075e65]">
                          {title as string}
                        </h3>
                        <p className="mt-1 text-[10px] leading-4 text-slate-600">
                          {copy as string}
                        </p>
                        <p
                          className={`mt-2 text-[10px] font-semibold ${index === 1 ? "text-[#db970e]" : "text-[#00777d]"}`}
                        >
                          {stat as string}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f9fb]">
        <div className="mx-auto max-w-7xl px-5 pb-32 pt-19 sm:px-8 lg:px-10">
          <div className="grid min-h-50 gap-8 rounded-2xl border border-dashed border-[#e8a21a] bg-[#fff9ee] px-7 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-115">
              <h2 className="text-base font-semibold text-[#075e65]">
                What is available today, and what is next
              </h2>
              <p className="mt-2 text-sm leading-5 text-slate-600">
                School Management and the Paper Generator are live and in daily
                use in schools. School-linked adaptive learning —
                teacher-assigned homework through the adaptive engine — is the
                next expansion phase, following the controlled family and tutor
                rollout. This page describes both; it does not claim the
                adaptive school features are generally available today.
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase leading-4 text-[#ce8200]">
                School-linked adaptive learning is a next-phase capability —
                confirm availability before committing to any school timeline
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 w-full shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#07858b] px-8 text-base font-semibold text-white transition hover:bg-[#006c72] sm:w-55 lg:justify-self-end"
            >
              Talk to us about a pilot
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
        <div>
          <p className="text-xl font-semibold text-[#00777d]">
            School-linked adaptive learning
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#075e65]">
            Learning the school enables, in the school&apos;s curriculum
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-700">
            A school switches on adaptive learning for its own families. Access
            is authorised by the school, aligned to the curriculum the school
            teaches, and used with the teacher&apos;s knowledge rather than
            around it.
          </p>
          <TickList
            items={[
              "School-enabled access for families the school chooses",
              "Curriculum alignment set at school level",
              "Teacher-authorised use, per class and per subject",
              "Families are told plainly when access is school-covered",
              "If school access ends, the family keeps the learning history by converting to independent access",
            ]}
          />
        </div>
        <div className="relative min-h-92 overflow-hidden rounded-xl border border-slate-200">
          <Image
            src="/images/schools/reference/school-linked-student.png"
            alt="Student using school-linked learning"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-white via-white/90 to-transparent sm:w-[64%]" />
          <div className="relative m-5 max-w-xs rounded-xl bg-white/95 p-4 shadow-lg">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#075e65]">
              <ShieldCheck className="h-5 w-5 text-[#00777d]" />
              School-linked family
            </h3>
            <div className="space-y-2">
              <MiniRow
                icon={PenLine}
                label="Access"
                value="Covered by the school while school access is active"
              />
              <MiniRow
                icon={BookOpen}
                label="Curriculum"
                value="Set by the school, matching what is taught"
              />
              <MiniRow
                icon={CalendarDays}
                label="If it ends"
                value="Learning history is retained; family can continue independently"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#f0dfbc] bg-[#fffdfa]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10">
          <div className="relative min-h-92 overflow-hidden rounded-xl">
            <Image
              src="/images/schools/reference/homework-teacher.png"
              alt="Teacher assigning homework"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-y-0 left-0 w-[66%] bg-linear-to-r from-black/15 to-transparent" />
            <div className="relative m-4 max-w-xs rounded-xl bg-white/95 p-4 shadow-lg">
              <h3 className="text-sm font-semibold text-[#075e65]">
                Assign homework — 8B Science
              </h3>
              <div className="mt-3 space-y-2">
                {[
                  [FileText, "Topic", "Particle model — states of matter"],
                  [BookOpen, "Assign to", "Whole class, or selected learners"],
                  [CalendarDays, "Due", "Friday"],
                  [
                    CheckCircle2,
                    "Class status",
                    "Completion and progress at a glance",
                  ],
                ].map(([Icon, label, value]) => {
                  const RowIcon = Icon as typeof FileText;
                  return (
                    <MiniRow
                      key={String(label)}
                      icon={RowIcon}
                      label={String(label)}
                      value={String(value)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold text-[#d08b0a]">
              School-Assigned Homework
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#075e65]">
              Homework that adapts to each learner
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              A teacher sets the topic and the due date. Each learner gets
              practice pitched to where they actually are, and the teacher sees
              completion and progress rather than a pile of marking.
            </p>
            <TickList
              goldTicks
              items={[
                "Assign by topic or skill, to a class or named learners",
                "Set a due date and track completion",
                "Progress visible while the homework is open, not only at the end",
                "Longer-term and revision goals alongside weekly homework",
                "Topics can only be assigned where content is ready — the system says so rather than failing quietly",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 lg:px-10">
        <h2 className="text-3xl font-semibold text-[#075e65]">
          Assessment the school already runs, in the same place
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          The Paper Generator is live in schools today. It sits alongside the
          learning engine rather than separately from it.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {assessmentCards.map(([Icon, title, copy], index) => (
            <article
              key={title}
              className={`rounded-xl border p-5 ${index === 2 || index === 5 ? "border-[#efd6a2] bg-[#fffcf5]" : "border-[#cde5e6] bg-[#f9fdfd]"}`}
            >
              <Icon
                className={`mx-auto h-10 w-10 ${index === 2 || index === 5 ? "text-[#d89410]" : "text-[#00777d]"}`}
              />
              <h3 className="mt-4 text-sm font-semibold text-[#075e65]">
                {title}
              </h3>
              <p className="mt-3 text-[11px] leading-5 text-slate-600">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#cde5e6] bg-[#f1fbfb]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10">
          <div>
            <p className="text-xl font-semibold text-[#00777d]">
              Learning visibility
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#075e65]">
              Teachers see school learning, not family life
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              A school relationship does not open a window onto everything a
              child does. Teachers and school staff see evidence relevant to the
              school&apos;s authorised relationship with that learner — and
              nothing else.
            </p>
            <TickList
              items={[
                "Visibility scoped to the school's authorised relationship",
                "No access to unrelated family or tutor activity",
                "Academic records kept separate from family learning records",
                "Access scope can be narrowed or ended by the school administrator",
                "Access decisions are logged",
              ]}
            />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#075e65]">
              <ShieldCheck className="h-5 w-5 text-[#00777d]" />
              What a teacher can see
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                <h4 className="text-xs font-semibold text-emerald-700">
                  Visible to teachers
                </h4>
                {[
                  "School work and progress",
                  "Homework completion",
                  "Assessment results",
                  "Curriculum achievements",
                  "Engagement in learning",
                ].map((item) => (
                  <p
                    key={item}
                    className="mt-3 flex gap-2 text-xs text-slate-600"
                  >
                    <Eye className="h-4 w-4 text-emerald-600" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-xs font-semibold text-[#075e65]">
                  Not visible to teachers
                </h4>
                {[
                  "Home activity",
                  "Family messages",
                  "Personal notes",
                  "Outside tutoring",
                  "Private information",
                ].map((item) => (
                  <p
                    key={item}
                    className="mt-3 flex gap-2 text-xs text-slate-600"
                  >
                    <LockKeyhole className="h-4 w-4 text-slate-400" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="management"
        className="relative min-h-92 overflow-hidden border-b border-[#e8d8b8]"
      >
        <Image
          src="/images/schools/reference/school-management-team.png"
          alt="School management team at work"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#fffaf1] via-[#fffaf1]/95 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 lg:px-10">
          <p className="text-xl font-semibold text-[#d08b0a]">
            School Management
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#075e65]">
            The administrative side, already running in schools
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-700">
            The operational system Attobility has been running for years, now
            part of the same platform as learning and assessment.
          </p>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {managementCards.map(([Icon, title, description]) => (
              <div
                key={title}
                className="rounded-xl border border-[#eadfc9] bg-white/95 p-5 text-center shadow-sm"
              >
                <Icon className="mx-auto h-8 w-8 text-[#00777d]" />
                <h3 className="mt-3 text-xs font-semibold text-[#075e65]">
                  {title}
                </h3>
                <p className="mt-2 text-[11px] leading-4 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 text-center sm:px-8 lg:px-10">
        <p className="text-xl font-semibold text-[#00777d]">
          One connected ecosystem
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-[#075e65]">
          Fewer systems that don’t speak to each other
        </h2>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          Most schools run administration in one system, assessment in another,
          and learning in a third. The records never reconcile, and the work of
          joining them falls on staff.
        </p>
        <div className="mx-auto mt-8 grid max-w-5xl items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {[
            [
              GraduationCap,
              "One record per learner",
              "Administration, assessment and learning against the same learner.",
            ],
            [
              Puzzle,
              "One place to work",
              "Teachers assign, assess and review without switching systems.",
            ],
            [
              PieChart,
              "One reporting view",
              "Leadership sees the school without stitching exports together.",
            ],
          ].map(([Icon, title, copy], index) => {
            const FlowIcon = Icon as typeof GraduationCap;
            return (
              <div key={String(title)} className="contents">
                <article
                  className={`rounded-xl border p-5 ${index === 1 ? "border-[#efd6a2] bg-[#fffcf5]" : "border-[#cde5e6] bg-[#f9fdfd]"}`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <FlowIcon
                      className={`h-10 w-10 shrink-0 ${index === 1 ? "text-[#e4a01d]" : "text-[#00777d]"}`}
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-[#075e65]">
                        {title as string}
                      </h3>
                      <p className="mt-1 text-[11px] leading-4 text-slate-600">
                        {copy as string}
                      </p>
                    </div>
                  </div>
                </article>
                {index < 2 && (
                  <div className="hidden items-center gap-1 text-[#00858b] md:flex">
                    <span className="h-2 w-2 rounded-full bg-current" />
                    <span className="w-7 border-t-2 border-dotted border-current" />
                    <span className="h-2 w-2 rounded-full bg-current" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#b8dfe1] bg-[#eefafa]">
        <Image
          src="/images/schools/reference/school-community.png"
          alt="Students walking through their school community"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#eafafa] via-[#eafafa]/95 to-transparent" />
        <div className="relative mx-auto flex min-h-84 max-w-7xl flex-col items-center px-5 py-12 text-center sm:px-8 sm:py-16 lg:px-10">
          <p className="text-sm font-semibold tracking-[0.08em] text-[#d88700] uppercase">
            Current school reach
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-[#075e65] sm:text-4xl">
            Already supporting school communities
          </h2>
          <p className="mt-2 text-base leading-6 text-slate-700 sm:text-lg">
            Attobility&apos;s School Management and Paper Generator figures,
            stated conservatively.
          </p>
          <div className="mt-9 grid w-full gap-4 sm:grid-cols-3">
            {[
              [
                Building2,
                "50+",
                "schools",
                "Using Attobility school software today.",
              ],
              [
                Users,
                "4,000+",
                "students",
                "Records held across those school communities.",
              ],
              [
                GraduationCap,
                "100+",
                "teachers",
                "Working in the system day to day.",
              ],
            ].map(([Icon, stat, label, description]) => {
              const StatIcon = Icon as typeof Building2;
              return (
                <div
                  key={String(label)}
                  className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-[#cde5e6] bg-white/95 p-6 text-center shadow-sm"
                >
                  <span className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-[#e8f5f5]">
                    <StatIcon className="h-5 w-5 text-[#00777d]" />
                  </span>
                  <div className="text-center">
                    <p className="text-xl font-semibold leading-none text-[#075e65] sm:text-2xl">
                      {stat as string} {label as string}
                    </p>
                    <p className="mx-auto mt-3 max-w-xs text-sm leading-5 text-slate-600">
                      {description as string}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 w-full rounded-xl border border-dashed border-[#e4a11b] bg-[#fff8eb]/95 p-5 text-left sm:p-7">
            <h3 className="flex items-center gap-2 text-base font-semibold text-[#075e65]">
              <MessageSquare className="h-4 w-4" />
              What these figures cover
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-5 text-slate-600">
              These numbers describe Attobility&apos;s existing School
              Management and Paper Generator footprint, primarily in Pakistan.
              They are not a measure of AttoLearn adaptive learning adoption,
              and are not presented as one.
            </p>
            <p className="mt-4 text-xs font-semibold tracking-wide text-[#d88700] uppercase">
              School count differs between internal sources — confirm the
              current figure before external use
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#07818a] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-17 lg:px-10">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            See how it fits your school
          </h2>
          <p className="mt-2 text-sm text-white/90 sm:text-base">
            A walkthrough of what is live now, and what the adaptive phase adds.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[#f4aa17] px-6 text-base font-semibold text-white transition hover:bg-[#dc9411]"
            >
              Book a School Demo
            </Link>
            <Link
              href="/adaptive-learning"
              prefetch={false}
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/70 px-6 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Explore Adaptive Learning
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f9fb]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-17">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.08em] text-[#d88700] uppercase">
              The small print, said plainly
            </p>
            <h2 className="mt-1 text-3xl font-semibold tracking-[-0.02em] text-[#075e65] sm:text-4xl">
              Things worth knowing before you pay
            </h2>
          </div>

          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Diamond,
                title: "Prices are local",
                copy: "Each market is priced in its own currency, not converted from US dollars.",
              },
              {
                icon: Check,
                title: "Cancel any time",
                copy: "Monthly plans stop at the end of the period you've paid for.",
              },
              {
                icon: Diamond,
                title: "Your records stay yours",
                copy: "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
                filled: true,
              },
              {
                icon: Link2,
                title: "One invited tutor is free",
                copy: "A tutor a parent invites is included — the tutor is never billed for that family.",
              },
            ].map(({ icon: Icon, title, copy, filled }) => (
              <article
                key={title}
                className="min-h-41 rounded-xl border border-slate-200 bg-white p-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#e8f5f5]">
                  <Icon
                    className={`h-4 w-4 text-[#00777d] ${filled ? "fill-current" : ""}`}
                    strokeWidth={1.8}
                  />
                </span>
                <h3 className="mt-3 text-base font-semibold text-[#075e65]">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-4 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-[#e4a11b] bg-[#fff8eb] px-7 py-10 sm:px-8 lg:py-12">
            <h3 className="text-base font-semibold text-[#075e65]">On tax</h3>
            <p className="mt-1 max-w-xl text-sm leading-4 text-slate-600">
              Whether the figures shown include GST or VAT determines the final
              amount you pay, and consumer price display rules differ by market.
            </p>
            <p className="mt-2 text-xs font-semibold tracking-wide text-[#d88700] uppercase">
              Tax-inclusive vs tax-exclusive display to be confirmed per market
              before these prices go live
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
