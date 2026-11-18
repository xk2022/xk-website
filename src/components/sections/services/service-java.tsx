import { ServiceDetail } from "@/components/sections/services/service-detail";
import { serviceCategories } from "@/config/services";

export function ServiceJava() {
  return <ServiceDetail service={serviceCategories[1]} background="surface" />;
}
