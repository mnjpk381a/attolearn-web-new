/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { Monitor, Unlock } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SignupLink } from "@/constants/plans";
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative flex min-h-[48vh] w-full items-center overflow-hidden
  bg-linear-to-r from-[#eaf4f6] via-[#d7ebee] to-[#c6e3e7]
  sm:min-h-[50vh] lg:min-h-[62vh]"
      >
        {/* 🔥 PREMIUM NEWS BAR */}
        <div
          className="absolute top-0 left-0 z-30 w-full overflow-hidden
    bg-linear-to-r from-teal-800 via-teal-600 to-teal-800
    shadow-[0_8px_30px_rgba(0,0,0,0.25)]
    border-b border-white/20"
        >
          <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-white/70 to-transparent" />

          <div className="bg-[#f2a824] overflow-hidden">
            <div className="animate-marquee whitespace-nowrap py-2">
              <p
                className="inline-block px-6 text-[14px] sm:text-base font-semibold tracking-wide text-black
        drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
              >
                🚀 BIG UPDATE — Complete 10 <sup>th</sup> Class Syllabus is Now
                Available for All Students ✨ Along with this, Multiple New
                Features Have Been Successfully Added in SM 🔥
              </p>
            </div>
          </div>
        </div>

        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.6),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.3),transparent_50%)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-12 sm:px-6 sm:pt-14 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            {/* LEFT TEXT */}
            <div className="mx-auto max-w-xl text-center text-[#0f172a] lg:mx-0 lg:text-left mt-4">
              <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
                <Reveal delay={0.0}>
                  <h1
                    className="text-[clamp(1.2rem,4.5vw,2.5rem)]
            font-extrabold leading-[1.1] tracking-tight"
                  >
                    Exam Papers in Just 3 Clicks
                  </h1>
                </Reveal>

                <Reveal delay={0.08}>
                  <h2
                    className="text-[clamp(1.1rem,4vw,1.7rem)]
            font-extrabold leading-[1.1] tracking-tight text-[#0e7f8c]"
                  >
                    Fully aligned with your curriculum
                  </h2>
                </Reveal>

                {/* Buttons */}
                <motion.div
                  initial={false}
                  whileInView="show"
                  viewport={{ once: true, amount: 0.6 }}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                  className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row lg:items-start lg:justify-start"
                >
                  <motion.a
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                    href={SignupLink + "?plan=1"}
                    className="inline-flex h-10 w-40 items-center justify-center rounded-lg bg-[#f2a824]
              text-sm font-semibold text-white transition hover:bg-yellow-500 sm:h-11 sm:w-44"
                  >
                    Start Free Trial
                  </motion.a>

                  <motion.a
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0 },
                    }}
                    href="/papergenerator/demo"
                    className="inline-flex h-10 w-40 items-center justify-center rounded-lg bg-white
              text-sm font-semibold text-[#0a6f78] shadow-sm transition hover:bg-gray-100 sm:h-11 sm:w-44"
                  >
                    Live Demo
                  </motion.a>
                </motion.div>
              </div>
            </div>

            {/* RIGHT SLIDER */}
            <Reveal
              delay={0.12}
              y={14}
              className="relative flex h-52 w-full justify-center sm:h-64 lg:h-96"
            >
              <motion.div
                className="relative flex h-full w-full justify-center"
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
              >
                <div
                  className="relative aspect-square w-[min(700px,100%)]
          overflow-hidden rounded-[20px] lg:translate-x-4"
                >
                  <div className="banner-drift absolute -inset-[40%] z-0" />

                  <div className="relative z-2 h-full w-full">
                    {[
                      { step: 1, label: "Select Class", img: "PGB1.png" },
                      {
                        step: 2,
                        label: "Select Subject & Chapters",
                        img: "PGB2.png",
                      },
                      { step: 3, label: "Select Paper type", img: "PGB3.png" },
                      {
                        step: 4,
                        label: "Your Exam Paper Is Ready",
                        img: "PGB4.png",
                      },
                    ].map((slide, i) => (
                      <div key={i} className={`slide s${i + 1}`}>
                        <div className="relative flex h-full w-full flex-col gap-2">
                          <div className="flex items-center gap-2 pt-1">
                            <span className="step-badge">{slide.step}</span>
                            <span className="step-label">{slide.label}</span>
                          </div>

                          <div className="slide-media">
                            <div className="slide-frame">
                              <Image
                                src={`/images/papergenerator/${slide.img}`}
                                alt={`Step ${slide.step}`}
                                fill
                                className="object-contain object-center"
                                priority={i === 0}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cursor" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 3l16 9-9 2-2 9L4 3z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Payment Center */}
      <section className="bg-white py-5 sm:py-6">
        <div className="mx-auto max-w-390 px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px max-w-70 flex-1 bg-[#e9e9e9]" />
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#1f2937]">
              Payment Center
            </h2>
            <span className="h-px max-w-70 flex-1 bg-[#e9e9e9]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Bank Account",
                number: "",
                icon: "/images/payment/bank-icon.png",
                waveBg: "bg-[#d9f3f5]",
              },
              {
                title: "Jazz Cash",
                number: "03004419244",
                icon: "/images/payment/jazzcash.png",
                waveBg: "bg-[#f3dfc5]",
              },
              {
                title: "EasyPaisa",
                number: "03167482947",
                icon: "/images/payment/easypaisa.png",
                waveBg: "bg-[#dcefee]",
              },
              {
                title: "WhatsApp Receipts",
                subtitle: "for Payment Verification",
                numbers: ["03167482947", "03004419244"],
                icon: "/images/payment/whatsapp.png",
                waveBg: "bg-[#dfe8c8]",
                isWhatsapp: true,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="min-h-44 overflow-hidden rounded-2xl border border-[#e7e7e7] bg-white shadow-sm flex flex-col"
              >
                <div className="flex flex-1 flex-col items-center px-4 pt-3 pb-2 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#111827]">
                    {item.title}
                  </h3>

                  {item.isWhatsapp && (
                    <p className="mt-1 text-[11px] text-[#6b7280]">
                      {item.subtitle}
                    </p>
                  )}

                  {item.isWhatsapp ? (
                    <div className="mt-2 flex flex-col items-center gap-1">
                      {item.numbers.map((num, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <img src={item.icon} className="h-3.5 w-3.5" />
                          <p className="text-[16px] font-medium text-[#111827]">
                            {num}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    item.number && (
                      <p className="mt-2 text-[16px] font-medium text-[#111827]">
                        {item.number}
                      </p>
                    )
                  )}
                </div>

                <div className={`relative mt-auto h-10 ${item.waveBg}`}>
                  <div className="absolute inset-x-0 -top-3 h-6 rounded-[100%] bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Top Heading */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-teal-700 sm:text-4xl">
                Everything you need
              </h2>
              <h3 className="mt-8 mb-6 text-base font-semibold text-gray-700 sm:text-2xl">
                To create exam papers efficiently
              </h3>
            </div>
          </Reveal>

          {/* SECTION 1 */}
          <div className="mt-16 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal>
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Smart Curriculum-Aligned Paper Creation
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  Create syllabus-accurate exam papers in minutes — without
                  manual effort.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>
                    • Grade, Subject, Chapter & Topic mapping (KG–Grade 10)
                  </li>
                  <li>• Monthly, Mid-term, Final & Practice exams</li>
                  <li>• Syllabus-accurate, ready-to-use papers</li>
                  <li>• Eliminates manual curriculum checking</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/images/papergenerator/Exam-Paper1.png"
                  alt="Curriculum aligned paper creation"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>
          </div>

          {/* SECTION 2 (REVERSED) */}
          <div className="mt-20 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal
              delay={0.08}
              className="order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              <div className="w-full flex justify-center lg:justify-start">
                <Image
                  src="/images/papergenerator/paper-Type2.png"
                  alt="Flexible question types"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2">
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Flexible Question Types & Paper Templates
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  Design exams exactly the way your school needs them.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>• MCQs, Short, Long & Mixed questions</li>
                  <li>• Ready-made paper templates (Quizards)</li>
                  <li>• Flexible layouts for different exams</li>
                  <li>• Consistent structure across all papers</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* SECTION 3 */}
          <div className="mt-20 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal>
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Easy Editing & Paper Refinement
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  Fine-tune papers before final submission with complete
                  control.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>• Edit questions after generation</li>
                  <li>• Reorder questions instantly</li>
                  <li>• Adjust difficulty levels easily</li>
                  <li>• Built-in review before finalization</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/images/papergenerator/Editing-Paper3.png"
                  alt="Paper editing"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>
          </div>

          {/* SECTION 4 (REVERSED) */}
          <div className="mt-20 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal
              delay={0.08}
              className="order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              <div className="w-full flex justify-center lg:justify-start">
                <Image
                  src="/images/papergenerator/Paper-Library4.png"
                  alt="Paper library"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2">
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Paper Library, Search & Reuse
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  Never lose an exam paper again — reuse anytime, anywhere.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>• Automatic paper history storage</li>
                  <li>• Search by grade, subject or date</li>
                  <li>• Duplicate papers instantly</li>
                  <li>• Perfect for recurring exams & revisions</li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* SECTION 5 */}
          <div className="mt-20 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
            <Reveal>
              <div>
                <h3 className="text-3xl font-extrabold text-teal-700">
                  Print, Share & Collaborate Seamlessly
                </h3>

                <p className="mt-4 text-lg text-gray-700">
                  From creation to approval — everything stays smooth and fast.
                </p>

                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>• Exam-ready printable layouts</li>
                  <li>• PDF export & bulk printing</li>
                  <li>• Share via WhatsApp or file sharing</li>
                  <li>• Faster approvals & team collaboration</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/images/papergenerator/Print-paper5.png"
                  alt="Print and share papers"
                  width={900}
                  height={520}
                  className="w-full max-w-xl rounded-2xl border-2 border-teal-600 p-2"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="relative w-full py-20 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/Banners/School-MS.jpg"
          alt="CTA Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Cards Section */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Card 1 */}
            <Reveal delay={0.05}>
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <h3 className="text-2xl font-extrabold text-teal-700">
                  Start creating for free
                </h3>

                <p className="mt-3 max-w-sm text-base text-gray-700">
                  Sign up and start generating exam papers online.
                </p>

                <div className="mt-10 flex items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 ring-1 ring-gray-200">
                    <Monitor
                      className="h-9 w-9 text-teal-600"
                      strokeWidth={1.6}
                    />
                  </div>

                  <a
                    href={SignupLink + "?plan=1"}
                    className="flex w-40 items-center justify-center rounded-lg bg-teal-600 px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-500"
                  >
                    Start Free Trial
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Card 2 */}
            <Reveal delay={0.08}>
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <h3 className="text-2xl font-extrabold text-teal-700">
                  Explore the Demo
                </h3>

                <p className="mt-3 max-w-sm text-base text-gray-700">
                  See how it works.
                </p>

                <div className="mt-10 flex items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 ring-1 ring-gray-200">
                    <Unlock
                      className="h-9 w-9 text-yellow-600"
                      strokeWidth={1.6}
                    />
                  </div>

                  <a
                    href="/papergenerator/demo"
                    className="flex w-40 items-center justify-center rounded-lg bg-yellow-400 px-7 py-3 text-sm font-bold text-gray-900 shadow-sm transition hover:bg-yellow-300"
                  >
                    Start Demo
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
