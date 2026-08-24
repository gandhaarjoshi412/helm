import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface KodiumMarkProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export function KodiumMark({ className, size = 28, glow = true }: KodiumMarkProps) {
  const rawId = useId();
  const gradientId = `kodium-grad-${rawId.replace(/:/g, "")}`;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center select-none shrink-0", className)}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-slate-400/20 via-white/30 to-slate-200/20 blur-md pointer-events-none"
          style={{ transform: "scale(1.35)" }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
      >
        <defs>
          <linearGradient id={gradientId} x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        {/* Stem of K with slanted top edge and inner notch */}
        <path
          d="M 28 80 V 27 L 44 14 V 42 L 37 49 L 44 56 V 80 H 28 Z"
          fill={`url(#${gradientId})`}
        />

        {/* Upper diagonal arm extending up-right */}
        <path
          d="M 40 44 L 78 26 V 40 L 48 57 L 40 44 Z"
          fill={`url(#${gradientId})`}
        />

        {/* Lower diagonal arm extending down-right */}
        <path
          d="M 48 57 L 78 78 H 63 L 40 54 L 48 57 Z"
          fill={`url(#${gradientId})`}
        />
      </svg>
    </div>
  );
}
