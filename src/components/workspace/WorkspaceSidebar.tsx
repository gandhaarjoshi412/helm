"use client";

import React from "react";
import {
  Cpu,
  RefreshCw,
  Bot,
  Terminal,
  Lock,
  Database,
  Network,
  FileText,
  Settings,
  HelpCircle,
  HardDrive,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { useSystemMetrics } from "@/hooks/use-system-metrics";

interface WorkspaceSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  projectId?: string;
}

export function WorkspaceSidebar({
  activeTab,
  onSelectTab,
  mobileOpen = false,
  onCloseMobile,
  projectId,
}: WorkspaceSidebarProps) {
  const { metrics, isLoading } = useSystemMetrics(projectId);

  const navItems = [
    { id: "agents", label: "Active Agents", icon: Bot, badge: "LIVE" },
    { id: "codebase", label: "Codebase Index", icon: Terminal },
    { id: "permissions", label: "Permissions", icon: Lock },
    { id: "memory", label: "Memory Bank", icon: Database },
    { id: "vector", label: "Vector Store", icon: Network },
    { id: "logs", label: "System Logs", icon: FileText },
  ];

  const vectorStore = metrics?.vector_store || {
    used: "64.0 KB",
    total: "500 MB",
    percentage: 1.2,
  };

  const memoryBank = metrics?.memory_bank || {
    used: "114.1 MB",
    total: "1.0 GB",
    percentage: 11.1,
  };

  const sidebarContent = (
    <aside className="w-64 md:w-56 bg-[#050508]/98 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between shrink-0 font-sans text-xs select-none h-full">
      {/* Header: THE BRAIN & Sync Core */}
      <div>
        <div className="p-4 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center glow-primary">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white tracking-wide text-xs">
                  THE BRAIN
                </h2>
                <span className="text-[10px] text-zinc-500 font-mono">
                  v0.1.0-alpha
                </span>
              </div>
            </div>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <RefreshCw className="w-3 h-3 animate-spin duration-1000" />
              <span>SYNC CORE</span>
            </div>
            <span className="text-zinc-500">CONNECTED</span>
          </div>
        </div>

        {/* Middle Nav Items */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all text-left group cursor-pointer",
                  isActive
                    ? "bg-white text-black font-bold shadow-md shadow-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive
                        ? "text-black stroke-[2.5]"
                        : "text-zinc-500 group-hover:text-white"
                    )}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-tight",
                      isActive
                        ? "bg-black text-emerald-400"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Resource Usage & System Links */}
      <div className="border-t border-white/10 p-3.5 space-y-4">
        {/* Resource Usage Widget */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-zinc-400 font-semibold font-mono">
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-white" />
              <span>Resource Usage</span>
            </div>
            <span className="text-[8px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[9px] font-mono mb-1">
                <span className="text-rose-300">Vector Store</span>
                <span className="text-zinc-400 font-bold">
                  {vectorStore.used} / {vectorStore.total}
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(vectorStore.percentage, 2)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[9px] font-mono mb-1">
                <span className="text-white">Memory Bank</span>
                <span className="text-zinc-400 font-bold">
                  {memoryBank.used} / {memoryBank.total}
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(memoryBank.percentage, 3)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Support Links */}
        <div className="pt-2 border-t border-white/10 space-y-1">
          <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-[10px] uppercase">
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-[10px] uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support</span>
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <div className="hidden md:flex h-full">{sidebarContent}</div>

      {/* Mobile Sliding Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed top-0 bottom-0 left-0 z-50 md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
