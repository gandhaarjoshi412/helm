"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Command,
  ArrowRight,
  Shield,
  Cpu,
  Smartphone,
  Users,
  GitMerge,
  FileCode,
} from "lucide-react";
import { HelmMark } from "./ui/helm-mark";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAccessModal: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  section?: string;
  action?: () => void;
  icon: React.ReactNode;
  category: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenAccessModal,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = useMemo<PaletteAction[]>(
    () => [
      {
        id: "demo",
        title: "Jump to Command Center Demo",
        section: "#demo",
        icon: <Command className="w-4 h-4 text-sky-400" />,
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
        title: "View Execution Workflow",
        section: "#agent",
        icon: <FileCode className="w-4 h-4 text-sky-400" />,
        category: "Execution",
      },
      {
        id: "autonomy",
        title: "Inspect Autonomy & Permission Matrix",
        section: "#autonomy",
        icon: <Shield className="w-4 h-4 text-amber-400" />,
        category: "Permissions",
      },
      {
        id: "mobile",
        title: "Explore Mobile Command Center",
        section: "#mobile",
        icon: <Smartphone className="w-4 h-4 text-purple-400" />,
        category: "Mobile",
      },
      {
        id: "ship",
        title: "Review Ship Without Laptop Story",
        section: "#ship",
        icon: <GitMerge className="w-4 h-4 text-rose-400" />,
        category: "Workflow",
      },
      {
        id: "collab",
        title: "Explore Shared Collaboration State",
        section: "#collaboration",
        icon: <Users className="w-4 h-4 text-cyan-400" />,
        category: "Team",
      },
      {
        id: "access",
        title: "Request HELM Prototype Access",
        action: () => {
          onClose();
          onOpenAccessModal();
        },
        icon: <HelmMark size={16} />,
        category: "Access",
      },
    ],
    [onClose, onOpenAccessModal]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return actions;
    return actions.filter(
      (action) =>
        action.title.toLowerCase().includes(normalized) ||
        action.category.toLowerCase().includes(normalized)
    );
  }, [actions, query]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setSelectedIndex(0);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (selectedIndex >= filtered.length) setSelectedIndex(0);
  }, [filtered.length, selectedIndex]);

  if (!isOpen) return null;

  const handleSelect = (item: PaletteAction) => {
    if (item.action) {
      item.action();
      return;
    }

    const section = item.section;
    if (section) {
      onClose();
      requestAnimationFrame(() => {
        document.querySelector(section)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (filtered.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((index) => (index + 1) % filtered.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex(
        (index) => (index - 1 + filtered.length) % filtered.length
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div
        className="w-full max-w-xl rounded-xl bg-[#0e1117] border border-white/[0.12] shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden text-zinc-200"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="HELM command palette"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08] bg-zinc-950/60">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search sections or actions..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
            aria-label="Search command palette"
          />
          <kbd className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-white/10">
            ESC
          </kbd>
        </div>

        <div
          className="max-h-80 overflow-y-auto p-2 space-y-1"
          role="listbox"
          aria-label="Command results"
        >
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-zinc-500">
              No matching command found
            </div>
          ) : (
            filtered.map((item, index) => {
              const selected = selectedIndex === index;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors group cursor-pointer",
                    selected
                      ? "bg-white/[0.08] text-white"
                      : "hover:bg-white/[0.06] hover:text-white"
                  )}
                  role="option"
                  aria-selected={selected}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded-md bg-zinc-900 border border-white/[0.06] group-hover:border-white/20 shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-medium text-zinc-200 group-hover:text-white truncate">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="hidden sm:inline text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-sky-400 transition-colors" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 border-t border-white/[0.06] bg-zinc-950/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>HELM Navigation</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
