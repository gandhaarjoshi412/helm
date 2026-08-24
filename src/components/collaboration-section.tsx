"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
  const [selectedEntity, setSelectedEntity] = useState<number>(2); // Default to Kodium agent

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
      name: "Pradyumna",
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
      name: "Kodium Agent",
      role: "Autonomous Sandbox",
      avatar: "K",
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
    <section id="collaboration" className="relative py-24 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-4 mb-16"
        >
          <Badge variant="mono" size="sm" className="font-mono">
            UNIFIED PROJECT STATE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Developers and agents work from the same state.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-slate-600 leading-relaxed">
            Kodium isn’t another messaging channel or ticket tracker. Collaboration happens directly around the living project: active branches, shared AST brains, running sandbox tasks, and verified agent diffs.
          </p>
        </motion.div>

        {/* Collaboration Topology Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Active Team & Agent Roster (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-black border border-slate-200 dark:border-white/[0.08] p-5 shadow-xl dark:shadow-2xl space-y-3 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase">
                <Users className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                <span>PLATESIGHT Shared Workspace</span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400">4 Active Sessions</span>
            </div>

            <div className="space-y-2">
              {members.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedEntity(idx)}
                  className={cn(
                    "w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group cursor-pointer font-mono",
                    selectedEntity === idx
                      ? "bg-slate-100 dark:bg-zinc-900 border-slate-400 dark:border-white/60 shadow-sm text-slate-950 dark:text-white font-semibold"
                      : "bg-slate-50 dark:bg-zinc-950/60 border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border",
                        m.isAgent
                          ? "bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border-slate-300 dark:border-white/20"
                          : "bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border-slate-300 dark:border-white/10"
                      )}
                    >
                      {m.isAgent ? <Sparkles className="w-4 h-4" /> : m.avatar}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{m.name}</span>
                        {m.isAgent && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-300 dark:border-white/20 font-bold">
                            AGENT
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400 truncate max-w-[200px]">
                        {m.task}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 font-mono font-bold",
                        m.isAgent
                          ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                          : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border-slate-200 dark:border-white/[0.08]"
                      )}
                    >
                      <StatusDot status={m.statusType} size="sm" pulse={false} />
                      {m.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-500 dark:text-zinc-400 text-center font-mono">
              Click any member or agent above to inspect live state
            </div>
          </div>

          {/* Right: Live Selected State & Context Lock Matrix (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-black border border-slate-200 dark:border-white/[0.08] p-6 shadow-xl dark:shadow-2xl flex flex-col justify-between font-mono text-xs transition-colors duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.06] mb-4 font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{current.name}</span>
                  <span className="text-slate-400 dark:text-zinc-500">::</span>
                  <span className="text-slate-600 dark:text-zinc-400 font-medium">{current.role}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-800 dark:text-zinc-200 bg-slate-100 dark:bg-white/10 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-white/20 text-[11px] font-mono font-bold">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>{current.branch}</span>
                </div>
              </div>

              {/* Task Details */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.06] space-y-2 font-mono">
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-bold">
                    CURRENT FOCUS & INTENT
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    {current.task}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-zinc-400 font-mono leading-relaxed">
                    {current.telemetry}
                  </div>
                </div>

                {/* Scoped Files Under Modification */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.06] space-y-2 font-mono">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-bold">
                    <span>AFFECTED FILES & BRAIN LOCKS</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold">NO CONFLICTS DETECTED</span>
                  </div>
                  <div className="space-y-1.5">
                    {current.files.map((file) => (
                      <div
                        key={file}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-white/[0.04] text-[11.5px] text-slate-800 dark:text-zinc-300 font-mono shadow-xs"
                      >
                        <span className="font-semibold">{file}</span>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">Scoped Context</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom State Sync Footnote */}
            <div className="mt-6 pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-400 font-medium">
              <span>Sync Engine: <strong className="text-slate-900 dark:text-zinc-200">Kodium Shared Brain Protocol</strong></span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Deterministic Merge Safety</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
