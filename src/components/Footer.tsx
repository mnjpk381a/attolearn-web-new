import Image from "next/image";
import Link from "next/link";
import { social } from "@/constants/social";

export default function Footer() {
  return (
    <footer className="bg-[#007381]">
      {/* Main footer */}
      <div className="bg-transparent text-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Logo */}
            <div className="lg:col-span-2">
              <Link href="/" prefetch={false} className="inline-flex">
                <Image
                  src="/images/EducationIcon/AttoLearn-Logo_footer.png"
                  alt="Attobility"
                  width={300}
                  height={72}
                  className="h-19 w-42 object-contain"
                />
              </Link>
              <p className="mt-3 max-w-48 text-sm leading-5 text-white/90">
                One connected platform for learning, assessment and school
                management.
              </p>
            </div>

            {/* Products */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold">Products</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>
                  <Link
                    href="/adaptive-learning"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Adaptive Learning
                  </Link>
                </li>
                <li>
                  <Link
                    href="/papergenerator"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Assessment &amp; Paper Generator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sms"
                    prefetch={false}
                    className="hover:underline"
                  >
                    School Management
                  </Link>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold">Solutions</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>
                  <Link
                    href="/families"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Families
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home-education"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Home Education
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tutors"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Tutors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/schools"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Schools
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>
                  <Link
                    href="/about"
                    prefetch={false}
                    className="hover:underline"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacypolicy"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold">Follow Us</h4>
              <p className="mt-3 text-sm text-white/90 leading-relaxed max-w-55">
                Join our journey for tech insights, product updates, and
                innovation stories.
              </p>

              <div className="mt-4 flex items-center gap-3">
                {social.map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.alt}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white transition hover:bg-white/10"
                  >
                    <Image
                      src={s.img}
                      alt={s.alt}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </a>
                ))}
              </div>

              <div className="mt-4 text-sm text-white/90">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <span>info@attolearn.com</span>
                </p>
              </div>
            </div>
          </div>

          <hr className="border-white/50 my-10" />

          {/* Addresses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-white/90">
            <div>
              <h4 className="text-white font-semibold">Australia</h4>
              <p className="mt-2">
                96B Hale Road, Wembley Downs, PERTH WA 6019, Australia
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold">Thailand</h4>
              <p className="mt-2">
                976/28 Future Point Mini Office Complex Rama 9 Road, Bangkok,
                Thailand.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold">
                United States of America
              </h4>
              <p className="mt-2">
                7038 Levelcross Ln, 28269, Charlotte, NC, USA
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold">Pakistan</h4>
              <p className="mt-2">
                13-A Commercial, Gulshan-E-Lahore, Pakistan, 54000
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-white/90">
            <p>
              © <span>Copyright</span>{" "}
              <strong className="px-1">AttoLearn</strong>{" "}
              <span>All Rights Reserved 2026</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
