"use client";

import { useState, useEffect, useCallback } from "react";
import { Project } from "@/types/api";
import { fetchProjects, createProject } from "@/lib/api";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
      if (data.length > 0 && !selectedProject) {
        setSelectedProject(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, [selectedProject]);

  useEffect(() => {
    queueMicrotask(() => {
      loadProjects();
    });
  }, [loadProjects]);

  const addProject = async (name: string, repoPath: string, gitUrl?: string) => {
    try {
      const newProj = await createProject({
        name,
        repo_path: repoPath,
        git_url: gitUrl,
      });
      setProjects((prev) => [newProj, ...prev]);
      setSelectedProject(newProj);
      return newProj;
    } catch (err) {
      throw err;
    }
  };

  return {
    projects,
    selectedProject,
    setSelectedProject,
    isLoading,
    error,
    reloadProjects: loadProjects,
    addProject,
  };
}
