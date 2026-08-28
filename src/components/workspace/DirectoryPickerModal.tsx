"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Folder,
  FolderGit2,
  FolderOpen,
  ChevronRight,
  ArrowUp,
  Search,
  Check,
  X,
  Loader2,
  HardDrive,
  Laptop,
} from "lucide-react";
import { DirectoryBrowseResponse, DirectoryItem } from "@/types/api";
import { browseDirectories } from "@/lib/api";
import { cn } from "@/lib/utils";

interface DirectoryPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDirectory: (path: string, name: string) => void;
  initialPath?: string;
}

export function DirectoryPickerModal({
  isOpen,
  onClose,
  onSelectDirectory,
  initialPath,
}: DirectoryPickerModalProps) {
  const [data, setData] = useState<DirectoryBrowseResponse | null>(null);
  const [currentPath, setCurrentPath] = useState<string>(initialPath || "");
  const [selectedDir, setSelectedDir] = useState<DirectoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadDirectory = async (path?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await browseDirectories(path);
      setData(res);
      setCurrentPath(res.current_path);
      setSelectedDir(null);
      setSearchQuery("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load directory");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        loadDirectory(initialPath);
      });
    }
  }, [isOpen, initialPath]);

  if (!isOpen) return null;

  const filteredDirs =
    data?.directories.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleSelectConfirm = () => {
    if (selectedDir) {
      onSelectDirectory(selectedDir.path, selectedDir.name);
      onClose();
    } else if (data?.current_path) {
      const folderName = data.current_path.split("/").pop() || "project";
      onSelectDirectory(data.current_path, folderName);
      onClose();
    }
  };

  const handleNativePicker = async () => {
    try {
      if ("showDirectoryPicker" in window) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const dirHandle = await window.showDirectoryPicker();
        if (dirHandle?.name) {
          const guessedPath = `/home/gandhaar/project/projects/${dirHandle.name}`;
          onSelectDirectory(guessedPath, dirHandle.name);
          onClose();
        }
      } else {
        fileInputRef.current?.click();
      }
    } catch (_err) {
      // User cancelled
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="bg-[#090a0f] border border-white/20 rounded-2xl max-w-3xl w-full h-[600px] shadow-2xl flex flex-col overflow-hidden text-zinc-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#050508] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <FolderOpen className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Select Repository Location
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleNativePicker}
              className="text-xs font-sans px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Laptop className="w-4 h-4" />
              <span>Native Files App</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hidden fallback file input */}
        <input
          type="file"
          ref={fileInputRef}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          webkitdirectory="true"
          directory="true"
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              const fullPath = (files[0] as { webkitRelativePath?: string }).webkitRelativePath || "";
              const folderName = fullPath.split("/")[0] || "project";
              onSelectDirectory(`/home/gandhaar/project/projects/${folderName}`, folderName);
              onClose();
            }
          }}
        />

        {/* Breadcrumbs Navigation */}
        <div className="px-5 py-2.5 border-b border-white/10 bg-[#030305] flex items-center justify-between gap-2 overflow-x-auto text-xs font-mono">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {data?.breadcrumbs.map((b, idx) => (
              <React.Fragment key={b.path}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />}
                <button
                  onClick={() => loadDirectory(b.path)}
                  className={cn(
                    "px-2 py-1 rounded-md hover:bg-white/10 hover:text-white transition-colors shrink-0",
                    idx === data.breadcrumbs.length - 1
                      ? "text-white font-bold bg-white/10 border border-white/20"
                      : "text-zinc-400"
                  )}
                >
                  {b.name || "/"}
                </button>
              </React.Fragment>
            ))}
          </div>

          {data?.parent_path && (
            <button
              onClick={() => loadDirectory(data.parent_path!)}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs flex items-center gap-1 shrink-0 border border-white/10 font-sans cursor-pointer"
              title="Go up one folder"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Up</span>
            </button>
          )}
        </div>

        {/* Main Filesystem Split View */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden font-sans">
          {/* Quick Locations Sidebar */}
          <div className="col-span-4 border-r border-white/10 bg-[#050508] p-3.5 space-y-1.5 overflow-y-auto">
            <span className="text-[10px] font-mono uppercase text-zinc-500 px-2 tracking-wider font-semibold">
              Locations
            </span>
            {data?.quick_locations.map((loc) => (
              <button
                key={loc.path}
                onClick={() => loadDirectory(loc.path)}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center gap-2.5 transition-all cursor-pointer font-sans",
                  currentPath === loc.path
                    ? "bg-white/10 text-white font-bold border border-white/20"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <HardDrive className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="truncate">{loc.name}</span>
              </button>
            ))}
          </div>

          {/* Directory Content Area */}
          <div className="col-span-8 flex flex-col bg-[#090a0f] overflow-hidden">
            {/* Search Bar */}
            <div className="p-3 border-b border-white/10 bg-[#050508]">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter folders..."
                  className="w-full bg-[#030305] border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-white font-sans"
                />
              </div>
            </div>

            {/* Folder List */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-1.5 terminal-scroll font-mono">
              {isLoading ? (
                <div className="h-full flex items-center justify-center text-zinc-500 gap-2 text-xs font-sans">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Reading filesystem...</span>
                </div>
              ) : error ? (
                <div className="text-rose-400 text-xs p-4 text-center font-sans">
                  {error}
                </div>
              ) : filteredDirs.length === 0 ? (
                <div className="text-zinc-500 text-xs py-12 text-center font-sans">
                  No subdirectories found in this folder.
                </div>
              ) : (
                filteredDirs.map((dir) => {
                  const isSelected = selectedDir?.path === dir.path;

                  return (
                    <div
                      key={dir.path}
                      onClick={() => setSelectedDir(dir)}
                      onDoubleClick={() => loadDirectory(dir.path)}
                      className={cn(
                        "p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all text-xs select-none",
                        isSelected
                          ? "bg-white/10 border-white text-white font-bold glow-primary"
                          : "bg-white/5 border-white/5 hover:border-white/20 text-zinc-300"
                      )}
                    >
                      <div className="flex items-center gap-3 truncate font-mono">
                        {dir.is_git_repo ? (
                          <FolderGit2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Folder className="w-4 h-4 text-white shrink-0" />
                        )}
                        <span className="font-medium truncate">{dir.name}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {dir.is_git_repo && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
                            git
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer Confirmation Bar */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#050508] flex items-center justify-between text-xs font-sans">
          <div className="truncate max-w-sm text-zinc-400">
            Selected:{" "}
            <span className="text-white font-bold font-mono">
              {selectedDir ? selectedDir.name : data?.current_path?.split("/").pop()}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 transition-colors font-semibold cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSelectConfirm}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-bold border border-white shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:bg-zinc-200 transition-all cursor-pointer glow-primary"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Select Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
