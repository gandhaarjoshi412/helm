"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Plus,
  ArrowLeft,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Lock,
  Menu,
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
  onToggleMobileSidebar?: () => void;
}

export function WorkspaceHeader({
  projects,
  selectedProject,
  onSelectProject,
  onOpenNewProjectModal,
  onOpenAuthModal,
  isStreaming,
  onToggleMobileSidebar,
}: WorkspaceHeaderProps) {
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeTopTab, setActiveTopTab] = useState("systems");
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
    <header className="h-14 border-b border-white/10 bg-[#000000]/95 backdrop-blur-xl px-2.5 sm:px-6 flex items-center justify-between z-40 sticky top-0 font-sans select-none">
      {/* Left: Brand, Mobile Sidebar Toggle & Header Tabs */}
      <div className="flex items-center gap-2 sm:gap-4">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden text-zinc-400 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-white/10 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Home</span>
        </Link>

        <div className="h-4 w-px bg-white/10 hidden sm:block" />

        <div className="flex items-center gap-1.5">
          <span className="font-bold text-xs sm:text-sm tracking-tight text-white font-sans">
            KODIUM <span className="text-zinc-400 font-normal hidden sm:inline">/ HELM CONSOLE</span>
          </span>
        </div>

        {/* Top Navigation Tabs */}
        <div className="hidden lg:flex gap-1 pl-3">
          {[
            { id: "systems", label: "Systems" },
            { id: "pipeline", label: "Pipeline" },
            { id: "security", label: "Security" },
            { id: "telemetry", label: "Telemetry" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTopTab(tab.id)}
              className={cn(
                "text-xs font-medium px-3 py-1 rounded-lg transition-all cursor-pointer",
                activeTopTab === tab.id
                  ? "text-white bg-white/10 border border-white/20 font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 sm:gap-3 text-xs">
        {/* API Status Badge */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/10">
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              backendHealthy === false ? "bg-rose-500" : "bg-emerald-400 animate-pulse"
            )}
          />
          <span
            className={cn(
              "text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider",
              backendHealthy === false ? "text-rose-400" : "text-emerald-400"
            )}
          >
            {backendHealthy === false ? "OFFLINE" : "ONLINE"}
          </span>
        </div>

        {/* Project Selector */}
        <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 bg-white/5 rounded-lg border border-white/10 text-zinc-300 max-w-[130px] sm:max-w-none">
          <FolderGit2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <select
            className="bg-transparent text-[11px] sm:text-xs font-mono text-white outline-none cursor-pointer pr-1 truncate w-full"
            value={selectedProject?.id || ""}
            onChange={(e) => {
              const found = projects.find((p) => p.id === e.target.value);
              if (found) onSelectProject(found);
            }}
          >
            {projects.length === 0 ? (
              <option value="" disabled className="bg-black text-white">
                No Projects
              </option>
            ) : (
              projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-black text-white">
                  {p.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Primary Deploy Agent White Button */}
        <button
          onClick={onOpenNewProjectModal}
          className="bg-white text-black font-bold text-xs px-2.5 sm:px-3.5 py-1.5 rounded-lg hover:bg-zinc-200 transition-all cursor-pointer flex items-center gap-1 shadow-[0_0_15px_rgba(255,255,255,0.25)] border border-white shrink-0"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">Deploy Agent</span>
          <span className="sm:hidden">Deploy</span>
        </button>

        {/* User Profile */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:border-white transition-colors cursor-pointer"
              title={getDisplayName()}
            >
              <User className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-[#090a0f] border border-white/15 p-2 shadow-2xl z-50 text-xs font-mono space-y-1"
                >
                  <div className="px-2.5 py-2 border-b border-white/10">
                    <p className="text-white font-bold truncate">{getDisplayName()}</p>
                    <p className="text-zinc-400 text-[10px] truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={async () => {
                      setUserDropdownOpen(false);
                      await signOut();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : null}
      </div>
    </header>
  );
}
