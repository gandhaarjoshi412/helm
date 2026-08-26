"use client";

import React, { useState, KeyboardEvent } from "react";
import {
  Play,
  Sparkles,
  Bot,
  Zap,
  Loader2,
  Wand2,
  Square,
  StopCircle,
} from "lucide-react";
import { TaskMode } from "@/types/api";
import { cn } from "@/lib/utils";

interface TaskDispatchBarProps {
  onDispatchTask: (prompt: string, mode: TaskMode) => Promise<void>;
  onCancelTask: () => Promise<void>;
  isLoading: boolean;
  isRunning: boolean;
  disabled?: boolean;
}

export function TaskDispatchBar({
  onDispatchTask,
  onCancelTask,
  isLoading,
  isRunning,
  disabled,
}: TaskDispatchBarProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [mode, setMode] = useState<TaskMode>("autonomous");
  const [isAborting, setIsAborting] = useState<boolean>(false);

  const promptTemplates = [
    "Fix failing tests and add assertions for timeout handling",
    "Add exponential backoff retry with jitter to API client",
    "Refactor database connection pool and add healthcheck",
    "Run security scan and sanitize untrusted user inputs",
  ];

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading || isRunning || disabled) return;
    await onDispatchTask(prompt.trim(), mode);
  };

  const handleAbort = async () => {
    setIsAborting(true);
    try {
      await onCancelTask();
    } finally {
      setIsAborting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isRunning && !isLoading) {
        handleSubmit();
      }
    }
  };

  const isBusy = isRunning || isLoading;

  return (
    <div className="bg-[#0f1017] border border-white/10 rounded-xl p-4 shadow-2xl relative overflow-hidden">
      {/* Top Bar: Mode Selector & Quick Templates */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-[#141622] p-1 rounded-lg border border-white/5 text-xs font-mono">
          <button
            type="button"
            disabled={isBusy}
            onClick={() => setMode("autonomous")}
            className={cn(
              "px-3 py-1 rounded-md transition-all flex items-center gap-1.5",
              mode === "autonomous"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-zinc-200",
              isBusy && "opacity-60 cursor-not-allowed"
            )}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous</span>
          </button>

          <button
            type="button"
            disabled={isBusy}
            onClick={() => setMode("guided")}
            className={cn(
              "px-3 py-1 rounded-md transition-all flex items-center gap-1.5",
              mode === "guided"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-zinc-200",
              isBusy && "opacity-60 cursor-not-allowed"
            )}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Guided</span>
          </button>

          <button
            type="button"
            disabled={isBusy}
            onClick={() => setMode("assist")}
            className={cn(
              "px-3 py-1 rounded-md transition-all flex items-center gap-1.5",
              mode === "assist"
                ? "bg-indigo-600 text-white shadow-sm font-semibold"
                : "text-zinc-400 hover:text-zinc-200",
              isBusy && "opacity-60 cursor-not-allowed"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Assist</span>
          </button>
        </div>

        {/* Status Pill */}
        <span className="text-[11px] font-mono text-zinc-400 hidden sm:flex items-center gap-2">
          {isBusy ? (
            <span className="text-amber-300 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Agent running... Click Abort to cancel anytime
            </span>
          ) : (
            <span>
              {mode === "autonomous" && "⚡ Full auto: Recon → Plan → Edit → Verify → Gate"}
              {mode === "guided" && "🛡️ Human checks plan before executing file changes"}
              {mode === "assist" && "🤝 Pair mode with real-time feedback loops"}
            </span>
          )}
        </span>
      </div>

      {/* Prompt Text Area */}
      <div className="relative">
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isBusy}
          placeholder="Describe engineering task (e.g. 'Investigate flaky payment test, fix the retry logic, run pytest and verify diff')..."
          className="w-full bg-[#141520] border border-white/10 rounded-lg p-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 font-mono resize-none transition-colors disabled:opacity-75"
        />

        {/* Dynamic Action Button (Transforms between Execute Intent and Abort) */}
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          {isBusy ? (
            <button
              onClick={handleAbort}
              type="button"
              disabled={isAborting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/40 border border-rose-400/40 transition-all cursor-pointer animate-pulse"
              title="Stop agent execution immediately"
            >
              {isAborting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <StopCircle className="w-3.5 h-3.5" />
              )}
              <span>{isAborting ? "Aborting..." : "Abort"}</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || disabled}
              type="button"
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium shadow-md transition-all",
                !prompt.trim() || disabled
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 hover:shadow-indigo-600/50 cursor-pointer"
              )}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Execute Intent</span>
            </button>
          )}
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono text-zinc-400 no-scrollbar">
        <span className="text-zinc-600 flex items-center gap-1 whitespace-nowrap">
          <Wand2 className="w-3 h-3 text-indigo-400" /> Templates:
        </span>
        {promptTemplates.map((tpl, i) => (
          <button
            key={i}
            type="button"
            disabled={isBusy}
            onClick={() => setPrompt(tpl)}
            className="whitespace-nowrap bg-white/5 hover:bg-white/10 hover:text-indigo-300 border border-white/5 px-2.5 py-1 rounded-md transition-colors disabled:opacity-50"
          >
            {tpl}
          </button>
        ))}
      </div>
    </div>
  );
}
