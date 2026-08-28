"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useProjects } from "@/hooks/use-projects";
import { useTaskStream } from "@/hooks/use-task-stream";
import { useApprovals } from "@/hooks/use-approvals";
import { useAuth } from "@/context/auth-context";
import { createTask, cancelTask } from "@/lib/api";
import { TaskMode, Task } from "@/types/api";

import { WorkspaceHeader } from "./WorkspaceHeader";
import { WorkspaceSidebar } from "./WorkspaceSidebar";
import { InteractiveCycleProgress } from "./InteractiveCycleProgress";
import { TaskDispatchBar } from "./TaskDispatchBar";
import { PhaseProgression } from "./PhaseProgression";
import { ActiveTaskActionArea } from "./ActiveTaskActionArea";
import { ActivityLog } from "./ActivityLog";
import { LiveDiffViewer } from "./LiveDiffViewer";
import { CodeGraphVisualizer } from "./CodeGraphVisualizer";
import { ApprovalDialog } from "./ApprovalDialog";
import { NewProjectModal } from "./NewProjectModal";
import { AuthModal } from "@/components/auth-modal";

import {
  FileCode2,
  Network,
  Lock,
  ArrowRight,
  Fingerprint,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function WorkspaceView() {
  const { user, loading: authLoading } = useAuth();
  const {
    projects,
    selectedProject,
    setSelectedProject,
    addProject,
    reloadProjects,
  } = useProjects();

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
  const [rightPanelTab, setRightPanelTab] = useState<"diff" | "graph">("diff");
  const [sidebarTab, setSidebarTab] = useState<string>("agents");
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [copiedAnswer, setCopiedAnswer] = useState<boolean>(false);

  React.useEffect(() => {
    if (!authLoading && !user) {
      queueMicrotask(() => setIsAuthModalOpen(true));
    }
  }, [authLoading, user]);

  const streamState = useTaskStream(activeTaskId);
  const { handleApprove, handleReject } = useApprovals();

  const isTaskRunning =
    isLaunching ||
    streamState.status === "running" ||
    streamState.status === "connecting" ||
    streamState.status === "waiting_approval";

  const handleDispatchTask = async (prompt: string, mode: TaskMode) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!selectedProject) return;

    setIsLaunching(true);
    try {
      const task = await createTask({
        project_id: selectedProject.id,
        prompt,
        mode,
      });
      setActiveTask(task);
      setActiveTaskId(task.id);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Task dispatch failed";
      alert(`Task dispatch failed: ${msg}`);
    } finally {
      setIsLaunching(false);
    }
  };

  const handleCancelTask = async () => {
    if (!activeTaskId) return;
    try {
      await cancelTask(activeTaskId);
    } catch (err) {
      console.error("Failed to cancel task:", err);
    }
  };

  const onApproveGatedAction = async (comment?: string) => {
    const rawTargetId =
      streamState.pendingApproval?.metadata?.approval_id ||
      streamState.pendingApproval?.task_id ||
      streamState.pendingApproval?.id ||
      activeTaskId;
    const targetId = typeof rawTargetId === "string" ? rawTargetId : undefined;
    if (targetId) {
      await handleApprove(targetId, comment);
    }
  };

  const onRejectGatedAction = async (reason?: string) => {
    const rawTargetId =
      streamState.pendingApproval?.metadata?.approval_id ||
      streamState.pendingApproval?.task_id ||
      streamState.pendingApproval?.id ||
      activeTaskId;
    const targetId = typeof rawTargetId === "string" ? rawTargetId : undefined;
    if (targetId) {
      await handleReject(targetId, reason);
    }
  };

  // Extract latest agent answer / summary
  const latestAgentMessage = [...streamState.events]
    .reverse()
    .find((e) => e.type === "agent_message" || (e.type === "run_completed" && e.summary));

  const answerText: string =
    typeof latestAgentMessage?.metadata?.content === "string"
      ? latestAgentMessage.metadata.content
      : latestAgentMessage?.summary || "";

  const handleCopyAnswer = () => {
    if (!answerText) return;
    navigator.clipboard.writeText(answerText);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2000);
  };

  return (
    <div className="h-screen bg-[#000000] text-[#f3f4f6] flex flex-col font-sans overflow-hidden">
      {/* Top App Header */}
      <WorkspaceHeader
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onOpenNewProjectModal={() => {
          if (!user) {
            setIsAuthModalOpen(true);
            return;
          }
          setIsNewProjectModalOpen(true);
        }}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        isStreaming={streamState.isConnected && isTaskRunning}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main Workspace Body with Fixed Sidebar + Scrollable Content */}
      <div className="flex flex-1 h-[calc(100vh-56px)] overflow-hidden relative">
        {/* Left Side Navigation Bar */}
        <WorkspaceSidebar
          activeTab={sidebarTab}
          onSelectTab={setSidebarTab}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Central Command Center Content Area */}
        <main className="flex-1 overflow-y-auto p-2.5 sm:p-4 space-y-3 sm:space-y-4 bg-[#000000] tech-grid terminal-scroll">
          {!authLoading && !user ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6 py-8 max-w-4xl mx-auto"
            >
              <div className="relative rounded-2xl border border-white/20 bg-[#050508] p-8 sm:p-12 text-center shadow-2xl overflow-hidden font-mono">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs mb-6 font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Authentication Required</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Sign in to unlock the HELM Autonomous Console
                </h2>

                <p className="text-zinc-400 text-sm max-w-2xl mx-auto mt-4 leading-relaxed font-sans">
                  Access to the autonomous engineering runtime, AST codebase graph, live streaming execution, and surgical code modification tools requires an active developer account.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-mono font-bold text-xs shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:bg-zinc-200 transition-all cursor-pointer flex items-center justify-center gap-2 border border-white glow-primary"
                  >
                    <Fingerprint className="w-4 h-4 stroke-[2.5]" />
                    <span>Sign In to Unlock Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-mono text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Home</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Task Dispatch Console Bar */}
              <TaskDispatchBar
                onDispatchTask={handleDispatchTask}
                onCancelTask={handleCancelTask}
                isLoading={isLaunching}
                isRunning={isTaskRunning}
                disabled={!selectedProject || !user}
              />

              {/* Interactive Cycle Progress (5 Steps) */}
              <InteractiveCycleProgress
                currentPhase={streamState.currentPhase || (isTaskRunning ? "recon" : "idle")}
                status={streamState.status}
              />

              {/* Autonomous Pipeline Stages (6 Stages) */}
              <PhaseProgression
                currentPhase={streamState.currentPhase || (isTaskRunning ? "recon" : "idle")}
                selfCorrectionCount={streamState.selfCorrectionCount}
                status={streamState.status}
              />

              {/* Active Task Action Area (Diff Snippet & Approval Controls) */}
              <ActiveTaskActionArea
                activeTask={activeTask}
                pendingApproval={streamState.pendingApproval}
                onApprove={() => onApproveGatedAction()}
                onReject={() => onRejectGatedAction()}
              />

              {/* Agent Answer & Reasoning Box (when message is present) */}
              {latestAgentMessage && answerText && (
                <div className="p-4 rounded-xl bg-[#050508] border border-white/20 shadow-xl space-y-2.5 font-mono">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          {latestAgentMessage.title || "HELM Agent Response & Summary"}
                        </h4>
                        <span className="text-[10px] text-zinc-400">
                          Phase: {latestAgentMessage.phase}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyAnswer}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedAnswer ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedAnswer ? "Copied" : "Copy Reply"}</span>
                    </button>
                  </div>

                  <div className="text-zinc-200 text-xs leading-relaxed whitespace-pre-wrap font-sans bg-black/60 p-3 rounded-lg border border-white/10 selection:bg-white/20">
                    {answerText}
                  </div>
                </div>
              )}

              {/* Split Panel: Agent Activity Reasoning Feed (Left) & Diff/AST Code Graph (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Panel: Activity Log & Terminal (7 Cols) */}
                <div className="lg:col-span-7">
                  <ActivityLog
                    events={streamState.events}
                    isStreaming={streamState.isConnected}
                  />
                </div>

                {/* Right Panel: Live Diff & AST Code Graph (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col space-y-2">
                  <div className="flex items-center justify-between bg-[#050508] p-1.5 rounded-xl border border-white/10 font-mono text-xs">
                    <div className="flex items-center gap-1 bg-[#000000] p-0.5 rounded-lg border border-white/10">
                      <button
                        onClick={() => setRightPanelTab("diff")}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer font-bold",
                          rightPanelTab === "diff"
                            ? "bg-white text-black glow-primary"
                            : "text-zinc-400 hover:text-white"
                        )}
                      >
                        <FileCode2 className="w-3.5 h-3.5" />
                        <span>Diff View ({streamState.modifiedFiles?.length || 0})</span>
                      </button>

                      <button
                        onClick={() => setRightPanelTab("graph")}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer font-bold",
                          rightPanelTab === "graph"
                            ? "bg-white text-black glow-primary"
                            : "text-zinc-400 hover:text-white"
                        )}
                      >
                        <Network className="w-3.5 h-3.5" />
                        <span>AST Code Graph</span>
                      </button>
                    </div>

                    {streamState.testsCount.total > 0 && (
                      <div className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
                        Tests: <span className="text-emerald-400 font-bold">{streamState.testsCount.passed} passed</span> / {streamState.testsCount.total}
                      </div>
                    )}
                  </div>

                  {rightPanelTab === "diff" ? (
                    <LiveDiffViewer
                      taskId={activeTaskId}
                      modifiedFilesCount={streamState.modifiedFiles?.length || 0}
                    />
                  ) : (
                    <CodeGraphVisualizer projectId={selectedProject?.id || null} />
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Human-in-the-Loop Approval Modal */}
      {streamState.pendingApproval && (
        <ApprovalDialog
          approvalEvent={streamState.pendingApproval}
          onApprove={onApproveGatedAction}
          onReject={onRejectGatedAction}
        />
      )}

      {/* Connect New Repository Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreate={async (name, path, gitUrl) => {
          const p = await addProject(name, path, gitUrl);
          await reloadProjects();
          return p;
        }}
      />

      {/* Supabase Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
