"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  FolderOpen,
  Plus,
  X,
  Loader2,
  Terminal,
  Laptop,
} from "lucide-react";
import { DirectoryPickerModal } from "./DirectoryPickerModal";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, repoPath: string, gitUrl?: string) => Promise<any>;
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
    } catch (err: any) {
      setError(err.message || "Failed to register project");
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
        <div className="bg-[#0f1018] border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-semibold text-white">
                Connect Repository
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs font-mono text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-mono">
            <div>
              <label className="block text-zinc-400 mb-1">Project Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. iqoo_backend or testing_iqoo"
                className="w-full bg-[#141522] border border-white/10 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-zinc-400">Local Repository Path *</label>
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(true)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
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
                  className="flex-1 bg-[#141522] border border-white/10 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-indigo-500/50 font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setIsPickerOpen(true)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Browse via Files Explorer"
                >
                  <FolderOpen className="w-4 h-4 text-indigo-400" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 mb-1">
                Git Remote URL (Optional)
              </label>
              <input
                type="text"
                value={gitUrl}
                onChange={(e) => setGitUrl(e.target.value)}
                placeholder="https://github.com/org/repo.git"
                className="w-full bg-[#141522] border border-white/10 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-indigo-500/50"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !name || !repoPath}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Plus className="w-3.5 h-3.5" />
                )}
                <span>Index & Connect</span>
              </button>
            </div>
          </form>
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
