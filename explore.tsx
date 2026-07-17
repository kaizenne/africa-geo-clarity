import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { SafetyBadge } from "@/components/safety-badge";
import { destinations, incidents, cultures, guides, type Destination, type Incident, type CultureGuide, type Guide, type SafetyLevel } from "@/lib/data";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Search any place, experience or vibe · Safari/OS" },
      { name: "description", content: "Type a word — country, city, activity or vibe — and get a one-glance card: popular sights, hidden gems, safety risks and experiences to book." },
    ],
  }),
  component: ExplorePage,
});

interface Snapshot {
  query: string;
  matched: Destination[];
  popular: Destination[];
  hidden: Destination[];
  incidents: Incident[];
  culture?: CultureGuide;
  guides: Guide[];
  region: string;
  countries: string[];
  overallSafety: SafetyLevel;
  activities: string[];
}


function buildSnapshot(qRaw: string): Snapshot | null {
  const q = qRaw.trim().toLowerCase();
  if (!q) return null;

  const matches = (s: string) => s.toLowerCase().includes(q);

  const matched = destinations.filter((d) =>
    matches(d.name) || matches(d.country) || matches(d.region) ||
    d.activity.some(matches) || d.style.some(matches) || matches(d.blurb) || matches(d.category),
  );

  if (matched.length === 0) return null;

  const countries = Array.from(new Set(matched.map((d) => d.country)));
  const regions = Array.from(new Set(matched.map((d) => d.region)));
  const region = regions[0] ?? "Africa";

  const inScope = destinations.filter((d) => countries.includes(d.country) || regions.includes(d.region));
  const popular = inScope.filter((d) => d.category === "popular").slice(0, 4);
  const hidden = inScope.filter((d) => d.category !== "popular").slice(0, 4);

  const relevantIncidents = incidents.filter((i) => countries.includes(i.country) || regions.some((r) => i.region.toLowerCase().includes(r.toLowerCase().split(" ")[0])));

  const worst: SafetyLevel = relevantIncidents.some((i) => i.level === "unsafe")
    ? "unsafe"
    : relevantIncidents.some((i) => i.level === "caution")
      ? "caution"
      : "safe";

  const culture = cultures.find((c) => countries.some((co) => matches(c.name) || matches(c.region) || c.overview.toLowerCase().includes(co.toLowerCase())))
    ?? cultures.find((c) => matches(c.name) || matches(c.region));

  const relatedGuides = guides.filter((g) => countries.includes(g.country) || matches(g.city) || g.expertise.some(matches)).slice(0, 3);

  const allActivities = Array.from(new Set(inScope.flatMap((d) => d.activity)));

  return {
    query: qRaw.trim(),
    matched,
    popular,
    hidden,
    incidents: relevantIncidents.slice(0, 4),
    culture,
    guides: relatedGuides,
    region,
    countries,
    overallSafety: worst,
    activities: allActivities,
  };
}

const suggestions = ["Rwanda", "Beach", "Culture", "Senegal", "Wildlife", "Hidden gem", "Namibia"];

function ExplorePage() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const snapshot = useMemo(() => buildSnapshot(query), [query]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(input);
  };

  const runSuggestion = (s: string) => {
    setInput(s);
    setQuery(s);
  };

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Explore"
        title="One search. One card. Everywhere in Africa."
        description="Type a country, city, activity or vibe. We'll pull together popular sights, hidden gems, live safety notes and experiences you can actually book."
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <form onSubmit={submit} className="flex gap-2">
          <label className="sr-only" htmlFor="explore-q">Search</label>
          <input
            id="explore-q"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try 'Rwanda', 'Swahili coast', 'hidden beach'…"
            className="flex-1 rounded-md border bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button type="submit" className="rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90 transition-opacity">
            Search
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-[11px] uppercase text-muted-foreground">Try</span>
          {suggestions.map((s) => (
            <button key={s} onClick={() => runSuggestion(s)} className="rounded-full border px-2.5 py-0.5 hover:bg-secondary transition-colors">
              {s}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {!query && <EmptyState />}
          {query && !snapshot && <NoMatch q={query} />}
          {snapshot && <SnapshotCard s={snapshot } />}
        </div>
      </div>
    </SiteShell>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border-2 border-dashed p-10 text-center dot-bg">
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Awaiting input</p>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">Every search returns a single card summarizing a region — the famous stops, the quiet ones, safety notes with sources, and local guides.</p>
    </div>
  );
}

function NoMatch({ q }: { q: string }) {
  return (
    <div className="rounded-lg border p-8 text-center">
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">No result</p>
      <h2 className="mt-2 text-lg font-semibold">Nothing yet for "{q}"</h2>
      <p className="mt-2 text-sm text-muted-foreground">Try a country (Kenya), region (Sahel), or activity (wildlife, music, beach).</p>
    </div>
  );
}

function SnapshotCard({ s }: { s: Snapshot }) {
  return (
    <article className="rounded-xl border shadow-sm overflow-hidden animate-fade-in">
      <header className="border-b p-6 bg-secondary/40">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Snapshot · "{s.query}"</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{s.countries.join(" · ")}</h2>
            <p className="text-sm text-muted-foreground">{s.region}</p>
          </div>
          <SafetyBadge level={s.overallSafety} />
        </div>
        {s.activities.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase text-muted-foreground">
            {s.activities.slice(0, 8).map((a) => <li key={a} className="rounded border bg-background px-1.5 py-0.5">{a}</li>)}
          </ul>
        )}
      </header>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        <Section title="Popular tourist stops" empty="No mainstream stops in results.">
          {s.popular.length > 0 && (
            <ul className="space-y-3">
              {s.popular.map((d) => <MiniDest key={d.id} d={d} />)}
            </ul>
          )}
        </Section>
        <Section title="Hidden gems & lesser-known" empty="No hidden gems in results.">
          {s.hidden.length > 0 && (
            <ul className="space-y-3">
              {s.hidden.map((d) => <MiniDest key={d.id} d={d} />)}
            </ul>
          )}
        </Section>
      </div>

      <div className="border-t p-6">
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Safety & things to consider</h3>
        {s.incidents.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active advisories tied to this search. Standard precautions apply.</p>
        ) : (
          <ul className="space-y-2">
            {s.incidents.map((i) => (
              <li key={i.id} className="flex items-start gap-3 rounded-md border p-3 text-sm">
                <SafetyBadge level={i.level} className="shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p><span className="font-medium">{i.region}, {i.country}</span> — {i.what}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {i.why} · <a href={i.sourceUrl} target="_blank" rel="noreferrer noopener" className="underline decoration-dotted underline-offset-2 hover:decoration-solid">{i.source}</a> · <span className="font-mono">{i.date}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {(s.culture || s.guides.length > 0) && (
        <div className="grid md:grid-cols-2 border-t divide-y md:divide-y-0 md:divide-x">
          {s.culture && (
            <Section title={`Culture · ${s.culture.name}`}>
              <p className="text-sm text-muted-foreground">{s.culture.overview}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px]">
                {s.culture.greetings.slice(0, 3).map((g) => (
                  <li key={g} className="rounded border px-1.5 py-0.5">{g}</li>
                ))}
              </ul>
            </Section>
          )}
          {s.guides.length > 0 && (
            <Section title="Experiences with locals">
              <ul className="space-y-2">
                {s.guides.map((g) => (
                  <li key={g.id} className="flex items-center justify-between text-sm">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{g.name} <span className="text-muted-foreground font-normal">· {g.city}</span></p>
                      <p className="text-xs text-muted-foreground truncate">{g.expertise.join(" · ")}</p>
                    </div>
                    <span className="tabular-nums text-xs shrink-0 ml-3">${g.rate}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      )}
    </article>
  );
}

function Section({ title, children, empty }: { title: string; children?: React.ReactNode; empty?: string }) {
  const isEmpty = !children || (Array.isArray(children) && children.length === 0);
  return (
    <section className="p-6">
      <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">{title}</h3>
      {isEmpty ? <p className="text-sm text-muted-foreground">{empty}</p> : children}
    </section>
  );
}

function MiniDest({ d }: { d: Destination }) {
  return (
    <li>
      <article className="group rounded-md border p-3 hover:bg-secondary/50 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{d.country}</p>
            <p className="font-medium truncate">{d.name}</p>
          </div>
          <SafetyBadge level={d.safety} />
        </div>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{d.blurb}</p>
      </article>
    </li>
  );
}
