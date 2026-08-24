"use client";

import React, { useState } from "react";
import {
  Brain,
  Code2,
  SearchCode,
  Rocket,
  ArrowRight,
  CheckCircle2,
  FileCode,
  Terminal,
  Layers,
  Sparkles,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function UseCases() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const scenarios = [
    {
      id: "understand",
      title: "Understand",
      icon: Brain,
      prompt: "“Explain how authentication flows through this repository.”",
      resultTitle: "Topology & Token Lifecycles",
      bullets: [
        "Traces Edge Middleware → JWT Validator → PostgreSQL tenant session",
        "Visualizes public vs protected route boundary in seconds",
        "Generates interactive mermaid sequence diagram with referenced line numbers",
      ],
      output: `[HELM Brain Graph: Auth Pipeline]
1. src/middleware.ts -> Extracts Bearer JWT & checks expiration
2. src/services/auth.ts -> Verifies RS256 signature against JWKS
3. src/api/routes/*.ts -> Injects authenticated UserSession context
4. Outcome: 14 protected route handlers mapped with 0 vulnerabilities`,
    },
    {
      id: "build",
      title: "Build",
      icon: Code2,
      prompt: "“Implement dark mode tokens across the customer dashboard.”",
      resultTitle: "Multi-File Synchronized Refactor",
      bullets: [
        "Discovers 18 CSS token references across 12 components",
        "Generates semantic color variables with WCAG AAA contrast ratio",
        "Validates layout across all viewport breakpoints in headless browser",
      ],
      output: `[HELM Plan & Sandbox Edits]
✓ Modified: src/app/globals.css (added --color-surface, --color-text)
✓ Modified: 12 components in src/components/dashboard/
✓ Added: tests/theme.test.ts (ensures theme switcher persists to localStorage)
✓ Tests: 38/38 passing • 0 visual regression artifacts detected`,
    },
    {
      id: "investigate",
      title: "Investigate",
      icon: SearchCode,
      prompt: "“Why did checkout start failing after the last deployment?”",
      resultTitle: "Root-Cause Triage in 8 Seconds",
      bullets: [
        "Diffs commit #a84f2e against runtime error logs in Sentry",
        "Identifies missing exponential retry on Stripe 408 network errors",
        "Prepares isolated patch & creates regression test suite",
      ],
      output: `[HELM Incident Analysis]
• Root Cause: Stripe API charges.create throws 408 timeout on peak bursts
• Affected Service: src/services/payment.ts:L43
• Solution: Wrap with exponential backoff & idempotency key
• Confidence: 91% • Sandbox unit test verified`,
    },
    {
      id: "ship",
      title: "Ship",
      icon: Rocket,
      prompt: "“Run the tests, commit the fix, and prepare deployment.”",
      resultTitle: "Automated Git & CI/CD Orchestration",
      bullets: [
        "Executes 47/47 tests in clean ephemeral container sandbox",
        "Creates clean git branch fix/payment-retry and signs commit",
        "Pushes PR and monitors canary deployment release until healthy",
      ],
      output: `[HELM Git & Release Dispatch]
$ git commit -m "fix(payment): exponential retry for Stripe 408 timeouts"
$ git push origin fix/payment-retry
$ gh pr create --title "fix: stripe timeout backoff" --body "Verified 47/47 tests"
• Canary Health: 0.00% error rate • Production verified`,
    },
  ];

  const current = scenarios[activeTab];

  return (
    <section className="relative py-24 bg-[#08090b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="info" size="sm" className="font-mono">
            CORE SCENARIOS
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Engineered for real engineering workflows.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-mono">
            Four everyday developer challenges solved with unified persistent context and sandboxed agent execution.
          </p>
        </div>

        {/* 4 Interactive Scenario Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {scenarios.map((sc, idx) => {
            const Icon = sc.icon;
            const isCurrent = activeTab === idx;
            return (
              <button
                key={sc.id}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "p-4 rounded-xl border text-left font-mono transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[90px] group",
                  isCurrent
                    ? "bg-zinc-900 border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.12)] text-white"
                    : "bg-zinc-950/60 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-white/14"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-sky-400">
                    SCENARIO 0{idx + 1}
                  </span>
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isCurrent ? "text-sky-400" : "text-zinc-500 group-hover:text-zinc-300"
                    )}
                  />
                </div>

                <div className="font-bold text-sm text-white tracking-tight mt-2">
                  {sc.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Showcase Window */}
        <div className="rounded-2xl bg-[#0c0e14] border border-white/[0.08] p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Prompt & Capabilities (6 cols) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Intent Input
                </div>

                <blockquote className="text-xl sm:text-2xl font-bold text-white font-mono leading-snug">
                  {current.prompt}
                </blockquote>

                <div className="pt-2">
                  <div className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    HELM AUTOMATED ACTION:
                  </div>
                  <ul className="space-y-2 text-xs font-mono text-zinc-400">
                    {current.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Phase: <strong>{current.title}</strong></span>
                <span className="text-emerald-400">Deterministic Execution</span>
              </div>
            </div>

            {/* Right: Terminal / Sandbox Output Window (6 cols) */}
            <div className="lg:col-span-6 rounded-xl bg-[#07090c] border border-white/[0.08] p-5 font-mono text-xs text-zinc-300 flex flex-col justify-between shadow-inner">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-[11px] text-zinc-400 mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-bold text-zinc-200">Execution Sandbox Telemetry</span>
                  </div>
                  <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    VERIFIED
                  </span>
                </div>

                <pre className="whitespace-pre font-mono text-[11.5px] leading-relaxed text-zinc-300 overflow-x-auto">
                  {current.output}
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] text-zinc-400 flex justify-between">
                <span>Sandbox ID: #sbx_843b</span>
                <span className="text-sky-300">Exit Code 0 (Success)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
