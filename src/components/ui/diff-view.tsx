import React from "react";
import { cn } from "@/lib/utils";
import { FileCode, Plus, Minus } from "lucide-react";

export interface DiffLine {
  type: "add" | "delete" | "context";
  oldLine?: number;
  newLine?: number;
  content: string;
}

export interface DiffFile {
  filename: string;
  additions: number;
  deletions: number;
  lines: DiffLine[];
}

interface DiffViewProps {
  files: DiffFile[];
  activeFileIndex?: number;
  onSelectFile?: (index: number) => void;
  className?: string;
}

export function DiffView({
  files,
  activeFileIndex = 0,
  onSelectFile,
  className,
}: DiffViewProps) {
  const currentFile = files[activeFileIndex] || files[0];

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#0c0e12] font-mono text-xs shadow-sm transition-colors duration-300",
        className
      )}
    >
      {/* File Selector Tabs if multiple */}
      {files.length > 1 && (
        <div className="flex items-center gap-1 border-b border-slate-200 dark:border-white/[0.06] bg-slate-100 dark:bg-zinc-950/60 px-2 py-1.5 overflow-x-auto">
          {files.map((file, idx) => (
            <button
              key={file.filename}
              onClick={() => onSelectFile?.(idx)}
              className={cn(
                "flex items-center gap-2 px-2.5 py-1 rounded text-xs transition-colors shrink-0 font-mono",
                idx === activeFileIndex
                  ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 border border-slate-300 dark:border-white/10 font-bold shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200/50 dark:hover:bg-white/[0.04]"
              )}
            >
              <FileCode className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
              <span>{file.filename}</span>
              <span className="flex items-center text-[10px] gap-1 ml-1">
                <span className="text-emerald-600 dark:text-emerald-400">+{file.additions}</span>
                <span className="text-rose-600 dark:text-rose-400">-{file.deletions}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Current File Header */}
      {files.length === 1 && (
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-white/[0.06] bg-slate-100/90 dark:bg-zinc-950/40">
          <div className="flex items-center gap-2 text-slate-800 dark:text-zinc-300">
            <FileCode className="w-3.5 h-3.5 text-slate-700 dark:text-zinc-300" />
            <span className="font-mono font-bold">{currentFile.filename}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{currentFile.additions}</span>
            <span className="text-rose-600 dark:text-rose-400 font-bold">-{currentFile.deletions}</span>
          </div>
        </div>
      )}

      {/* Code Diff Lines */}
      <div className="divide-y divide-slate-200/60 dark:divide-white/[0.02] overflow-x-auto py-1 font-mono">
        {currentFile.lines.map((line, idx) => {
          const isAdd = line.type === "add";
          const isDel = line.type === "delete";

          return (
            <div
              key={idx}
              className={cn(
                "flex items-stretch text-xs leading-5 hover:bg-slate-200/50 dark:hover:bg-white/[0.02] transition-colors",
                isAdd && "bg-emerald-50 dark:bg-emerald-500/[0.08] text-emerald-950 dark:text-emerald-200 font-semibold",
                isDel && "bg-rose-50 dark:bg-rose-500/[0.08] text-rose-950 dark:text-rose-300 font-semibold"
              )}
            >
              {/* Old Line Number */}
              <span className="w-9 px-2 py-0.5 text-right select-none text-slate-400 dark:text-zinc-600 text-[11px] shrink-0 border-r border-slate-200/60 dark:border-white/[0.04] font-mono">
                {line.oldLine ?? ""}
              </span>
              {/* New Line Number */}
              <span className="w-9 px-2 py-0.5 text-right select-none text-slate-400 dark:text-zinc-600 text-[11px] shrink-0 border-r border-slate-200/60 dark:border-white/[0.04] font-mono">
                {line.newLine ?? ""}
              </span>
              {/* Diff Symbol */}
              <span className="w-6 flex items-center justify-center select-none shrink-0 text-[11px] font-mono">
                {isAdd && <Plus className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[3]" />}
                {isDel && <Minus className="w-3 h-3 text-rose-600 dark:text-rose-400 stroke-[3]" />}
                {!isAdd && !isDel && <span className="text-slate-400 dark:text-zinc-600"> </span>}
              </span>
              {/* Code Content */}
              <span
                className={cn(
                  "py-0.5 pr-4 whitespace-pre font-mono text-[11.5px]",
                  !isAdd && !isDel && "text-slate-700 dark:text-zinc-400"
                )}
              >
                {line.content}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


