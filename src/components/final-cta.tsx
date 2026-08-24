"use client";

import React, { useState } from "react";
import { ArrowRight, Terminal, Sparkles, Shield, Cpu, Check, GitBranch } from "lucide-react";
import { Button } from "./ui/button";
import { HelmMark } from "./ui/helm-mark";
import { Badge } from "./ui/badge";

interface FinalCtaProps {
  onOpenAccessModal: () => void;
}

export function FinalCta({ onOpenAccessModal }: FinalCtaProps) {
  const [quickInput, setQuickInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput) return;
    setSubmitted(true);
    setTimeout(() => {
      onOpenAccessModal();
    }, 400);
  };

  const handleScrollToArch = () => {
    const el = document.querySelector("#architecture");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-32 bg-[#07080a] border-t border-white/[0.08] overflow-hidden">
      {/* Background Command Center Matrix Pattern */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 p-1.5 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
            <HelmMark size={16} glow />
            <span>HELM COMMAND CENTER PROTOTYPE</span>
            <span className="text-zinc-600">|</span>
            <span className="text-sky-400">iQOO HACKATHON 2026</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Take control of your development environment.
          </h2>

          <p className="text-lg sm:text-xl text-zinc-400 font-normal max-w-xl mx-auto font-mono">
            Understand more. Delegate more. Ship faster.
          </p>

          {/* Direct Repository / Email Access Bar */}
          <div className="max-w-md mx-auto pt-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-950/90 border border-white/[0.12] shadow-2xl focus-within:border-sky-400 transition-colors">
              <Terminal className="w-4 h-4 text-zinc-500 ml-2 shrink-0" />
              <input
                type="email"
                placeholder="developer@company.com"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none font-mono px-2"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="text-xs shrink-0"
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Join the Build
              </Button>
            </form>
          </div>

          {/* Secondary Action */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handleScrollToArch}
              className="text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-4"
            >
              View the Architecture Diagram →
            </button>
          </div>

          {/* Prototype disclaimer / technical confidence note */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Isolated eBPF Sandbox</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>Model-Agnostic Engine</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-purple-400" />
              <span>Zero Untracked Changes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
