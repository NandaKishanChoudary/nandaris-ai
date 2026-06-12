"use client";

import type { ProjectWithReport } from "@/types/database.types";
import { ScoreCards } from "@/components/analysis/score-cards";
import { ScoreRadarChart } from "@/components/analysis/score-radar-chart";
import { IdeaAnalysisSection } from "@/components/analysis/idea-analysis-section";
import { CompetitorSection } from "@/components/analysis/competitor-section";
import { BrandingSection } from "@/components/analysis/branding-section";
import { RoadmapSection } from "@/components/analysis/roadmap-section";
import { Separator } from "@/components/ui/separator";
import { VENTURE_IQ } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface ReportLayoutProps {
  project: ProjectWithReport;
  showExport?: boolean;
}

export function ReportLayout({ project, showExport = false }: ReportLayoutProps) {
  const { venture_scores, analyses, competitors, branding, roadmaps } = project;

  return (
    <div className="space-y-10 print:space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-venture font-medium">{VENTURE_IQ} Report</p>
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground text-sm">
          {formatDate(project.created_at)}
          {project.industry && ` · ${project.industry}`}
        </p>
        <p className="text-sm leading-relaxed max-w-3xl">{project.startup_idea}</p>
      </div>

      {venture_scores && (
        <section id="scores">
          <h2 className="mb-4 text-xl font-semibold">VentureIQ Scores</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <ScoreCards scores={venture_scores} />
            <ScoreRadarChart scores={venture_scores} />
          </div>
        </section>
      )}

      <Separator />

      {analyses && (
        <section id="analysis">
          <h2 className="mb-4 text-xl font-semibold">Idea Analysis</h2>
          <IdeaAnalysisSection analysis={analyses} />
        </section>
      )}

      <Separator />

      {competitors && (
        <section id="competitors">
          <h2 className="mb-4 text-xl font-semibold">Competitor Analysis</h2>
          <CompetitorSection competitors={competitors} />
        </section>
      )}

      <Separator />

      {branding && (
        <section id="branding">
          <h2 className="mb-4 text-xl font-semibold">Branding</h2>
          <BrandingSection branding={branding} />
        </section>
      )}

      <Separator />

      {roadmaps && (
        <section id="roadmap">
          <h2 className="mb-4 text-xl font-semibold">Startup Roadmap</h2>
          <RoadmapSection roadmap={roadmaps} />
        </section>
      )}
    </div>
  );
}
