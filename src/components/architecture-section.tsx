"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Globe,
  Cpu,
  Shield,
  Layers,
  Terminal,
  GitBranch,
  Search,
  Cloud,
  CheckCircle2,
  Lock,
  Boxes,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { KodiumMark } from "./ui/kodium-mark";
import { cn } from "@/lib/utils";

export function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState<string>("control-plane");

  const capabilities = [
    { title: "Model-Agnostic Engine", desc: "Pluggable LLM router supporting Gemini, Claude, DeepSeek, OpenAI, or local vLLM nodes." },
    { title: "Continuous Project Brain", desc: "Incremental AST parsing, dependency graphs, and git telemetry indexed in memory." },
    { title: "Hardened Execution Sandbox", desc: "Ephemeral container runtime with strictly isolated network and filesystem jail." },
    { title: "Deterministic Git Workflows", desc: "Atomic commit generation, branch creation, rebase resolution, and PR creation." },
    { title: "Autonomous Web Research", desc: "Headless browser sandbox for real-time SDK documentation & GitHub issue triage." },
    { title: "Cryptographic Permissions", desc: "Developer-enforced capability gates for destructive cloud and deployment actions." },
    { title: "Realtime Telemetry Stream", desc: "Low-latency WebSocket event loop streaming agent tool calls, tests, and diffs." },
    { title: "Mobile Sovereign Control", desc: "Encrypted iOS/Android command plane with biometric approval gates." },
  ];

  return (
    <section id="architecture" className="relative py-28 bg-black dark:bg-black light:bg-white border-t border-white/[0.06] dark:border-white/[0.06] light:border-slate-200 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-white/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="mono" size="sm" className="font-mono">
            TECHNICAL ARCHITECTURE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            One control plane. Multiple execution layers.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-mono">
            Kodium decouples client command surfaces from backend execution sandboxes and model providers. Your project state remains unified, sovereign, and secure.
          </p>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="rounded-3xl bg-black border border-white/10 p-6 sm:p-10 shadow-2xl mb-12 relative overflow-hidden font-mono">
          {/* Layer 1: Client Ingress */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 p-3 px-6 rounded-2xl bg-zinc-900 border border-white/10 shadow-lg text-xs font-bold text-white">
              <Smartphone className="w-4 h-4 text-zinc-200" />
              <span>MOBILE CLIENT (iOS / Android)</span>
              <span className="text-zinc-600">/</span>
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>DESKTOP WEB WORKSPACE</span>
            </div>

            {/* Connecting line */}
            <div className="w-0.5 h-8 bg-gradient-to-b from-slate-300 via-white to-zinc-400 my-1" />

            {/* Layer 2: KODIUM CONTROL PLANE */}
            <div className="w-full max-w-2xl p-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-slate-900 to-zinc-900 border border-white/30 text-center shadow-[0_0_30px_rgba(255,255,255,0.12)]">
              <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
                <KodiumMark size={20} glow />
                <span>KODIUM UNIFIED CONTROL PLANE & EVENT BUS</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-1">
                State Synchronization • Cryptographic RBAC • WebSocket Stream Router
              </div>
            </div>

            {/* Connecting Triple Branch */}
            <div className="w-full max-w-xl grid grid-cols-3 gap-4 my-2">
              <div className="flex justify-center"><div className="w-0.5 h-6 bg-white/20" /></div>
              <div className="flex justify-center"><div className="w-0.5 h-6 bg-white/60" /></div>
              <div className="flex justify-center"><div className="w-0.5 h-6 bg-white/20" /></div>
            </div>

            {/* Layer 3: Core Subsystems (Brain, Agent Engine, Permissions) */}
            <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] text-center space-y-1">
                <Cpu className="w-4 h-4 text-zinc-200 mx-auto" />
                <div className="font-bold text-xs text-white">Project Brain</div>
                <div className="text-[10.5px] text-zinc-400">AST Graph & Memory</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/30 text-center space-y-1 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <Boxes className="w-4 h-4 text-emerald-400 mx-auto" />
                <div className="font-bold text-xs text-white">Agent Engine</div>
                <div className="text-[10.5px] text-zinc-400">Model-Agnostic Router</div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] text-center space-y-1">
                <Shield className="w-4 h-4 text-amber-400 mx-auto" />
                <div className="font-bold text-xs text-white">Permission Matrix</div>
                <div className="text-[10.5px] text-zinc-400">Deterministic Policy Gates</div>
              </div>
            </div>

            {/* Connecting line */}
            <div className="w-0.5 h-8 bg-emerald-400 my-1" />

            {/* Layer 4: Execution Sandbox */}
            <div className="w-full max-w-xl p-3.5 rounded-2xl bg-zinc-950/90 border border-emerald-500/40 text-center shadow-lg">
              <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>EPHEMERAL EXECUTION SANDBOX (eBPF / Containers)</span>
              </div>
              <div className="text-[10.5px] text-zinc-400 mt-0.5">
                Compiler • Test Runner • Linter • Isolated Filesystem
              </div>
            </div>

            {/* Connecting line */}
            <div className="w-full max-w-md grid grid-cols-2 gap-8 my-1">
              <div className="flex justify-center"><div className="w-0.5 h-6 bg-white/20" /></div>
              <div className="flex justify-center"><div className="w-0.5 h-6 bg-white/20" /></div>
            </div>

            {/* Layer 5: Git & Headless Browser */}
            <div className="w-full max-w-md grid grid-cols-2 gap-4">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/[0.06] text-center text-xs text-zinc-300 flex items-center justify-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-zinc-200" />
                <span>Git Workflows</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/[0.06] text-center text-xs text-zinc-300 flex items-center justify-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-purple-400" />
                <span>Browser Research</span>
              </div>
            </div>

            {/* Connecting line */}
            <div className="w-0.5 h-8 bg-white my-1" />

            {/* Layer 6: CI / CD / Cloud */}
            <div className="p-3 px-8 rounded-2xl bg-zinc-950 border border-white/10 text-xs font-bold text-zinc-200 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-zinc-200" />
              <span>CI / CD / CLOUD DEPLOYMENTS (Vercel, AWS, GCP, K8s)</span>
            </div>
          </div>
        </div>

        {/* Technical Capabilities Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, idx) => (
            <div
              key={cap.title}
              className="p-4 rounded-xl bg-[#0e1117] border border-white/[0.06] space-y-1.5 hover:border-white/[0.14] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-zinc-200">
                  0{idx + 1}
                </span>
                <h4 className="text-xs font-mono font-bold text-white">
                  {cap.title}
                </h4>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
