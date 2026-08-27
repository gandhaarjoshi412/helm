import { WorkspaceView } from "@/components/workspace/WorkspaceView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HELM Console — Autonomous Engineering Workspace",
  description: "Live autonomous software engineering control plane with real-time SSE execution, AST code graph, and gated human approvals.",
};

export default function WorkspacePage() {
  return <WorkspaceView />;
}
