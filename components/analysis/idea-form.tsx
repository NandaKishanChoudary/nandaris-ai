"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { INDUSTRIES } from "@/lib/constants";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  startup_idea: z
    .string()
    .min(20, "Please describe your idea in at least 20 characters"),
  industry: z.string().optional(),
  target_market: z.string().optional(),
});

type ProjectForm = z.infer<typeof projectSchema>;

export function IdeaForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
  });

  async function onSubmit(data: ProjectForm) {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to create project");
      }

      const project = await res.json();
      toast.success("Project created! Starting analysis...");
      router.push(`/projects/${project.id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Submit Your Startup Idea</CardTitle>
        <CardDescription>
          Describe your venture and VentureIQ™ will generate a comprehensive
          validation report.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="My Startup Idea"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startup_idea">Startup Idea *</Label>
            <Textarea
              id="startup_idea"
              placeholder="Describe your startup idea in detail. What problem does it solve? How does it work?"
              rows={5}
              {...register("startup_idea")}
            />
            {errors.startup_idea && (
              <p className="text-sm text-destructive">
                {errors.startup_idea.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Industry (optional)</Label>
              <Select
                value={watch("industry") ?? ""}
                onValueChange={(v) => setValue("industry", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_market">Target Market (optional)</Label>
              <Input
                id="target_market"
                placeholder="e.g. Small business owners"
                {...register("target_market")}
              />
            </div>
          </div>

          <Button type="submit" variant="venture" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="animate-spin" />}
            Create & Analyze
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
