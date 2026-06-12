import type { Analysis } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Users, Gem, TrendingUp } from "lucide-react";

interface IdeaAnalysisSectionProps {
  analysis: Analysis;
}

const sections = [
  { key: "problem_statement", label: "Problem Statement", icon: Lightbulb },
  { key: "target_audience", label: "Target Audience", icon: Users },
  { key: "value_proposition", label: "Value Proposition", icon: Gem },
  { key: "opportunity_summary", label: "Opportunity Summary", icon: TrendingUp },
] as const;

export function IdeaAnalysisSection({ analysis }: IdeaAnalysisSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sections.map(({ key, label, icon: Icon }) => (
        <Card key={key}>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Icon className="h-4 w-4 text-venture" />
              {label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {analysis[key]}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
