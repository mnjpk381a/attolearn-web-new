// Works out the visitor's country (ISO 3166-1 alpha-2) for the pricing page.
//
// The site's own endpoint is asked first. It answers "" when it cannot see the
// visitor's IP (local dev, or a proxy that does not forward it), so the browser
// then asks a public lookup directly, which always sees the visitor's real IP.

type Source = { url: string; read: (data: unknown) => unknown };

const field = (key: string) => (data: unknown) =>
  (data as Record<string, unknown> | null)?.[key];

const sources: Source[] = [
  { url: "/api/geo/country", read: field("code") },
  { url: "https://api.country.is/", read: field("country") },
  { url: "https://ipapi.co/json/", read: field("country_code") },
];

export async function detectCountryCode(): Promise<string> {
  for (const { url, read } of sources) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) continue;
      const code = read(await response.json());
      if (typeof code === "string" && /^[a-z]{2}$/i.test(code)) {
        return code.toUpperCase();
      }
    } catch {
      // Blocked, offline or timed out: try the next source.
    }
  }
  return "";
}
