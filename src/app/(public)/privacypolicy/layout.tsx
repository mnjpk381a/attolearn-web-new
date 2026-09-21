import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/privacypolicy");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/privacypolicy">{children}</SeoPageExtras>;
}
