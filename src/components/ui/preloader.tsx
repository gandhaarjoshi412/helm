"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KodiumMark } from "./kodium-mark";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 8;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          if (onComplete) onComplete();
        }, 350);
      } else {
        setProgress(currentProgress);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#08090b] dark:bg-[#08090b] light:bg-white text-white dark:text-white light:text-slate-900 select-none overflow-hidden"
        >
          {/* Plain Background - Centered Minimal Loading Interface */}
          <div className="relative flex flex-col items-center justify-center space-y-6">
            {/* Simple Clean Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <KodiumMark size={52} glow={false} />
            </motion.div>

            {/* Numeric Percentage & Progress Line */}
            <div className="flex flex-col items-center space-y-3 w-48">
              <span className="font-mono text-2xl font-bold tracking-tight text-white dark:text-white light:text-slate-900">
                {progress}%
              </span>

              {/* Thin Progress Bar */}
              <div className="w-full h-[2px] bg-zinc-800 dark:bg-zinc-800 light:bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-slate-300 via-white to-zinc-400 transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
