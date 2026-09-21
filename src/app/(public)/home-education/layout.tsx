import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/home-education");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/home-education">{children}</SeoPageExtras>;
}
