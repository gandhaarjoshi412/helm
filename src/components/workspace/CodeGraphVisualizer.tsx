"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Search,
  Code2,
  FileCode,
  Network,
  ChevronRight,
  RefreshCw,
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
    <div className="bg-[#0c0d14] border border-white/10 rounded-xl overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-[#11121c] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-mono font-semibold text-zinc-200">
            AST CODE GRAPH & SYMBOLS
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab("symbols")}
            className={cn(
              "text-[10px] font-mono px-2 py-0.5 rounded transition-colors",
              activeTab === "symbols" ? "bg-purple-600 text-white" : "text-zinc-400"
            )}
          >
            Symbols ({symbols.length})
          </button>
          <button
            onClick={() => setActiveTab("nodes")}
            className={cn(
              "text-[10px] font-mono px-2 py-0.5 rounded transition-colors",
              activeTab === "nodes" ? "bg-purple-600 text-white" : "text-zinc-400"
            )}
          >
            Graph Nodes ({graph?.nodes?.length || 0})
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-white/5 bg-[#0e0f17]">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter symbols, classes, functions..."
            className="w-full bg-[#141522] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-xs">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-zinc-500 gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
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
                className="p-2.5 rounded-lg bg-[#141520] border border-white/5 hover:border-purple-500/30 transition-all flex items-start justify-between"
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-purple-300">{sym.name}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {sym.kind}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500">
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
                className="p-2 rounded bg-[#141520] border border-white/5 text-[11px] flex items-center justify-between"
              >
                <span className="text-zinc-300">{node.label}</span>
                <span className="text-[9px] text-zinc-500 uppercase">{node.type}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
