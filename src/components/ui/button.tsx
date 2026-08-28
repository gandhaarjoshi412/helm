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
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer relative overflow-hidden group";

    const variantStyles = {
      primary:
        "bg-white text-zinc-950 font-extrabold hover:bg-zinc-100 border border-white/80 shadow-[0_0_25px_rgba(255,255,255,0.35),0_4px_16px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5),0_8px_24px_rgba(0,0,0,0.7)] rounded-xl",
      secondary:
        "bg-white/[0.12] hover:bg-white/[0.22] text-white font-semibold border border-white/25 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)] hover:border-white/50 rounded-xl",
      outline:
        "bg-transparent text-white hover:bg-white/[0.1] border border-white/30 hover:border-white/60 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4)] rounded-xl",
      glass:
        "bg-white/[0.1] hover:bg-white/[0.2] text-white font-semibold border border-white/25 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:border-white/50 rounded-xl",
      ghost:
        "bg-transparent text-zinc-400 dark:text-zinc-400 light:text-slate-600 hover:text-zinc-100 light:hover:text-slate-950 hover:bg-white/[0.08] light:hover:bg-slate-200/60 rounded-lg",
      danger:
        "bg-rose-600/90 hover:bg-rose-500 text-white border border-rose-500/50 shadow-[0_1px_8px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] rounded-xl",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
      md: "text-sm px-4 py-2 gap-2 h-10",
      lg: "text-base px-5 py-2.5 gap-2.5 h-12",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={disabled ? undefined : whileHover ?? { scale: 1.04, y: -2 }}
        whileTap={disabled ? undefined : whileTap ?? { scale: 0.95 }}
        transition={transition ?? { type: "spring", stiffness: 450, damping: 25 }}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {/* Subtle Shine Reflection on Hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

        {icon && <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">{icon}</span>}
        {children}
        {iconRight && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1">{iconRight}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
