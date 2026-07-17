// Sankofa - Africa Travel Truth: Static Data Layer
// Zero em-dashes. All punctuation uses hyphens or periods.

export type SafetyTier = "L1" | "L2" | "L3" | "L4";

export interface Destination {
  id: string;
  city: string;
  country: string;
  region: string;
  tier: SafetyTier;
  label: string;
  description: string;
  verdict: string;
  mythVsReality: { myth: string; reality: string };
  distanceToHighRisk: string;
  imageUrl: string;
  imagePrompt: string;
  coordinates: { lat: number; lng: number };
  tourismStatus: "open" | "limited" | "closed";
  featured: boolean;
}

export interface CountryMapData {
  id: string;
  name: string;
  path: string; // SVG path
  tier: SafetyTier;
  centerX: number;
  centerY: number;
  destinations: string[]; // destination IDs
}

export const SAFETY_TIERS = {
  L1: { label: "Level 1: Safe & Welcoming", color: "#22c55e", bg: "rgba(34,197,94,0.15)" },
  L2: { label: "Level 2: Standard Caution", color: "#3b82f6", bg: "rgba(59,130,246,0.15)" },
  L3: { label: "Level 3: Reconsider Travel", color: "#f97316", bg: "rgba(249,115,22,0.15)" },
  L4: { label: "Level 4: Do Not Travel", color: "#ef4444", bg: "rgba(239,68,68,0.15)" },
} as const;

export const HERO_STATS = [
  {
    value: "1.7%",
    label: "Africa's real infrastructure investment loss rate",
    context: "vs 13% Latin America and 10% Eastern Europe",
  },
  {
    value: "5%",
    label: "Of global tourists visit Africa",
    context: "A perception problem, not a product problem",
  },
  {
    value: "81M",
    label: "Visitors expected in 2025",
    context: "The world's fastest-growing tourism region",
  },
];

export const destinations: Destination[] = [
  {
    id: "accra",
    city: "Accra",
    country: "Ghana",
    region: "West Africa",
    tier: "L1",
    label: "Safe & Welcoming",
    description: "A vibrant coastal capital with rich history, lively markets, and welcoming hospitality.",
    verdict: "Accra is a safe, thriving hub for business and tourism with a rapidly growing creative scene.",
    mythVsReality: {
      myth: "West Africa is too dangerous for travel.",
      reality: "Accra ranks safer than many US and European cities, with a strong community policing presence.",
    },
    distanceToHighRisk: "Accra is over 1,200km from any high-risk zone - farther than London to Berlin.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Accra Ghana coastline at sunset, modern skyline, palm trees",
    coordinates: { lat: 5.6037, lng: -0.187 },
    tourismStatus: "open",
    featured: true,
  },
  {
    id: "kigali",
    city: "Kigali",
    country: "Rwanda",
    region: "East Africa",
    tier: "L1",
    label: "Safe & Welcoming",
    description: "The cleanest city in Africa, known for its hills, innovation, and remarkable recovery.",
    verdict: "Kigali is one of the safest cities in the world, with low crime and exceptional governance.",
    mythVsReality: {
      myth: "Rwanda is still recovering from the 1994 genocide.",
      reality: "Today, Kigali is Africa's safest capital, ranked among the world's cleanest and most orderly cities.",
    },
    distanceToHighRisk: "Kigali is over 800km from any high-risk zone - closer to the equator than to conflict.",
    imageUrl: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=1600&q=85",
    imagePrompt: "Kigali Rwanda hillside cityscape, green hills, modern buildings",
    coordinates: { lat: -1.9441, lng: 30.0619 },
    tourismStatus: "open",
    featured: true,
  },
  {
    id: "zanzibar",
    city: "Zanzibar",
    country: "Tanzania",
    region: "East Africa",
    tier: "L1",
    label: "Safe & Welcoming",
    description: "An archipelago of white-sand beaches, coral reefs, and historic Stone Town.",
    verdict: "Zanzibar is a world-class beach destination with minimal safety concerns for tourists.",
    mythVsReality: {
      myth: "East African beaches are unsafe for tourists.",
      reality: "Zanzibar welcomes over 600,000 tourists annually with extremely low crime rates in resort areas.",
    },
    distanceToHighRisk: "Zanzibar is over 1,000km from any high-risk zone - farther than the Maldives from Sri Lanka.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Zanzibar white sand beach, turquoise water, dhow boats at sunset",
    coordinates: { lat: -6.1659, lng: 39.2026 },
    tourismStatus: "open",
    featured: true,
  },
  {
    id: "port-louis",
    city: "Port Louis",
    country: "Mauritius",
    region: "Southern Africa",
    tier: "L1",
    label: "Safe & Welcoming",
    description: "A multicultural island capital with colonial architecture and stunning natural harbors.",
    verdict: "Mauritius is consistently ranked Africa's safest country with excellent infrastructure.",
    mythVsReality: {
      myth: "Island nations in Africa are underdeveloped.",
      reality: "Mauritius has the highest GDP per capita in Africa and is safer than most European countries.",
    },
    distanceToHighRisk: "Port Louis is over 3,000km from any high-risk zone - an island of stability.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Port Louis Mauritius harbor, modern skyline, mountain backdrop",
    coordinates: { lat: -20.1609, lng: 57.5012 },
    tourismStatus: "open",
    featured: false,
  },
  {
    id: "windhoek",
    city: "Windhoek",
    country: "Namibia",
    region: "Southern Africa",
    tier: "L1",
    label: "Safe & Welcoming",
    description: "A clean, orderly capital surrounded by striking desert landscapes.",
    verdict: "Windhoek is one of Africa's safest and most well-managed capital cities.",
    mythVsReality: {
      myth: "Southern Africa is dangerous for solo travelers.",
      reality: "Namibia has one of the lowest crime rates in Africa and is a top destination for self-drive safaris.",
    },
    distanceToHighRisk: "Windhoek is over 1,500km from any high-risk zone - farther than Paris to Rome.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Windhoek Namibia, German colonial architecture, desert landscape",
    coordinates: { lat: -22.5609, lng: 17.0658 },
    tourismStatus: "open",
    featured: false,
  },
  {
    id: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    region: "Southern Africa",
    tier: "L2",
    label: "Standard Caution",
    description: "A breathtaking coastal city with Table Mountain, vibrant culture, and world-class cuisine.",
    verdict: "Cape Town is a world-class destination. Standard urban caution applies, same as New York or London.",
    mythVsReality: {
      myth: "South Africa is too dangerous to visit.",
      reality: "Cape Town's tourist areas are well-policed and safe. Most of the city's crime is concentrated in specific neighborhoods far from tourist routes.",
    },
    distanceToHighRisk: "Cape Town is 1,600km from any high-risk zone - farther than London to Ibiza.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Cape Town Table Mountain, sunset, ocean, city lights",
    coordinates: { lat: -33.9249, lng: 18.4241 },
    tourismStatus: "open",
    featured: true,
  },
  {
    id: "nairobi",
    city: "Nairobi",
    country: "Kenya",
    region: "East Africa",
    tier: "L2",
    label: "Standard Caution",
    description: "East Africa's economic hub, famous for its national park, innovation, and safari gateway.",
    verdict: "Nairobi is a vibrant business capital. Exercise standard caution in dense urban areas as you would in any major city.",
    mythVsReality: {
      myth: "Nairobi is a dangerous city.",
      reality: "Nairobi is a modern, fast-growing metropolis with safe tourist zones, excellent malls, and a thriving tech scene.",
    },
    distanceToHighRisk: "Nairobi is over 500km from any high-risk zone - closer to London than to the nearest conflict zone.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Nairobi Kenya skyline, modern buildings, acacia trees",
    coordinates: { lat: -1.2921, lng: 36.8219 },
    tourismStatus: "open",
    featured: true,
  },
  {
    id: "marrakech",
    city: "Marrakech",
    country: "Morocco",
    region: "North Africa",
    tier: "L2",
    label: "Standard Caution",
    description: "A mesmerizing imperial city of souks, palaces, gardens, and the Atlas Mountains.",
    verdict: "Marrakech is a top global tourist destination. Watch for petty scams in markets, as in any tourist city worldwide.",
    mythVsReality: {
      myth: "North Africa is unsafe for Western tourists.",
      reality: "Marrakech receives over 3 million tourists annually and has comprehensive tourist police protection.",
    },
    distanceToHighRisk: "Marrakech is over 1,800km from any high-risk zone - farther than Madrid to Berlin.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Marrakech Morocco, medina, Atlas Mountains sunset, palace",
    coordinates: { lat: 31.6295, lng: -7.9811 },
    tourismStatus: "open",
    featured: true,
  },
  {
    id: "victoria-falls",
    city: "Victoria Falls",
    country: "Zimbabwe",
    region: "Southern Africa",
    tier: "L2",
    label: "Standard Caution",
    description: "One of the Seven Natural Wonders of the World, a majestic waterfall on the Zambezi River.",
    verdict: "The tourist town of Victoria Falls is very safe. Standard caution for wildlife and border crossings applies.",
    mythVsReality: {
      myth: "Zimbabwe is unstable and dangerous.",
      reality: "Victoria Falls town is a dedicated tourism hub with excellent hotels, security, and one of the world's greatest natural wonders.",
    },
    distanceToHighRisk: "Victoria Falls is over 1,000km from any high-risk zone - farther than London to Paris.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Victoria Falls Zimbabwe, massive waterfall, rainbow, mist",
    coordinates: { lat: -17.9243, lng: 25.8567 },
    tourismStatus: "open",
    featured: false,
  },
  {
    id: "lagos",
    city: "Lagos",
    country: "Nigeria",
    region: "West Africa",
    tier: "L2",
    label: "Standard Caution",
    description: "Africa's largest city, a megacity of creative energy, music, film, and entrepreneurship.",
    verdict: "Lagos is a high-energy megacity. Standard caution for traffic and dense urban areas. Business districts are well-secured.",
    mythVsReality: {
      myth: "Lagos is one of the most dangerous cities in the world.",
      reality: "Lagos crime rates are comparable to Rio or Mexico City. Business and expat areas are well-secured and the city is booming.",
    },
    distanceToHighRisk: "Lagos is over 1,000km from the nearest high-risk zone - farther than London to Milan.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Lagos Nigeria skyline, Atlantic Ocean, modern architecture",
    coordinates: { lat: 6.5244, lng: 3.3792 },
    tourismStatus: "open",
    featured: true,
  },
  {
    id: "bamako",
    city: "Bamako",
    country: "Mali",
    region: "West Africa",
    tier: "L3",
    label: "Reconsider Travel",
    description: "A historic city on the Niger River, known for its music and cultural heritage.",
    verdict: "Travel to Bamako requires careful consideration due to regional security concerns. Consult your embassy before travel.",
    mythVsReality: {
      myth: "All of Mali is a war zone.",
      reality: "Bamako itself is calm, but regional instability in northern Mali has expanded into central areas. Stay informed through official channels.",
    },
    distanceToHighRisk: "Bamako is within 300km of elevated-risk zones - check current travel advisories before planning.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Bamako Mali, Niger River, Great Mosque, market scene",
    coordinates: { lat: 12.6392, lng: -8.0029 },
    tourismStatus: "limited",
    featured: false,
  },
  {
    id: "mogadishu",
    city: "Mogadishu",
    country: "Somalia",
    region: "East Africa",
    tier: "L4",
    label: "Do Not Travel",
    description: "The coastal capital of Somalia, historically known as the 'Pearl of the Indian Ocean'.",
    verdict: "Travel to Mogadishu is not recommended. If you must go, use professional security and consult your embassy.",
    mythVsReality: {
      myth: "Somalia's danger represents the entire continent.",
      reality: "Mogadishu is one of only a handful of L4 zones in Africa. It is 3,000km from Cape Town, 2,500km from Accra - farther than London to Moscow.",
    },
    distanceToHighRisk: "Mogadishu is the risk zone itself. Over 95% of Africa's landmass is safe from this level of risk.",
    imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1600&q=85",
    imagePrompt: "Mogadishu Somalia coastline, Indian Ocean, urban landscape",
    coordinates: { lat: 2.0469, lng: 45.3182 },
    tourismStatus: "closed",
    featured: false,
  },
];

// Simplified SVG map paths for Africa regions (stylized, clickable)
export const countryMapData: CountryMapData[] = [
  {
    id: "morocco",
    name: "Morocco",
    path: "M110,60 L160,55 L175,90 L165,130 L130,125 L100,100 Z",
    tier: "L2",
    centerX: 137,
    centerY: 92,
    destinations: ["marrakech"],
  },
  {
    id: "mali",
    name: "Mali",
    path: "M120,130 L180,120 L190,170 L130,175 Z",
    tier: "L3",
    centerX: 155,
    centerY: 150,
    destinations: ["bamako"],
  },
  {
    id: "ghana",
    name: "Ghana",
    path: "M130,190 L170,185 L175,220 L135,225 Z",
    tier: "L1",
    centerX: 155,
    centerY: 205,
    destinations: ["accra"],
  },
  {
    id: "nigeria",
    name: "Nigeria",
    path: "M170,185 L220,180 L230,225 L175,220 Z",
    tier: "L2",
    centerX: 200,
    centerY: 205,
    destinations: ["lagos"],
  },
  {
    id: "rwanda",
    name: "Rwanda",
    path: "M245,240 L270,235 L275,260 L248,262 Z",
    tier: "L1",
    centerX: 260,
    centerY: 248,
    destinations: ["kigali"],
  },
  {
    id: "kenya",
    name: "Kenya",
    path: "M240,230 L280,225 L295,280 L260,290 L235,275 Z",
    tier: "L2",
    centerX: 265,
    centerY: 258,
    destinations: ["nairobi"],
  },
  {
    id: "tanzania",
    name: "Tanzania",
    path: "M260,290 L295,280 L310,330 L275,340 L255,320 Z",
    tier: "L1",
    centerX: 282,
    centerY: 310,
    destinations: ["zanzibar"],
  },
  {
    id: "somalia",
    name: "Somalia",
    path: "M310,275 L340,270 L355,330 L330,350 L310,330 Z",
    tier: "L4",
    centerX: 330,
    centerY: 310,
    destinations: ["mogadishu"],
  },
  {
    id: "namibia",
    name: "Namibia",
    path: "M140,380 L190,370 L200,420 L150,430 Z",
    tier: "L1",
    centerX: 170,
    centerY: 398,
    destinations: ["windhoek"],
  },
  {
    id: "zimbabwe",
    name: "Zimbabwe",
    path: "M240,350 L280,340 L290,370 L250,380 Z",
    tier: "L2",
    centerX: 265,
    centerY: 360,
    destinations: ["victoria-falls"],
  },
  {
    id: "south-africa",
    name: "South Africa",
    path: "M150,440 L230,430 L260,480 L180,490 L150,480 Z",
    tier: "L2",
    centerX: 205,
    centerY: 460,
    destinations: ["cape-town"],
  },
  {
    id: "mauritius",
    name: "Mauritius",
    path: "M370,400 L390,395 L395,415 L375,420 Z",
    tier: "L1",
    centerX: 382,
    centerY: 408,
    destinations: ["port-louis"],
  },
];

export const safeGenericImages = [
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=85",
  "https://images.unsplash.com/photo-1489392195031-97e14b0e1f4b?w=1600&q=85",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=85",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=85",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=85",
];

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

export function getDestinationsByTier(tier: SafetyTier): Destination[] {
  return destinations.filter((d) => d.tier === tier);
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => d.featured);
}