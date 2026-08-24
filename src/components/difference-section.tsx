"use client";

import React, { useState } from "react";
import {
  Brain,
  Zap,
  ShieldCheck,
  Check,
  X,
  Lock,
  GitBranch,
  FileCode,
  Terminal,
  Server,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Panel } from "./ui/panel";
import { cn } from "@/lib/utils";

export function DifferenceSection() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: "understand",
      num: "01",
      title: "Understand",
      tagline: "Persistent project memory, not ephemeral prompt windows.",
      desc: "HELM doesn't just read the file you have open. It continuously constructs a living graph of your repository architecture, inter-service contracts, dependency trees, git histories, documentation, and runtime traces.",
      items: [
        "Full repository & AST indexing",
        "Architecture & component call-graphs",
        "Dependency versions & package lockfiles",
        "Git commit logs & blame telemetry",
        "Project documentation & style guides",
        "Unit & integration test suites",
        "Runtime environment & container schemas",
      ],
    },
    {
      id: "act",
      num: "02",
      title: "Act",
      tagline: "End-to-end execution, not just text generation.",
      desc: "Chatbots write snippets for you to manually paste and debug. HELM agents execute within isolated sandbox runtimes to draft plans, edit files, execute test suites, research external SDK docs, commit git diffs, and orchestrate deployments.",
      items: [
        "Multi-step implementation planning",
        "Contextual multi-file edits",
        "Sandbox terminal command execution",
        "Automated test execution & verification",
        "Autonomous external documentation research",
        "Deterministic Git branch & commit generation",
        "Continuous deployment orchestration",
      ],
    },
    {
      id: "control",
      num: "03",
      title: "Control",
      tagline: "The boundary between autonomy and control.",
      desc: "You are the captain; agents are the execution layer. You define strict security boundaries and granular permission gates for every repository action. Unattended destructive actions are structurally impossible.",
      items: [
        "Read repository & AST: ALLOWED (✓)",
        "Modify source in sandbox: ALLOWED (✓)",
        "Run unit/integration tests: ALLOWED (✓)",
        "Create git branches: ALLOWED (✓)",
        "Commit verified diffs: ALLOWED (✓)",
        "Push to remote repository: ALLOWED (✓)",
        "Deploy to production: REQUIRE APPROVAL (—)",
        "Delete cloud infrastructure: BLOCKED (✕)",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-[#090b0e] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="info" size="sm" className="font-mono">
            CORE PHILOSOPHY
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            HELM is not another coding assistant.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Generic copilots wait for prompts and output unverified snippets. HELM operates as a persistent command center with three sovereign foundations:
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pillar 01: UNDERSTAND */}
          <div className="rounded-2xl bg-[#0e1117] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-sky-500/30 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-sky-400">
                  01 — UNDERSTAND
                </span>
                <Brain className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Persistent Project Brain
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
                Understands how the entire codebase fits together before writing a single line of code.
              </p>

              {/* Context Tree Mockup */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.06] text-xs font-mono space-y-2 text-zinc-300">
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                  INDEXED CONTEXT GRAPH
                </div>
                <ul className="space-y-1.5 text-[11.5px]">
                  <li className="flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>Repository AST & Schemas</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>Architecture Call-Graphs</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>Dependencies & Lockfiles</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>Git History & Blame Telemetry</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>Test Suites & Runtime State</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-sky-300 flex items-center justify-between">
              <span>Zero stateless re-indexing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 02: ACT */}
          <div className="rounded-2xl bg-[#0e1117] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  02 — ACT
                </span>
                <Zap className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Sandboxed Agent Execution
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
                Autonomous agents operate directly in ephemeral execution sandboxes.
              </p>

              {/* Action Matrix Mockup */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.06] text-xs font-mono space-y-2 text-zinc-300">
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                  AGENT EXECUTION CAPABILITIES
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11.5px]">
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-white/[0.04] text-zinc-300">
                    ✓ Plan Workflows
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-white/[0.04] text-zinc-300">
                    ✓ Edit Code
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-white/[0.04] text-zinc-300">
                    ✓ Run Tests
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-white/[0.04] text-zinc-300">
                    ✓ Research Docs
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-white/[0.04] text-zinc-300">
                    ✓ Commit Diff
                  </div>
                  <div className="p-1.5 rounded bg-zinc-900/60 border border-white/[0.04] text-zinc-300">
                    ✓ Push Branch
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-emerald-300 flex items-center justify-between">
              <span>Isolated execution runtimes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 03: CONTROL */}
          <div className="rounded-2xl bg-[#0e1117] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-amber-400">
                  03 — CONTROL
                </span>
                <ShieldCheck className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Permission Boundaries
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
                The developer defines what the agent is allowed to do. You stay in control.
              </p>

              {/* Granular Permission Matrix */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-white/[0.06] text-xs font-mono space-y-1.5">
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold mb-2">
                  SECURITY POLICY ENFORCEMENT
                </div>
                {[
                  { name: "Read repository", state: "ALLOWED", color: "text-emerald-400" },
                  { name: "Modify source files", state: "ALLOWED", color: "text-emerald-400" },
                  { name: "Run test suites", state: "ALLOWED", color: "text-emerald-400" },
                  { name: "Commit & Push branch", state: "ALLOWED", color: "text-emerald-400" },
                  { name: "Deploy to production", state: "APPROVAL REQUIRED", color: "text-amber-400" },
                  { name: "Delete infrastructure", state: "BLOCKED", color: "text-rose-400" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between py-1 border-b border-white/[0.03] text-[11px]"
                  >
                    <span className="text-zinc-400">{item.name}</span>
                    <span className={cn("font-bold", item.color)}>{item.state}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-amber-300 flex items-center justify-between">
              <span>Cryptographic policy enforcement</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
