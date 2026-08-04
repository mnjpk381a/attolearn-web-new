import AdminSetupScreen from "@/components/admin/AdminSetupScreen";
import { getAdminSetupConfig } from "@/components/admin/adminSetupConfigs";

export default function CountriesAdminScreen() {
  const config = getAdminSetupConfig("countries");

  if (!config) return null;

  return <AdminSetupScreen config={config} />;
}
