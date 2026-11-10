"use client";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { getCountryPricing, pricingCountries } from "@/lib/pricing";

function Flag({ code, className }: { code: string; className: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-sm ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
        alt=""
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export default function CountrySelector({
  value,
  onChange,
}: {
  /** ISO 3166-1 alpha-2 code of the selected country */
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = getCountryPricing(value);
  const filtered = pricingCountries.filter((country) =>
    country.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="relative mx-auto mt-3 max-w-md text-left">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-14 w-full items-center justify-between rounded-lg bg-white px-4 text-sm font-semibold text-[#233443] shadow-[0_10px_32px_rgba(20,65,68,.13)]"
      >
        <span className="flex items-center gap-3">
          <Flag code={selected.code} className="h-6 w-8" />
          {selected.name}
        </span>
        <ChevronDown className="h-5 w-5 text-[#087d86]" />
      </button>
      {open && (
        <div className="absolute z-30 mt-2 w-full rounded-lg border border-[#d5e7e8] bg-white p-2 shadow-xl">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              autoFocus
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search country"
              aria-label="Search country"
              className="h-10 w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div role="listbox" className="mt-1 max-h-56 overflow-y-auto">
            {filtered.map((country) => (
              <button
                key={country.code}
                type="button"
                role="option"
                aria-selected={country.code === selected.code}
                onClick={() => {
                  onChange(country.code);
                  setOpen(false);
                  setSearch("");
                }}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm ${country.code === selected.code ? "bg-[#076d76] text-white" : "text-[#233443] hover:bg-teal-50"}`}
              >
                <Flag code={country.code} className="h-5 w-7" />
                {country.name}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-3 text-sm text-slate-500">
                No country found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
