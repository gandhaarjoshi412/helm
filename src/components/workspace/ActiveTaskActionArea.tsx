"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Search, ThumbsUp, Info, X } from "lucide-react";
import { Task, AgentEvent } from "@/types/api";
import { fetchTaskChanges } from "@/lib/api";

interface ActiveTaskActionAreaProps {
  activeTask: Task | null;
  pendingApproval?: AgentEvent | null;
  onApprove?: () => void;
  onReject?: () => void;
}

export function ActiveTaskActionArea({
  activeTask,
  pendingApproval,
  onApprove,
  onReject,
}: ActiveTaskActionAreaProps) {
  const [realDiff, setRealDiff] = useState<string | null>(null);

  useEffect(() => {
    if (!activeTask?.id) {
      queueMicrotask(() => setRealDiff(null));
      return;
    }

    const loadDiff = async () => {
      try {
        const changes = await fetchTaskChanges(activeTask.id);
        if (changes?.raw_diff || changes?.unified_diff) {
          setRealDiff(changes.raw_diff || changes.unified_diff || null);
        }
      } catch (err) {
        // Task diff still generating
      }
    };

    loadDiff();
    const interval = setInterval(loadDiff, 4000);
    return () => clearInterval(interval);
  }, [activeTask?.id]);

  const taskTitle =
    pendingApproval?.title ||
    activeTask?.prompt ||
    "System Standby";

  const taskId =
    activeTask?.id
      ? `TASK-${activeTask.id.slice(0, 6)}`
      : pendingApproval?.task_id
      ? `TASK-${pendingApproval.task_id.slice(0, 6)}`
      : "IDLE";

  const description =
    pendingApproval?.summary ||
    (activeTask
      ? `Agent is actively processing mode [${activeTask.mode}] in phase [${activeTask.phase || "Recon"}]. Code changes verified against test suite.`
      : "No task currently executing. Enter a prompt in the task dispatch bar below to assign an autonomous engineering goal.");

  const hasTask = Boolean(activeTask || pendingApproval);

  return (
    <div className="glass-panel p-4 rounded-xl flex flex-col border border-white/15 shadow-[inset_0_0_20px_rgba(255,255,255,0.03)] font-sans">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 bg-white/10 text-white text-[9px] rounded-lg border border-white/20 uppercase tracking-wider font-bold">
              {pendingApproval ? "Awaiting Human Approval" : activeTask ? "Active Execution" : "System Workspace"}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">{taskId}</span>
          </div>
          <h2 className="text-lg text-white font-bold tracking-tight mb-1">{taskTitle}</h2>
          <p className="text-[13px] text-zinc-400 font-sans max-w-2xl leading-normal">
            {description}
          </p>
        </div>

        <button className="text-zinc-400 hover:text-white p-1">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Code Snippet Box */}
      <div className="bg-[#050508] rounded-xl border border-white/10 p-3 font-mono text-[12px] text-zinc-200 overflow-y-auto max-h-48 mb-3 terminal-scroll">
        {realDiff ? (
          <pre className="text-[11px] leading-relaxed whitespace-pre-wrap font-mono text-zinc-300">
            {realDiff.split("\n").slice(0, 15).map((line, i) => {
              const isAdd = line.startsWith("+") && !line.startsWith("+++");
              const isDel = line.startsWith("-") && !line.startsWith("---");
              return (
                <div
                  key={i}
                  className={`px-1 py-0.5 flex gap-2 ${
                    isAdd ? "text-emerald-400 font-bold" : isDel ? "text-rose-400" : "text-zinc-400"
                  }`}
                >
                  <span className="text-zinc-600 w-6 text-right select-none">{i + 1}</span>
                  <span>{line}</span>
                </div>
              );
            })}
          </pre>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center text-zinc-500 font-mono space-y-1 text-center">
            <Info className="w-5 h-5 text-zinc-400 opacity-50" />
            <span className="text-xs text-zinc-300 font-bold">No Active Code Modifications</span>
            <span className="text-[11px] text-zinc-500">
              {hasTask
                ? "Agent is performing initial analysis. Diff preview will update automatically."
                : "AST diffs and verified patch previews will render here upon task execution."}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] mt-2 pt-2 border-t border-white/5">
          <Info className="w-3.5 h-3.5 text-zinc-400" />
          <span>Diff shows live AST modifications and verified tests</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2.5 justify-end pt-2 border-t border-white/10">
        <button
          disabled={!hasTask}
          className="px-4 py-1.5 rounded-lg border border-white/20 text-zinc-300 hover:bg-white/5 transition-colors font-mono text-[11px] flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Investigate</span>
        </button>

        <button
          onClick={onReject}
          disabled={!pendingApproval}
          className="px-4 py-1.5 rounded-lg border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 transition-colors font-mono text-[11px] flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span>Deny</span>
        </button>

        <button
          onClick={onApprove}
          disabled={!pendingApproval}
          className="px-6 py-1.5 rounded-lg bg-white text-black border border-white font-mono text-[11px] font-bold hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,255,255,0.25)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer glow-primary"
        >
          <ThumbsUp className="w-4 h-4 stroke-[2.5]" />
          <span>Approve &amp; Ship</span>
        </button>
      </div>
    </div>
  );
}
