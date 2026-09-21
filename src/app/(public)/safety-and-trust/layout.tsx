import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/safety-and-trust");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/safety-and-trust">{children}</SeoPageExtras>;
}
