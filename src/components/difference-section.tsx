"use client";

import React from "react";
import { motion } from "framer-motion";
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
  Sparkles,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { FloatingCodeBackground } from "./ui/floating-code-background";
import { cn } from "@/lib/utils";

export function DifferenceSection() {
  const contextGraphItems = [
    "Repository AST & Schemas",
    "Architecture Call-Graphs",
    "Dependencies & Lockfiles",
    "Git History & Blame Telemetry",
    "Test Suites & Runtime State",
  ];

  const agentCapabilities = [
    { label: "Plan Workflows", icon: "✓" },
    { label: "Edit Code", icon: "✓" },
    { label: "Run Tests", icon: "✓" },
    { label: "Research Docs", icon: "✓" },
    { label: "Commit Diff", icon: "✓" },
    { label: "Push Branch", icon: "✓" },
  ];

  const securityPolicies = [
    { name: "Read repository", state: "ALLOWED", color: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Modify source files", state: "ALLOWED", color: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Run test suites", state: "ALLOWED", color: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Commit & Push branch", state: "ALLOWED", color: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Deploy to production", state: "APPROVAL REQUIRED", color: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { name: "Delete infrastructure", state: "BLOCKED", color: "text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/20" },
  ];

  return (
    <section id="difference" className="relative py-32 bg-black dark:bg-black light:bg-slate-50/80 border-t border-white/[0.06] dark:border-white/[0.06] light:border-slate-200 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-gradient-to-r from-white/[0.02] to-transparent rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Silky Smooth Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl space-y-4 mb-16"
        >
          <Badge variant="mono" size="sm" className="font-mono">
            CORE PHILOSOPHY
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Kodium is not another coding assistant.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-normal">
            Generic copilots wait for prompts and output unverified snippets. Kodium operates as a persistent command center with three sovereign foundations:
          </p>
        </motion.div>

        {/* 3 Pillars Grid with Silky Smooth 3D Motion */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* PILLAR 01: UNDERSTAND */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              y: -8,
              scale: 1.015,
              rotateX: 1.5,
              rotateY: -1.5,
              transition: { type: "spring", stiffness: 150, damping: 20, mass: 0.8 },
            }}
            className="relative rounded-3xl bg-black border border-white/10 p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/30 transition-all duration-300 group overflow-hidden cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                  01 — UNDERSTAND
                </span>
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white group-hover:bg-white/[0.08] transition-colors duration-300"
                >
                  <Brain className="w-5 h-5" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                Persistent Project Brain
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
                Understands how the entire codebase fits together before writing a single line of code.
              </p>

              {/* Context Tree Mockup */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/[0.08] text-xs font-mono space-y-3 shadow-inner">
                <div className="text-[11px] text-zinc-400 uppercase tracking-widest font-bold flex items-center justify-between">
                  <span>INDEXED CONTEXT GRAPH</span>
                  <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                </div>

                <ul className="space-y-2 text-[11.5px]">
                  {contextGraphItems.map((item, idx) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 5, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 250, damping: 22 }}
                      className="flex items-center gap-2.5 text-zinc-300 p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors duration-200 cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      <span className="font-mono font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] text-[11.5px] font-mono font-semibold text-zinc-400 group-hover:text-white flex items-center justify-between transition-colors duration-300">
              <span>Zero stateless re-indexing</span>
              <motion.div transition={{ type: "spring", stiffness: 200 }} variants={{ hover: { x: 4 } }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>

          {/* PILLAR 02: ACT */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              y: -8,
              scale: 1.015,
              rotateX: 1.5,
              rotateY: -1.5,
              transition: { type: "spring", stiffness: 150, damping: 20, mass: 0.8 },
            }}
            className="relative rounded-3xl bg-black border border-white/10 p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/30 transition-all duration-300 group overflow-hidden cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                  02 — ACT
                </span>
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white group-hover:bg-white/[0.08] transition-colors duration-300"
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                Sandboxed Agent Execution
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
                Autonomous agents operate directly in ephemeral execution sandboxes.
              </p>

              {/* Action Matrix Mockup */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/[0.08] text-xs font-mono space-y-3 shadow-inner">
                <div className="text-[11px] text-zinc-400 uppercase tracking-widest font-bold flex items-center justify-between">
                  <span>AGENT EXECUTION CAPABILITIES</span>
                  <Zap className="w-3.5 h-3.5 text-zinc-400" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                  {agentCapabilities.map((cap) => (
                    <motion.div
                      key={cap.label}
                      whileHover={{ y: -2, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 250, damping: 20 }}
                      className="p-2 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-200 font-mono font-medium flex items-center gap-1.5 shadow-sm hover:border-white/30 transition-colors duration-200"
                    >
                      <span className="text-zinc-400 font-bold">{cap.icon}</span>
                      <span>{cap.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] text-[11.5px] font-mono font-semibold text-zinc-400 group-hover:text-white flex items-center justify-between transition-colors duration-300">
              <span>Isolated execution runtimes</span>
              <motion.div transition={{ type: "spring", stiffness: 200 }} variants={{ hover: { x: 4 } }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>

          {/* PILLAR 03: CONTROL */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              y: -8,
              scale: 1.015,
              rotateX: 1.5,
              rotateY: -1.5,
              transition: { type: "spring", stiffness: 150, damping: 20, mass: 0.8 },
            }}
            className="relative rounded-3xl bg-black border border-white/10 p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl hover:border-white/30 transition-all duration-300 group overflow-hidden cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider">
                  03 — CONTROL
                </span>
                <motion.div
                  whileHover={{ rotate: 180, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white group-hover:bg-white/[0.08] transition-colors duration-300"
                >
                  <ShieldCheck className="w-5 h-5" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                Permission Boundaries
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
                The developer defines what the agent is allowed to do. You stay in control.
              </p>

              {/* Granular Permission Matrix */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/[0.08] text-xs font-mono space-y-2 shadow-inner">
                <div className="text-[11px] text-zinc-400 uppercase tracking-widest font-bold flex items-center justify-between mb-2">
                  <span>SECURITY POLICY ENFORCEMENT</span>
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                </div>

                <div className="space-y-1">
                  {securityPolicies.map((policy) => (
                    <motion.div
                      key={policy.name}
                      whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.04)" }}
                      className="flex items-center justify-between p-1.5 rounded-lg border-b border-white/[0.03] text-[11px] transition-colors duration-200 cursor-default"
                    >
                      <span className="text-zinc-300 font-mono">
                        {policy.name}
                      </span>
                      <span className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.04] text-[10px] font-mono font-bold tracking-wider text-zinc-300">
                        {policy.state}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] text-[11.5px] font-mono font-semibold text-zinc-400 group-hover:text-white flex items-center justify-between transition-colors duration-300">
              <span>Cryptographic policy enforcement</span>
              <motion.div transition={{ type: "spring", stiffness: 200 }} variants={{ hover: { x: 4 } }}>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


