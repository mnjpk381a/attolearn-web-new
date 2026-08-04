import DashboardSectionPlaceholder from "@/components/DashboardSectionPlaceholder";

export default async function TutorSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return <DashboardSectionPlaceholder role="tutor" section={section} />;
}
