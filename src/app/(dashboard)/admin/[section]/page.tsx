import DashboardSectionPlaceholder from "@/components/DashboardSectionPlaceholder";
import AdminSetupScreen from "@/components/admin/AdminSetupScreen";
import { getAdminSetupConfig } from "@/components/admin/adminSetupConfigs";

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const adminSetupConfig = getAdminSetupConfig(section);

  if (adminSetupConfig) {
    return <AdminSetupScreen config={adminSetupConfig} />;
  }

  return <DashboardSectionPlaceholder role="admin" section={section} />;
}
