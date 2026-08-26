"use client";

import React from "react";
import {
  Search,
  FileCheck2,
  Code2,
  CheckCircle2,
  Eye,
  Rocket,
  AlertTriangle,
  RotateCw,
  Clock,
} from "lucide-react";
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
  const phases: { id: PhaseName; label: string; icon: any }[] = [
    { id: "recon", label: "RECON", icon: Search },
    { id: "plan", label: "PLAN", icon: FileCheck2 },
    { id: "execute", label: "EXECUTE", icon: Code2 },
    { id: "verify", label: "VERIFY", icon: CheckCircle2 },
    { id: "review", label: "REVIEW", icon: Eye },
    { id: "ship", label: "SHIP", icon: Rocket },
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

  const currentOrder = phaseOrder[currentPhase.toLowerCase()] || 0;

  return (
    <div className="bg-[#0f1017] border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          Autonomous Pipeline Stages
        </span>

        {selfCorrectionCount > 0 && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <RotateCw className="w-3 h-3 animate-spin text-amber-400" />
            <span>Self-Corrections: {selfCorrectionCount}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {phases.map((p, idx) => {
          const stepNumber = idx + 1;
          const isCurrent =
            currentPhase.toLowerCase() === p.id ||
            (p.id === "verify" && currentPhase.toLowerCase() === "self_correct");
          const isPassed = currentOrder > stepNumber;
          const isUpcoming = currentOrder < stepNumber;

          const IconComponent = p.icon;

          return (
            <div
              key={p.id}
              className={cn(
                "p-2.5 rounded-lg border transition-all flex flex-col gap-1.5 relative overflow-hidden",
                isCurrent &&
                  "bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-500/10",
                isPassed && "bg-emerald-950/20 border-emerald-500/30 text-emerald-400",
                isUpcoming && "bg-white/[0.02] border-white/5 text-zinc-500"
              )}
            >
              {isCurrent && (
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse" />
              )}

              <div className="flex items-center justify-between">
                <IconComponent
                  className={cn(
                    "w-4 h-4",
                    isCurrent && "text-indigo-400 animate-pulse",
                    isPassed && "text-emerald-400",
                    isUpcoming && "text-zinc-600"
                  )}
                />
                <span className="text-[10px] font-mono text-zinc-500">0{stepNumber}</span>
              </div>

              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-xs font-mono font-semibold",
                    isCurrent && "text-white",
                    isPassed && "text-emerald-300",
                    isUpcoming && "text-zinc-500"
                  )}
                >
                  {p.label}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 capitalize">
                  {isCurrent
                    ? currentPhase === "self_correct"
                      ? "Diagnosing & Retrying"
                      : "In Progress"
                    : isPassed
                    ? "Completed"
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
