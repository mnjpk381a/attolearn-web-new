/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "./Testimonials";
import { useState } from "react";
import Plans from "./Plans";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
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

export default function HomePageClient() {
  const [showTrialModal, setShowTrialModal] = useState(false);
  const router = useRouter();
  return (
    <div>
      {/* HERO */}
      <section className="relative w-full min-h-screen overflow-hidden">
        {/* Desktop Background Image */}
        <Image
          src="/images/Banners/ATTO_HOME_B-1920x900.png"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center"
        />

        {/* Mobile Background Image */}
        <Image
          src="/images/Banners/ATTO_HOME_B-800x1200.png"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="block md:hidden object-cover object-center"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 min-h-screen flex items-start md:items-center pt-32 md:pt-0">
          <div className="max-w-xl w-full text-center lg:text-left mx-auto lg:mx-0">
            <Reveal delay={0.0}>
              <h1 className="text-white font-extrabold leading-tight tracking-tight text-2xl sm:text-3xl lg:text-5xl">
                You do what you do best – Nurture minds
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 text-yellow-400 font-extrabold leading-tight text-2xl sm:text-3xl lg:text-4xl">
                AttoLearn does the rest
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 text-white text-base sm:text-lg lg:text-xl">
                A unified platform for modern school management <br />
                and curriculum-aligned learning
              </p>
            </Reveal>

            <motion.div
              initial={false}
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                    staggerChildren: 0.08,
                    delayChildren: 0.16,
                  },
                },
              }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start"
            >
              {/* Start Free Trial */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                href="/chooseplan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-52 h-12 rounded-lg bg-[#f2a824]
          text-base sm:text-lg font-semibold text-white
          hover:bg-yellow-500 transition duration-300
          flex items-center justify-center"
              >
                Start Free Trial
              </motion.a>

              {/* Live Demo */}
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
                onClick={() => router.push("/papergenerator/demo")}
                className="w-52 h-12 rounded-lg bg-white cursor-pointer
          text-base sm:text-lg font-semibold text-[#0a6f78]
          hover:bg-gray-100 transition duration-300"
              >
                Paper Generator Demo
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f9fafb]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Heading */}
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-teal-700 sm:text-4xl">
                Manage your school efficiently
              </h2>
              <p className="mt-3 text-base text-gray-600 sm:text-lg">
                with our suite of powerful applications
              </p>
            </div>
          </Reveal>

          {/* Cards */}
          <motion.div
            initial={false}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.06 },
              },
            }}
            className="mt-12 grid gap-8 md:grid-cols-2"
          >
            {/* Card 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-2xl font-extrabold text-teal-700">
                Paper Generator
              </h3>

              <p className="mt-3 text-base text-gray-700">
                Curriculum-based papers in <b>3 clicks</b>
              </p>

              <div className="mt-5">
                <Link href="/papergenerator">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-yellow-300"
                  >
                    Learn More →
                  </button>
                </Link>
              </div>

              {/* Image */}
              <div className="mt-6 overflow-hidden rounded-xl bg-gray-50 p-3">
                <motion.div
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                >
                  <Image
                    src="/images/Banners/paper.png"
                    alt="Paper Generator preview"
                    width={800}
                    height={450}
                    className="w-full object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-2xl font-extrabold text-teal-700">
                School Management System
              </h3>

              <p className="mt-3 text-base text-gray-700">
                Digitize and automate your entire school work
              </p>

              <div className="mt-5">
                <Link href="/sms">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-yellow-300"
                  >
                    Learn More →
                  </button>
                </Link>
              </div>

              {/* Image */}
              <div className="mt-6 overflow-hidden rounded-xl bg-gray-50 p-3">
                <motion.div
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                >
                  <Image
                    src="/images/Banners/School.png"
                    alt="School Management System preview"
                    width={800}
                    height={450}
                    className="w-full object-contain"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="w-full bg-linear-to-b from-teal-600 to-teal-800 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold text-white">
                Atto Growth Pulse
              </h2>
              <div className="mx-auto mt-3 flex items-center justify-center gap-3">
                <span className="h-px w-20 bg-teal-300"></span>
                <span className="h-1 w-10 rounded bg-white"></span>
                <span className="h-px w-20 bg-teal-300"></span>
              </div>
            </div>
          </Reveal>

          {/* Stats Grid */}
          <motion.div
            initial={false}
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.06 },
              },
            }}
            className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3"
          >
            {/* Schools */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="flex flex-col items-center"
            >
              <img
                src="/images/Stats/Schools.png"
                alt="Schools"
                className="mb-4 h-14 w-14"
              />
              <p className="text-3xl font-extrabold text-yellow-400">50+</p>
              <p className="mt-1 text-sm font-semibold text-white">Schools</p>
            </motion.div>

            {/* Students */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="flex flex-col items-center"
            >
              <img
                src="/images/Stats/Studens.png"
                alt="Students"
                className="mb-4 h-14 w-14"
              />
              <p className="text-3xl font-extrabold text-yellow-400">4000+</p>
              <p className="mt-1 text-sm font-semibold text-white">Students</p>
            </motion.div>

            {/* Teachers */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              className="flex flex-col items-center"
            >
              <img
                src="/images/Stats/Teachers.png"
                alt="Teachers"
                className="mb-4 h-14 w-14"
              />
              <p className="text-3xl font-extrabold text-yellow-400">100+</p>
              <p className="mt-1 text-sm font-semibold text-white">Teachers</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* DOWNLOAD / APP CTA */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-75 sm:h-90">
          {/* Background Image */}
          <Image
            src="/images/EducationFeatures/Start.png"
            alt="Mobile App Preview"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />

          {/* Teal Overlay */}
          <div className="absolute inset-0 bg-[#007381]/85" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <div className="text-center">
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
                    Your Entire School Ecosystem
                  </h1>

                  <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-yellow-400">
                    Right In Your Pocket
                  </h2>

                  {/* Store Buttons */}
                  <motion.div
                    initial={false}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          ease: "easeOut",
                          staggerChildren: 0.1,
                          delayChildren: 0.08,
                        },
                      },
                    }}
                    className="mt-8 flex justify-center gap-4"
                  >
                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0 },
                      }}
                      href="https://play.google.com/store/apps/details?id=com.attobility"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-40 items-center justify-center rounded-md bg-white text-sm font-bold text-teal-700 shadow transition hover:bg-gray-100"
                    >
                      Google Play
                    </motion.a>

                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { opacity: 1, y: 0 },
                      }}
                      href="https://apps.apple.com/au/app/attobility/id6474482437"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-40 items-center justify-center rounded-md bg-white text-sm font-bold text-teal-700 shadow transition hover:bg-gray-100"
                    >
                      App Store
                    </motion.a>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ LINK */}
      <section id="faq-2" className="w-full bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-700">
                Frequently Asked Questions
              </h2>

              <p className="mt-3">
                <Link
                  href="/faq"
                  className="font-extrabold text-black hover:underline"
                >
                  Have questions? Find quick answers in our FAQs →
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {showTrialModal && <Plans onClose={() => setShowTrialModal(false)} />}
    </div>
  );
}
