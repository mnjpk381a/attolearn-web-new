// app/education/_components/Testimonials.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  name: string;
  person: string;
  quote: string;
};

export default function Testimonials() {
  const items: Testimonial[] = useMemo(
    () => [
      {
        name: "Rising Star Grammar School",
        person: "Ms. Farzana Malik",
        quote:
          "I finally have full control over my school without drowning in paperwork.",
      },
      {
        name: "Green Light School System",
        person: "Mr. Asim Khalid",
        quote:
          "From admissions to exams, it's all in one smart system. Super efficient!",
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  // 🔁 Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <section id="testimonials" className="w-full bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#007381]">
            Find out why Schools love Attolearn
          </h2>
          <p className="mt-4 sm:text-2xl text-gray-600">Stories from users</p>
        </div>

        {/* Slider */}
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-2xl bg-white">
            {/* Slides */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${idx * 100}%)` }}
            >
              {items.map((t) => (
                <div key={t.name} className="w-full shrink-0 p-6 sm:p-10">
                  <div className="mx-auto max-w-2xl text-center">
                    <Image
                      src="/images/EducationFeatures/Attobility_review-img.png"
                      alt="Review"
                      width={84}
                      height={84}
                      className="mx-auto rounded-full"
                    />

                    <h3 className="mt-4 text-lg font-extrabold text-[#007381]">
                      {t.name}
                    </h3>
                    <h4 className="mt-1 text-sm font-bold text-[#077783]">
                      {t.person}
                    </h4>

                    {/* Stars */}
                    <div className="mt-3 flex justify-center gap-1 text-yellow-500">
                      {"★★★★★".split("").map((s, i) => (
                        <span key={i}>{s}</span>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="mt-5 text-sm sm:text-base text-gray-700">
                      <span className="mr-1 font-bold text-gray-400">“</span>
                      {t.quote}
                      <span className="ml-1 font-bold text-gray-400">”</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 pb-4">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    idx === i ? "bg-[#077784]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
