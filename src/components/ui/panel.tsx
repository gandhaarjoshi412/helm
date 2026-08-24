import React from "react";
import { cn } from "@/lib/utils";

interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerRight?: React.ReactNode;
  showDots?: boolean;
  glow?: boolean;
  glowColor?: "sky" | "emerald" | "amber" | "rose";
  nested?: boolean;
}

export function Panel({
  children,
  className,
  title,
  subtitle,
  headerRight,
  showDots = false,
  glow = false,
  glowColor = "sky",
  nested = false,
  ...props
}: PanelProps) {
  const glowStyles = {
    sky: "before:bg-sky-500/10",
    emerald: "before:bg-emerald-500/10",
    amber: "before:bg-amber-500/10",
    rose: "before:bg-rose-500/10",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden border transition-all duration-200",
        nested
          ? "bg-[#0b0d11]/80 border-white/[0.06]"
          : "bg-[#0f1217]/90 border-white/[0.08] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]",
        glow &&
          cn(
            "before:absolute before:-inset-px before:rounded-xl before:pointer-events-none before:blur-xl before:opacity-60",
            glowStyles[glowColor]
          ),
        className
      )}
      {...props}
    >
      {(title || showDots || headerRight) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-3">
            {showDots && (
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 border border-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 border border-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 border border-white/10" />
              </div>
            )}
            {title && (
              <div className="flex flex-col">
                <span className="text-xs font-mono font-medium text-zinc-200 tracking-tight flex items-center gap-2">
                  {title}
                </span>
                {subtitle && (
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {subtitle}
                  </span>
                )}
              </div>
            )}
          </div>
          {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
