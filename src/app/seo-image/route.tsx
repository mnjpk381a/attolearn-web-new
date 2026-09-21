import { ImageResponse } from "next/og";
import { searchPage } from "@/lib/seo/pages";

export function GET(request: Request) {
  const page = searchPage(new URL(request.url).searchParams.get("path") ?? "/");
  if (!page) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "72px",
        background: "#075963",
        color: "white",
      }}
    >
      <div style={{ fontSize: 38 }}>AttoLearn</div>
      <div style={{ fontSize: 60, lineHeight: 1.2 }}>{page.title}</div>
      <div style={{ fontSize: 25 }}>
        Learning support for families and educators
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400" },
    },
  );
}
