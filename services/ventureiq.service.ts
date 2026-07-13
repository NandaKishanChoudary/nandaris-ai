import { GoogleGenAI } from "@google/genai";
import type {
  VentureIQInput,
  VentureReport,
} from "@/types/ventureiq.types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing.");
}

const ai = new GoogleGenAI({
  apiKey,
});


const SYSTEM_PROMPT = `
You are VentureIQ.

You are an elite startup consultant with expertise comparable to:
- Y Combinator
- Sequoia Capital
- Andreessen Horowitz
- McKinsey
- Harvard Business School

Your task is to analyze startup ideas.

Return ONLY valid JSON.

Never return markdown.

Never return explanations.

Never wrap the JSON inside \`\`\`.

The JSON MUST exactly follow this schema:

{
  "scores":{
    "overall_score":0,
    "market_demand":0,
    "competition":0,
    "revenue_potential":0,
    "scalability":0,
    "feasibility":0
  },

  "analysis":{
    "problem_statement":"",
    "target_audience":"",
    "value_proposition":"",
    "opportunity_summary":""
  },

  "competitors":{
    "direct_competitors":[],
    "indirect_competitors":[],
    "strengths":[],
    "weaknesses":[],
    "differentiation":[]
  },

  "branding":{
    "name_suggestions":[],
    "tagline":"",
    "brand_personality":"",
    "color_palette":[
      {
        "name":"",
        "hex":""
      }
    ],
    "logo_prompt":""
  },

  "roadmap":{
    "mvp_features":[],
    "first_30_days":[],
    "first_90_days":[],
    "launch_recommendations":[]
  }
}
`;

function buildPrompt(input: VentureIQInput) {
  return `
Analyze this startup.

Startup Idea:
${input.startupIdea}

Industry:
${input.industry ?? "General"}

Target Market:
${input.targetMarket ?? "General"}

Requirements:

1. Produce realistic startup scores.

2. Competitors must be REAL companies.

3. Brand names must be original.

4. Roadmap must be startup specific.

5. Do NOT hallucinate JSON keys.

6. Every list must contain at least 5 items where applicable.

7. Use real companies as competitors.

8. Brand names must be unique and not trademarked.

9. Scores must be realistic and between 0 and 100.

10. Make the analysis detailed.

11. Do not repeat information across sections.

12. Roadmap should be specific to this startup.

13. Return only valid JSON.

Return ONLY JSON.
`;
}
function ensureArray(value: any): string[] {
  if (Array.isArray(value)) return value.map(String);
  return [];
}

function ensureString(value: any): string {
  if (typeof value === "string") return value;
  return "";
}

function ensureNumber(value: any): number {
  if (typeof value === "number") return value;
  return 0;
}

function validateReport(report: any): VentureReport {
  return {
    scores: {
      overall_score: ensureNumber(report?.scores?.overall_score),
      market_demand: ensureNumber(report?.scores?.market_demand),
      competition: ensureNumber(report?.scores?.competition),
      revenue_potential: ensureNumber(report?.scores?.revenue_potential),
      scalability: ensureNumber(report?.scores?.scalability),
      feasibility: ensureNumber(report?.scores?.feasibility),
    },

    analysis: {
      problem_statement: ensureString(report?.analysis?.problem_statement),
      target_audience: ensureString(report?.analysis?.target_audience),
      value_proposition: ensureString(report?.analysis?.value_proposition),
      opportunity_summary: ensureString(report?.analysis?.opportunity_summary),
    },

    competitors: {
      direct_competitors: ensureArray(report?.competitors?.direct_competitors),
      indirect_competitors: ensureArray(report?.competitors?.indirect_competitors),
      strengths: ensureArray(report?.competitors?.strengths),
      weaknesses: ensureArray(report?.competitors?.weaknesses),
      differentiation: ensureArray(report?.competitors?.differentiation),
    },

    branding: {
      name_suggestions: ensureArray(report?.branding?.name_suggestions),
      tagline: ensureString(report?.branding?.tagline),
      brand_personality: ensureString(report?.branding?.brand_personality),

      color_palette: Array.isArray(report?.branding?.color_palette)
        ? report.branding.color_palette
        : [],

      logo_prompt: ensureString(report?.branding?.logo_prompt),
    },

    roadmap: {
      mvp_features: ensureArray(report?.roadmap?.mvp_features),
      first_30_days: ensureArray(report?.roadmap?.first_30_days),
      first_90_days: ensureArray(report?.roadmap?.first_90_days),
      launch_recommendations: ensureArray(
        report?.roadmap?.launch_recommendations
      ),
    },
  };
}
export async function generateVentureReport(
  input: VentureIQInput
): Promise<VentureReport> {
  const prompt = buildPrompt(input);

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${SYSTEM_PROMPT}\n\n${prompt}`,
        config: {
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      });

      const text = response.text;

      if (!text) {
        throw new Error("Empty response from Gemini.");
      }

      // Remove accidental markdown fences if Gemini returns them
      const cleaned = text
  	.replace(/^```json\s*/i, "")
  	.replace(/^```\s*/i, "")
  	.replace(/```$/i, "")
  	.trim();

      const parsed = JSON.parse(cleaned);

      return validateReport(parsed);
    } catch (err) {
      console.error(`Gemini attempt ${attempt} failed`, err);

      if (attempt === 3) {
        throw new Error(
          "Gemini failed to generate a valid VentureIQ report."
        );
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  throw new Error("Unexpected Gemini error.");
}