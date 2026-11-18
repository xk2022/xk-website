import { ServiceDetail } from "@/components/sections/services/service-detail";
import { serviceCategories } from "@/config/services";

export function ServiceIntegration() {
  return <ServiceDetail service={serviceCategories[2]} />;
}
