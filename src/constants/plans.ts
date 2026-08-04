export const SignupLink =
  "https://portal.attolearn.com/auth/signup";

export type PlanSection = {
  heading?: string;
  items: string[];
};

export type PricingMode = "fixed" | "toggle";
export type Plan = {
  id: number;
  title: string;
  subtitle: string;
  pricingMode: PricingMode;
  trialText?: string;
  fixedPriceText?: string;
  monthly?: string;
  annual?: string;
  isPopular?: boolean;
  selectLink: string;
  sections: PlanSection[];
};
export const plans: Plan[] = [
  {
    id: 1,
    title: "Paper Generator",
    subtitle: "For Schools & Teachers needing paper generation only",
    pricingMode: "fixed",
    trialText: "One Month Free Trial",
    fixedPriceText: "PKR 5,000 / Year",
    selectLink: SignupLink + "?plan=1",
    sections: [
      {
        items: [
          "Unlimited paper generation",
          "Curriculum-aligned papers (Grade, Subject, Chapter, Topic)",
          "Covers KG to Grade 10",
          "MCQs, short, long & mixed question formats",
          "Ready-made paper templates",
          "Instant paper generation",
          "Edit, reorder & refine questions",
          "Built-in review before finalizing",
          "Automatic Paper Library",
          "Search, reopen, duplicate & reuse papers",
          "Exam-ready print layouts",
          "PDF export & bulk printing",
          "Share papers via WhatsApp or files",
          "Teacher & admin collaboration",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Access",
    subtitle: "For NGOs, foundations, donor-funded and fee-free schools",
    pricingMode: "toggle",
    isPopular: true,
    monthly: "PKR 2,000 / Month  (Per Branch)",
    annual: "PKR 20,000 / Year ( Per Branch)",
    selectLink: SignupLink + "?plan=2",
    sections: [
      {
        heading: "School Admins",
        items: [
          "Web, mobile & tablet access",
          "Multi-campus & multi-branch control",
          "Centralized governance with data isolation",
          "Campus selector with live KPIs",
          "Student, staff & attendance dashboards",
          "Exams, events & system notifications",
        ],
      },
      {
        heading: "Teachers",
        items: [
          "Role-based teacher dashboard",
          "Exam paper generation & online quizzes",
          "Auto-marked quizzes with stored results",
          "Class & subject management",
          "Assignments, diary notes & goals",
          "View rosters & attendance",
        ],
      },
      {
        heading: "Students",
        items: [
          "Web, mobile & tablet access",
          "Online quizzes & learning activities",
          "Diagnostic tasks for learning gaps",
          "Academic history & results",
          "Awards & certificates with QR codes",
        ],
      },
      {
        heading: "Parents / Guardians",
        items: [
          "Single account for multiple children",
          "Switch between child profiles",
          "View attendance, results & activities",
          "Use student mode on child’s behalf",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Access Plus",
    subtitle:
      "Ideal for Fee-collecting NGOs, foundations, low-fee private schools",
    pricingMode: "toggle",
    monthly: "PKR 2,500 / Month (Per Branch)",
    annual: "PKR 25,000 / Year (Per Branch)",
    selectLink: SignupLink + "?plan=3",
    sections: [
      {
        heading: "School Admins",
        items: [
          "Web, mobile & tablet access",
          "Complete school operations platform",
          "Exam generator & academic oversight",
          "Student & staff attendance management",
          "Fee heads & fee structures",
          "Monthly or term-based fee vouchers",
          "Student-wise fee ledgers",
          "Paid & unpaid fee tracking",
          "Due dates & overdue visibility",
          "Fee summaries & total dues",
          "Financial overview (no accounting)",
          "Collected vs outstanding fees",
          "Class-wise fee collection view",
          "Multi-branch support",
          "Central & campus-level dashboards",
          "Campus selector with data isolation",
        ],
      },
      {
        heading: "Teachers",
        items: [
          "Teacher dashboard & role-based access",
          "Exam papers & online quizzes",
          "Auto-marked quizzes & diagnostics",
          "Class & section management",
          "Teacher rosters & schedule view",
        ],
      },
      {
        heading: "Students",
        items: [
          "Web, mobile & tablet access",
          "Online quizzes & learning activities",
          "Academic records & results",
          "Awards & certificates (QR-coded)",
        ],
      },
      {
        heading: "Parents / Guardians",
        items: [
          "Single account for multiple children",
          "Switch between child profiles",
          "View fee vouchers & fee history",
          "Track paid & unpaid fees",
          "Download receipts",
          "Parent–teacher communication",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Core – Growth",
    subtitle:
      "For Private schools starting daily operations (up to ~200 students)",
    pricingMode: "toggle",
    monthly: "PKR 2,500 / Month  (Per Branch)",
    annual: "PKR 25,000 / Year  (Per Branch)",
    selectLink: SignupLink + "?plan=4",
    sections: [
      {
        heading: "School Admins",
        items: [
          "Web, mobile & tablet access",
          "Complete school operations platform",
          "Student, staff & fee dashboards",
          "Exam generator & academic planning",
          "Attendance, leaves & school calendar",
          "Alerts, notices & system notifications",
          "Fee heads & fee structures",
          "Monthly fee vouchers",
          "Student fee ledgers",
          "Paid vs unpaid tracking",
          "Due dates & overdue visibility",
          "Fee summaries & reports",
          "Single-campus focus with multi-branch readiness",
          "Clean upgrade path as school grows",
        ],
      },
      {
        heading: "Teachers",
        items: [
          "Role-based teacher dashboard",
          "Exam papers & online quizzes",
          "Auto-marked quizzes & diagnostics",
          "Class, section & subject management",
          "Teacher rosters & schedule view",
          "Assignments, diary notes & goals",
        ],
      },
      {
        heading: "Students",
        items: [
          "Web, mobile & tablet access",
          "Online quizzes & learning activities",
          "Diagnostic assessments",
          "Academic records & results",
          "Awards & certificates (QR-coded)",
        ],
      },
      {
        heading: "Parents / Guardians",
        items: [
          "Single account for multiple children",
          "Switch between child profiles",
          "View attendance & academic progress",
          "Fee vouchers, history & receipts",
          "Student mode access",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Core",
    subtitle:
      "Ideal for Private schools running stable daily operations (up to ~500 students)",
    pricingMode: "toggle",
    monthly: "PKR 5,000 / Month  (Per Branch)",
    annual: "PKR 50,000 / Year  (Per Branch)",
    selectLink: SignupLink + "?plan=5",
    sections: [
      {
        heading: "School Admins",
        items: [
          "Web, mobile & tablet access",
          "Full school operations platform",
          "Enhanced dashboards & reporting",
          "Class-wise & school-level analytics",
          "Exam planning & academic oversight",
          "Attendance, leaves & academic calendar",
          "Flexible fee heads & structures",
          "Monthly fee vouchers",
          "Student fee ledgers",
          "Paid, unpaid & arrears tracking",
          "Due dates & overdue visibility",
          "Fee collection & dues overview",
          "Single-campus focus with multi-branch support",
          "Central visibility for multiple campuses",
          "Upgrade-ready for Professional or Enterprise",
        ],
      },
      {
        heading: "Teachers",
        items: [
          "Teacher dashboard & role-based access",
          "Exam papers & online quizzes",
          "Auto-marked quizzes & diagnostics",
          "Class, subject & timetable visibility",
          "Teacher rosters & schedule view",
          "Ad-hoc roster updates",
        ],
      },
      {
        heading: "Students",
        items: [
          "Web, mobile & tablet access",
          "Online quizzes & diagnostics",
          "Academic records & results",
          "Awards & certificates (QR-coded)",
          "Student goals & progress tracking",
        ],
      },
      {
        heading: "Parents / Guardians",
        items: [
          "Single account for multiple children",
          "Switch between child profiles",
          "View attendance & academic records",
          "Fee vouchers, history & receipts",
          "Student mode access",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Professional",
    subtitle:
      "For Growing private schools and school groups (up to ~1,500 students)",
    pricingMode: "toggle",
    monthly: "PKR 8,000 / Month  (Per Branch)",
    annual: "PKR 80,000 / Year  (Per Branch)",
    selectLink: SignupLink + "?plan=6",
    sections: [
      {
        heading: "School Admins",
        items: [
          "Web, mobile & tablet access",
          "Complete school operations platform",
          "Advanced dashboards & reporting",
          "Class-wise, staff & fee analytics",
          "Exam planning & academic oversight",
          "Attendance, leaves & academic calendar",
          "Flexible fee heads & structures",
          "Monthly fee vouchers",
          "Student fee ledgers",
          "Paid, unpaid & arrears tracking",
          "Due dates & overdue visibility",
          "Fee collection & dues overview",
          "Multi-campus support",
          "Centralized admin dashboards",
          "Campus-level data isolation",
          "Expansion-ready architecture",
          "Standard school website included",
          "School profile, academics & admissions pages",
          "News, gallery & contact information",
          "Mobile-friendly & admin-managed",
        ],
      },
      {
        heading: "Teachers",
        items: [
          "Teacher dashboard & role-based access",
          "Exam papers & online quizzes",
          "Auto-marked quizzes & diagnostics",
          "Class, subject & timetable visibility",
          "Teacher rosters & schedule view",
          "Ad-hoc roster updates",
        ],
      },
      {
        heading: "Students",
        items: [
          "Web, mobile & tablet access",
          "Online quizzes & diagnostics",
          "Academic records & results",
          "Awards & certificates (QR-coded)",
          "Student goals & progress tracking",
        ],
      },
      {
        heading: "Parents / Guardians",
        items: [
          "Single account for multiple children",
          "Switch between child profiles",
          "View attendance & academic records",
          "Fee vouchers, history & receipts",
          "Student mode access",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Enterprise",
    subtitle:
      "Ideal for Large schools, school groups, and complex organisations (1,500+ students)",
    pricingMode: "toggle",
    monthly: "PKR 12,000 / Month  (Per Branch)",
    annual: "PKR 100,000 / Year  (Per Branch)",
    selectLink: SignupLink + "?plan=7",
    sections: [
      {
        heading: "School Owners & Admins",
        items: [
          "Web, mobile & tablet access",
          "Enterprise-grade school management platform",
          "Central owner account",
          "Unlimited branches & campuses",
          "Campus-level data isolation",
          "Group-wide dashboards & controls",
          "Payroll & salary management",
          "Deductions & staff payment workflows",
          "Income & expense tracking",
          "Financial reports & summaries",
          "Transport management (coming soon)",
          "Routes, vehicles & drivers",
          "Student route assignment",
          "Compliance reminders",
          "Library management",
          "Book inventory & circulation",
          "Fines & usage reports",
          "Front office management",
          "Visitor logs & call records",
          "Complaints & postal tracking",
        ],
      },
      {
        heading: "Teachers",
        items: [
          "Advanced teacher rosters",
          "Cross-campus staff visibility",
          "Relief & substitution tracking",
          "Timetable access at scale",
        ],
      },
      {
        heading: "Dashboards & Oversight",
        items: [
          "Consolidated multi-campus dashboards",
          "Financial, attendance & staffing analytics",
          "Drill-down reporting by campus",
        ],
      },
      {
        heading: "Custom Development (Optional)",
        items: [
          "Custom workflows & reports",
          "Third-party system integrations",
          "Scoped and quoted separately",
        ],
      },
    ],
  },
];
