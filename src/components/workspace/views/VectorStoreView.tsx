"use client";

import React, { useState, useEffect } from "react";
import { Network, Search, Layers, Cpu, Database, Sparkles, FileCode2 } from "lucide-react";
import { fetchVectorStoreInfo } from "@/lib/api";

interface VectorStoreViewProps {
  projectId?: string;
  projectName?: string;
}

interface VectorChunk {
  id: string;
  file: string;
  tokens: number;
  dimension: number;
  similarity_score: number;
}

interface VectorStoreData {
  embedding_model?: string;
  dimensions?: number;
  total_indexed_files?: number;
  total_vector_chunks?: number;
  sample_chunks?: VectorChunk[];
}

export function VectorStoreView({ projectId, projectName }: VectorStoreViewProps) {
  const [vectorData, setVectorData] = useState<VectorStoreData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean(projectId));

  useEffect(() => {
    if (!projectId) return;
    let active = true;
    fetchVectorStoreInfo(projectId)
      .then((data) => {
        if (active) setVectorData(data);
      })
      .catch((err) => {
        console.error("Failed to load vector info:", err);
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
            <Network className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Vector Embeddings Store</h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {projectName ? `High-dimensional semantic code chunks for "${projectName}"` : "Semantic embeddings store"}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
        <div className="p-4 rounded-xl bg-[#07080c] border border-white/10 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase">Embedding Model</div>
          <div className="text-xs font-bold text-white truncate">{vectorData?.embedding_model || "text-embedding-3"}</div>
        </div>

        <div className="p-4 rounded-xl bg-[#07080c] border border-white/10 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase">Vector Dimensions</div>
          <div className="text-xs font-bold text-cyan-400">{vectorData?.dimensions || 1536} D</div>
        </div>

        <div className="p-4 rounded-xl bg-[#07080c] border border-white/10 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase">Indexed Files</div>
          <div className="text-xs font-bold text-emerald-400">{vectorData?.total_indexed_files || 0} files</div>
        </div>

        <div className="p-4 rounded-xl bg-[#07080c] border border-white/10 space-y-1">
          <div className="text-[10px] text-zinc-400 uppercase">Vector Chunks</div>
          <div className="text-xs font-bold text-rose-400">{vectorData?.total_vector_chunks || 0} vectors</div>
        </div>
      </div>

      {/* Code Chunks Table */}
      <div className="p-6 rounded-2xl bg-[#07080c] border border-white/10 space-y-4 shadow-xl font-mono">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-white" />
          <span>Active Vector Embedding Chunks</span>
        </h3>

        {isLoading ? (
          <div className="py-12 text-center text-zinc-500 text-xs animate-pulse">
            Loading vector store embeddings...
          </div>
        ) : !vectorData?.sample_chunks || vectorData.sample_chunks.length === 0 ? (
          <div className="p-8 text-center text-zinc-400 text-xs">
            No vector chunks found. Deploy an agent to generate semantic embeddings.
          </div>
        ) : (
          <div className="space-y-2">
            {vectorData.sample_chunks.map((chunk: VectorChunk) => (
              <div
                key={chunk.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                    <FileCode2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{chunk.file}</div>
                    <div className="text-[10px] text-zinc-400">{chunk.tokens} tokens • {chunk.dimension} dim</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    Score: {chunk.similarity_score.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
