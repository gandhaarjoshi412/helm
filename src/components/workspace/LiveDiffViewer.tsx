"use client";

import React, { useState, useEffect } from "react";
import {
  FileCode2,
  GitBranch,
  Copy,
  Check,
  Download,
  Maximize2,
  Minimize2,
  Layers,
} from "lucide-react";
import { TaskChangesResponse, FileDiff } from "@/types/api";
import { fetchTaskChanges, fetchTaskDiff } from "@/lib/api";
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
      setChanges(null);
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
    <div className="bg-[#0c0d14] border border-white/10 rounded-xl overflow-hidden flex flex-col h-[520px]">
      {/* Top Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-[#11121c] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-semibold text-zinc-200">
            CODE CHANGES & DIFF
          </span>
          {changes && (totalAdditions > 0 || totalDeletions > 0) && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className="text-emerald-400 font-semibold">+{totalAdditions}</span>
              <span className="text-rose-400 font-semibold">-{totalDeletions}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Unified vs Split Toggle */}
          <div className="flex items-center bg-[#181926] p-0.5 rounded border border-white/5 text-[10px] font-mono">
            <button
              onClick={() => setViewMode("unified")}
              className={cn(
                "px-2 py-0.5 rounded",
                viewMode === "unified" ? "bg-indigo-600 text-white" : "text-zinc-400"
              )}
            >
              Unified
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={cn(
                "px-2 py-0.5 rounded",
                viewMode === "split" ? "bg-indigo-600 text-white" : "text-zinc-400"
              )}
            >
              Split
            </button>
          </div>

          <button
            onClick={handleCopyDiff}
            disabled={!rawDiffString}
            className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 flex items-center gap-1 transition-colors disabled:opacity-40"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy Diff"}</span>
          </button>
        </div>
      </div>

      {/* File Tab Selector */}
      {diffList.length > 0 && (
        <div className="flex items-center border-b border-white/5 bg-[#090a10] px-2 overflow-x-auto no-scrollbar">
          {diffList.map((file, idx) => (
            <button
              key={file.path}
              onClick={() => setActiveFileIndex(idx)}
              className={cn(
                "px-3 py-2 text-xs font-mono border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap",
                activeFileIndex === idx
                  ? "border-indigo-500 text-white bg-white/5"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              )}
            >
              <span>{file.path.split("/").pop()}</span>
              {file.additions > 0 && (
                <span className="text-[10px] text-emerald-400">+{file.additions}</span>
              )}
              {file.deletions > 0 && (
                <span className="text-[10px] text-rose-400">-{file.deletions}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Diff Content */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-[#090a10]">
        {diffList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-2">
            <FileCode2 className="w-8 h-8 opacity-40" />
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
                    isAdd && "bg-emerald-500/10 text-emerald-300 font-medium",
                    isDel && "bg-rose-500/10 text-rose-300 line-through opacity-80",
                    isHeader && "text-indigo-400 font-semibold bg-indigo-950/20",
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
          <div className="text-zinc-400 p-4">
            <p>File modified: {activeFile?.path}</p>
            <p className="text-emerald-400">+{activeFile?.additions} lines added</p>
            <p className="text-rose-400">-{activeFile?.deletions} lines deleted</p>
          </div>
        )}
      </div>
    </div>
  );
}
