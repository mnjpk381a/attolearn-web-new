import data from "@/data/pricing.json";

// Approved pricing for the public pricing page (AA-6005).
// src/data/pricing.json is generated from the approved workbook by
// scripts/import-pricing.mjs — change prices there, not here.

export type CountryPricing = {
  /** ISO 3166-1 alpha-2 */
  code: string;
  name: string;
  currency: string;
  familyStatus: string;
  family: { monthly: number; annual: number };
  tutor: { lite: number; starter: number; growth: number; pro: number };
  centre: { starter: number; growth: number; pro: number };
};

export const pricingCountries: CountryPricing[] = data.countries;

/** Shown when the visitor's country is unknown or not one of the priced markets. */
export const DEFAULT_COUNTRY_CODE = "AU";

const byCode = new Map(
  pricingCountries.map((country) => [country.code, country]),
);

export function isPricedCountry(
  code: string | null | undefined,
): code is string {
  return !!code && byCode.has(code.toUpperCase());
}

export function getCountryPricing(code: string): CountryPricing {
  return byCode.get(code.toUpperCase()) ?? byCode.get(DEFAULT_COUNTRY_CODE)!;
}

// Monthly price for a fourth child on the Family plan. Existing family pricing,
// carried over unchanged; the workbook has no column for it.
const fourthChildMonthly: Record<string, number> = {
  AU: 3,
  US: 3,
  GB: 2,
  CA: 3,
  NZ: 3,
  SG: 3,
  IN: 125,
  PK: 75,
  AE: 9,
  SA: 9,
  MY: 7,
  ID: 19750,
  PH: 75,
  HK: 20,
  BD: 125,
  LK: 373,
  NP: 175,
  MV: 25,
  BN: 3,
  BH: 1,
  KW: 1,
  QA: 9,
  OM: 1,
  JO: 2,
  LB: 224750,
  EG: 62,
  IQ: 3000,
  TR: 75,
  IE: 2,
  MT: 2,
  CY: 2,
  NL: 2,
  ZA: 37,
  NG: 1875,
  KE: 250,
  GH: 25,
  UG: 7250,
  TZ: 4975,
  RW: 2475,
  ZM: 37,
  ZW: 2,
  BW: 25,
  NA: 37,
  MW: 1975,
  MU: 100,
  SC: 32,
  GM: 150,
  SL: 37,
  LR: 2,
  CM: 1225,
  JM: 325,
  TT: 16,
  BB: 5,
  BS: 3,
  GY: 500,
  BZ: 5,
  FJ: 5,
  PG: 9,
  SB: 19,
  VU: 250,
  WS: 6,
  TO: 6,
};

export function getFourthChildPrice(code: string): number {
  return (
    fourthChildMonthly[code.toUpperCase()] ??
    fourthChildMonthly[DEFAULT_COUNTRY_CODE]
  );
}

const numberFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

/** "AUD 19", "IDR 120,000", "KWD 4.5" — currency code first, as the page has always shown. */
export function formatPrice(currency: string, amount: number): string {
  return `${currency} ${numberFormat.format(amount)}`;
}

export const PRICING_COUNTRY_STORAGE_KEY = "attolearn.pricing.country";
