"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Activity,
  Plus,
  ArrowLeft,
  RefreshCw,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Database,
  ExternalLink,
  User,
  LogOut,
  ChevronDown,
  Lock,
} from "lucide-react";
import { Project } from "@/types/api";
import { checkBackendHealth } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WorkspaceHeaderProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (p: Project) => void;
  onOpenNewProjectModal: () => void;
  onOpenAuthModal: () => void;
  isStreaming?: boolean;
}

export function WorkspaceHeader({
  projects,
  selectedProject,
  onSelectProject,
  onOpenNewProjectModal,
  onOpenAuthModal,
  isStreaming,
}: WorkspaceHeaderProps) {
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        await checkBackendHealth();
        if (mounted) setBackendHealthy(true);
      } catch {
        if (mounted) setBackendHealthy(false);
      }
    };
    check();
    const interval = setInterval(check, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const getDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.full_name || user.email?.split("@")[0] || "Developer";
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#0c0d12]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Left: Brand & Back to Home */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 rounded-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        <div className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs">
            H
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">
            KODIUM <span className="text-xs font-mono font-normal text-indigo-400">/ HELM CONSOLE</span>
          </span>
        </div>
      </div>

      {/* Center: Active Project Selector */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-[#12131a] border border-white/10 rounded-lg px-3 py-1.5">
          <FolderGit2 className="w-4 h-4 text-indigo-400" />
          <select
            className="bg-transparent text-xs font-mono text-zinc-200 outline-none cursor-pointer pr-2"
            value={selectedProject?.id || ""}
            onChange={(e) => {
              const found = projects.find((p) => p.id === e.target.value);
              if (found) onSelectProject(found);
            }}
          >
            {projects.length === 0 ? (
              <option value="" disabled>
                No Projects Configured
              </option>
            ) : (
              projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#12131a] text-zinc-200">
                  {p.name} ({p.default_branch || "main"})
                </option>
              ))
            )}
          </select>
        </div>

        <button
          onClick={onOpenNewProjectModal}
          className="flex items-center gap-1.5 text-xs font-mono bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          title="Connect new repository"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Repo</span>
        </button>
      </div>

      {/* Right: Engine Status & Auth User State */}
      <div className="flex items-center gap-3">
        {isStreaming && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>STREAMING</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
          <Database className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-400 hidden md:inline">API:</span>
          {backendHealthy === null ? (
            <span className="text-zinc-500">Checking...</span>
          ) : backendHealthy ? (
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Connected
            </span>
          ) : (
            <span className="text-rose-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              Offline
            </span>
          )}
        </div>

        {/* User Auth Dropdown in Console Header */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
            >
              <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[11px]">
                {getDisplayName().charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[100px] truncate hidden sm:inline">{getDisplayName()}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0e1117] border border-white/15 p-2 shadow-2xl z-50 text-xs font-mono space-y-1 backdrop-blur-2xl"
                >
                  <div className="px-2.5 py-2 border-b border-white/[0.08]">
                    <p className="text-white font-bold truncate">{getDisplayName()}</p>
                    <p className="text-zinc-400 text-[10px] truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={async () => {
                      setUserDropdownOpen(false);
                      await signOut();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/[0.08] text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}
