import React from "react";
import { cn } from "@/lib/utils";

export type StatusType = "healthy" | "pending" | "incident" | "active" | "neutral";

interface StatusDotProps {
  status?: StatusType;
  className?: string;
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
}

const statusConfig: Record<
  StatusType,
  { bg: string; ring: string; pulseBg: string; text: string }
> = {
  healthy: {
    bg: "bg-emerald-400",
    ring: "border-emerald-500/30",
    pulseBg: "bg-emerald-400/40",
    text: "text-emerald-400",
  },
  pending: {
    bg: "bg-amber-400",
    ring: "border-amber-500/30",
    pulseBg: "bg-amber-400/40",
    text: "text-amber-400",
  },
  incident: {
    bg: "bg-rose-500",
    ring: "border-rose-500/30",
    pulseBg: "bg-rose-500/40",
    text: "text-rose-400",
  },
  active: {
    bg: "bg-slate-200 dark:bg-white",
    ring: "border-slate-300 dark:border-white/30",
    pulseBg: "bg-slate-300/40 dark:bg-white/40",
    text: "text-slate-900 dark:text-white",
  },
  neutral: {
    bg: "bg-zinc-400",
    ring: "border-zinc-500/30",
    pulseBg: "bg-zinc-400/30",
    text: "text-zinc-400",
  },
};

const sizeConfig = {
  sm: { dot: "w-1.5 h-1.5", ring: "w-3 h-3" },
  md: { dot: "w-2 h-2", ring: "w-4 h-4" },
  lg: { dot: "w-2.5 h-2.5", ring: "w-5 h-5" },
};

export function StatusDot({
  status = "healthy",
  className,
  pulse = true,
  size = "md",
}: StatusDotProps) {
  const config = statusConfig[status];
  const dimensions = sizeConfig[size];

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center shrink-0",
        dimensions.ring,
        className
      )}
    >
      {pulse && (
        <span
          className={cn(
            "absolute inset-0 rounded-full animate-ping opacity-60",
            config.pulseBg
          )}
          style={{ animationDuration: "2.4s" }}
        />
      )}
      <span
        className={cn(
          "relative rounded-full inline-block shadow-[0_0_8px_rgba(0,0,0,0.5)]",
          dimensions.dot,
          config.bg
        )}
      />
    </span>
  );
}
