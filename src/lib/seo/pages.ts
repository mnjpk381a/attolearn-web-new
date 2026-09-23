import type { Metadata } from "next";
import priorities from "./priority-pages.json";
import { indexingEnabled, siteOrigin } from "./config";

export type SearchPage = {
  path: string;
  title: string;
  description: string;
  published: boolean;
  parent: string;
  related: string[];
};

const descriptions: Record<string, string> = {
  "/adaptive-learning":
    "Explore how AttoLearn combines short practice sessions, helpful feedback and learning evidence for families and tutors. Check current availability.",
  "/families":
    "Explore AttoLearn for families: parent-managed learner profiles, practice goals, progress evidence and permissions for invited tutors.",
  "/tutors":
    "Discover AttoLearn tutor workflows for assignments, learner evidence and parent-approved access. Ask about workspace and live-class availability.",
  "/tuition-centres":
    "Explore AttoLearn for tuition centres, with shared teaching workspaces, learner allocation and learning evidence. Discuss your centre’s requirements.",
  "/home-education":
    "Explore parent-led practice, learning goals and editable evidence for home education. Check local reporting requirements and available curriculum coverage.",
  "/live-classes":
    "Plan live online learning with clear joining instructions, parent permissions, attendance records and follow-up practice. Check AttoLearn availability.",
  "/online-maths-practice":
    "Explore a thoughtful approach to online maths practice, including visual representations, hints, worked examples and checking subject coverage.",
  "/online-english-practice":
    "Learn how reading, vocabulary and writing practice can support understanding. Check which English activities are available for your learner.",
  "/online-science-practice":
    "Explore science practice that connects observation, explanation and evidence. Check subject, topic and curriculum availability with AttoLearn.",
  "/year-6-maths-practice":
    "Plan Year 6 maths practice around your learner’s curriculum and needs. Explore example reasoning and confirm which AttoLearn topics are available.",
  "/year-6-english-practice":
    "Explore Year 6 English practice with reading and writing examples. Confirm local curriculum expectations and currently available AttoLearn content.",
  "/year-6-science-practice":
    "Explore Year 6 science reasoning through questions, observations and explanations. Confirm curriculum mapping and available AttoLearn topics.",
  "/year-6-fractions-practice":
    "Practise fraction equivalence, comparison and ordering with worked examples. Check local Year 6 expectations and AttoLearn practice availability.",
  "/equivalent-fractions-practice":
    "Understand equivalent fractions using equal parts, multiplication and number lines. Work through examples and explore your next practice step.",
  "/australian-curriculum-practice":
    "Understand what to check when choosing Australian Curriculum practice: curriculum version, year level, subject and validated topic coverage.",
  "/international-curriculum-coverage":
    "Check curriculum coverage by country, subject and year level. Learn why shared topic names do not guarantee equivalent local curriculum requirements.",
  "/learning-progress-for-parents":
    "Learn how to discuss practice evidence, support needs and next steps with your child. Explore parent-controlled learning progress in AttoLearn.",
  "/adaptive-learning-for-struggling-students":
    "Explore supportive practice with smaller steps, hints and encouraging feedback. Learn how families and tutors can respond when a learner needs help.",
  "/paper-generator":
    "Explore AttoLearn Paper Generator, including question selection, paper review and printable assessments. Confirm subject and account availability.",
  "/pricing":
    "Review AttoLearn pricing for families, tutors and tuition centres in Australia, the USA, the UK, New Zealand and Pakistan, displayed in local currencies.",
};

export const priorityPages = priorities;
export const searchPages: SearchPage[] = [
  {
    path: "/",
    title: "AttoLearn adaptive learning for families and tutors",
    description:
      "Explore adaptive practice, meaningful learning evidence and teaching tools for families, tutors and tuition centres, with clear next steps for every learner.",
    published: true,
    parent: "/",
    related: ["/adaptive-learning", "/families", "/tutors", "/tuition-centres"],
  },
  {
    path: "/faq",
    title: "AttoLearn frequently asked questions",
    description:
      "Find answers to common questions about AttoLearn accounts, learning tools and getting started.",
    published: true,
    parent: "/",
    related: ["/contact"],
  },
  {
    path: "/team",
    title: "Meet the AttoLearn team",
    description:
      "Meet the people behind AttoLearn and learn about their work supporting learners and educators.",
    published: true,
    parent: "/",
    related: ["/contact"],
  },
  {
    path: "/privacypolicy",
    title: "AttoLearn privacy policy",
    description:
      "Read the AttoLearn privacy policy for information about personal data and your privacy rights.",
    published: true,
    parent: "/",
    related: ["/contact"],
  },
  {
    path: "/termsofservice",
    title: "AttoLearn terms of service",
    description: "Read the terms that apply when using AttoLearn services.",
    published: true,
    parent: "/",
    related: ["/contact"],
  },
  {
    path: "/refundpolicy",
    title: "AttoLearn refund policy",
    description:
      "Read the AttoLearn refund policy and contact the team about your purchase.",
    published: true,
    parent: "/",
    related: ["/contact"],
  },
  {
    path: "/cancellationpolicy",
    title: "AttoLearn cancellation policy",
    description:
      "Read the AttoLearn cancellation policy and information about cancelling services.",
    published: true,
    parent: "/",
    related: ["/contact"],
  },
  {
    path: "/shippingdeliverypolicy",
    title: "AttoLearn shipping and delivery policy",
    description:
      "Read AttoLearn’s shipping and delivery policy for service and delivery information.",
    published: true,
    parent: "/",
    related: ["/contact"],
  },
  ...priorities.map((page) => ({
    path: page.path,
    title: page.title,
    description: descriptions[page.path],
    // Preserve existing public pages. New content needs recorded editorial approval.
    published: page.existing || page.approved,
    parent: page.path === "/adaptive-learning" ? "/" : "/adaptive-learning",
    related: page.path.includes("fractions")
      ? ["/online-maths-practice", "/families", "/tutors"]
      : ["/families", "/tutors", "/pricing"].filter(
          (path) => path !== page.path,
        ),
  })),
  {
    path: "/about",
    title: "About AttoLearn",
    description:
      "Learn about AttoLearn and its approach to supporting learning, assessment and useful evidence for families and educators.",
    published: true,
    parent: "/",
    related: ["/why-attolearn", "/contact"],
  },
  {
    path: "/contact",
    title: "Contact AttoLearn",
    description:
      "Contact AttoLearn about account availability, curriculum coverage, family learning, tutor workspaces or tuition-centre requirements.",
    published: true,
    parent: "/",
    related: ["/families", "/tutors", "/tuition-centres"],
  },
  {
    path: "/why-attolearn",
    title: "The AttoLearn approach to learning",
    description:
      "Explore AttoLearn’s learning philosophy, including meaningful practice, helpful feedback and evidence that informs the next learning step.",
    published: true,
    parent: "/",
    related: ["/adaptive-learning", "/safety-and-trust"],
  },
  {
    path: "/safety-and-trust",
    title: "Safety and trust at AttoLearn",
    description:
      "Read about permissions, parent control and the safety considerations behind AttoLearn’s learning experiences.",
    published: true,
    parent: "/",
    related: ["/families", "/contact"],
  },
];

export function searchPage(path: string) {
  return searchPages.find((page) => page.path === path);
}
export function pageMetadata(path: string): Metadata {
  const page = searchPage(path);
  if (!page) return { robots: { index: false, follow: false } };
  const url = siteOrigin ? new URL(path, siteOrigin).href : undefined;
  const image = siteOrigin
    ? new URL(`/seo-image?path=${encodeURIComponent(path)}`, siteOrigin).href
    : undefined;
  return {
    title: page.title,
    description: page.description,
    alternates: url ? { canonical: url } : undefined,
    robots: { index: indexingEnabled && page.published, follow: true },
    openGraph: {
      type: "website",
      siteName: "AttoLearn",
      title: page.title,
      description: page.description,
      url,
      ...(image
        ? {
            images: [{ url: image, width: 1200, height: 630, alt: page.title }],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
