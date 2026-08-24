"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "glass" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconRight,
      children,
      disabled,
      whileHover,
      whileTap,
      transition,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-white text-zinc-950 font-bold hover:bg-zinc-100 border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.25),0_4px_16px_rgba(0,0,0,0.5)]",
      secondary:
        "bg-white/[0.08] dark:bg-white/[0.08] light:bg-slate-200 text-zinc-100 dark:text-zinc-100 light:text-slate-900 hover:bg-white/[0.16] light:hover:bg-slate-300 border border-white/20 dark:border-white/20 light:border-slate-300 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.3)]",
      outline:
        "bg-zinc-950/60 text-zinc-200 dark:text-zinc-200 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-950 border border-white/20 dark:border-white/20 light:border-slate-300 hover:border-white/40 hover:bg-white/[0.1] backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4)]",
      glass:
        "bg-white/[0.08] dark:bg-white/[0.08] light:bg-slate-200/70 hover:bg-white/[0.16] light:hover:bg-slate-300/80 text-zinc-100 dark:text-zinc-100 light:text-slate-900 hover:text-white dark:hover:text-white border border-white/20 dark:border-white/20 light:border-slate-300 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)]",
      ghost:
        "bg-transparent text-zinc-400 dark:text-zinc-400 light:text-slate-600 hover:text-zinc-100 light:hover:text-slate-950 hover:bg-white/[0.08] light:hover:bg-slate-200/60",
      danger:
        "bg-rose-600/90 hover:bg-rose-500 text-white border border-rose-500/50 shadow-[0_1px_8px_rgba(239,68,68,0.2)]",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
      md: "text-sm px-4 py-2 gap-2 h-10",
      lg: "text-base px-5 py-2.5 gap-2.5 h-12",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={disabled ? undefined : whileHover ?? { scale: 1.025, y: -1 }}
        whileTap={disabled ? undefined : whileTap ?? { scale: 0.975 }}
        transition={transition ?? { type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

