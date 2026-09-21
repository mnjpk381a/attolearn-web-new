import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/termsofservice");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SeoPageExtras path="/termsofservice">{children}</SeoPageExtras>;
}
