// Mock data derived from PRD + insecurity brief. Not authoritative.

export type SafetyLevel = "safe" | "caution" | "unsafe";

export interface Incident {
  id: string;
  lat: number;
  lng: number;
  intensity: number; // 0.2 - 1.0
  level: SafetyLevel;
  country: string;
  region: string;
  date: string;
  what: string;
  why: string;
  source: string;
  sourceUrl: string;
}

export const incidents: Incident[] = [
  { id: "i1", lat: 13.51, lng: 2.11, intensity: 0.95, level: "unsafe", country: "Niger", region: "Tillabéri (Sahel)", date: "2025-06-14", what: "Armed group attacks along rural corridors", why: "Ongoing Sahel insurgency; US Do Not Travel advisory", source: "US State Dept", sourceUrl: "https://travel.state.gov/en/international-travel/travel-advisories.html" },
  { id: "i2", lat: 12.65, lng: -8.00, intensity: 0.9, level: "unsafe", country: "Mali", region: "Central & Northern Mali", date: "2025-05-02", what: "Terrorism and kidnapping risk", why: "GTI 2025: Sahel is global epicenter of terrorism", source: "GTI 2025", sourceUrl: "https://www.visionofhumanity.org/wp-content/uploads/2025/03/Global-Terrorism-Index-2025.pdf" },
  { id: "i3", lat: 12.37, lng: -1.52, intensity: 0.9, level: "unsafe", country: "Burkina Faso", region: "Nationwide (border regions worst)", date: "2025-04-19", what: "Coordinated militant attacks", why: "Half of global terror deaths concentrated in Sahel", source: "GTI 2025", sourceUrl: "https://www.visionofhumanity.org/wp-content/uploads/2025/03/Global-Terrorism-Index-2025.pdf" },
  { id: "i4", lat: 11.75, lng: 13.16, intensity: 0.85, level: "unsafe", country: "Nigeria", region: "Borno / Northeast", date: "2025-03-08", what: "Insurgent activity, kidnappings", why: "Persistent Boko Haram / ISWAP threat", source: "US State Dept", sourceUrl: "https://travel.state.gov/en/international-travel/travel-advisories.html" },
  { id: "i5", lat: 15.5, lng: 32.56, intensity: 0.95, level: "unsafe", country: "Sudan", region: "Khartoum & Darfur", date: "2025-07-01", what: "Active civil war", why: "SAF–RSF conflict; airports closed intermittently", source: "Al Jazeera", sourceUrl: "https://www.aljazeera.com/" },
  { id: "i6", lat: -13.0, lng: 40.5, intensity: 0.8, level: "unsafe", country: "Mozambique", region: "Cabo Delgado", date: "2025-02-14", what: "Insurgent attacks near LNG sites", why: "Region tied to frozen $20B TotalEnergies project", source: "Al Jazeera", sourceUrl: "https://www.aljazeera.com/news/2026/1/29/total-restarts-20bn-lng-project-in-mozambique-after-five-year-freeze" },
  { id: "i7", lat: -1.68, lng: 29.22, intensity: 0.75, level: "unsafe", country: "DR Congo", region: "North Kivu & Ituri", date: "2025-05-30", what: "Armed group clashes", why: "Long-running eastern DRC conflict", source: "US State Dept", sourceUrl: "https://travel.state.gov/" },
  { id: "i8", lat: 2.04, lng: 45.34, intensity: 0.9, level: "unsafe", country: "Somalia", region: "Mogadishu & south", date: "2025-06-01", what: "Terrorism and kidnapping", why: "Al-Shabaab attacks in urban centers", source: "US State Dept", sourceUrl: "https://travel.state.gov/" },
  { id: "i9", lat: 6.7, lng: -1.62, intensity: 0.35, level: "caution", country: "Ghana", region: "Upper East (border)", date: "2025-01-10", what: "Spillover risk from Burkina Faso", why: "Border vigilance advised in far north", source: "UK FCDO", sourceUrl: "https://www.gov.uk/foreign-travel-advice" },
  { id: "i10", lat: -1.29, lng: 36.82, intensity: 0.4, level: "caution", country: "Kenya", region: "Nairobi & coast", date: "2025-03-22", what: "Petty crime, historical attacks on tourist sites", why: "Attack-driven declines (Reuters 2015: ~25% arrivals drop)", source: "Reuters", sourceUrl: "https://www.reuters.com/article/world/kenya-tourist-numbers-down-by-a-quarter-so-far-in-2015-idUSKBN0OS0P4/" },
  { id: "i11", lat: 30.04, lng: 31.24, intensity: 0.3, level: "caution", country: "Egypt", region: "Sinai & western desert", date: "2025-02-05", what: "Restricted zones, past aviation incidents", why: "Sharm crash aftermath; $1.3B tourism revenue drop", source: "Egyptian Streets", sourceUrl: "https://egyptianstreets.com/2016/03/01/egypts-tourism-revenues-declined-1-3-billion-since-downing-of-russian-plane-prime-minister/" },
  { id: "i12", lat: 9.03, lng: 38.74, intensity: 0.45, level: "caution", country: "Ethiopia", region: "Tigray & Amhara border", date: "2025-04-11", what: "Regional unrest", why: "Localized conflict; Addis stable", source: "TheStreet", sourceUrl: "https://www.thestreet.com/travel/airline-cancels-all-flights-to-country-over-geopolitical-instability" },
  // safe zones — low intensity markers to color the map green-ish
  { id: "s1", lat: -1.95, lng: 30.06, intensity: 0.15, level: "safe", country: "Rwanda", region: "Kigali & Volcanoes NP", date: "2025-06-01", what: "Stable, well-policed capital", why: "Consistently safe for tourism", source: "UK FCDO", sourceUrl: "https://www.gov.uk/foreign-travel-advice" },
  { id: "s2", lat: -24.66, lng: 25.91, intensity: 0.1, level: "safe", country: "Botswana", region: "Gaborone & Okavango", date: "2025-05-20", what: "Low crime, robust tourism sector", why: "One of Africa's safest destinations", source: "UK FCDO", sourceUrl: "https://www.gov.uk/foreign-travel-advice" },
  { id: "s3", lat: -20.16, lng: 57.5, intensity: 0.08, level: "safe", country: "Mauritius", region: "Island-wide", date: "2025-06-11", what: "Very low risk", why: "Stable island nation", source: "UK FCDO", sourceUrl: "https://www.gov.uk/foreign-travel-advice" },
  { id: "s4", lat: -22.56, lng: 17.08, intensity: 0.12, level: "safe", country: "Namibia", region: "Windhoek & Sossusvlei", date: "2025-05-01", what: "Stable, tourism-friendly", why: "Standard precautions apply", source: "UK FCDO", sourceUrl: "https://www.gov.uk/foreign-travel-advice" },
  { id: "s5", lat: -18.88, lng: 47.51, intensity: 0.2, level: "safe", country: "Madagascar", region: "Antananarivo & east coast", date: "2025-04-14", what: "Generally safe outside protests", why: "Watch for occasional demonstrations", source: "UK FCDO", sourceUrl: "https://www.gov.uk/foreign-travel-advice" },
  { id: "s6", lat: 14.72, lng: -17.47, intensity: 0.18, level: "safe", country: "Senegal", region: "Dakar & Saloum", date: "2025-05-09", what: "Stable, welcoming to travelers", why: "Avoid Casamance border areas", source: "UK FCDO", sourceUrl: "https://www.gov.uk/foreign-travel-advice" },
];

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: string;
  category: "hidden-gem" | "popular" | "lesser-known";
  activity: string[];
  safety: SafetyLevel;
  budget: "$" | "$$" | "$$$";
  style: string[];
  blurb: string;
}

export const destinations: Destination[] = [
  { id: "d1", name: "Kigali & Volcanoes National Park", country: "Rwanda", region: "East Africa", category: "popular", activity: ["Wildlife", "City"], safety: "safe", budget: "$$$", style: ["Nature", "Culture"], blurb: "Gorilla trekking above a spotless, walkable capital." },
  { id: "d2", name: "Lamu Old Town", country: "Kenya", region: "Coast", category: "hidden-gem", activity: ["Culture", "Beach"], safety: "caution", budget: "$$", style: ["Slow travel"], blurb: "Swahili stone town with dhow harbors and car-free lanes." },
  { id: "d3", name: "Saly & Saloum Delta", country: "Senegal", region: "West Africa", category: "lesser-known", activity: ["Beach", "Music", "Wildlife"], safety: "safe", budget: "$$", style: ["Culture"], blurb: "Mangroves, mbalax nights and long Atlantic beaches." },
  { id: "d4", name: "Okavango Delta", country: "Botswana", region: "Southern Africa", category: "popular", activity: ["Wildlife", "Adventure"], safety: "safe", budget: "$$$", style: ["Luxury", "Nature"], blurb: "Mokoro safaris through the world's largest inland delta." },
  { id: "d5", name: "Sossusvlei & Swakopmund", country: "Namibia", region: "Southern Africa", category: "popular", activity: ["Adventure", "Photography"], safety: "safe", budget: "$$", style: ["Nature"], blurb: "Red dunes at dawn and cold Atlantic mist by night." },
  { id: "d6", name: "Nosy Be", country: "Madagascar", region: "Indian Ocean", category: "hidden-gem", activity: ["Beach", "Wildlife"], safety: "safe", budget: "$$", style: ["Nature"], blurb: "Turquoise coves, ylang-ylang plantations and lemurs." },
  { id: "d7", name: "Chefchaouen", country: "Morocco", region: "North Africa", category: "popular", activity: ["Culture", "Photography"], safety: "safe", budget: "$", style: ["Slow travel"], blurb: "The blue city tucked in the Rif Mountains." },
  { id: "d8", name: "Kribi Coast", country: "Cameroon", region: "Central Africa", category: "lesser-known", activity: ["Beach", "Nature"], safety: "caution", budget: "$", style: ["Off-grid"], blurb: "Waterfalls that empty directly into the Atlantic." },
  { id: "d9", name: "Île de Gorée", country: "Senegal", region: "West Africa", category: "popular", activity: ["Culture", "History"], safety: "safe", budget: "$", style: ["Heritage"], blurb: "UNESCO memory site, 20 minutes off Dakar." },
  { id: "d10", name: "Zanzibar Stone Town", country: "Tanzania", region: "East Africa", category: "popular", activity: ["Culture", "Beach"], safety: "safe", budget: "$$", style: ["Culture"], blurb: "Spice markets, Swahili doors and reef beaches." },
];

export interface CultureGuide {
  slug: string;
  name: string;
  region: string;
  overview: string;
  greetings: string[];
  etiquette: string[];
  dress: string[];
  religion: string;
  food: string[];
  safety: string[];
  history: string;
}

export const cultures: CultureGuide[] = [
  { slug: "hausa", name: "Hausa", region: "West Africa", overview: "Hausa is one of West Africa's largest cultural and linguistic communities, spanning northern Nigeria and southern Niger.", greetings: ["Sannu — Hello", "Ina kwana? — Good morning", "Na gode — Thank you"], etiquette: ["Greet elders first", "Use right hand for gifts and food", "Ask before photographing people"], dress: ["Modest attire in villages and mosques", "Lightweight cotton for the heat"], religion: "Predominantly Muslim; observe prayer times and Ramadan.", food: ["Tuwo shinkafa", "Suya", "Kilishi"], safety: ["Avoid political discussions", "Use licensed transport", "Respect sacred spaces"], history: "Historic Hausa kingdoms shaped Sahelian trade for a millennium." },
  { slug: "yoruba", name: "Yoruba", region: "West Africa", overview: "Yoruba culture spans southwestern Nigeria, Benin and Togo, known for art, music and philosophy.", greetings: ["Ẹ n lẹ — Hello", "Ẹ ku aarọ — Good morning", "Ẹ ṣé — Thank you"], etiquette: ["Prostrate or curtsy to greet elders", "Never point with the left hand"], dress: ["Agbada and iro-and-buba for ceremonies"], religion: "Christian, Muslim and Ifá traditions coexist.", food: ["Amala & ewedu", "Jollof rice", "Suya"], safety: ["Bargain politely", "Keep valuables discreet in markets"], history: "The Oyo Empire and Ile-Ife shaped classical West African art." },
  { slug: "swahili", name: "Swahili Coast", region: "East Africa", overview: "A coastal civilization from Somalia to Mozambique, blending Bantu, Arab and Indian ocean influences.", greetings: ["Jambo — Hello", "Habari? — How are you?", "Asante — Thank you"], etiquette: ["Cover shoulders and knees in old towns", "Remove shoes indoors"], dress: ["Kanga and kikoi wraps"], religion: "Predominantly Muslim on the coast.", food: ["Pilau", "Biryani", "Mishkaki"], safety: ["Avoid isolated beaches at night", "Respect prayer times"], history: "Stone towns like Lamu and Kilwa anchored Indian Ocean trade." },
  { slug: "amhara", name: "Amhara & Ethiopian Highlands", region: "Horn of Africa", overview: "Ethiopia's highland culture is built around ancient Christianity, coffee ceremonies and unique script.", greetings: ["Selam — Hello", "Tena yistilign — Formal hello", "Ameseginalehu — Thank you"], etiquette: ["Accept coffee — it is an honor", "Use right hand only when eating injera"], dress: ["White netela shawls in churches"], religion: "Ethiopian Orthodox is central; observe fasting days.", food: ["Injera with wat", "Kitfo", "Tibs"], safety: ["Avoid Tigray & Amhara border tensions", "Addis and Lalibela remain welcoming"], history: "Aksum, Lalibela and Gondar trace a 3,000-year lineage." },
  { slug: "zulu", name: "Zulu", region: "Southern Africa", overview: "The Zulu nation, centered in KwaZulu-Natal, is famed for warrior heritage and vibrant dance.", greetings: ["Sawubona — I see you", "Unjani? — How are you?", "Ngiyabonga — Thank you"], etiquette: ["Greet everyone in a room", "Accept food with both hands"], dress: ["Traditional isicholo and beadwork on ceremony days"], religion: "Christianity blended with ancestral reverence.", food: ["Umngqusho", "Braai", "Uphuthu"], safety: ["Use registered guides in townships", "Respect sacred royal sites"], history: "Shaped by Shaka's 19th-century Zulu kingdom." },
  { slug: "berber", name: "Amazigh (Berber)", region: "North Africa", overview: "Indigenous peoples of the Maghreb, from the Rif to the Sahara, with a distinct Tifinagh script.", greetings: ["Azul — Hello", "Manik antgit? — How are you?", "Tanmirt — Thank you"], etiquette: ["Accept mint tea when offered", "Bargain gently in souks"], dress: ["Modest layers; scarves useful in mountains"], religion: "Predominantly Muslim.", food: ["Tagine", "Couscous", "Msemen"], safety: ["Hire licensed mountain guides", "Watch weather in the Atlas"], history: "Amazigh kingdoms predate the Arab arrival by millennia." },
];

export interface Guide {
  id: string;
  name: string;
  city: string;
  country: string;
  languages: string[];
  expertise: string[];
  rate: number;
  verified: boolean;
  rating: number;
  bio: string;
}

export const guides: Guide[] = [
  { id: "g1", name: "Amara Okafor", city: "Lagos", country: "Nigeria", languages: ["English", "Yoruba", "Igbo"], expertise: ["Street food", "Afrobeats history"], rate: 45, verified: true, rating: 4.9, bio: "Lifelong Lagosian, food writer, gets you past the tourist Lagos." },
  { id: "g2", name: "Fatou Ndiaye", city: "Dakar", country: "Senegal", languages: ["French", "Wolof", "English"], expertise: ["Île de Gorée", "Music"], rate: 40, verified: true, rating: 5.0, bio: "Cultural historian; specializes in memory tours of Gorée." },
  { id: "g3", name: "Kwame Boateng", city: "Accra", country: "Ghana", languages: ["English", "Twi"], expertise: ["Cape Coast castles", "Diaspora tours"], rate: 55, verified: true, rating: 4.8, bio: "Guides diaspora returnees along the slave-route heritage trail." },
  { id: "g4", name: "Aster Tesfaye", city: "Addis Ababa", country: "Ethiopia", languages: ["Amharic", "English"], expertise: ["Coffee ceremony", "Lalibela day trips"], rate: 35, verified: true, rating: 4.9, bio: "Ethiopian coffee is her lifetime; roasting demo included." },
  { id: "g5", name: "Zanele Mokoena", city: "Cape Town", country: "South Africa", languages: ["English", "Zulu", "Xhosa"], expertise: ["Township jazz", "Table Mountain"], rate: 60, verified: false, rating: 4.7, bio: "Musician-turned-guide, jazz clubs and mountain sunrise runs." },
  { id: "g6", name: "Idriss Ag Mohamed", city: "Marrakech", country: "Morocco", languages: ["Arabic", "French", "Tamazight", "English"], expertise: ["Atlas Mountains", "Medina architecture"], rate: 50, verified: true, rating: 4.9, bio: "Amazigh guide, third-generation Marrakchi." },
];

export interface RouteHop {
  from: string;
  to: string;
  via: "Flight" | "Bus" | "Ferry" | "Rail" | "Road";
  hours: number;
}

export const proximityRoutes: Record<string, { hops: RouteHop[]; countries: string[] }> = {
  Senegal: { countries: ["Senegal", "The Gambia", "Cape Verde", "Ghana"], hops: [
    { from: "Dakar", to: "Banjul", via: "Bus", hours: 6 },
    { from: "Banjul", to: "Praia", via: "Flight", hours: 2 },
    { from: "Praia", to: "Accra", via: "Flight", hours: 4 },
  ]},
  Kenya: { countries: ["Kenya", "Rwanda", "Tanzania", "Uganda"], hops: [
    { from: "Nairobi", to: "Kigali", via: "Flight", hours: 1.5 },
    { from: "Kigali", to: "Kampala", via: "Bus", hours: 9 },
    { from: "Kampala", to: "Dar es Salaam", via: "Flight", hours: 2 },
  ]},
  "South Africa": { countries: ["South Africa", "Namibia", "Botswana", "Mauritius"], hops: [
    { from: "Cape Town", to: "Windhoek", via: "Flight", hours: 2 },
    { from: "Windhoek", to: "Maun", via: "Road", hours: 10 },
    { from: "Johannesburg", to: "Port Louis", via: "Flight", hours: 4 },
  ]},
  Morocco: { countries: ["Morocco", "Tunisia", "Senegal"], hops: [
    { from: "Casablanca", to: "Tunis", via: "Flight", hours: 3 },
    { from: "Tunis", to: "Dakar", via: "Flight", hours: 5.5 },
  ]},
};
