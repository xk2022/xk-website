"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

const variants = [
  { variant: "primary", label: "Primary" },
  { variant: "secondary", label: "Secondary" },
  { variant: "outline", label: "Outline" },
  { variant: "ghost", label: "Ghost" },
] as const;

const sizes = [
  { size: "sm", label: "Small" },
  { size: "md", label: "Medium" },
  { size: "lg", label: "Large" },
] as const;

/** These review controls perform a real, local action; no submission is implied. */
export function ButtonDemo() {
  const [count, setCount] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  function recordAction(label: string) {
    setCount((value) => value + 1);
    setLastAction(label);
  }

  return (
    <div className="space-y-8">
      <fieldset className="space-y-4">
        <legend className="type-body-sm mb-4 font-semibold text-primary">
          按鈕樣式
        </legend>
        <div className="flex flex-wrap gap-3">
          {variants.map(({ variant, label }) => (
            <Button
              key={variant}
              variant={variant}
              onClick={() => recordAction(label)}
              lang="en"
            >
              {label}
            </Button>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="type-body-sm mb-4 font-semibold text-primary">
          按鈕尺寸
        </legend>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map(({ size, label }) => (
            <Button
              key={size}
              size={size}
              variant="outline"
              onClick={() => recordAction(label)}
              lang="en"
            >
              {label}
            </Button>
          ))}
          <Button disabled>停用按鈕</Button>
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 rounded-md border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <output id="button-demo-output" aria-live="polite" className="type-body-sm">
          {lastAction ? `已觸發 ${lastAction}。` : "尚未觸發按鈕。"}
          {`累計 ${count} 次。`}
        </output>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setCount(0);
            setLastAction(null);
          }}
        >
          <RotateCcw aria-hidden="true" />
          重設計數
        </Button>
      </div>

      <p className="type-body-sm text-muted-foreground">
        點擊按鈕可更新上方計數；使用鍵盤 Tab 檢查焦點樣式。停用狀態使用原生按鈕，
        導覽則保留連結語意。
      </p>
      <Button asChild variant="outline">
        <a href="#cards">前往卡片示範</a>
      </Button>
    </div>
  );
}
