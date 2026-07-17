import type { SafetyLevel } from "@/lib/data";

const styles: Record<SafetyLevel, string> = {
  safe: "border-[color:var(--success)]/40 text-[color:var(--success)] bg-[color:var(--success)]/10",
  caution: "border-[color:var(--warning)]/40 text-[color:var(--warning)] bg-[color:var(--warning)]/10",
  unsafe: "border-[color:var(--danger)]/40 text-[color:var(--danger)] bg-[color:var(--danger)]/10",
};

const labels: Record<SafetyLevel, string> = {
  safe: "Safe to explore",
  caution: "Use caution",
  unsafe: "Avoid",
};

export function SafetyBadge({ level, className = "" }: { level: SafetyLevel; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${styles[level]} ${className}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[level]}
    </span>
  );
}
