"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        { type: "add" as const, newLine: 43, content: "    // Kodium Agent: Add exponential backoff retry for transient network timeouts" },
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
      {/* Interactive Step Scrubber Bar in Pill Capsule Design */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 mb-4 px-4 py-2.5 rounded-2xl bg-zinc-950/40 dark:bg-zinc-950/40 light:bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/20 light:border-slate-300 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.3)] font-mono text-xs text-zinc-300 transition-all duration-300 overflow-hidden">
        {/* Top Rim Glass Sheen Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2 z-10">
          <span className="text-[11px] uppercase tracking-wider font-bold text-zinc-300 dark:text-zinc-300 light:text-slate-700 mr-1 hidden sm:inline">
            INTERACTIVE CYCLE:
          </span>
          <div className="relative inline-flex flex-wrap items-center gap-1 p-1 rounded-full bg-zinc-950/60 dark:bg-zinc-950/60 light:bg-slate-100 border border-white/15 dark:border-white/15 light:border-slate-300 backdrop-blur-md">
            {[
              { label: "1. Investigate", id: 0 },
              { label: "2. Review Ready", id: 1 },
              { label: "3. Mobile Approve", id: 2 },
              { label: "4. Verify & Test", id: 3 },
              { label: "5. Shipped", id: 4 },
            ].map((item) => {
              const isActive = step === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setStep(item.id);
                    setIsPlaying(false);
                  }}
                  className={cn(
                    "relative px-4 py-1.5 text-[11px] sm:text-xs font-mono font-medium tracking-wide transition-all duration-300 cursor-pointer rounded-full select-none flex flex-col items-center justify-center group z-10",
                    isActive
                      ? "text-white dark:text-white light:text-slate-900 font-semibold drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                      : "text-zinc-400 dark:text-zinc-400 light:text-slate-600 hover:text-zinc-100 dark:hover:text-zinc-100 light:hover:text-slate-900"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Animated Glass Capsule Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCycleTabGlassCapsule"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                      }}
                      className="absolute inset-0 rounded-full bg-white/[0.14] dark:bg-white/[0.14] light:bg-slate-200/80 border border-white/30 dark:border-white/30 light:border-slate-400/50 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.4)] -z-0"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 z-10">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] dark:bg-white/[0.06] light:bg-white hover:bg-white/[0.12] dark:hover:bg-white/[0.12] border border-white/20 dark:border-white/20 light:border-slate-300 text-zinc-200 dark:text-zinc-200 light:text-slate-800 hover:text-white dark:hover:text-white transition-all font-mono text-xs backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer"
            title={isPlaying ? "Pause auto sequence" : "Play auto sequence"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-bold">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-bold">Play Loop</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setStep(0);
              setIsPlaying(true);
            }}
            className="p-1.5 rounded-lg bg-white/[0.06] dark:bg-white/[0.06] light:bg-white hover:bg-white/[0.12] dark:hover:bg-white/[0.12] border border-white/20 dark:border-white/20 light:border-slate-300 text-zinc-400 dark:text-zinc-400 light:text-slate-600 hover:text-zinc-100 dark:hover:text-zinc-100 transition-all backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Dual Stage: Desktop Command Center (70%) + Mobile Command Surface (30%) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* DESKTOP COMMAND CENTER with Silky 3D Tilt */}
        <motion.div
          whileHover={{
            y: -6,
            rotateX: 1.2,
            rotateY: -1.2,
            transition: { type: "spring", stiffness: 140, damping: 20, mass: 0.8 },
          }}
          className="xl:col-span-8 rounded-2xl bg-white dark:bg-black border border-slate-200 dark:border-white/[0.1] shadow-xl dark:shadow-2xl overflow-hidden flex flex-col transition-all duration-300 cursor-pointer"
        >
          {/* Top Command Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/[0.08] bg-slate-100/90 dark:bg-black/90 font-mono">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-zinc-700/80" />
              </div>

              <div className="h-4 w-px bg-slate-300 dark:bg-white/10 mx-1" />

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">PLATESIGHT</span>
                <span className="text-slate-400 dark:text-zinc-600">/</span>
                <span className="text-slate-600 dark:text-zinc-400">main</span>
                <span className="text-slate-400 dark:text-zinc-600">/</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-bold text-[11px]">agent-session-843b</span>
              </div>
            </div>

            {/* Health & Telemetry status */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-white/[0.06] text-slate-700 dark:text-zinc-400 shadow-xs">
                <Activity className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                <span className="font-bold text-[11px]">SANDBOX: ACTIVE</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-bold text-[11px]">
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
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[390px]">
            {/* Left Nav (Project Explorer) */}
            <div className="hidden md:block md:col-span-3 border-r border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-[#0a0c10]/70 p-3 space-y-4 text-xs font-mono">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-extrabold px-2">
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
                          "w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all duration-200 font-mono",
                          isActive
                            ? "bg-white dark:bg-white/[0.08] text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-white/10 shadow-xs"
                            : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200/50 dark:hover:bg-white/[0.03]"
                        )}
                      >
                        <Icon className={cn("w-3.5 h-3.5", isActive ? "text-slate-900 dark:text-zinc-200" : "text-slate-400 dark:text-zinc-500")} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Context Summary Box */}
              <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-950/70 border border-slate-200 dark:border-white/[0.06] space-y-1.5 text-[11px] font-mono shadow-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400 font-medium">
                  <span>Brain Context:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">Synced</span>
                </div>
                <div className="text-slate-500 dark:text-zinc-500 text-[10.5px]">
                  342 files indexed • PostgreSQL + Redis • Stripe SDK v14
                </div>
              </div>
            </div>

            {/* Center Stage: Agent Activity Stream */}
            <div className="md:col-span-5 p-4 border-r border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#0c0e13] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-zinc-200 uppercase tracking-wider">
                      Agent Activity
                    </span>
                  </div>
                  <Badge variant="mono" size="sm" className="font-mono">
                    Autonomous Layer
                  </Badge>
                </div>

                {/* Live Activity Telemetry Log */}
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-950/80 border border-slate-200 dark:border-white/[0.06] text-slate-800 dark:text-zinc-300 shadow-xs">
                    <span className="text-slate-400 dark:text-zinc-500 font-bold">[10:42:13]</span>{" "}
                    <span className="text-amber-600 dark:text-amber-300 font-bold">Investigating checkout failure...</span>
                  </div>

                  <div className="space-y-2 pl-1 font-mono">
                    <div
                      className={cn(
                        "flex items-center gap-2 transition-all duration-300 text-[11.5px]",
                        step >= 0
                          ? "text-emerald-700 dark:text-emerald-400 font-semibold opacity-100"
                          : "text-slate-400 dark:text-zinc-600 opacity-40"
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Repository analyzed (342 source files)</span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 transition-all duration-300 text-[11.5px]",
                        step >= 0
                          ? "text-emerald-700 dark:text-emerald-400 font-semibold opacity-100"
                          : "text-slate-400 dark:text-zinc-600 opacity-40"
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Recent deployment commit <span className="text-slate-900 dark:text-zinc-200 font-bold">#a84f2e</span> inspected</span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 transition-all duration-300 text-[11.5px]",
                        step >= 1
                          ? "text-emerald-700 dark:text-emerald-400 font-semibold opacity-100"
                          : "text-slate-400 dark:text-zinc-600 opacity-40"
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Payment service call graph traced</span>
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 transition-all duration-300 text-[11.5px]",
                        step >= 1
                          ? "text-emerald-700 dark:text-emerald-400 font-semibold opacity-100"
                          : "text-slate-400 dark:text-zinc-600 opacity-40"
                      )}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Stripe timeout documentation verified</span>
                    </div>
                  </div>

                  {/* Diagnosis callout */}
                  {step >= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-slate-300 dark:border-white/10 text-[11.5px] text-slate-900 dark:text-zinc-200 shadow-xs font-mono"
                    >
                      <div className="font-bold text-slate-900 dark:text-white mb-0.5">
                        Likely cause identified
                      </div>
                      <div className="leading-relaxed text-slate-700 dark:text-zinc-300">
                        Unhandled 408 HTTP timeout in Stripe client during peak order surges. Patch with exponential retry prepared.
                      </div>
                    </motion.div>
                  )}

                  {step >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-300 flex items-center justify-between font-mono shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-bold">47/47 unit & integration tests passing</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400/80 font-bold">312ms</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-500 font-medium">
                <span>Memory: 1.2 GB sandbox</span>
                <span className="text-slate-900 dark:text-zinc-200 font-bold">Agent: Online</span>
              </div>
            </div>

            {/* Right Stage: Task Inspector & Diff View */}
            <div className="md:col-span-4 p-4 bg-slate-50/80 dark:bg-[#090b0f] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-zinc-200 uppercase tracking-wider">
                    TASK
                  </span>
                  <Badge
                    variant={step >= 2 ? "success" : "warning"}
                    size="sm"
                    className="font-mono"
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
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                      Fix checkout timeout
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      Add resilient retry logic with jitter to prevent transient payment timeouts.
                    </p>
                  </div>

                  {/* Task Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200 dark:border-white/[0.06] text-xs font-mono">
                    <div className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/[0.04] shadow-xs">
                      <div className="text-slate-500 dark:text-zinc-500 text-[10px] font-bold">RISK</div>
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">LOW</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/[0.04] shadow-xs">
                      <div className="text-slate-500 dark:text-zinc-500 text-[10px] font-bold">FILES</div>
                      <div className="text-slate-900 dark:text-zinc-200 font-bold mt-0.5">3</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white dark:bg-zinc-950 border border-slate-200 dark:border-white/[0.04] shadow-xs">
                      <div className="text-slate-500 dark:text-zinc-500 text-[10px] font-bold">TESTS</div>
                      <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">47/47</div>
                    </div>
                  </div>

                  {/* Diff Snippet Preview */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-zinc-400 font-bold">
                      <span>Proposed Patch</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">+36 / -3</span>
                    </div>
                    <DiffView files={diffFiles} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-2 font-mono">
                <Button
                  variant={step === 1 ? "primary" : "secondary"}
                  size="sm"
                  className="w-full justify-center text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-slate-950 shadow-md"
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
        </motion.div>

        {/* MOBILE COMMAND SURFACE (Beside Desktop) */}
        <div className="xl:col-span-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-mono text-slate-600 dark:text-zinc-400 font-bold flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
              REMOTE COMMAND SURFACE
            </span>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
              SYNCHRONIZED
            </span>
          </div>

          <PhoneFrame statusText="SYNCED" time="10:42">
            <div className="p-4 flex-col justify-between h-full flex font-mono">
              {/* Phone Header */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                  <div>
                    <div className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">Kodium Mobile</div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">PLATESIGHT</div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-[10px] font-mono font-bold">
                    <StatusDot status="healthy" size="sm" pulse={false} />
                    <span>Healthy</span>
                  </div>
                </div>

                {/* Mobile Incident / Task Card */}
                <div className="mt-3.5 p-3 rounded-xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-white/[0.1] shadow-md space-y-2 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold tracking-wider uppercase">
                      {step <= 2 ? "Agent Needs Approval" : "Deployment Live"}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500">Just now</span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    Fix checkout timeout
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-zinc-400 font-mono leading-relaxed">
                    {step === 0 && "Agent is analyzing Stripe 408 latency traces..."}
                    {step >= 1 && step <= 2 && "Patch prepared: 3 files changed. 47/47 passing tests in isolated sandbox."}
                    {step === 3 && "Running continuous integration verification..."}
                    {step === 4 && "Successfully deployed to production. Error rate dropped to 0.00%."}
                  </div>

                  {step >= 1 && step <= 2 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500 dark:text-zinc-400">Risk: <span className="text-emerald-600 dark:text-emerald-400 font-bold">LOW</span></span>
                      <span className="text-slate-500 dark:text-zinc-400">Tests: <span className="text-emerald-600 dark:text-emerald-400 font-bold">47/47</span></span>
                    </div>
                  )}
                </div>

                {/* Secondary Quick Telemetry */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded-lg bg-white dark:bg-zinc-950/60 border border-slate-200 dark:border-white/[0.06] shadow-xs">
                    <div className="text-slate-500 dark:text-zinc-500 font-bold">DEPLOYMENT</div>
                    <div className="text-slate-900 dark:text-zinc-200 font-bold mt-0.5">#a84f2e1</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-zinc-950/60 border border-slate-200 dark:border-white/[0.06] shadow-xs">
                    <div className="text-slate-500 dark:text-zinc-500 font-bold">CONTAINER</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">Sandboxed</div>
                  </div>
                </div>
              </div>

              {/* Phone Action Area */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] space-y-2 font-mono">
                {step <= 1 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center text-xs py-2 font-mono font-bold"
                    onClick={() => setStep(2)}
                  >
                    Review Changes
                  </Button>
                ) : step === 2 ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full justify-center text-xs py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-bold"
                    onClick={() => setStep(3)}
                    icon={<Check className="w-3.5 h-3.5 stroke-[3]" />}
                  >
                    Tap to Approve Fix
                  </Button>
                ) : (
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-center text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                    ✓ Shipped to Production
                  </div>
                )}
                <div className="text-[10px] text-center text-slate-500 dark:text-zinc-500 font-mono">
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
