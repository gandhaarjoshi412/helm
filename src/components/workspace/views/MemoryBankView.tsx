"use client";

import React, { useState, useEffect } from "react";
import { Database, Plus, Sparkles, Tag, Clock, BookOpen } from "lucide-react";
import { fetchProjectMemory } from "@/lib/api";

interface MemoryBankViewProps {
  projectId?: string;
  projectName?: string;
}

export function MemoryBankView({ projectId, projectName }: MemoryBankViewProps) {
  const [memories, setMemories] = useState<Array<{ id: string; category: string; title: string; content: string; created_at: string; tags?: string[] }>>([]);
  const [isLoading, setIsLoading] = useState(Boolean(projectId));

  useEffect(() => {
    if (!projectId) return;
    let active = true;
    fetchProjectMemory(projectId)
      .then((data) => {
        if (active) setMemories(data.memories || []);
      })
      .catch((err) => {
        console.error("Failed to load memories:", err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [projectId]);

  return (
    <div className="space-y-6 font-sans max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#07080c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold text-white tracking-tight">Persistent Memory Bank</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
              {memories.length} Decisions
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {projectName ? `Learned architectural patterns, decisions, and context for "${projectName}"` : "Autonomous memory buffer"}
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-zinc-500 font-mono text-xs animate-pulse">
          Loading memory snapshots and architectural knowledge...
        </div>
      ) : memories.length === 0 ? (
        <div className="p-12 text-center bg-[#07080c] border border-white/10 rounded-2xl text-zinc-400 font-mono text-xs">
          No memories recorded for this project yet. As you run agent tasks, architectural patterns will automatically be recorded here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memories.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-[#07080c] border border-white/10 hover:border-white/20 transition-all font-mono space-y-3 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-emerald-400 border border-emerald-500/20">
                    {m.category}
                  </span>
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white font-sans">{m.title}</h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{m.content}</p>
              </div>

              {m.tags && m.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/5">
                  {m.tags.map((t: string) => (
                    <span
                      key={t}
                      className="text-[9px] px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-400 border border-white/5"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
