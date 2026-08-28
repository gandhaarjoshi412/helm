"use client";

import React, { useState, useEffect } from "react";
import {
  FileCode2,
  Copy,
  Check,
} from "lucide-react";
import { TaskChangesResponse, FileDiff } from "@/types/api";
import { fetchTaskChanges } from "@/lib/api";
import { cn } from "@/lib/utils";

interface LiveDiffViewerProps {
  taskId: string | null;
  modifiedFilesCount: number;
}

export function LiveDiffViewer({ taskId, modifiedFilesCount }: LiveDiffViewerProps) {
  const [changes, setChanges] = useState<TaskChangesResponse | null>(null);
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"unified" | "split">("unified");

  useEffect(() => {
    if (!taskId) {
      queueMicrotask(() => setChanges(null));
      return;
    }

    const loadDiff = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTaskChanges(taskId);
        setChanges(data);
      } catch (err) {
        // Task may be still running without changes yet
      } finally {
        setIsLoading(false);
      }
    };

    loadDiff();
    const interval = setInterval(loadDiff, 3000);
    return () => clearInterval(interval);
  }, [taskId, modifiedFilesCount]);

  const diffList: FileDiff[] = changes?.diffs || [];
  const rawDiffString = changes?.raw_diff || changes?.unified_diff || "";
  const totalAdditions = changes?.total_additions || 0;
  const totalDeletions = changes?.total_deletions || 0;

  const handleCopyDiff = () => {
    if (!rawDiffString) return;
    navigator.clipboard.writeText(rawDiffString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeFile: FileDiff | undefined = diffList[activeFileIndex];

  return (
    <div className="bg-[#050508] border border-white/10 rounded-xl overflow-hidden flex flex-col h-[520px] font-sans">
      {/* Top Header */}
      <div className="px-3.5 py-2.5 border-b border-white/10 bg-[#08090f] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-white" />
          <span className="text-xs font-mono font-semibold text-white">
            CODE CHANGES &amp; DIFF
          </span>
          {changes && (totalAdditions > 0 || totalDeletions > 0) && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className="text-emerald-400 font-bold">+{totalAdditions}</span>
              <span className="text-rose-400 font-bold">-{totalDeletions}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Unified vs Split Toggle */}
          <div className="flex items-center bg-[#000000] p-0.5 rounded-lg border border-white/10 text-[10px] font-mono">
            <button
              onClick={() => setViewMode("unified")}
              className={cn(
                "px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer",
                viewMode === "unified" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
              )}
            >
              Unified
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={cn(
                "px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer",
                viewMode === "split" ? "bg-white text-black" : "text-zinc-400 hover:text-white"
              )}
            >
              Split
            </button>
          </div>

          <button
            onClick={handleCopyDiff}
            disabled={!rawDiffString}
            className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-1 transition-colors disabled:opacity-40 cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy Diff"}</span>
          </button>
        </div>
      </div>

      {/* File Tab Selector */}
      {diffList.length > 0 && (
        <div className="flex items-center border-b border-white/10 bg-[#000000] px-2 overflow-x-auto no-scrollbar">
          {diffList.map((file, idx) => (
            <button
              key={file.path}
              onClick={() => setActiveFileIndex(idx)}
              className={cn(
                "px-3 py-2 text-xs font-mono border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer",
                activeFileIndex === idx
                  ? "border-white text-white font-bold bg-white/10"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              )}
            >
              <span>{file.path.split("/").pop()}</span>
              {file.additions > 0 && (
                <span className="text-[10px] text-emerald-400 font-bold">+{file.additions}</span>
              )}
              {file.deletions > 0 && (
                <span className="text-[10px] text-rose-400 font-bold">-{file.deletions}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Diff Content */}
      <div className="flex-1 overflow-y-auto p-3.5 font-mono text-xs bg-[#050508] terminal-scroll">
        {diffList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-2">
            <FileCode2 className="w-8 h-8 opacity-40 text-white" />
            <p className="text-xs">No file modifications detected yet.</p>
          </div>
        ) : activeFile?.diff_content ? (
          <pre className="text-[11px] leading-relaxed overflow-x-auto">
            {activeFile.diff_content.split("\n").map((line, i) => {
              const isAdd = line.startsWith("+") && !line.startsWith("+++");
              const isDel = line.startsWith("-") && !line.startsWith("---");
              const isHeader = line.startsWith("@@") || line.startsWith("diff ") || line.startsWith("index ");

              return (
                <div
                  key={i}
                  className={cn(
                    "px-2 py-0.5 rounded-sm flex items-start gap-2",
                    isAdd && "bg-emerald-500/10 text-emerald-400 font-semibold",
                    isDel && "bg-rose-500/10 text-rose-400 line-through opacity-80",
                    isHeader && "text-white font-semibold bg-white/10 border-l-2 border-white",
                    !isAdd && !isDel && !isHeader && "text-zinc-400"
                  )}
                >
                  <span className="select-none text-zinc-600 text-[10px] w-6 text-right">
                    {i + 1}
                  </span>
                  <span className="flex-1 whitespace-pre-wrap">{line}</span>
                </div>
              );
            })}
          </pre>
        ) : (
          <div className="text-zinc-400 p-4 space-y-1">
            <p className="text-white font-bold">File modified: {activeFile?.path}</p>
            <p className="text-emerald-400">+{activeFile?.additions} lines added</p>
            <p className="text-rose-400">-{activeFile?.deletions} lines deleted</p>
          </div>
        )}
      </div>
    </div>
  );
}
