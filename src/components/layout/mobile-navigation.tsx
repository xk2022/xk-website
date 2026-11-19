"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { contactNavigation, primaryNavigation } from "@/config/navigation";

/** A disclosure, not a modal: the rest of the page remains available. */
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    function onBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }
    desktop.addEventListener("change", onBreakpointChange);
    return () => desktop.removeEventListener("change", onBreakpointChange);
  }, []);

  return (
    <div
      ref={navigationRef}
      className="shrink-0 lg:hidden"
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget;
        // Keep internal navigation open; outside focus must not stay under the panel.
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
          setOpen(false);
        }
      }}
    >
      <Button
        ref={triggerRef}
        variant="outline"
        size="icon-sm"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "關閉導覽" : "開啟導覽"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </Button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b bg-background shadow-default"
      >
        <Container className="py-6">
          <nav aria-label="手機導覽">
            <ul className="space-y-1">
              {primaryNavigation.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="type-body inline-flex min-h-11 w-full items-center rounded-md px-3 font-medium text-foreground hover:bg-surface hover:text-secondary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild size="sm" className="mt-4 w-full">
              <Link href={contactNavigation.href} onClick={() => setOpen(false)}>
                {contactNavigation.label}
              </Link>
            </Button>
          </nav>
        </Container>
      </div>
    </div>
  );
}
