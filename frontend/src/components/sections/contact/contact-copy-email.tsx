"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

type CopyState = "idle" | "copying" | "copied" | "unavailable";

export function ContactCopyEmail({ email }: { email: string }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  async function copyEmail() {
    if (copyState === "copying") return;
    setCopyState("copying");
    try {
      if (typeof navigator.clipboard?.writeText !== "function") {
        setCopyState("unavailable");
        return;
      }
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("unavailable");
    }
  }

  const message = copyState === "copied"
    ? "已複製信箱地址。"
    : copyState === "unavailable"
      ? "請選取上方信箱地址複製。"
      : copyState === "copying" ? "正在複製信箱地址…" : "";

  return (
    <div className="space-y-3" data-email-copy-state={copyState}>
      <Button
        variant="outline"
        size="sm"
        className="w-full sm:w-auto"
        aria-label={`複製信箱地址：${email}`}
        aria-busy={copyState === "copying"}
        aria-disabled={copyState === "copying"}
        onClick={copyEmail}
      >
        <Copy aria-hidden="true" />複製信箱地址
      </Button>
      <p role="status" aria-live="polite" aria-atomic="true" className="type-body-sm min-h-6 break-words text-muted-foreground">{message}</p>
    </div>
  );
}
