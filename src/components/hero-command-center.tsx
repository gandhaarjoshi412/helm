"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Cpu,
  GitBranch,
  Layers,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Search,
  FileCode,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Check,
} from "lucide-react";
import { StatusDot } from "./ui/status-dot";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { PhoneFrame } from "./ui/phone-frame";
import { DiffView } from "./ui/diff-view";
import { cn } from "@/lib/utils";

export function HeroCommandCenter() {
  // Steps: 0 = Investigating, 1 = Ready for Review, 2 = Phone Approval, 3 = Executing/Testing, 4 = Production Healthy
  const [step, setStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeLeftTab, setActiveLeftTab] = useState<string>("agents");
  const [showDiffModal, setShowDiffModal] = useState<boolean>(false);

  // Auto-play loop cycle
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const diffFiles = [
    {
      filename: "src/services/payment.ts",
      additions: 14,
      deletions: 3,
      lines: [
        { type: "context" as const, oldLine: 42, newLine: 42, content: "  async processStripeCharge(payload: ChargePayload): Promise<ChargeResult> {" },
        { type: "delete" as const, oldLine: 43, content: "    const response = await this.stripe.charges.create(payload);" },
        { type: "add" as const, newLine: 43, content: "    // HELM Agent: Add exponential backoff retry for transient network timeouts" },
        { type: "add" as const, newLine: 44, content: "    const response = await this.retryClient.execute(() =>" },
        { type: "add" as const, newLine: 45, content: "      this.stripe.charges.create(payload, { timeout: 8000 })" },
        { type: "add" as const, newLine: 46, content: "    );" },
        { type: "context" as const, oldLine: 44, newLine: 47, content: "    return this.mapChargeResponse(response);" },
        { type: "context" as const, oldLine: 45, newLine: 48, content: "  }" },
      ],
    },
    {
      filename: "tests/payment.test.ts",
      additions: 22,
      deletions: 0,
      lines: [
        { type: "add" as const, newLine: 1, content: "describe('PaymentService Retry Circuit', () => {" },
        { type: "add" as const, newLine: 2, content: "  it('recovers from 408 timeout on second attempt', async () => {" },
        { type: "add" as const, newLine: 3, content: "    const result = await paymentService.processStripeCharge(mockPayload);" },
        { type: "add" as const, newLine: 4, content: "    expect(result.status).toBe('succeeded');" },
        { type: "add" as const, newLine: 5, content: "  });" },
        { type: "add" as const, newLine: 6, content: "});" },
      ],
    },
  ];

  return (
    <div className="w-full relative select-none">
      {/* Interactive Step Scrubber Bar */}
      <div className="flex items-center justify-between gap-2 mb-3 px-2 py-1.5 rounded-lg bg-zinc-950/60 border border-white/[0.06] text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-zinc-400 hidden sm:inline">
            Interactive Cycle:
          </span>
          <div className="flex items-center gap-1">
            {[
              { label: "1. Investigate", id: 0 },
              { label: "2. Review Ready", id: 1 },
              { label: "3. Mobile Approve", id: 2 },
              { label: "4. Verify & Test", id: 3 },
              { label: "5. Shipped", id: 4 },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setStep(item.id);
                  setIsPlaying(false);
                }}
                className={cn(
                  "px-2.5 py-1 rounded transition-all text-[11px]",
                  step === item.id
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
                    : "hover:bg-white/[0.04] text-zinc-400"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-colors"
            title={isPlaying ? "Pause auto sequence" : "Play auto sequence"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span className="text-[10px]">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px]">Play Loop</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setStep(0);
              setIsPlaying(true);
            }}
            className="p-1.5 rounded bg-zinc-900 border border-white/10 text-zinc-400 hover:text-zinc-200"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Dual Stage: Desktop Command Center (70%) + Mobile Command Surface (30%) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* DESKTOP COMMAND CENTER */}
        <div className="xl:col-span-8 rounded-2xl bg-[#0d0f14] border border-white/[0.1] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden flex flex-col">
          {/* Top Command Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-[#090b0e]/90">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80" />
              </div>

              <div className="h-4 w-px bg-white/10 mx-1" />

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="font-bold text-white tracking-tight">PLATESIGHT</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">main</span>
                <span className="text-zinc-600">/</span>
                <span className="text-sky-400 text-[11px]">agent-session-843b</span>
              </div>
            </div>

            {/* Health & Telemetry status */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900/90 border border-white/[0.06] text-zinc-400">
                <Activity className="w-3 h-3 text-sky-400" />
                <span>SANDBOX: ACTIVE</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <StatusDot status={step === 0 ? "pending" : "healthy"} size="sm" />
                <span>
                  {step === 0
                    ? "INVESTIGATING"
                    : step === 3
                    ? "TESTING"
                    : "PRODUCTION HEALTHY"}
                </span>
              </div>
            </div>
          </div>

          {/* Main Workspace Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
            {/* Left Nav (Project Explorer) */}
            <div className="hidden md:block md:col-span-3 border-r border-white/[0.06] bg-[#0a0c10]/70 p-3 space-y-4 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold px-2">
                  PROJECT
                </span>
                <div className="mt-2 space-y-1">
                  {[
                    { id: "overview", label: "Overview", icon: Layers },
                    { id: "brain", label: "Architecture", icon: Cpu },
                    { id: "tasks", label: "Tasks", icon: CheckCircle2 },
                    { id: "agents", label: "Agents (1 Active)", icon: Sparkles },
                    { id: "git", label: "Git / Diff", icon: GitBranch },
                    { id: "deployments", label: "Deployments", icon: Activity },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeLeftTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveLeftTab(tab.id)}
                        className={cn(
                          "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors",
                          isActive
                            ? "bg-white/[0.08] text-white font-medium border border-white/10"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                        )}
                      >
                        <Icon className={cn("w-3.5 h-3.5", isActive ? "text-sky-400" : "text-zinc-500")} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Context Summary Box */}
              <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-white/[0.06] space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Brain Context:</span>
                  <span className="text-emerald-400">Synced</span>
                </div>
                <div className="text-zinc-500">
                  342 files indexed • PostgreSQL + Redis • Stripe SDK v14
                </div>
              </div>
            </div>

            {/* Center Stage: Agent Activity Stream */}
            <div className="md:col-span-5 p-4 border-r border-white/[0.06] bg-[#0c0e13] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider">
                      Agent Activity
                    </span>
                  </div>
                  <Badge variant="mono" size="sm">
                    Autonomous Layer
                  </Badge>
                </div>

                {/* Live Activity Telemetry Log */}
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-white/[0.06] text-zinc-300">
                    <span className="text-zinc-500">[10:42:13]</span>{" "}
                    <span className="text-amber-300">Investigating checkout failure...</span>
                  </div>

                  <div className="space-y-1.5 pl-2">
                    <div
                      className={cn(
                        "flex items-center gap-2 transition-all duration-300",
                        step >= 0 ? "text-emerald-400 opacity-100" : "text-zinc-600 opacity-40"
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Repository analyzed (342 source files)</span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 transition-all duration-300",
                        step >= 0 ? "text-emerald-400 opacity-100" : "text-zinc-600 opacity-40"
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Recent deployment commit <span className="text-sky-300 font-bold">#a84f2e</span> inspected</span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 transition-all duration-300",
                        step >= 1 ? "text-emerald-400 opacity-100" : "text-zinc-600 opacity-40"
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Payment service call graph traced</span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 transition-all duration-300",
                        step >= 1 ? "text-emerald-400 opacity-100" : "text-zinc-600 opacity-40"
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Stripe timeout documentation verified</span>
                    </div>
                  </div>

                  {/* Diagnosis callout */}
                  {step >= 1 && (
                    <div className="mt-3 p-3 rounded-lg bg-sky-950/30 border border-sky-500/20 text-[11.5px] text-sky-200">
                      <div className="font-semibold text-sky-300 mb-0.5">
                        Likely cause identified
                      </div>
                      <div>
                        Unhandled 408 HTTP timeout in Stripe client during peak order surges. Patch with exponential retry prepared.
                      </div>
                    </div>
                  )}

                  {step >= 3 && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>47/47 unit & integration tests passing</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400/80">312ms</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Memory: 1.2 GB sandbox</span>
                <span className="text-sky-400">Agent: Online</span>
              </div>
            </div>

            {/* Right Stage: Task Inspector & Diff View */}
            <div className="md:col-span-4 p-4 bg-[#090b0f] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold text-zinc-200 uppercase tracking-wider">
                    TASK
                  </span>
                  <Badge
                    variant={step >= 2 ? "success" : "warning"}
                    size="sm"
                  >
                    {step === 0
                      ? "DIAGNOSING"
                      : step === 1
                      ? "AWAITING APPROVAL"
                      : step === 2
                      ? "APPROVED ON MOBILE"
                      : step === 3
                      ? "EXECUTING TESTS"
                      : "SHIPPED"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-tight">
                      Fix checkout timeout
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      Add resilient retry logic with jitter to prevent transient payment timeouts.
                    </p>
                  </div>

                  {/* Task Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/[0.06] text-xs font-mono">
                    <div className="p-2 rounded bg-zinc-950 border border-white/[0.04]">
                      <div className="text-zinc-500 text-[10px]">RISK</div>
                      <div className="text-emerald-400 font-semibold mt-0.5">LOW</div>
                    </div>
                    <div className="p-2 rounded bg-zinc-950 border border-white/[0.04]">
                      <div className="text-zinc-500 text-[10px]">FILES</div>
                      <div className="text-zinc-200 font-semibold mt-0.5">3</div>
                    </div>
                    <div className="p-2 rounded bg-zinc-950 border border-white/[0.04]">
                      <div className="text-zinc-500 text-[10px]">TESTS</div>
                      <div className="text-emerald-400 font-semibold mt-0.5">47/47</div>
                    </div>
                  </div>

                  {/* Diff Snippet Preview */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>Proposed Patch</span>
                      <span className="text-emerald-400">+36 / -3</span>
                    </div>
                    <DiffView files={diffFiles} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-2">
                <Button
                  variant={step === 1 ? "primary" : "secondary"}
                  size="sm"
                  className="w-full justify-center text-xs"
                  onClick={() => {
                    if (step === 1) setStep(2);
                    else if (step === 2) setStep(3);
                    else setStep(1);
                  }}
                >
                  {step === 1 ? "Review & Approve" : step === 4 ? "View Production" : "Inspect Execution"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE COMMAND SURFACE (Beside Desktop) */}
        <div className="xl:col-span-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-sky-400" />
              REMOTE COMMAND SURFACE
            </span>
            <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              SYNCHRONIZED
            </span>
          </div>

          <PhoneFrame statusText="SYNCED" time="10:42">
            <div className="p-4 flex-col justify-between h-full flex font-mono">
              {/* Phone Header */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div>
                    <div className="text-[11px] text-zinc-400 font-sans">HELM Mobile</div>
                    <div className="text-sm font-bold text-white tracking-tight">PLATESIGHT</div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                    <StatusDot status="healthy" size="sm" pulse={false} />
                    <span>Healthy</span>
                  </div>
                </div>

                {/* Mobile Incident / Task Card */}
                <div className="mt-3.5 p-3 rounded-xl bg-zinc-900/90 border border-white/[0.1] shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                      {step <= 2 ? "Agent Needs Approval" : "Deployment Live"}
                    </span>
                    <span className="text-[10px] text-zinc-500">Just now</span>
                  </div>

                  <div className="text-xs font-semibold text-white font-sans">
                    Fix checkout timeout
                  </div>

                  <div className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    {step === 0 && "Agent is analyzing Stripe 408 latency traces..."}
                    {step >= 1 && step <= 2 && "Patch prepared: 3 files changed. 47/47 passing tests in isolated sandbox."}
                    {step === 3 && "Running continuous integration verification..."}
                    {step === 4 && "Successfully deployed to production. Error rate dropped to 0.00%."}
                  </div>

                  {step >= 1 && step <= 2 && (
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400">Risk: <span className="text-emerald-400">LOW</span></span>
                      <span className="text-zinc-400">Tests: <span className="text-emerald-400">47/47</span></span>
                    </div>
                  )}
                </div>

                {/* Secondary Quick Telemetry */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 rounded-lg bg-zinc-950/60 border border-white/[0.06]">
                    <div className="text-zinc-500">DEPLOYMENT</div>
                    <div className="text-zinc-200 font-semibold mt-0.5">#a84f2e1</div>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-950/60 border border-white/[0.06]">
                    <div className="text-zinc-500">CONTAINER</div>
                    <div className="text-emerald-400 font-semibold mt-0.5">Sandboxed</div>
                  </div>
                </div>
              </div>

              {/* Phone Action Area */}
              <div className="pt-4 border-t border-white/[0.08] space-y-2">
                {step <= 1 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center text-xs py-2"
                    onClick={() => setStep(2)}
                  >
                    Review Changes
                  </Button>
                ) : step === 2 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center text-xs py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950"
                    onClick={() => setStep(3)}
                    icon={<Check className="w-3.5 h-3.5 stroke-[3]" />}
                  >
                    Tap to Approve Fix
                  </Button>
                ) : (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-emerald-400">
                    ✓ Shipped to Production
                  </div>
                )}
                <div className="text-[10px] text-center text-zinc-500 font-sans">
                  Tap to interact • Command & Control Surface
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
