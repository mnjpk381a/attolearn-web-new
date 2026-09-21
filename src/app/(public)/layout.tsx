import { siteOrigin, jsonLd } from "@/lib/seo/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {siteOrigin && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteOrigin}/#organization`,
                  name: "AttoLearn",
                  url: siteOrigin,
                  logo: `${siteOrigin}/images/EducationIcon/AttoLearn_Logo.png`,
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteOrigin}/#website`,
                  name: "AttoLearn",
                  url: siteOrigin,
                  publisher: { "@id": `${siteOrigin}/#organization` },
                },
              ],
            }),
          }}
        />
      )}
      <Header />
      <main className="public-site pt-16 sm:pt-19">{children}</main>
      <Footer />
    </>
  );
}
