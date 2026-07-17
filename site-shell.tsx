import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const nav = [
  { to: "/explore", label: "Explore" },
  { to: "/safety", label: "Safety Map" },
  { to: "/destinations", label: "Destinations" },
  { to: "/cultures", label: "Cultures" },
  { to: "/guides", label: "Guides" },
  { to: "/planner", label: "Planner" },
  { to: "/booking", label: "Booking" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
          <Link to="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
            <span aria-hidden className="inline-block h-4 w-4 rotate-45 bg-foreground" />
            SAFARI/OS
          </Link>
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 text-sm">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "bg-secondary text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-foreground hover:bg-secondary" }}
                className="rounded-md px-3 py-1.5 transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground">v0.1 · MVP</span>
            <Link
              to="/planner"
              className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              Plan a trip →
            </Link>
          </div>
        </div>
        <nav aria-label="Mobile" className="md:hidden border-t overflow-x-auto">
          <ul className="flex gap-1 px-3 py-2 text-xs font-mono whitespace-nowrap">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  activeProps={{ className: "bg-secondary text-foreground" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="rounded-md px-2 py-1"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main" className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Safari/OS. Culturally immersive, safety-first tourism across Africa.</p>
          <p className="font-mono">Data: US State Dept · UK FCDO · GTI 2025 · Reuters</p>
        </div>
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {eyebrow && <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{eyebrow}</p>}
        <div className="mt-2 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
            {description && <p className="mt-3 text-muted-foreground">{description}</p>}
          </div>
          {children && <div className="flex flex-wrap gap-2">{children}</div>}
        </div>
      </div>
    </section>
  );
}
