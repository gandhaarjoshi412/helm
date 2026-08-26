export type TaskMode = "autonomous" | "guided" | "assist";

export type TaskStatus = "pending" | "running" | "waiting_approval" | "completed" | "failed" | "cancelled";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type EventStatus = "info" | "success" | "warning" | "error";

export type PhaseName =
  | "ask"
  | "recon"
  | "plan"
  | "execute"
  | "verify"
  | "self_correct"
  | "review"
  | "ship"
  | "completed"
  | "failed"
  | "rejected";

export interface Project {
  id: string;
  name: string;
  repo_path: string;
  git_url?: string | null;
  default_branch: string;
  is_indexed: boolean;
  indexed_at?: string | null;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface Task {
  id: string;
  project_id: string;
  prompt: string;
  mode: TaskMode;
  status: TaskStatus;
  phase: string;
  created_at: string;
  started_at?: string | null;
  completed_at?: string | null;
  error?: string | null;
  plan?: Record<string, any> | null;
  metadata?: Record<string, any>;
}

export interface AgentEvent {
  id: string;
  run_id: string;
  task_id: string;
  type: string;
  phase: string;
  timestamp: string;
  title: string;
  summary: string;
  tool_name?: string | null;
  tool_input?: Record<string, any> | null;
  tool_output?: Record<string, any> | null;
  duration_ms?: number | null;
  status: EventStatus;
  metadata?: Record<string, any>;
}

export interface ApprovalRequest {
  id: string;
  task_id: string;
  run_id: string;
  action_type: string;
  description: string;
  payload: Record<string, any>;
  status: ApprovalStatus;
  requested_at: string;
  resolved_at?: string | null;
  resolved_by?: string | null;
  rejection_reason?: string | null;
}

export interface ApprovalDecision {
  approved?: boolean;
  user_id?: string;
  comment?: string;
}

export interface FileDiff {
  path: string;
  status: string;
  additions: number;
  deletions: number;
  diff_content: string;
}

export interface TaskChangesResponse {
  task_id: string;
  run_id?: string;
  files_changed?: string[];
  diffs?: FileDiff[];
  total_additions?: number;
  total_deletions?: number;
  raw_diff?: string;
  files?: any[];
  unified_diff?: string;
}

export interface SymbolInfo {
  id: string;
  name: string;
  kind: "function" | "class" | "method" | "variable" | "interface" | "type" | "import";
  file_path: string;
  line_start: number;
  line_end: number;
  docstring?: string | null;
  signature?: string | null;
}

export interface CodeGraphNode {
  id: string;
  type: "file" | "symbol";
  label: string;
  metadata?: Record<string, any>;
}

export interface CodeGraphEdge {
  source: string;
  target: string;
  relationship: "imports" | "calls" | "defines" | "tests" | "references";
}

export interface CodeGraphResponse {
  project_id: string;
  nodes: CodeGraphNode[];
  edges: CodeGraphEdge[];
}

export interface DirectoryItem {
  name: string;
  path: string;
  is_git_repo: boolean;
  project_type?: "node" | "python" | "go" | "rust" | "folder" | string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface QuickLocation {
  name: string;
  path: string;
}

export interface DirectoryBrowseResponse {
  current_path: string;
  parent_path?: string | null;
  breadcrumbs: BreadcrumbItem[];
  quick_locations: QuickLocation[];
  directories: DirectoryItem[];
}
