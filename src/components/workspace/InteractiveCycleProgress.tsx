"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface InteractiveCycleProgressProps {
  currentPhase?: string;
  status?: string;
}

export function InteractiveCycleProgress({ currentPhase = "idle", status }: InteractiveCycleProgressProps) {
  const steps = [
    { number: 1, label: "1. Investigate", id: "recon" },
    { number: 2, label: "2. Review Ready", id: "plan" },
    { number: 3, label: "3. Approve", id: "review" },
    { number: 4, label: "4. Verify & Test", id: "verify" },
    { number: 5, label: "5. Shipped", id: "ship" },
  ];

  const getStepStatus = (stepId: string, idx: number) => {
    if (!currentPhase || currentPhase.toLowerCase() === "idle") {
      return "pending";
    }

    const activeMap: Record<string, number> = {
      recon: 0,
      plan: 1,
      execute: 1,
      review: 2,
      verify: 3,
      self_correct: 3,
      ship: 4,
      completed: 5,
    };

    const currentIdx = activeMap[currentPhase.toLowerCase()] ?? -1;

    if (currentIdx < 0) return "pending";
    if (idx < currentIdx) return "completed";
    if (idx === currentIdx) return "active";
    return "pending";
  };

  return (
    <div className="glass-panel p-3.5 rounded-xl flex flex-col gap-2 border border-white/10 font-mono">
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, idx) => {
          const stepState = getStepStatus(step.id, idx);
          return (
            <div key={step.number} className="flex-1 flex flex-col gap-1.5">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden relative">
                {stepState === "completed" && (
                  <div className="h-full bg-white/60 w-full" />
                )}
                {stepState === "active" && (
                  <div className="h-full bg-white w-full relative overflow-hidden">
                    <div className="h-full bg-white/40 w-full animate-pulse absolute inset-0" />
                  </div>
                )}
                {stepState === "pending" && (
                  <div className="h-full bg-white/5 w-full" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] text-center font-mono transition-colors",
                  stepState === "completed" && "text-zinc-300",
                  stepState === "active" && "text-white font-bold tracking-wide",
                  stepState === "pending" && "text-zinc-600"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
