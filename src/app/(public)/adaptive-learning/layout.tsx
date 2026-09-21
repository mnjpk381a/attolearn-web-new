import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/adaptive-learning");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/adaptive-learning">{children}</SeoPageExtras>;
}
