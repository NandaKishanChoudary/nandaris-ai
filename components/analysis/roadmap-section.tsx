import type { Roadmap } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Calendar, Target, Megaphone } from "lucide-react";

interface RoadmapSectionProps {
  roadmap: Roadmap;
}

function RoadmapList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-venture/10 text-xs font-semibold text-venture">
            {i + 1}
          </span>
          <span className="text-muted-foreground leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function RoadmapSection({ roadmap }: RoadmapSectionProps) {
  return (
    <Tabs defaultValue="mvp" className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        <TabsTrigger value="mvp">MVP</TabsTrigger>
        <TabsTrigger value="30">30 Days</TabsTrigger>
        <TabsTrigger value="90">90 Days</TabsTrigger>
        <TabsTrigger value="launch">Launch</TabsTrigger>
      </TabsList>

      <TabsContent value="mvp">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Rocket className="h-4 w-4 text-venture" />
              MVP Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RoadmapList items={roadmap.mvp_features} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="30">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-venture" />
              First 30 Day Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RoadmapList items={roadmap.first_30_days} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="90">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4 text-venture" />
              First 90 Day Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RoadmapList items={roadmap.first_90_days} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="launch">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Megaphone className="h-4 w-4 text-venture" />
              Launch Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RoadmapList items={roadmap.launch_recommendations} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
