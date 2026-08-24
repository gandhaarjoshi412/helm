"use client";

import React from "react";
import { ArrowRight, Terminal, Sparkles, Shield, Cpu, Smartphone } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StatusDot } from "./ui/status-dot";
import { HeroCommandCenter } from "./hero-command-center";

interface HeroProps {
  onOpenAccessModal: () => void;
}

export function Hero({ onOpenAccessModal }: HeroProps) {
  const handleScrollToSection = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden tech-grid">
      {/* Background radial gradient spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow & Hero Copy */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-inner text-xs font-mono text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="tracking-widest uppercase text-[11px] text-zinc-300">
              THE AI DEVELOPER COMMAND CENTER
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-sky-400 font-medium">PERSISTENT CONTEXT</span>
          </div>

          {/* Huge Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]">
            Your development environment. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500">
              Under control.
            </span>
          </h1>

          {/* Supporting copy */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
            HELM gives developers a persistent command center for understanding codebases, directing autonomous agents, reviewing changes, and shipping software — from desktop or phone.
          </p>

          {/* CTAs and quick key hint */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenAccessModal}
              iconRight={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto text-sm px-6"
            >
              Explore HELM
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
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>Full Codebase Brain</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hardened Permission Boundaries</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>Mobile Command & Control</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Command Center */}
        <div id="demo" className="mt-8">
          <HeroCommandCenter />
        </div>
      </div>
    </section>
  );
}
