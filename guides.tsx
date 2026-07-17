import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { guides, type Guide } from "@/lib/data";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Local Guides Marketplace — Safari/OS" },
      { name: "description", content: "Book verified local guides across African cities. Languages, expertise, availability and pricing up front." },
    ],
  }),
  component: GuidesPage,
});

function GuidesPage() {
  const [q, setQ] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [modal, setModal] = useState<Guide | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const list = useMemo(() => guides.filter((g) => {
    if (onlyVerified && !g.verified) return false;
    if (q && !(g.name + g.city + g.country + g.expertise.join(" ") + g.languages.join(" ")).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, onlyVerified]);

  return (
    <SiteShell>
      <PageHeader eyebrow="Marketplace" title="Verified local guides" description="Meet residents who know the neighborhoods, dialects and quiet corners maps never show." />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-wrap gap-3 items-center mb-6">
          <label className="sr-only" htmlFor="gq">Search</label>
          <input id="gq" placeholder="Search city, language, expertise…" value={q} onChange={(e) => setQ(e.target.value)} className="flex-1 min-w-[200px] rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} className="accent-foreground" />
            Verified only
          </label>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <li key={g.id}>
              <article className="h-full rounded-lg border p-5 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{g.name}</h3>
                    <p className="font-mono text-[11px] uppercase text-muted-foreground">{g.city} · {g.country}</p>
                  </div>
                  {g.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--info)]/40 bg-[color:var(--info)]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--info)]">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{g.bio}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <dt className="font-mono text-[10px] uppercase text-muted-foreground">Languages</dt>
                    <dd>{g.languages.join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase text-muted-foreground">Rating</dt>
                    <dd className="tabular-nums">★ {g.rating.toFixed(1)}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-mono text-[10px] uppercase text-muted-foreground">Expertise</dt>
                    <dd>{g.expertise.join(" · ")}</dd>
                  </div>
                </dl>
                <div className="mt-5 flex items-center justify-between border-t pt-4">
                  <span className="tabular-nums text-sm"><span className="font-semibold">${g.rate}</span> <span className="text-muted-foreground text-xs">/ half day</span></span>
                  <button
                    onClick={() => { setModal(g); setConfirmed(false); }}
                    className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 transition-opacity"
                  >
                    Request booking
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {modal && (
        <div role="dialog" aria-modal="true" aria-labelledby="bk-title" className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-lg border bg-background shadow-lg animate-scale-in">
            <div className="p-5 border-b">
              <p className="font-mono text-[11px] uppercase text-muted-foreground">Request a guide</p>
              <h2 id="bk-title" className="mt-1 text-lg font-semibold">{modal.name} · {modal.city}</h2>
            </div>
            {confirmed ? (
              <div className="p-5 text-sm space-y-4">
                <p>✓ Request sent. {modal.name} typically replies within 24h.</p>
                <button onClick={() => setModal(null)} className="w-full rounded-md border px-3 py-2 text-sm hover:bg-secondary">Close</button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setConfirmed(true); }}
                className="p-5 space-y-4 text-sm"
              >
                <label className="block">
                  <span className="font-mono text-[11px] uppercase text-muted-foreground">Dates</span>
                  <input required type="date" className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring" />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase text-muted-foreground">Travelers</span>
                  <input required type="number" min={1} defaultValue={2} className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring" />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase text-muted-foreground">What you want to see</span>
                  <textarea required rows={3} className="mt-1 w-full rounded-md border bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Street food night, historical tour…" />
                </label>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 rounded-md border px-3 py-2 hover:bg-secondary">Cancel</button>
                  <button type="submit" className="flex-1 rounded-md bg-foreground px-3 py-2 text-background hover:opacity-90">Send request</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </SiteShell>
  );
}
