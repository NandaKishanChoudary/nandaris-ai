import type { ElementType } from "react";
import type { Competitors } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords, Shield, AlertTriangle, Sparkles } from "lucide-react";

interface CompetitorSectionProps {
  competitors: Competitors;
}

function ListCard({
  title,
  icon: Icon,
  items,
  variant = "default",
}: {
  title: string;
  icon: ElementType;
  items: string[];
  variant?: "default" | "venture" | "destructive";
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-venture" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <Badge variant={variant} className="mt-0.5 shrink-0">
                •
              </Badge>
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function CompetitorSection({ competitors }: CompetitorSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <ListCard
        title="Direct Competitors"
        icon={Swords}
        items={competitors.direct_competitors}
      />
      <ListCard
        title="Indirect Competitors"
        icon={Shield}
        items={competitors.indirect_competitors}
      />
      <ListCard
        title="Competitor Strengths"
        icon={AlertTriangle}
        items={competitors.strengths}
      />
      <ListCard
        title="Competitor Weaknesses"
        icon={AlertTriangle}
        items={competitors.weaknesses}
        variant="destructive"
      />
      <div className="md:col-span-2">
        <ListCard
          title="Differentiation Opportunities"
          icon={Sparkles}
          items={competitors.differentiation}
          variant="venture"
        />
      </div>
    </div>
  );
}
