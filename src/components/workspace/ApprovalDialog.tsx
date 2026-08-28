"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  GitPullRequest,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
  ArrowRight,
  GitBranch,
} from "lucide-react";
import { AgentEvent, ApprovalRequest } from "@/types/api";
import { cn } from "@/lib/utils";

interface ApprovalDialogProps {
  approvalEvent: AgentEvent | null;
  onApprove: (comment?: string) => Promise<void>;
  onReject: (reason?: string) => Promise<void>;
}

export function ApprovalDialog({
  approvalEvent,
  onApprove,
  onReject,
}: ApprovalDialogProps) {
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!approvalEvent) return null;

  const metadata = approvalEvent.metadata || {};
  const actionType = String(metadata.action_type || approvalEvent.tool_name || "Gated Action");
  const branch = String(metadata.branch || "fix/autonomous-patch");
  const commitMsg = String(metadata.commit_message || "feat: apply validated changes");

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      await onApprove(comment);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    try {
      await onReject(comment);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0f1018] border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl shadow-amber-500/10 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              Human-in-the-Loop Approval Required
            </h3>
            <p className="text-xs text-amber-300 font-mono">
              Action: <span className="uppercase font-bold">{actionType}</span>
            </p>
          </div>
        </div>

        {/* Action Details Box */}
        <div className="bg-[#141522] border border-white/10 rounded-xl p-4 space-y-2.5 text-xs font-mono">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
              Target Branch:
            </span>
            <span className="text-indigo-300 font-semibold">{branch}</span>
          </div>

          <div className="flex flex-col gap-1 text-zinc-400 pt-2 border-t border-white/5">
            <span className="text-[11px] text-zinc-500">Proposed Commit / PR Summary:</span>
            <p className="text-zinc-200 bg-[#090a10] p-2.5 rounded border border-white/5 leading-relaxed">
              {commitMsg}
            </p>
          </div>

          {approvalEvent.summary && (
            <p className="text-zinc-400 text-[11px] leading-relaxed pt-1">
              {approvalEvent.summary}
            </p>
          )}
        </div>

        {/* Optional Comment Input */}
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1.5">
            Optional Feedback / Note:
          </label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="e.g. Looks good to ship!"
            className="w-full bg-[#141522] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleReject}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <XCircle className="w-3.5 h-3.5" />
            )}
            <span>Reject & Cancel</span>
          </button>

          <button
            onClick={handleApprove}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs font-mono shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            <span>Approve & Ship</span>
          </button>
        </div>
      </div>
    </div>
  );
}
