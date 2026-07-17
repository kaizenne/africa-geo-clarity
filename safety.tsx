import { createFileRoute } from "@tanstack/react-router";
import { lazy, useState } from "react";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { ClientOnly } from "@/components/client-only";
import type { SafetyLevel } from "@/lib/data";

const SafetyMap = lazy(() => import("@/components/safety-map").then((m) => ({ default: m.SafetyMap })));

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Africa Safety Heatmap — Safari/OS" },
      { name: "description", content: "Color-coded heatmap of safe, caution and avoid zones across Africa, sourced from US State Dept, UK FCDO and the Global Terrorism Index." },
    ],
  }),
  component: SafetyPage,
});

const filters: Array<{ key: SafetyLevel | "all"; label: string }> = [
  { key: "all", label: "All areas" },
  { key: "safe", label: "Safe" },
  { key: "caution", label: "Caution" },
  { key: "unsafe", label: "Avoid" },
];

function SafetyPage() {
  const [filter, setFilter] = useState<SafetyLevel | "all">("all");
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Interactive safety map"
        title="Know exactly where — and why — to take care"
        description="A single dramatic headline can wipe 25–98% off tourist arrivals in a country. This map shows the actual risk, area by area, with a source and a date on every point."
      >
        <div role="tablist" aria-label="Safety filter" className="flex rounded-md border overflow-hidden font-mono text-xs">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 transition-colors ${active ? "bg-foreground text-background" : "hover:bg-secondary"}`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </PageHeader>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ClientOnly fallback={<div className="h-[520px] rounded-lg border animate-pulse bg-muted" />}>
          <SafetyMap filter={filter} />
        </ClientOnly>
        <p className="mt-6 font-mono text-[11px] text-muted-foreground">
          Sources: US Department of State, UK FCDO, Global Terrorism Index 2025. Data is illustrative for MVP.
        </p>
      </div>
    </SiteShell>
  );
}
