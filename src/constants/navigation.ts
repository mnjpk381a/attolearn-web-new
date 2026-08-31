export type NavItem =
  | {
      label: string;
      href: string;
    }
  | {
      label: string;
      href?: string;
      children: {
        label: string;
        href: string;
        description?: string;
        disabled?: boolean;
      }[];
    };

export const navItems: NavItem[] = [
  { label: "Home", href: "#" },
  { label: "Families", href: "/families" },
  { label: "Home Education", href: "/home-education" },
  { label: "Tutors", href: "/tutors" },
  { label: "Tuition Centres", href: "/tuition-centres" },
  { label: "Schools", href: "/schools" },

  {
    label: "Products",
    children: [
      {
        label: "Adaptive Learning",
        description: "Short, evidence-informed learning sessions",
        href: "/adaptive-learning",
      },
      {
        label: "Paper Generator",
        description: "Printable and online assessments",
        href: "#",
      },
      {
        label: "School Management",
        description: "Connected school operations",
        href: "#",
      },
      {
        label: "Experience AttoLearn",
        description: "Explore interactive demonstrations",
        href: "#",
      },
    ],
  },

  {
    label: "Why AttoLearn",
    children: [
      {
        label: "Our Learning Philosophy",
        description: "How practice becomes meaningful evidence",
        href: "/why-attolearn",
      },
      {
        label: "Safety and Trust",
        description: "Permissions, governance and child safety",
        href: "#",
      },
      {
        label: "Learning Architecture",
        description: "The technical account, for specialists",
        href: "#",
      },
    ],
  },

  { label: "Pricing", href: "#" },

  {
    label: "Company",
    children: [
      { label: "About", href: "#" },
      { label: "Partners", href: "#" },
      // { label: "Team", href: "/team" },
      // { label: "Contact", href: "/contact" },
    ],
  },
];
