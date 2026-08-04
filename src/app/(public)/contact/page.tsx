"use client";

import React, { useMemo, useState } from "react";

type ContactFormState = {
  personName: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>({
    personName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const addresses = useMemo(
    () => [
      {
        country: "Australia",
        address: "96B Hale Road, Wembley Downs, PERTH WA 6019, Australia",
      },
      {
        country: "Thailand",
        address:
          "976/28 Future Point Mini Office Complex Rama 9 Road, Bangkok, Thailand",
      },
      {
        country: "United States of America",
        address: "7038 Levelcross Ln, 28269, Charlotte, NC, USA",
      },
      {
        country: "Pakistan",
        address: "13-A Commercial, Gulshan-E-Lahore, Pakistan, 54000",
      },
    ],
    []
  );

  const mapAddress = addresses[0].address;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapAddress
  )}&output=embed`;

  const onChange =
    (key: keyof ContactFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.message || "An error occurred. Please try again."
        );
      }

      setStatus("success");
      setForm({ personName: "", email: "", subject: "", message: "" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "An error occurred. Please try again.");
    }
  }

  return (
    <section className="bg-white mt-4">
      {/* Map */}
      <div className="mb-8">
        <iframe
          title="Attobility Location Map"
          className="h-75 w-full border-0"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Info */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0e6f7f] text-white">
                  📍
                </span>

                <div className="flex-1">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Address
                  </h3>

                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    {addresses.map((a) => (
                      <div key={a.country}>
                        <p className="text-black font-bold text-base">
                          {a.country}
                        </p>
                        <p className="mt-1">{a.address}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mt-6 flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0e6f7f] text-white">
                  ✉️
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@attolearn.com"
                    className="mt-2 block text-sm font-semibold text-[#0e6f7f] hover:underline"
                  >
                    info@attolearn.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={form.personName}
                      onChange={onChange("personName")}
                      className="w-full rounded-md border border-[#007381] bg-white px-3 py-2.5 text-sm text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-[#0e6f7f]/30"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={form.email}
                      onChange={onChange("email")}
                      className="w-full rounded-md border border-[#007381] bg-white px-3 py-2.5 text-sm text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-[#0e6f7f]/30"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Subject"
                    value={form.subject}
                    onChange={onChange("subject")}
                    className="w-full rounded-md border border-[#007381] bg-white px-3 py-2.5 text-sm text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-[#0e6f7f]/30"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={5}
                    placeholder="Message"
                    value={form.message}
                    onChange={onChange("message")}
                    className="w-full resize-none rounded-md border border-[#007381] bg-white px-3 py-2.5 text-sm text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-[#0e6f7f]/30"
                  />
                </div>

                {/* Status messages */}
                <div className="min-h-11">
                  {status === "loading" ? (
                    <div className="text-sm font-semibold text-slate-700">
                      Loading…
                    </div>
                  ) : null}

                  {status === "error" ? (
                    <div className="rounded-md bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                      {error}
                    </div>
                  ) : null}

                  {status === "success" ? (
                    <div className="rounded-md bg-[#0e6f7f] px-3 py-2 text-sm font-semibold text-white">
                      Your message has been sent. Thank you!
                    </div>
                  ) : null}
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                      "inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-extrabold text-white transition sm:w-auto",
                      "bg-[#0e6f7f] hover:opacity-95",
                      status === "loading" && "cursor-not-allowed opacity-70"
                    )}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
