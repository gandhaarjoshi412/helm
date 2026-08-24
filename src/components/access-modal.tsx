"use client";

import React, { useState } from "react";
import { X, GitBranch, Check, Terminal, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { HelmMark } from "./ui/helm-mark";
import { Button } from "./ui/button";
import { StatusDot } from "./ui/status-dot";

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccessModal({ isOpen, onClose }: AccessModalProps) {
  const [step, setStep] = useState<"form" | "connecting" | "success">("form");
  const [email, setEmail] = useState("");
  const [repo, setRepo] = useState("github.com/my-team/core-platform");
  const [teamSize, setTeamSize] = useState("1-5");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep("connecting");
    setTimeout(() => {
      setStep("success");
    }, 1400);
  };

  const handleReset = () => {
    setStep("form");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#0e1117] border border-white/[0.12] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <HelmMark size={32} glow />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-tight text-base">HELM Command Access</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                PROTOTYPE ACCESS
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Connect your repository to preview persistent agent control.
            </p>
          </div>
        </div>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                ENGINEER WORK EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-white/[0.1] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                PRIMARY REPOSITORY URL
              </label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-white/[0.1] text-sm text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  ENGINEERING TEAM
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-950/80 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-sky-400 font-mono"
                >
                  <option value="solo">Solo Engineer</option>
                  <option value="1-5">2 - 5 Engineers</option>
                  <option value="6-20">6 - 20 Engineers</option>
                  <option value="20+">20+ Engineers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-300 mb-1.5">
                  PRIMARY STACK
                </label>
                <input
                  type="text"
                  defaultValue="TypeScript / Node / Next.js"
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-950/80 border border-white/[0.1] text-xs text-white focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Sandbox Security Guarantee */}
            <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/[0.06] flex items-start gap-2.5 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Zero raw code training. Isolated ephemeral containers. Autonomy permissions strictly enforced by your local client.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md" iconRight={<ArrowRight className="w-4 h-4" />}>
                Request Access
              </Button>
            </div>
          </form>
        )}

        {step === "connecting" && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 font-mono">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
              <HelmMark size={20} className="absolute inset-0 m-auto" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Initializing Project Brain Indexer...</p>
              <p className="text-xs text-zinc-400 mt-1">Simulating repository tree & sandbox validation</p>
            </div>
            <div className="w-full bg-zinc-950 rounded-lg p-3 border border-white/[0.08] text-[11px] text-zinc-400 text-left space-y-1">
              <div className="flex items-center gap-2">
                <StatusDot status="active" size="sm" />
                <span>Checking repository architecture metadata...</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <StatusDot status="healthy" size="sm" pulse={false} />
                <span>Sandbox isolation boundaries verified</span>
              </div>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-base font-semibold text-white">Command Center Access Requested</h4>
              <p className="text-xs text-zinc-400 max-w-sm mt-1.5">
                We have queued <span className="text-sky-300 font-mono">{email}</span> for priority onboarding to the HELM Command Center preview for iQOO Hackathon 2026.
              </p>
            </div>

            <div className="w-full p-3 rounded-lg bg-zinc-950/90 border border-white/[0.08] text-xs font-mono text-zinc-300 flex items-center justify-between">
              <span className="text-zinc-500">CLI KEY READY:</span>
              <span className="text-sky-400">helm_key_iqoo_9942a</span>
            </div>

            <Button variant="secondary" size="md" onClick={handleReset} className="w-full">
              Return to Command Center
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
