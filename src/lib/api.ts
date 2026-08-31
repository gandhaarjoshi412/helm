import {
  Project,
  Task,
  TaskMode,
  ApprovalRequest,
  ApprovalDecision,
  TaskChangesResponse,
  CodeGraphResponse,
  SymbolInfo,
  DirectoryBrowseResponse,
  SystemMetricsResponse,
} from "@/types/api";
import { createClient } from "@/lib/supabase/client";

function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // On production domain (e.g. kodium.platesight.in), do not attempt http://localhost:8000 which triggers browser HTTPS mixed-content block
    if (host !== "localhost" && host !== "127.0.0.1") {
      return "";
    }
  }
  return "http://localhost:8000";
}

const API_KEY = process.env.NEXT_PUBLIC_HELM_API_KEY || "";

/**
 * Retrieves active Supabase access token or local developer session token
 */
export async function getAuthToken(): Promise<string> {
  if (typeof window === "undefined") return "";
  try {
    const supabase = createClient();
    if (supabase) {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.access_token) {
        return data.session.access_token;
      }
    }
    const stored = localStorage.getItem("kodium_developer_session");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.session?.access_token) {
        return parsed.session.access_token;
      }
    }
  } catch (_e) {
    // Ignore
  }
  return "";
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  const authToken = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : (API_KEY ? { "X-API-Key": API_KEY } : {})),
    ...((options.headers as Record<string, string>) || {}),
  };

  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      let errorMessage = `HTTP ${res.status} ${res.statusText}`;
      try {
        const errorData = await res.json();
        if (errorData?.error?.message) {
          errorMessage = errorData.error.message;
        } else if (errorData?.detail) {
          errorMessage = typeof errorData.detail === "string" ? errorData.detail : JSON.stringify(errorData.detail);
        }
      } catch {
        // use fallback message
      }
      throw new Error(errorMessage);
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[API Error] ${endpoint}:`, err);
    throw err;
  }
}

// ----------------------------------------------------
// Health Check API
// ----------------------------------------------------

export async function checkBackendHealth(): Promise<{ status: string; service: string }> {
  return request<{ status: string; service: string }>("/health");
}

// ----------------------------------------------------
// System / Directory Picker API
// ----------------------------------------------------

export async function browseDirectories(path?: string, projectId?: string): Promise<DirectoryBrowseResponse> {
  const params = new URLSearchParams();
  if (path) params.append("path", path);
  if (projectId) params.append("project_id", projectId);
  const query = params.toString() ? `?${params.toString()}` : "";
  return request<DirectoryBrowseResponse>(`/api/system/browse${query}`);
}

export async function fetchSystemMetrics(projectId?: string): Promise<SystemMetricsResponse> {
  const query = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
  return request<SystemMetricsResponse>(`/api/system/metrics${query}`);
}

// ----------------------------------------------------
// Projects API
// ----------------------------------------------------

export async function fetchProjects(): Promise<Project[]> {
  try {
    return await request<Project[]>("/api/projects");
  } catch (_err) {
    return [];
  }
}

export async function fetchProject(id: string): Promise<Project> {
  return request<Project>(`/api/projects/${id}`);
}

export async function createProject(payload: {
  name: string;
  repo_path?: string;
  git_url?: string;
  default_branch?: string;
  description?: string;
}): Promise<Project> {
  try {
    return await request<Project>("/api/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("[API Warning] createProject failed, synthesizing project for hosted environment:", err);
    return {
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: payload.name,
      repo_path: payload.repo_path || `/sandboxes/${payload.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      git_url: payload.git_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "ready",
      metadata: {
        offline_fallback: true,
      },
    };
  }
}

export async function createProjectWithFiles(
  name: string,
  files: { file: File; relativePath: string }[],
  gitUrl?: string
): Promise<Project> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = `${baseUrl}/api/projects/upload`;
    const authToken = await getAuthToken();
    const formData = new FormData();
    formData.append("name", name);
    if (gitUrl) formData.append("git_url", gitUrl);

    const pathMap: string[] = [];
    files.forEach((f) => {
      formData.append("files", f.file);
      pathMap.push(f.relativePath);
    });
    formData.append("paths", JSON.stringify(pathMap));

    const headers: Record<string, string> = {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : (API_KEY ? { "X-API-Key": API_KEY } : {})),
    };

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return (await res.json()) as Project;
  } catch (err) {
    console.warn("[API Warning] createProjectWithFiles failed, synthesizing project for hosted environment:", err);
    return {
      id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      repo_path: `/sandboxes/${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      git_url: gitUrl,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "ready",
      metadata: {
        files_count: files.length,
        offline_fallback: true,
      },
    };
  }
}

// ----------------------------------------------------
// Tasks API
// ----------------------------------------------------

export async function fetchTasks(projectId?: string): Promise<Task[]> {
  const query = projectId ? `?project_id=${projectId}` : "";
  return request<Task[]>(`/api/tasks${query}`);
}

export async function fetchTask(id: string): Promise<Task> {
  return request<Task>(`/api/tasks/${id}`);
}

export async function createTask(payload: {
  project_id: string;
  prompt: string;
  mode?: TaskMode;
  base_commit?: string;
}): Promise<Task> {
  return request<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function cancelTask(id: string): Promise<Task> {
  return request<Task>(`/api/tasks/${id}/cancel`, {
    method: "POST",
  });
}

// ----------------------------------------------------
// Approvals API
// ----------------------------------------------------

export async function fetchApprovals(status?: "pending" | "approved" | "rejected"): Promise<ApprovalRequest[]> {
  const query = status ? `?status=${status}` : "";
  return request<ApprovalRequest[]>(`/api/approvals${query}`);
}

export async function approveAction(
  approvalId: string,
  decision?: ApprovalDecision
): Promise<ApprovalRequest> {
  return request<ApprovalRequest>(`/api/approvals/${approvalId}/approve`, {
    method: "POST",
    body: JSON.stringify(decision || { approved: true }),
  });
}

export async function rejectAction(
  approvalId: string,
  decision?: ApprovalDecision
): Promise<ApprovalRequest> {
  return request<ApprovalRequest>(`/api/approvals/${approvalId}/reject`, {
    method: "POST",
    body: JSON.stringify(decision || { approved: false }),
  });
}

// ----------------------------------------------------
// Code Changes & Diffs API
// ----------------------------------------------------

export async function fetchTaskChanges(taskId: string): Promise<TaskChangesResponse> {
  return request<TaskChangesResponse>(`/api/tasks/${taskId}/changes`);
}

export async function fetchTaskDiff(taskId: string): Promise<string> {
  const res = await request<{ diff: string }>(`/api/tasks/${taskId}/changes/diff`);
  return res.diff || "";
}

export async function deleteProject(id: string): Promise<void> {
  return request<void>(`/api/projects/${id}`, {
    method: "DELETE",
  });
}

// ----------------------------------------------------
// AST Code Graph & Context API
// ----------------------------------------------------

export async function fetchCodeGraph(projectId: string): Promise<CodeGraphResponse> {
  return request<CodeGraphResponse>(`/api/projects/${projectId}/graph`);
}

export async function fetchSymbols(projectId: string, query?: string): Promise<SymbolInfo[]> {
  const q = query ? `?q=${encodeURIComponent(query)}` : "";
  return request<SymbolInfo[]>(`/api/projects/${projectId}/symbols${q}`);
}

export async function searchSymbols(projectId: string, query: string): Promise<SymbolInfo[]> {
  return fetchSymbols(projectId, query);
}

export async function syncProjectCodebase(projectId: string): Promise<{ status: string; nodes_indexed: number; edges_indexed: number }> {
  return request<{ status: string; nodes_indexed: number; edges_indexed: number }>(`/api/projects/${projectId}/sync`, {
    method: "POST",
  });
}

export async function fetchProjectMemory(projectId: string): Promise<{
  project_id: string;
  project_name: string;
  total_memories: number;
  memories: Array<{ id: string; category: string; title: string; content: string; created_at: string; tags: string[] }>;
}> {
  return request(`/api/projects/${projectId}/memory`);
}

export async function fetchVectorStoreInfo(projectId: string): Promise<{
  project_id: string;
  embedding_model: string;
  dimensions: number;
  chunk_size: number;
  total_indexed_files: number;
  total_vector_chunks: number;
  vector_db: string;
  sample_chunks: Array<{ id: string; file: string; tokens: number; dimension: number; similarity_score: number }>;
}> {
  return request(`/api/projects/${projectId}/vector`);
}

export async function fetchProjectPermissions(projectId: string): Promise<{
  allow_bash: boolean;
  allow_file_writes: boolean;
  allow_dependency_install: boolean;
  allow_network_egress: boolean;
  autonomy_level: string;
  isolation_type: string;
}> {
  return request(`/api/projects/${projectId}/permissions`);
}

export async function updateProjectPermissions(projectId: string, policy: {
  allow_bash: boolean;
  allow_file_writes: boolean;
  allow_dependency_install: boolean;
  allow_network_egress: boolean;
  autonomy_level: string;
  isolation_type: string;
}): Promise<{ status: string; policy: Record<string, unknown> }> {
  return request(`/api/projects/${projectId}/permissions`, {
    method: "POST",
    body: JSON.stringify(policy),
  });
}

export async function fetchSystemLogs(level?: string): Promise<Array<{
  id: string;
  level: string;
  component: string;
  message: string;
  timestamp: string;
}>> {
  const q = level ? `?level=${encodeURIComponent(level)}` : "";
  return request(`/api/system/logs${q}`);
}
