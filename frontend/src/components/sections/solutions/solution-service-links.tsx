import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { serviceCategories, type ServiceId } from "@/config/services";

/** Resolve labels and anchors from the existing service inventory. */
export function resolveSolutionService(id: ServiceId) {
  const service = serviceCategories.find((category) => category.id === id);

  if (!service) {
    throw new Error(`Unknown solution service: ${id}`);
  }

  return service;
}

export function resolveSolutionServices(serviceIds: readonly ServiceId[]) {
  return serviceIds.map(resolveSolutionService);
}

export function SolutionServiceLinks({
  serviceIds,
  label,
}: {
  serviceIds: readonly ServiceId[];
  label: string;
}) {
  return (
    <ul aria-label={label} className="flex min-w-0 flex-wrap gap-x-6 gap-y-2">
      {resolveSolutionServices(serviceIds).map((service) => (
        <li key={service.id} className="min-w-0">
          <Link
            href={`/services#${service.id}`}
            className="type-body-sm inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm font-medium text-secondary underline-offset-4 hover:underline"
          >
            <span className="min-w-0 break-words">{service.title}</span>
            <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
