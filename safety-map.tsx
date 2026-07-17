import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { incidents, type Incident, type SafetyLevel } from "@/lib/data";
import { SafetyBadge } from "./safety-badge";

const levelColor: Record<SafetyLevel, string> = {
  safe: "#16a34a",
  caution: "#f59e0b",
  unsafe: "#dc2626",
};

function HeatLayer({ points }: { points: Incident[] }) {
  const map = useMap();
  useEffect(() => {
    // @ts-expect-error leaflet.heat has no types
    const layer = L.heatLayer(
      points.map((p) => [p.lat, p.lng, p.intensity]),
      {
        radius: 45,
        blur: 35,
        maxZoom: 6,
        gradient: { 0.2: "#16a34a", 0.45: "#f59e0b", 0.75: "#ef4444", 1.0: "#7f1d1d" },
      },
    ).addTo(map);
    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);
  return null;
}

export function SafetyMap({ filter }: { filter?: SafetyLevel | "all" }) {
  const [selected, setSelected] = useState<Incident | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const visible = filter && filter !== "all" ? incidents.filter((i) => i.level === filter) : incidents;

  return (
    <div className="grid gap-4 md:grid-cols-[1fr_320px]">
      <div className="relative h-[520px] overflow-hidden rounded-lg border">
        <MapContainer
          center={[3, 20]}
          zoom={3}
          minZoom={2}
          scrollWheelZoom
          style={{ height: "100%", width: "100%", background: "var(--color-muted)" }}
          ref={(m) => {
            if (m) mapRef.current = m;
          }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <HeatLayer points={visible} />
          {visible.map((i) => (
            <CircleMarker
              key={i.id}
              center={[i.lat, i.lng]}
              radius={6}
              pathOptions={{ color: levelColor[i.level], fillColor: levelColor[i.level], fillOpacity: 0.9, weight: 2 }}
              eventHandlers={{
                click: () => setSelected(i),
              }}
            >
              <Popup>
                <strong>{i.region}, {i.country}</strong>
                <br />
                <span className="text-xs">{i.what}</span>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border bg-background/95 backdrop-blur px-3 py-2 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Legend</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-green-600" />Safe</span>
            <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-amber-500" />Caution</span>
            <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-red-600" />Avoid</span>
          </div>
        </div>
      </div>

      <aside aria-live="polite" className="rounded-lg border p-4 h-[520px] overflow-y-auto">
        {selected ? (
          <article className="space-y-3 animate-fade-in">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-[11px] uppercase text-muted-foreground">{selected.country}</p>
                <h3 className="font-semibold">{selected.region}</h3>
              </div>
              <SafetyBadge level={selected.level} />
            </div>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="font-mono text-[11px] uppercase text-muted-foreground">What happened</dt>
                <dd>{selected.what}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase text-muted-foreground">Why it matters</dt>
                <dd>{selected.why}</dd>
              </div>
              <div className="flex gap-6">
                <div>
                  <dt className="font-mono text-[11px] uppercase text-muted-foreground">Date</dt>
                  <dd className="font-mono text-xs">{selected.date}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase text-muted-foreground">Source</dt>
                  <dd>
                    <a href={selected.sourceUrl} target="_blank" rel="noreferrer noopener" className="underline decoration-dotted underline-offset-4 hover:decoration-solid">
                      {selected.source} ↗
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
            <button
              onClick={() => setSelected(null)}
              className="w-full rounded-md border px-3 py-1.5 text-xs hover:bg-secondary transition-colors"
            >
              Clear selection
            </button>
          </article>
        ) : (
          <div className="text-sm text-muted-foreground space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-widest">Select an area</p>
            <p>Click any point on the map to see what happened, current risk, the date and the source.</p>
            <hr />
            <p className="text-xs">Africa hosts nine of the world's Do Not Travel countries and the Sahel accounts for ~half of global terrorism deaths — but most of the continent remains open and safe.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
