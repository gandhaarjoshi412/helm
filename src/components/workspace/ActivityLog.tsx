"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Terminal,
  ChevronDown,
  ChevronRight,
  Search,
  FileCode,
  CheckCircle2,
  AlertCircle,
  Clock,
  Play,
  RotateCw,
  Eye,
  FileEdit,
  ShieldAlert,
  ArrowDown,
  Bot,
  Sparkles,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react";
import { AgentEvent } from "@/types/api";
import { cn } from "@/lib/utils";

interface ActivityLogProps {
  events: AgentEvent[];
  isStreaming: boolean;
}

export function ActivityLog({ events, isStreaming }: ActivityLogProps) {
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"all" | "chat">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (autoScroll && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events, autoScroll]);

  const toggleExpand = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const agentMessages = events.filter((e) => e.type === "agent_message" || e.type === "run_completed");

  const getEventIcon = (ev: AgentEvent) => {
    switch (ev.type) {
      case "agent_message":
        return <Bot className="w-4 h-4 text-indigo-400" />;
      case "context_search":
        return <Search className="w-3.5 h-3.5 text-sky-400" />;
      case "file_read":
        return <FileCode className="w-3.5 h-3.5 text-zinc-400" />;
      case "file_modified":
        return <FileEdit className="w-3.5 h-3.5 text-amber-400" />;
      case "tool_started":
      case "tool_completed":
        return <Play className="w-3.5 h-3.5 text-indigo-400" />;
      case "test_started":
      case "test_completed":
        return <Terminal className="w-3.5 h-3.5 text-purple-400" />;
      case "self_correction":
        return <RotateCw className="w-3.5 h-3.5 text-amber-400" />;
      case "approval_required":
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
      case "run_completed":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "run_failed":
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-zinc-500" />;
    }
  };

  const displayedEvents = activeTab === "chat" ? agentMessages : events;

  return (
    <div className="bg-[#0c0d14] border border-white/10 rounded-xl overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 bg-[#11121c] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono font-semibold text-zinc-200">
            AGENT ACTIVITY & REASONING
          </span>

          <div className="flex items-center bg-[#181926] p-0.5 rounded border border-white/5 text-[10px] font-mono ml-2">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "px-2.5 py-0.5 rounded transition-all",
                activeTab === "all" ? "bg-indigo-600 text-white font-medium shadow-sm" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              All Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={cn(
                "px-2.5 py-0.5 rounded transition-all flex items-center gap-1",
                activeTab === "chat" ? "bg-indigo-600 text-white font-medium shadow-sm" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <MessageSquare className="w-3 h-3" />
              <span>Chat & Answers ({agentMessages.length})</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAutoScroll(!autoScroll)}
            className={cn(
              "text-[10px] font-mono px-2 py-1 rounded border transition-colors flex items-center gap-1",
              autoScroll
                ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                : "bg-white/5 text-zinc-500 border-white/5 hover:text-zinc-300"
            )}
          >
            <ArrowDown className="w-3 h-3" />
            <span>Auto-Scroll</span>
          </button>
        </div>
      </div>

      {/* Events List */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs"
        onWheel={() => setAutoScroll(false)}
      >
        {displayedEvents.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-2">
            <Bot className="w-8 h-8 opacity-40 text-indigo-400" />
            <p className="text-xs">No active agent messages yet. Enter an intent to start.</p>
          </div>
        ) : (
          displayedEvents.map((ev) => {
            const isAgentMessage = ev.type === "agent_message";
            const isExpanded = expandedEvents[ev.id];
            const contentText = ev.metadata?.content || ev.summary || "";
            const hasDetails =
              ev.tool_input ||
              ev.tool_output ||
              (ev.metadata && Object.keys(ev.metadata).length > 0 && !isAgentMessage);

            if (isAgentMessage) {
              return (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl bg-gradient-to-br from-[#161828] to-[#111220] border border-indigo-500/30 shadow-lg shadow-indigo-950/20 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-white text-xs tracking-wide">
                        {ev.title || "HELM Agent Response"}
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {ev.phase}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(ev.id, contentText)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 flex items-center gap-1 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === ev.id ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedId === ev.id ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  <div className="text-zinc-200 text-xs leading-relaxed whitespace-pre-wrap font-sans bg-black/30 p-3.5 rounded-lg border border-white/5 selection:bg-indigo-500/30">
                    {contentText}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={ev.id}
                className={cn(
                  "p-3 rounded-lg border transition-all",
                  ev.status === "error" && "bg-rose-950/20 border-rose-500/30",
                  ev.status === "warning" && "bg-amber-950/20 border-amber-500/30",
                  ev.status === "success" && "bg-emerald-950/10 border-emerald-500/20",
                  ev.status === "info" && "bg-[#141520] border-white/5 hover:border-white/10"
                )}
              >
                {/* Event Summary Line */}
                <div
                  className={cn(
                    "flex items-start justify-between gap-2",
                    hasDetails && "cursor-pointer"
                  )}
                  onClick={() => hasDetails && toggleExpand(ev.id)}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 p-1 rounded bg-white/5 border border-white/5">
                      {getEventIcon(ev)}
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-zinc-200">
                          {ev.title || ev.type}
                        </span>
                        <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-white/5 text-zinc-400">
                          {ev.phase}
                        </span>
                        {ev.tool_name && (
                          <span className="text-[10px] text-indigo-400 font-mono">
                            tool: {ev.tool_name}
                          </span>
                        )}
                        {ev.duration_ms !== undefined && ev.duration_ms !== null && (
                          <span className="text-[10px] text-zinc-500">
                            {ev.duration_ms}ms
                          </span>
                        )}
                      </div>

                      {ev.summary && (
                        <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">
                          {ev.summary}
                        </p>
                      )}
                    </div>
                  </div>

                  {hasDetails && (
                    <button className="text-zinc-500 hover:text-zinc-300 mt-1">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>

                {/* Expanded Details / Payloads */}
                {isExpanded && hasDetails && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 space-y-2 text-[11px]">
                    {ev.tool_input && (
                      <div>
                        <span className="text-zinc-500 font-semibold text-[10px]">
                          INPUT:
                        </span>
                        <pre className="bg-[#090a10] border border-white/5 p-2 rounded text-indigo-300 overflow-x-auto mt-1 max-h-40">
                          {JSON.stringify(ev.tool_input, null, 2)}
                        </pre>
                      </div>
                    )}

                    {ev.tool_output && (
                      <div>
                        <span className="text-zinc-500 font-semibold text-[10px]">
                          OUTPUT:
                        </span>
                        <pre className="bg-[#090a10] border border-white/5 p-2 rounded text-emerald-300 overflow-x-auto mt-1 max-h-60">
                          {typeof ev.tool_output === "string"
                            ? ev.tool_output
                            : JSON.stringify(ev.tool_output, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}
