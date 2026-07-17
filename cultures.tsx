import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader } from "@/components/site-shell";
import { cultures } from "@/lib/data";

export const Route = createFileRoute("/cultures")({
  head: () => ({
    meta: [
      { title: "Culture Guides — Safari/OS" },
      { name: "description", content: "Language, greetings, etiquette, dress, food and history for cultures across Africa." },
    ],
  }),
  component: CulturesPage,
});

function CulturesPage() {
  const [active, setActive] = useState(cultures[0].slug);
  const current = cultures.find((c) => c.slug === active)!;

  return (
    <SiteShell>
      <PageHeader eyebrow="Cultures" title="Show up ready" description="Six starter culture guides — greetings, dress, food, faith and etiquette — so you arrive as a guest, not a tourist." />
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <nav aria-label="Cultures">
          <ul className="space-y-1">
            {cultures.map((c) => (
              <li key={c.slug}>
                <button
                  onClick={() => setActive(c.slug)}
                  className={`w-full text-left rounded-md px-3 py-2 text-sm transition-colors ${active===c.slug?"bg-secondary font-medium":"hover:bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  <span className="block">{c.name}</span>
                  <span className="block font-mono text-[10px] uppercase text-muted-foreground">{c.region}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <article key={current.slug} className="animate-fade-in space-y-8">
          <header>
            <p className="font-mono text-[11px] uppercase text-muted-foreground">{current.region}</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight">{current.name}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">{current.overview}</p>
          </header>

          <Section title="Greetings">
            <ul className="grid sm:grid-cols-3 gap-3">
              {current.greetings.map((g) => (
                <li key={g} className="rounded-md border p-3 font-mono text-sm">{g}</li>
              ))}
            </ul>
          </Section>

          <Section title="Etiquette">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {current.etiquette.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </Section>

          <div className="grid md:grid-cols-2 gap-8">
            <Section title="Dress">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {current.dress.map((d) => <li key={d}>{d}</li>)}
              </ul>
            </Section>
            <Section title="Religion">
              <p className="text-sm">{current.religion}</p>
            </Section>
            <Section title="Food to try">
              <ul className="flex flex-wrap gap-2">
                {current.food.map((f) => (
                  <li key={f} className="rounded-full border px-3 py-1 text-xs font-mono">{f}</li>
                ))}
              </ul>
            </Section>
            <Section title="Safety & respect">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {current.safety.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Section>
          </div>

          <Section title="Historical context">
            <p className="text-sm text-muted-foreground">{current.history}</p>
          </Section>
        </article>
      </div>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">{title}</h3>
      {children}
    </section>
  );
}
