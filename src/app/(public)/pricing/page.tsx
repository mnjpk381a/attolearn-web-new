"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeInfo,
  Building2,
  Check,
  ChevronDown,
  FileText,
  MessageCircle,
  Percent,
  Search,
  Tag,
  Users,
} from "lucide-react";
import { useState } from "react";

const countries = [
  "Australia",
  "United States",
  "United Kingdom",
  "Canada",
  "New Zealand",
  "Singapore",
  "India",
  "Pakistan",
  "United Arab Emirates",
  "Saudi Arabia",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Hong Kong",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
  "Maldives",
  "Brunei",
  "Bahrain",
  "Kuwait",
  "Qatar",
  "Oman",
  "Jordan",
  "Lebanon",
  "Egypt",
  "Iraq",
  "Turkey",
  "Ireland",
  "Malta",
  "Cyprus",
  "Netherlands",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Ghana",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Zambia",
  "Zimbabwe",
  "Botswana",
  "Namibia",
  "Malawi",
  "Mauritius",
  "Seychelles",
  "The Gambia",
  "Sierra Leone",
  "Liberia",
  "Cameroon",
  "Jamaica",
  "Trinidad and Tobago",
  "Barbados",
  "The Bahamas",
  "Guyana",
  "Belize",
  "Fiji",
  "Papua New Guinea",
  "Solomon Islands",
  "Vanuatu",
  "Samoa",
  "Tonga"
] as const;
const countryFlags: Record<string, string> = {
  Australia: "/images/pricing/country-icons/australia-flag.png",
  "United States": "/images/pricing/country-icons/usa.png",
  "United Kingdom": "/images/pricing/country-icons/uk.png",
  "New Zealand": "/images/pricing/country-icons/new-zealand.png",
  Pakistan: "/images/pricing/country-icons/pakistan.png",
};
const pricingByCountry: Record<string, { familyMonthly: string; familyAnnual: string; fourthChild: string; tutorPlans: [string, string, string]; extraStudent: string }> = {
  "Australia": { familyMonthly: "AUD 13", familyAnnual: "AUD 125", fourthChild: "AUD 3", tutorPlans: ["AUD 39", "AUD 65", "AUD 117"], extraStudent: "AUD 3" },
  "United States": { familyMonthly: "USD 10", familyAnnual: "USD 96", fourthChild: "USD 3", tutorPlans: ["USD 30", "USD 50", "USD 90"], extraStudent: "USD 2" },
  "United Kingdom": { familyMonthly: "GBP 9", familyAnnual: "GBP 86", fourthChild: "GBP 2", tutorPlans: ["GBP 27", "GBP 45", "GBP 81"], extraStudent: "GBP 2" },
  "Canada": { familyMonthly: "CAD 10", familyAnnual: "CAD 96", fourthChild: "CAD 3", tutorPlans: ["CAD 30", "CAD 50", "CAD 90"], extraStudent: "CAD 2" },
  "New Zealand": { familyMonthly: "NZD 13", familyAnnual: "NZD 125", fourthChild: "NZD 3", tutorPlans: ["NZD 39", "NZD 65", "NZD 117"], extraStudent: "NZD 3" },
  "Singapore": { familyMonthly: "SGD 13", familyAnnual: "SGD 125", fourthChild: "SGD 3", tutorPlans: ["SGD 39", "SGD 65", "SGD 117"], extraStudent: "SGD 3" },
  "India": { familyMonthly: "INR 500", familyAnnual: "INR 4,800", fourthChild: "INR 125", tutorPlans: ["INR 1,500", "INR 2,500", "INR 4,500"], extraStudent: "INR 100" },
  "Pakistan": { familyMonthly: "PKR 300", familyAnnual: "PKR 2,900", fourthChild: "PKR 75", tutorPlans: ["PKR 900", "PKR 1,500", "PKR 2,700"], extraStudent: "PKR 60" },
  "United Arab Emirates": { familyMonthly: "AED 35", familyAnnual: "AED 340", fourthChild: "AED 9", tutorPlans: ["AED 105", "AED 175", "AED 315"], extraStudent: "AED 7" },
  "Saudi Arabia": { familyMonthly: "SAR 35", familyAnnual: "SAR 340", fourthChild: "SAR 9", tutorPlans: ["SAR 105", "SAR 175", "SAR 315"], extraStudent: "SAR 7" },
  "Malaysia": { familyMonthly: "MYR 29", familyAnnual: "MYR 279", fourthChild: "MYR 7", tutorPlans: ["MYR 87", "MYR 145", "MYR 261"], extraStudent: "MYR 6" },
  "Indonesia": { familyMonthly: "IDR 79,000", familyAnnual: "IDR 759,000", fourthChild: "IDR 19,750", tutorPlans: ["IDR 237,000", "IDR 395,000", "IDR 711,000"], extraStudent: "IDR 15,800" },
  "Philippines": { familyMonthly: "PHP 299", familyAnnual: "PHP 2,899", fourthChild: "PHP 75", tutorPlans: ["PHP 897", "PHP 1,495", "PHP 2,691"], extraStudent: "PHP 60" },
  "Hong Kong": { familyMonthly: "HKD 78", familyAnnual: "HKD 749", fourthChild: "HKD 20", tutorPlans: ["HKD 234", "HKD 390", "HKD 702"], extraStudent: "HKD 16" },
  "Bangladesh": { familyMonthly: "BDT 499", familyAnnual: "BDT 4,799", fourthChild: "BDT 125", tutorPlans: ["BDT 1,497", "BDT 2,495", "BDT 4,491"], extraStudent: "BDT 100" },
  "Sri Lanka": { familyMonthly: "LKR 1,490", familyAnnual: "LKR 14,300", fourthChild: "LKR 373", tutorPlans: ["LKR 4,470", "LKR 7,450", "LKR 13,410"], extraStudent: "LKR 298" },
  "Nepal": { familyMonthly: "NPR 699", familyAnnual: "NPR 6,700", fourthChild: "NPR 175", tutorPlans: ["NPR 2,097", "NPR 3,495", "NPR 6,291"], extraStudent: "NPR 140" },
  "Maldives": { familyMonthly: "MVR 99", familyAnnual: "MVR 950", fourthChild: "MVR 25", tutorPlans: ["MVR 297", "MVR 495", "MVR 891"], extraStudent: "MVR 20" },
  "Brunei": { familyMonthly: "BND 13", familyAnnual: "BND 125", fourthChild: "BND 3", tutorPlans: ["BND 39", "BND 65", "BND 117"], extraStudent: "BND 3" },
  "Bahrain": { familyMonthly: "BHD 3.5", familyAnnual: "BHD 34", fourthChild: "BHD 1", tutorPlans: ["BHD 11", "BHD 18", "BHD 32"], extraStudent: "BHD 1" },
  "Kuwait": { familyMonthly: "KWD 3", familyAnnual: "KWD 29", fourthChild: "KWD 1", tutorPlans: ["KWD 9", "KWD 15", "KWD 27"], extraStudent: "KWD 1" },
  "Qatar": { familyMonthly: "QAR 35", familyAnnual: "QAR 340", fourthChild: "QAR 9", tutorPlans: ["QAR 105", "QAR 175", "QAR 315"], extraStudent: "QAR 7" },
  "Oman": { familyMonthly: "OMR 3.5", familyAnnual: "OMR 34", fourthChild: "OMR 1", tutorPlans: ["OMR 11", "OMR 18", "OMR 32"], extraStudent: "OMR 1" },
  "Jordan": { familyMonthly: "JOD 7", familyAnnual: "JOD 67", fourthChild: "JOD 2", tutorPlans: ["JOD 21", "JOD 35", "JOD 63"], extraStudent: "JOD 1" },
  "Lebanon": { familyMonthly: "LBP 899,000", familyAnnual: "LBP 8,600,000", fourthChild: "LBP 224,750", tutorPlans: ["LBP 2,697,000", "LBP 4,495,000", "LBP 8,091,000"], extraStudent: "LBP 179,800" },
  "Egypt": { familyMonthly: "EGP 249", familyAnnual: "EGP 2,390", fourthChild: "EGP 62", tutorPlans: ["EGP 747", "EGP 1,245", "EGP 2,241"], extraStudent: "EGP 50" },
  "Iraq": { familyMonthly: "IQD 12,000", familyAnnual: "IQD 115,000", fourthChild: "IQD 3,000", tutorPlans: ["IQD 36,000", "IQD 60,000", "IQD 108,000"], extraStudent: "IQD 2,400" },
  "Turkey": { familyMonthly: "TRY 299", familyAnnual: "TRY 2,870", fourthChild: "TRY 75", tutorPlans: ["TRY 897", "TRY 1,495", "TRY 2,691"], extraStudent: "TRY 60" },
  "Ireland": { familyMonthly: "EUR 9", familyAnnual: "EUR 86", fourthChild: "EUR 2", tutorPlans: ["EUR 27", "EUR 45", "EUR 81"], extraStudent: "EUR 2" },
  "Malta": { familyMonthly: "EUR 9", familyAnnual: "EUR 86", fourthChild: "EUR 2", tutorPlans: ["EUR 27", "EUR 45", "EUR 81"], extraStudent: "EUR 2" },
  "Cyprus": { familyMonthly: "EUR 9", familyAnnual: "EUR 86", fourthChild: "EUR 2", tutorPlans: ["EUR 27", "EUR 45", "EUR 81"], extraStudent: "EUR 2" },
  "Netherlands": { familyMonthly: "EUR 9", familyAnnual: "EUR 86", fourthChild: "EUR 2", tutorPlans: ["EUR 27", "EUR 45", "EUR 81"], extraStudent: "EUR 2" },
  "South Africa": { familyMonthly: "ZAR 149", familyAnnual: "ZAR 1,430", fourthChild: "ZAR 37", tutorPlans: ["ZAR 447", "ZAR 745", "ZAR 1,341"], extraStudent: "ZAR 30" },
  "Nigeria": { familyMonthly: "NGN 7,500", familyAnnual: "NGN 72,000", fourthChild: "NGN 1,875", tutorPlans: ["NGN 22,500", "NGN 37,500", "NGN 67,500"], extraStudent: "NGN 1,500" },
  "Kenya": { familyMonthly: "KES 999", familyAnnual: "KES 9,590", fourthChild: "KES 250", tutorPlans: ["KES 2,997", "KES 4,995", "KES 8,991"], extraStudent: "KES 200" },
  "Ghana": { familyMonthly: "GHS 99", familyAnnual: "GHS 950", fourthChild: "GHS 25", tutorPlans: ["GHS 297", "GHS 495", "GHS 891"], extraStudent: "GHS 20" },
  "Uganda": { familyMonthly: "UGX 29,000", familyAnnual: "UGX 279,000", fourthChild: "UGX 7,250", tutorPlans: ["UGX 87,000", "UGX 145,000", "UGX 261,000"], extraStudent: "UGX 5,800" },
  "Tanzania": { familyMonthly: "TZS 19,900", familyAnnual: "TZS 191,000", fourthChild: "TZS 4,975", tutorPlans: ["TZS 59,700", "TZS 99,500", "TZS 179,100"], extraStudent: "TZS 3,980" },
  "Rwanda": { familyMonthly: "RWF 9,900", familyAnnual: "RWF 95,000", fourthChild: "RWF 2,475", tutorPlans: ["RWF 29,700", "RWF 49,500", "RWF 89,100"], extraStudent: "RWF 1,980" },
  "Zambia": { familyMonthly: "ZMW 149", familyAnnual: "ZMW 1,430", fourthChild: "ZMW 37", tutorPlans: ["ZMW 447", "ZMW 745", "ZMW 1,341"], extraStudent: "ZMW 30" },
  "Zimbabwe": { familyMonthly: "To confirm 9", familyAnnual: "To confirm 86", fourthChild: "To confirm 2", tutorPlans: ["To confirm 27", "To confirm 45", "To confirm 81"], extraStudent: "To confirm 2" },
  "Botswana": { familyMonthly: "BWP 99", familyAnnual: "BWP 950", fourthChild: "BWP 25", tutorPlans: ["BWP 297", "BWP 495", "BWP 891"], extraStudent: "BWP 20" },
  "Namibia": { familyMonthly: "NAD 149", familyAnnual: "NAD 1,430", fourthChild: "NAD 37", tutorPlans: ["NAD 447", "NAD 745", "NAD 1,341"], extraStudent: "NAD 30" },
  "Malawi": { familyMonthly: "MWK 7,900", familyAnnual: "MWK 75,900", fourthChild: "MWK 1,975", tutorPlans: ["MWK 23,700", "MWK 39,500", "MWK 71,100"], extraStudent: "MWK 1,580" },
  "Mauritius": { familyMonthly: "MUR 399", familyAnnual: "MUR 3,830", fourthChild: "MUR 100", tutorPlans: ["MUR 1,197", "MUR 1,995", "MUR 3,591"], extraStudent: "MUR 80" },
  "Seychelles": { familyMonthly: "SCR 129", familyAnnual: "SCR 1,240", fourthChild: "SCR 32", tutorPlans: ["SCR 387", "SCR 645", "SCR 1,161"], extraStudent: "SCR 26" },
  "The Gambia": { familyMonthly: "GMD 599", familyAnnual: "GMD 5,750", fourthChild: "GMD 150", tutorPlans: ["GMD 1,797", "GMD 2,995", "GMD 5,391"], extraStudent: "GMD 120" },
  "Sierra Leone": { familyMonthly: "SLE 149", familyAnnual: "SLE 1,430", fourthChild: "SLE 37", tutorPlans: ["SLE 447", "SLE 745", "SLE 1,341"], extraStudent: "SLE 30" },
  "Liberia": { familyMonthly: "USD 9", familyAnnual: "USD 86", fourthChild: "USD 2", tutorPlans: ["USD 27", "USD 45", "USD 81"], extraStudent: "USD 2" },
  "Cameroon": { familyMonthly: "XAF 4,900", familyAnnual: "XAF 47,000", fourthChild: "XAF 1,225", tutorPlans: ["XAF 14,700", "XAF 24,500", "XAF 44,100"], extraStudent: "XAF 980" },
  "Jamaica": { familyMonthly: "JMD 1,299", familyAnnual: "JMD 12,500", fourthChild: "JMD 325", tutorPlans: ["JMD 3,897", "JMD 6,495", "JMD 11,691"], extraStudent: "JMD 260" },
  "Trinidad and Tobago": { familyMonthly: "TTD 65", familyAnnual: "TTD 625", fourthChild: "TTD 16", tutorPlans: ["TTD 195", "TTD 325", "TTD 585"], extraStudent: "TTD 13" },
  "Barbados": { familyMonthly: "BBD 20", familyAnnual: "BBD 192", fourthChild: "BBD 5", tutorPlans: ["BBD 60", "BBD 100", "BBD 180"], extraStudent: "BBD 4" },
  "The Bahamas": { familyMonthly: "BSD 10", familyAnnual: "BSD 96", fourthChild: "BSD 3", tutorPlans: ["BSD 30", "BSD 50", "BSD 90"], extraStudent: "BSD 2" },
  "Guyana": { familyMonthly: "GYD 1,999", familyAnnual: "GYD 19,200", fourthChild: "GYD 500", tutorPlans: ["GYD 5,997", "GYD 9,995", "GYD 17,991"], extraStudent: "GYD 400" },
  "Belize": { familyMonthly: "BZD 20", familyAnnual: "BZD 192", fourthChild: "BZD 5", tutorPlans: ["BZD 60", "BZD 100", "BZD 180"], extraStudent: "BZD 4" },
  "Fiji": { familyMonthly: "FJD 20", familyAnnual: "FJD 192", fourthChild: "FJD 5", tutorPlans: ["FJD 60", "FJD 100", "FJD 180"], extraStudent: "FJD 4" },
  "Papua New Guinea": { familyMonthly: "PGK 35", familyAnnual: "PGK 336", fourthChild: "PGK 9", tutorPlans: ["PGK 105", "PGK 175", "PGK 315"], extraStudent: "PGK 7" },
  "Solomon Islands": { familyMonthly: "SBD 75", familyAnnual: "SBD 720", fourthChild: "SBD 19", tutorPlans: ["SBD 225", "SBD 375", "SBD 675"], extraStudent: "SBD 15" },
  "Vanuatu": { familyMonthly: "VUV 999", familyAnnual: "VUV 9,590", fourthChild: "VUV 250", tutorPlans: ["VUV 2,997", "VUV 4,995", "VUV 8,991"], extraStudent: "VUV 200" },
  "Samoa": { familyMonthly: "WST 25", familyAnnual: "WST 240", fourthChild: "WST 6", tutorPlans: ["WST 75", "WST 125", "WST 225"], extraStudent: "WST 5" },
  "Tonga": { familyMonthly: "TOP 22", familyAnnual: "TOP 211", fourthChild: "TOP 6", tutorPlans: ["TOP 66", "TOP 110", "TOP 198"], extraStudent: "TOP 4" },
};
const audiences = [
  { label: "Families", icon: Users },
  { label: "Tutor / Tuition Centre", icon: Building2 },
] as const;
const schoolCards = [
  {
    title: "Modules",
    copy: "School Management, Paper Generator, Adaptive Learning — or a combination.",
    image: "/images/pricing/school-icons/modules.png",
  },
  {
    title: "School size",
    copy: "Students, staff and campuses covered.",
    image: "/images/pricing/school-icons/school-size.png",
  },
  {
    title: "Custom quote",
    copy: "Agreed in writing, with a pilot-first approach where it fits.",
    image: "/images/pricing/school-icons/custom-quote.png",
  },
  {
    title: "Paper Generator",
    copy: "Create curriculum-aligned assessment papers for your learners.",
    image: "/images/pricing/school-icons/paper-generator.png",
    action: true,
  },
] as const;
const smallPrint = [
  {
    title: "Prices are local",
    copy: "Each market is priced in its own currency, not converted from US dollars.",
    image: "/images/pricing/small-print-icons/prices-local.png",
  },
  {
    title: "Cancel any time",
    copy: "Monthly plans stop at the end of the period you’ve paid for.",
    image: "/images/pricing/small-print-icons/cancel-any-time.png",
  },
  {
    title: "Your records stay yours",
    copy: "Learning evidence belongs to the family, including if a school or tutor relationship ends.",
    image: "/images/pricing/small-print-icons/records-stay-yours.png",
  },
  {
    title: "One invited tutor is free",
    copy: "A tutor a parent invites is included — the tutor is never billed for that family.",
    image: "/images/pricing/small-print-icons/invited-tutor-free.png",
  },
] as const;

export default function PricingPage() {
  const [country, setCountry] =
    useState<(typeof countries)[number]>("Australia");
  const [audience, setAudience] = useState("Families");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const filteredCountries = countries.filter((item) =>
    item.toLowerCase().includes(countrySearch.toLowerCase()),
  );
  const pricing = pricingByCountry[country];
  return (
    <main className="overflow-hidden bg-[#fffefb] text-[#092f3d]">
      <section className="pricing-hero relative flex min-h-0 items-center overflow-hidden bg-[#f8fdff] px-4 py-7 text-center sm:min-h-130 sm:py-10 lg:h-110 lg:min-h-0 lg:py-6">
        <Image
          src="/images/pricing/pricing-hero-background-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-fill object-center lg:block"
        />
        <div className="site-container relative mx-auto">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#8bd8db] bg-[#eafafa]/90 px-5 py-2 text-xs font-bold tracking-[.12em] text-[#087d86]">
            <Tag className="h-4 w-4" /> PRICING
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl font-extrabold leading-[1.03] text-[#063b57] sm:mt-5">
            Priced by how you use
            <br />
            <span className="text-[42px] font-extrabold text-[#07939b] sm:text-[56px]">
              Atto
            </span>
            <span className="text-[42px] font-extrabold text-[#ffad0b] sm:text-[56px]">
              Learn
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-5 text-[#34445c] sm:mt-4 sm:text-base sm:leading-6">
            Families pay a household price, not a price per child. Tutors pay
            for the students they manage. Centres and schools are quoted.
            Nothing is blended into a single confusing list.
          </p>
          <div className="mt-4 flex flex-col justify-center gap-3 sm:mt-5 sm:flex-row sm:gap-4">
            <Link
              href="#"
              className="inline-flex h-12 min-w-56 items-center justify-center gap-5 rounded-lg bg-linear-to-r from-[#ff9800] to-[#ffb20b] px-8 font-bold text-white shadow-lg shadow-amber-200/50 sm:h-14"
            >
              Start Free <ArrowRight className="h-5 w-5" />
            </Link>
            {audience !== "Families" && (
              <Link
                href="#"
                className="inline-flex h-12 min-w-56 items-center justify-center gap-5 rounded-lg border-2 border-[#07949a] bg-white/95 px-8 font-bold text-[#087e82] sm:h-14"
              >
                Talk to Sales <MessageCircle className="h-5 w-5" />
              </Link>
            )}
          </div>
          <div className="relative -mx-3 mt-4 aspect-4/3 overflow-hidden sm:-mx-4 lg:hidden">
            <Image
              src="/images/pricing/pricing-hero-mobile-v1.png"
              alt="AttoLearn owl and pricing options"
              fill
              priority
              sizes="100vw"
              className="object-fill object-center"
            />
          </div>
        </div>
      </section>
      <section className="site-container relative z-10 mt-0 text-center lg:-mt-9">
        <h2 className="inline-flex items-center gap-4 text-lg font-bold before:h-px before:w-14 before:bg-[#22b9ae] after:h-px after:w-14 after:bg-[#22b9ae]">
          Your country
        </h2>
        <div className="relative mx-auto mt-3 max-w-md text-left">
          <button
            type="button"
            onClick={() => setCountryOpen((open) => !open)}
            className="flex h-14 w-full items-center justify-between rounded-lg bg-white px-4 text-sm font-semibold text-[#233443] shadow-[0_10px_32px_rgba(20,65,68,.13)]"
          >
            <span className="flex items-center gap-3">
              <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
                <Image src={countryFlags[country] || countryFlags["Australia"]} alt="" fill sizes="28px" className="object-cover" />
              </span>
              {country}
            </span>
            <ChevronDown className="h-5 w-5 text-[#087d86]" />
          </button>
          {countryOpen && (
            <div className="absolute z-30 mt-2 w-full rounded-lg border border-[#d5e7e8] bg-white p-2 shadow-xl">
              <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  autoFocus
                  value={countrySearch}
                  onChange={(event) => setCountrySearch(event.target.value)}
                  placeholder="Search country"
                  className="h-10 w-full bg-transparent text-sm outline-none"
                />
              </div>
              <div className="mt-1 max-h-56 overflow-y-auto">
                {filteredCountries.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setCountry(c); setCountryOpen(false); setCountrySearch(""); }}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm ${country === c ? "bg-[#076d76] text-white" : "text-[#233443] hover:bg-teal-50"}`}
                  >
                    <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full">
                      <Image src={countryFlags[c] || countryFlags["Australia"]} alt="" fill sizes="24px" className="object-cover" />
                    </span>
                    {c}
                  </button>
                ))}
                {filteredCountries.length === 0 && <p className="px-3 py-3 text-sm text-slate-500">No country found.</p>}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="site-container">
        <div className="mx-auto grid max-w-2xl overflow-hidden rounded-xl border border-[#0b7f87] sm:grid-cols-2">
          {audiences.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setAudience(label)}
              className={`flex h-14 items-center justify-center gap-4 border-[#0b7f87] font-bold sm:border-r last:border-r-0 ${audience === label ? "bg-[#056d77] text-white" : "bg-white text-[#075966]"} disabled:cursor-not-allowed`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
        <div className="mx-auto mt-8 flex w-fit rounded-full border border-[#0b7f87] bg-white p-1 text-sm font-bold">
          <button type="button" onClick={() => setBillingCycle("monthly")} className={`rounded-full px-5 py-2 ${billingCycle === "monthly" ? "bg-[#056d77] text-white" : "text-[#075966]"}`}>Monthly</button>
          <button type="button" onClick={() => setBillingCycle("annual")} className={`rounded-full px-5 py-2 ${billingCycle === "annual" ? "bg-[#056d77] text-white" : "text-[#075966]"}`}>Yearly</button>
        </div>        {audience === "Families" ? (
          <div className="mt-9">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#075966] sm:text-4xl">
                One plan for the household
              </h2>
              <p className="mt-3 text-base text-slate-600 sm:text-lg">
                Up to three children included. A fourth child costs{" "}
                {pricing.fourthChild} per month, not four times as much.
              </p>
            </div>

            <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
              <article className="flex min-h-105 flex-col rounded-xl border border-[#cbdde0] bg-white p-7 text-left shadow-[0_8px_24px_rgba(20,65,68,.06)]">
                <h3 className="text-2xl font-extrabold text-[#075966]">
                  Free Starter
                </h3>
                <p className="mt-1 text-4xl font-extrabold text-[#075966]">
                  Free
                </p>
                <p className="text-base text-slate-700">No card required</p>
                <ul className="mt-6 space-y-4">
                  {[
                    "Try adaptive learning with your child",
                    "See how the parent view works",
                    "Limited practice volume",
                    "Upgrade whenever you’re ready",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-base text-slate-700"
                    >
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#0b9698] text-white">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-slate-200 pt-5 text-sm text-slate-600">
                  No card required. Explore the parent experience before you
                  upgrade.
                </p>
              </article>

              <article className="relative flex min-h-105 flex-col rounded-xl border-2 border-[#f5a000] bg-[#fffdf7] p-7 text-left shadow-[0_8px_24px_rgba(245,160,0,.08)]">
                <span className="absolute -top-4 left-7 rounded-full bg-[#f5a000] px-5 py-1.5 text-sm font-bold text-white">
                  Most popular
                </span>
                <h3 className="text-2xl font-extrabold text-[#075966]">
                  AttoLearn Family
                </h3>
                <p className="mt-1 flex items-end gap-2 text-[#075966]">
                  <span className="text-5xl font-extrabold">
                    {billingCycle === "monthly" ? pricing.familyMonthly : pricing.familyAnnual}
                  </span>
                  <span className="pb-1 text-base">per month</span>
                </p>
                <p className="text-base text-slate-700">
                  or {pricing.familyAnnual} a year — roughly two months free
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Up to 3 children included",
                    "All available subjects for your curriculum",
                    "Full adaptive learning and Today’s Best Step",
                    "Parent dashboard and progress reports",
                    "1 tutor included — a tutor you invite costs nothing",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-4 text-base text-slate-700"
                    >
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#f5a000] text-white">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-slate-200 pt-5 text-sm text-slate-600">
                  Up to 3 children included. Add another child whenever your
                  household needs it.
                </p>
              </article>
            </div>

            <div className="mx-auto mt-6 grid max-w-4xl gap-4">
              <div className="flex flex-col gap-5 rounded-xl border border-[#aadbdc] bg-[#f0fbfb] p-6 text-left sm:flex-row sm:items-center">
                <span className="grid size-20 shrink-0 place-items-center rounded-full bg-white text-3xl shadow-sm">
                  👨‍👩‍👧
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#075966]">
                    One plan, one household
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Children share one family account while keeping their own
                    learning path, evidence and progress.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 rounded-xl border border-[#f4cf87] bg-[#fffaf0] p-6 text-left sm:flex-row sm:items-center">
                <span className="grid size-20 shrink-0 place-items-center rounded-full bg-white text-3xl shadow-sm">
                  🌏
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#075966]">
                    Local pricing for your country
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    The displayed family price follows the country selected
                    above and is shown in its local currency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : audience !== "Families" ? (
          <div className="mt-9">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#075966] sm:text-4xl">
                Priced by the students you manage
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-base text-slate-600">
                The same plans whether you tutor alone or run a centre. If a
                parent invites you to support their child, you pay nothing — you
                pay when you bring your own students.
              </p>
            </div>

            <div className="mt-7 flex flex-col items-center gap-5 rounded-xl border border-[#c5e7e8] bg-[#eefafa] p-6 text-left md:flex-row">
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#d8f4f2] text-[#087f84]">
                <Building2 className="size-9" />
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#075966]">
                  Invited by a parent? There&apos;s no charge
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A tutor a family invites is included in that family&apos;s
                  plan. You get scoped access to their child, and no bill. A
                  paid plan is for running your own practice or centre.
                </p>
              </div>
              <Link
                href="/tutors"
                className="inline-flex h-12 shrink-0 items-center rounded-lg bg-[#067b82] px-7 font-bold text-white"
              >
                How tutor access works
              </Link>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {[
                [
                  "Tutor Starter",
                  pricing.tutorPlans[0],
                  "10 active students",
                  [
                    "Create learner profiles",
                    "Assign practice and revision",
                    "Basic diagnostic dashboard",
                    "Basic reports",
                  ],
                ],
                [
                  "Tutor Growth",
                  pricing.tutorPlans[1],
                  "25 active students",
                  [
                    "Everything in Starter",
                    "Full diagnostic dashboard",
                    "Standard reports",
                    "Room to grow without changing plan",
                  ],
                ],
                [
                  "Tutor Pro",
                  pricing.tutorPlans[2],
                  "50 active students",
                  [
                    "Everything in Growth",
                    "Advanced reports",
                    "Priority support",
                    "Highest published tier capacity",
                  ],
                ],
              ].map(([title, price, capacity, features], index) => (
                <article
                  key={title as string}
                  className={`relative flex min-h-92 flex-col rounded-xl bg-white p-7 text-left shadow-[0_8px_24px_rgba(20,65,68,.06)] ${index === 1 ? "border-2 border-[#f5a000] bg-[#fffdf7]" : "border border-[#cbdde0]"}`}
                >
                  {index === 1 && (
                    <span className="absolute -top-4 left-5 rounded-full bg-[#f5a000] px-5 py-1.5 text-sm font-bold text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-extrabold text-[#075966]">
                    {title as string}
                  </h3>
                  <p className="mt-1 flex items-end gap-1 text-[#075966]">
                    <span className="text-4xl font-extrabold">
                      {price as string}
                    </span>
                    <span className="pb-1 text-sm font-bold">/mo</span>
                  </p>
                  <p className="text-sm text-slate-600">{capacity as string}</p>
                  <ul className="mt-5 space-y-3">
                    {(features as string[]).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#0b9698] text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-slate-200 pt-5 text-sm text-slate-600">
                    {index === 0
                      ? "Best for a tutor starting out, or a small centre."
                      : index === 1
                        ? "Best for an established tutor or a growing centre."
                        : "Best for a high-volume tutor or an established centre."}
                  </p>
                </article>
              ))}
            </div>

            <div className="mx-auto mt-7 max-w-4xl text-center">
              <h3 className="text-2xl font-extrabold text-[#075966]">
                Growing past your plan
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Add students between tiers, or move up. You are never forced to
                jump a whole tier for one extra learner.
              </p>
              <div className="mt-5 overflow-hidden rounded-xl border border-[#bcdde0] text-left">
                <div className="grid grid-cols-[0.8fr_2fr] bg-[#eaf8f8] px-5 py-3 text-xs font-extrabold uppercase text-[#075966]">
                  <span>Active students</span>
                  <span>What you pay</span>
                </div>
                {[
                  ["1–10", "Tutor Starter"],
                  ["11–15", "Starter plus extra-student add-ons"],
                  ["16–25", "Tutor Growth"],
                  ["26–35", "Growth plus extra-student add-ons"],
                  ["36–50", "Tutor Pro"],
                  [
                    "More than 50",
                    "Continue with add-ons, or talk to us about a larger arrangement",
                  ],
                ].map(([range, payment]) => (
                  <div
                    key={range}
                    className="grid grid-cols-[0.8fr_2fr] border-t border-[#d6e5e7] px-5 py-3 text-sm text-slate-700"
                  >
                    <span>{range}</span>
                    <span>{payment}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Extra students: {pricing.extraStudent} each per month. Annual
                billing is available at approximately ten months&apos; price for
                twelve months&apos; access.
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-5 rounded-xl border border-[#f4cf87] bg-[#fffaf0] p-6 text-left sm:flex-row sm:items-center">
              <span className="grid size-18 shrink-0 place-items-center rounded-full bg-[#fff1c9] text-[#e28a00]">
                <BadgeInfo className="size-9" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#075966]">
                  What counts as an active student
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  A learner with an active goal, assignment, learning session,
                  reportable activity or tutor-managed record during the current
                  billing period. Dormant learners on your roster do not count
                  against your plan.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-extrabold text-[#075966]">
                Running a tuition centre
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Centres use these same plans. What you get in addition is the
                workspace built for a team.
              </p>
              <div className="mt-5 grid gap-4 text-left md:grid-cols-3">
                {[
                  [
                    "Several tutors, one workspace",
                    "Staff, accounts, learner allocation and role-based access.",
                  ],
                  [
                    "The centre keeps the evidence",
                    "When a tutor leaves, the learning history stays with the centre.",
                  ],
                  [
                    "Shared assessment",
                    "Every tutor building papers the same way from the same bank.",
                  ],
                ].map(([title, copy]) => (
                  <article
                    key={title}
                    className="rounded-xl border border-[#cbdde0] bg-white p-6"
                  >
                    <Users className="size-7 text-[#078b90]" />
                    <h4 className="mt-4 font-bold text-[#075966]">{title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {copy}
                    </p>
                  </article>
                ))}
              </div>
              <div className="mt-5 flex flex-col items-center gap-5 rounded-xl border border-[#f4cf87] bg-[#fffaf0] p-6 text-left md:flex-row">
                <Building2 className="size-12 shrink-0 text-[#e28a00]" />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#075966]">
                    Two things a centre should confirm with us first
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Whether a plan covers the workspace for each centre account,
                    and what applies beyond 50 active students.
                  </p>
                </div>
                <Link
                  href="/tuition-centres"
                  className="inline-flex h-12 shrink-0 items-center rounded-lg bg-[#078b90] px-7 font-bold text-white"
                >
                  For Tuition Centres
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {" "}
            <div className="mt-7 text-center">
              <h2 className="text-3xl font-extrabold text-[#073a49]">
                {audience !== "Families"
                  ? "Schools are quoted by modules and size"
                  : audience === "Families"
                    ? "Simple family-first pricing"
                    : "Flexible pricing for managed learners"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {audience !== "Families"
                  ? "School pricing is kept entirely separate from family pricing. A school licence is not a bundle of family plans."
                  : "Choose the setup that fits how you support learning."}
              </p>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {schoolCards.map((card) => (
                <article
                  key={card.title}
                  className="flex min-h-72 flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-6 text-center shadow-[0_10px_28px_rgba(34,61,65,.08)]"
                >
                  <span className="relative h-24 w-24">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#075966]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {card.copy}
                  </p>
                  {"action" in card && card.action && (
                    <Link
                      href="/papergenerator"
                      className="mt-auto inline-flex items-center gap-2 rounded-md border border-[#07808a] px-3 py-2 text-xs font-bold text-[#076d76]"
                    >
                      <FileText className="h-4 w-4" />
                      Explore Paper Generator
                    </Link>
                  )}
                </article>
              ))}
            </div>
            <div className="mt-5 flex flex-col items-center gap-6 rounded-xl border border-[#aadbdc] bg-[#f0fbfb] p-6 md:flex-row">
              <span className="relative h-28 w-36 shrink-0">
                <Image
                  src="/images/pricing/school-icons/school-size.png"
                  alt=""
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#075966]">
                  Family and school pricing never mix
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Where a school covers adaptive learning for its families,
                  families are told plainly that access is school-covered. If
                  that school access ends, families keep the learning history
                  and can continue independently on a Family Plan.
                </p>
                <p className="mt-2 text-xs font-bold text-[#075966]">
                  School licence rates require commercial approval before any
                  figure is quoted.
                </p>
              </div>
              <Link
                href="/schools"
                className="inline-flex h-12 items-center gap-3 rounded-lg bg-[#056d77] px-6 font-bold text-white"
              >
                <Building2 className="h-5 w-5" />
                For Schools
              </Link>
            </div>
            <div className="mt-5 text-center">
              <Link
                href="/contact"
                className="inline-flex h-14 items-center gap-5 rounded-lg bg-linear-to-r from-[#ff8a00] to-[#ffad0b] px-9 font-bold text-white shadow-lg"
              >
                Book a School Demo <ArrowRight className="h-5 w-5" />
              </Link>
            </div>{" "}
          </>
        )}{" "}
      </section>

      <section className="site-container">
        <div className="flex flex-col items-center gap-7 bg-[#fffaf4] p-7 md:flex-row">
          <span className="relative h-32 w-32 shrink-0">
            <Image
              src="/images/pricing/small-print-icons/published-market.png"
              alt=""
              fill
              sizes="128px"
              className="object-cover"
            />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold">
              One published rate, one market
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              PKR 5,000 per year is the standalone Paper Generator rate
              currently published for Pakistan.
              <br />
              Rates for Australia, the USA and the UK have not been set, and the
              school access plans are not reflected here yet.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#f06d00]">
              <BadgeInfo className="h-5 w-5" />
              Non-Pakistan standalone rates and the three school access tiers
              still to be confirmed
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffefb] px-4 pb-12">
        <div className="site-container text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.08em] text-[#08777b]">
            The small print, said plainly
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">
            Things worth knowing before you pay
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-teal-300" />
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            <span className="h-px w-12 bg-teal-300" />
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {smallPrint.map((item) => (
              <article
                key={item.title}
                className="min-h-72 rounded-xl border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_28px_rgba(34,61,65,.07)]"
              >
                <span className="relative mx-auto block h-24 w-24">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#075966]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-5 grid items-center gap-5 rounded-xl border border-[#a9dddd] bg-[#f0fbfb] p-6 text-left md:grid-cols-[80px_1fr_1px_1fr]">
            <span className="grid h-18 w-18 place-items-center rounded-full bg-[#36c5b9] text-white shadow-lg">
              <Percent className="h-11 w-11" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#075966]">On tax</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Whether the figures shown include GST or VAT determines the
                final amount you pay, and consumer price display rules differ by
                market.
              </p>
            </div>
            <span className="hidden h-24 w-px bg-[#a9dddd] md:block" />
            <p className="flex items-center gap-4 text-sm leading-6 text-slate-700">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#07939a] font-bold text-white">
                i
              </span>
              Tax-inclusive vs tax-exclusive display to be confirmed per market
              before these prices go live
            </p>
          </div>
        </div>
      </section>

      <section className="pricing-final-cta w-full">
        <div className="relative flex min-h-72 items-center justify-center overflow-hidden px-4 py-8 text-center sm:min-h-68 sm:px-6 lg:min-h-64 lg:py-6">
          <Image
            src="/images/pricing/cta/start-free-wide-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-fill object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-white/20 sm:bg-white/10" />
          <div className="relative z-10 mx-auto w-full max-w-3xl">
            <h2 className="text-3xl font-extrabold text-[#07616a] sm:text-4xl">
              Start free, decide later
            </h2>
            <p className="mt-3 text-sm text-[#07616a] sm:text-base">
              No card to try it. Move to a paid plan when it’s earning its
              place.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#"
                className="inline-flex h-13 min-w-52 items-center justify-center gap-4 rounded-lg bg-linear-to-r from-[#ff8a00] to-[#ffad0b] px-7 font-bold text-white"
              >
                Start Free <ArrowRight className="h-5 w-5" />
              </Link>
              {audience !== "Families" && (
                <Link
                  href="/contact"
                  className="inline-flex h-13 min-w-52 items-center justify-center gap-4 rounded-lg border border-[#07808a] bg-white px-7 font-bold text-[#076d76]"
                >
                  Talk to Sales <MessageCircle className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}















