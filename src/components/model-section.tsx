"use client";

import React, { useState } from "react";
import { Cpu, Sparkles, Shield, Zap, Lock, Sliders, Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export function ModelSection() {
  const [selectedModel, setSelectedModel] = useState<string>("gemini");

  const models = [
    {
      id: "gemini",
      name: "Google Gemini 2.5 / 3.0",
      tag: "Designed for massive 1M+ token repository context",
      latency: "Ultra Low",
      context: "1M - 2M tokens",
      strength: "Whole-codebase AST ingestion & rapid architecture search",
      tier: "Default Cloud",
    },
    {
      id: "claude",
      name: "Anthropic Claude 3.7 Sonnet",
      tag: "Designed for complex multi-file architectural planning",
      latency: "Low",
      context: "200k tokens",
      strength: "Deep reasoning, test generation & precise code patching",
      tier: "Supported Provider",
    },
    {
      id: "deepseek",
      name: "DeepSeek R1 / V3",
      tag: "Designed for deep math & algorithmic optimization",
      latency: "Standard",
      context: "128k tokens",
      strength: "Open reasoning chains & cost-effective local pipelines",
      tier: "Supported Provider",
    },
    {
      id: "openai",
      name: "OpenAI o3 / GPT-4o",
      tag: "Designed for standard code synthesis & tooling",
      latency: "Low",
      context: "128k tokens",
      strength: "General purpose refactoring & PR description synthesis",
      tier: "Supported Provider",
    },
    {
      id: "local",
      name: "Local Models (Ollama / vLLM)",
      tag: "Designed for air-gapped & zero-data-leakage environments",
      latency: "Hardware bound",
      context: "32k - 128k tokens",
      strength: "100% on-premises execution with zero cloud telemetry",
      tier: "Air-Gapped / Privacy",
    },
  ];

  return (
    <section className="relative py-20 bg-[#07080a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-14">
          <Badge variant="mono" size="sm" className="font-mono">
            MODEL-AGNOSTIC CONTROL LAYER
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Bring the model you trust.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-mono">
            <strong className="text-white">HELM is the control layer, not the model.</strong> Our architecture is engineered so you can swap, route, or self-host models according to latency, cost, and strict enterprise privacy policies.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((m) => {
            const isSelected = selectedModel === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setSelectedModel(m.id)}
                className={cn(
                  "p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[220px] font-mono group",
                  isSelected
                    ? "bg-zinc-900 border-sky-400/60 shadow-[0_0_25px_rgba(56,189,248,0.12)] text-white"
                    : "bg-zinc-950/70 border-white/[0.06] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300">
                      {m.tier}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight mb-1 font-sans">
                    {m.name}
                  </h4>
                  <p className="text-[11.5px] text-zinc-400 mb-4 font-sans leading-relaxed">
                    {m.tag}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Context Window:</span>
                      <span className="text-zinc-200">{m.context}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Core Specialty:</span>
                      <span className="text-sky-300 truncate max-w-[170px]">{m.strength}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] text-zinc-400">
                  <span>Routing: Pluggable Adapter</span>
                  <span className="text-emerald-400">Configurable</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer on integrations */}
        <div className="mt-6 p-3.5 rounded-xl bg-zinc-950/80 border border-white/[0.06] flex items-center gap-2.5 text-xs font-mono text-zinc-400">
          <Shield className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            HELM includes unified adapter interfaces designed to support any OpenAI-compatible API, custom inference endpoint, or local vLLM server with zero telemetry leaks.
          </span>
        </div>
      </div>
    </section>
  );
}
