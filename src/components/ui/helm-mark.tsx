import React from "react";
import { cn } from "@/lib/utils";

interface HelmMarkProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export function HelmMark({ className, size = 28, glow = false }: HelmMarkProps) {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center select-none", className)}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full bg-sky-500/20 blur-md pointer-events-none"
          style={{ transform: "scale(1.4)" }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        {/* Outer tactical ring */}
        <circle
          cx="16"
          cy="16"
          r="13.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          strokeDasharray="2 3"
        />
        {/* Main steering guidance ring */}
        <circle
          cx="16"
          cy="16"
          r="10"
          stroke="currentColor"
          strokeWidth="1.75"
          className="text-sky-400"
        />
        {/* Core command node */}
        <circle
          cx="16"
          cy="16"
          r="3"
          fill="currentColor"
          className="text-sky-400"
        />
        {/* 4 Cardinal steering rays */}
        <path
          d="M16 3V7M16 25V29M3 16H7M25 16H29"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="text-sky-400"
        />
        {/* 4 Diagonal micro telemetry pips */}
        <circle cx="7.5" cy="7.5" r="0.75" fill="currentColor" fillOpacity="0.6" />
        <circle cx="24.5" cy="7.5" r="0.75" fill="currentColor" fillOpacity="0.6" />
        <circle cx="7.5" cy="24.5" r="0.75" fill="currentColor" fillOpacity="0.6" />
        <circle cx="24.5" cy="24.5" r="0.75" fill="currentColor" fillOpacity="0.6" />
      </svg>
    </div>
  );
}
