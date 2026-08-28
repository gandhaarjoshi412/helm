"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Search, Code2, Box, Cpu, FileCode, RefreshCw } from "lucide-react";
import { SymbolInfo } from "@/types/api";
import { fetchSymbols, syncProjectCodebase } from "@/lib/api";
import { CodeGraphVisualizer } from "../CodeGraphVisualizer";

interface CodebaseIndexViewProps {
  projectId?: string;
  projectName?: string;
}

export function CodebaseIndexView({ projectId, projectName }: CodebaseIndexViewProps) {
  const [symbols, setSymbols] = useState<SymbolInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<"symbols" | "graph">("symbols");

  const loadData = async () => {
    if (!projectId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetchSymbols(projectId);
      setSymbols(data);
    } catch (err) {
      console.error("Failed to load symbols:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  const handleReindex = async () => {
    if (!projectId || isSyncing) return;
    setIsSyncing(true);
    try {
      await syncProjectCodebase(projectId);
      await loadData();
    } catch (err) {
      console.error("Re-index error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredSymbols = symbols.filter((s) => {
    const q = searchQuery.toLowerCase();
    const fileName = s.file || s.file_path || "";
    const sig = s.signature || "";
    return s.name.toLowerCase().includes(q) || fileName.toLowerCase().includes(q) || sig.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4 font-sans max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#07080c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold text-white tracking-tight">Codebase AST Index</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
              {symbols.length} Symbols
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {projectName ? `Semantic Code Graph & Symbol Table for "${projectName}"` : "Select a workspace project"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab("symbols")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                activeTab === "symbols" ? "bg-white text-black shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              Symbols ({symbols.length})
            </button>
            <button
              onClick={() => setActiveTab("graph")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                activeTab === "graph" ? "bg-white text-black shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              AST Graph
            </button>
          </div>

          <button
            onClick={handleReindex}
            disabled={isSyncing || !projectId}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-cyan-400" : ""}`} />
            <span>{isSyncing ? "Re-Indexing..." : "Re-Index"}</span>
          </button>
        </div>
      </div>

      {activeTab === "graph" ? (
        <div className="p-4 rounded-2xl bg-[#07080c] border border-white/10 min-h-[500px]">
          <CodeGraphVisualizer projectId={projectId || null} />
        </div>
      ) : (
        <div className="space-y-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search functions, classes, types, methods, or file paths..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#07080c] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-500 outline-none focus:border-white/30 font-mono transition-colors"
            />
          </div>

          {/* Symbols List */}
          {isLoading ? (
            <div className="py-20 text-center text-zinc-500 font-mono text-xs animate-pulse">
              Parsing AST and loading codebase symbols...
            </div>
          ) : filteredSymbols.length === 0 ? (
            <div className="p-8 text-center bg-[#07080c] border border-white/10 rounded-2xl text-zinc-400 font-mono text-xs">
              {searchQuery ? `No symbols matching "${searchQuery}"` : "No symbols indexed in this workspace."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredSymbols.map((s, idx) => (
                <div
                  key={`${s.file}-${s.name}-${idx}`}
                  className="p-3.5 rounded-xl bg-[#07080c] border border-white/10 hover:border-white/20 transition-all font-mono space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                        {s.type === "class" ? (
                          <Box className="w-3.5 h-3.5" />
                        ) : s.type === "function" || s.type === "method" ? (
                          <Code2 className="w-3.5 h-3.5" />
                        ) : (
                          <Cpu className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span className="font-bold text-white text-xs">{s.name}</span>
                    </div>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 font-bold">
                      {s.type}
                    </span>
                  </div>

                  {s.signature && (
                    <div className="text-[11px] text-zinc-300 truncate bg-black/60 px-2 py-1 rounded border border-white/5 font-mono">
                      {s.signature}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                    <span className="truncate max-w-[240px] text-zinc-400">{s.file}</span>
                    {s.lines && <span>Lines {s.lines}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
