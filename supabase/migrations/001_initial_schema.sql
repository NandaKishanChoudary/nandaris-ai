-- Nandaris AI - Initial Database Schema
-- Run this in Supabase SQL Editor or via Supabase CLI

-- Users profile table (mirrors auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  startup_idea TEXT NOT NULL,
  industry TEXT,
  target_market TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'analyzing', 'complete', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- VentureIQ Scores
CREATE TABLE IF NOT EXISTS public.venture_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL UNIQUE REFERENCES public.projects(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  market_demand INTEGER NOT NULL CHECK (market_demand >= 0 AND market_demand <= 100),
  competition INTEGER NOT NULL CHECK (competition >= 0 AND competition <= 100),
  revenue_potential INTEGER NOT NULL CHECK (revenue_potential >= 0 AND revenue_potential <= 100),
  scalability INTEGER NOT NULL CHECK (scalability >= 0 AND scalability <= 100),
  feasibility INTEGER NOT NULL CHECK (feasibility >= 0 AND feasibility <= 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Idea Analysis
CREATE TABLE IF NOT EXISTS public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL UNIQUE REFERENCES public.projects(id) ON DELETE CASCADE,
  problem_statement TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  value_proposition TEXT NOT NULL,
  opportunity_summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Competitor Analysis
CREATE TABLE IF NOT EXISTS public.competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL UNIQUE REFERENCES public.projects(id) ON DELETE CASCADE,
  direct_competitors JSONB NOT NULL DEFAULT '[]',
  indirect_competitors JSONB NOT NULL DEFAULT '[]',
  strengths JSONB NOT NULL DEFAULT '[]',
  weaknesses JSONB NOT NULL DEFAULT '[]',
  differentiation JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Branding
CREATE TABLE IF NOT EXISTS public.branding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL UNIQUE REFERENCES public.projects(id) ON DELETE CASCADE,
  name_suggestions JSONB NOT NULL DEFAULT '[]',
  tagline TEXT NOT NULL,
  brand_personality TEXT NOT NULL,
  color_palette JSONB NOT NULL DEFAULT '[]',
  logo_prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Roadmaps
CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL UNIQUE REFERENCES public.projects(id) ON DELETE CASCADE,
  mvp_features JSONB NOT NULL DEFAULT '[]',
  first_30_days JSONB NOT NULL DEFAULT '[]',
  first_90_days JSONB NOT NULL DEFAULT '[]',
  launch_recommendations JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id, created_at DESC);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venture_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- Helper: check project ownership for child tables
CREATE OR REPLACE FUNCTION public.user_owns_project(project_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.projects
    WHERE id = project_uuid AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Venture scores policies
CREATE POLICY "Users can view own venture scores"
  ON public.venture_scores FOR SELECT
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can insert own venture scores"
  ON public.venture_scores FOR INSERT
  WITH CHECK (public.user_owns_project(project_id));

CREATE POLICY "Users can update own venture scores"
  ON public.venture_scores FOR UPDATE
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can delete own venture scores"
  ON public.venture_scores FOR DELETE
  USING (public.user_owns_project(project_id));

-- Analyses policies
CREATE POLICY "Users can view own analyses"
  ON public.analyses FOR SELECT
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can insert own analyses"
  ON public.analyses FOR INSERT
  WITH CHECK (public.user_owns_project(project_id));

CREATE POLICY "Users can update own analyses"
  ON public.analyses FOR UPDATE
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can delete own analyses"
  ON public.analyses FOR DELETE
  USING (public.user_owns_project(project_id));

-- Competitors policies
CREATE POLICY "Users can view own competitors"
  ON public.competitors FOR SELECT
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can insert own competitors"
  ON public.competitors FOR INSERT
  WITH CHECK (public.user_owns_project(project_id));

CREATE POLICY "Users can update own competitors"
  ON public.competitors FOR UPDATE
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can delete own competitors"
  ON public.competitors FOR DELETE
  USING (public.user_owns_project(project_id));

-- Branding policies
CREATE POLICY "Users can view own branding"
  ON public.branding FOR SELECT
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can insert own branding"
  ON public.branding FOR INSERT
  WITH CHECK (public.user_owns_project(project_id));

CREATE POLICY "Users can update own branding"
  ON public.branding FOR UPDATE
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can delete own branding"
  ON public.branding FOR DELETE
  USING (public.user_owns_project(project_id));

-- Roadmaps policies
CREATE POLICY "Users can view own roadmaps"
  ON public.roadmaps FOR SELECT
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can insert own roadmaps"
  ON public.roadmaps FOR INSERT
  WITH CHECK (public.user_owns_project(project_id));

CREATE POLICY "Users can update own roadmaps"
  ON public.roadmaps FOR UPDATE
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can delete own roadmaps"
  ON public.roadmaps FOR DELETE
  USING (public.user_owns_project(project_id));
