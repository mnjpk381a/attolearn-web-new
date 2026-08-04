import DashboardSectionPlaceholder from "@/components/DashboardSectionPlaceholder";

export default async function SchoolTeacherSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return (
    <DashboardSectionPlaceholder role="school-teacher" section={section} />
  );
}
