"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  Users,
  BadgeDollarSign,
  Unlock,
  MonitorSmartphone,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { SignupLink } from "@/constants/plans";

type TabKey = "1" | "2" | "3" | "4";

function Reveal({
  children,
  delay = 0,
  y = 24,
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
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function WorkingTogetherSection() {
  const [activeTab, setActiveTab] = useState<TabKey | null>(null);

  const tabContentVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.25,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const handleToggle = (key: TabKey) => {
    setActiveTab((prev) => (prev === key ? null : key));
  };

  const sectionWrap = (
    title: string,
    desc: string,
    imgSrc: string,
    imgAlt: string,
    reverse?: boolean,
  ) => (
    <div className="mt-20 grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
      {!reverse ? (
        <>
          <Reveal>
            <div>
              <h3 className="text-3xl font-extrabold text-teal-700">{title}</h3>
              <p className="mt-4 text-lg text-gray-700">{desc}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex justify-center lg:justify-end">
              <motion.div
                className="w-full max-w-xl animate-[floaty_6s_ease-in-out_infinite]"
                initial={false}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  width={900}
                  height={520}
                  className="w-full rounded-2xl border-2 border-teal-600 p-2"
                />
              </motion.div>
            </div>
          </Reveal>
        </>
      ) : (
        <>
          <Reveal
            delay={0.08}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <div className="flex justify-center lg:justify-start w-full">
              <motion.div
                className="w-full max-w-xl animate-[floaty_6s_ease-in-out_infinite]"
                initial={false}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  width={900}
                  height={520}
                  className="w-full rounded-2xl border-2 border-teal-600 p-2"
                />
              </motion.div>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <div>
              <h3 className="text-3xl font-extrabold text-teal-700">{title}</h3>
              <p className="mt-4 text-lg text-gray-700">{desc}</p>
            </div>
          </Reveal>
        </>
      )}
    </div>
  );

  const topCards = [
    {
      key: "1" as TabKey,
      title: "Administration",
      description: "Manage your school with clarity and control",
      icon: Briefcase,
      iconWrap: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      key: "2" as TabKey,
      title: "Academics",
      description: "Tools for teaching, assessment, and learning",
      icon: GraduationCap,
      iconWrap: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      key: "3" as TabKey,
      title: "Students",
      description: "Complete student lifecycle and records",
      icon: Users,
      iconWrap: "bg-sky-50",
      iconColor: "text-sky-600",
    },
    {
      key: "4" as TabKey,
      title: "Finance & Reports",
      description: "Transparent finances and seamless communication",
      icon: BadgeDollarSign,
      iconWrap: "bg-violet-50",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#edf6f7]">
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(16,185,129,0.06),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_34%,rgba(14,165,233,0.06),transparent_35%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:pb-24 lg:pt-14">
          {/* HERO TOP */}
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* LEFT SIDE */}
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <div className="inline-flex max-w-full items-center rounded-full border border-[#8fd0d3] bg-white px-3 py-2 text-xs font-medium text-[#117b84] shadow-sm mt-8 sm:px-4 sm:text-sm">
                All-in-One School Management System
              </div>

              <h3 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-tight">
                <span className="text-[#0e2152]">School Management,</span>
                <br />
                <span className="text-[#108d8f]">Simplified</span>
              </h3>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-slate-600 sm:text-[16px] sm:leading-7 lg:mx-0">
                AttoLearn School Management System brings all your school
                operations into one smart platform to save time, reduce workload
                and improve efficiency.
              </p>

              {/* SMALL FEATURES */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Secure & Reliable",
                    text: "Enterprise grade data security",
                    icon: "/images/icons/Secure.png",
                  },
                  {
                    title: "Smart & Efficient",
                    text: "Automate tasks & improve productivity",
                    icon: "/images/icons/Smart.png",
                  },
                  {
                    title: "24/7 Support",
                    text: "We’re here to help whenever you need",
                    icon: "/images/icons/Support.png",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group text-center transition sm:text-left"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dff4f2] shadow-md transition-transform duration-300 group-hover:scale-110 sm:mx-0">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>

                    <h4 className="mt-4 text-sm font-bold text-[#0e2152]">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <a
                  href="/chooseplan?plan=2"
                  className="inline-flex h-11 w-full max-w-55 items-center justify-center rounded-lg bg-[#f2a824] text-base font-semibold text-white shadow-md transition hover:bg-yellow-500 sm:h-12"
                >
                  Start Free Trial
                  <span className="ml-2 text-lg">→</span>
                </a>

                <a
                  href="#"
                  className="pointer-events-none inline-flex h-11 w-full max-w-55 cursor-not-allowed items-center justify-center rounded-lg border border-gray-300 bg-gray-300 text-base font-semibold text-gray-500 shadow-md sm:h-12"
                >
                  Live Demo
                </a>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative flex items-start justify-center -mt-2 sm:-mt-4 lg:-mt-6 min-h-65 sm:min-h-85 md:min-h-105 lg:min-h-130">
              <div className="relative z-10 w-full max-w-70 sm:max-w-105 md:max-w-140 lg:max-w-180 xl:max-w-200">
                <Image
                  src="/images/Banners/School-management.png"
                  alt="School Management"
                  width={900}
                  height={600}
                  className="h-auto w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.15)]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* FEATURE CARDS + DETAILS IN SAME SECTION */}
          <div className="mt-10 rounded-[28px] bg-white/70 p-5 shadow-[0_10px_35px_rgba(16,24,40,0.06)] backdrop-blur-sm sm:p-8">
            <Reveal>
              <div className="text-center">
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0e2152] sm:text-4xl">
                  Everything your school needs, working together
                </h2>
              </div>
            </Reveal>

            {/* TOP CARDS */}
            <div className="mt-14">
              <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {topCards.map((card, index) => {
                  const Icon = card.icon;
                  const isActive = activeTab === card.key;

                  return (
                    <Reveal
                      key={card.key}
                      delay={index * 0.06}
                      className="h-full"
                    >
                      <div
                        onClick={() => handleToggle(card.key)}
                        className={`flex h-full min-h-60 w-full cursor-pointer flex-col rounded-2xl border px-4 py-4 shadow-sm transition duration-300 ${
                          card.iconWrap
                        } ${
                          isActive
                            ? "border-teal-700 shadow-md"
                            : "border-gray-300 hover:-translate-y-1 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70">
                            <Icon className={`h-6 w-6 ${card.iconColor}`} />
                          </div>
                        </div>

                        <h3 className="mt-3 text-center text-[20px] font-bold text-teal-700">
                          {card.title}
                        </h3>

                        <div className="mt-3 border-t border-gray-200" />

                        <div className="mt-3 flex flex-1 items-start justify-center">
                          <p className="text-center text-[14px] leading-6 text-gray-700">
                            {card.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(card.key);
                          }}
                          className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-teal-700 px-3 py-2 text-sm font-bold text-white transition hover:bg-teal-800"
                        >
                          {isActive ? "Read Less" : "Read More"}
                        </button>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* TAB CONTENT */}
            <AnimatePresence mode="wait">
              {activeTab && (
                <motion.div
                  key={activeTab}
                  className="mt-16 sm:mt-20"
                  variants={tabContentVariants}
                  initial={false}
                  animate="show"
                  exit="exit"
                >
                  {activeTab === "1" && (
                    <>
                      <Reveal>
                        <div className="mt-6 text-center">
                          <h3 className="text-2xl font-extrabold text-teal-700 sm:text-3xl">
                            Manage your school with clarity and control
                          </h3>
                        </div>
                      </Reveal>

                      {sectionWrap(
                        "Admin Dashboard",
                        "Central KPIs and shortcuts give school leadership full visibility across operations and branches.",
                        "/images/Administration/SMP1.png",
                        "Admin Dashboard",
                        false,
                      )}

                      {sectionWrap(
                        "Multi-Campus Control",
                        "Manage one or multiple campuses from a single account with central ownership and independent branch control.",
                        "/images/Administration/SMP2.png",
                        "Multi-Campus Control",
                        true,
                      )}

                      {sectionWrap(
                        "Academic Structure",
                        "Organise classes, sections, subjects, and academic events from one unified setup.",
                        "/images/Administration/SMP3.png",
                        "Academic Structure",
                        false,
                      )}

                      {sectionWrap(
                        "Teacher Management",
                        "Assign teachers, manage schedules, and handle roster adjustments in real time.",
                        "/images/Administration/SMP4.png",
                        "Teacher Management",
                        true,
                      )}
                    </>
                  )}

                  {activeTab === "2" && (
                    <>
                      <Reveal>
                        <div className="mt-6 text-center">
                          <h3 className="text-2xl font-extrabold text-teal-700 sm:text-3xl">
                            Tools for teaching, assessment, and learning
                          </h3>
                        </div>
                      </Reveal>

                      {sectionWrap(
                        "Teacher & Student Dashboards",
                        "Role-based workspaces for accessing classes, schedules, exams, and academic insights.",
                        "/images/Academics/Academic-1.png",
                        "Teacher & Student Dashboards",
                        false,
                      )}

                      {sectionWrap(
                        "Exam Management",
                        "Create tests, mid-terms, and finals with support for printable exam papers.",
                        "/images/Academics/Academic-2.png",
                        "Exam Management",
                        true,
                      )}

                      {sectionWrap(
                        "Online Quizzes",
                        "Conduct digital quizzes with automatic marking and secure result storage.",
                        "/images/Academics/Academic-3.png",
                        "Online Quizzes",
                        false,
                      )}

                      {sectionWrap(
                        "Attendance Tracking",
                        "Record daily student attendance with accurate class-wise history.",
                        "/images/Academics/Academic-4.png",
                        "Attendance Tracking",
                        true,
                      )}

                      {sectionWrap(
                        "Learning Insights",
                        "Identify learning gaps and track performance trends through diagnostics.",
                        "/images/Academics/Academic-5.png",
                        "Learning Insights",
                        false,
                      )}
                    </>
                  )}

                  {activeTab === "3" && (
                    <>
                      <Reveal>
                        <div className="mt-6 text-center">
                          <h3 className="text-2xl font-extrabold text-teal-700 sm:text-3xl">
                            Complete student lifecycle and records
                          </h3>
                        </div>
                      </Reveal>

                      {sectionWrap(
                        "Student Profiles",
                        "Register students and maintain complete academic and personal records.",
                        "/images/Students/Student-1.png",
                        "Student Profiles",
                        false,
                      )}

                      {sectionWrap(
                        "Academic Records",
                        "Securely store academic history and generate PDF transcripts when needed.",
                        "/images/Students/Student-2.png",
                        "Academic Records",
                        true,
                      )}

                      {sectionWrap(
                        "Certificates & IDs",
                        "Issue digital ID cards and QR-verified certificates for official use.",
                        "/images/Students/Student-3.png",
                        "Certificates & IDs",
                        false,
                      )}

                      {sectionWrap(
                        "Health & Awards",
                        "Maintain basic health records and track student achievements and awards.",
                        "/images/Students/Student-4.png",
                        "Health & Awards",
                        true,
                      )}
                    </>
                  )}

                  {activeTab === "4" && (
                    <>
                      <Reveal>
                        <div className="mt-6 text-center">
                          <h3 className="text-2xl font-extrabold text-teal-700 sm:text-3xl">
                            Transparent finances and seamless communication
                          </h3>
                        </div>
                      </Reveal>

                      {sectionWrap(
                        "Fee Configuration",
                        "Define flexible fee structures and billing rules controlled by the school.",
                        "/images/Finance/Finance-1.png",
                        "Fee Configuration",
                        false,
                      )}

                      {sectionWrap(
                        "Billing & Ledgers",
                        "Generate fee vouchers and track paid and unpaid balances per student.",
                        "/images/Finance/Finance-2.png",
                        "Billing & Ledgers",
                        true,
                      )}

                      {sectionWrap(
                        "Parent Access",
                        "Allow parents to view vouchers, download receipts, and access fee history.",
                        "/images/Finance/Finance-3.png",
                        "Parent Access",
                        false,
                      )}

                      {sectionWrap(
                        "Financial Reports",
                        "View collected versus outstanding summaries and manage payroll centrally.",
                        "/images/Finance/Finance-4.png",
                        "Financial Reports",
                        true,
                      )}

                      {sectionWrap(
                        "Communication",
                        "Enable parent-teacher messaging and send announcements, alerts, and notifications instantly.",
                        "/images/Finance/Finance-5.png",
                        "Communication",
                        false,
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
                  Try our platform for free
                </h3>

                <p className="mt-3 max-w-sm text-base text-gray-700">
                  Experience the power of our system with a free trial.
                </p>

                <div className="mt-10 flex items-center gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 ring-1 ring-gray-200">
                    <MonitorSmartphone
                      className="h-9 w-9 text-teal-600"
                      strokeWidth={1.6}
                    />
                  </div>

                  <a
                    href="/chooseplan?plan=2"
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
                    href={SignupLink + "?plan=1"}
                    className="flex w-40 items-center justify-center rounded-lg bg-gray-300 px-7 py-3 text-sm font-bold text-gray-500 cursor-not-allowed pointer-events-none"
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
