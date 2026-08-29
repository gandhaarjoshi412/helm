"use client";

import { useState, useEffect, useCallback } from "react";
import { Project } from "@/types/api";
import { fetchProjects, createProject } from "@/lib/api";
import { useAuth } from "@/context/auth-context";

function getUploadedProjectsForUser(userKey: string | null): Project[] {
  if (!userKey || typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`kodium_user_projects_${userKey}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUploadedProjectForUser(userKey: string | null, project: Project) {
  if (!userKey || typeof window === "undefined") return;
  try {
    const current = getUploadedProjectsForUser(userKey);
    const updated = [project, ...current.filter((p) => p.id !== project.id)];
    localStorage.setItem(`kodium_user_projects_${userKey}`, JSON.stringify(updated));
  } catch (_e) {}
}

export function useProjects() {
  const { user } = useAuth();
  const userKey = user ? user.id || user.email || null : null;

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    if (!userKey) {
      setProjects([]);
      setSelectedProject(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const userUploaded = getUploadedProjectsForUser(userKey);
      const userUploadedIds = new Set(userUploaded.map((p) => p.id));

      let remoteProjects: Project[] = [];
      try {
        remoteProjects = await fetchProjects();
      } catch (_e) {
        // Backend offline or failed, fallback to locally stored user projects
      }

      const filteredRemote = remoteProjects.filter(
        (p) =>
          userUploadedIds.has(p.id) ||
          p.metadata?.user_id === user?.id ||
          p.metadata?.created_by === user?.email
      );

      // Merge remote matched projects and locally stored user projects (unique by id)
      const mergedMap = new Map<string, Project>();
      filteredRemote.forEach((p) => mergedMap.set(p.id, p));
      userUploaded.forEach((p) => mergedMap.set(p.id, p));

      const userProjectList = Array.from(mergedMap.values());

      setProjects(userProjectList);
      if (userProjectList.length > 0) {
        if (!selectedProject || !userProjectList.some((p) => p.id === selectedProject.id)) {
          setSelectedProject(userProjectList[0]);
        }
      } else {
        setSelectedProject(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, [userKey, selectedProject, user?.id, user?.email]);

  useEffect(() => {
    queueMicrotask(() => {
      loadProjects();
    });
  }, [loadProjects]);

  const addProject = async (name: string, repoPath?: string, gitUrl?: string) => {
    try {
      const newProj = await createProject({
        name,
        repo_path: repoPath,
        git_url: gitUrl,
      });

      const taggedProj: Project = {
        ...newProj,
        metadata: {
          ...(newProj.metadata || {}),
          user_id: user?.id,
          created_by: user?.email,
        },
      };

      saveUploadedProjectForUser(userKey, taggedProj);
      setProjects((prev) => [taggedProj, ...prev.filter((p) => p.id !== taggedProj.id)]);
      setSelectedProject(taggedProj);
      return taggedProj;
    } catch (err) {
      throw err;
    }
  };

  const addProjectWithFiles = async (
    name: string,
    files: { file: File; relativePath: string }[],
    gitUrl?: string
  ) => {
    try {
      const { createProjectWithFiles } = await import("@/lib/api");
      const newProj = await createProjectWithFiles(name, files, gitUrl);

      const taggedProj: Project = {
        ...newProj,
        metadata: {
          ...(newProj.metadata || {}),
          user_id: user?.id,
          created_by: user?.email,
        },
      };

      saveUploadedProjectForUser(userKey, taggedProj);
      setProjects((prev) => [taggedProj, ...prev.filter((p) => p.id !== taggedProj.id)]);
      setSelectedProject(taggedProj);
      return taggedProj;
    } catch (err) {
      throw err;
    }
  };

  const removeProject = async (id: string) => {
    try {
      const { deleteProject } = await import("@/lib/api");
      await deleteProject(id);

      if (userKey && typeof window !== "undefined") {
        try {
          const current = getUploadedProjectsForUser(userKey);
          const updated = current.filter((p) => p.id !== id);
          localStorage.setItem(`kodium_user_projects_${userKey}`, JSON.stringify(updated));
        } catch (_e) {}
      }

      setProjects((prev) => {
        const remaining = prev.filter((p) => p.id !== id);
        if (selectedProject?.id === id) {
          setSelectedProject(remaining.length > 0 ? remaining[0] : null);
        }
        return remaining;
      });
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
    addProjectWithFiles,
    removeProject,
  };
}

