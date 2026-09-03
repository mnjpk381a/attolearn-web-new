import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AttoLearn",
  description: "Attobility Adaptive Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="public-site pt-16 sm:pt-19">{children}</main>
      <Footer />
    </>
  );
}
