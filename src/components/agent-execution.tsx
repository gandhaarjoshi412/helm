"use client";

import React, { useState } from "react";
import {
  MessageSquareCode,
  FileCheck2,
  FileCode2,
  CheckCircle,
  Rocket,
  ArrowRight,
  Terminal,
  ShieldAlert,
  GitCommit,
  Check,
  Play,
  RotateCw,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { StatusDot } from "./ui/status-dot";
import { cn } from "@/lib/utils";

export function AgentExecution() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: "ask",
      index: 0,
      title: "ASK",
      icon: MessageSquareCode,
      short: "Intent Specification",
      snippetTitle: "Developer Prompt Dispatch",
      detail: "The developer issues an intent via natural language, code comment, or voice.",
      code: `// Developer Command (Desktop or Phone Voice):
> "Add exponential retry handling with jitter to payment requests
   to mitigate transient Stripe 408 timeout spikes during peak load."

[Kodium Context Engine]
- Loaded Project: PLATESIGHT
- Target Boundary: src/services/payment.ts, tests/payment.test.ts
- Execution Sandbox: Ephemeral isolated container v1.4`,
    },
    {
      id: "plan",
      index: 1,
      title: "PLAN",
      icon: FileCheck2,
      short: "Multi-File Strategy",
      snippetTitle: "Deterministic Execution Plan",
      detail: "Agent evaluates AST, identifies affected call-stacks, computes risk score, and defines tests.",
      code: `[Kodium Implementation Plan: Low Risk]
1. [MODIFY] src/services/payment.ts (wrap stripe.charges with retryClient)
2. [NEW]    tests/payment.test.ts (add 408 recovery and max-retry assertion)
3. [VERIFY] Run full suite (47 unit + 12 integration tests)

Risk Score: LOW (Non-breaking additive change)
Sandbox Boundaries: Read/Write scoped to /src/services and /tests`,
    },
    {
      id: "execute",
      index: 2,
      title: "EXECUTE",
      icon: FileCode2,
      short: "Sandboxed Code Edits",
      snippetTitle: "Targeted AST Patch",
      detail: "Agent writes clean code following the repository's strict formatting and idioms.",
      code: `// Editing src/services/payment.ts
+ export async function executeWithRetry<T>(
+   fn: () => Promise<T>,
+   options: RetryOptions = { maxRetries: 3, backoffMs: 300 }
+ ): Promise<T> {
+   return pRetry(fn, { ...options, onFailedAttempt: logRetryWarning });
+ }

// Integrating into checkout handler
- const charge = await stripe.charges.create(payload);
+ const charge = await executeWithRetry(() => stripe.charges.create(payload));`,
    },
    {
      id: "verify",
      index: 3,
      title: "VERIFY",
      icon: CheckCircle,
      short: "Automated Test Suite",
      snippetTitle: "Sandbox Test Execution Output",
      detail: "Executes test runner, linter, and type checker in the isolated sandbox before proposing changes.",
      code: `✓ src/services/payment.test.ts (6 tests) 142ms
✓ src/services/orders.test.ts (18 tests) 310ms
✓ src/api/restaurant.test.ts (23 tests) 480ms

Test Files: 3 passed, 3 total
Tests:      47 passed, 47 total
Snapshots:  0 total
Time:       932ms
Lint Check: 0 errors, 0 warnings
TypeScript: Clean compilation (zero emit errors)`,
    },
    {
      id: "ship",
      index: 4,
      title: "SHIP",
      icon: Rocket,
      short: "Remote Git & Deploy",
      snippetTitle: "Verified Commit & Deployment",
      detail: "Generates atomic commit, pushes to remote branch, and monitors deployment telemetry.",
      code: `[Git Execution]
$ git checkout -b fix/payment-retry-timeout
$ git commit -m "fix(payment): implement exponential retry for Stripe 408s"
$ git push origin fix/payment-retry-timeout

[CI / CD Orchestration]
- Pull Request #142 opened & auto-linked to Task #843
- Production Preview Deployment: https://preview.platesight.dev
- Status: PRODUCTION HEALTHY (0 error rate recorded)`,
    },
  ];

  const current = steps[activeStep];

  return (
    <section id="agent" className="relative py-24 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="info" size="sm" className="font-mono">
            END-TO-END PIPELINE
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            From question to shipped code.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Every step is transparent, sandboxed, and verified. Kodium replaces guesswork with a deterministic five-phase software lifecycle.
          </p>
        </div>

        {/* Horizontal Workflow Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] relative overflow-hidden group cursor-pointer",
                  isCurrent
                    ? "bg-zinc-900 border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.18)] text-white"
                    : "bg-zinc-950/60 border-white/[0.06] hover:border-white/[0.14] text-zinc-400 hover:text-zinc-200"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider">
                    PHASE 0{idx + 1}
                  </span>
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isCurrent ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                    )}
                  />
                </div>

                <div>
                  <div className="font-mono font-bold text-sm tracking-tight">
                    {s.title}
                  </div>
                  <div className="text-[11px] text-zinc-500 truncate mt-0.5">
                    {s.short}
                  </div>
                </div>

                {isCurrent && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-300 via-white to-zinc-400" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Inspection Window */}
        <div className="rounded-2xl bg-[#0c0e13] border border-white/[0.08] shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-[#090b0e]">
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="text-zinc-500">|</span>
              <span className="font-bold text-white uppercase">{current.title} PHASE:</span>
              <span className="text-zinc-200">{current.snippetTitle}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                SANDBOX VERIFIED
              </span>
            </div>
          </div>

          {/* Code Window Body */}
          <div className="p-6 font-mono text-xs text-zinc-300 overflow-x-auto bg-[#07090c] min-h-[260px] flex flex-col justify-between">
            <pre className="leading-relaxed whitespace-pre font-mono text-[12px] text-zinc-300">
              {current.code}
            </pre>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400">
              <span>{current.detail}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 4))}
                  className="text-xs"
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveStep((prev) => (prev < 4 ? prev + 1 : 0))}
                  className="text-xs"
                  iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Next Phase
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
