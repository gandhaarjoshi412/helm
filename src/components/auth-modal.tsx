"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { KodiumMark } from "./ui/kodium-mark";
import { Button } from "./ui/button";
import { GithubIcon } from "./ui/icons";
import { useAuth } from "@/context/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "signin" | "signup" | "magiclink";
}

export function AuthModal({ isOpen, onClose, initialTab = "signin" }: AuthModalProps) {
  const [tab, setTab] = useState<"signin" | "signup" | "magiclink">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { signInWithEmail, signUpWithEmail, signInWithMagicLink, signInWithGithub, isDemoMode } = useAuth();

  if (!isOpen) return null;

  const handleReset = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setEmail("");
    setPassword("");
    setFullName("");
  };

  const handleTabChange = (newTab: "signin" | "signup" | "magiclink") => {
    handleReset();
    setTab(newTab);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (tab === "signin") {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg("Successfully authenticated with Kodium Command!");
          setTimeout(() => {
            onClose();
            handleReset();
          }, 1000);
        }
      } else if (tab === "signup") {
        const { error } = await signUpWithEmail(email, password, fullName);
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg(
            isDemoMode
              ? "Account created & signed in!"
              : "Account created! Please check your email to verify your account."
          );
          setTimeout(() => {
            onClose();
            handleReset();
          }, 1200);
        }
      } else if (tab === "magiclink") {
        const { error } = await signInWithMagicLink(email);
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg(
            isDemoMode
              ? "Magic Link verified! Authenticated."
              : "Magic link sent to your email inbox!"
          );
          setTimeout(() => {
            onClose();
            handleReset();
          }, 1200);
        }
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const { error } = await signInWithGithub();
      if (error) {
        setErrorMsg(error.message);
      } else {
        setSuccessMsg("GitHub Authorization Granted!");
        setTimeout(() => {
          onClose();
          handleReset();
        }, 1000);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "GitHub OAuth failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#0c0e13] border border-white/[0.12] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)] text-zinc-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-white/10 blur-3xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={() => {
            handleReset();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <KodiumMark size={32} glow />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-base">Kodium Identity</span>
              {isDemoMode && (
                <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  DEMO MODE
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              Supabase Auth for AI Developer Command Center
            </p>
          </div>
        </div>

        {/* OAuth Social Provider */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white font-medium text-xs transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.08]" />
          </div>
          <span className="relative px-3 bg-[#0c0e13] text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Or with email
          </span>
        </div>

        {/* Auth Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-950/80 rounded-xl border border-white/[0.08] mb-5">
          <button
            type="button"
            onClick={() => handleTabChange("signin")}
            className={`py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              tab === "signin"
                ? "bg-white/10 text-white font-bold shadow-xs border border-white/10"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("signup")}
            className={`py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              tab === "signup"
                ? "bg-white/10 text-white font-bold shadow-xs border border-white/10"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("magiclink")}
            className={`py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
              tab === "magiclink"
                ? "bg-white/10 text-white font-bold shadow-xs border border-white/10"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Magic Link
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === "signup" && (
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                FULL NAME
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-950/90 border border-white/[0.1] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 mb-1">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@kodium.ai"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-950/90 border border-white/[0.1] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono"
              />
            </div>
          </div>

          {tab !== "magiclink" && (
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-950/90 border border-white/[0.1] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono"
                />
              </div>
            </div>
          )}

          {/* Security Assurance */}
          <div className="p-2.5 rounded-lg bg-zinc-950/50 border border-white/[0.05] flex items-center gap-2 text-[11px] text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Encrypted Supabase JWT Session Token</span>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                handleReset();
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              iconRight={
                loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )
              }
            >
              {loading
                ? "Authenticating..."
                : tab === "signin"
                ? "Sign In"
                : tab === "signup"
                ? "Create Account"
                : "Send Magic Link"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
