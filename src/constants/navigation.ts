export type NavItem =
  | { label: string; href: string }
  | {
      label: string;
      href?: string;
      children: { label: string; href: string; disabled?: boolean }[];
    };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Paper Generator", href: "/papergenerator" },
  { label: "School MS", href: "/sms" },

  { label: "Resellers", href: "/resellers" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    children: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
    ],
  },
];
