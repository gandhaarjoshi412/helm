"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  GitBranch,
  Cpu,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  FileCode,
  Sparkles,
  Layers,
  Activity,
  Check,
  X,
  ArrowRight,
  Lock,
  RefreshCw,
  Clock,
  Server,
  Zap,
  Sliders,
  FileDiff,
  Users,
} from "lucide-react";
import { GithubIcon } from "./ui/icons";
import { Button } from "./ui/button";
import { StatusDot } from "./ui/status-dot";
import { DiffView } from "./ui/diff-view";
import { FloatingCodeBackground } from "./ui/floating-code-background";

interface WorkflowStep {
  id: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 0,
    stepNumber: "01",
    title: "Connect Repository",
    subtitle: "Integrate your version control and initialize the project workspace",
    icon: GithubIcon,
    badge: "INITIALIZATION",
  },
  {
    id: 1,
    stepNumber: "02",
    title: "Understand Codebase",
    subtitle: "Kodium scans AST graphs, dependencies, history, and system docs",
    icon: Cpu,
    badge: "PROJECT BRAIN",
  },
  {
    id: 2,
    stepNumber: "03",
    title: "Ask / Create Task",
    subtitle: "Convert developer intent or bug reports into structured engineering tasks",
    icon: Terminal,
    badge: "COMMAND PLANE",
  },
  {
    id: 3,
    stepNumber: "04",
    title: "Investigate Root Cause",
    subtitle: "Agent inspects git commits, checkout services, and deployment logs",
    icon: Activity,
    badge: "LIVE AGENT STREAM",
  },
  {
    id: 4,
    stepNumber: "05",
    title: "Generate Plan",
    subtitle: "Synthesizes multi-file execution plan with risk assessment before editing",
    icon: Layers,
    badge: "PLANNING ENGINE",
  },
  {
    id: 5,
    stepNumber: "06",
    title: "Select Autonomy",
    subtitle: "Configure precise permission boundaries (Assist, Guided, Autonomous)",
    icon: Sliders,
    badge: "SAFETY GATES",
  },
  {
    id: 6,
    stepNumber: "07",
    title: "Execute Code Changes",
    subtitle: "Isolated branch creation and targeted source code patch generation",
    icon: FileCode,
    badge: "EXECUTION",
  },
  {
    id: 7,
    stepNumber: "08",
    title: "Self-Healing Verification",
    subtitle: "Runs unit, integration, and type-checks with automatic patch refinement",
    icon: ShieldCheck,
    badge: "VERIFICATION",
  },
  {
    id: 8,
    stepNumber: "09",
    title: "Review Diff",
    subtitle: "Inspect exact additions and deletions before approving commit",
    icon: FileDiff,
    badge: "PATCH REVIEW",
  },
  {
    id: 9,
    stepNumber: "10",
    title: "Commit & Push",
    subtitle: "Creates clean signed git commit with hash tracking and pushes branch",
    icon: GitBranch,
    badge: "GIT OPERATIONS",
  },
  {
    id: 10,
    stepNumber: "11",
    title: "Deploy to Production",
    subtitle: "Automated CI/CD build, test pass verification, and live release",
    icon: Server,
    badge: "DEPLOYMENT",
  },
  {
    id: 11,
    stepNumber: "12",
    title: "Phone Remote Control",
    subtitle: "Monitor health, receive Pager alerts, and ship patches from your phone",
    icon: Smartphone,
    badge: "REMOTE SHIPS",
  },
];

export function WorkflowWalkthrough() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  // Scroll wheel step advancement
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      // Throttle wheel scroll steps by 400ms to allow smooth reading
      if (now - lastScrollTime.current < 350) return;

      if (e.deltaY > 20) {
        // Scrolling down -> next step
        if (activeStep < WORKFLOW_STEPS.length - 1) {
          lastScrollTime.current = now;
          setActiveStep((prev) => Math.min(WORKFLOW_STEPS.length - 1, prev + 1));
          setIsPlaying(false);
        }
      } else if (e.deltaY < -20) {
        // Scrolling up -> prev step
        if (activeStep > 0) {
          lastScrollTime.current = now;
          setActiveStep((prev) => Math.max(0, prev - 1));
          setIsPlaying(false);
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: true });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [activeStep]);

  // Autoplay timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % WORKFLOW_STEPS.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const current = WORKFLOW_STEPS[activeStep];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative py-20 md:py-32 bg-black text-white overflow-hidden border-t border-b border-white/[0.08]"
    >
      {/* Background Glow Atmospheric Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-white/[0.03] via-zinc-600/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>End-To-End Development Operating System</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white select-none">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">Kodium Works</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Kodium is not a chatbot. It is a persistent command plane that converts developer intent into verified engineering execution.
          </p>
        </div>

        {/* Top Interactive Timeline Stepper Bar */}
        <div className="mb-10 overflow-x-auto pb-4 pt-2 no-scrollbar">
          <div className="flex items-center min-w-max gap-2 px-2">
            {WORKFLOW_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  className={cn(
                    "flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 border shrink-0 cursor-pointer select-none",
                    isActive
                      ? "bg-white text-zinc-950 border-white font-bold shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-[1.03]"
                      : isPast
                      ? "bg-zinc-900/80 text-zinc-300 border-white/20 hover:border-white/40 hover:text-white"
                      : "bg-zinc-950/60 text-zinc-500 border-white/[0.06] hover:border-white/20 hover:text-zinc-300"
                  )}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold border",
                      isActive
                        ? "bg-zinc-950 text-white border-zinc-800"
                        : isPast
                        ? "bg-zinc-800 text-zinc-300 border-white/10"
                        : "bg-zinc-900 text-zinc-600 border-white/5"
                    )}
                  >
                    {step.stepNumber}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Stage Screen Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stage Info & Progression Checklist (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Stage Card */}
            <div className="p-6 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-2xl space-y-5 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/20 font-bold uppercase tracking-wider">
                  {current.badge}
                </span>
                <span className="text-xs text-zinc-500 font-bold">
                  STEP {activeStep + 1} OF {WORKFLOW_STEPS.length}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{current.stepNumber}.</span>
                  <span>{current.title}</span>
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                  {current.subtitle}
                </p>
              </div>

              {/* Progress Flow Arrow Bar */}
              <div className="pt-3 border-t border-white/[0.08] space-y-2">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                  CONTINUOUS WORKFLOW PROGRESSION
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar whitespace-nowrap text-[10px] sm:text-[10.5px] text-zinc-400 font-bold pb-1">
                  <span className={cn("shrink-0", activeStep >= 0 && "text-white font-bold")}>CONNECT</span>
                  <span className="text-zinc-600 shrink-0">→</span>
                  <span className={cn("shrink-0", activeStep >= 1 && "text-white font-bold")}>BRAIN</span>
                  <span className="text-zinc-600 shrink-0">→</span>
                  <span className={cn("shrink-0", activeStep >= 2 && "text-white font-bold")}>TASK</span>
                  <span className="text-zinc-600 shrink-0">→</span>
                  <span className={cn("shrink-0", activeStep >= 4 && "text-white font-bold")}>PLAN</span>
                  <span className="text-zinc-600 shrink-0">→</span>
                  <span className={cn("shrink-0", activeStep >= 6 && "text-white font-bold")}>EXECUTE</span>
                  <span className="text-zinc-600 shrink-0">→</span>
                  <span className={cn("shrink-0", activeStep >= 7 && "text-white font-bold")}>VERIFY</span>
                  <span className="text-zinc-600 shrink-0">→</span>
                  <span className={cn("shrink-0", activeStep >= 10 && "text-white font-bold")}>SHIP</span>
                </div>
              </div>

              {/* Player Controls (Prev, Play/Pause, Next) */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveStep((prev) => Math.max(0, prev - 1));
                      setIsPlaying(false);
                    }}
                    disabled={activeStep === 0}
                    className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    aria-label="Previous Step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs text-white font-bold cursor-pointer transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-zinc-200" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-zinc-200" />
                        <span>AUTOPLAY</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setActiveStep((prev) => Math.min(WORKFLOW_STEPS.length - 1, prev + 1));
                      setIsPlaying(false);
                    }}
                    disabled={activeStep === WORKFLOW_STEPS.length - 1}
                    className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    aria-label="Next Step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] text-zinc-400 font-mono">
                  {Math.round(((activeStep + 1) / WORKFLOW_STEPS.length) * 100)}%
                </div>
              </div>
            </div>

            {/* Quick Stages List */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/[0.06] space-y-1.5 max-h-[320px] overflow-y-auto font-mono text-xs no-scrollbar">
              {WORKFLOW_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer",
                    activeStep === idx
                      ? "bg-white/10 text-white font-bold border border-white/20"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] text-zinc-500 font-bold">{step.stepNumber}</span>
                    <span className="truncate max-w-[180px]">{step.title}</span>
                  </div>
                  {activeStep === idx && <StatusDot status="healthy" size="sm" pulse={false} />}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Realistic Kodium Product Interface (8 cols) */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden min-h-[520px] flex flex-col justify-between relative transition-colors duration-300">
              {/* Product Header Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-zinc-950/90 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-800 border border-white/10" />
                    <div className="w-3 h-3 rounded-full bg-zinc-800 border border-white/10" />
                    <div className="w-3 h-3 rounded-full bg-zinc-800 border border-white/10" />
                  </div>
                  <span className="text-zinc-500">|</span>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-300" />
                    <span>platesight / main</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                  <StatusDot status="healthy" size="sm" />
                  <span>Kodium Agent Live</span>
                </div>
              </div>

              {/* Dynamic Stage Interface Screen */}
              <div className="p-6 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full"
                  >
                    {/* Stage 01: Connect Repository */}
                    {activeStep === 0 && (
                      <div className="space-y-6 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2 font-bold text-white text-sm">
                              <GithubIcon className="w-4 h-4 text-zinc-200" />
                              <span>GitHub Repository Connection</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                              AUTHORIZED
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-white/[0.06] space-y-1">
                              <div className="text-[10px] text-zinc-500 uppercase font-bold">Organization</div>
                              <div className="text-sm font-bold text-white">platesight-inc</div>
                              <div className="text-[11px] text-zinc-400">Public & Private repos synced</div>
                            </div>

                            <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-white/20 shadow-sm space-y-1">
                              <div className="text-[10px] text-zinc-400 uppercase font-bold">Selected Repository</div>
                              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                                <GitBranch className="w-3.5 h-3.5 text-zinc-300" />
                                <span>platesight / main</span>
                              </div>
                              <div className="text-[11px] text-emerald-400 font-bold">Workspace Initialized</div>
                            </div>
                          </div>

                          {/* Progression Pipeline */}
                          <div className="pt-4 border-t border-white/[0.06]">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold mb-3">
                              WORKSPACE INITIALIZATION PIPELINE
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                              <div className="p-2 rounded bg-white text-zinc-950 font-bold">CONNECT</div>
                              <div className="p-2 rounded bg-zinc-900 text-zinc-300 border border-white/10">CLONE</div>
                              <div className="p-2 rounded bg-zinc-900 text-zinc-300 border border-white/10">ANALYZE</div>
                              <div className="p-2 rounded bg-zinc-900 text-zinc-300 border border-white/10">READY</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 02: Understand Codebase */}
                    {activeStep === 1 && (
                      <div className="space-y-5 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2 font-bold text-white text-sm">
                              <Cpu className="w-4 h-4 text-zinc-200" />
                              <span>Project Brain Scan Matrix</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-bold">100% INDEXED</span>
                          </div>

                          <div className="space-y-3">
                            {[
                              { label: "Architecture AST", val: 100 },
                              { label: "Dependencies & Locks", val: 100 },
                              { label: "Git Commit History", val: 100 },
                              { label: "Documentation & OpenAPI", val: 100 },
                              { label: "Test Suites & Mocks", val: 100 },
                            ].map((item, idx) => (
                              <div key={idx} className="space-y-1">
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="text-zinc-300 font-bold">{item.label}</span>
                                  <span className="text-zinc-400">{item.val}%</span>
                                </div>
                                <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden border border-white/5">
                                  <div className="h-full bg-white rounded-full w-full" />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 text-[11px] leading-relaxed">
                            <span className="text-white font-bold">System Understanding Output:</span> Next.js frontend, Node backend, PostgreSQL database, Stripe payments, GitHub Actions CI/CD.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 03: Ask / Create Task */}
                    {activeStep === 2 && (
                      <div className="space-y-5 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
                          <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase pb-2 border-b border-white/[0.06]">
                            <Terminal className="w-4 h-4 text-zinc-300" />
                            <span>Developer Intent Dispatch Plane</span>
                          </div>

                          <div className="p-4 rounded-xl bg-black border border-white/20 shadow-inner space-y-3">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold">Active Query</div>
                            <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                              <span className="text-zinc-500">&gt;</span>
                              <span>“Why is checkout failing after the latest deployment?”</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold">Suggested Quick Intents</div>
                            <div className="flex items-center gap-2 flex-wrap text-[11px]">
                              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300">Add Google Authentication</span>
                              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300">Explain auth matrix</span>
                              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300">Optimize PostgreSQL query</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 04: Investigate Root Cause */}
                    {activeStep === 3 && (
                      <div className="space-y-5 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-3">
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2 font-bold text-white text-sm">
                              <Activity className="w-4 h-4 text-zinc-200" />
                              <span>Live Agent Activity Event Stream</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold animate-pulse">
                              ANALYZING
                            </span>
                          </div>

                          <div className="space-y-2 font-mono text-[11.5px] leading-relaxed">
                            <div className="text-zinc-400 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-zinc-400 animate-ping" />
                              <span>● Understanding developer request...</span>
                            </div>
                            <div className="text-emerald-400 flex items-center gap-2">
                              <Check className="w-3.5 h-3.5" />
                              <span>✓ Analyzing repository AST dependencies</span>
                            </div>
                            <div className="text-emerald-400 flex items-center gap-2">
                              <Check className="w-3.5 h-3.5" />
                              <span>✓ Inspecting checkout service (src/payment.ts)</span>
                            </div>
                            <div className="text-emerald-400 flex items-center gap-2">
                              <Check className="w-3.5 h-3.5" />
                              <span>✓ Checking recent Git commits (commit a84f2e1)</span>
                            </div>
                            <div className="text-emerald-400 flex items-center gap-2">
                              <Check className="w-3.5 h-3.5" />
                              <span>✓ Checking deployment history & Sentry trace</span>
                            </div>
                            <div className="text-emerald-400 flex items-center gap-2">
                              <Check className="w-3.5 h-3.5" />
                              <span>✓ Searching Stripe API v12 timeout docs</span>
                            </div>
                            <div className="text-white font-bold flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                              <Zap className="w-3.5 h-3.5 text-zinc-300" />
                              <span>⚡ ROOT CAUSE FOUND: Payment requests timing out after latest API update.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 05: Generate Plan */}
                    {activeStep === 4 && (
                      <div className="space-y-5 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2 font-bold text-white text-sm">
                              <Layers className="w-4 h-4 text-zinc-200" />
                              <span>Synthesized Implementation Plan</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                              RISK: LOW
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-zinc-900 border border-white/[0.06]">
                              <div className="text-[10px] text-zinc-500 uppercase font-bold">Target Issue</div>
                              <div className="text-xs font-bold text-white">Fix Checkout Timeout & Add Backoff Retry</div>
                            </div>

                            <div className="space-y-2">
                              <div className="text-[10px] text-zinc-500 uppercase font-bold">Proposed Action Steps</div>
                              <div className="space-y-1 text-[11px] text-zinc-300">
                                <div className="p-2 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
                                  <span className="text-zinc-500 font-bold">01</span>
                                  <span>Update timeout handling in <code className="text-white font-bold">src/payment.ts</code></span>
                                </div>
                                <div className="p-2 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
                                  <span className="text-zinc-500 font-bold">02</span>
                                  <span>Add exponential backoff retry mechanism (max retries: 5)</span>
                                </div>
                                <div className="p-2 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
                                  <span className="text-zinc-500 font-bold">03</span>
                                  <span>Add regression test cases in <code className="text-white font-bold">src/payment.test.ts</code></span>
                                </div>
                                <div className="p-2 rounded bg-zinc-900/60 border border-white/5 flex items-center gap-2">
                                  <span className="text-zinc-500 font-bold">04</span>
                                  <span>Execute 60/60 test suite in isolated sandbox</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 06: Select Autonomy & Permissions */}
                    {activeStep === 5 && (
                      <div className="space-y-5 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2 font-bold text-white text-sm">
                              <Sliders className="w-4 h-4 text-zinc-200" />
                              <span>Autonomy Tier & Permission Gate Matrix</span>
                            </div>
                            <span className="text-[10px] px-2.5 py-0.5 rounded bg-white text-zinc-950 font-bold">
                              MODE: GUIDED
                            </span>
                          </div>

                          {/* Mode Selector */}
                          <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                            <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400">ASSIST</div>
                            <div className="p-2.5 rounded-lg bg-white text-zinc-950 font-extrabold shadow-md">GUIDED</div>
                            <div className="p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400">AUTONOMOUS</div>
                          </div>

                          {/* Granular Permissions */}
                          <div className="space-y-1.5 text-[11px]">
                            {[
                              { label: "READ REPOSITORY", allowed: true },
                              { label: "EDIT SOURCE CODE", allowed: true },
                              { label: "RUN TEST SUITE", allowed: true },
                              { label: "CREATE GIT BRANCH", allowed: true },
                              { label: "COMMIT & PUSH", allowed: true },
                              { label: "PRODUCTION DEPLOYMENT", allowed: false, lock: true },
                            ].map((perm, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 rounded bg-zinc-900/60 border border-white/5">
                                <span className="text-zinc-300 font-bold">{perm.label}</span>
                                {perm.allowed ? (
                                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                                    <Check className="w-3.5 h-3.5" /> ALLOWED
                                  </span>
                                ) : (
                                  <span className="text-amber-400 font-bold flex items-center gap-1">
                                    <Lock className="w-3.5 h-3.5" /> APPROVAL REQUIRED
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 07: Execute Code Changes */}
                    {activeStep === 6 && (
                      <div className="space-y-5 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2 font-bold text-white text-sm">
                              <FileCode className="w-4 h-4 text-zinc-200" />
                              <span>Isolated Agent Sandbox Execution</span>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-bold">BRANCH: agent/fix-checkout</span>
                          </div>

                          <div className="space-y-2 text-[11.5px]">
                            <div className="text-zinc-300 flex items-center gap-2">
                              <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
                              <span>Creating branch: <code className="text-white font-bold">agent/fix-checkout</code></span>
                            </div>
                            <div className="p-3 rounded-lg bg-black border border-white/10 space-y-1 font-mono text-zinc-400">
                              <div>Editing <span className="text-white font-bold">src/payment.ts</span>...</div>
                              <div>Editing <span className="text-white font-bold">src/payment.test.ts</span>...</div>
                              <div className="text-emerald-400 font-bold pt-1">✓ Modified 3 files (+47 lines, -12 lines)</div>
                            </div>
                          </div>

                          {/* Progression pipeline */}
                          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                            <div className="p-2 rounded bg-zinc-900 text-zinc-400 border border-white/5">PLAN</div>
                            <div className="p-2 rounded bg-white text-zinc-950 font-bold">CODE</div>
                            <div className="p-2 rounded bg-zinc-900 text-zinc-400 border border-white/5">TEST</div>
                            <div className="p-2 rounded bg-zinc-900 text-zinc-400 border border-white/5">VERIFY</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 08: Self-Healing Verification */}
                    {activeStep === 7 && (
                      <div className="space-y-5 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2 font-bold text-white text-sm">
                              <ShieldCheck className="w-4 h-4 text-emerald-400" />
                              <span>Automated Verification Suite</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                              60/60 PASSED
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div className="p-2.5 rounded bg-zinc-900 border border-white/5 flex items-center justify-between">
                              <span className="text-zinc-300">Unit Tests</span>
                              <span className="text-emerald-400 font-bold">42/42 PASSED</span>
                            </div>
                            <div className="p-2.5 rounded bg-zinc-900 border border-white/5 flex items-center justify-between">
                              <span className="text-zinc-300">Integration</span>
                              <span className="text-emerald-400 font-bold">18/18 PASSED</span>
                            </div>
                            <div className="p-2.5 rounded bg-zinc-900 border border-white/5 flex items-center justify-between">
                              <span className="text-zinc-300">TypeScript</span>
                              <span className="text-emerald-400 font-bold">0 ERRORS</span>
                            </div>
                            <div className="p-2.5 rounded bg-zinc-900 border border-white/5 flex items-center justify-between">
                              <span className="text-zinc-300">Build & Lint</span>
                              <span className="text-emerald-400 font-bold">SUCCESS</span>
                            </div>
                          </div>

                          {/* Self healing notification callout */}
                          <div className="p-3 rounded-lg bg-zinc-900/90 border border-white/10 text-[11px] space-y-1">
                            <div className="flex items-center gap-2 text-zinc-300 font-bold">
                              <RefreshCw className="w-3.5 h-3.5 text-zinc-300" />
                              <span>Self-Healing Loop: Initial test failed → Patch auto-refined → 60/60 Passed</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 09: Review Diff */}
                    {activeStep === 8 && (
                      <div className="space-y-4 font-mono text-xs">
                        <DiffView
                          files={[
                            {
                              filename: "src/payment.ts",
                              additions: 47,
                              deletions: 12,
                              lines: [
                                { type: "context", oldLine: 14, newLine: 14, content: "export async function processCharge(amount: number) {" },
                                { type: "delete", oldLine: 15, content: "-   const res = await stripe.charges.create({ amount });" },
                                { type: "add", newLine: 15, content: "+   const res = await backoff(() => stripe.charges.create({" },
                                { type: "add", newLine: 16, content: "+     amount, currency: 'usd'" },
                                { type: "add", newLine: 17, content: "+   }), { retries: 5, delay: 200 });" },
                                { type: "context", oldLine: 16, newLine: 18, content: "    return res.status === 'succeeded';" },
                              ],
                            },
                          ]}
                        />
                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-400 hover:text-white font-bold cursor-pointer">
                            REJECT
                          </button>
                          <button className="px-4 py-2 rounded-lg bg-white text-zinc-950 text-xs font-bold shadow-md cursor-pointer">
                            APPROVE CHANGES
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Stage 10: Commit & Push */}
                    {activeStep === 9 && (
                      <div className="space-y-5 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2 font-bold text-white text-sm">
                              <GitBranch className="w-4 h-4 text-zinc-200" />
                              <span>Git Commit & Branch Push</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-bold">HASH: a84f2e1</span>
                          </div>

                          <div className="p-3.5 rounded-lg bg-black border border-white/10 space-y-2">
                            <div className="text-[10px] text-zinc-500 uppercase font-bold">Commit Message</div>
                            <div className="text-sm font-bold text-white">Fix checkout timeout handling and add backoff retry</div>
                            <div className="text-[11px] text-zinc-400 flex items-center gap-2 pt-1 border-t border-white/5">
                              <span>Branch: <code className="text-white">agent/fix-checkout</code></span>
                              <span>•</span>
                              <span>Author: Kodium Agent</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-emerald-400 text-[11px] font-bold">
                            <div className="flex items-center gap-1.5">
                              <Check className="w-4 h-4" /> Commit created
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Check className="w-4 h-4" /> Branch pushed to origin
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 11: Deploy to Production */}
                    {activeStep === 10 && (
                      <div className="space-y-5 font-mono text-xs">
                        <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2 font-bold text-white text-sm">
                              <Server className="w-4 h-4 text-zinc-200" />
                              <span>Production CI/CD Deployment</span>
                            </div>
                            <span className="text-[10px] px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                              <StatusDot status="healthy" size="sm" />
                              LIVE RELEASE
                            </span>
                          </div>

                          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                            <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">BUILD ✓</div>
                            <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">TESTS ✓</div>
                            <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">CI ✓</div>
                            <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">DEPLOYED ✓</div>
                          </div>

                          <div className="p-4 rounded-xl bg-black border border-white/20 text-center space-y-1">
                            <div className="text-emerald-400 font-bold text-sm">● PRODUCTION LIVE</div>
                            <div className="text-xs text-zinc-400">Deployment successful for commit <code className="text-white">a84f2e1</code></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stage 12: Phone Remote Control */}
                    {activeStep === 11 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center font-mono text-xs">
                        {/* Android Phone Screen Simulation */}
                        <div className="mx-auto max-w-[260px] w-full p-4 rounded-[2rem] bg-black border-4 border-zinc-800 shadow-2xl space-y-3 relative overflow-hidden">
                          {/* Android Punch Hole Camera */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-3 h-3 rounded-full bg-[#050608] border border-white/20 z-20 flex items-center justify-center">
                            <div className="w-1 h-1 rounded-full bg-zinc-800" />
                          </div>

                          {/* Android Status Bar */}
                          <div className="flex items-center justify-between text-[10px] text-zinc-400 pb-2 border-b border-white/10 pt-1">
                            <span className="font-bold text-white">10:42 PM</span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-bold text-zinc-300">5G</span>
                              <span className="text-emerald-400 font-bold">Android Kodium</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-zinc-900 border border-rose-500/30 text-[11px] space-y-2">
                            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Production Issue</span>
                            </div>
                            <div className="text-zinc-300">Checkout API error rate: <strong className="text-white">18%</strong></div>
                            <div className="pt-2 text-emerald-400 font-bold text-[10px]">
                              COMMIT ✓ PUSH ✓ CI ✓ DEPLOY ✓
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/20 text-center text-xs font-bold text-white">
                            ● PRODUCTION HEALTHY
                          </div>

                          {/* Android Navigation Pill Bar */}
                          <div className="pt-1 flex justify-center">
                            <div className="w-20 h-[3px] bg-white/60 rounded-full" />
                          </div>
                        </div>

                        {/* Story Summary Card */}
                        <div className="space-y-4">
                          <div className="text-sm font-bold text-white">
                            “I fixed and shipped a production issue without opening my laptop.”
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                            Receive real-time telemetry alerts on your phone, inspect agent diagnostic proposals, approve verified patches, and deploy hotfixes remotely from anywhere.
                          </p>
                          <div className="p-3 rounded-lg bg-zinc-950 border border-white/10 text-[11px] space-y-1 font-mono text-zinc-300">
                            <div>DESKTOP → KODIUM → AGENT & PHONE</div>
                            <div className="text-emerald-400 font-bold">→ PRODUCTION LIVE</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Status Bar */}
              <div className="px-5 py-3 border-t border-white/[0.08] bg-zinc-950/90 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Kodium Command Plane Active</span>
                </div>
                <div>Continuous Verification Engine</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
