import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { proximityRoutes } from "@/lib/data";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Multi-country Africa Tour Planner — Safari/OS" },
      { name: "description", content: "Pick a starting country and generate a safer, multi-country itinerary that follows accessible transport and open borders." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const options = Object.keys(proximityRoutes);
  const [start, setStart] = useState<string>(options[0]);
  const [generated, setGenerated] = useState(false);
  const plan = proximityRoutes[start];

  return (
    <SiteShell>
      <PageHeader eyebrow="Planner" title="Route around risk, toward wonder" description="Pick a starting country. We suggest nearby safer stops with a route sequence." />
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-[300px_1fr]">
        <form
          onSubmit={(e) => { e.preventDefault(); setGenerated(true); }}
          className="rounded-lg border p-5 space-y-4 h-fit"
        >
          <label className="block">
            <span className="font-mono text-[11px] uppercase text-muted-foreground">Starting country</span>
            <select value={start} onChange={(e) => { setStart(e.target.value); setGenerated(false); }} className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="font-mono text-[11px] uppercase text-muted-foreground">Trip length</span>
            <input type="range" min={7} max={30} defaultValue={14} className="mt-2 w-full accent-foreground" />
            <span className="mt-1 block font-mono text-xs text-muted-foreground">7–30 days</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="accent-foreground" /> Prioritize lesser-known stops
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" defaultChecked className="accent-foreground" /> Skip Do Not Travel countries
          </label>
          <button type="submit" className="w-full rounded-md bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity">
            Generate itinerary
          </button>
        </form>

        <section aria-live="polite" className="space-y-6">
          <div className="rounded-lg border p-6">
            <p className="font-mono text-[11px] uppercase text-muted-foreground">Suggested countries</p>
            <ol className="mt-3 flex flex-wrap gap-2 items-center">
              {plan.countries.map((c, i) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="rounded-md border px-3 py-1.5 text-sm font-medium">{c}</span>
                  {i < plan.countries.length - 1 && <span aria-hidden className="text-muted-foreground">→</span>}
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <div className="border-b p-4 flex items-center justify-between">
              <h3 className="font-semibold">Route sequence</h3>
              <span className="font-mono text-[11px] text-muted-foreground">{plan.hops.length} legs</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left font-mono text-[11px] uppercase text-muted-foreground">
                <tr>
                  <th className="p-3">From</th>
                  <th className="p-3">To</th>
                  <th className="p-3">Via</th>
                  <th className="p-3 text-right">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {plan.hops.map((h, i) => (
                  <tr key={i} className="hover:bg-secondary/40 transition-colors">
                    <td className="p-3">{h.from}</td>
                    <td className="p-3">{h.to}</td>
                    <td className="p-3"><span className="font-mono text-xs rounded border px-1.5 py-0.5">{h.via}</span></td>
                    <td className="p-3 text-right tabular-nums">{h.hours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {generated && (
            <div className="rounded-lg border-2 border-dashed p-4 text-sm animate-fade-in">
              ✓ Saved plan preview. In production, this saves to your profile and syncs to the Booking page.
            </div>
          )}
        </section>
      </div>
    </SiteShell>
  );
}
