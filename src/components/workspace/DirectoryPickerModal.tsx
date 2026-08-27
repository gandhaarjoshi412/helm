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
  Home,
  Laptop,
  Layers,
  Sparkles,
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
    } catch (err: any) {
      setError(err.message || "Failed to load directory");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadDirectory(initialPath);
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

  // Browser Native System Picker Handler
  const handleNativePicker = async () => {
    try {
      if ("showDirectoryPicker" in window) {
        // @ts-ignore
        const dirHandle = await window.showDirectoryPicker();
        if (dirHandle?.name) {
          // If in subfolder of project
          const guessedPath = `/home/gandhaar/project/projects/${dirHandle.name}`;
          onSelectDirectory(guessedPath, dirHandle.name);
          onClose();
        }
      } else {
        fileInputRef.current?.click();
      }
    } catch (err) {
      // User cancelled
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#0e0f17] border border-white/15 rounded-2xl max-w-2xl w-full h-[520px] shadow-2xl flex flex-col overflow-hidden text-zinc-200">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-white/10 bg-[#12131e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FolderOpen className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Select Repository Location
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNativePicker}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-colors flex items-center gap-1.5"
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Native Files App</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hidden fallback file input */}
        <input
          type="file"
          ref={fileInputRef}
          // @ts-ignore
          webkitdirectory="true"
          directory="true"
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              const fullPath = (files[0] as any).webkitRelativePath || "";
              const folderName = fullPath.split("/")[0] || "project";
              onSelectDirectory(`/home/gandhaar/project/projects/${folderName}`, folderName);
              onClose();
            }
          }}
        />

        {/* Breadcrumbs Navigation Bar */}
        <div className="px-4 py-2 border-b border-white/5 bg-[#10111a] flex items-center justify-between gap-2 overflow-x-auto text-xs font-mono">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {data?.breadcrumbs.map((b, idx) => (
              <React.Fragment key={b.path}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />}
                <button
                  onClick={() => loadDirectory(b.path)}
                  className={cn(
                    "px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors shrink-0",
                    idx === data.breadcrumbs.length - 1
                      ? "text-indigo-400 font-semibold bg-indigo-500/10"
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
              className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 text-[11px] flex items-center gap-1 shrink-0 border border-white/5"
              title="Go up one folder"
            >
              <ArrowUp className="w-3 h-3" />
              <span>Up</span>
            </button>
          )}
        </div>

        {/* Main Body with Sidebar + File Explorer */}
        <div className="flex-1 grid grid-cols-12 overflow-hidden">
          {/* Quick Shortcuts Sidebar */}
          <div className="col-span-4 border-r border-white/5 bg-[#0b0c13] p-3 space-y-1 overflow-y-auto">
            <span className="text-[10px] font-mono uppercase text-zinc-500 px-2 tracking-wider">
              Locations
            </span>
            {data?.quick_locations.map((loc) => (
              <button
                key={loc.path}
                onClick={() => loadDirectory(loc.path)}
                className={cn(
                  "w-full text-left px-2.5 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-colors",
                  currentPath === loc.path
                    ? "bg-indigo-600/20 text-indigo-300 font-medium border border-indigo-500/30"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
              >
                <HardDrive className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                <span className="truncate">{loc.name}</span>
              </button>
            ))}
          </div>

          {/* Directory Explorer Pane */}
          <div className="col-span-8 flex flex-col bg-[#0e0f17] overflow-hidden">
            {/* Search filter in current directory */}
            <div className="p-2.5 border-b border-white/5 bg-[#10111a]">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter folders..."
                  className="w-full bg-[#141522] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                />
              </div>
            </div>

            {/* Folder Grid/List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {isLoading ? (
                <div className="h-full flex items-center justify-center text-zinc-500 gap-2 text-xs font-mono">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Reading filesystem...</span>
                </div>
              ) : error ? (
                <div className="text-rose-400 text-xs font-mono p-4 text-center">
                  {error}
                </div>
              ) : filteredDirs.length === 0 ? (
                <div className="text-zinc-500 text-xs font-mono py-12 text-center">
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
                        "p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all text-xs font-mono select-none",
                        isSelected
                          ? "bg-indigo-600/20 border-indigo-500/50 text-white"
                          : "bg-[#131420] border-white/5 hover:border-white/15 text-zinc-300"
                      )}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {dir.is_git_repo ? (
                          <FolderGit2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Folder className="w-4 h-4 text-indigo-400 shrink-0" />
                        )}
                        <span className="font-medium truncate">{dir.name}</span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {dir.is_git_repo && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-semibold">
                            git
                          </span>
                        )}
                        {dir.project_type && dir.project_type !== "folder" && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 uppercase">
                            {dir.project_type}
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

        {/* Footer Selection Confirmation */}
        <div className="px-5 py-3 border-t border-white/10 bg-[#12131e] flex items-center justify-between text-xs font-mono">
          <div className="truncate max-w-sm text-zinc-400">
            Selected:{" "}
            <span className="text-zinc-200 font-semibold">
              {selectedDir ? selectedDir.name : data?.current_path?.split("/").pop()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSelectConfirm}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Select Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
