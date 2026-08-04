import DashboardSectionPlaceholder from "@/components/DashboardSectionPlaceholder";

export default async function ResellerSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  return <DashboardSectionPlaceholder role="reseller" section={section} />;
}
