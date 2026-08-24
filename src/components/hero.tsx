"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Shield, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { HeroCommandCenter } from "./hero-command-center";

import { TypewriterText } from "./ui/typewriter-effect";
import { FloatingCodeBackground } from "./ui/floating-code-background";

interface HeroProps {
  onOpenAccessModal: () => void;
}

export function Hero({ onOpenAccessModal }: HeroProps) {
  const handleScrollToSection = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden tech-grid bg-black text-white">
      {/* Floating Background Code Widgets Design */}
      <FloatingCodeBackground />

      {/* Dual Background Spotlight - Deep Pitch Black Atmosphere */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-white/[0.03] via-zinc-700/[0.02] to-transparent rounded-full blur-[150px] pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Hero Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl mx-auto text-center space-y-6 mb-12"
        >
          {/* Typewriter Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] select-none">
            <TypewriterText text="Your development environment." speed={35} delay={200} /> <br />
            <span className="inline-block mt-1">
              <TypewriterText
                text="Under control."
                speed={40}
                delay={1400}
                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 font-extrabold"
              />
            </span>
          </h1>

          {/* Typewriter Supporting Copy */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 dark:text-zinc-400 light:text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed min-h-[5rem]">
            <TypewriterText
              text="Kodium gives developers a persistent command center for understanding codebases, directing autonomous agents, reviewing changes, and shipping software — from desktop or phone."
              speed={15}
              delay={2100}
            />
          </p>

          {/* CTAs and quick key hint */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenAccessModal}
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto text-sm px-6 shadow-white/10 shadow-lg"
            >
              Explore Kodium
            </Button>

            <Button
              variant="glass"
              size="lg"
              onClick={() => handleScrollToSection("#how-it-works")}
              className="w-full sm:w-auto text-sm px-6"
            >
              See how it works
            </Button>
          </div>

          {/* Micro telemetry highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-default">
              <Cpu className="w-3.5 h-3.5 text-zinc-200" />
              <span>Full Codebase Brain</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-default">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hardened Permission Boundaries</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-default">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Mobile Command & Control</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Interactive Command Center */}
        <motion.div
          id="demo"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-8"
        >
          <HeroCommandCenter />
        </motion.div>
      </div>
    </section>
  );
}

