"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  ArrowDownCircle,
  Trash2,
  Activity,
  Terminal as TerminalIcon,
} from "lucide-react";
import { AgentEvent } from "@/types/api";
import { cn } from "@/lib/utils";

interface ActivityLogProps {
  events: AgentEvent[];
  isStreaming?: boolean;
}

export function ActivityLog({ events, isStreaming }: ActivityLogProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [events, autoScroll]);

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-white/10 font-sans flex flex-col h-[480px]">
      {/* Panel Header */}
      <div className="p-3 border-b border-white/10 bg-[#050508] flex justify-between items-center">
        <h3 className="text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-2 font-bold">
          <Brain className="w-4 h-4 text-white" />
          <span>Agent Activity &amp; Reasoning</span>
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 bg-white/10 text-white text-[9px] rounded-lg border border-white/20 font-bold uppercase tracking-wider">
            {isStreaming ? "LIVE" : "STANDBY"}
          </span>
        </div>
      </div>

      {/* Terminal Feed */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-3 bg-[#050508] text-[11px] leading-relaxed flex flex-col gap-1 terminal-scroll"
      >
        {events.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-500 font-mono space-y-2 p-6 text-center select-none">
            <Brain className="w-8 h-8 text-zinc-600 opacity-40 mb-1" />
            <div className="text-xs font-bold text-zinc-300 font-mono">Agent Stream Standby</div>
            <p className="text-[11px] text-zinc-500 max-w-sm leading-relaxed font-sans">
              Dispatch an autonomous task to stream live agent reasoning, file index telemetry, test execution logs, and AST patch generation.
            </p>
          </div>
        ) : (
          events.map((ev, i) => {
            const timeStr = ev.timestamp
              ? new Date(ev.timestamp).toTimeString().split(" ")[0]
              : "00:00:00";
            return (
              <div key={i} className="flex gap-2 py-0.5 font-mono">
                <span className="text-zinc-500 shrink-0 font-bold">[{timeStr}]</span>
                <span
                  className={cn(
                    ev.type === "agent_message" && "text-white font-bold",
                    ev.type === "tool_call" && "text-zinc-300",
                    ev.type === "tool_result" && "text-emerald-400",
                    ev.type === "phase_change" && "text-white font-bold uppercase",
                    ev.type === "error" && "text-rose-400 font-bold"
                  )}
                >
                  {ev.summary || ev.type}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Panel Footer Controls */}
      <div className="p-2 border-t border-white/10 bg-[#050508] flex justify-between items-center text-[10px]">
        <button className="flex items-center gap-1.5 text-zinc-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer">
          <FileCode2 className="w-3.5 h-3.5 text-white" />
          <span>Diff View</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={cn(
              "p-1.5 rounded-lg transition-colors cursor-pointer",
              autoScroll ? "text-white bg-white/10 border border-white/20" : "text-zinc-500 hover:text-white"
            )}
            title="Auto-scroll"
          >
            <ArrowDownCircle className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors rounded-lg cursor-pointer"
            title="Clear Logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
