"use client";

import React, { useState, useRef } from "react";
import {
  FolderGit2,
  Plus,
  X,
  Loader2,
  ShieldCheck,
  GitBranch,
  Folder,
  Laptop,
  Sparkles,
  CheckCircle2,
  HardDrive,
  FileCode2,
} from "lucide-react";
import { KodiumMark } from "../ui/kodium-mark";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/use-projects";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type TabType = "local" | "git" | "template";

async function getFilesFromDirectoryHandle(
  dirHandle: FileSystemDirectoryHandle,
  path = ""
): Promise<{ file: File; relativePath: string }[]> {
  const results: { file: File; relativePath: string }[] = [];
  const IGNORED = new Set([
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    ".venv",
    "venv",
    "__pycache__",
    ".DS_Store",
    ".pytest_cache",
  ]);

  for await (const entry of (dirHandle as unknown as { values: () => AsyncIterable<FileSystemHandle> }).values()) {
    if (IGNORED.has(entry.name) || (entry.name.startsWith(".") && entry.name !== ".env.example")) {
      continue;
    }
    const rel = path ? `${path}/${entry.name}` : entry.name;
    if (entry.kind === "file") {
      const file = await (entry as FileSystemFileHandle).getFile();
      if (file.size <= 15 * 1024 * 1024) {
        results.push({ file, relativePath: rel });
      }
    } else if (entry.kind === "directory") {
      const sub = await getFilesFromDirectoryHandle(entry as FileSystemDirectoryHandle, rel);
      results.push(...sub);
    }
  }
  return results;
}

export function NewProjectModal({
  isOpen,
  onClose,
  onSuccess,
}: NewProjectModalProps) {
  const { addProject, addProjectWithFiles } = useProjects();
  const [activeTab, setActiveTab] = useState<TabType>("local");
  const [name, setName] = useState<string>("");
  const [gitUrl, setGitUrl] = useState<string>("");
  const [template, setTemplate] = useState<string>("nextjs");
  const [localFiles, setLocalFiles] = useState<{ file: File; relativePath: string }[]>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handlePickLocalFolder = async () => {
    setError(null);
    try {
      if ("showDirectoryPicker" in window) {
        const dirHandle: FileSystemDirectoryHandle = await (window as unknown as { showDirectoryPicker: () => Promise<FileSystemDirectoryHandle> }).showDirectoryPicker();
        if (dirHandle?.name) {
          setSelectedFolderName(dirHandle.name);
          if (!name.trim()) setName(dirHandle.name);
          const files = await getFilesFromDirectoryHandle(dirHandle);
          setLocalFiles(files);
        }
      } else {
        fileInputRef.current?.click();
      }
    } catch (_err) {
      // User cancelled
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFiles = e.target.files;
    if (!rawFiles || rawFiles.length === 0) return;

    const filesArray: { file: File; relativePath: string }[] = [];
    const IGNORED = ["node_modules", ".git", ".next", "dist", "build", ".venv", "venv", "__pycache__"];
    let folderName = "";

    for (let i = 0; i < rawFiles.length; i++) {
      const file = rawFiles[i];
      const rel = (file as { webkitRelativePath?: string }).webkitRelativePath || file.name;
      const parts = rel.split("/");
      if (!folderName && parts.length > 0) {
        folderName = parts[0];
      }
      const innerRel = parts.length > 1 ? parts.slice(1).join("/") : parts[0];
      if (parts.some((p) => IGNORED.includes(p) || (p.startsWith(".") && p !== ".env.example"))) {
        continue;
      }
      if (file.size <= 15 * 1024 * 1024) {
        filesArray.push({ file, relativePath: innerRel });
      }
    }

    if (folderName) {
      setSelectedFolderName(folderName);
      if (!name.trim()) setName(folderName);
    }
    setLocalFiles(filesArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide a project name.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (activeTab === "local") {
        if (localFiles.length > 0) {
          await addProjectWithFiles(name.trim(), localFiles, gitUrl.trim() || undefined);
        } else {
          await addProject(name.trim(), undefined, gitUrl.trim() || undefined);
        }
      } else if (activeTab === "git") {
        if (!gitUrl.trim()) {
          throw new Error("Please enter a valid Git Repository URL.");
        }
        await addProject(name.trim(), undefined, gitUrl.trim());
      } else if (activeTab === "template") {
        await addProject(name.trim());
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative max-w-4xl w-full bg-[#08090d] border border-white/20 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col md:flex-row my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hidden Fallback Input */}
        <input
          type="file"
          ref={fileInputRef}
          // @ts-expect-error Non-standard webkit directory attributes
          webkitdirectory="true"
          directory="true"
          className="hidden"
          onChange={handleFileInputChange}
        />

        {/* LEFT PANEL - Gradient Brand Side */}
        <div className="relative hidden md:flex md:w-5/12 bg-gradient-to-br from-[#0b1736] via-[#080b18] to-[#1a0836] p-8 lg:p-10 flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.1]">
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/25 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-white/[0.08] border border-white/15 shadow-xl backdrop-blur-xl">
                <KodiumMark size={32} glow />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-wider text-white text-lg font-sans">
                  KODIUM
                </span>
                <span className="text-[10px] font-mono text-cyan-300 font-semibold tracking-widest uppercase">
                  Isolated Workspace
                </span>
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-sans leading-tight">
              Create Project
            </h2>
            <p className="text-xs text-zinc-300 mt-2 font-mono leading-relaxed">
              Connect local codebases or clone remote Git repositories into your private, sandboxed workspace.
            </p>
          </div>

          <div className="relative z-10 my-6 space-y-2.5 font-mono text-xs">
            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-3">
              <Laptop className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-zinc-200">Zero host file leakage</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-zinc-200">Per-user isolated sandbox</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-[11px] text-zinc-400 font-mono pt-4 border-t border-white/[0.1]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Supabase Auth &amp; Ephemeral AST</span>
          </div>
        </div>

        {/* RIGHT PANEL - Form & Mode Tabs */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col justify-between bg-[#08090d]">
          <div>
            <div className="mb-5 pr-8">
              <h3 className="text-xl font-bold text-white font-sans tracking-tight">
                New Workspace
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Choose how you want to connect your code.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-white/[0.04] border border-white/10 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("local")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === "local"
                    ? "bg-white text-black font-bold shadow-lg"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Laptop Folder</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("git")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === "git"
                    ? "bg-white text-black font-bold shadow-lg"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Git Clone</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("template")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === "template"
                    ? "bg-white text-black font-bold shadow-lg"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Template</span>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs font-mono text-rose-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {/* Project Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-200 mb-1.5 font-mono">
                  PROJECT NAME <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. my-awesome-project"
                  className="w-full bg-[#030305] border border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-2xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-all shadow-inner"
                />
              </div>

              {/* Tab 1: Local Laptop Folder Picker */}
              {activeTab === "local" && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-zinc-200 font-mono">
                    LOCAL LAPTOP FOLDER
                  </label>
                  <div
                    onClick={handlePickLocalFolder}
                    className={`p-5 rounded-2xl border border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 ${
                      selectedFolderName
                        ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-300"
                        : "bg-white/[0.02] border-white/20 hover:border-white/40 hover:bg-white/[0.05] text-zinc-300"
                    }`}
                  >
                    {selectedFolderName ? (
                      <>
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="font-bold font-mono text-sm text-white">
                          {selectedFolderName}
                        </div>
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {localFiles.length > 0
                            ? `${localFiles.length} files selected ready to sync`
                            : "Local folder attached"}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                          <Folder className="w-5 h-5" />
                        </div>
                        <div className="font-bold text-white text-xs">
                          Click to select a folder from your laptop
                        </div>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          Opens your Mac Finder / Windows Explorer / Linux Files
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Git Clone */}
              {activeTab === "git" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-200 mb-1.5 font-mono">
                      GIT REPOSITORY URL <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={gitUrl}
                      onChange={(e) => setGitUrl(e.target.value)}
                      placeholder="https://github.com/facebook/react.git"
                      className="w-full bg-[#030305] border border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-500 font-mono outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>
              )}

              {/* Tab 3: Templates */}
              {activeTab === "template" && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-zinc-200 mb-1.5 font-mono">
                    CHOOSE STARTER TEMPLATE
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "nextjs", label: "Next.js 15 App Router", icon: FileCode2 },
                      { id: "fastapi", label: "Python FastAPI", icon: HardDrive },
                      { id: "node", label: "Node.js / Express", icon: Laptop },
                      { id: "blank", label: "Blank Workspace", icon: Folder },
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => setTemplate(tpl.id)}
                        className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          template === tpl.id
                            ? "bg-white/10 border-white text-white font-bold"
                            : "bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        <tpl.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-xs truncate">{tpl.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors font-semibold text-xs cursor-pointer font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !name.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white text-black font-sans font-extrabold text-xs shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:bg-zinc-100 transition-all border border-white disabled:opacity-40 cursor-pointer glow-primary"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                  ) : (
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  )}
                  <span>Create &amp; Connect</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

