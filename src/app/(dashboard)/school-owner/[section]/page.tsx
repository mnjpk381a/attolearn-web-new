import DashboardSectionPlaceholder from "@/components/DashboardSectionPlaceholder";

export default async function SchoolOwnerSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return <DashboardSectionPlaceholder role="school-owner" section={section} />;
}
