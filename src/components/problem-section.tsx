"use client";

import React, { useState } from "react";
import {
  Code2,
  Globe,
  BookOpen,
  MessageSquare,
  Terminal,
  GitPullRequest,
  Activity,
  Smartphone,
  Cpu,
  ArrowDown,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Panel } from "./ui/panel";
import { Badge } from "./ui/badge";
import { HelmMark } from "./ui/helm-mark";
import { cn } from "@/lib/utils";

export function ProblemSection() {
  const [activeFragment, setActiveFragment] = useState<number>(0);

  const fragmentedSteps = [
    { title: "IDE", icon: Code2, desc: "Scattered files & local state", pain: "Context lost when switching branches" },
    { title: "Browser", icon: Globe, desc: "20+ tabs open for research", pain: "Manual copy-pasting of API errors" },
    { title: "Documentation", icon: BookOpen, desc: "Searching Stripe, AWS, SDKs", pain: "Outdated docs and version drift" },
    { title: "AI Chat", icon: MessageSquare, desc: "Stateless prompt windows", pain: "No repository awareness or sandbox" },
    { title: "Terminal", icon: Terminal, desc: "Running build & test commands", pain: "Manual execution & debugging loops" },
    { title: "GitHub", icon: GitPullRequest, desc: "Reviewing diffs and comments", pain: "Disconnected from actual runtime" },
    { title: "CI / CD", icon: Activity, desc: "Waiting for build pipelines", pain: "Slow remote failures" },
    { title: "Monitoring", icon: AlertCircle, desc: "Datadog / Sentry alerts", pain: "Alarms without automatic triage" },
    { title: "Phone", icon: Smartphone, desc: "Panic alerts away from desk", pain: "Must open laptop to fix anything" },
  ];

  return (
    <section className="relative py-24 border-t border-white/[0.06] bg-[#07080a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="warning" size="sm" className="font-mono">
            THE FRAGMENTATION PROBLEM
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Software development is fragmented.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Engineers spend over 60% of their day context-switching across disconnected tools: reading code in an IDE, searching docs in a browser, pasting snippets into AI chat, running terminal commands, reviewing GitHub PRs, and getting paged on mobile.
          </p>
        </div>

        {/* Visual Pipeline Grid */}
        <div className="relative">
          {/* Step Sequence Container */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5 relative z-10">
            {fragmentedSteps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeFragment === idx;
              return (
                <div
                  key={step.title}
                  onClick={() => setActiveFragment(idx)}
                  className={cn(
                    "p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[115px] group",
                    isSelected
                      ? "bg-zinc-900 border-rose-500/40 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                      : "bg-zinc-950/60 border-white/[0.06] hover:border-white/[0.14] hover:bg-zinc-900/60"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300">
                      0{idx + 1}
                    </span>
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isSelected ? "text-rose-400" : "text-zinc-500 group-hover:text-zinc-300"
                      )}
                    />
                  </div>

                  <div>
                    <div className="font-mono font-semibold text-xs text-zinc-200 group-hover:text-white">
                      {step.title}
                    </div>
                    <div className="text-[10.5px] text-zinc-400 mt-1 line-clamp-2 leading-snug">
                      {step.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Pain Point Callout */}
          <div className="mt-4 p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>{fragmentedSteps[activeFragment].title} Bottleneck:</strong>{" "}
                {fragmentedSteps[activeFragment].pain}
              </span>
            </div>
            <span className="text-zinc-400 text-[11px]">Click any step above to inspect friction</span>
          </div>
        </div>

        {/* Transition into HELM Philosophy */}
        <div className="mt-16 pt-12 border-t border-white/[0.08] relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                THE PARADIGM SHIFT
              </div>
              <blockquote className="text-xl sm:text-2xl font-medium text-white leading-snug">
                “Developers don’t need another place to chat with an AI. They need a system that understands the project and can actually operate it.”
              </blockquote>
              <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                HELM unifies your repository context, test runner, git state, agent execution, and mobile telemetry into one sovereign command center.
              </p>
            </div>

            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0d1017] border border-sky-500/30 shadow-[0_0_30px_rgba(56,189,248,0.08)] space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-white font-semibold pb-2 border-b border-white/[0.08]">
                <HelmMark size={20} glow />
                <span>HELM UNIFIED CONTROL PLANE</span>
              </div>
              <div className="space-y-2 text-zinc-300 text-[11.5px]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero context leakage:</strong> Persistent project brain knows the whole architecture.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Hardened autonomy:</strong> Agent acts in sandbox with strict developer-defined boundaries.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Remote sovereignty:</strong> Command, verify, and ship from desktop or mobile.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
