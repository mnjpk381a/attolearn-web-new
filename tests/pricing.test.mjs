// Guards src/data/pricing.json, the generated source for the public pricing page (AA-6005).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const { countries } = JSON.parse(
  readFileSync(new URL("../src/data/pricing.json", import.meta.url), "utf8"),
);
const byCode = Object.fromEntries(countries.map((c) => [c.code, c]));

test("covers all 62 approved countries exactly once", () => {
  assert.equal(countries.length, 62);
  assert.equal(new Set(countries.map((c) => c.code)).size, 62);
  assert.equal(new Set(countries.map((c) => c.name)).size, 62);
});

test("every country has a currency and a full, ascending price ladder", () => {
  for (const c of countries) {
    assert.match(c.code, /^[A-Z]{2}$/, c.name);
    assert.match(c.currency, /^[A-Z]{3}$/, c.name);
    const tutor = [c.tutor.lite, c.tutor.starter, c.tutor.growth, c.tutor.pro];
    const centre = [c.centre.starter, c.centre.growth, c.centre.pro];
    for (const ladder of [tutor, centre, [c.family.monthly, c.family.annual]]) {
      for (const [i, amount] of ladder.entries()) {
        assert.ok(Number.isFinite(amount) && amount > 0, c.name);
        if (i > 0) assert.ok(amount > ladder[i - 1], `${c.name} ladder`);
      }
    }
  }
});

test("matches the figures written into AA-6005", () => {
  assert.deepEqual(byCode.AU.tutor, {
    lite: 19,
    starter: 39,
    growth: 69,
    pro: 119,
  });
  assert.deepEqual(byCode.AU.centre, { starter: 49, growth: 119, pro: 199 });
  assert.equal(byCode.AU.currency, "AUD");
  assert.deepEqual(byCode.PK.tutor, {
    lite: 450,
    starter: 900,
    growth: 1600,
    pro: 2700,
  });
  assert.deepEqual(byCode.PK.centre, {
    starter: 1200,
    growth: 2500,
    pro: 4500,
  });
  assert.equal(byCode.PK.currency, "PKR");
});

test("family pricing is unchanged for the reviewed markets", () => {
  assert.deepEqual(byCode.AU.family, { monthly: 13, annual: 125 });
  assert.deepEqual(byCode.PK.family, { monthly: 300, annual: 2900 });
});

test("Zimbabwe is shown in USD until the workbook sets a currency", () => {
  assert.equal(byCode.ZW.currency, "USD");
});
