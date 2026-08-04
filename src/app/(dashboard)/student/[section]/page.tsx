import DashboardSectionPlaceholder from "@/components/DashboardSectionPlaceholder";

export default async function StudentSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return <DashboardSectionPlaceholder role="student" section={section} />;
}
