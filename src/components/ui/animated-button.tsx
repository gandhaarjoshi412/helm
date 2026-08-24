import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export function AnimatedButton({
  children,
  className,
  onClick,
  variant = "primary",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "glass" | "secondary";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "rounded-lg font-medium focus:outline-none transition-colors",
        variant === "primary"
          ? "bg-white text-zinc-950 font-semibold hover:bg-zinc-100 shadow-md"
          : variant === "glass"
          ? "bg-white/10 border border-white/20 text-white"
          : "bg-zinc-800 text-zinc-200",
        size === "sm"
          ? "px-3 py-1 text-xs"
          : size === "lg"
          ? "px-6 py-3 text-lg"
          : "px-4 py-2 text-sm",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
