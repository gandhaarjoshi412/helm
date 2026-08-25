"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
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

  const { signInWithEmail, signUpWithEmail, signInWithMagicLink, signInWithGithub } = useAuth();

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
          setSuccessMsg("Account created successfully! Welcome to Kodium.");
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
          setSuccessMsg("Magic link sent! Please check your email inbox.");
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
        setSuccessMsg("Redirecting to GitHub OAuth...");
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "GitHub OAuth failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg sm:max-w-xl rounded-3xl bg-[#0a0c10] border border-white/[0.14] p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.15)] text-zinc-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Radial Ambient Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-purple-500/20 via-emerald-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={() => {
            handleReset();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          aria-label="Close authentication modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 shadow-inner">
            <KodiumMark size={36} glow />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white tracking-tight text-xl font-sans">Kodium Identity</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                SECURE
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono">
              AI Developer Command Center • Supabase Auth
            </p>
          </div>
        </div>

        {/* OAuth Social Provider */}
        <div className="mb-5">
          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-white/40 text-white font-medium text-sm transition-all shadow-md cursor-pointer disabled:opacity-50 group"
          >
            <GithubIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.1]" />
          </div>
          <span className="relative px-4 bg-[#0a0c10] text-[10.5px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">
            Or with Email
          </span>
        </div>

        {/* Auth Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-zinc-950/90 rounded-2xl border border-white/[0.1] mb-6">
          <button
            type="button"
            onClick={() => handleTabChange("signin")}
            className={`py-2 text-xs font-mono rounded-xl transition-all cursor-pointer font-bold ${
              tab === "signin"
                ? "bg-white/15 text-white shadow-md border border-white/20"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("signup")}
            className={`py-2 text-xs font-mono rounded-xl transition-all cursor-pointer font-bold ${
              tab === "signup"
                ? "bg-white/15 text-white shadow-md border border-white/20"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => handleTabChange("magiclink")}
            className={`py-2 text-xs font-mono rounded-xl transition-all cursor-pointer font-bold ${
              tab === "magiclink"
                ? "bg-white/15 text-white shadow-md border border-white/20"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Magic Link
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "signup" && (
            <div>
              <label className="block text-[11px] font-mono text-zinc-300 mb-1.5 font-bold tracking-wider">
                YOUR NAME / USERNAME (e.g. Prado)
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Prado"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono shadow-inner"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono text-zinc-300 mb-1.5 font-bold tracking-wider">
              {tab === "signup" ? "EMAIL ADDRESS" : "USERNAME OR EMAIL ADDRESS"}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type={tab === "signup" ? "email" : "text"}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tab === "signup" ? "developer@kodium.ai" : "prado or developer@kodium.ai"}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono shadow-inner"
              />
            </div>
          </div>

          {tab !== "magiclink" && (
            <div>
              <label className="block text-[11px] font-mono text-zinc-300 mb-1.5 font-bold tracking-wider">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950/90 border border-white/[0.12] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono shadow-inner"
                />
              </div>
            </div>
          )}

          {/* Security Assurance */}
          <div className="p-3 rounded-xl bg-zinc-950/70 border border-white/[0.08] flex items-center gap-2.5 text-[11px] text-zinc-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Secured with Supabase 256-bit End-to-End Encryption</span>
          </div>

          {/* Submit Action */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
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
              className="px-6 py-2.5 text-xs font-mono font-bold"
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
