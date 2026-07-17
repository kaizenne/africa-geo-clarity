import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  House,
  Compass,
  GlobeSimple,
  MagnifyingGlass,
  CaretDown,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  WarningCircle,
  Warning,
  CheckCircle,
  Info,
  XCircle,
} from "@phosphor-icons/react";
import ScenicBackground from "./components/ScenicBackground";
import {
  destinations,
  countryMapData,
  SAFETY_TIERS,
  HERO_STATS,
  safeGenericImages,
  getDestinationById,
  type Destination,
  type SafetyTier,
} from "./data/travelData";

type Tab = "home" | "discover" | "map";

const SANKOFA_GOLD = "#d4af37";

function SafetyBadge({ tier }: { tier: SafetyTier }) {
  const config = SAFETY_TIERS[tier];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide"
      style={{
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.color}33`,
      }}
    >
      {tier === "L1" && <CheckCircle size={14} weight="fill" />}
      {tier === "L2" && <Info size={14} weight="fill" />}
      {tier === "L3" && <WarningCircle size={14} weight="fill" />}
      {tier === "L4" && <Warning size={14} weight="fill" />}
      {config.label}
    </span>
  );
}

function DestinationCard({
  dest,
  onClick,
}: {
  dest: Destination;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden group text-left"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img
        src={dest.imageUrl}
        alt={dest.city}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/90 via-[#0b0b0b]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <SafetyBadge tier={dest.tier} />
        <h3 className="text-white text-xl font-light mt-3 tracking-wide">
          {dest.city}
        </h3>
        <p className="text-white/60 text-sm mt-1">{dest.country}</p>
      </div>
    </motion.button>
  );
}

function DestinationDetail({
  dest,
  onBack,
}: {
  dest: Destination;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full"
    >
      <ScenicBackground
        src={dest.imageUrl}
        alt={`${dest.city}, ${dest.country}`}
        className="min-h-[100dvh]"
      >
        <div className="flex flex-col min-h-[100dvh]">
          {/* Back button */}
          <div className="p-6">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm tracking-widest uppercase"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-end px-6 pb-24 max-w-3xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <SafetyBadge tier={dest.tier} />
              <h1 className="text-4xl md:text-6xl font-light text-white mt-4 tracking-wide">
                {dest.city}
              </h1>
              <p className="text-white/50 text-lg mt-1 tracking-widest uppercase text-sm">
                {dest.country} &middot; {dest.region}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-white/80 text-lg mt-6 leading-relaxed max-w-2xl"
            >
              {dest.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 p-5 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
            >
              <p className="text-white/90 text-base leading-relaxed">
                <span className="font-medium text-white">Verdict: </span>
                {dest.verdict}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-6 p-5 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
            >
              <p className="text-white/70 text-sm leading-relaxed">
                <span className="text-[#d4af37] font-medium">{">"} </span>
                {dest.distanceToHighRisk}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2">
                  Myth
                </p>
                <p className="text-white/80 text-sm">{dest.mythVsReality.myth}</p>
              </div>
              <div className="p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10">
                <p className="text-[#d4af37]/70 text-xs uppercase tracking-widest mb-2">
                  Reality
                </p>
                <p className="text-white/80 text-sm">
                  {dest.mythVsReality.reality}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </ScenicBackground>
    </motion.div>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const featured = destinations.filter((d) => d.featured);

  return (
    <AnimatePresence mode="wait">
      {selectedDest ? (
        <DestinationDetail
          key="detail"
          dest={selectedDest}
          onBack={() => setSelectedDest(null)}
        />
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Hero Section */}
          <ScenicBackground
            src={safeGenericImages[0]}
            alt="African savanna sunset"
            className="min-h-[100dvh] flex items-center"
            priority
          >
            <div className="flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4">
                  Sankofa
                </p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.95] tracking-tight">
                  Africa.
                  <br />
                  <span className="italic font-thin">See it clearly.</span>
                </h1>
                <p className="text-white/60 text-lg md:text-xl mt-6 max-w-xl leading-relaxed font-light">
                  Risk is local - and most of it isn't where you're going.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <button
                    onClick={() => onNavigate("discover")}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0b0b0b] rounded-full text-sm font-medium tracking-wide hover:bg-white/90 transition-all"
                  >
                    Where do you want to go?
                    <ArrowRight size={18} weight="bold" />
                  </button>
                  <button
                    onClick={() => onNavigate("map")}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full text-sm font-medium tracking-wide hover:bg-white/10 transition-all"
                  >
                    View the risk map
                  </button>
                </div>
              </motion.div>
            </div>
          </ScenicBackground>

          {/* Stats Section */}
          <section className="bg-[#0b0b0b] px-6 py-32">
            <div className="max-w-6xl mx-auto space-y-32">
              {HERO_STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-white/10 pt-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-6xl md:text-7xl font-light text-white tracking-tight">
                        {stat.value}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-2xl md:text-3xl font-light text-white/90 leading-tight">
                        {stat.label}
                      </p>
                      <p className="text-white/40 text-lg mt-3 font-light">
                        {stat.context}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Featured Destinations */}
          <section className="bg-[#0b0b0b] px-6 pb-32">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <p className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-3">
                  Safe & Thriving Now
                </p>
                <h2 className="text-3xl md:text-4xl font-light text-white">
                  Destinations worth exploring
                </h2>
              </motion.div>
              <div className="flex gap-6 overflow-x-auto pb-6 -mx-6 px-6 snap-x snap-mandatory scrollbar-none">
                {featured.map((dest) => (
                  <div key={dest.id} className="snap-start">
                    <DestinationCard
                      dest={dest}
                      onClick={() => setSelectedDest(dest)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative min-h-[60dvh] flex items-center">
            <ScenicBackground
              src={safeGenericImages[2]}
              alt="African landscape"
              className="absolute inset-0"
            >
              <div className="flex flex-col items-center justify-center min-h-[60dvh] px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4">
                    Ready to discover
                  </p>
                  <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
                    The real Africa is waiting.
                  </h2>
                  <p className="text-white/60 text-lg mt-4 max-w-md mx-auto">
                    Most of the continent is safer than you think. Start exploring.
                  </p>
                  <button
                    onClick={() => onNavigate("discover")}
                    className="inline-flex items-center gap-2 px-8 py-4 mt-8 bg-white text-[#0b0b0b] rounded-full text-sm font-medium tracking-wide hover:bg-white/90 transition-all"
                  >
                    Find your destination
                    <ArrowRight size={18} weight="bold" />
                  </button>
                </motion.div>
              </div>
            </ScenicBackground>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DiscoverScreen() {
  const [query, setQuery] = useState("");
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = query
    ? destinations.filter(
        (d) =>
          d.city.toLowerCase().includes(query.toLowerCase()) ||
          d.country.toLowerCase().includes(query.toLowerCase())
      )
    : destinations;

  const handleSelect = useCallback((dest: Destination) => {
    setSelectedDest(dest);
    setQuery("");
    setShowDropdown(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {selectedDest ? (
        <DestinationDetail
          key="detail"
          dest={selectedDest}
          onBack={() => setSelectedDest(null)}
        />
      ) : (
        <motion.div
          key="discover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-[100dvh] bg-[#0b0b0b]"
        >
          {/* Search Section */}
          <ScenicBackground
            src={safeGenericImages[3]}
            alt="African landscape"
            className="min-h-[50dvh] flex items-end"
          >
            <div className="w-full px-6 pb-16 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-3">
                  Discover
                </p>
                <h1 className="text-4xl md:text-5xl font-light text-white mb-8">
                  Where do you want to go?
                </h1>
                <div className="relative">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl rounded-2xl px-5 py-4 border border-white/10 focus-within:border-white/30 transition-all">
                    <MagnifyingGlass size={20} className="text-white/40" />
                    <input
                      type="text"
                      placeholder="Search by city or country..."
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      className="flex-1 bg-transparent text-white placeholder-white/40 text-lg outline-none font-light"
                    />
                    <CaretDown
                      size={18}
                      className={`text-white/40 transition-transform cursor-pointer ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                      onClick={() => setShowDropdown(!showDropdown)}
                    />
                  </div>

                  <AnimatePresence>
                    {showDropdown && filtered.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden z-50 max-h-80 overflow-y-auto"
                      >
                        {filtered.map((dest) => (
                          <button
                            key={dest.id}
                            onClick={() => handleSelect(dest)}
                            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors text-left"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={dest.imageUrl}
                                alt={dest.city}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium">
                                {dest.city}
                              </p>
                              <p className="text-white/40 text-sm">
                                {dest.country}
                              </p>
                            </div>
                            <SafetyBadge tier={dest.tier} />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </ScenicBackground>

          {/* All Destinations Grid */}
          <section className="px-6 py-20 max-w-6xl mx-auto">
            <div className="mb-10">
              <h2 className="text-2xl font-light text-white">
                All destinations
              </h2>
              <p className="text-white/40 mt-1">
                {destinations.length} destinations across Africa
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest) => (
                <motion.button
                  key={dest.id}
                  onClick={() => handleSelect(dest)}
                  className="relative h-72 rounded-2xl overflow-hidden group text-left"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={dest.imageUrl}
                    alt={dest.city}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/90 via-[#0b0b0b]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <SafetyBadge tier={dest.tier} />
                    <h3 className="text-white text-xl font-light mt-3">
                      {dest.city}
                    </h3>
                    <p className="text-white/50 text-sm mt-0.5">
                      {dest.country}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LiveMapScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const selectedCountryData = selectedCountry
    ? countryMapData.find((c) => c.id === selectedCountry)
    : null;

  const selectedDestinations = selectedCountryData
    ? selectedCountryData.destinations
        .map((id) => getDestinationById(id))
        .filter(Boolean)
    : [];

  const getTierColor = (tier: SafetyTier) => {
    switch (tier) {
      case "L1":
        return "#22c55e";
      case "L2":
        return "#3b82f6";
      case "L3":
        return "#f97316";
      case "L4":
        return "#ef4444";
    }
  };

  const getTierFill = (tier: SafetyTier, hovered: boolean, selected: boolean) => {
    const base = getTierColor(tier);
    if (selected) return `${base}99`;
    if (hovered) return `${base}66`;
    return `${base}33`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[100dvh] bg-[#0b0b0b] flex flex-col"
    >
      {/* Map Header */}
      <div className="px-6 pt-24 pb-6">
        <p className="text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-3">
          Live Risk Map
        </p>
        <h1 className="text-4xl md:text-5xl font-light text-white">
          Risk is concentrated,
          <br />
          <span className="italic font-thin">not continental.</span>
        </h1>
      </div>

      {/* Map Container */}
      <div className="flex-1 flex flex-col lg:flex-row items-start gap-8 px-6 pb-12">
        <div className="w-full lg:w-2/3 flex justify-center">
          <svg
            viewBox="50 40 380 480"
            className="w-full max-w-lg h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {countryMapData.map((country) => {
              const isHovered = hoveredCountry === country.id;
              const isSelected = selectedCountry === country.id;
              return (
                <g key={country.id}>
                  {/* Shadow path */}
                  <path
                    d={country.path}
                    fill="none"
                    className="pointer-events-none"
                    filter={isHovered || isSelected ? "url(#glow)" : undefined}
                    opacity={isHovered || isSelected ? 0.5 : 0}
                  />
                  {/* Main path */}
                  <path
                    d={country.path}
                    fill={getTierFill(country.tier, isHovered, isSelected)}
                    stroke={getTierColor(country.tier)}
                    strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.5}
                    strokeOpacity={isSelected ? 1 : 0.7}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredCountry(country.id)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() =>
                      setSelectedCountry(
                        selectedCountry === country.id ? null : country.id
                      )
                    }
                  />
                  {/* Country label */}
                  <text
                    x={country.centerX}
                    y={country.centerY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={
                      isSelected
                        ? "#ffffff"
                        : isHovered
                        ? "#ffffffcc"
                        : "#ffffff88"
                    }
                    fontSize={isSelected ? 11 : 9}
                    fontWeight={isSelected ? "600" : "300"}
                    className="pointer-events-none select-none transition-all duration-300"
                    fontFamily="system-ui, sans-serif"
                  >
                    {country.name}
                  </text>
                  {/* Tier dot */}
                  <circle
                    cx={country.centerX}
                    cy={country.centerY + 14}
                    r={3}
                    fill={getTierColor(country.tier)}
                    opacity={isSelected || isHovered ? 1 : 0.6}
                    className="pointer-events-none"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-1/3 space-y-6">
          {/* Legend */}
          <div className="p-5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">
              Risk Legend
            </p>
            <div className="space-y-3">
              {(Object.keys(SAFETY_TIERS) as SafetyTier[]).map((tier) => {
                const config = SAFETY_TIERS[tier];
                return (
                  <div key={tier} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="text-white/70 text-sm">
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Country Detail */}
          <AnimatePresence mode="wait">
            {selectedCountryData && selectedDestinations.length > 0 ? (
              <motion.div
                key={selectedCountry}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <p className="text-white/50 text-xs uppercase tracking-widest mb-3">
                  What's Happening Here
                </p>
                <h3 className="text-white text-xl font-light mb-2">
                  {selectedCountryData.name}
                </h3>
                <SafetyBadge tier={selectedCountryData.tier} />
                {selectedDestinations.map((dest) => {
                  if (!dest) return null;
                  return (
                    <div key={dest.id} className="mt-4">
                      <p className="text-white/80 text-sm leading-relaxed">
                        {dest.verdict}
                      </p>
                      <p className="text-white/50 text-xs mt-3">
                        Tourism:{" "}
                        <span
                          className={
                            dest.tourismStatus === "open"
                              ? "text-[#22c55e]"
                              : dest.tourismStatus === "limited"
                              ? "text-[#f97316]"
                              : "text-[#ef4444]"
                          }
                        >
                          {dest.tourismStatus === "open"
                            ? "Open for tourism"
                            : dest.tourismStatus === "limited"
                            ? "Limited access"
                            : "Closed for tourism"}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <p className="text-white/40 text-sm">
                  Tap a country on the map to see its current safety status and
                  travel advisory information.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: "home" as Tab, label: "Home", icon: House },
    { id: "discover" as Tab, label: "Discover", icon: Compass },
    { id: "map" as Tab, label: "Live Map", icon: GlobeSimple },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#0b0b0b] text-white">
      {/* Sticky Glassmorphic Nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0b0b0b]/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 h-16 md:h-20 max-w-7xl mx-auto">
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2"
          >
            <span className="text-[#d4af37] text-sm tracking-[0.3em] uppercase font-light">
              Sankofa
            </span>
          </button>

          <div className="flex items-center gap-1 md:gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 md:px-5 py-2 rounded-full text-sm transition-all ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} weight={isActive ? "fill" : "regular"} />
                  <span className="hidden md:inline text-xs tracking-wide">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <HomeScreen key="home" onNavigate={setActiveTab} />
          )}
          {activeTab === "discover" && <DiscoverScreen key="discover" />}
          {activeTab === "map" && <LiveMapScreen key="map" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b0b0b] border-t border-white/5 px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/30 text-sm tracking-wide">
            Sankofa - built by VibeCode Africa. Look back to move forward.
          </p>
          <p className="text-white/20 text-xs mt-2">
            &copy; {new Date().getFullYear()} Sankofa. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}