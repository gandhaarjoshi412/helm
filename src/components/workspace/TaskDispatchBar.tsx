"use client";

import React, { useState, KeyboardEvent } from "react";
import {
  Play,
  Sparkles,
  Bot,
  Zap,
  Loader2,
  Wand2,
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
    <div className="bg-[#08090f]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 sm:p-7 shadow-[0_30px_70px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden font-sans space-y-4">
      {/* Top Bar: Mode Selector & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Mode Selector Group */}
        <div className="flex items-center gap-1.5 bg-[#030305] p-1.5 rounded-2xl border border-white/20 text-xs font-sans shadow-inner">
          <button
            type="button"
            disabled={isBusy}
            onClick={() => setMode("autonomous")}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer text-xs sm:text-sm tracking-tight",
              mode === "autonomous"
                ? "bg-white text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                : "text-zinc-400 hover:text-white hover:bg-white/10",
              isBusy && "opacity-60 cursor-not-allowed"
            )}
          >
            <Zap className="w-4 h-4 fill-current shrink-0" />
            <span>Autonomous</span>
          </button>

          <button
            type="button"
            disabled={isBusy}
            onClick={() => setMode("guided")}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer text-xs sm:text-sm tracking-tight",
              mode === "guided"
                ? "bg-white text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                : "text-zinc-400 hover:text-white hover:bg-white/10",
              isBusy && "opacity-60 cursor-not-allowed"
            )}
          >
            <Bot className="w-4 h-4 shrink-0" />
            <span>Guided</span>
          </button>

          <button
            type="button"
            disabled={isBusy}
            onClick={() => setMode("assist")}
            className={cn(
              "px-4 py-2 rounded-xl transition-all flex items-center gap-2 font-bold cursor-pointer text-xs sm:text-sm tracking-tight",
              mode === "assist"
                ? "bg-white text-black border border-white shadow-[0_0_20px_rgba(255,255,255,0.35)]"
                : "text-zinc-400 hover:text-white hover:bg-white/10",
              isBusy && "opacity-60 cursor-not-allowed"
            )}
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Assist</span>
          </button>
        </div>

        {/* Status Description */}
        <span className="text-xs sm:text-sm text-zinc-300 font-medium hidden sm:flex items-center gap-2 font-sans">
          {isBusy ? (
            <span className="text-amber-300 flex items-center gap-2 animate-pulse font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Agent executing intent... Click Abort to cancel anytime
            </span>
          ) : (
            <span className="flex items-center gap-2 text-zinc-300 font-semibold">
              {mode === "autonomous" && "⚡ Full Auto: Recon → Plan → Code → Test → Approval Gate"}
              {mode === "guided" && "🛡️ Guided: Human reviews plan before executing changes"}
              {mode === "assist" && "🤝 Pair Mode: Real-time interactive feedback loops"}
            </span>
          )}
        </span>
      </div>

      {/* Prompt Input Box */}
      <div className="relative">
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isBusy}
          placeholder="Describe engineering task (e.g. 'Investigate flaky payment test, fix the retry logic, run pytest and verify diff')..."
          className="w-full bg-[#030305] border border-white/25 focus:border-white focus:ring-1 focus:ring-white rounded-2xl p-3.5 sm:p-5 pb-14 sm:pb-5 sm:pr-44 text-xs sm:text-base text-white placeholder:text-zinc-500 font-sans leading-relaxed transition-all outline-none resize-none disabled:opacity-70 shadow-inner"
        />

        {/* Action Button (Positioned cleanly inside bottom right) */}
        <div className="absolute right-3 bottom-3 sm:right-3.5 sm:bottom-3.5 flex items-center gap-2">
          {isBusy ? (
            <button
              onClick={handleAbort}
              type="button"
              disabled={isAborting}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-lg border border-rose-400 transition-all cursor-pointer animate-pulse"
              title="Stop agent execution immediately"
            >
              {isAborting ? (
                <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
              ) : (
                <StopCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
              <span>{isAborting ? "Aborting..." : "Abort"}</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!prompt.trim() || disabled}
              type="button"
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-sans font-extrabold transition-all border cursor-pointer",
                !prompt.trim() || disabled
                  ? "bg-white/10 text-zinc-500 border-white/10 cursor-not-allowed"
                  : "bg-white text-black border-white hover:bg-zinc-100 shadow-[0_0_25px_rgba(255,255,255,0.35)] glow-primary"
              )}
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
              <span>Execute Intent</span>
            </button>
          )}
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5 text-xs sm:text-sm text-zinc-400 no-scrollbar font-sans">
        <span className="text-zinc-300 flex items-center gap-1.5 font-bold whitespace-nowrap">
          <Wand2 className="w-4 h-4 text-white" /> Templates:
        </span>
        {promptTemplates.map((tpl, i) => (
          <button
            key={i}
            type="button"
            disabled={isBusy}
            onClick={() => setPrompt(tpl)}
            className="whitespace-nowrap bg-white/5 hover:bg-white/15 hover:text-white border border-white/15 hover:border-white/35 px-4 py-2 rounded-xl transition-all disabled:opacity-50 cursor-pointer text-xs sm:text-sm font-sans font-medium text-zinc-300"
          >
            {tpl}
          </button>
        ))}
      </div>
    </div>
  );
}
