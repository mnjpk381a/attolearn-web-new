import Image from "next/image";
import Link from "next/link";
import { social } from "@/constants/social";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="mt-10 bg-[#007381]">
      {/* Newsletter */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="py-10 flex justify-center">
            <div className="w-full max-w-2xl text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#007381]">
                Join our Newsletter
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Subscribe to our newsletter and receive the latest news about
                our products and services!
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-transparent text-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Logo */}
            <div className="lg:col-span-2">
              <Link href="/" prefetch={false} className="inline-flex">
                <Image
                  src="/images/Stats/AttoLearn-Logo_footer.png"
                  alt="Attobility"
                  width={300}
                  height={72}
                  className="h-19 w-42 object-contain"
                />
              </Link>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>
                  <Link href="/team" prefetch={false} className="hover:underline">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/about" prefetch={false} className="hover:underline">
                    About us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold">Products</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>
                  <Link
                    href="/papergenerator"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Paper Generator
                  </Link>
                </li>
                <li>
                  <Link href="/sms" prefetch={false} className="hover:underline">
                    School ERP
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policy */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold">Policies</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>
                  <Link
                    href="/privacypolicy"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termsofservice"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refundpolicy"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cancellationpolicy"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Return (Cancellation Policy)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shippingdeliverypolicy"
                    prefetch={false}
                    className="hover:underline"
                  >
                    Shipping & Delivery Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help & Support */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold">Help & Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/90">
                <li>
                  <Link href="/resources" prefetch={false} className="hover:underline">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/contact" prefetch={false} className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" prefetch={false} className="hover:underline">
                    FAQS
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
