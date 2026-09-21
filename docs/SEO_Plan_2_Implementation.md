# SEO Plan 2 implementation

## Status and ownership

Canonical public origin confirmed by the owner: **https://attolearn.com**.
Public SEO implementation belongs to `attolearn-web-new`. The signed-in learning portal in `al-adaptive-learning` is intentionally excluded from search; its separate assessment records portal protections.

This is a local implementation, not a deployment or a declaration that the whole management plan is complete. The source workbook is `AttoLearn_SEO_Plan2-1.xlsx` (all four sheets reviewed). Document requirements are recorded below as acceptance criteria, not as authorization to publish unapproved claims.

## Implemented

- Central registry for all 20 workbook priority URLs, with original audience, market, intent, CTA, dependency and review batch recorded in `src/lib/seo/priority-pages.json`.
- Unique titles, descriptions, HTTPS canonicals, Open Graph and Twitter cards for priority pages and retained supporting pages.
- Thirteen new server-rendered guides with distinct educational content. They are accessible by URL for review, but have `noindex` and are excluded from the sitemap and published related-page navigation.
- Existing seven priority pages retain indexability. This preserves existing publication status; it does **not** certify their product, pricing or coverage claims as approved.
- Crawlable breadcrumbs and related links. Approving a new page automatically creates an incoming link from its adaptive-learning parent page.
- Organization, WebSite and BreadcrumbList JSON-LD; descriptive SoftwareApplication JSON-LD on the adaptive-learning page. No invented offers, ratings or reviews. This does not claim eligibility for a Google software rich result; offer/rating requirements need separate validation when approved data exists.
- `/robots.txt` and `/sitemap.xml`. Sitemap contains 19 existing public pages: seven priority pages, the home page and eleven supporting pages. No fabricated modification dates.
- Exact 301 redirect `/papergenerator` → `/paper-generator`; nested demo retains its route and is noindex.
- Default noindex metadata for unregistered pages; explicit noindex response headers on account, dashboard, API, school-management and application routes.
- Main home-page positioning and footer now emphasize learning for families, tutors and centres. The AttoCampus navigation destination is configurable, replacing the incorrect portal destination.
- Generated 1200 × 630 social preview images, using the page title.
- Optional Google Search Console HTML verification token support.

Existing FAQ, team, company and policy pages retain indexability with individual metadata. Unreviewed legacy resources/reseller pages remain outside the search registry. School-management pages remain accessible but noindex; complete migration requires a confirmed AttoCampus destination and reviewed redirects. No authentication or access control is replaced by SEO directives.

## Configuration and release

Set these values **before building**, because metadata and the sitemap are prerendered:

```dotenv
NEXT_PUBLIC_SITE_URL=https://attolearn.com
SEO_INDEXING_ENABLED=true
# Optional URL-prefix property verification only:
GOOGLE_SITE_VERIFICATION=verified-token-from-search-console
# Optional, only after destination approval:
NEXT_PUBLIC_ATTOCAMPUS_URL=https://approved-institution-site.example
```

Do not use the example AttoCampus URL in production. Leave that variable empty until an actual destination is approved. Every preview/staging build must use `SEO_INDEXING_ENABLED=false`; `.env.example` defaults to this safe preview setting. Production builds otherwise enable indexing by default. Local development is noindex. Robots allows crawling so crawlers can read page-level noindex; robots disallow is not a substitute for noindex.

For each batch, review the page body and metadata against Website Plan 1, current product functionality, approved pricing and validated curriculum coverage. Record reviewer, date and evidence in the approval log below. Only then set the relevant new page's `approved` value to `true`, rebuild and rerun checks. Existing pages also require editorial review and corrections against those source documents; `existing: true` only preserves prior public availability. To withdraw an existing page from search, explicitly change its registry publication rule as well.

## Remaining management acceptance criteria

| Requirement                                              | Status / next action                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Website Plan 1, approved pricing and curriculum coverage | Not supplied. Review all 20 pages; new guides deliberately make no claims of complete curriculum coverage or guaranteed availability. Existing pages may still contain claims needing correction.                                                                                                                                                                                                                 |
| Four batches of five approved pages                      | Batch mapping prepared; zero editorial approvals recorded. Thirteen new URLs remain noindex.                                                                                                                                                                                                                                                                                                                      |
| Search Console domain property and baseline              | Requires account access and DNS verification for attolearn.com. HTML token supports a URL-prefix property only. Submit sitemap after deployment, inspect representative pages and record baseline.                                                                                                                                                                                                                |
| Analytics and organic registrations                      | Not implemented: no approved analytics provider, consent configuration or attribution specification supplied. Select these before adding collection. Coordinate landing page, source/medium, country, audience and completed-registration attribution across the public site and portal; exclude internal traffic/bots and avoid learner identifiers in URLs or events. Validate completion, not just CTA clicks. |
| Country and curriculum structure                         | English global routes prepared; no speculative hreflang/localized duplicates. Approve country/curriculum mapping and availability evidence before expansion.                                                                                                                                                                                                                                                      |
| Institution separation                                   | Main messaging/navigation improved and school URLs noindex. Full content inventory and AttoCampus redirects remain pending the destination and migration decisions.                                                                                                                                                                                                                                               |
| Performance / Core Web Vitals                            | Production compilation passes; no Lighthouse or field-performance claims. Measure mobile templates and real-user LCP, INP and CLS after deployment, then address measured regressions.                                                                                                                                                                                                                            |
| Broken links and conversion journey                      | Priority routes, redirect and metadata tested. Complete whole-site link and registration-flow review remains necessary; legacy placeholder links and existing commercial claims are not certified.                                                                                                                                                                                                                |
| 500 qualified organic engaged visits/month by month 3    | A business outcome to measure after launch, not an implementation result. Define engaged/qualified and exclude bots, internal traffic and irrelevant markets.                                                                                                                                                                                                                                                     |
| First 25 organic registrations                           | Requires validated cross-domain attribution and real completed registrations after launch. Not achieved or claimed by this change.                                                                                                                                                                                                                                                                                |

## Validation

`npm run test:seo` builds the production app and starts a temporary local production server. Six integration checks cover the 20-page registry and batches, all priority metadata/canonicals/robots, JSON-LD parsing, sitemap exclusions, private response headers, the 301 and unknown-page 404, and actual PNG dimensions. It does not submit forms or call account-creation APIs. Tests expect the confirmed production origin and indexing enabled; use the preview setting for deployment builds of staging.

Run `npm run typecheck` and lint the changed sources. Deployment checks must additionally confirm HTTPS, www-to-canonical redirects at the host, production environment settings, robots/sitemap responses and Search Console indexing. No deployment, DNS change, analytics setup or Search Console submission was performed here.

## Approval log

No approvals recorded. Add reviewer, date, source document/version, URL/batch and decision here before enabling new pages.

## Page briefs and review batches

The workbook CTA is the requested end state. New draft guides currently use **Ask about availability → /contact** until the relevant product/signup claims are validated. Their content is review material, not a replacement for product-owner evidence.

### 1. Adaptive learning platform for students and families

- URL: `/adaptive-learning`; batch 1.
- Status: Existing public page; editorial review pending.
- Audience: Families and students; market: Global; intent: Commercial investigation.
- Required content: Explain Today’s Best Step, short sessions, evidence, support and current availability.
- Requested CTA: Join early access.
- Approval dependency: Website Plan 1 positioning.

### 2. Personalised learning support for families

- URL: `/families`; batch 1.
- Status: Existing public page; editorial review pending.
- Audience: Families; market: Global; intent: Commercial.
- Required content: Parent control, multiple learners, Free Starter, trial, progress and tutor invitation.
- Requested CTA: Join early access.
- Approval dependency: Pricing and subscription copy approved.

### 3. Adaptive learning platform for tutors

- URL: `/tutors`; batch 1.
- Status: Existing public page; editorial review pending.
- Audience: Tutors; market: Global; intent: Commercial.
- Required content: Tutor workspace, evidence, assignments, permissions, Live Classes and honest availability.
- Requested CTA: Join as a tutor.
- Approval dependency: Tutor scope and pricing status.

### 4. Adaptive learning for tuition centres

- URL: `/tuition-centres`; batch 1.
- Status: Existing public page; editorial review pending.
- Audience: Tuition centres; market: Global; intent: Commercial.
- Required content: Multi-tutor workspace, learner allocation, evidence continuity and Live Classes.
- Requested CTA: Book a demo.
- Approval dependency: Centre scope and pricing status.

### 5. Home education learning and reporting

- URL: `/home-education`; batch 1.
- Status: Existing public page; editorial review pending.
- Audience: Home educators; market: Australia first; intent: Commercial/informational.
- Required content: Daily practice, parent-led goals, evidence and editable reporting with jurisdiction disclaimer.
- Requested CTA: Join early access.
- Approval dependency: Existing page optimisation.

### 6. Live online classes for tutors and tuition centres

- URL: `/live-classes`; batch 2.
- Status: New draft; noindex pending approval.
- Audience: Tutors and centres; market: Global; intent: Commercial.
- Required content: Scheduling, individual/group sessions, joining instructions, tutor-recorded attendance, practice links and safeguarding.
- Requested CTA: Register interest.
- Approval dependency: Feature availability wording.

### 7. Online mathematics practice

- URL: `/online-maths-practice`; batch 2.
- Status: New draft; noindex pending approval.
- Audience: Families and students; market: Global; intent: Commercial/informational.
- Required content: Curriculum mapping, short practice, hints, worked examples and coverage display.
- Requested CTA: Try or join early access.
- Approval dependency: Approved content coverage.

### 8. Online English practice

- URL: `/online-english-practice`; batch 2.
- Status: New draft; noindex pending approval.
- Audience: Families and students; market: Global; intent: Commercial/informational.
- Required content: Language skills, reading and writing practice; avoid promising unavailable coverage.
- Requested CTA: Try or join early access.
- Approval dependency: Approved content coverage.

### 9. Online science practice

- URL: `/online-science-practice`; batch 2.
- Status: New draft; noindex pending approval.
- Audience: Families and students; market: Global; intent: Commercial/informational.
- Required content: Curriculum-mapped science practice, explanations and evidence.
- Requested CTA: Try or join early access.
- Approval dependency: Approved content coverage.

### 10. Year 6 mathematics practice

- URL: `/year-6-maths-practice`; batch 2.
- Status: New draft; noindex pending approval.
- Audience: Families and students; market: Australia first; intent: High-intent learning support.
- Required content: Year 6 topic coverage, example questions, support and progress.
- Requested CTA: Join Year 6 early access.
- Approval dependency: Year 6 Maths approved question bank.

### 11. Year 6 English practice

- URL: `/year-6-english-practice`; batch 3.
- Status: New draft; noindex pending approval.
- Audience: Families and students; market: Australia first; intent: High-intent learning support.
- Required content: Year 6 English coverage, examples and honest readiness.
- Requested CTA: Join Year 6 early access.
- Approval dependency: Year 6 English approved question bank.

### 12. Year 6 science practice

- URL: `/year-6-science-practice`; batch 3.
- Status: New draft; noindex pending approval.
- Audience: Families and students; market: Australia first; intent: High-intent learning support.
- Required content: Year 6 Science coverage, examples and honest readiness.
- Requested CTA: Join Year 6 early access.
- Approval dependency: Year 6 Science approved question bank.

### 13. Year 6 fractions practice

- URL: `/year-6-fractions-practice`; batch 3.
- Status: New draft; noindex pending approval.
- Audience: Families, students and tutors; market: Global with local mapping; intent: Topic-specific practice.
- Required content: Equivalent fractions, comparison, ordering, number-line representation, hints and worked examples.
- Requested CTA: Start fractions practice.
- Approval dependency: Validated fractions content.

### 14. Equivalent fractions questions and practice

- URL: `/equivalent-fractions-practice`; batch 3.
- Status: New draft; noindex pending approval.
- Audience: Families, students and tutors; market: Global with local mapping; intent: Topic-specific practice.
- Required content: Multiple techniques and representations; demonstrate depth without exposing internal codes.
- Requested CTA: Start practice.
- Approval dependency: Validated pilot content.

### 15. Australian Curriculum-aligned practice

- URL: `/australian-curriculum-practice`; batch 3.
- Status: New draft; noindex pending approval.
- Audience: Australian families and tutors; market: Australia; intent: Curriculum/product comparison.
- Required content: Explain ACARA mapping, coverage boundaries and subjects without claiming complete coverage prematurely.
- Requested CTA: View available coverage.
- Approval dependency: Coverage register approved.

### 16. International curriculum and topic coverage

- URL: `/international-curriculum-coverage`; batch 4.
- Status: New draft; noindex pending approval.
- Audience: Families and tutors; market: Six launch markets plus global; intent: Coverage validation.
- Required content: Explain global/local databases, validated topic matching and country gaps.
- Requested CTA: Check your country.
- Approval dependency: Country mapping data.

### 17. Learning progress dashboard for parents

- URL: `/learning-progress-for-parents`; batch 4.
- Status: New draft; noindex pending approval.
- Audience: Families; market: Global; intent: Problem/solution.
- Required content: Explain evidence, plain-language progress, support needs and parent control.
- Requested CTA: Join early access.
- Approval dependency: Parent dashboard verified.

### 18. Supportive practice for students who are struggling

- URL: `/adaptive-learning-for-struggling-students`; batch 4.
- Status: New draft; noindex pending approval.
- Audience: Families and tutors; market: Global; intent: Problem/solution.
- Required content: Recovery, hints, confidence-first feedback and accessibility without diagnostic or medical claims.
- Requested CTA: Explore supportive practice.
- Approval dependency: Experience Guide approved copy.

### 19. Question paper generator for families and tutors

- URL: `/paper-generator`; batch 4.
- Status: Existing public page; editorial review pending.
- Audience: Families and tutors; market: Selected markets; intent: Commercial.
- Required content: Printable/online papers, supported question types and honest account availability.
- Requested CTA: Explore Paper Generator.
- Approval dependency: Product availability confirmed.

### 20. AttoLearn pricing by country and user type

- URL: `/pricing`; batch 4.
- Status: Existing public page; editorial review pending.
- Audience: Families, tutors and centres; market: Global; intent: Transactional.
- Required content: Free Starter, 30-day trial, approved family prices, Founding Families, and confirmed tutor/centre prices only.
- Requested CTA: Start free or register interest.
- Approval dependency: Website Plan 1 pricing corrections.
