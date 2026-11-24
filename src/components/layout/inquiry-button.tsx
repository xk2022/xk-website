import type { MouseEventHandler } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { verifiedContactChannels } from "@/config/contact";
import { getInquiryAction, inquiryAction } from "@/config/inquiry";

type InquiryButtonProps = {
  size?: "sm" | "lg";
  className?: string;
  descriptionId?: string;
  context?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function InquiryButton({ size = "lg", className, descriptionId, context, onClick }: InquiryButtonProps) {
  const action = context ? getInquiryAction(verifiedContactChannels, context) : inquiryAction;
  const label = context && action.state !== "preparation" ? "詢問方案" : action.label;
  const props = {
    href: action.href,
    "aria-label": context && action.state !== "preparation" ? `${label}：${context}` : undefined,
    "aria-describedby": descriptionId,
    "data-inquiry-state": action.state,
    "data-inquiry-context": context,
    onClick,
  };
  const content = <>{label}<ArrowUpRight aria-hidden="true" /></>;

  return (
    <Button asChild size={size} className={className}>
      {action.state === "direct"
        ? <a {...props}>{content}</a>
        : <Link {...props}>{content}</Link>}
    </Button>
  );
}
