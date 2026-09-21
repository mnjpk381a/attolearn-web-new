import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/team");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/team">{children}</SeoPageExtras>;
}
