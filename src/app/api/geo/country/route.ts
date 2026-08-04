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

function getForwardedIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const candidate = firstForwardedIp || realIp || "";

  if (
    !candidate ||
    candidate === "::1" ||
    candidate === "127.0.0.1" ||
    candidate.startsWith("10.") ||
    candidate.startsWith("192.168.") ||
    candidate.startsWith("172.16.")
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
      { country: platformCountryName },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const ip = getForwardedIp(request);
    const url = ip ? `https://ipapi.co/${ip}/json/` : "https://ipapi.co/json/";
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "AttoLearn country detection",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { country: "" },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        country:
          data?.country_name ||
          countryNameFromCode(data?.country_code || data?.country) ||
          "",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { country: "" },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
