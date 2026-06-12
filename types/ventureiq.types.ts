export interface VentureIQInput {
  startupIdea: string;
  industry?: string | null;
  targetMarket?: string | null;
}

export interface VentureScoresOutput {
  overall_score: number;
  market_demand: number;
  competition: number;
  revenue_potential: number;
  scalability: number;
  feasibility: number;
}

export interface IdeaAnalysisOutput {
  problem_statement: string;
  target_audience: string;
  value_proposition: string;
  opportunity_summary: string;
}

export interface CompetitorAnalysisOutput {
  direct_competitors: string[];
  indirect_competitors: string[];
  strengths: string[];
  weaknesses: string[];
  differentiation: string[];
}

export interface BrandingOutput {
  name_suggestions: string[];
  tagline: string;
  brand_personality: string;
  color_palette: { name: string; hex: string }[];
  logo_prompt: string;
}

export interface RoadmapOutput {
  mvp_features: string[];
  first_30_days: string[];
  first_90_days: string[];
  launch_recommendations: string[];
}

export interface VentureReport {
  scores: VentureScoresOutput;
  analysis: IdeaAnalysisOutput;
  competitors: CompetitorAnalysisOutput;
  branding: BrandingOutput;
  roadmap: RoadmapOutput;
}

export type ScoreKey = keyof VentureScoresOutput;

export interface ScoreMetric {
  key: ScoreKey;
  label: string;
  value: number;
  description: string;
}
