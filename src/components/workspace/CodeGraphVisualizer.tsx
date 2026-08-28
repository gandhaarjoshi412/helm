"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Network,
  Loader2,
} from "lucide-react";
import { CodeGraphResponse, SymbolInfo } from "@/types/api";
import { fetchCodeGraph, fetchSymbols } from "@/lib/api";
import { cn } from "@/lib/utils";

interface CodeGraphVisualizerProps {
  projectId: string | null;
}

export function CodeGraphVisualizer({ projectId }: CodeGraphVisualizerProps) {
  const [graph, setGraph] = useState<CodeGraphResponse | null>(null);
  const [symbols, setSymbols] = useState<SymbolInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"symbols" | "nodes">("symbols");

  useEffect(() => {
    if (!projectId) return;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const [graphData, symbolData] = await Promise.all([
          fetchCodeGraph(projectId).catch(() => null),
          fetchSymbols(projectId).catch(() => []),
        ]);
        if (graphData) setGraph(graphData);
        setSymbols(symbolData);
      } catch (err) {
        console.error("Failed to load code graph:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [projectId]);

  const filteredSymbols = symbols.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.file_path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#050508] border border-white/10 rounded-xl overflow-hidden flex flex-col h-[520px] font-mono">
      {/* Header */}
      <div className="px-3.5 py-2.5 border-b border-white/10 bg-[#08090f] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-white" />
          <span className="text-xs font-mono font-semibold text-white">
            AST CODE GRAPH &amp; SYMBOLS
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-[#000000] p-0.5 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveTab("symbols")}
            className={cn(
              "text-[10px] font-mono font-bold px-2 py-0.5 rounded-md transition-all cursor-pointer",
              activeTab === "symbols" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
            )}
          >
            Symbols ({symbols.length})
          </button>
          <button
            onClick={() => setActiveTab("nodes")}
            className={cn(
              "text-[10px] font-mono font-bold px-2 py-0.5 rounded-md transition-all cursor-pointer",
              activeTab === "nodes" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
            )}
          >
            Graph Nodes ({graph?.nodes?.length || 0})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-white/10 bg-[#050508]">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter symbols, classes, functions..."
            className="w-full bg-[#000000] border border-white/15 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-xs bg-[#050508] terminal-scroll">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-zinc-500 gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Parsing repository AST...</span>
          </div>
        ) : activeTab === "symbols" ? (
          filteredSymbols.length === 0 ? (
            <div className="text-center text-zinc-600 py-10 text-xs">
              No symbols found matching query.
            </div>
          ) : (
            filteredSymbols.map((sym) => (
              <div
                key={sym.id || `${sym.file_path}:${sym.name}`}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex items-start justify-between"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{sym.name}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-white/10 text-white border border-white/20 font-bold">
                      {sym.kind}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400">
                    {sym.file_path}:{sym.line_start}
                  </span>
                </div>
              </div>
            ))
          )
        ) : (
          <div className="space-y-1.5">
            {graph?.nodes?.map((node) => (
              <div
                key={node.id}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-[11px] flex items-center justify-between"
              >
                <span className="text-zinc-200 font-semibold">{node.label}</span>
                <span className="text-[9px] text-zinc-400 uppercase font-bold">{node.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
