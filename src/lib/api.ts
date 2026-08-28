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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
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
  const url = `${API_BASE_URL}${endpoint}`;
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
  return request<Project[]>("/api/projects");
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
  return request<Project>("/api/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createProjectWithFiles(
  name: string,
  files: { file: File; relativePath: string }[],
  gitUrl?: string
): Promise<Project> {
  const url = `${API_BASE_URL}/api/projects/upload`;
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
    let errorMessage = `HTTP ${res.status} ${res.statusText}`;
    try {
      const errorData = await res.json();
      if (errorData?.detail) {
        errorMessage = typeof errorData.detail === "string" ? errorData.detail : JSON.stringify(errorData.detail);
      }
    } catch {
      // Fallback
    }
    throw new Error(errorMessage);
  }

  return (await res.json()) as Project;
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
