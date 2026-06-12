import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileDown } from "lucide-react";
import { getUser } from "@/lib/supabase/server";
import { getProjectById } from "@/services/projects.service";
import { ReportLayout } from "@/components/report/report-layout";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { projectId } = await params;
  const user = await getUser();
  if (!user) return { title: "Report" };
  const project = await getProjectById(projectId, user.id);
  return { title: project ? `${project.title} — Report` : "Report" };
}

export default async function ReportPage({ params }: Props) {
  const { projectId } = await params;
  const user = await getUser();
  if (!user) notFound();

  const project = await getProjectById(projectId, user.id);
  if (!project || project.status !== "complete") notFound();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between print:hidden">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/projects/${projectId}`}>
            <ArrowLeft className="h-4 w-4" />
            Back to Project
          </Link>
        </Button>
        <Button variant="venture" size="sm" asChild>
          <a href={`/api/export/${projectId}/pdf`} target="_blank" rel="noopener">
            <FileDown className="h-4 w-4" />
            Export PDF
          </a>
        </Button>
      </div>
      <ReportLayout project={project} />
    </div>
  );
}
