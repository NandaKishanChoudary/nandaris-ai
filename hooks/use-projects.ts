"use client";

import { useCallback, useState } from "react";
import type { Project, ProjectWithReport } from "@/types/database.types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete project");
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { projects, loading, error, fetchProjects, deleteProject };
}

export function useAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = useCallback(
    async (projectId: string): Promise<ProjectWithReport | null> => {
      setAnalyzing(true);
      setError(null);
      try {
        const res = await fetch(`/api/projects/${projectId}/analyze`, {
          method: "POST",
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? "Analysis failed");
        }
        return await res.json();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        return null;
      } finally {
        setAnalyzing(false);
      }
    },
    []
  );

  return { analyzing, error, runAnalysis };
}
