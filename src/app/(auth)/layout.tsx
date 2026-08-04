import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto h-screen max-w-7xl rounded-2xl border border-gray-300 bg-gray-100 px-3 py-4">
        <div className="flex h-full w-full gap-4">
          <aside className="relative hidden h-full w-full overflow-hidden rounded-3xl bg-[url('/images/Stats/AB.png')] bg-cover bg-center text-white shadow-lg lg:block lg:w-[34%]">
            <div className="flex h-full flex-col px-5 py-7 sm:p-7">
              <div className="flex justify-center">
                <Link
                  href="/"
                  prefetch={false}
                  className="flex items-center gap-2 focus:outline-none focus-visible:outline-none focus:ring-0 cursor-pointer"
                >
                  <Image
                    src="/images/Stats/AttoLearn-Logo_footer.png"
                    alt="AttoLearn"
                    width={256}
                    height={85}
                    priority
                    className="h-auto w-auto"
                  />
                </Link>
              </div>

              <div className="mt-7 text-left">
                <p className="mt-4 max-w-[32ch] text-[15px] leading-7 font-medium sm:text-[17px]">
                  A unified platform for modern school management and
                  curriculum-aligned learning
                </p>
              </div>

              <div className="mt-7 grid flex-1 place-items-center">
                <div className="w-full max-w-65 -translate-y-3 sm:-translate-y-5">
                  <Image
                    src="/images/Banners/School-management.png"
                    alt="Illustration"
                    width={384}
                    height={256}
                    priority
                    className="h-43.25 w-full object-contain"
                  />
                </div>
              </div>

              <div className="text-sm text-black/90">© 2026 AttoLearn</div>
            </div>
          </aside>

          <div className="flex flex-1 items-center justify-center overflow-auto p-6 sm:p-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
