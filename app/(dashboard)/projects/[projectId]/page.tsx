import { notFound } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { getProjectById } from "@/services/projects.service";
import { ProjectDetail } from "@/components/analysis/project-detail";

interface Props {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { projectId } = await params;
  const user = await getUser();
  if (!user) return { title: "Project" };
  const project = await getProjectById(projectId, user.id);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const user = await getUser();
  if (!user) notFound();

  const project = await getProjectById(projectId, user.id);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl">
      <ProjectDetail initialProject={project} />
    </div>
  );
}
