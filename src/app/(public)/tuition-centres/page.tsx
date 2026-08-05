import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CalendarClock,
  Check,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Gauge,
  Grid2X2,
  Mail,
  MoveHorizontal,
  ReceiptText,
  ShieldCheck,
  Tag,
  UserCog,
  UserRound,
  Users,
} from "lucide-react";

const workspaceCards = [
  [UserCog, "Centre administrators", "Manage staff, roster and workspace settings."],
  [BadgeCheck, "Tutor accounts", "Each tutor has their own account and their own assigned learners."],
  [Users, "Learner roster", "Every learner the centre supports, in one list."],
  [Grid2X2, "Groups", "Organise learners into the groups you actually teach."],
  [FileText, "Student assignment", "Allocate learners to tutors, and reallocate when staffing changes."],
  [CalendarClock, "Assigned work", "Practice, revision and assessments set by the tutor responsible."],
  [UserRound, "Plan capacity", "The workspace tells you when the roster reaches your plan's student cap."],
  [ShieldCheck, "Audit trail", "Actions recorded with who did them, when, and to which learner."],
] as const;

const assessmentCards = [
  [ClipboardCheck, "Centre-wide papers", "Shared papers your tutors can set consistently."],
  [BookOpenCheck, "Topic tests", "A focused check after a topic is taught."],
  [FileCheck2, "Mock exams", "Longer papers for exam preparation."],
  [FileText, "Printable and online", "Print for the centre, or set online for home."],
  [ReceiptText, "Result review", "Review results by learner, group or tutor."],
  [ClipboardCheck, "Records kept", "Results stay attached to each learner's evidence."],
] as const;

function TickList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-5 text-slate-700">
          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#07818a]">
            <Check className="h-2.5 w-2.5 text-[#07818a]" strokeWidth={2.5} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function TuitionCentresPage() {
  return (
    <main className="tuition-centres-page bg-white text-slate-800">
      <section className="relative min-h-130 overflow-hidden border-b border-slate-200 bg-[#fbfdfd]">
        <div className="absolute inset-y-0 right-0 hidden w-[61%] md:block">
          <Image
            src="/images/tuition-centres/tuition-centre-hero.png"
            alt="Tutor supporting learners in a modern tuition centre"
            fill
            priority
            sizes="61vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#fbfdfd] via-[#fbfdfd]/35 to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-130 max-w-7xl items-center px-5 py-14 sm:px-8 lg:px-10">
          <div className="max-w-lg rounded-2xl bg-white/90 p-6 backdrop-blur-sm md:max-w-md md:bg-transparent md:p-0 md:backdrop-blur-none lg:max-w-lg">
            <p className="text-lg font-semibold text-[#08737a]">For Tuition Centres</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-[#075e65] sm:text-5xl">
              Bring adaptive learning
              <br />and assessment into
              <br />your tuition centre
            </h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-slate-700">
              Run several tutors and many learners from one workspace — with
              consistent practice between sessions, shared assessment tools,
              and a clear record of who did what.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-[#07818a] px-6 text-sm font-semibold text-white transition hover:bg-[#056c72]">
                Book a Tuition Centre Demo
              </Link>
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md border border-[#07818a] bg-white px-7 text-sm font-semibold text-[#075e65] transition hover:bg-[#eefafa]">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[auto_1fr_1.15fr_auto] md:items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-[#e3a11d] bg-[#fffaf0]">
            <Building2 className="h-7 w-7 text-[#07818a]" />
          </span>
          <h2 className="text-xl font-semibold text-[#075e65]">A centre is a workspace, not a school system</h2>
          <p className="border-slate-200 text-sm leading-6 text-slate-600 md:border-l md:pl-7">
            A tuition centre runs on the AttoLearn Tutor Workspace, scaled for
            several tutors and a larger roster. It is deliberately not a school
            management system — centres that need attendance, fees and academic
            records should look at School Management instead.
          </p>
          <Link href="/schools" className="inline-flex h-10 items-center justify-center rounded-md border border-[#07818a] px-5 text-sm font-semibold text-[#075e65]">For Schools</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="rounded-xl bg-[#f1fafa] p-6 sm:p-8">
          <p className="text-sm font-semibold text-[#07818a]">Centre structure</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#075e65]">Administrators, tutors, learners and groups</h2>
          <p className="mt-3 text-sm text-slate-700">One workspace with real roles, so a centre isn&apos;t run out of a shared login.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workspaceCards.map(([Icon, title, copy]) => (
              <article key={title} className="flex min-h-35 gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="h-10 w-10 shrink-0 text-[#07818a]" strokeWidth={1.6} />
                <div><h3 className="text-sm font-semibold text-[#075e65]">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{copy}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-5 rounded-lg border border-slate-200 bg-white p-5 md:grid-cols-[auto_1fr_0.55fr] md:items-center">
            <ShieldCheck className="h-10 w-10 text-[#07818a]" />
            <div><h3 className="text-sm font-semibold text-[#075e65]">What the workspace deliberately does not do</h3><p className="mt-1 text-xs leading-5 text-slate-600">Workspace invoicing is tracking only — it records what is owed and paid, and is not a payment or accounting system. Payroll is scoped to the workspace&apos;s own tutors. Assessment reuses the Paper Generator rather than a separate centre exam engine. These boundaries are intentional, so a centre workspace does not quietly become a school system.</p></div>
            <p className="text-xs leading-5 text-slate-600">Scope boundaries per the Phase 2 backlog — confirm against the current build before quoting capability.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-10">
        <div>
          <p className="text-sm font-semibold text-[#07818a]">Learning support</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#075e65]">Consistent practice between sessions</h2>
          <p className="mt-4 text-sm leading-6 text-slate-700">Most of a learner&apos;s week happens when your tutors aren&apos;t there. Curriculum-aligned practice keeps that time productive, and turns it into evidence your tutors can act on.</p>
          <TickList items={["Curriculum-aligned practice, Foundation to Year 10", "Individual goals per learner, not one plan for a group", "Targeted revision for skills at risk of fading", "Tutor visibility of the learners they are responsible for", "Learner evidence that carries across tutors, not held in one person's head"]} />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
          <h3 className="text-base font-semibold text-slate-900">Group: Year 9 Maths — Tuesday</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
            <div className="rounded-lg border border-slate-200 p-4"><h4 className="text-xs font-semibold text-[#075e65]">8 learners</h4><p className="mt-5 text-sm font-semibold">Assigned to Ms. Haruna</p></div>
            <div className="rounded-lg border border-slate-200 p-4"><h4 className="text-xs font-semibold text-[#075e65]">Common gap</h4><p className="mt-5 text-sm font-semibold">Linear equations</p><p className="mt-4 text-xs leading-5 text-slate-600">5 of 8 need prerequisite work</p><p className="mt-10 flex items-center gap-1 text-xs font-semibold text-[#07818a]">View details <ArrowRight className="h-3 w-3"/></p></div>
            <div className="rounded-lg border border-slate-200 p-4"><h4 className="text-xs font-semibold text-[#075e65]">Set for this week</h4><p className="mt-5 text-sm font-semibold">Targeted practice, then a topic test</p><p className="mt-10 flex items-center gap-1 text-xs font-semibold text-[#07818a]">Change plan <ArrowRight className="h-3 w-3"/></p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="rounded-xl bg-[#fff8e9] p-6 sm:p-8">
          <p className="text-sm font-semibold text-[#07818a]">Assessment</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#075e65]">One assessment toolset across the centre</h2>
          <p className="mt-3 text-sm text-slate-700">Every tutor building papers the same way, from the same curriculum-based bank.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {assessmentCards.map(([Icon,title,copy])=><article key={title} className="rounded-lg border border-[#efdfbf] bg-white p-5 text-center"><Icon className="mx-auto h-9 w-9 text-[#e39a12]"/><h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{copy}</p></article>)}
          </div>
          <div className="mt-6 grid gap-5 rounded-lg border border-[#f0dcae] bg-[#fff3d8] p-5 md:grid-cols-[auto_1fr_0.5fr_auto] md:items-center"><BookOpenCheck className="h-10 w-10 text-[#e39a12]"/><div><h3 className="text-sm font-semibold text-[#075e65]">Combining topics or chapters into one paper</h3><p className="mt-1 text-xs leading-5 text-slate-600">Building a single paper that spans several topics or chapters at once.</p></div><p className="text-xs leading-5 text-slate-600">Feature availability for centre accounts to be confirmed with engineering before publishing as live.</p><Link href="/papergenerator" className="inline-flex h-10 items-center justify-center rounded-md border border-[#07818a] px-6 text-sm font-semibold text-[#075e65]">Learn More</Link></div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:px-10">
        <div><p className="text-sm font-semibold text-[#07818a]">Tutor coordination</p><h2 className="mt-2 text-2xl font-semibold leading-tight text-[#075e65]">The centre keeps the evidence,<br/>not the individual tutor</h2><p className="mt-4 text-sm leading-6 text-slate-700">When a tutor leaves, or a learner moves between tutors, the learning history doesn&apos;t leave with them. That continuity is the main operational reason centres outgrow individual tutor accounts.</p><TickList items={["Allocate and reallocate learners between tutors","Role-based access — administrators and tutors see different things","Consistent expectations across every tutor on staff","Auditable record of assignments, changes and access"]}/></div>
        <div className="relative min-h-82 overflow-hidden rounded-xl border border-slate-200 bg-[#f6f8f8] shadow-sm"><Image src="/images/tutors/tutor-preparation.png" alt="Tuition centre staff working together" fill sizes="(min-width:1024px) 55vw,100vw" className="object-cover object-right"/><div className="absolute inset-y-0 left-0 w-[65%] bg-linear-to-r from-white via-white/95 to-transparent"/><div className="relative m-5 max-w-sm rounded-lg border border-slate-200 bg-white/95 p-5"><h3 className="text-sm font-semibold text-slate-900">Staff and access</h3>{[[ShieldCheck,"Centre administrator","Full roster, staff and workspace settings"],[UserRound,"Tutor","Only the learners assigned to them"],[MoveHorizontal,"Reallocation","Learner moved to a new tutor — access follows"],[BadgeCheck,"Staff departure","Access ends; the learner's evidence stays with the centre"]].map(([Icon,title,copy])=>{const I=Icon as typeof ShieldCheck;return <div key={String(title)} className="mt-4 flex gap-3"><I className="h-5 w-5 shrink-0 text-[#07818a]"/><div><h4 className="text-xs font-semibold">{String(title)}</h4><p className="mt-1 text-[11px] leading-4 text-slate-600">{String(copy)}</p></div></div>})}</div></div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
        <div className="grid gap-8 rounded-xl bg-[#effafa] p-6 sm:p-8 lg:grid-cols-[0.65fr_1.35fr]">
          <div><p className="text-sm font-semibold text-[#07818a]">Family permissions</p><h2 className="mt-2 text-2xl font-semibold leading-tight text-[#075e65]">The parent still controls<br/>the child&apos;s learning</h2><p className="mt-4 text-sm leading-6 text-slate-700">This is the part centres most often need explained. A centre account does not give the centre ownership of a child&apos;s learning record. The parent holds the account and the consent, and grants the centre&apos;s tutor access to the learner.</p><TickList items={["Parents approve tutor access — the centre cannot add a child unilaterally","Access is scoped to what the parent agreed to","Parents can withdraw access at any time","Tutor verification is required before child learning information is visible","Every access decision is recorded"]}/></div>
          <div><h3 className="text-xl font-semibold text-[#075e65]">How a learner joins your centre</h3><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[UserRound,"Parent approves","Access request reviewed by the parent"],[Mail,"Tutor verified","Verification completed before anything is visible"],[Users,"Allocated","Learner assigned to a tutor on your staff"],[ShieldCheck,"Reversible","Parent can narrow or end access at any point"]].map(([Icon,title,copy],i)=>{const I=Icon as typeof UserRound;return <article key={String(title)} className="rounded-lg border border-slate-200 bg-white p-5"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#08777d] text-sm font-semibold text-white">{i+1}</span><h4 className="mt-4 text-sm font-semibold text-[#075e65]">{String(title)}</h4><p className="mt-3 min-h-20 text-xs leading-5 text-slate-600">{String(copy)}</p><I className="mt-4 h-10 w-10 text-[#07818a]" strokeWidth={1.5}/></article>})}</div></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div><p className="text-sm font-semibold text-[#07818a]">Commercial model</p><h2 className="mt-2 text-3xl font-semibold text-[#075e65]">The same plans as individual tutors</h2><p className="mt-3 text-sm text-slate-700">Centres are not priced differently. You use the published Starter, Growth and Pro plans, sized by how many learners are actually active.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{[[Tag,"Priced by active learners","Not by how many names sit on your roster. Dormant learners don't count."],[Users,"Add students between tiers","Extra-student add-ons mean you never jump a tier for one learner."],[ReceiptText,"Published rates","The same rate card a solo tutor sees, in your local currency."]].map(([Icon,title,copy])=>{const I=Icon as typeof Tag;return <article key={String(title)} className="rounded-lg border border-slate-200 p-5"><I className="h-9 w-9 text-[#07818a]"/><h3 className="mt-4 text-sm font-semibold text-[#075e65]">{String(title)}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{String(copy)}</p></article>})}</div></div>
            <div className="space-y-4"><div className="rounded-lg bg-[#edf9f4] p-5"><Gauge className="h-8 w-8 text-[#07818a]"/><h3 className="mt-3 text-sm font-semibold text-[#075e65]">See the current rates</h3><p className="mt-2 text-xs leading-5 text-slate-600">Starter, Growth and Pro are published for Australia, the USA, the UK and Pakistan, with annual billing at approximately ten months&apos; price for twelve months&apos; access.</p><Link href="/chooseplan" className="mt-4 inline-flex h-9 items-center rounded-md border border-[#07818a] px-4 text-xs font-semibold text-[#075e65]">View Pricing</Link></div><div className="rounded-lg bg-[#fff4dc] p-5"><ClipboardCheck className="h-8 w-8 text-[#e39a12]"/><h3 className="mt-3 text-sm font-semibold text-[#075e65]">Two things to confirm before you budget</h3><p className="mt-2 text-xs leading-5 text-slate-600">Whether a plan covers your whole workspace or each tutor account, and what applies once you pass 50 active learners. Both change the cost materially for a centre, and neither is settled yet.</p><p className="mt-2 text-[11px] font-semibold uppercase leading-4 text-[#ce8200]">Per-workspace vs per-tutor billing, and the above-50 arrangement, still to be confirmed</p></div></div>
          </div>
        </div>
      </section>

      <section className="bg-[#07818a] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 lg:px-10">
          <h2 className="text-3xl font-semibold">See it with your own roster</h2>
          <p className="mt-3 text-base text-white/90">A demo built around how your centre actually runs.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-[#f4aa17] px-7 text-sm font-semibold text-white transition hover:bg-[#dc9411]">Book a Tuition Centre Demo</Link>
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md border border-white/80 px-7 text-sm font-semibold text-white transition hover:bg-white/10">Contact Sales</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
