"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  FolderOpen,
  Plus,
  X,
  Loader2,
  ShieldCheck,
  GitBranch,
  Folder,
  Cpu,
} from "lucide-react";
import { KodiumMark } from "../ui/kodium-mark";
import { DirectoryPickerModal } from "./DirectoryPickerModal";
import { motion } from "framer-motion";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, repoPath: string, gitUrl?: string) => Promise<unknown>;
}

export function NewProjectModal({
  isOpen,
  onClose,
  onCreate,
}: NewProjectModalProps) {
  const [name, setName] = useState<string>("");
  const [repoPath, setRepoPath] = useState<string>("");
  const [gitUrl, setGitUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !repoPath.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      await onCreate(name.trim(), repoPath.trim(), gitUrl.trim() || undefined);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectorySelected = (selectedPath: string, folderName: string) => {
    setRepoPath(selectedPath);
    if (!name.trim()) {
      setName(folderName);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
        <div className="relative max-w-4xl w-full bg-[#08090d] border border-white/20 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col md:flex-row my-auto">
          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.15] text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer backdrop-blur-md"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* LEFT PANEL - Distinct Ocean Blue/Cyan/Violet Mesh Gradient */}
          <div className="relative hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0b1736] via-[#080b18] to-[#1a0836] p-8 lg:p-10 flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-white/[0.1]">
            {/* Animated Background Gradient Blobs */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/25 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[90px] pointer-events-none" />

            {/* Top Brand & Status */}
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
                    Workspace Indexer
                  </span>
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-sans leading-tight">
                Connect Workspace
              </h2>
              <p className="text-xs lg:text-sm text-zinc-300 mt-2 font-mono leading-relaxed">
                Index local directories for HELM autonomous agent execution &amp; real-time AST parsing.
              </p>
            </div>

            {/* Middle Step Progress Indicators */}
            <div className="relative z-10 my-6 space-y-3 font-mono">
              {/* Step 1 */}
              <motion.div
                whileHover={{ x: 3 }}
                className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all ${
                  repoPath
                    ? "bg-white text-zinc-950 border-white shadow-[0_10px_30px_rgba(255,255,255,0.25)]"
                    : "bg-white/[0.06] text-zinc-200 border-white/10 hover:bg-white/[0.09]"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    repoPath ? "bg-zinc-950 text-white" : "bg-white/10 text-cyan-300"
                  }`}
                >
                  1
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-bold tracking-wide">
                    Local Repository Path
                  </span>
                  <span
                    className={`text-[10.5px] ${
                      repoPath ? "text-zinc-700 font-medium" : "text-zinc-400"
                    }`}
                  >
                    {repoPath ? repoPath : "Select workspace root directory"}
                  </span>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                whileHover={{ x: 3 }}
                className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all ${
                  name
                    ? "bg-white text-zinc-950 border-white shadow-[0_10px_30px_rgba(255,255,255,0.25)]"
                    : "bg-white/[0.05] text-zinc-200 border-white/10 hover:bg-white/[0.08]"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    name ? "bg-zinc-950 text-white" : "bg-white/10 text-zinc-300"
                  }`}
                >
                  2
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-bold tracking-wide">
                    Project Identifier
                  </span>
                  <span
                    className={`text-[10.5px] ${
                      name ? "text-zinc-700 font-medium" : "text-zinc-400"
                    }`}
                  >
                    {name ? name : "Assign unique workspace name"}
                  </span>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                whileHover={{ x: 3 }}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.05] text-zinc-300 border border-white/10 hover:bg-white/[0.08] transition-all"
              >
                <div className="w-7 h-7 rounded-xl bg-white/10 text-zinc-400 flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-bold tracking-wide text-zinc-300">
                    Git Synchronization
                  </span>
                  <span className="text-[10.5px] text-zinc-400">
                    Optional remote repository URL
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Security Footer */}
            <div className="relative z-10 flex items-center gap-2.5 text-[11px] text-zinc-400 font-mono pt-4 border-t border-white/[0.1]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>HELM Ephemeral AST Parser Enabled</span>
            </div>
          </div>

          {/* RIGHT PANEL - Form Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#08090d]">
            <div>
              {/* Header */}
              <div className="mb-6 pr-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                  Connect Repository
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Index workspace directory for HELM autonomous runtime.
                </p>
              </div>

              {error && (
                <div className="mb-5 p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs font-mono text-rose-300">
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
                    placeholder="e.g. iqoo_backend or testing_iqoo"
                    className="w-full bg-[#030305] border border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 font-sans outline-none transition-all shadow-inner"
                  />
                </div>

                {/* Repository Path */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 font-mono">
                    <label className="text-xs font-bold text-zinc-200">
                      LOCAL REPOSITORY PATH <span className="text-rose-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsPickerOpen(true)}
                      className="text-[11px] text-white hover:text-zinc-200 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-xl border border-white/20 transition-all flex items-center gap-1.5 font-medium cursor-pointer"
                    >
                      <FolderOpen className="w-3.5 h-3.5 text-white" />
                      <span>Browse Folders...</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={repoPath}
                      onChange={(e) => setRepoPath(e.target.value)}
                      placeholder="/home/gandhaar/project/projects/..."
                      className="flex-1 bg-[#030305] border border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-500 font-mono outline-none transition-all shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPickerOpen(true)}
                      className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer shrink-0"
                      title="Browse via Files Explorer"
                    >
                      <FolderOpen className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Git Remote URL */}
                <div>
                  <label className="block text-xs font-bold text-zinc-200 mb-1.5 font-mono">
                    GIT REMOTE URL <span className="text-zinc-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={gitUrl}
                    onChange={(e) => setGitUrl(e.target.value)}
                    placeholder="https://github.com/org/repo.git"
                    className="w-full bg-[#030305] border border-white/20 focus:border-white focus:ring-1 focus:ring-white rounded-2xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 font-sans outline-none transition-all shadow-inner"
                  />
                </div>

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
                    disabled={isLoading || !name || !repoPath}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white text-black font-sans font-extrabold text-xs shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:bg-zinc-100 transition-all border border-white disabled:opacity-40 cursor-pointer glow-primary"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                    <span>Index &amp; Connect</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Browser Modal */}
      <DirectoryPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelectDirectory={handleDirectorySelected}
        initialPath={repoPath || undefined}
      />
    </>
  );
}
