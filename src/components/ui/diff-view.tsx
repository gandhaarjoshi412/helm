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
        "rounded-lg overflow-hidden border border-white/[0.08] bg-[#0c0e12] font-mono text-xs",
        className
      )}
    >
      {/* File Selector Tabs if multiple */}
      {files.length > 1 && (
        <div className="flex items-center gap-1 border-b border-white/[0.06] bg-zinc-950/60 px-2 py-1.5 overflow-x-auto">
          {files.map((file, idx) => (
            <button
              key={file.filename}
              onClick={() => onSelectFile?.(idx)}
              className={cn(
                "flex items-center gap-2 px-2.5 py-1 rounded text-xs transition-colors shrink-0",
                idx === activeFileIndex
                  ? "bg-zinc-800 text-zinc-100 border border-white/10 font-medium"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              )}
            >
              <FileCode className="w-3.5 h-3.5 text-sky-400" />
              <span>{file.filename}</span>
              <span className="flex items-center text-[10px] gap-1 ml-1">
                <span className="text-emerald-400">+{file.additions}</span>
                <span className="text-rose-400">-{file.deletions}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Current File Header */}
      {files.length === 1 && (
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] bg-zinc-950/40">
          <div className="flex items-center gap-2 text-zinc-300">
            <FileCode className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-medium">{currentFile.filename}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-emerald-400 font-medium">+{currentFile.additions}</span>
            <span className="text-rose-400 font-medium">-{currentFile.deletions}</span>
          </div>
        </div>
      )}

      {/* Code Diff Lines */}
      <div className="divide-y divide-white/[0.02] overflow-x-auto py-1">
        {currentFile.lines.map((line, idx) => {
          const isAdd = line.type === "add";
          const isDel = line.type === "delete";

          return (
            <div
              key={idx}
              className={cn(
                "flex items-stretch text-xs leading-5 hover:bg-white/[0.02] transition-colors",
                isAdd && "bg-emerald-500/[0.08] text-emerald-200",
                isDel && "bg-rose-500/[0.08] text-rose-300"
              )}
            >
              {/* Old Line Number */}
              <span className="w-9 px-2 py-0.5 text-right select-none text-zinc-600 text-[11px] shrink-0 border-r border-white/[0.04]">
                {line.oldLine ?? ""}
              </span>
              {/* New Line Number */}
              <span className="w-9 px-2 py-0.5 text-right select-none text-zinc-600 text-[11px] shrink-0 border-r border-white/[0.04]">
                {line.newLine ?? ""}
              </span>
              {/* Diff Symbol */}
              <span className="w-6 flex items-center justify-center select-none shrink-0 text-[11px]">
                {isAdd && <Plus className="w-3 h-3 text-emerald-400 stroke-[3]" />}
                {isDel && <Minus className="w-3 h-3 text-rose-400 stroke-[3]" />}
                {!isAdd && !isDel && <span className="text-zinc-600"> </span>}
              </span>
              {/* Code Content */}
              <span
                className={cn(
                  "py-0.5 pr-4 whitespace-pre font-mono text-[11.5px]",
                  !isAdd && !isDel && "text-zinc-400"
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
