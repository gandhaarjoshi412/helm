"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/theme-context";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className={`p-2 sm:p-2.5 rounded-xl bg-white/[0.06] dark:bg-white/[0.06] light:bg-slate-100/80 hover:bg-white/[0.14] dark:hover:bg-white/[0.14] border border-white/20 dark:border-white/20 light:border-slate-300 text-zinc-300 dark:text-zinc-300 light:text-slate-800 hover:text-white dark:hover:text-white transition-all backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer ${className || ""}`}
      aria-label="Toggle light and dark mode"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4 text-zinc-200" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </motion.button>
  );
}
