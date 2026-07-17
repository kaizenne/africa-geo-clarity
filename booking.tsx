import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader } from "@/components/site-shell";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Compare flights & stays — Safari/OS" },
      { name: "description", content: "Compare flights, hotels and Airbnb options across Africa and continue to booking via trusted partners." },
    ],
  }),
  component: BookingPage,
});

type Row = { id: string; provider: string; kind: "Flight" | "Hotel" | "Airbnb"; detail: string; price: number; rating: number; link: string };

const rows: Row[] = [
  { id: "b1", provider: "Ethiopian Airlines", kind: "Flight", detail: "JFK → ADD, 1 stop, 14h 20m", price: 890, rating: 4.5, link: "https://www.ethiopianairlines.com" },
  { id: "b2", provider: "Kenya Airways", kind: "Flight", detail: "LHR → NBO, direct, 8h 40m", price: 720, rating: 4.3, link: "https://www.kenya-airways.com" },
  { id: "b3", provider: "Royal Air Maroc", kind: "Flight", detail: "CDG → DKR via CMN, 9h 55m", price: 610, rating: 4.1, link: "https://www.royalairmaroc.com" },
  { id: "b4", provider: "Ellerman House", kind: "Hotel", detail: "Cape Town · Atlantic seaboard", price: 780, rating: 4.9, link: "#" },
  { id: "b5", provider: "Riad Yasmine", kind: "Hotel", detail: "Marrakech medina · pool riad", price: 210, rating: 4.8, link: "#" },
  { id: "b6", provider: "Airbnb", kind: "Airbnb", detail: "Kigali · hilltop 2BR with view", price: 95, rating: 4.7, link: "https://www.airbnb.com" },
  { id: "b7", provider: "Airbnb", kind: "Airbnb", detail: "Dakar · Almadies beachfront studio", price: 65, rating: 4.6, link: "https://www.airbnb.com" },
];

function BookingPage() {
  const [kind, setKind] = useState<"all" | Row["kind"]>("all");
  const [sort, setSort] = useState<"price" | "rating">("price");

  const filtered = rows
    .filter((r) => kind === "all" || r.kind === kind)
    .sort((a, b) => sort === "price" ? a.price - b.price : b.rating - a.rating);

  return (
    <SiteShell>
      <PageHeader eyebrow="Booking" title="Compare flights, hotels and stays" description="MVP compares curated options and hands off to trusted partners. Full API integrations land next." />
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div role="tablist" className="flex rounded-md border overflow-hidden font-mono text-xs">
            {(["all","Flight","Hotel","Airbnb"] as const).map((k) => (
              <button key={k} role="tab" aria-selected={kind===k} onClick={() => setKind(k)} className={`px-3 py-1.5 transition-colors ${kind===k?"bg-foreground text-background":"hover:bg-secondary"}`}>{k}</button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <label htmlFor="sort" className="font-mono text-[11px] uppercase text-muted-foreground">Sort</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as "price"|"rating")} className="rounded-md border bg-background px-2 py-1 text-sm">
              <option value="price">Price ↑</option>
              <option value="rating">Rating ↓</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left font-mono text-[11px] uppercase text-muted-foreground">
              <tr>
                <th className="p-3">Provider</th>
                <th className="p-3">Type</th>
                <th className="p-3">Details</th>
                <th className="p-3 text-right">Rating</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="p-3 font-medium">{r.provider}</td>
                  <td className="p-3"><span className="font-mono text-xs rounded border px-1.5 py-0.5">{r.kind}</span></td>
                  <td className="p-3 text-muted-foreground">{r.detail}</td>
                  <td className="p-3 text-right tabular-nums">★ {r.rating.toFixed(1)}</td>
                  <td className="p-3 text-right tabular-nums font-semibold">${r.price}</td>
                  <td className="p-3 text-right">
                    <a href={r.link} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs hover:bg-secondary transition-colors">
                      Book ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-mono text-[11px] text-muted-foreground">External links are placeholder partner handoffs for MVP.</p>
      </div>
    </SiteShell>
  );
}
