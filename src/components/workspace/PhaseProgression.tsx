"use client";

import React from "react";
import { CheckCircle2, Loader2, Hourglass } from "lucide-react";
import { PhaseName } from "@/types/api";
import { cn } from "@/lib/utils";

interface PhaseProgressionProps {
  currentPhase: PhaseName | string;
  selfCorrectionCount: number;
  status: string;
}

export function PhaseProgression({
  currentPhase,
  selfCorrectionCount,
  status,
}: PhaseProgressionProps) {
  const stages: { id: string; label: string; number: string }[] = [
    { id: "recon", label: "RECON", number: "01" },
    { id: "plan", label: "PLAN", number: "02" },
    { id: "execute", label: "EXECUTE", number: "03" },
    { id: "verify", label: "VERIFY", number: "04" },
    { id: "review", label: "REVIEW", number: "05" },
    { id: "ship", label: "SHIP", number: "06" },
  ];

  const phaseOrder: Record<string, number> = {
    ask: 0,
    recon: 1,
    plan: 2,
    execute: 3,
    verify: 4,
    self_correct: 4,
    review: 5,
    ship: 6,
    completed: 7,
  };

  const isIdle = !currentPhase || currentPhase.toLowerCase() === "idle";
  const currentOrder = isIdle ? 0 : phaseOrder[currentPhase.toLowerCase()] ?? 0;

  return (
    <div className="glass-panel p-3.5 rounded-xl flex flex-col gap-2 border border-white/10 font-sans">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {stages.map((stage, idx) => {
          const stepNumber = idx + 1;
          const isCurrent =
            !isIdle &&
            (currentPhase.toLowerCase() === stage.id ||
              (stage.id === "review" && status === "waiting_approval") ||
              (stage.id === "verify" && currentPhase.toLowerCase() === "self_correct"));
          const isPassed = !isIdle && currentOrder > stepNumber && !isCurrent;
          const isUpcoming = isIdle || (currentOrder < stepNumber && !isCurrent);

          return (
            <div
              key={stage.id}
              className={cn(
                "rounded-lg p-2.5 flex flex-col gap-1 relative overflow-hidden transition-all",
                isPassed &&
                  "bg-white/5 border border-white/15 text-zinc-300",
                isCurrent &&
                  "bg-white/10 border border-white text-white glow-primary shadow-[0_0_15px_rgba(255,255,255,0.2)]",
                isUpcoming &&
                  "bg-white/5 border border-white/5 text-zinc-600 opacity-60"
              )}
            >
              {/* Left accent border */}
              <div
                className={cn(
                  "absolute top-0 left-0 w-0.5 h-full",
                  isPassed && "bg-white/60",
                  isCurrent && "bg-white animate-pulse",
                  isUpcoming && "bg-transparent"
                )}
              />

              <div className="flex justify-between items-start">
                {isPassed && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
                {isCurrent && (
                  <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                )}
                {isUpcoming && (
                  <Hourglass className="w-3.5 h-3.5 text-zinc-600" />
                )}
                <span className="text-[9px] text-zinc-400 font-bold">{stage.number}</span>
              </div>

              <div>
                <h4
                  className={cn(
                    "text-[11px] font-bold tracking-wider",
                    isCurrent ? "text-white" : isPassed ? "text-zinc-200" : "text-zinc-600"
                  )}
                >
                  {stage.label}
                </h4>
                <span
                  className={cn(
                    "text-[9px] block font-mono",
                    isCurrent
                      ? "text-white font-semibold"
                      : isPassed
                      ? "text-emerald-400"
                      : "text-zinc-600"
                  )}
                >
                  {isCurrent
                    ? status === "waiting_approval"
                      ? "Pending Approval"
                      : "In Progress"
                    : isPassed
                    ? "Complete"
                    : "Pending"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
