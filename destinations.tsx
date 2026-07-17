import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { SafetyBadge } from "@/components/safety-badge";
import { destinations, type SafetyLevel } from "@/lib/data";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations across Africa — Safari/OS" },
      { name: "description", content: "Search safer, lesser-known and popular African destinations by country, activity, budget and travel style." },
    ],
  }),
  component: DestPage,
});

const activities = ["Wildlife", "Beach", "Culture", "Adventure", "Music", "History", "Nature", "Photography", "City"];

function DestPage() {
  const [q, setQ] = useState("");
  const [safety, setSafety] = useState<SafetyLevel | "all">("all");
  const [activity, setActivity] = useState<string | "all">("all");
  const [budget, setBudget] = useState<"all" | "$" | "$$" | "$$$">("all");

  const results = useMemo(() => destinations.filter((d) => {
    if (safety !== "all" && d.safety !== safety) return false;
    if (activity !== "all" && !d.activity.includes(activity)) return false;
    if (budget !== "all" && d.budget !== budget) return false;
    if (q && !(d.name + d.country + d.region).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, safety, activity, budget]);

  return (
    <SiteShell>
      <PageHeader eyebrow="Discover" title="Destinations" description="Filter by safety, activity, budget or travel style. Hidden gems surface first." />
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div>
            <label htmlFor="q" className="font-mono text-[11px] uppercase text-muted-foreground">Search</label>
            <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Kigali, Lamu…" className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <fieldset>
            <legend className="font-mono text-[11px] uppercase text-muted-foreground">Safety</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(["all","safe","caution","unsafe"] as const).map((s) => (
                <button key={s} onClick={() => setSafety(s)} className={`rounded-full border px-2.5 py-0.5 text-xs capitalize transition-colors ${safety===s?"bg-foreground text-background":"hover:bg-secondary"}`}>{s}</button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-mono text-[11px] uppercase text-muted-foreground">Activity</legend>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <button onClick={() => setActivity("all")} className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${activity==="all"?"bg-foreground text-background":"hover:bg-secondary"}`}>All</button>
              {activities.map((a) => (
                <button key={a} onClick={() => setActivity(a)} className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${activity===a?"bg-foreground text-background":"hover:bg-secondary"}`}>{a}</button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-mono text-[11px] uppercase text-muted-foreground">Budget</legend>
            <div className="mt-2 flex gap-1.5">
              {(["all","$","$$","$$$"] as const).map((b) => (
                <button key={b} onClick={() => setBudget(b)} className={`rounded-md border px-2.5 py-0.5 text-xs font-mono transition-colors ${budget===b?"bg-foreground text-background":"hover:bg-secondary"}`}>{b}</button>
              ))}
            </div>
          </fieldset>
        </aside>

        <section aria-live="polite">
          <p className="font-mono text-[11px] uppercase text-muted-foreground mb-3">{results.length} destinations</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {results.map((d) => (
              <li key={d.id}>
                <article className="group h-full rounded-lg border p-5 hover:shadow-sm transition-all hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-[11px] uppercase text-muted-foreground">{d.country} · {d.region}</p>
                      <h3 className="mt-1 font-semibold group-hover:underline decoration-dotted underline-offset-4">{d.name}</h3>
                    </div>
                    <SafetyBadge level={d.safety} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{d.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase text-muted-foreground">
                    {d.activity.map((a) => <li key={a} className="rounded border px-1.5 py-0.5">{a}</li>)}
                    <li className="rounded border px-1.5 py-0.5">{d.budget}</li>
                    <li className="rounded border px-1.5 py-0.5">{d.category}</li>
                  </ul>
                </article>
              </li>
            ))}
            {results.length === 0 && (
              <li className="rounded-lg border p-8 text-center text-sm text-muted-foreground col-span-full">No matches. Try loosening a filter.</li>
            )}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}
