import type { Branding } from "@/types/database.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Type, Sparkles, ImageIcon } from "lucide-react";

interface BrandingSectionProps {
  branding: Branding;
}

export function BrandingSection({ branding }: BrandingSectionProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Type className="h-4 w-4 text-venture" />
            Name Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {branding.name_suggestions.map((name) => (
              <Badge key={name} variant="venture" className="text-sm px-3 py-1">
                {name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-venture" />
              Tagline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium italic">&ldquo;{branding.tagline}&rdquo;</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="h-4 w-4 text-venture" />
              Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {branding.color_palette.map((color) => (
                <div key={color.name} className="flex flex-col items-center gap-1">
                  <div
                    className="h-10 w-10 rounded-lg border shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs text-muted-foreground">{color.name}</span>
                  <span className="text-xs font-mono">{color.hex}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Brand Personality</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {branding.brand_personality}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ImageIcon className="h-4 w-4 text-venture" />
            Logo Prompt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="rounded-lg bg-muted p-4 text-sm font-mono leading-relaxed">
            {branding.logo_prompt}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
