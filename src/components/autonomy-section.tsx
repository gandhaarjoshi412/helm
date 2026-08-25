"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Check,
  AlertCircle,
  X,
  SlidersHorizontal,
  FileCode,
  Terminal,
  GitBranch,
  Rocket,
  Trash2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type AutonomyLevel = "assist" | "guided" | "autonomous";

export function AutonomySection() {
  const [level, setLevel] = useState<AutonomyLevel>("guided");

  const matrixData = [
    {
      action: "Read repository files & AST",
      icon: FileCode,
      assist: { state: "ALLOW", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
      guided: { state: "ALLOW", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
      autonomous: { state: "ALLOW", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    },
    {
      action: "Write & modify code in sandbox",
      icon: FileCode,
      assist: { state: "ASK PERMISSION", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      guided: { state: "AUTO-EXECUTE", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
      autonomous: { state: "AUTO-EXECUTE", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    },
    {
      action: "Run test runner & linter in sandbox",
      icon: Terminal,
      assist: { state: "ASK PERMISSION", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      guided: { state: "AUTO-EXECUTE", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
      autonomous: { state: "AUTO-EXECUTE", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    },
    {
      action: "Create branch & commit local diff",
      icon: GitBranch,
      assist: { state: "ASK PERMISSION", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      guided: { state: "AUTO-EXECUTE", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
      autonomous: { state: "AUTO-EXECUTE", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    },
    {
      action: "Push branch to remote origin",
      icon: GitBranch,
      assist: { state: "ASK PERMISSION", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      guided: { state: "ASK PERMISSION", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      autonomous: { state: "AUTO-EXECUTE", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    },
    {
      action: "Production deployment release",
      icon: Rocket,
      assist: { state: "REQUIRE APPROVAL", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      guided: { state: "REQUIRE APPROVAL", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      autonomous: { state: "REQUIRE APPROVAL", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    },
    {
      action: "Delete cloud infrastructure / databases",
      icon: Trash2,
      assist: { state: "BLOCKED", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
      guided: { state: "BLOCKED", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
      autonomous: { state: "BLOCKED", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
    },
  ];

  const levelDetails = {
    assist: {
      title: "Assist Mode",
      summary: "Maximum oversight. Agent prepares suggestions and requests manual developer confirmation for every file edit, test run, and git command.",
      tagline: "Ideal for onboarding new repositories or sensitive mission-critical code.",
    },
    guided: {
      title: "Guided Mode (Default)",
      summary: "Balanced velocity. Safe operations (code edits, test execution, local commits) execute autonomously in sandboxes. Remote pushes and deployments require manual sign-off.",
      tagline: "The recommended daily workflow for high engineering speed with safety.",
    },
    autonomous: {
      title: "Autonomous Mode",
      summary: "High agency execution. Agents can investigate, prepare patches, verify test suites, and push feature branches autonomously within strict project boundaries. Production releases still require human sign-off.",
      tagline: "Best for automated bug triage, dependency upgrades, and test coverage expansion.",
    },
  };

  return (
    <section id="autonomy" className="relative py-24 bg-black dark:bg-black light:bg-white border-t border-white/[0.06] dark:border-white/[0.06] light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <Badge variant="mono" size="sm" className="font-mono">
            SECURITY & SOVEREIGNTY
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            You decide how autonomous your agents are.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Autonomy is not all-or-nothing. Kodium establishes strict, programmable permission boundaries so agents never perform unapproved destructive actions.
          </p>
        </div>

        {/* Interactive Segmented Switcher in Pill Capsule Design */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-black backdrop-blur-xl border border-white/12 shadow-xl max-w-full overflow-x-auto no-scrollbar">
            {(["assist", "guided", "autonomous"] as AutonomyLevel[]).map((lvl) => {
              const isActive = level === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={cn(
                    "relative px-3 sm:px-5 py-1.5 sm:py-2 text-[10.5px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer rounded-full select-none flex flex-col items-center justify-center group shrink-0",
                    isActive
                      ? "text-white font-bold"
                      : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  <span className="relative z-10">{lvl}</span>

                  {/* Silky Glowing Animated Underline Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeAutonomyTabLine"
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 28,
                        mass: 0.8,
                      }}
                      className="absolute bottom-0 left-2 right-2 sm:left-2.5 sm:right-2.5 h-[2px] rounded-full bg-gradient-to-r from-slate-300 via-white to-zinc-400 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Mode Summary Card */}
        <div className="max-w-4xl mx-auto mb-8 p-4 sm:p-5 rounded-xl bg-[#0f1218] dark:bg-[#0f1218] light:bg-white border border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-zinc-200 shrink-0" />
              <span className="font-mono font-bold text-white dark:text-white light:text-slate-900 text-xs sm:text-sm">
                {levelDetails[level].title}
              </span>
              <span className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] dark:bg-white/[0.06] light:bg-slate-100 text-zinc-400 dark:text-zinc-400 light:text-slate-600">
                ACTIVE POLICY
              </span>
            </div>
            <p className="text-xs text-zinc-300 dark:text-zinc-300 light:text-slate-600 mt-1 font-mono leading-relaxed">
              {levelDetails[level].summary}
            </p>
          </div>
          <div className="shrink-0 text-[11px] sm:text-xs font-mono text-zinc-400 dark:text-zinc-400 light:text-slate-700 bg-zinc-950 dark:bg-zinc-950 light:bg-slate-100 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-white/[0.06] dark:border-white/[0.06] light:border-slate-200">
            {levelDetails[level].tagline}
          </div>
        </div>

        {/* Granular Permission Matrix Table */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0c0e13] dark:bg-[#0c0e13] light:bg-white border border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 overflow-hidden shadow-2xl font-mono text-xs">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 bg-[#08090d] dark:bg-[#08090d] light:bg-slate-100 text-zinc-400 dark:text-zinc-400 light:text-slate-700 font-semibold text-[10px] sm:text-[11px] uppercase tracking-wider">
            <div className="col-span-7 sm:col-span-8">Repository Capability / Operation</div>
            <div className="col-span-5 sm:col-span-4 text-right">Enforced Policy</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/[0.04] dark:divide-white/[0.04] light:divide-slate-200">
            {matrixData.map((row, idx) => {
              const Icon = row.icon;
              const currentPolicy = row[level];

              return (
                <div
                  key={idx}
                  className="grid grid-cols-12 px-3 sm:px-4 py-2.5 sm:py-3 items-center hover:bg-white/[0.02] dark:hover:bg-white/[0.02] light:hover:bg-slate-50 transition-colors"
                >
                  <div className="col-span-7 sm:col-span-8 flex items-center gap-2 sm:gap-3 text-zinc-200 dark:text-zinc-200 light:text-slate-900 font-medium">
                    <div className="p-1 rounded bg-zinc-900 dark:bg-zinc-900 light:bg-slate-200 border border-white/[0.06] dark:border-white/[0.06] light:border-slate-300 text-zinc-400 dark:text-zinc-400 light:text-slate-700 shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] sm:text-xs leading-snug">{row.action}</span>
                  </div>

                  <div className="col-span-5 sm:col-span-4 flex justify-end">
                    <span
                      className={cn(
                        "px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-[10.5px] font-bold border whitespace-nowrap text-center",
                        currentPolicy.color
                      )}
                    >
                      {currentPolicy.state}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Security Note */}
          <div className="px-4 py-3 bg-[#08090d] dark:bg-[#08090d] light:bg-slate-100 border-t border-white/[0.06] dark:border-white/[0.06] light:border-slate-200 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-400 light:text-slate-600">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Production destructive actions are permanently locked by security policy</span>
            </span>
            <span className="text-zinc-400 dark:text-zinc-400 light:text-slate-600 font-mono">TLS 1.3 / eBPF Sandbox</span>
          </div>
        </div>
      </div>
    </section>
  );
}
