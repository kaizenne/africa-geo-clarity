import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SafetyBadge } from "@/components/safety-badge";
import { destinations } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Safari/OS — Safe, culturally immersive tourism across Africa" },
      { name: "description", content: "Interactive safety heatmap, culture guides, verified local guides and multi-country itineraries. Travel Africa on your terms." },
      { property: "og:title", content: "Safari/OS — Travel Africa, safely" },
      { property: "og:description", content: "Real-time safety map, cultures wiki and verified local guides across 54 countries." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = destinations.slice(0, 6);
  return (
    <SiteShell>
      <section className="relative border-b overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Safari/OS · v0.1</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl">
            Travel Africa <span className="text-muted-foreground">— safely, respectfully, curiously.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            One place for a live safety heatmap, deep culture guides, verified local guides and multi-country
            itineraries — so a single headline never decides where you go.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/safety" className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity">
              Open safety map →
            </Link>
            <Link to="/destinations" className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary transition-colors">
              Discover destinations
            </Link>
          </div>
          <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {[
              ["54", "African countries"],
              ["~50%", "Global terror deaths in Sahel"],
              ["25–98%", "Tourist drops after single attacks"],
              ["6+", "Verified local guides at launch"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-lg border bg-card p-4">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{l}</dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Featured</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">Safer, lesser-known destinations</h2>
            </div>
            <Link to="/destinations" className="text-sm underline decoration-dotted underline-offset-4 hover:decoration-solid">
              View all →
            </Link>
          </div>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((d) => (
              <li key={d.id}>
                <article className="group h-full rounded-lg border p-5 hover:shadow-sm transition-all hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-[11px] uppercase text-muted-foreground">{d.country}</p>
                      <h3 className="mt-1 font-semibold group-hover:underline underline-offset-4 decoration-dotted">{d.name}</h3>
                    </div>
                    <SafetyBadge level={d.safety} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{d.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase text-muted-foreground">
                    {d.activity.map((a) => (
                      <li key={a} className="rounded border px-1.5 py-0.5">{a}</li>
                    ))}
                    <li className="rounded border px-1.5 py-0.5">{d.budget}</li>
                  </ul>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-8 md:grid-cols-3">
          {[
            { title: "Culture first", body: "Guides on greetings, dress, food and etiquette for 6+ cultures — with more added weekly.", to: "/cultures" as const },
            { title: "Verified locals", body: "Book vetted resident guides who unlock the parts of a city no map shows.", to: "/guides" as const },
            { title: "Route around risk", body: "Our planner builds multi-country itineraries that skip advisories and highlight open borders.", to: "/planner" as const },
          ].map((c) => (
            <Link key={c.title} to={c.to} className="group rounded-lg border p-6 hover:bg-secondary/50 transition-colors">
              <h3 className="font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              <span className="mt-4 inline-block font-mono text-xs text-muted-foreground group-hover:text-foreground">Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
