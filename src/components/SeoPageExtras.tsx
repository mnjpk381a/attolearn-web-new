import { jsonLd, siteOrigin } from "@/lib/seo/config";
import { searchPage } from "@/lib/seo/pages";

export default function SeoPageExtras({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const page = searchPage(path);
  const origin = siteOrigin;
  if (!page) return children;
  const parent = searchPage(page.parent);
  const crumbs = [
    { path: "/", title: "Home" },
    ...(parent && parent.path !== "/" ? [parent] : []),
    ...(path !== "/" ? [page] : []),
  ];

  return (
    <>
      {children}
      {origin && path !== "/" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: crumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.title,
                item: new URL(crumb.path, origin).href,
              })),
            }),
          }}
        />
      )}
      {siteOrigin && path === "/adaptive-learning" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AttoLearn",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              url: new URL(path, siteOrigin).href,
              description: page.description,
            }),
          }}
        />
      )}
    </>
  );
}
