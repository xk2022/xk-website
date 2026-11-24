import type { MouseEventHandler } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { inquiryAction } from "@/config/inquiry";

type InquiryButtonProps = {
  size?: "sm" | "lg";
  className?: string;
  descriptionId?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function InquiryButton({ size = "lg", className, descriptionId, onClick }: InquiryButtonProps) {
  const props = {
    href: inquiryAction.href,
    "aria-describedby": descriptionId,
    "data-inquiry-state": inquiryAction.state,
    onClick,
  };
  const content = <>{inquiryAction.label}<ArrowUpRight aria-hidden="true" /></>;

  return (
    <Button asChild size={size} className={className}>
      {inquiryAction.state === "direct"
        ? <a {...props}>{content}</a>
        : <Link {...props}>{content}</Link>}
    </Button>
  );
}
