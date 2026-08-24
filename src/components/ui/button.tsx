import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "glass" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
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
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 select-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-white text-zinc-950 font-semibold hover:bg-zinc-100 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_12px_rgba(255,255,255,0.15)] border border-white/20",
      secondary:
        "bg-zinc-800/90 text-zinc-100 hover:bg-zinc-700 border border-zinc-700/60 hover:border-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
      outline:
        "bg-transparent text-zinc-300 hover:text-white border border-zinc-700/80 hover:border-zinc-500 hover:bg-white/[0.04]",
      glass:
        "bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 hover:text-white border border-white/[0.1] hover:border-white/[0.2] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
      ghost:
        "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05]",
      danger:
        "bg-rose-600/90 hover:bg-rose-500 text-white border border-rose-500/50 shadow-[0_1px_8px_rgba(239,68,68,0.2)]",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5 h-8",
      md: "text-sm px-4 py-2 gap-2 h-10",
      lg: "text-base px-5 py-2.5 gap-2.5 h-12",
    };

    return (
      <button
        ref={ref}
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
      </button>
    );
  }
);

Button.displayName = "Button";
