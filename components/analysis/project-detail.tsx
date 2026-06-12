"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileDown, RefreshCw, FileText } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ScoreCards } from "@/components/analysis/score-cards";
import { ScoreRadarChart } from "@/components/analysis/score-radar-chart";
import { IdeaAnalysisSection } from "@/components/analysis/idea-analysis-section";
import { CompetitorSection } from "@/components/analysis/competitor-section";
import { BrandingSection } from "@/components/analysis/branding-section";
import { RoadmapSection } from "@/components/analysis/roadmap-section";
import { useAnalysis } from "@/hooks/use-projects";
import type { ProjectWithReport } from "@/types/database.types";
import { PROJECT_STATUSES, VENTURE_IQ } from "@/lib/constants";

interface ProjectDetailProps {
  initialProject: ProjectWithReport;
}

export function ProjectDetail({ initialProject }: ProjectDetailProps) {
  const [project, setProject] = useState(initialProject);
  const { analyzing, runAnalysis } = useAnalysis();

  useEffect(() => {
    if (
      project.status === "draft" ||
      project.status === "analyzing"
    ) {
      runAnalysis(project.id).then((result) => {
        if (result) {
          setProject(result);
          toast.success("Analysis complete!");
        }
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleReanalyze() {
    const result = await runAnalysis(project.id);
    if (result) {
      setProject(result);
      toast.success("Analysis updated!");
    }
  }

  function handleExportPDF() {
    window.open(`/api/export/${project.id}/pdf`, "_blank");
    toast.success("Downloading PDF report...");
  }

  if (analyzing || project.status === "analyzing") {
    return (
      <LoadingSpinner message={`${VENTURE_IQ} is analyzing your venture...`} />
    );
  }

  if (project.status === "failed") {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-destructive">Analysis failed. Please try again.</p>
        <Button variant="venture" onClick={handleReanalyze}>
          <RefreshCw className="h-4 w-4" />
          Retry Analysis
        </Button>
      </div>
    );
  }

  const isComplete = project.status === "complete" && project.venture_scores;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2 -ml-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {project.startup_idea}
          </p>
          <Badge variant="venture" className="mt-2">
            {PROJECT_STATUSES[project.status]}
          </Badge>
        </div>
        {isComplete && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReanalyze}>
              <RefreshCw className="h-4 w-4" />
              Re-analyze
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/projects/${project.id}/report`}>
                <FileText className="h-4 w-4" />
                Full Report
              </Link>
            </Button>
            <Button variant="venture" size="sm" onClick={handleExportPDF}>
              <FileDown className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        )}
      </div>

      {isComplete && (
        <Tabs defaultValue="scores" className="w-full">
          <TabsList>
            <TabsTrigger value="scores">Scores</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="scores" className="mt-6 space-y-6">
            {project.venture_scores && (
              <>
                <ScoreCards scores={project.venture_scores} />
                <ScoreRadarChart scores={project.venture_scores} />
              </>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            {project.analyses && (
              <IdeaAnalysisSection analysis={project.analyses} />
            )}
          </TabsContent>

          <TabsContent value="competitors" className="mt-6">
            {project.competitors && (
              <CompetitorSection competitors={project.competitors} />
            )}
          </TabsContent>

          <TabsContent value="branding" className="mt-6">
            {project.branding && (
              <BrandingSection branding={project.branding} />
            )}
          </TabsContent>

          <TabsContent value="roadmap" className="mt-6">
            {project.roadmaps && (
              <RoadmapSection roadmap={project.roadmaps} />
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
