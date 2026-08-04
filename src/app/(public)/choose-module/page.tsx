import Link from "next/link";
import { FaArrowRight, FaBookOpen, FaSchool } from "react-icons/fa6";

const moduleOptions = [
  {
    title: "Adaptive Learning Module",
    description:
      "Sign in or create an account for personalized learning, practice, and progress tracking.",
    href: "/login",
    icon: FaBookOpen,
  },
  {
    title: "School Management Module",
    description:
      "Continue to the school portal for administration, teachers, students, parents, and resellers.",
    href: "https://portal.attolearn.com/auth/login",
    icon: FaSchool,
  },
];

export default function ChooseModulePage() {
  return (
    <section className="bg-slate-50 px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#077784] uppercase">
            Choose your portal
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">
            Select a module to continue
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Pick the AttoLearn experience you want to use. You can sign in or
            sign up from the next step.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {moduleOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.title}
                href={option.href}
                className="group flex min-h-55 flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#077784]/40 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#077784]"
              >
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#077784]/10 text-[#077784]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-xl font-bold text-slate-950">
                    {option.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {option.description}
                  </p>
                </div>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#077784]">
                  Continue
                  <FaArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
