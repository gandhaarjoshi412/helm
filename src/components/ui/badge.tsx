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
    default: "bg-white/[0.04] text-zinc-300 border-white/[0.1]",
    outline: "bg-transparent text-zinc-300 border-white/[0.15]",
    success: "bg-white/[0.04] text-zinc-200 border-white/[0.12]",
    warning: "bg-white/[0.04] text-zinc-200 border-white/[0.12]",
    danger: "bg-white/[0.04] text-zinc-200 border-white/[0.12]",
    info: "bg-white/[0.04] text-zinc-200 border-white/[0.12]",
    mono: "bg-black text-zinc-300 border-white/10 font-mono tracking-tight",
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
