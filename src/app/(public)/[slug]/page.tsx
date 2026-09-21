import Link from "next/link";
import { notFound } from "next/navigation";
import SeoPageExtras from "@/components/SeoPageExtras";
import { guides } from "@/lib/seo/guides";
import { pageMetadata, searchPage } from "@/lib/seo/pages";

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(guides).map((path) => ({ slug: path.slice(1) }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return pageMetadata(`/${(await params).slug}`);
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const path = `/${(await params).slug}`;
  const guide = guides[path];
  const page = searchPage(path);
  if (!guide || !page) notFound();
  return (
    <SeoPageExtras path={path}>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:py-20">
        <p className="font-semibold text-teal-700">AttoLearn learning guides</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {page.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">
          {guide.introduction}
        </p>
        {guide.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              {section.heading}
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-700">
              {section.text}
            </p>
          </section>
        ))}
        <section className="mt-12 rounded-2xl bg-teal-50 p-6">
          <h2 className="text-2xl font-semibold">Find the right next step</h2>
          <p className="mt-3 leading-7">
            Tell us your learner’s year level, curriculum and subject. We can
            help you check current availability before you choose a learning
            plan.
          </p>
          <div className="mt-5 flex flex-wrap gap-5">
            <Link
              className="rounded-lg bg-teal-800 px-5 py-3 font-semibold text-white"
              href="/contact"
            >
              Ask about availability
            </Link>
            <Link
              className="py-3 text-teal-900 underline"
              href="/adaptive-learning"
            >
              Explore adaptive learning
            </Link>
          </div>
        </section>
      </article>
    </SeoPageExtras>
  );
}
