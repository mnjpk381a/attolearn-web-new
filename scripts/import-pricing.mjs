#!/usr/bin/env node
// Regenerates src/data/pricing.json from the approved pricing workbook (AA-6005).
//
//   npm run pricing:import -- docs/pricing/AttoLearn_62_Country_Approved_Tutor_Centre_Pricing_10Nov2026.xlsx
//
// No dependencies: an .xlsx is a zip of XML files, read here with node:zlib.
// The import fails loudly rather than writing a partial or inconsistent file.
import { readFileSync, writeFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REVIEW_TAB = "Tutor & Centre Pricing Review";
const LAUNCH_TAB = "Country Launch & Pricing";
const EXPECTED_COUNTRIES = 62;

// Workbook country name -> ISO 3166-1 alpha-2. A new country must be added here.
const ISO = {
  Australia: "AU",
  "United States": "US",
  "United Kingdom": "GB",
  Canada: "CA",
  "New Zealand": "NZ",
  Singapore: "SG",
  India: "IN",
  Pakistan: "PK",
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  Malaysia: "MY",
  Indonesia: "ID",
  Philippines: "PH",
  "Hong Kong": "HK",
  Bangladesh: "BD",
  "Sri Lanka": "LK",
  Nepal: "NP",
  Maldives: "MV",
  Brunei: "BN",
  Bahrain: "BH",
  Kuwait: "KW",
  Qatar: "QA",
  Oman: "OM",
  Jordan: "JO",
  Lebanon: "LB",
  Egypt: "EG",
  Iraq: "IQ",
  Turkey: "TR",
  Ireland: "IE",
  Malta: "MT",
  Cyprus: "CY",
  Netherlands: "NL",
  "South Africa": "ZA",
  Nigeria: "NG",
  Kenya: "KE",
  Ghana: "GH",
  Uganda: "UG",
  Tanzania: "TZ",
  Rwanda: "RW",
  Zambia: "ZM",
  Zimbabwe: "ZW",
  Botswana: "BW",
  Namibia: "NA",
  Malawi: "MW",
  Mauritius: "MU",
  Seychelles: "SC",
  "The Gambia": "GM",
  "Sierra Leone": "SL",
  Liberia: "LR",
  Cameroon: "CM",
  Jamaica: "JM",
  "Trinidad and Tobago": "TT",
  Barbados: "BB",
  "The Bahamas": "BS",
  Guyana: "GY",
  Belize: "BZ",
  Fiji: "FJ",
  "Papua New Guinea": "PG",
  "Solomon Islands": "SB",
  Vanuatu: "VU",
  Samoa: "WS",
  Tonga: "TO",
};

// Display currency where the workbook has none. Zimbabwe is "To confirm" in the
// sheet; the Product Owner decided on 10 Nov 2026 to show it in USD.
const CURRENCY_OVERRIDES = { ZW: "USD" };

function fail(message) {
  console.error(`pricing import failed: ${message}`);
  process.exit(1);
}

function unzip(buffer) {
  let eocd = buffer.length - 22;
  while (eocd >= 0 && buffer.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) fail("not a valid .xlsx (zip) file");
  const count = buffer.readUInt16LE(eocd + 10);
  let pos = buffer.readUInt32LE(eocd + 16);
  const files = new Map();
  for (let i = 0; i < count; i++) {
    const method = buffer.readUInt16LE(pos + 10);
    const size = buffer.readUInt32LE(pos + 20);
    const nameLength = buffer.readUInt16LE(pos + 28);
    const extraLength = buffer.readUInt16LE(pos + 30);
    const commentLength = buffer.readUInt16LE(pos + 32);
    const local = buffer.readUInt32LE(pos + 42);
    const name = buffer.toString("utf8", pos + 46, pos + 46 + nameLength);
    const start =
      local +
      30 +
      buffer.readUInt16LE(local + 26) +
      buffer.readUInt16LE(local + 28);
    const data = buffer.subarray(start, start + size);
    files.set(name, method === 0 ? data : inflateRawSync(data));
    pos += 46 + nameLength + extraLength + commentLength;
  }
  return (name) => files.get(name)?.toString("utf8") ?? null;
}

const decode = (text) =>
  text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) =>
      String.fromCodePoint(parseInt(n, 16)),
    )
    .replace(/&amp;/g, "&");

const inlineText = (xml) =>
  [...xml.matchAll(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>/g)]
    .map((m) => decode(m[1]))
    .join("");

function readWorkbook(path) {
  const read = unzip(readFileSync(path));
  const workbook = read("xl/workbook.xml");
  const rels = read("xl/_rels/workbook.xml.rels");
  if (!workbook || !rels) fail("workbook.xml is missing");
  const targets = new Map();
  for (const m of rels.matchAll(/<Relationship\b[^>]*>/g)) {
    const id = /\bId="([^"]+)"/.exec(m[0])?.[1];
    const target = /\bTarget="([^"]+)"/.exec(m[0])?.[1];
    if (id && target) targets.set(id, target);
  }
  const shared = [];
  const sharedXml = read("xl/sharedStrings.xml");
  if (sharedXml)
    for (const m of sharedXml.matchAll(/<si>([\s\S]*?)<\/si>/g))
      shared.push(inlineText(m[1]));

  const sheets = new Map();
  for (const m of workbook.matchAll(/<sheet\b[^>]*>/g)) {
    const name = decode(/\bname="([^"]+)"/.exec(m[0])?.[1] ?? "");
    const target = targets.get(/\br:id="([^"]+)"/.exec(m[0])?.[1]);
    if (!target) continue;
    const xml = read(target.startsWith("/") ? target.slice(1) : `xl/${target}`);
    const rows = new Map();
    for (const c of xml.matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const ref = /\br="([A-Z]+)(\d+)"/.exec(c[1]);
      if (!ref) continue;
      const type = /\bt="([^"]+)"/.exec(c[1])?.[1];
      const body = c[2] ?? "";
      const raw = /<v>([\s\S]*?)<\/v>/.exec(body)?.[1];
      let value = "";
      if (type === "s") value = shared[Number(raw)] ?? "";
      else if (type === "inlineStr") value = inlineText(body);
      else if (raw !== undefined) value = decode(raw);
      const row = Number(ref[2]);
      if (!rows.has(row)) rows.set(row, {});
      rows.get(row)[ref[1]] = value.trim();
    }
    sheets.set(name, rows);
  }
  return sheets;
}

// Reads one tab into { [country]: { currency, family..., seven prices } } using
// the column letters given, starting after the row whose column C is "Country".
function readTab(sheets, tab, cols) {
  const rows = sheets.get(tab);
  if (!rows) fail(`tab "${tab}" not found`);
  const header = [...rows.keys()]
    .sort((a, b) => a - b)
    .find((r) => rows.get(r).C === "Country");
  if (!header)
    fail(`tab "${tab}" has no header row with "Country" in column C`);
  const out = new Map();
  for (const [index, row] of [...rows.entries()].sort((a, b) => a[0] - b[0])) {
    if (index <= header || !row.C) continue;
    const number = (key) => {
      const value = Number(row[cols[key]]);
      if (!row[cols[key]] || !Number.isFinite(value) || value <= 0)
        fail(
          `${tab}: ${row.C} has no valid ${key} price (cell ${cols[key]}${index})`,
        );
      return value;
    };
    if (out.has(row.C)) fail(`${tab}: ${row.C} appears twice`);
    out.set(row.C, {
      currency: row[cols.currency],
      familyStatus: row[cols.familyStatus] ?? "",
      family: {
        monthly: number("familyMonthly"),
        annual: number("familyAnnual"),
      },
      tutor: {
        lite: number("tutorLite"),
        starter: number("tutorStarter"),
        growth: number("tutorGrowth"),
        pro: number("tutorPro"),
      },
      centre: {
        starter: number("centreStarter"),
        growth: number("centreGrowth"),
        pro: number("centrePro"),
      },
    });
  }
  return out;
}

const input = process.argv[2];
if (!input) fail("usage: npm run pricing:import -- <path to approved .xlsx>");
const sheets = readWorkbook(resolve(input));

const review = readTab(sheets, REVIEW_TAB, {
  currency: "D",
  familyMonthly: "E",
  familyAnnual: "F",
  familyStatus: "G",
  tutorLite: "H",
  tutorStarter: "I",
  tutorGrowth: "J",
  tutorPro: "K",
  centreStarter: "L",
  centreGrowth: "M",
  centrePro: "N",
});
const launch = readTab(sheets, LAUNCH_TAB, {
  currency: "D",
  familyMonthly: "K",
  familyAnnual: "L",
  familyStatus: "N",
  tutorLite: "R",
  tutorStarter: "S",
  tutorGrowth: "T",
  tutorPro: "U",
  centreStarter: "V",
  centreGrowth: "W",
  centrePro: "X",
});

if (review.size !== EXPECTED_COUNTRIES)
  fail(
    `expected ${EXPECTED_COUNTRIES} countries in "${REVIEW_TAB}", found ${review.size}`,
  );

const countries = [];
const seen = new Set();
for (const [name, row] of review) {
  const code = ISO[name];
  if (!code)
    fail(`no ISO code mapped for "${name}" — add it to ISO in this script`);
  if (seen.has(code)) fail(`duplicate ISO code ${code}`);
  seen.add(code);
  const other = launch.get(name);
  if (!other) fail(`"${name}" is missing from "${LAUNCH_TAB}"`);
  const prices = ({ currency, family, tutor, centre }) =>
    JSON.stringify({ currency, family, tutor, centre });
  if (prices(row) !== prices(other)) fail(`the two tabs disagree for ${name}`);
  const currency = CURRENCY_OVERRIDES[code] ?? row.currency;
  if (!/^[A-Z]{3}$/.test(currency))
    fail(
      `${name} has no usable currency ("${row.currency}") — add a CURRENCY_OVERRIDES entry`,
    );
  countries.push({ code, name, ...row, currency });
}

const here = dirname(fileURLToPath(import.meta.url));
const output = resolve(here, "../src/data/pricing.json");
writeFileSync(
  output,
  `${JSON.stringify({ source: basename(input), story: "AA-6005", countries }, null, 2)}\n`,
);
console.log(`wrote ${countries.length} countries to ${output}`);
