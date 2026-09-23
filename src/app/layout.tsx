import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
import { siteOrigin, privateRobots } from "@/lib/seo/config";
import "./globals.css";

// Plus Jakarta Sans font
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  // Unknown, account and legacy routes are excluded unless explicitly public.
  robots: privateRobots,
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  title: "AttoLearn",
  description:
    "Adaptive learning, meaningful evidence and teaching tools for families, tutors and tuition centres.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${poppins.variable} antialiased`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
