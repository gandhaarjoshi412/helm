"use client";

import React, { useState, useEffect } from "react";
import { Search, Command, ArrowRight, Shield, Cpu, Smartphone, Users, GitMerge, FileCode, Lock, LogOut } from "lucide-react";
import { KodiumMark } from "./ui/kodium-mark";
import { useAuth } from "@/context/auth-context";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAccessModal: () => void;
  onOpenAuthModal: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenAccessModal, onOpenAuthModal }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "auth",
      title: user ? `Signed in as ${user.email} (Sign Out)` : "Sign In / Sign Up with Supabase Auth",
      action: () => {
        onClose();
        if (user) {
          signOut();
        } else {
          onOpenAuthModal();
        }
      },
      icon: user ? <LogOut className="w-4 h-4 text-rose-400" /> : <Lock className="w-4 h-4 text-emerald-400" />,
      category: "Authentication",
    },
    {
      id: "demo",
      title: "Jump to Live Command Center Demo",
      section: "#demo",
      icon: <Command className="w-4 h-4 text-zinc-200" />,
      category: "Navigation",
    },
    {
      id: "brain",
      title: "Inspect Project Brain & Code Graph",
      section: "#brain",
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      category: "Intelligence",
    },
    {
      id: "agent",
      title: "View Agent Execution & Streaming Terminal",
      section: "#agent",
      icon: <FileCode className="w-4 h-4 text-zinc-200" />,
      category: "Execution",
    },
    {
      id: "autonomy",
      title: "Configure Autonomy & Boundary Matrix",
      section: "#autonomy",
      icon: <Shield className="w-4 h-4 text-amber-400" />,
      category: "Permissions",
    },
    {
      id: "mobile",
      title: "Explore Mobile Command & Voice Control",
      section: "#mobile",
      icon: <Smartphone className="w-4 h-4 text-purple-400" />,
      category: "Mobile",
    },
    {
      id: "ship",
      title: "Review 'Ship Without Laptop' Story",
      section: "#ship",
      icon: <GitMerge className="w-4 h-4 text-rose-400" />,
      category: "Workflow",
    },
    {
      id: "collab",
      title: "Team & Agent Unified Collaboration",
      section: "#collaboration",
      icon: <Users className="w-4 h-4 text-zinc-200" />,
      category: "Team",
    },
    {
      id: "access",
      title: "Request Kodium Command Access",
      action: () => {
        onClose();
        onOpenAccessModal();
      },
      icon: <KodiumMark size={16} />,
      category: "Access",
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: typeof actions[0]) => {
    if (item.action) {
      item.action();
    } else if (item.section) {
      onClose();
      const el = document.querySelector(item.section);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl bg-[#0e1117] border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08] bg-zinc-950/60">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, sign in, or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-zinc-500">
              No matching command found
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs hover:bg-white/[0.06] hover:text-white transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-zinc-900 border border-white/[0.06] group-hover:border-white/20">
                    {item.icon}
                  </div>
                  <span className="font-medium text-zinc-200 group-hover:text-white">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Bottom Status bar */}
        <div className="px-4 py-2 border-t border-white/[0.06] bg-zinc-950/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Kodium Command Dispatch</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
