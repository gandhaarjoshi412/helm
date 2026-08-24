"use client";

import React, { useState } from "react";
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
    <section id="autonomy" className="relative py-24 bg-[#08090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <Badge variant="warning" size="sm" className="font-mono">
            SECURITY & SOVEREIGNTY
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            You decide how autonomous your agents are.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Autonomy is not all-or-nothing. HELM establishes strict, programmable permission boundaries so agents never perform unapproved destructive actions.
          </p>
        </div>

        {/* Interactive Segmented Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-zinc-950/80 border border-white/[0.1] backdrop-blur-md">
            {(["assist", "guided", "autonomous"] as AutonomyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={cn(
                  "px-5 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer",
                  level === lvl
                    ? "bg-white text-zinc-950 shadow-md scale-[1.02]"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Mode Summary Card */}
        <div className="max-w-4xl mx-auto mb-8 p-5 rounded-xl bg-[#0f1218] border border-white/[0.08] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span className="font-mono font-bold text-white text-sm">
                {levelDetails[level].title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-400">
                ACTIVE POLICY
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-1 font-mono leading-relaxed">
              {levelDetails[level].summary}
            </p>
          </div>
          <div className="shrink-0 text-xs font-mono text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-lg border border-white/[0.06]">
            {levelDetails[level].tagline}
          </div>
        </div>

        {/* Granular Permission Matrix Table */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0c0e13] border border-white/[0.08] overflow-hidden shadow-2xl font-mono text-xs">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-4 py-3 border-b border-white/[0.08] bg-[#08090d] text-zinc-400 font-semibold text-[11px] uppercase tracking-wider">
            <div className="col-span-7 sm:col-span-8">Repository Capability / Operation</div>
            <div className="col-span-5 sm:col-span-4 text-right">Enforced Policy</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/[0.04]">
            {matrixData.map((row, idx) => {
              const Icon = row.icon;
              const currentPolicy = row[level];

              return (
                <div
                  key={idx}
                  className="grid grid-cols-12 px-4 py-3 items-center hover:bg-white/[0.02] transition-colors"
                >
                  <div className="col-span-7 sm:col-span-8 flex items-center gap-3 text-zinc-200">
                    <div className="p-1 rounded bg-zinc-900 border border-white/[0.06] text-zinc-400">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs">{row.action}</span>
                  </div>

                  <div className="col-span-5 sm:col-span-4 flex justify-end">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded text-[10.5px] font-bold border",
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
          <div className="px-4 py-3 bg-[#08090d] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Production destructive actions are permanently locked by security policy</span>
            </span>
            <span className="text-zinc-400 font-mono">TLS 1.3 / eBPF Sandbox</span>
          </div>
        </div>
      </div>
    </section>
  );
}
