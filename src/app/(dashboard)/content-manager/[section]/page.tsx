import DashboardSectionPlaceholder from "@/components/DashboardSectionPlaceholder";

export default async function ContentManagerSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return (
    <DashboardSectionPlaceholder role="content-manager" section={section} />
  );
}
