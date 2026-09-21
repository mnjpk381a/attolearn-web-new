import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/families");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/families">{children}</SeoPageExtras>;
}
