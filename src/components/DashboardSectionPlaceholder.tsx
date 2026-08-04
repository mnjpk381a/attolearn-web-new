import RoleDashboard from "@/components/RoleDashboard";

function toTitle(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function DashboardSectionPlaceholder({
  role,
  section,
}: {
  role: string;
  section: string;
}) {
  const roleTitle = toTitle(role);
  const sectionTitle = toTitle(section);

  return (
    <RoleDashboard
      title={`${sectionTitle} ${roleTitle}`}
      description={`${sectionTitle} tools for the ${roleTitle} workspace will appear here.`}
    />
  );
}
