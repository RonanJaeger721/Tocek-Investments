import companyData from "../../content/company.json";
import newsData from "../../content/news.json";
export type NewsArticle = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  author?: string;
  image: string;
  imageAlt: string;
  body: string[];
  approved: boolean;
  source?: string;
};
export type Market = {
  country: string;
  type: "operating" | "distribution" | "partner" | "target";
  location: string;
  approved: boolean;
  longitude?: number;
  latitude?: number;
};
export type Partner = {
  name: string;
  description: string;
  country: string;
  type: "distribution" | "production" | "research" | "institutional";
  approved: boolean;
  logo?: string;
  logoApproved?: boolean;
};
export const news = (newsData as NewsArticle[])
  .filter((a) => a.approved && a.slug && a.publishedAt && a.body.length > 0)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
export const company = companyData;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tocek-investments.vercel.app";
export type Crop = {
  slug: string;
  name: string;
  group: "Cereals" | "Legumes" | "Oilseeds";
  botanical: string;
  image: string;
  description: string;
  source: string;
};
export const crops: Crop[] = [
  {
    slug: "maize",
    name: "Maize",
    group: "Cereals",
    botanical: "Zea mays",
    image: "hero",
    description:
      "Explore our maize seed portfolio and speak to the team about variety selection, supply and your next growing season.",
    source: "Company profile 2024; Zimbabwe Seed Association",
  },
  {
    slug: "soyabeans",
    name: "Soyabeans",
    group: "Legumes",
    botanical: "Glycine max",
    image: "soyabeans",
    description:
      "Soyabean seed for agricultural production. Request the current variety list, technical information and supply options.",
    source: "Company profile 2024",
  },
  {
    slug: "sugar-beans",
    name: "Sugar beans",
    group: "Legumes",
    botanical: "Phaseolus vulgaris",
    image: "beans",
    description:
      "Discover sugar bean seed and discuss the information you need for a well-informed product enquiry.",
    source: "Company profile 2024",
  },
  {
    slug: "sorghum",
    name: "Sorghum",
    group: "Cereals",
    botanical: "Sorghum bicolor",
    image: "sorghum",
    description:
      "Part of our small grains portfolio. Contact Tocek for the available sorghum varieties and their verified technical details.",
    source: "Company profile 2024",
  },
  {
    slug: "sunflower",
    name: "Sunflower",
    group: "Oilseeds",
    botanical: "Helianthus annuus",
    image: "sunflower",
    description:
      "Explore sunflower seed enquiries and discuss the current offering with the Tocek team.",
    source: "Zimbabwe Seed Association member directory",
  },
  {
    slug: "pearl-millet",
    name: "Pearl millet",
    group: "Cereals",
    botanical: "Cenchrus americanus",
    image: "millet",
    description:
      "Explore pearl millet seed enquiries within our small grains portfolio. Ask the team for current product information.",
    source: "Company profile 2024",
  },
  {
    slug: "groundnuts",
    name: "Groundnuts",
    group: "Legumes",
    botanical: "Arachis hypogaea",
    image: "groundnuts",
    description:
      "Groundnut seed is part of our crop portfolio. Discuss varieties, packaging and commercial supply with the team.",
    source: "Company profile 2024",
  },
  {
    slug: "cowpeas",
    name: "Cowpeas",
    group: "Legumes",
    botanical: "Vigna unguiculata",
    image: "cowpeas",
    description:
      "Enquire about cowpea seed and request the current product information relevant to your farming requirements.",
    source: "Company profile 2024",
  },
  {
    slug: "wheat",
    name: "Wheat",
    group: "Cereals",
    botanical: "Triticum aestivum",
    image: "wheat",
    description:
      "Wheat seed forms part of the company’s portfolio. Request available variety and supply information.",
    source: "Company profile 2024",
  },
  {
    slug: "finger-millet",
    name: "Finger millet",
    group: "Cereals",
    botanical: "Eleusine coracana",
    image: "finger-millet",
    description:
      "A small grain crop in our portfolio. Speak to the team about the current seed offering.",
    source: "Company profile 2024",
  },
];
export type Variety = {
  slug: string;
  name: string;
  crop: string;
  description: string;
  source: string;
  seedType?: string;
  maturity?: string;
  regions?: string;
  yieldPotential?: string;
  packaging?: string;
  technicalPdf?: string;
};
export const varieties: Variety[] = [
  {
    slug: "zs265",
    name: "ZS265",
    crop: "maize",
    description:
      "A maize variety featured by Zadzamatura. Contact the team for the current technical sheet, suitability and availability.",
    source:
      "https://www.linkedin.com/posts/zadzamatura-private-limited_seedquality-maizeseed-zs265-activity-7288600620633104386-k0Fg",
  },
  {
    slug: "nua45",
    name: "NUA45",
    crop: "sugar-beans",
    description:
      "A sugar bean variety featured by Zadzamatura. Request the technical information and current supply details from Tocek.",
    source: "https://zw.linkedin.com/company/zadzamatura-private-limited",
  },
];
export const nav = [
  { label: "Home", href: "/" },
  {
    label: "About us",
    href: "/about",
    children: [
      ["Our story", "/about/our-story"],
      ["Our values", "/about/our-values"],
    ],
  },
  {
    label: "Our solutions",
    href: "/solutions",
    children: [
      ["Seed production & processing", "/solutions/seed-production"],
      ["Agricultural products", "/solutions/agricultural-products"],
      ["Distribution enquiries", "/distribution"],
    ],
  },
  { label: "Seed portfolio", href: "/seeds" },
  {
    label: "Research",
    href: "/research",
    children: [
      ["Research & innovation", "/research"],
      ["Quality approach", "/research/quality"],
    ],
  },
  {
    label: "Global presence",
    href: "/global-presence",
    children: [
      ["Our presence", "/global-presence"],
      ["Partnerships", "/partnerships"],
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    children: [
      ["News & updates", "/insights"],
      ["Farmer resources", "/resources"],
    ],
  },
];
export const resourceItems = [
  {
    slug: "seed-enquiry-checklist",
    title: "Make your seed enquiry count",
    category: "Planning",
    summary:
      "A practical checklist of information to share when requesting seed availability or a quotation.",
    image: "hero",
    body: [
      "Start with the crop and any variety you already have in mind. If you are still choosing, tell the team that you need the current technical information.",
      "Share the country and district where you intend to grow the crop, your intended planting period and whether the enquiry concerns irrigated or rain-fed production. These details help frame your conversation; they are not a planting recommendation.",
      "Include the quantity you would like to discuss, your preferred delivery location and your required timeline. Availability, packaging and supply terms should be confirmed directly with Tocek.",
      "Ask for the current technical sheet before making a final selection. Crop management advice should come from a qualified agronomist familiar with your field conditions.",
    ],
  },
  {
    slug: "understanding-technical-sheets",
    title: "A closer look at technical information",
    category: "Seed selection",
    summary:
      "The questions to take into a variety discussion, from maturity information to local suitability.",
    image: "sorghum",
    body: [
      "A variety name is the starting point of a discussion. Request the current, official technical sheet for the exact product you are considering.",
      "Ask the team which published characteristics apply to your production context. Maturity, regional suitability and disease tolerance should be checked against the official product information.",
      "A yield potential is not a guarantee. Ask how any performance information was measured and what conditions apply. Do not assume results from one location will apply to another.",
      "For crop-specific decisions, consult a qualified agronomist. This resource is an enquiry checklist and does not prescribe seed rates, chemical treatments or planting dates.",
    ],
  },
  {
    slug: "distribution-enquiry-guide",
    title: "Planning a distribution conversation",
    category: "Business",
    summary:
      "Bring a clear picture of your market, organisation and supply requirements to the table.",
    image: "wheat",
    body: [
      "Introduce your organisation, where it operates and the customer groups it serves. Describe your interest in distribution, commercial supply or a specific crop category.",
      "Share the countries and locations relevant to your enquiry. Cross-border supply is subject to confirmation of availability, regulatory requirements and commercial terms.",
      "Outline the quantities, delivery schedule and product information you need. Tocek will need to discuss the specific requirements before confirming a supply arrangement.",
      "Use the partnership enquiry form to prepare your request, or contact the company using the telephone details listed on the contact page.",
    ],
  },
];
export const pageInfo: Record<string, { title: string; description: string }> =
  {
    "/about": {
      title: "About Tocek",
      description:
        "A Zimbabwean seed business connecting agricultural production, research and productive partnerships.",
    },
    "/about/our-story": {
      title: "Our story",
      description: "The roots and agricultural focus of Tocek Investments.",
    },
    "/about/our-values": {
      title: "Our values",
      description:
        "Quality, informed decisions and productive working relationships.",
    },
    "/solutions": {
      title: "Our solutions",
      description:
        "Seed production, processing, agricultural products and commercial supply enquiries.",
    },
    "/solutions/seed-production": {
      title: "Seed production & processing",
      description:
        "From contracted seed growers to processing, packing and distribution.",
    },
    "/solutions/agricultural-products": {
      title: "Agricultural products",
      description:
        "Enquire about Tocek’s seed portfolio and agrochemical product information.",
    },
    "/research": {
      title: "Research & innovation",
      description:
        "Field evaluation and crop development in the Tocek seed business.",
    },
    "/research/quality": {
      title: "Quality approach",
      description:
        "A closer look at production, processing and product information.",
    },
    "/global-presence": {
      title: "Global presence",
      description: "Rooted in Zimbabwe. Building relationships beyond borders.",
    },
    "/partnerships": {
      title: "Partnerships",
      description:
        "Start a conversation about distribution, seed production, research or international agricultural business.",
    },
    "/distribution": {
      title: "Distribution enquiries",
      description:
        "Discuss crop requirements, market opportunities and commercial seed supply.",
    },
    "/contact": {
      title: "Contact Tocek",
      description:
        "Local and international enquiries for seed products, bulk supply and partnerships.",
    },
    "/seeds": {
      title: "Seed portfolio",
      description:
        "Explore maize, legumes, small grains and oilseeds. Search crops and varieties and request product information.",
    },
    "/resources": {
      title: "Farmer resources",
      description:
        "Useful enquiry checklists and trusted routes to agricultural information.",
    },
    "/insights": {
      title: "Insights & news",
      description:
        "Company updates and agricultural perspectives from Tocek Investments.",
    },
    "/privacy": {
      title: "Privacy policy",
      description: "How enquiry information is used by Tocek Investments.",
    },
  };
export const publicRoutes = [
  "/",
  ...Object.keys(pageInfo),
  ...crops.map((c) => `/seeds/${c.slug}`),
  ...varieties.map((v) => `/seeds/${v.crop}/${v.slug}`),
  ...resourceItems.map((r) => `/resources/${r.slug}`),
  ...news.map((a) => `/insights/${a.slug}`),
];
