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

interface WorkspaceSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function WorkspaceSidebar({
  activeTab,
  onSelectTab,
  mobileOpen = false,
  onCloseMobile,
}: WorkspaceSidebarProps) {
  const navItems = [
    { id: "agents", label: "Active Agents", icon: Bot, badge: "LIVE" },
    { id: "codebase", label: "Codebase Index", icon: Terminal },
    { id: "permissions", label: "Permissions", icon: Lock },
    { id: "memory", label: "Memory Bank", icon: Database },
    { id: "vector", label: "Vector Store", icon: Network },
    { id: "logs", label: "System Logs", icon: FileText },
  ];

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
                <h2 className="font-bold text-sm text-white tracking-tight">THE BRAIN</h2>
                <span className="text-[9px] text-zinc-400 font-mono tracking-wider">V.2.4-ALPHA</span>
              </div>
            </div>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="md:hidden text-zinc-400 hover:text-white p-1 rounded-lg bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button className="w-full bg-white/5 border border-white/20 text-white font-mono text-[11px] font-semibold py-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Core</span>
          </button>
        </div>

        {/* Navigation List */}
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
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all cursor-pointer font-sans text-[11px] uppercase tracking-wide",
                  isActive
                    ? "bg-white/10 text-white border-l-2 border-white font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-bold">
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
          <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-zinc-400 font-semibold">
            <HardDrive className="w-3.5 h-3.5 text-white" />
            <span>Resource Usage</span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[9px] font-mono mb-1">
                <span className="text-rose-300">Vector Store</span>
                <span className="text-zinc-400">42.8 GB / 50 GB</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-rose-400 w-[85%] shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[9px] font-mono mb-1">
                <span className="text-white">Memory Bank</span>
                <span className="text-zinc-400">12.1 GB / 16 GB</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[75%] shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
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
