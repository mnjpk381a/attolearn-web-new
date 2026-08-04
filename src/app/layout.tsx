import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import ToastProvider from "@/components/ToastProvider";
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
  title: "AttoLearn",
  description: "Attobility Adaptive Learning Platform",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${poppins.variable} antialiased`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
