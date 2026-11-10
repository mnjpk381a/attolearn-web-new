import { NextRequest, NextResponse } from "next/server";

function countryNameFromCode(code: string | null) {
  if (!code || code.length !== 2) return "";

  try {
    return (
      new Intl.DisplayNames(["en"], { type: "region" }).of(
        code.toUpperCase(),
      ) || ""
    );
  } catch {
    return code.toUpperCase();
  }
}

// The visitor's public IP, or "" when the request only carries a loopback,
// private or link-local address (local dev, or a proxy that does not forward
// the client IP). IPv4-mapped IPv6 ("::ffff:127.0.0.1") is unwrapped first.
function getForwardedIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const candidate = (firstForwardedIp || realIp || "")
    .toLowerCase()
    .replace(/^::ffff:/, "");

  if (
    !candidate ||
    candidate === "::1" ||
    candidate === "localhost" ||
    candidate.startsWith("127.") ||
    candidate.startsWith("10.") ||
    candidate.startsWith("192.168.") ||
    candidate.startsWith("169.254.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(candidate) ||
    /^f[cd][0-9a-f]{2}:/.test(candidate) ||
    candidate.startsWith("fe80:")
  ) {
    return "";
  }

  return candidate;
}

export async function GET(request: NextRequest) {
  const platformCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry");
  const platformCountryName = countryNameFromCode(platformCountry);

  if (platformCountryName) {
    return NextResponse.json(
      { country: platformCountryName, code: platformCountry!.toUpperCase() },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const ip = getForwardedIp(request);
    // Without the visitor's IP a lookup would geolocate this server, not the
    // visitor. Return nothing so the browser can look itself up instead.
    if (!ip) {
      return NextResponse.json(
        { country: "", code: "" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    const url = `https://ipapi.co/${ip}/json/`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "AttoLearn country detection",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { country: "", code: "" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const data = await response.json();
    const code = String(
      data?.country_code || data?.country || "",
    ).toUpperCase();

    return NextResponse.json(
      {
        country: data?.country_name || countryNameFromCode(code) || "",
        // ISO 3166-1 alpha-2. Match on this, not the display name, which varies
        // by source ("Türkiye", "Bahamas", "Hong Kong SAR China").
        code: code.length === 2 ? code : "",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { country: "", code: "" },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
