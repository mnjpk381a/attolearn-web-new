import DashboardSectionPlaceholder from "@/components/DashboardSectionPlaceholder";

export default async function ParentSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return <DashboardSectionPlaceholder role="parent" section={section} />;
}
