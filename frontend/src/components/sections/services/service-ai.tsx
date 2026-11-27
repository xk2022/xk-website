import { ServiceDetail } from "@/components/sections/services/service-detail";
import { serviceCategories } from "@/config/services";

export function ServiceAI() {
  return <ServiceDetail service={serviceCategories[3]} background="surface" />;
}
