import type { IconType } from "react-icons";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaChartBar,
  FaCog,
  FaComments,
  FaFileAlt,
  FaFlag,
  FaHome,
  FaImages,
  FaSchool,
  FaUsers,
} from "react-icons/fa";
import {
  FaBook,
  FaClipboardList,
  FaGraduationCap,
  FaHandshake,
  FaUser,
  FaUserGraduate,
} from "react-icons/fa6";

export type DashboardNavItem = {
  label: string;
  path: string;
  icon: IconType;
};

export const roleHomeByType: Record<number, string> = {
  1: "/student",
  2: "/parent",
  3: "/tutor",
  4: "/school-teacher",
  5: "/school-owner",
  6: "/content-manager",
  8: "/admin",
  9: "/reseller",
};

export function getRoleLabel(typeId?: number) {
  switch (typeId) {
    case 8:
      return "Admin";
    case 3:
      return "Tutor";
    case 5:
      return "School Owner";
    case 4:
      return "School Teacher";
    case 6:
      return "Content Manager";
    case 9:
      return "Reseller";
    case 1:
      return "Student";
    case 2:
      return "Parent";
    default:
      return "Workspace";
  }
}

export function getWorkspaceLabel(typeId?: number) {
  switch (typeId) {
    case 8:
      return "AttoLearn Admin";
    case 3:
      return "AttoLearn Tutor";
    case 5:
      return "AttoLearn School";
    case 4:
      return "AttoLearn Teacher";
    case 6:
      return "AttoLearn Content Manager";
    case 9:
      return "AttoLearn Reseller";
    case 1:
      return "AttoLearn Student";
    case 2:
      return "AttoLearn Parent";
    default:
      return "AttoLearn";
  }
}

const sharedSchoolLinks: DashboardNavItem[] = [
  { label: "Dashboard", path: "/school-owner", icon: FaHome },
  { label: "Classes", path: "/school-owner/classes", icon: FaSchool },
  { label: "Teachers", path: "/school-owner/teachers", icon: FaUsers },
  { label: "Students", path: "/school-owner/students", icon: FaUserGraduate },
  { label: "Papers", path: "/school-owner/papers", icon: FaFileAlt },
  { label: "Planner", path: "/school-owner/planner", icon: FaCalendarAlt },
  { label: "Messages", path: "/school-owner/messages", icon: FaComments },
  { label: "Settings", path: "/school-owner/settings", icon: FaCog },
];

export function getNavLinks(typeId?: number): DashboardNavItem[] {
  switch (typeId) {
    case 8:
      return [
        { label: "Dashboard", path: "/admin", icon: FaHome },
        { label: "Schools", path: "/admin/schools", icon: FaSchool },
        { label: "Users", path: "/admin/users", icon: FaUsers },
        { label: "Countries", path: "/admin/countries", icon: FaFlag },
        {
          label: "Authorities",
          path: "/admin/curriculum-authorities",
          icon: FaSchool,
        },
        { label: "Curriculums", path: "/admin/curriculums", icon: FaBook },
        {
          label: "Versions",
          path: "/admin/curriculum-versions",
          icon: FaClipboardList,
        },
        { label: "Grades", path: "/admin/grades", icon: FaGraduationCap },
        { label: "Subjects", path: "/admin/subjects", icon: FaBookOpen },
        { label: "Topics", path: "/admin/topics", icon: FaClipboardList },
        { label: "Outcomes", path: "/admin/outcomes", icon: FaChartBar },
        { label: "Skills", path: "/admin/skills", icon: FaUserGraduate },
        {
          label: "Cognitive Actions",
          path: "/admin/cognitive-actions",
          icon: FaClipboardList,
        },
        { label: "Patterns", path: "/admin/patterns", icon: FaImages },
        {
          label: "Outcome Skills",
          path: "/admin/outcome-skills",
          icon: FaHandshake,
        },
        { label: "Content", path: "/admin/content", icon: FaBook },
        { label: "Reports", path: "/admin/reports", icon: FaChartBar },
        { label: "Settings", path: "/admin/settings", icon: FaCog },
      ];
    case 3:
      return [
        { label: "Dashboard", path: "/tutor", icon: FaHome },
        { label: "Learners", path: "/tutor/learners", icon: FaUserGraduate },
        { label: "Sessions", path: "/tutor/sessions", icon: FaCalendarAlt },
        { label: "Resources", path: "/tutor/resources", icon: FaBookOpen },
        { label: "Messages", path: "/tutor/messages", icon: FaComments },
      ];
    case 5:
      return sharedSchoolLinks;
    case 4:
      return [
        { label: "Dashboard", path: "/school-teacher", icon: FaHome },
        {
          label: "My Classes",
          path: "/school-teacher/classes",
          icon: FaChalkboardTeacher,
        },
        {
          label: "Students",
          path: "/school-teacher/students",
          icon: FaUserGraduate,
        },
        {
          label: "Assignments",
          path: "/school-teacher/assignments",
          icon: FaClipboardList,
        },
        { label: "Papers", path: "/school-teacher/papers", icon: FaFileAlt },
        {
          label: "Messages",
          path: "/school-teacher/messages",
          icon: FaComments,
        },
      ];
    case 9:
      return [
        { label: "Dashboard", path: "/reseller", icon: FaHome },
        { label: "Schools", path: "/reseller/schools", icon: FaSchool },
        { label: "Leads", path: "/reseller/leads", icon: FaHandshake },
        { label: "Updates", path: "/reseller/updates", icon: FaClipboardList },
        { label: "Reports", path: "/reseller/reports", icon: FaChartBar },
      ];
    case 1:
      return [
        { label: "Dashboard", path: "/student", icon: FaHome },
        { label: "Learning", path: "/student/learning", icon: FaGraduationCap },
        {
          label: "Assignments",
          path: "/student/assignments",
          icon: FaClipboardList,
        },
        { label: "Library", path: "/student/library", icon: FaBookOpen },
        { label: "Gallery", path: "/student/gallery", icon: FaImages },
      ];
    case 6:
      return [
        { label: "Dashboard", path: "/content-manager", icon: FaHome },
        { label: "Content", path: "/content-manager/content", icon: FaBook },
        {
          label: "Assignments",
          path: "/content-manager/assignments",
          icon: FaClipboardList,
        },
      ];
    case 2:
      return [
        { label: "Dashboard", path: "/parent", icon: FaHome },
        { label: "Children", path: "/parent/children", icon: FaUser },
        { label: "Progress", path: "/parent/progress", icon: FaChartBar },
        { label: "Planner", path: "/parent/planner", icon: FaCalendarAlt },
        { label: "Messages", path: "/parent/messages", icon: FaComments },
      ];
    default:
      return [{ label: "Dashboard", path: "/", icon: FaHome }];
  }
}
