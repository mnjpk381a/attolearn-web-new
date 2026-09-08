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
  { label: "Home", href: "/" },
  { label: "Families", href: "/families" },
  { label: "Home Schooling", href: "/home-education" },
  { label: "Tutors", href: "/tutors" },
  { label: "Tuition Centres", href: "/tuition-centres" },
  { label: "AttoCampus", href: "https://portal.attolearn.com/auth/login" },

  { label: "Adaptive Learning", href: "/adaptive-learning" },
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
        href: "/safety-and-trust",
      },
      {
        label: "Learning Architecture",
        description: "The technical account, for specialists",
        href: "#",
      },
    ],
  },

  { label: "Pricing", href: "/pricing" },
];
