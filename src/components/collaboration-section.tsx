"use client";

import React, { useState } from "react";
import {
  Users,
  Sparkles,
  GitBranch,
  CheckCircle2,
  Lock,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { StatusDot } from "./ui/status-dot";
import { cn } from "@/lib/utils";

export function CollaborationSection() {
  const [selectedEntity, setSelectedEntity] = useState<number>(2); // Default to HELM agent

  const members = [
    {
      id: 0,
      name: "Gandhaar",
      role: "Lead Architect",
      avatar: "G",
      task: "Authentication & RBAC Migration",
      branch: "feat/jwt-v2-migration",
      status: "Coding",
      statusType: "healthy" as const,
      files: ["src/services/auth.ts", "src/middleware.ts"],
      telemetry: "Refactoring asymmetric session validation",
    },
    {
      id: 1,
      name: "Pradyumn",
      role: "Frontend Engineer",
      avatar: "P",
      task: "AR Menu Dish Renderer Glitch",
      branch: "fix/ar-viewer-canvas",
      status: "Debugging",
      statusType: "pending" as const,
      files: ["src/components/ar/viewer.tsx", "src/services/assets.ts"],
      telemetry: "Inspecting WebGL buffer disposal on unmount",
    },
    {
      id: 2,
      name: "HELM Agent",
      role: "Autonomous Sandbox",
      avatar: "H",
      isAgent: true,
      task: "Payment Stripe 408 Regression Investigation",
      branch: "agent/fix-payment-timeout",
      status: "Patch Ready",
      statusType: "healthy" as const,
      files: ["src/services/payment.ts", "tests/payment.test.ts"],
      telemetry: "47/47 passing tests in sandbox #sbx_9942a",
    },
    {
      id: 3,
      name: "Krishna",
      role: "DevOps & SRE",
      avatar: "K",
      task: "Production Canary Deployment Review",
      branch: "infra/k8s-canary-rollout",
      status: "Reviewing",
      statusType: "healthy" as const,
      files: ["infra/canary.yaml", ".github/workflows/deploy.yml"],
      telemetry: "Monitoring 5% traffic canary metrics",
    },
  ];

  const current = members[selectedEntity];

  return (
    <section id="collaboration" className="relative py-24 bg-[#08090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="info" size="sm" className="font-mono">
            UNIFIED PROJECT STATE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Developers and agents work from the same state.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            HELM isn’t another messaging channel or ticket tracker. Collaboration happens directly around the living project: active branches, shared AST brains, running sandbox tasks, and verified agent diffs.
          </p>
        </div>

        {/* Collaboration Topology Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Active Team & Agent Roster (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0c0e14] border border-white/[0.08] p-5 shadow-2xl space-y-3 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
                <Users className="w-4 h-4 text-sky-400" />
                <span>PLATESIGHT Shared Workspace</span>
              </div>
              <span className="text-[10px] text-zinc-400">4 Active Sessions</span>
            </div>

            <div className="space-y-2">
              {members.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedEntity(idx)}
                  className={cn(
                    "w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group cursor-pointer",
                    selectedEntity === idx
                      ? "bg-zinc-900 border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.1)] text-white"
                      : "bg-zinc-950/60 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border",
                        m.isAgent
                          ? "bg-sky-500/20 text-sky-400 border-sky-500/40"
                          : "bg-zinc-800 text-zinc-200 border-white/10"
                      )}
                    >
                      {m.isAgent ? <Sparkles className="w-4 h-4" /> : m.avatar}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white">{m.name}</span>
                        {m.isAgent && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                            AGENT
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                        {m.task}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 font-mono",
                        m.isAgent
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-zinc-900 text-zinc-400 border-white/[0.08]"
                      )}
                    >
                      <StatusDot status={m.statusType} size="sm" pulse={false} />
                      {m.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-zinc-400 text-center">
              Click any member or agent above to inspect live state
            </div>
          </div>

          {/* Right: Live Selected State & Context Lock Matrix (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0e1117] border border-white/[0.08] p-6 shadow-2xl flex flex-col justify-between font-mono text-xs">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{current.name}</span>
                  <span className="text-zinc-500">::</span>
                  <span className="text-zinc-400">{current.role}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20 text-[11px]">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>{current.branch}</span>
                </div>
              </div>

              {/* Task Details */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-2">
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider">
                    CURRENT FOCUS & INTENT
                  </div>
                  <div className="text-sm font-semibold text-white font-sans">
                    {current.task}
                  </div>
                  <div className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {current.telemetry}
                  </div>
                </div>

                {/* Scoped Files Under Modification */}
                <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 uppercase tracking-wider">
                    <span>AFFECTED FILES & BRAIN LOCKS</span>
                    <span className="text-emerald-400">NO CONFLICTS DETECTED</span>
                  </div>
                  <div className="space-y-1.5">
                    {current.files.map((file) => (
                      <div
                        key={file}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-white/[0.04] text-[11.5px] text-zinc-300"
                      >
                        <span>{file}</span>
                        <span className="text-[10px] text-zinc-400">Scoped Context</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom State Sync Footnote */}
            <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400">
              <span>Sync Engine: <strong className="text-zinc-200">HELM Shared Brain Protocol</strong></span>
              <span className="text-emerald-400">Deterministic Merge Safety</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
