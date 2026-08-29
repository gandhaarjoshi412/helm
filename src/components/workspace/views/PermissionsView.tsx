"use client";

import React, { useState, useEffect } from "react";
import { Lock, ShieldCheck, Terminal, FileCode2, Download, Globe, Server, Check, Save } from "lucide-react";
import { fetchProjectPermissions, updateProjectPermissions } from "@/lib/api";

interface PermissionsViewProps {
  projectId?: string;
  projectName?: string;
}

export function PermissionsView({ projectId, projectName }: PermissionsViewProps) {
  const [policy, setPolicy] = useState({
    allow_bash: true,
    allow_file_writes: true,
    allow_dependency_install: true,
    allow_network_egress: false,
    autonomy_level: "guided",
    isolation_type: "sandboxed_process",
  });
  const [isLoading, setIsLoading] = useState(Boolean(projectId));
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    let active = true;
    fetchProjectPermissions(projectId)
      .then((data) => {
        if (active && data) setPolicy(data);
      })
      .catch((err) => {
        console.error("Failed to load permissions:", err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [projectId]);

  const handleSave = async () => {
    if (!projectId || isSaving) return;
    setIsSaving(true);
    try {
      await updateProjectPermissions(projectId, policy);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update permissions:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const toggle = (key: keyof typeof policy) => {
    setPolicy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 font-sans max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#07080c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold text-white tracking-tight">Security &amp; Sandbox Policies</h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            {projectName ? `Permission gates & human-in-the-loop controls for "${projectName}"` : "Active security boundary"}
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving || !projectId}
          className="px-4 py-2.5 rounded-xl bg-white text-black font-mono font-bold text-xs shadow-lg hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? "Saving..." : savedSuccess ? "Saved Policy" : "Save Changes"}</span>
        </button>
      </div>

      {/* Autonomy Level Grid */}
      <div className="p-6 rounded-2xl bg-[#07080c] border border-white/10 space-y-4 shadow-xl font-mono">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Autonomy &amp; Gating Threshold</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "autonomous", label: "Autonomous", desc: "Agent automatically executes verified non-destructive actions." },
            { id: "guided", label: "Guided Approval", desc: "Requires human approval for commands and file patches." },
            { id: "strict", label: "Strict Sandbox", desc: "Read-only exploration; every single modification is gated." },
          ].map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setPolicy((p) => ({ ...p, autonomy_level: mode.id }))}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                policy.autonomy_level === mode.id
                  ? "bg-white/10 border-white text-white shadow-lg"
                  : "bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              }`}
            >
              <div className="font-bold text-xs mb-1 text-white">{mode.label}</div>
              <div className="text-[10px] leading-relaxed text-zinc-400 font-sans">{mode.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Permission Toggles */}
      <div className="p-6 rounded-2xl bg-[#07080c] border border-white/10 space-y-4 shadow-xl font-mono">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Runtime Tool Permissions
        </h3>

        <div className="space-y-3">
          {[
            { key: "allow_bash", label: "Bash & Shell Execution", desc: "Allows agent to run build, test, and lint commands in workspace.", icon: Terminal },
            { key: "allow_file_writes", label: "File Modification & Patching", desc: "Allows agent to surgical edit and create source code files.", icon: FileCode2 },
            { key: "allow_dependency_install", label: "Package & Dependency Installation", desc: "Allows npm / pip / cargo dependency downloads inside workspace sandbox.", icon: Download },
            { key: "allow_network_egress", label: "Outbound Network Access", desc: "Allows agent to perform web requests or API calls outside the sandbox.", icon: Globe },
          ].map((item) => {
            const Icon = item.icon;
            const isEnabled = Boolean(policy[item.key as keyof typeof policy]);

            return (
              <div
                key={item.key}
                onClick={() => toggle(item.key as keyof typeof policy)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isEnabled ? "bg-white text-black" : "bg-white/5 text-zinc-500"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[10px] text-zinc-400 font-sans">{item.desc}</div>
                  </div>
                </div>

                <div
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isEnabled ? "bg-emerald-500 justify-end" : "bg-zinc-800 justify-start"
                  }`}
                >
                  <div className="bg-white w-4 h-4 rounded-full shadow-md" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
