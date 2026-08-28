"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Mic,
  MicOff,
  AlertTriangle,
  FileCheck2,
  Rocket,
  ArrowRight,
  Check,
  Activity,
  ShieldCheck,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { StatusDot } from "./ui/status-dot";
import { PhoneFrame } from "./ui/phone-frame";
import { DiffView } from "./ui/diff-view";
import { cn } from "@/lib/utils";

export function MobileCommandCenter() {
  const [activeScreen, setActiveScreen] = useState<number>(0);
  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const [voiceQuery, setVoiceQuery] = useState<string>("“Investigate the checkout payment issue.”");

  const screens = [
    {
      id: "incident",
      title: "01. Incident Triage",
      label: "Production Alert",
      desc: "Instant agent triage with root-cause identification and confidence scoring.",
    },
    {
      id: "review",
      title: "02. Sandbox Diff Review",
      label: "Review Patch",
      desc: "Inspect multi-file AST diffs and passing test suites directly on mobile.",
    },
    {
      id: "deploy",
      title: "03. Ship & Health Telemetry",
      label: "Verified Release",
      desc: "One-tap approval pushes to production and verifies telemetry stability.",
    },
  ];

  const toggleVoice = () => {
    setIsVoiceListening(!isVoiceListening);
    if (!isVoiceListening) {
      setTimeout(() => {
        setActiveScreen(0);
      }, 1200);
    }
  };

  return (
    <section id="mobile" className="relative py-28 bg-black dark:bg-black light:bg-slate-50 border-t border-white/[0.06] dark:border-white/[0.06] light:border-slate-200 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-gradient-to-tr from-white/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Voice Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <Badge variant="mono" size="sm" className="font-mono">
                SOVEREIGN MOBILE CONTROL
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Your development environment follows you.
              </h2>
              <p className="text-lg text-zinc-300 dark:text-zinc-300 light:text-slate-800 font-medium">
                Your workstation runs the heavy work. Your phone keeps you in control.
              </p>
              <p className="text-sm text-zinc-400 dark:text-zinc-400 light:text-slate-600 leading-relaxed font-mono">
                You don’t have to stay glued to your desk. When an alert fires or a feature needs reviewing, your phone acts as a high-fidelity command and control surface. Direct agents, review verified patches, and approve production deploys from anywhere.
              </p>
            </div>

            {/* Screen Navigation Tabs */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Switch mobile command views:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {screens.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => setActiveScreen(idx)}
                    className={cn(
                      "p-3 rounded-xl border text-left font-mono transition-all duration-200 cursor-pointer",
                      activeScreen === idx
                        ? "bg-zinc-900 border-white/60 shadow-[0_0_16px_rgba(255,255,255,0.18)] text-white"
                        : "bg-zinc-950/60 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-white/10"
                    )}
                  >
                    <div className="text-[11px] font-bold uppercase text-white">
                      {sc.title}
                    </div>
                    <div className="text-xs font-semibold text-zinc-200 mt-1">
                      {sc.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Voice Command Module */}
            <div className="p-5 rounded-2xl bg-[#0e1117] border border-white/[0.08] space-y-3 font-mono">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Volume2 className="w-4 h-4 text-zinc-200" />
                  <span>NATURAL VOICE COMMAND DISPATCH</span>
                </div>
                <span className="text-[10px] text-zinc-500">Press to test voice trigger</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleVoice}
                  className={cn(
                    "p-3 rounded-xl border transition-all duration-200 flex items-center justify-center cursor-pointer",
                    isVoiceListening
                      ? "bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse"
                      : "bg-zinc-900 border-white/10 text-white hover:bg-zinc-800"
                  )}
                  title="Toggle voice input"
                >
                  {isVoiceListening ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <div className="flex-1 p-2.5 rounded-lg bg-zinc-950/90 border border-white/[0.06] text-xs">
                  {isVoiceListening ? (
                    <div className="flex items-center gap-2 text-zinc-200">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>Listening... {voiceQuery}</span>
                    </div>
                  ) : (
                    <div className="text-zinc-400">
                      Click mic to speak: <span className="text-zinc-200">{voiceQuery}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-zinc-500">
                Speech audio transforms into structured agent goal & sandbox execution in &lt;200ms.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Phone Screen Simulation (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneFrame statusText="KODIUM OS">
              {/* Screen 0: Incident Triage */}
              {activeScreen === 0 && (
                <div className="p-4 flex flex-col justify-between h-full font-mono text-xs">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <span className="text-rose-400 font-bold text-[11px] flex items-center gap-1.5 uppercase">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Production Incident
                      </span>
                      <span className="text-zinc-500 text-[10px]">Just now</span>
                    </div>

                    {/* Alert summary card */}
                    <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1.5">
                      <div className="text-white font-bold text-xs">
                        Checkout API 18% Error Rate Spike
                      </div>
                      <div className="text-zinc-400 text-[11px]">
                        Service: <span className="text-zinc-200">payments.checkout</span>
                      </div>
                    </div>

                    {/* Agent Diagnosis */}
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/[0.08] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-[10.5px] uppercase font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-white" />
                          Agent Diagnosis
                        </span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          91% Confidence
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                        Stripe API 408 timeout regression. Missing exponential backoff wrapper in charges.create.
                      </p>
                      <div className="pt-2 border-t border-white/[0.06] text-[10.5px] text-zinc-400">
                        Recommended: <strong className="text-white">Apply patch & run test suite</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08]">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-center text-xs"
                      onClick={() => setActiveScreen(1)}
                    >
                      Review Prepared Patch (3 files)
                    </Button>
                  </div>
                </div>
              )}

              {/* Screen 1: Changes Ready & Diff Review */}
              {activeScreen === 1 && (
                <div className="p-4 flex flex-col justify-between h-full font-mono text-xs">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <span className="text-white font-bold text-[11px] flex items-center gap-1.5 uppercase">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        Changes Ready
                      </span>
                      <span className="text-emerald-400 text-[10px]">47/47 Passing</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/[0.06] text-[11px] space-y-1">
                      <div className="text-zinc-300 font-bold">src/services/payment.ts</div>
                      <div className="text-[10px] text-emerald-400">+14 lines added (Exponential Backoff)</div>
                      <div className="text-[10px] text-rose-400">-3 lines removed</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/[0.06] text-[11px] space-y-1">
                      <div className="text-zinc-300 font-bold">tests/payment.test.ts</div>
                      <div className="text-[10px] text-emerald-400">+22 lines (Timeout assertion suite)</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Sandbox verification passed with zero regression.</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08] space-y-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-center text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold"
                      onClick={() => setActiveScreen(2)}
                      icon={<Check className="w-3.5 h-3.5 stroke-[3]" />}
                    >
                      Tap to Approve Release
                    </Button>
                    <button
                      onClick={() => setActiveScreen(0)}
                      className="w-full text-center text-[10px] text-zinc-400 hover:text-zinc-300 py-1"
                    >
                      ← Back to Diagnosis
                    </button>
                  </div>
                </div>
              )}

              {/* Screen 2: Deployment Live */}
              {activeScreen === 2 && (
                <div className="p-4 flex flex-col justify-between h-full font-mono text-xs">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5 uppercase">
                        <Rocket className="w-3.5 h-3.5" />
                        Deployment Live
                      </span>
                      <StatusDot status="healthy" size="sm" />
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-900 border border-emerald-500/30 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div className="font-bold text-white text-sm">
                        Production Healthy
                      </div>
                      <p className="text-[11px] text-zinc-400 font-sans">
                        Patch committed and pushed. Error rate dropped from 18% to 0.00%.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-white/[0.06] text-[11px] space-y-1">
                      <div className="flex justify-between text-zinc-400">
                        <span>Commit:</span>
                        <span className="text-white font-mono font-bold">#a84f2e1</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Cluster:</span>
                        <span className="text-zinc-200">prod-us-east-1</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08]">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full justify-center text-xs"
                      onClick={() => setActiveScreen(0)}
                    >
                      Reset Scenario Simulator
                    </Button>
                  </div>
                </div>
              )}
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
