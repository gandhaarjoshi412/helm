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
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050608] text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          {/* Centered Circular Loading Ring & Logo */}
          <div className="relative flex flex-col items-center justify-center space-y-6">
            <div className="relative flex items-center justify-center w-36 h-36">
              {/* Outer Spinning Ambient Dashed Accent Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-white/10"
              />

              {/* Main SVG Circular Progress Ring */}
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="circleProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="50%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Track Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="stroke-zinc-800/80"
                  strokeWidth="3"
                  fill="transparent"
                />

                {/* Animated Progress Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="url(#circleProgressGrad)"
                  strokeWidth="3.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  filter="url(#glow)"
                  className="transition-[stroke-dashoffset] duration-150 ease-out"
                />
              </svg>

              {/* Logo in Center */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <KodiumMark size={46} glow={true} />
              </motion.div>
            </div>

            {/* Percentage Display */}
            <div className="flex flex-col items-center space-y-1">
              <span className="font-mono text-xl font-bold tracking-tight text-white/90">
                {progress}%
              </span>
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                Initializing System
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
