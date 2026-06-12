import type { VentureIQInput } from "@/types/ventureiq.types";

/**
 * Deterministic pseudo-random generator seeded from input text.
 * Ensures the same idea always produces the same mock scores.
 */
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return () => {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    return hash / 0x7fffffff;
  };
}

function scoreRange(rng: () => number, min: number, max: number): number {
  return Math.round(min + rng() * (max - min));
}

const INDUSTRY_COMPETITORS: Record<string, string[]> = {
  Technology: ["Notion", "Linear", "Figma", "Slack"],
  Healthcare: ["Teladoc", "Oscar Health", "Ro", "Hims & Hers"],
  Finance: ["Stripe", "Plaid", "Robinhood", "Brex"],
  Education: ["Coursera", "Duolingo", "Khan Academy", "Udemy"],
  "E-commerce": ["Shopify", "Amazon", "Etsy", "WooCommerce"],
  SaaS: ["Salesforce", "HubSpot", "Intercom", "Zendesk"],
  default: ["Incumbent A", "Startup B", "Enterprise C", "Platform D"],
};

const COLOR_PALETTES = [
  [
    { name: "Primary", hex: "#6366F1" },
    { name: "Secondary", hex: "#8B5CF6" },
    { name: "Accent", hex: "#EC4899" },
    { name: "Neutral", hex: "#1E1B4B" },
  ],
  [
    { name: "Primary", hex: "#0EA5E9" },
    { name: "Secondary", hex: "#06B6D4" },
    { name: "Accent", hex: "#14B8A6" },
    { name: "Neutral", hex: "#0F172A" },
  ],
  [
    { name: "Primary", hex: "#F97316" },
    { name: "Secondary", hex: "#EF4444" },
    { name: "Accent", hex: "#FBBF24" },
    { name: "Neutral", hex: "#18181B" },
  ],
];

const NAME_PREFIXES = ["Nova", "Venture", "Pulse", "Spark", "Nexus", "Apex"];
const NAME_SUFFIXES = ["IQ", "Labs", "Flow", "Hub", "Forge", "AI"];

function pick<T>(arr: T[], rng: () => number, count: number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  for (let i = 0; i < count && copy.length > 0; i++) {
    const idx = Math.floor(rng() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

export async function generateVentureReport(input: VentureIQInput) {
  const seed = `${input.startupIdea}|${input.industry ?? ""}|${input.targetMarket ?? ""}`;
  const rng = seededRandom(seed);
  const industry = input.industry ?? "Technology";
  const market = input.targetMarket ?? "general consumers";
  const idea = input.startupIdea;

  const marketDemand = scoreRange(rng, 55, 92);
  const competition = scoreRange(rng, 35, 75);
  const revenuePotential = scoreRange(rng, 50, 88);
  const scalability = scoreRange(rng, 60, 95);
  const feasibility = scoreRange(rng, 45, 85);
  const overall = Math.round(
    (marketDemand + (100 - competition) + revenuePotential + scalability + feasibility) / 5
  );

  const competitors =
    INDUSTRY_COMPETITORS[industry] ?? INDUSTRY_COMPETITORS.default;
  const palette = COLOR_PALETTES[Math.floor(rng() * COLOR_PALETTES.length)];

  const names = Array.from({ length: 5 }, () => {
    const prefix = NAME_PREFIXES[Math.floor(rng() * NAME_PREFIXES.length)];
    const suffix = NAME_SUFFIXES[Math.floor(rng() * NAME_SUFFIXES.length)];
    return `${prefix}${suffix}`;
  });

  // Simulate async AI latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    scores: {
      overall_score: overall,
      market_demand: marketDemand,
      competition,
      revenue_potential: revenuePotential,
      scalability,
      feasibility,
    },
    analysis: {
      problem_statement: `${market} faces significant friction when trying to access solutions related to "${idea.slice(0, 80)}". Existing options are fragmented, expensive, or fail to address the core pain point effectively. Users spend excessive time and resources navigating inadequate alternatives.`,
      target_audience: `Primary audience: ${market} seeking innovative solutions in the ${industry} space. Secondary audience: early adopters and professionals who value efficiency, data-driven decisions, and modern user experiences. Ideal customer profile includes tech-savvy decision-makers aged 25–45 with purchasing authority.`,
      value_proposition: `A streamlined platform that transforms "${idea.slice(0, 60)}" into actionable outcomes — reducing complexity, accelerating time-to-value, and delivering measurable ROI through an intuitive, AI-enhanced experience tailored for ${market}.`,
      opportunity_summary: `The ${industry} market presents a compelling opportunity with growing demand and identifiable gaps in current offerings. With a VentureIQ score of ${overall}/100, this venture shows ${overall >= 70 ? "strong" : overall >= 50 ? "moderate" : "emerging"} potential. Key success factors include rapid MVP validation, focused go-to-market strategy, and clear differentiation from established players.`,
    },
    competitors: {
      direct_competitors: pick(competitors, rng, 3),
      indirect_competitors: pick(
        ["Manual processes", "Spreadsheets", "Consulting services", "Legacy software"],
        rng,
        3
      ),
      strengths: [
        "Established brand recognition in the market",
        "Large existing customer base and network effects",
        "Significant funding and resources for R&D",
        "Mature product with extensive feature sets",
      ],
      weaknesses: [
        "Slow innovation cycles and legacy architecture",
        "Poor user experience compared to modern alternatives",
        "High pricing with complex enterprise contracts",
        "Limited personalization and AI capabilities",
      ],
      differentiation: [
        `AI-first approach specifically designed for ${market}`,
        "Faster onboarding with value delivered in under 10 minutes",
        "Transparent, founder-friendly pricing model",
        "Modern UX with mobile-first design philosophy",
        "Deep integration with tools your audience already uses",
      ],
    },
    branding: {
      name_suggestions: names,
      tagline: `Transform ideas into ventures — powered by intelligence`,
      brand_personality:
        "Innovative, trustworthy, and forward-thinking. The brand communicates confidence and clarity while remaining approachable to first-time founders. Tone is professional yet energetic, emphasizing empowerment and actionable insights.",
      color_palette: palette,
      logo_prompt: `Minimalist logo for a ${industry} startup called "${names[0]}". Abstract geometric mark combining upward arrow and neural network nodes. Colors: ${palette.map((c) => c.hex).join(", ")}. Clean, modern, suitable for SaaS platform. Vector style, white background.`,
    },
    roadmap: {
      mvp_features: [
        "Core idea submission and VentureIQ scoring engine",
        "Automated market analysis report generation",
        "Competitor landscape overview",
        "Basic branding suggestions",
        "Exportable PDF report",
        "User dashboard with project management",
      ],
      first_30_days: [
        "Week 1: Validate problem with 10 target customer interviews",
        "Week 1: Set up landing page and collect waitlist signups",
        "Week 2: Build and ship MVP with core scoring features",
        "Week 2: Launch on Product Hunt and relevant communities",
        "Week 3: Gather user feedback and iterate on UX",
        "Week 4: Implement analytics and conversion tracking",
        "Week 4: Reach 50 active beta users",
      ],
      first_90_days: [
        "Month 2: Add advanced competitor analysis and branding tools",
        "Month 2: Introduce team collaboration features",
        "Month 2: Establish content marketing and SEO strategy",
        "Month 3: Launch paid tier with premium analysis features",
        "Month 3: Partner with accelerators and startup communities",
        "Month 3: Target 500 registered users and 50 paying customers",
        "Month 3: Prepare seed fundraising materials using platform data",
      ],
      launch_recommendations: [
        "Start with a focused niche within your target market before expanding",
        "Leverage free tier to build word-of-mouth and collect testimonials",
        "Create shareable report snippets for social media virality",
        "Engage startup Twitter/X and Indie Hackers communities",
        "Offer limited-time founding member pricing",
        "Build in public to attract early adopters and feedback",
      ],
    },
  };
}
