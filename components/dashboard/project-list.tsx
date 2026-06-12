"use client";

import { useEffect } from "react";
import { ProjectCard } from "@/components/dashboard/project-card";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { useProjects } from "@/hooks/use-projects";

export function ProjectList() {
  const { projects, loading, error, fetchProjects, deleteProject } =
    useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) return <LoadingSpinner message="Loading projects..." />;
  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (projects.length === 0) return <EmptyState />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={deleteProject}
        />
      ))}
    </div>
  );
}
