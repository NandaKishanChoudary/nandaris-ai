"use client";

import type { VentureScores } from "@/types/database.types";
import { SCORE_LABELS } from "@/lib/constants";
import {
  getScoreBgColor,
  getScoreColor,
  getScoreLabel,
  cn,
} from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ScoreCardsProps {
  scores: VentureScores;
}

const SUB_SCORES = [
  "market_demand",
  "competition",
  "revenue_potential",
  "scalability",
  "feasibility",
] as const;

export function ScoreCards({ scores }: ScoreCardsProps) {
  return (
    <div className="space-y-6">
      <Card
        className={cn(
          "border-2",
          getScoreBgColor(scores.overall_score)
        )}
      >
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {SCORE_LABELS.overall_score}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-6">
          <span
            className={cn(
              "text-6xl font-bold tabular-nums",
              getScoreColor(scores.overall_score)
            )}
          >
            {scores.overall_score}
          </span>
          <Badge variant="venture" className="mt-2">
            {getScoreLabel(scores.overall_score)}
          </Badge>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUB_SCORES.map((key) => {
          const value = scores[key];
          const label = SCORE_LABELS[key];
          return (
            <Card key={key}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{label}</CardTitle>
                  <span
                    className={cn(
                      "text-2xl font-bold tabular-nums",
                      getScoreColor(value)
                    )}
                  >
                    {value}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={value} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
