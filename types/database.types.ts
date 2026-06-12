export type ProjectStatus = "draft" | "analyzing" | "complete" | "failed";

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  startup_idea: string;
  industry: string | null;
  target_market: string | null;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface VentureScores {
  id: string;
  project_id: string;
  overall_score: number;
  market_demand: number;
  competition: number;
  revenue_potential: number;
  scalability: number;
  feasibility: number;
  created_at: string;
}

export interface Analysis {
  id: string;
  project_id: string;
  problem_statement: string;
  target_audience: string;
  value_proposition: string;
  opportunity_summary: string;
  created_at: string;
}

export interface Competitors {
  id: string;
  project_id: string;
  direct_competitors: string[];
  indirect_competitors: string[];
  strengths: string[];
  weaknesses: string[];
  differentiation: string[];
  created_at: string;
}

export interface BrandColor {
  name: string;
  hex: string;
}

export interface Branding {
  id: string;
  project_id: string;
  name_suggestions: string[];
  tagline: string;
  brand_personality: string;
  color_palette: BrandColor[];
  logo_prompt: string;
  created_at: string;
}

export interface Roadmap {
  id: string;
  project_id: string;
  mvp_features: string[];
  first_30_days: string[];
  first_90_days: string[];
  launch_recommendations: string[];
  created_at: string;
}

export interface ProjectWithReport extends Project {
  venture_scores: VentureScores | null;
  analyses: Analysis | null;
  competitors: Competitors | null;
  branding: Branding | null;
  roadmaps: Roadmap | null;
}

export interface CreateProjectInput {
  title: string;
  startup_idea: string;
  industry?: string;
  target_market?: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "created_at">;
        Update: Partial<Omit<User, "id">>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at" | "status"> & {
          status?: ProjectStatus;
        };
        Update: Partial<Omit<Project, "id">>;
      };
      venture_scores: {
        Row: VentureScores;
        Insert: Omit<VentureScores, "id" | "created_at">;
        Update: Partial<Omit<VentureScores, "id">>;
      };
      analyses: {
        Row: Analysis;
        Insert: Omit<Analysis, "id" | "created_at">;
        Update: Partial<Omit<Analysis, "id">>;
      };
      competitors: {
        Row: Competitors;
        Insert: Omit<Competitors, "id" | "created_at">;
        Update: Partial<Omit<Competitors, "id">>;
      };
      branding: {
        Row: Branding;
        Insert: Omit<Branding, "id" | "created_at">;
        Update: Partial<Omit<Branding, "id">>;
      };
      roadmaps: {
        Row: Roadmap;
        Insert: Omit<Roadmap, "id" | "created_at">;
        Update: Partial<Omit<Roadmap, "id">>;
      };
    };
  };
}
