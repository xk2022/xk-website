import { ServiceDetail } from "@/components/sections/services/service-detail";
import { serviceCategories } from "@/config/services";

export function ServiceWebsite() {
  return <ServiceDetail service={serviceCategories[0]} />;
}
