import { createClient } from "@/lib/supabase/server";
import type {
  CreateProjectInput,
  Project,
  ProjectWithReport,
} from "@/types/database.types";
import { generateVentureReport } from "./ventureiq.service";

export async function getProjects(userId: string): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getProjectById(
  projectId: string,
  userId: string
): Promise<ProjectWithReport | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      venture_scores (*),
      analyses (*),
      competitors (*),
      branding (*),
      roadmaps (*)
    `
    )
    .eq("id", projectId)
    .eq("user_id", userId)
    .single();

if (error) {
  if (error.code === "PGRST116") return null;
  throw new Error(error.message);
}

if (!data) return null;

const projectData = data as any;

return {
  ...projectData,
  venture_scores: Array.isArray(projectData.venture_scores)
    ? projectData.venture_scores[0] ?? null
    : projectData.venture_scores,
  analyses: Array.isArray(projectData.analyses)
    ? projectData.analyses[0] ?? null
    : projectData.analyses,
  competitors: Array.isArray(projectData.competitors)
    ? projectData.competitors[0] ?? null
    : projectData.competitors,
  branding: Array.isArray(projectData.branding)
    ? projectData.branding[0] ?? null
    : projectData.branding,
  roadmaps: Array.isArray(projectData.roadmaps)
    ? projectData.roadmaps[0] ?? null
    : projectData.roadmaps,
} as ProjectWithReport;
}

export async function createProject(
  userId: string,
  input: CreateProjectInput
): Promise<Project> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: userId,
      title: input.title,
      startup_idea: input.startup_idea,
      industry: input.industry ?? null,
      target_market: input.target_market ?? null,
      status: "draft",
    } as any)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteProject(
  projectId: string,
  userId: string
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}

export async function runAnalysisPipeline(
  projectId: string,
  userId: string
): Promise<ProjectWithReport> {
  const supabase = await createClient();

  const project = await getProjectById(projectId, userId);
  if (!project) throw new Error("Project not found");

  await supabase
   .from("projects")
   .update({ status: "analyzing" } as any)
   .eq("id", projectId);

  try {
    const report = await generateVentureReport({
      startupIdea: project.startup_idea,
      industry: project.industry,
      targetMarket: project.target_market,
    });

    // Upsert all report sections
    await supabase.from("venture_scores").upsert(
      { project_id: projectId, ...report.scores },
      { onConflict: "project_id" }
    );

    await supabase.from("analyses").upsert(
      { project_id: projectId, ...report.analysis },
      { onConflict: "project_id" }
    );

    await supabase.from("competitors").upsert(
      { project_id: projectId, ...report.competitors },
      { onConflict: "project_id" }
    );

    await supabase.from("branding").upsert(
      { project_id: projectId, ...report.branding },
      { onConflict: "project_id" }
    );

    await supabase.from("roadmaps").upsert(
      { project_id: projectId, ...report.roadmap },
      { onConflict: "project_id" }
    );

    await supabase
      .from("projects")
      .update({ status: "complete" } as any)
      .eq("id", projectId);

    const updated = await getProjectById(projectId, userId);
    if (!updated) throw new Error("Failed to fetch updated project");
    return updated;
  } catch (err) {
    await supabase
      .from("projects")
      .update({ status: "failed" } as any)
      .eq("id", projectId);
    throw err;
  }
}
