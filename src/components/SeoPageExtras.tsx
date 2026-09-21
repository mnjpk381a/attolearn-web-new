import Link from "next/link";
import { jsonLd, siteOrigin } from "@/lib/seo/config";
import { searchPage, searchPages } from "@/lib/seo/pages";

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
  // Approved children automatically acquire a crawlable link from their pillar.
  const relatedPaths = [
    ...new Set([
      ...page.related,
      ...searchPages
        .filter((item) => item.parent === path && item.path !== path)
        .map((item) => item.path),
    ]),
  ];
  const related = relatedPaths
    .map(searchPage)
    .filter((item) => item?.published);
  const crumbs = [
    { path: "/", title: "Home" },
    ...(parent && parent.path !== "/" ? [parent] : []),
    ...(path !== "/" ? [page] : []),
  ];
  return (
    <>
      {path !== "/" && (
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 py-4 text-sm text-slate-600"
        >
          <ol className="flex flex-wrap gap-2">
            {crumbs.map((crumb, index) => (
              <li key={crumb.path}>
                {index > 0 && (
                  <span aria-hidden="true" className="mr-2">
                    /
                  </span>
                )}
                {index === crumbs.length - 1 ? (
                  <span aria-current="page">{crumb.title}</span>
                ) : (
                  <Link href={crumb.path} className="underline">
                    {crumb.title}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      {children}
      {related.length > 0 && (
        <aside
          aria-label="Related AttoLearn pages"
          className="mx-auto max-w-7xl px-4 py-8"
        >
          <h2 className="text-xl font-semibold">Explore AttoLearn</h2>
          <ul className="mt-4 flex flex-wrap gap-5">
            {related.map(
              (item) =>
                item && (
                  <li key={item.path}>
                    <Link className="text-teal-800 underline" href={item.path}>
                      {item.title}
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </aside>
      )}
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
