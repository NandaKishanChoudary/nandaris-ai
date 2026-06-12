"use client";

import Link from "next/link";
import { Trash2, ArrowRight, BarChart3 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Project } from "@/types/database.types";
import { PROJECT_STATUSES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => Promise<void>;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDelete(project.id);
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeleting(false);
    }
  }

  const statusVariant =
    project.status === "complete"
      ? "venture"
      : project.status === "failed"
        ? "destructive"
        : "secondary";

  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-lg">{project.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {project.startup_idea}
            </CardDescription>
          </div>
          <Badge variant={statusVariant}>
            {PROJECT_STATUSES[project.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {project.industry && (
            <span className="rounded-full bg-muted px-2 py-0.5">
              {project.industry}
            </span>
          )}
          <span>{formatDate(project.created_at)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="venture" size="sm" asChild className="flex-1">
            <Link href={`/projects/${project.id}`}>
              {project.status === "complete" ? (
                <>
                  <BarChart3 className="h-4 w-4" />
                  View Analysis
                </>
              ) : (
                <>
                  Open
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" disabled={deleting}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete project?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete &quot;{project.title}&quot; and
                  all associated analysis data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
