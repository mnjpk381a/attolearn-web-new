import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/paper-generator");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/paper-generator">{children}</SeoPageExtras>;
}
