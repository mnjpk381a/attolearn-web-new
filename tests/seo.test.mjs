import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";

const priorities = JSON.parse(
  await readFile(
    new URL("../src/lib/seo/priority-pages.json", import.meta.url),
  ),
);
let server, base;
before(async () => {
  const socket = createServer();
  await new Promise((resolve) => socket.listen(0, "127.0.0.1", resolve));
  const port = socket.address().port;
  await new Promise((resolve) => socket.close(resolve));
  base = `http://127.0.0.1:${port}`;
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
    { stdio: "pipe" },
  );
  let log = "";
  server.stdout.on("data", (chunk) => (log += chunk));
  server.stderr.on("data", (chunk) => (log += chunk));
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      if ((await fetch(base + "/robots.txt")).ok) return;
    } catch {}
    if (server.exitCode !== null) throw new Error(log);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Server did not become ready: " + log);
});
after(() => server?.kill());
const html = async (path) => {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  return response.text();
};
const meta = (body, name) =>
  body.match(
    new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`),
  )?.[1];

test("workbook has twenty unique priority URLs in four review batches", () => {
  assert.equal(priorities.length, 20);
  assert.equal(new Set(priorities.map((page) => page.path)).size, 20);
  for (let batch = 1; batch <= 4; batch++)
    assert.equal(priorities.filter((page) => page.batch === batch).length, 5);
});
test("all priority pages render unique metadata and correct approval-based robots", async () => {
  const titles = new Set(),
    descriptions = new Set();
  for (const page of priorities) {
    const body = await html(page.path);
    const title = body.match(/<title>(.*?)<\/title>/)?.[1];
    const description = meta(body, "description");
    assert.ok(title && description, page.path);
    assert.ok(!titles.has(title) && !descriptions.has(description), page.path);
    titles.add(title);
    descriptions.add(description);
    assert.ok(
      body.includes(`rel="canonical" href="https://attolearn.com${page.path}"`),
      page.path,
    );
    assert.equal(
      meta(body, "robots"),
      page.existing || page.approved ? "index, follow" : "noindex, follow",
      page.path,
    );
    assert.ok(
      meta(body, "og:image")?.startsWith(
        "https://attolearn.com/seo-image?path=",
      ),
    );
    assert.equal(meta(body, "twitter:card"), "summary_large_image");
    const schemas = [
      ...body.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g),
    ].map((match) => JSON.parse(match[1]));
    assert.ok(
      schemas.some((schema) => schema["@type"] === "BreadcrumbList"),
      page.path,
    );
  }
});
test("sitemap exposes approved routes and keeps draft and private routes out", async () => {
  const sitemap = await html("/sitemap.xml");
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  for (const page of priorities)
    assert.equal(
      urls.includes("https://attolearn.com" + page.path),
      page.existing || page.approved,
      page.path,
    );
  assert.ok(urls.every((url) => url.startsWith("https://attolearn.com/")));
  assert.equal(new Set(urls).size, urls.length);
  for (const path of [
    "/login",
    "/parent",
    "/schools",
    "/sms",
    "/papergenerator",
  ])
    assert.ok(!urls.includes("https://attolearn.com" + path));
  const robots = await html("/robots.txt");
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/attolearn.com\/sitemap.xml/);
});
test("private and school-management routes carry noindex response headers", async () => {
  for (const path of [
    "/login",
    "/signup",
    "/parent",
    "/student",
    "/tutor",
    "/schools",
    "/sms",
    "/papergenerator/demo",
    "/api/seo-test-missing",
  ]) {
    const response = await fetch(base + path, { redirect: "manual" });
    assert.equal(
      response.headers.get("x-robots-tag"),
      "noindex, nofollow, nosnippet",
      path,
    );
  }
});
test("legacy paper URL redirects permanently and unknown pages return 404", async () => {
  const response = await fetch(base + "/papergenerator", {
    redirect: "manual",
  });
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("location"), "/paper-generator");
  assert.equal((await fetch(base + "/unrecognised-seo-page")).status, 404);
});
test("social preview renders a real 1200 by 630 PNG", async () => {
  const response = await fetch(base + "/seo-image?path=/families");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/png/);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.readUInt32BE(16), 1200);
  assert.equal(bytes.readUInt32BE(20), 630);
});
