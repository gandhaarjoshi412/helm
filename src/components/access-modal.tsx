"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  GitBranch,
  Check,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetState = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStep("form");
    setEmail("");
  };

  const closeModal = () => {
    resetState();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;

    setStep("connecting");
    timeoutRef.current = setTimeout(() => {
      setStep("success");
      timeoutRef.current = null;
    }, 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeModal}
      role="presentation"
    >
      <div
        className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-[#0e1117] border border-white/[0.12] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] text-zinc-200"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-modal-title"
        aria-describedby="access-modal-description"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
          aria-label="Close access dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 pr-8">
          <HelmMark size={32} glow />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                id="access-modal-title"
                className="font-semibold text-white tracking-tight text-base"
              >
                HELM Command Access
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                PROTOTYPE
              </span>
            </div>
            <p id="access-modal-description" className="text-xs text-zinc-400">
              Preview the onboarding flow for the HELM command-center concept.
            </p>
          </div>
        </div>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="access-email"
                className="block text-xs font-mono text-zinc-300 mb-1.5"
              >
                ENGINEER WORK EMAIL
              </label>
              <input
                id="access-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="developer@company.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-white/[0.1] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="access-repository"
                className="block text-xs font-mono text-zinc-300 mb-1.5"
              >
                PRIMARY REPOSITORY URL
              </label>
              <div className="relative">
                <GitBranch className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                <input
                  id="access-repository"
                  type="text"
                  value={repo}
                  onChange={(event) => setRepo(event.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-zinc-950/80 border border-white/[0.1] text-sm text-white font-mono placeholder-zinc-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="access-team-size"
                  className="block text-xs font-mono text-zinc-300 mb-1.5"
                >
                  ENGINEERING TEAM
                </label>
                <select
                  id="access-team-size"
                  value={teamSize}
                  onChange={(event) => setTeamSize(event.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-950/80 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-sky-400 font-mono"
                >
                  <option value="solo">Solo Engineer</option>
                  <option value="1-5">2 - 5 Engineers</option>
                  <option value="6-20">6 - 20 Engineers</option>
                  <option value="20+">20+ Engineers</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="access-stack"
                  className="block text-xs font-mono text-zinc-300 mb-1.5"
                >
                  PRIMARY STACK
                </label>
                <input
                  id="access-stack"
                  type="text"
                  defaultValue="TypeScript / Node / Next.js"
                  className="w-full px-3 py-2.5 rounded-lg bg-zinc-950/80 border border-white/[0.1] text-xs text-white focus:outline-none focus:border-sky-400 font-mono"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900/50 border border-white/[0.06] flex items-start gap-2.5 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Prototype flow only. No repository is connected and no credentials
                are transmitted by this frontend.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button type="button" variant="ghost" size="sm" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Preview Access Flow
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
              <p className="text-sm font-semibold text-white">
                Running prototype onboarding preview...
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Simulating repository and workspace validation
              </p>
            </div>
            <div className="w-full bg-zinc-950 rounded-lg p-3 border border-white/[0.08] text-[11px] text-zinc-400 text-left space-y-1">
              <div className="flex items-center gap-2">
                <StatusDot status="active" size="sm" />
                <span>Previewing repository architecture step...</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <StatusDot status="healthy" size="sm" pulse={false} />
                <span>Demo workspace boundary prepared</span>
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
              <h4 className="text-base font-semibold text-white">
                Prototype Access Flow Complete
              </h4>
              <p className="text-xs text-zinc-400 max-w-sm mt-1.5">
                Preview completed for{" "}
                <span className="text-sky-300 font-mono">{email}</span>. No
                request was sent and no account was created.
              </p>
            </div>

            <Button
              variant="secondary"
              size="md"
              onClick={closeModal}
              className="w-full"
            >
              Return to Command Center
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
