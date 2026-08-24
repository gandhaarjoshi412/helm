"use client";

import React, { useState } from "react";
import {
  Bell,
  Smartphone,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Rocket,
  Check,
  ArrowRight,
  Clock,
  Terminal,
  Activity,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { StatusDot } from "./ui/status-dot";
import { cn } from "@/lib/utils";

export function ShipSection() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const storySteps = [
    {
      id: 0,
      time: "10:42 PM",
      actor: "Pager Alert",
      headline: "Production Alert Triggered",
      desc: "Developer is away at dinner. An automated PagerDuty/Sentry alert fires: 18% latency spike on checkout API.",
      dialogue: null,
      telemetry: "Alert: checkout.charge 408 spike (Error rate: 18.2%)",
    },
    {
      id: 1,
      time: "10:43 PM",
      actor: "Developer Query",
      headline: "Developer Opens Kodium Mobile",
      desc: "From their phone, the developer asks Kodium what changed in natural language.",
      dialogue: {
        speaker: "Developer",
        text: "“What changed in the last deploy?”",
      },
      telemetry: "Querying Project Brain & AST commit log...",
    },
    {
      id: 2,
      time: "10:43 PM",
      actor: "Kodium Intelligence",
      headline: "Autonomous Diagnosis in 8 Seconds",
      desc: "Kodium pinpoints the exact regression in the payment client.",
      dialogue: {
        speaker: "Kodium",
        text: "“The issue began 9 minutes after deployment #a84f2e1. I found an unhandled Stripe 408 timeout regression in payment.ts without backoff.”",
      },
      telemetry: "Root cause verified: 91% confidence score",
    },
    {
      id: 3,
      time: "10:44 PM",
      actor: "Developer Command",
      headline: "Delegation with Clear Boundary",
      desc: "The developer issues the order with explicit permission boundaries.",
      dialogue: {
        speaker: "Developer",
        text: "“Fix it. Don't deploy until I approve.”",
      },
      telemetry: "Boundary: GUIDED (Deploy locked pending manual sign-off)",
    },
    {
      id: 4,
      time: "10:45 PM",
      actor: "Agent Sandbox",
      headline: "Patch Prepared & 47 Tests Verified",
      desc: "Agent writes exponential retry logic and verifies 47/47 tests in an isolated sandbox.",
      dialogue: {
        speaker: "Kodium",
        text: "“Patch ready: 3 files changed. 47/47 tests passing in sandbox. Ready for your review.”",
      },
      telemetry: "Tests: 47 passed in 312ms • Zero regression",
    },
    {
      id: 5,
      time: "10:46 PM",
      actor: "One-Tap Approve",
      headline: "One-Tap Production Approval",
      desc: "The developer taps Approve. Kodium commits, pushes branch, executes CI pipeline, and monitors canary health.",
      dialogue: {
        speaker: "Kodium",
        text: "“Deployed to production. Latency back to baseline. Error rate: 0.00%.”",
      },
      telemetry: "Release LIVE • Status: PRODUCTION HEALTHY",
    },
  ];

  return (
    <section id="ship" className="relative py-28 bg-black border-t border-white/[0.06] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="success" size="sm" className="font-mono">
            THE EMOTIONAL PAYOFF
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Ship software without sitting at your desk.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-mono">
            A production emergency shouldn’t force you to rush back to your desk or open your laptop in a taxi.
          </p>
        </div>

        {/* Story Scrubber Timeline Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {storySteps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              className={cn(
                "p-3 rounded-xl border text-left font-mono transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[80px]",
                currentStep === idx
                  ? "bg-zinc-900 border-emerald-400/60 shadow-[0_0_16px_rgba(16,185,129,0.15)] text-white"
                  : "bg-zinc-950/60 border-white/[0.06] text-zinc-400 hover:text-zinc-200"
              )}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">{s.time}</span>
                <span className="text-zinc-400">0{idx + 1}</span>
              </div>
              <div className="text-xs font-semibold text-zinc-200 truncate mt-1">
                {s.actor}
              </div>
            </button>
          ))}
        </div>

        {/* Active Stage Narrative Showcase Card */}
        <div className="rounded-3xl bg-black border border-white/[0.1] p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Narrative Context (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {storySteps[currentStep].time}
                </span>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  {storySteps[currentStep].actor}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {storySteps[currentStep].headline}
              </h3>

              <p className="text-base text-zinc-300 leading-relaxed font-sans">
                {storySteps[currentStep].desc}
              </p>

              {/* Dialogue Bubble if present */}
              {storySteps[currentStep].dialogue && (
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/[0.08] space-y-2">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                    {storySteps[currentStep].dialogue?.speaker}
                  </div>
                  <blockquote className="text-base font-mono text-white italic">
                    {storySteps[currentStep].dialogue?.text}
                  </blockquote>
                </div>
              )}

              {/* Telemetry snippet */}
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{storySteps[currentStep].telemetry}</span>
              </div>

              {/* Step progression buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 5))}
                  className="text-xs font-mono"
                >
                  Previous
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep((prev) => (prev < 5 ? prev + 1 : 0))}
                  className="text-xs font-mono"
                  iconRight={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  {currentStep === 5 ? "Replay Incident Flow" : "Next Milestone"}
                </Button>
              </div>
            </div>

            {/* Right: Emotional Climax Highlight Box (5 cols) */}
            <div className="lg:col-span-5 p-8 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-white/[0.12] flex flex-col justify-between min-h-[320px] text-center">
              <div className="space-y-4 my-auto">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    THE PROMISE OF KODIUM
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    The developer never opened their laptop.
                  </h4>
                </div>

                <p className="text-xs text-zinc-400 font-mono max-w-xs mx-auto leading-relaxed">
                  From initial triage, to sandbox verification, to production release in 4 minutes flat.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
                True remote developer sovereignty
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
