"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import type { VentureScores } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoreRadarChartProps {
  scores: VentureScores;
}

export function ScoreRadarChart({ scores }: ScoreRadarChartProps) {
  const data = [
    { metric: "Market", value: scores.market_demand, fullMark: 100 },
    { metric: "Competition", value: 100 - scores.competition, fullMark: 100 },
    { metric: "Revenue", value: scores.revenue_potential, fullMark: 100 },
    { metric: "Scale", value: scores.scalability, fullMark: 100 },
    { metric: "Feasibility", value: scores.feasibility, fullMark: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="metric"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Radar
              name="Score"
              dataKey="value"
              stroke="hsl(var(--venture))"
              fill="hsl(var(--venture))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
