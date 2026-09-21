import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/why-attolearn");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/why-attolearn">{children}</SeoPageExtras>;
}
