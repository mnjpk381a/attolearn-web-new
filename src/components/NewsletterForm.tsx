"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect API later
      }}
      className="mt-5 flex flex-col sm:flex-row gap-2 justify-center"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full sm:w-90 h-11 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <button
        type="submit"
        disabled
        className="h-11 rounded-lg bg-[#077784] px-5 text-sm font-semibold text-white opacity-60 cursor-not-allowed"
      >
        Subscribe
      </button>
    </form>
  );
}
