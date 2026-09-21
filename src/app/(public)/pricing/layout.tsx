import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/pricing");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/pricing">{children}</SeoPageExtras>;
}
