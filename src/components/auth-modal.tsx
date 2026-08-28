"use client";

import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Eye,
  EyeOff,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";
import { KodiumMark } from "./ui/kodium-mark";
import { Button } from "./ui/button";
import { GithubIcon } from "./ui/icons";
import { useAuth } from "@/context/auth-context";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "signin" | "signup" | "magiclink";
  isProtected?: boolean;
  reason?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  initialTab = "signin",
  isProtected = false,
  reason,
}: AuthModalProps) {
  const [tab, setTab] = useState<"signin" | "signup" | "magiclink">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { signInWithEmail, signUpWithEmail, signInWithMagicLink, signInWithGithub } = useAuth();

  if (!isOpen) return null;

  const handleCloseModal = () => {
    handleReset();
    if (isProtected) {
      if (typeof window !== "undefined") {
        window.location.assign("/");
      }
    } else {
      onClose();
    }
  };

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
          setSuccessMsg("Account created! Welcome to Kodium Command.");
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
          setSuccessMsg("Magic link sent! Check your inbox.");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/88 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Outer Window Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-4xl rounded-3xl bg-[#08090d] border border-white/[0.14] shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_80px_rgba(168,85,247,0.12)] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md"
          aria-label="Close authentication modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT PANEL - Gradient Visual & Highlight Steps */}
        <div className="relative hidden md:flex md:w-1/2 bg-gradient-to-br from-[#1c0b36] via-[#090b14] to-[#041a14] p-8 lg:p-10 flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.08]">
          {/* Animated Background Gradient Blobs */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-600/30 rounded-full blur-[100px] pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />

          {/* Top Brand & Status */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-white/[0.08] border border-white/15 shadow-xl backdrop-blur-xl">
                <KodiumMark size={32} glow />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-wider text-white text-lg font-sans">
                  KODIUM
                </span>
                <span className="text-[10px] font-mono text-purple-300 font-semibold tracking-widest uppercase">
                  AI Developer Suite
                </span>
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-sans leading-tight">
              Get Started with Us
            </h2>
            <p className="text-xs lg:text-sm text-zinc-400 mt-2 font-mono leading-relaxed">
              Complete these steps to activate your autonomous AI coding workspace.
            </p>
          </div>

          {/* Middle Step Progress Indicators */}
          <div className="relative z-10 my-8 space-y-3 font-mono">
            {/* Step 1 */}
            <motion.div
              whileHover={{ x: 3 }}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white text-zinc-950 border border-white shadow-[0_10px_30px_rgba(255,255,255,0.25)] transition-all"
            >
              <div className="w-7 h-7 rounded-xl bg-zinc-950 text-white flex items-center justify-center font-bold text-xs">
                1
              </div>
              <div className="flex flex-col text-xs">
                <span className="font-bold tracking-wide">
                  {tab === "signup"
                    ? "Sign up your account"
                    : tab === "signin"
                    ? "Sign in to account"
                    : "Magic Link access"}
                </span>
                <span className="text-[10.5px] text-zinc-700 font-medium">
                  {tab === "signup"
                    ? "Create developer credentials"
                    : tab === "signin"
                    ? "Authenticate developer credentials"
                    : "Passwordless email sign-in"}
                </span>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ x: 3 }}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.05] text-zinc-200 border border-white/10 hover:bg-white/[0.08] transition-all"
            >
              <div className="w-7 h-7 rounded-xl bg-white/10 text-zinc-300 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div className="flex flex-col text-xs">
                <span className="font-bold tracking-wide">Connect CLI & Workspace</span>
                <span className="text-[10.5px] text-zinc-400">
                  Sync code repository & agents
                </span>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ x: 3 }}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.05] text-zinc-300 border border-white/10 hover:bg-white/[0.08] transition-all"
            >
              <div className="w-7 h-7 rounded-xl bg-white/10 text-zinc-400 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div className="flex flex-col text-xs">
                <span className="font-bold tracking-wide text-zinc-300">
                  Deploy AI Command Center
                </span>
                <span className="text-[10.5px] text-zinc-500">
                  Autonomous Pair Programming
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Security Footer */}
          <div className="relative z-10 flex items-center gap-2.5 text-[11px] text-zinc-400 font-mono pt-4 border-t border-white/[0.08]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Supabase 256-bit End-to-End Encryption</span>
          </div>
        </div>

        {/* RIGHT PANEL - Clean Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-[#08090d]">
          {/* Reason Popup Notice */}
          {reason && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-300 font-mono font-bold animate-pulse">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{reason}</span>
            </div>
          )}

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                {tab === "signin"
                  ? "Sign In to Kodium"
                  : tab === "signup"
                  ? "Sign Up Account"
                  : "Magic Link Access"}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              {tab === "signup"
                ? "Enter your personal data to create your account."
                : "Welcome back! Access your developer command center."}
            </p>
          </div>

          {/* GitHub OAuth Button */}
          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/20 hover:border-white/40 text-white font-medium text-xs sm:text-sm font-mono transition-all shadow-lg cursor-pointer disabled:opacity-50 group"
          >
            <GithubIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Continue with GitHub</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <span className="relative px-3 bg-[#08090d] text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">
              or
            </span>
          </div>

          {/* Auth Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950/90 rounded-2xl border border-white/[0.08] mb-5">
            <button
              type="button"
              onClick={() => handleTabChange("signin")}
              className={`py-2 text-xs font-mono rounded-xl transition-all cursor-pointer font-bold ${
                tab === "signin"
                  ? "bg-white text-zinc-950 shadow-md font-semibold"
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
                  ? "bg-white text-zinc-950 shadow-md font-semibold"
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
                  ? "bg-white text-zinc-950 shadow-md font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Magic Link
            </button>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start justify-between gap-3 text-xs text-rose-300"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
              {errorMsg.includes("already registered") && tab === "signup" && (
                <button
                  type="button"
                  onClick={() => handleTabChange("signin")}
                  className="shrink-0 text-[11px] font-mono font-bold text-white underline hover:text-emerald-400 cursor-pointer ml-2"
                >
                  Sign In
                </button>
              )}
            </motion.div>
          )}

          {/* Success Alert */}
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-300"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === "signup" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-mono text-zinc-300 font-bold tracking-wider">
                    USERNAME
                  </label>
                  <span className="text-[10px] font-mono text-zinc-400">
                    Letters, numbers & _ only
                  </span>
                </div>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\s+/g, "");
                      setFullName(val);
                    }}
                    placeholder="alex_dev"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.12] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono shadow-inner"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-zinc-300 mb-1 font-bold tracking-wider">
                {tab === "signup" ? "EMAIL ADDRESS" : "USERNAME OR EMAIL ADDRESS"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type={tab === "signup" ? "email" : "text"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    tab === "signup" ? "developer@kodium.ai" : "username or developer@kodium.ai"
                  }
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.12] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono shadow-inner"
                />
              </div>
            </div>

            {tab !== "magiclink" && (
              <div>
                <label className="block text-[11px] font-mono text-zinc-300 mb-1 font-bold tracking-wider">
                  PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-950 border border-white/[0.12] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="w-full py-3 text-xs font-mono font-bold justify-center rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-lg"
                iconRight={
                  loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )
                }
              >
                {loading
                  ? "Processing..."
                  : tab === "signin"
                  ? "Sign In"
                  : tab === "signup"
                  ? "Sign Up"
                  : "Send Magic Link"}
              </Button>
            </div>
          </form>

          {/* Footer toggle text */}
          <div className="mt-4 text-center font-mono text-[11px] text-zinc-400">
            {tab === "signup" ? (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabChange("signin")}
                  className="text-white hover:underline font-bold cursor-pointer"
                >
                  Log In
                </button>
              </p>
            ) : (
              <p>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => handleTabChange("signup")}
                  className="text-white hover:underline font-bold cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
