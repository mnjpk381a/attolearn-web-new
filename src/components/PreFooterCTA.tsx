import Link from "next/link";

export default function PreFooterCTA() {
  return (
    <section className="bg-[#07818a] text-white" aria-labelledby="pre-footer-cta-title">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex justify-center py-12">
          <div className="w-full max-w-2xl text-center">
            <h2 id="pre-footer-cta-title" className="text-2xl font-bold sm:text-3xl">
              Start free, decide later
            </h2>
            <p className="mt-2 text-sm text-white/90 sm:text-base">
              No card to try it. Move to a paid plan when it&apos;s earning its place.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://portal.attolearn.com/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#f4aa17] px-7 text-sm font-semibold text-white transition hover:bg-[#dc9411]"
              >
                Start Free
              </a>
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex h-11 items-center justify-center rounded-md border border-white px-7 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}