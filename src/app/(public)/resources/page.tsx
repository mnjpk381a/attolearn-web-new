// app/resources/page.tsx  (Next.js App Router)
// ✅ Next.js + TypeScript + Tailwind + Responsive
// ✅ Category tabs (Education, Training, etc.)
// ✅ Language dropdown ONLY for Education
// ✅ Watch More / Watch Less (first 3 then expand)
// ✅ Video modal supports local mp4 + YouTube iframe
// ✅ After local video ends => opens lead popup form (like your JS)

"use client";

import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";

type Category =
  | "Education"
  | "Training"
  | "Nutrition"
  | "Planner"
  | "Comms"
  | "Buddies"
  | "Social"
  | "Photo";

type Language = "eng" | "urdu";

type VideoItem = {
  id: string;
  category: Category;
  lang?: Language; // only for Education videos
  title: string;
  thumb: string;
  src: string; // mp4 path OR youtube embed url
  download?: string; // file to download (defaults to src)
  hidden?: boolean; // maps your style="display:none;"
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isMp4(url: string) {
  return url.toLowerCase().endsWith(".mp4");
}

export default function ResourcesPage() {
  // ---------- Data (add the rest of your cards here the same way) ----------
  const videos: VideoItem[] = useMemo(
    () => [
      // -------- Education (English) --------
      {
        id: "edu-eng-1",
        category: "Education",
        lang: "eng",
        title: "How to register your school on Attobility web portal?",
        thumb: "/images/EducationVideos/SchoolRegisteration-img.jpg",
        src: "/images/EducationVideos/Registration1.mp4",
        download: "/images/EducationVideos/Registration1.mp4",
      },
      {
        id: "edu-eng-2",
        category: "Education",
        lang: "eng",
        title: "How to add classes to new school on Attobility web portal?",
        thumb: "/images/EducationVideos/AddClasses-img.jpg",
        src: "/images/EducationVideos/classes.mp4",
        download: "/images/EducationVideos/classes.mp4",
      },
      {
        id: "edu-eng-3",
        category: "Education",
        lang: "eng",
        title: "How to create auto generate exam paper on Attobility app?",
        thumb: "/images/EducationVideos/Auto-generate.jpg",
        src: "/images/EducationVideos/Auto-generate.mp4",
        download: "/images/EducationVideos/Auto-generate.mp4",
      },
      {
        id: "edu-eng-4",
        category: "Education",
        lang: "eng",
        title: "How to update your school profile on Attobility web portal?",
        thumb: "/images/EducationVideos/SchoolProfile-img.jpg",
        src: "/images/EducationVideos/student.mp4",
        download: "/images/EducationVideos/student.mp4",
      },
      {
        id: "edu-eng-5",
        category: "Education",
        lang: "eng",
        title: "How to mark student attendance on Attobility web portal?",
        thumb: "/images/EducationVideos/Student-Attendance.jpg",
        src: "/images/EducationVideos/Student-Attendance.mp4",
        download: "/images/EducationVideos/Student-Attendance.mp4",
      },
      // hidden ones from your markup:
      {
        id: "edu-eng-6",
        category: "Education",
        lang: "eng",
        title: "How to add a new teacher to the school in the school portal?",
        thumb: "/images/EducationVideos/Addteacher.png",
        src: "/images/EducationVideos/Add a new teacher in school system.mp4",
        download:
          "/images/EducationVideos/Add a new teacher in school system.mp4",
        hidden: true,
      },
      {
        id: "edu-eng-7",
        category: "Education",
        lang: "eng",
        title: "How to assign a teacher to a class in the school portal?",
        thumb: "/images/EducationVideos/Assignteacher .png",
        src: "/images/EducationVideos/Assign a teacher to class section.mp4",
        download:
          "/images/EducationVideos/Assign a teacher to class section.mp4",
        hidden: true,
      },
      {
        id: "edu-eng-8",
        category: "Education",
        lang: "eng",
        title: "How to create an exams paper on the school portal?",
        thumb: "/images/EducationVideos/ExamPaper.png",
        src: "/images/EducationVideos/Create New Exam Paper.mp4",
        download: "/images/EducationVideos/Create New Exam Paper.mp4",
        hidden: true,
      },
      {
        id: "edu-eng-9",
        category: "Education",
        lang: "eng",
        title: "How to link students to a class section in the school portal?",
        thumb: "/images/EducationVideos/LinkStudents.png",
        src: "/images/EducationVideos/Link Students to Class Section.mp4",
        download:
          "/images/EducationVideos/Link Students to Class Section.mp4",
        hidden: true,
      },
      {
        id: "edu-eng-10",
        category: "Education",
        lang: "eng",
        title: "How to set up your school in the system?",
        thumb: "/images/EducationVideos/school.png",
        src: "/images/EducationVideos/SchoolSetup.mp4",
        download: "/images/EducationVideos/SchoolSetup.mp4",
        hidden: true,
      },
      {
        id: "edu-eng-11",
        category: "Education",
        lang: "eng",
        title: "How to create student id card on Attobility web portal?",
        thumb: "/images/EducationVideos/id-card.jpg",
        src: "/images/EducationVideos/StudentIDCard.mp4",
        download: "/images/EducationVideos/StudentIDCard.mp4",
        hidden: true,
      },

      // -------- Education (Urdu) --------
      {
        id: "edu-urdu-1",
        category: "Education",
        lang: "urdu",
        title: "How to update your school profile on Attobility web portal?",
        thumb: "/images/EducationVideos/SchoolProfile-img.jpg",
        src: "/images/EducationVideos/SchoolProfile.mp4",
        download: "/images/EducationVideos/SchoolProfile.mp4",
      },
      {
        id: "edu-urdu-2",
        category: "Education",
        lang: "urdu",
        title: "How to register your school on Attobility web portal?",
        thumb: "/images/EducationVideos/SchoolRegisteration-img.jpg",
        src: "/images/EducationVideos/SchoolRegisteration.mp4",
        download: "/images/EducationVideos/SchoolRegisteration.mp4",
      },
      {
        id: "edu-urdu-3",
        category: "Education",
        lang: "urdu",
        title: "How to add classes to new school on Attobility web portal?",
        thumb: "/images/EducationVideos/AddClasses-img.jpg",
        src: "/images/EducationVideos/AddClasses.mp4",
        download: "/images/EducationVideos/AddClasses.mp4",
      },
      {
        id: "edu-urdu-4",
        category: "Education",
        lang: "urdu",
        title: "How to add a new teacher to the school in the school portal?",
        thumb: "/images/EducationVideos/Addteacher.png",
        src: "/images/EducationVideos/Add a new teacher in school system.mp4",
        download:
          "/images/EducationVideos/Add a new teacher in school system.mp4",
        hidden: true,
      },

      // -------- Nutrition / Planner / Buddies / Social / Photo --------
      {
        id: "nutrition-1",
        category: "Nutrition",
        title: "How to add a new food item in your nutrition plan?",
        thumb: "/images/Thumnails/nutrition-plan.png",
        src: "/images/EducationVideos/NutritionPlan.mp4",
        download: "/images/EducationVideos/NutritionPlan.mp4",
      },
      {
        id: "planner-1",
        category: "Planner",
        title: "How to create an event with planner?",
        thumb: "/images/Thumnails/planner.png",
        src: "/images/EducationVideos/Planner.mp4",
        download: "/images/EducationVideos/Planner.mp4",
      },
      {
        id: "buddies-1",
        category: "Buddies",
        title: "How to add connect with people who share your interests?",
        thumb: "/images/Thumnails/share-intrest.png",
        src: "/images/EducationVideos/Buddies.mp4",
        download: "/images/EducationVideos/Buddies.mp4",
      },
      {
        id: "social-1",
        category: "Social",
        title: "How to create a post using your phone gallery?",
        thumb: "/images/Thumnails/phone-gallery.png",
        src: "/images/EducationVideos/PhoneGallery.mp4",
        download: "/images/EducationVideos/PhoneGallery.mp4",
      },
      {
        id: "photo-1",
        category: "Photo",
        title: "How to create category in photo gallery?",
        thumb: "/images/Thumnails/category-photo.png",
        src: "/images/EducationVideos/PhotoGallery.mp4",
        download: "/images/EducationVideos/PhotoGallery.mp4",
      },
    ],
    []
  );

  // Seminar video (from your "About Seminar" section)
  const seminar = useMemo(
    () => ({
      title: "Attobility Education Seminar",
      thumb: "/images/EducationVideos/educationseminar.png",
      src: "/images/EducationVideos/Educationseminar.mp4",
      descriptionHeading: "Attobility Education Seminar",
      description: [
        "TBD",
        "We're excited to introduce Attobility Education through an upcoming launch seminar; designed to show how our all-in-one platform can help institutions streamline daily operations, enhance student engagement, and bring greater ease and efficiency to school management.",
      ],
    }),
    []
  );

  // ---------- UI State ----------
  const categories: { key: Category; label: string }[] = useMemo(
    () => [
      { key: "Education", label: "Education" },
      { key: "Training", label: "Training Plan" },
      { key: "Nutrition", label: "Nutrition Plan" },
      { key: "Planner", label: "Planner" },
      { key: "Comms", label: "Comms" },
      { key: "Buddies", label: "Buddies" },
      { key: "Social", label: "Social Content" },
      { key: "Photo", label: "Photo Gallery" },
    ],
    []
  );

  const [activeCategory, setActiveCategory] = useState<Category>("Education");
  const [lang, setLang] = useState<Language>("eng");
  const [expanded, setExpanded] = useState(false);

  // Video modal state
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Lead popup state
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "", email: "" });

  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  // ---------- Derived lists ----------
  const categoryVideos = useMemo(() => {
    const byCategory = videos.filter((v) => v.category === activeCategory);

    // Mimic your page:
    // - For non-Education tabs: show whatever exists; also show placeholders for Training/Comms.
    // - For Education: filter by language.
    if (activeCategory !== "Education") return byCategory;

    return byCategory.filter((v) => v.lang === lang);
  }, [videos, activeCategory, lang]);

  const visibleList = useMemo(() => {
    // Respect "hidden" but still allow "Watch More" to reveal them.
    const ordered = [...categoryVideos];

    // Collapse = show 3, Expand = show all (same behavior)
    const shown = expanded ? ordered : ordered.slice(0, 3);

    return shown;
  }, [categoryVideos, expanded]);

  const canToggleMore = useMemo(() => {
    // Only show Watch More button for Education like your original JS
    if (activeCategory !== "Education") return false;
    return categoryVideos.length > 3;
  }, [activeCategory, categoryVideos.length]);

  // Reset behavior when switching tabs or language
  function selectCategory(cat: Category) {
    setActiveCategory(cat);
    setExpanded(false);

    if (cat === "Education") {
      // default english like your original behavior
      setLang("eng");
    }
  }

  function openVideo(v: VideoItem) {
    setActiveVideo(v);
    setIsVideoOpen(true);
  }

  function closeVideo() {
    setIsVideoOpen(false);
    // Stop local video if playing
    if (localVideoRef.current) {
      localVideoRef.current.pause();
      localVideoRef.current.currentTime = 0;
    }
    setActiveVideo(null);
  }

  function onLocalEnded() {
    // close video modal, open lead popup
    closeVideo();
    setIsLeadOpen(true);
  }

  function submitLead(e: React.FormEvent) {
    e.preventDefault();
    alert("Thank you for your submission! We will contact you soon.");
    setLead({ name: "", phone: "", email: "" });
    setIsLeadOpen(false);
  }

  const showEducationControls = activeCategory === "Education";

  return (
    <main className="bg-white">
      {/* ------------------- Video Cards Section ------------------- */}
      <section className="pt-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Step-by-step guides and walkthrough videos
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((c) => {
                const active = c.key === activeCategory;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => selectCategory(c.key)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-bold transition",
                      active
                        ? "bg-[#077784] text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* Language dropdown (only Education) */}
            {showEducationControls ? (
              <div className="flex items-center justify-start">
                <div className="relative w-full max-w-xs">
                  <select
                    value={lang}
                    onChange={(e) => {
                      setLang(e.target.value as Language);
                      setExpanded(false);
                    }}
                    className="w-full appearance-none rounded-md border border-[#077783] bg-[#077783] px-3 py-2 pr-10 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-white/60"
                  >
                    <option value="eng">English</option>
                    <option value="urdu">Urdu</option>
                  </select>

                  {/* custom arrow */}
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white">
                    ▾
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Cards grid */}
          <div className="mt-8">
            {/* Placeholders for tabs you had as "updated soon" */}
            {activeCategory === "Training" || activeCategory === "Comms" ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm font-bold text-slate-700">
                This section will be updated soon
              </div>
            ) : null}

            {/* Video list */}
            {activeCategory !== "Training" && activeCategory !== "Comms" ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleList.map((v) => (
                  <VideoCard key={v.id} item={v} onOpen={() => openVideo(v)} />
                ))}
              </div>
            ) : null}

            {/* Watch More / Less (Education only) */}
            {canToggleMore ? (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setExpanded((p) => !p)}
                  className="rounded-md bg-[#077784] px-6 py-2.5 text-sm font-extrabold text-white hover:opacity-95"
                >
                  {expanded ? "Watch Less" : "Watch More"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ------------------- Video Modal ------------------- */}
      {isVideoOpen && activeVideo ? (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeVideo}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <h5
                className="max-w-[80%] truncate text-base font-extrabold text-slate-900 sm:text-lg"
                title={activeVideo.title}
              >
                {activeVideo.title}
              </h5>
              <button
                type="button"
                onClick={closeVideo}
                className="rounded-md px-2 py-1 text-sm font-bold text-slate-600 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              {isMp4(activeVideo.src) ? (
                <video
                  ref={localVideoRef}
                  className="mx-auto block w-full max-w-200 object-contain"
                  style={{ maxHeight: "80vh" }}
                  controls
                  autoPlay
                  onEnded={onLocalEnded}
                >
                  <source src={activeVideo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="mx-auto w-full max-w-200">
                  <div className="relative aspect-video w-full">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={activeVideo.src}
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={activeVideo.title}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* ------------------- Lead Popup Modal ------------------- */}
      {isLeadOpen ? (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsLeadOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLeadOpen(false)}
              className="absolute right-6 top-5 text-xl font-extrabold text-slate-500 hover:text-slate-700"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-2xl font-extrabold text-[#003b3b] sm:text-[28px]">
              Ready to grow with Attobility?
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              Leave your details below and our team will be in touch!
            </p>

            <form onSubmit={submitLead} className="mt-6 space-y-3">
              <input
                value={lead.name}
                onChange={(e) =>
                  setLead((p) => ({ ...p, name: e.target.value }))
                }
                required
                placeholder="Full Name"
                className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b3b]/20"
              />
              <input
                value={lead.phone}
                onChange={(e) =>
                  setLead((p) => ({ ...p, phone: e.target.value }))
                }
                required
                placeholder="Phone Number"
                className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b3b]/20"
              />
              <input
                type="email"
                value={lead.email}
                onChange={(e) =>
                  setLead((p) => ({ ...p, email: e.target.value }))
                }
                required
                placeholder="Email"
                className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003b3b]/20"
              />

              <p className="pt-1 text-xs text-slate-600">
                🔒 Your information is safe with us.
              </p>

              <div className="pt-2">
                <button
                  type="submit"
                  className="mx-auto block w-full rounded-full bg-[#003b3b] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#025f5f] sm:w-1/2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* ------------------- Call To Action ------------------- */}
      <section className="relative mt-12 overflow-hidden bg-[#0b1b1b] py-14 text-white">
        <div className="absolute inset-0">
          {/* Use ONE image (your original had 2). Put your banner in /public/... */}
          <Image
            src="/images/EducationVideos/Seminar-banner-bg.png"
            alt="CTA Background"
            fill
            className="object-cover opacity-60"
            priority={false}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              The Smarter Way to Run Your School
            </h2>
            <h4 className="mt-2 text-base font-bold text-white/90 sm:text-lg">
              Designed to ease your daily school operations
            </h4>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-extrabold">Download Now</h3>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.attobility"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
              >
                <span aria-hidden>▶</span> Play Store
              </a>

              <a
                href="https://apps.apple.com/au/app/attobility/id6474482437"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/70 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
              >
                <span aria-hidden></span> App Store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------- About Seminar Section ------------------- */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              About this Seminar
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
            {/* Video */}
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <div
                className="group relative cursor-pointer overflow-hidden rounded-xl"
                onClick={() =>
                  openVideo({
                    id: "seminar",
                    category: "Education",
                    title: seminar.title,
                    thumb: seminar.thumb,
                    src: seminar.src,
                  })
                }
              >
                <Image
                  src={seminar.thumb}
                  alt={seminar.title}
                  width={1200}
                  height={675}
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/10 transition group-hover:bg-black/20">
                  <span className="text-5xl text-white/90">▶</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <h4 className="text-lg font-extrabold text-slate-900">
                {seminar.descriptionHeading}
              </h4>
              {seminar.description.map((p, idx) => (
                <p key={idx} className="mt-2 text-sm leading-6 text-slate-700">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ------------------- Card Component -------------------
function VideoCard({ item, onOpen }: { item: VideoItem; onOpen: () => void }) {
  const downloadHref = item.download || item.src;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Thumbnail */}
      <button
        type="button"
        onClick={onOpen}
        className="group relative block w-full"
        aria-label={`Play: ${item.title}`}
      >
        <div className="relative aspect-16/10 w-full">
          <Image
            src={item.thumb}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="absolute inset-0 grid place-items-center bg-black/10 transition group-hover:bg-black/20">
          <span className="text-5xl text-white/90">▶</span>
        </div>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h5 className="text-sm font-extrabold text-slate-900 sm:text-base">
          {item.title}
        </h5>

        <a
          href={downloadHref}
          download
          className="mt-3 inline-flex w-fit items-center justify-center rounded-md bg-[#077784] px-4 py-2 text-sm font-extrabold text-white hover:opacity-95"
        >
          Download Video
        </a>
      </div>
    </div>
  );
}
