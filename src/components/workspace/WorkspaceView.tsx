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
import { TaskDispatchBar } from "./TaskDispatchBar";
import { PhaseProgression } from "./PhaseProgression";
import { ActivityLog } from "./ActivityLog";
import { LiveDiffViewer } from "./LiveDiffViewer";
import { CodeGraphVisualizer } from "./CodeGraphVisualizer";
import { ApprovalDialog } from "./ApprovalDialog";
import { NewProjectModal } from "./NewProjectModal";
import { AuthModal } from "@/components/auth-modal";

import {
  FileCode2,
  Network,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  Bot,
  Copy,
  Check,
  Lock,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  GitPullRequest,
  Fingerprint,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [copiedAnswer, setCopiedAnswer] = useState<boolean>(false);

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
    } catch (err: any) {
      alert(`Task dispatch failed: ${err.message}`);
    } finally {
      setIsLaunching(false);
    }
  };

  const handleCancelTask = async () => {
    if (!activeTaskId) return;
    try {
      await cancelTask(activeTaskId);
    } catch (err: any) {
      console.error("Failed to cancel task:", err);
    }
  };

  const onApproveGatedAction = async (comment?: string) => {
    const targetId =
      streamState.pendingApproval?.metadata?.approval_id ||
      streamState.pendingApproval?.task_id ||
      streamState.pendingApproval?.id ||
      activeTaskId;
    if (targetId) {
      await handleApprove(targetId, comment);
    }
  };

  const onRejectGatedAction = async (reason?: string) => {
    const targetId =
      streamState.pendingApproval?.metadata?.approval_id ||
      streamState.pendingApproval?.task_id ||
      streamState.pendingApproval?.id ||
      activeTaskId;
    if (targetId) {
      await handleReject(targetId, reason);
    }
  };

  // Extract latest agent answer / summary
  const latestAgentMessage = [...streamState.events]
    .reverse()
    .find((e) => e.type === "agent_message" || (e.type === "run_completed" && e.summary));

  const answerText =
    latestAgentMessage?.metadata?.content || latestAgentMessage?.summary || "";

  const handleCopyAnswer = () => {
    if (!answerText) return;
    navigator.clipboard.writeText(answerText);
    setCopiedAnswer(true);
    setTimeout(() => setCopiedAnswer(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#08090e] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-200">
      {/* Top Header */}
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
      />

      {/* Main Workspace Body */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-4">
        {/* Full Unauthenticated Lock Gate View */}
        {!authLoading && !user ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full space-y-6 py-6 sm:py-10"
          >
            {/* Primary Security Hero Card */}
            <div className="relative rounded-2xl bg-gradient-to-b from-[#12131e] via-[#0d0e17] to-[#08090e] border border-indigo-500/30 p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden">
              {/* Background ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-6">
                <Lock className="w-3.5 h-3.5" />
                <span className="font-semibold tracking-wider uppercase">Authentication Required</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
                Sign in to unlock the HELM Autonomous Console
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-sans">
                Access to the autonomous engineering runtime, AST codebase graph, live streaming execution, and surgical code modification tools requires an active developer account.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <Fingerprint className="w-4 h-4 text-indigo-200" />
                  <span>Sign In with Supabase to Unlock</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/10 font-mono text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Kodium Overview</span>
                </Link>
              </div>
            </div>

            {/* Feature Access Matrix (Visual preview of locked capabilities) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[#0e0f18] border border-white/10 space-y-2.5 relative">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-3 h-3 text-zinc-500" /> Locked
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">8-Phase Autonomous SWE Loop</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Direct the Hermes agent runtime through Recon, Planning, Surgical Tool Edits, Sandbox Verification, and Self-Correction.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e0f18] border border-white/10 space-y-2.5 relative">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Network className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-3 h-3 text-zinc-500" /> Locked
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">AST Code Graph & Retrieval</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Multi-language AST parsing, caller/callee relationship trees, symbol lookup, and hybrid keyword/graph search across Python & TypeScript.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e0f18] border border-white/10 space-y-2.5 relative">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-3 h-3 text-zinc-500" /> Locked
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">Gated Approval & Live Diffs</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Real-time unified diff streaming and security policy enforcement with cryptographic human-in-the-loop authorization gates.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Task Dispatch Console */}
            <TaskDispatchBar
              onDispatchTask={handleDispatchTask}
              onCancelTask={handleCancelTask}
              isLoading={isLaunching}
              isRunning={isTaskRunning}
              disabled={!selectedProject || !user}
            />

            {/* Phase Stepper */}
            <PhaseProgression
              currentPhase={streamState.currentPhase}
              selfCorrectionCount={streamState.selfCorrectionCount}
              status={streamState.status}
            />

            {/* Prominent Agent Answer & Reasoning Box (when message is present) */}
            {latestAgentMessage && answerText && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#121422] to-[#0c0d16] border border-indigo-500/30 shadow-xl shadow-indigo-950/20 space-y-2.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white tracking-wide">
                        {latestAgentMessage.title || "HELM Agent Response & Summary"}
                      </h4>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        Phase: {latestAgentMessage.phase}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyAnswer}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedAnswer ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedAnswer ? "Copied" : "Copy Reply"}</span>
                  </button>
                </div>

                <div className="text-zinc-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans bg-black/40 p-4 rounded-lg border border-white/5 selection:bg-indigo-500/30">
                  {answerText}
                </div>
              </div>
            )}

            {/* Dual Panel Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Left Panel: Activity Log / Terminal (7 Cols) */}
              <div className="lg:col-span-7">
                <ActivityLog
                  events={streamState.events}
                  isStreaming={streamState.isConnected}
                />
              </div>

              {/* Right Panel: Tabs for Live Diff & Code Graph (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col space-y-2">
                {/* Tab Selector */}
                <div className="flex items-center justify-between bg-[#11121c] p-1 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1 text-xs font-mono">
                    <button
                      onClick={() => setRightPanelTab("diff")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer",
                        rightPanelTab === "diff"
                          ? "bg-indigo-600 text-white font-medium shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      <FileCode2 className="w-3.5 h-3.5" />
                      <span>Diff View ({streamState.modifiedFiles?.length || 0})</span>
                    </button>

                    <button
                      onClick={() => setRightPanelTab("graph")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer",
                        rightPanelTab === "graph"
                          ? "bg-indigo-600 text-white font-medium shadow-sm"
                          : "text-zinc-400 hover:text-zinc-200"
                      )}
                    >
                      <Network className="w-3.5 h-3.5" />
                      <span>AST Code Graph</span>
                    </button>
                  </div>

                  {streamState.testsCount.total > 0 && (
                    <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-400">
                      Tests: <span className="text-emerald-400">{streamState.testsCount.passed} passed</span> / {streamState.testsCount.total}
                    </div>
                  )}
                </div>

                {/* Tab Content */}
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
