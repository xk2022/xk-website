import { ServiceDetail } from "@/components/sections/services/service-detail";
import { serviceCategories } from "@/config/services";

export function ServiceCloud() {
  return <ServiceDetail service={serviceCategories[4]} />;
}
