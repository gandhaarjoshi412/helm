import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "warning" | "danger" | "info" | "mono";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-white/[0.06] text-zinc-300 border-white/[0.08]",
    outline: "bg-transparent text-zinc-400 border-white/[0.12]",
    success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    info: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    mono: "bg-zinc-900/90 text-zinc-300 border-zinc-700/50 font-mono tracking-tight",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 rounded-md",
    md: "text-xs px-2.5 py-1 rounded-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium border transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
