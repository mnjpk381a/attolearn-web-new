import HomePageClient from "@/components/HomePageClient";
import { pageMetadata } from "@/lib/seo/pages";
import SeoPageExtras from "@/components/SeoPageExtras";

export const metadata = pageMetadata("/");

export default function Page() {
  return (
    <SeoPageExtras path="/">
      <div className="w-full">
        <HomePageClient />
      </div>
    </SeoPageExtras>
  );
}
