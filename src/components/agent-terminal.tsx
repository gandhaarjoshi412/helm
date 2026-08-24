"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Shield,
  Activity,
  CheckCircle2,
  FileCode,
  Search,
  Check,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { StatusDot } from "./ui/status-dot";
import { FloatingCodeBackground } from "./ui/floating-code-background";
import { cn } from "@/lib/utils";

interface LogEntry {
  time: string;
  category: "CORE" | "BRAIN" | "AST" | "GIT" | "DOCS" | "PATCH" | "TEST" | "GATE";
  message: string;
  status?: "pending" | "success" | "active";
  highlight?: boolean;
}

const fullLogs: LogEntry[] = [
  { time: "10:42:13", category: "CORE", message: "Agent session initialized in ephemeral sandbox (ID: sbx_9942a)", status: "success" },
  { time: "10:42:14", category: "BRAIN", message: "Indexing repository AST & topology (342 source files loaded in memory)", status: "success" },
  { time: "10:42:17", category: "AST", message: "Inspecting src/services/payment.ts & call graph references", status: "success" },
  { time: "10:42:21", category: "GIT", message: "Reading recent commit history [commit #a84f2e1: 'refactor: checkout latency tuning']", status: "success" },
  { time: "10:42:28", category: "DOCS", message: "Autonomous search: Stripe API documentation v14 [HTTP 408 & Idempotency Keys]", status: "success" },
  { time: "10:42:34", category: "CORE", message: "Root cause identified: unhandled timeout in charges.create without backoff", highlight: true, status: "success" },
  { time: "10:42:38", category: "PATCH", message: "Preparing AST patch across 3 files + generating unit tests in tests/payment.test.ts", status: "success" },
  { time: "10:42:44", category: "TEST", message: "Executing sandbox test runner: npm test -- --coverage", status: "active" },
  { time: "10:42:49", category: "TEST", message: "✓ 47 unit & integration tests passed in 312ms (0 failures, 100% coverage)", status: "success", highlight: true },
  { time: "10:42:52", category: "GATE", message: "Action requires developer approval [Deploy boundary level: GUIDED]", status: "pending", highlight: true },
];

export function AgentTerminal() {
  const [visibleCount, setVisibleCount] = useState<number>(fullLogs.length);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1000);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= fullLogs.length) {
          // Restart loop after small pause
          return 1;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const filteredLogs = fullLogs.slice(0, visibleCount).filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "TEST") return item.category === "TEST";
    if (filter === "GIT") return item.category === "GIT";
    if (filter === "DOCS") return item.category === "DOCS";
    return true;
  });

  return (
    <section id="agent" className="relative py-28 bg-black dark:bg-black light:bg-slate-50 border-t border-white/[0.06] dark:border-white/[0.06] light:border-slate-200 overflow-hidden">
      {/* Background Aurora Glow */}
      <div className="absolute top-0 left-1/3 w-[750px] h-[350px] bg-gradient-to-b from-white/[0.04] via-zinc-400/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-10">
          <Badge variant="mono" size="sm" className="font-mono">
            REALTIME TELEMETRY
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 leading-tight">
            Live Agent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-zinc-400">
              Terminal Stream.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-slate-600 leading-relaxed font-normal">
            Every step an agent takes is streamed with timestamped precision. Watch repository indexing, call-stack tracing, live documentation retrieval, and test execution happen in real time.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="rounded-2xl bg-[#0a0c10] border border-white/[0.1] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden relative font-mono">
          {/* Scanline CRT overlay */}
          <div className="scanline" />

          {/* Terminal Window Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.08] bg-[#07080c]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 border border-rose-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 border border-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-emerald-500/40" />
              </div>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-zinc-200" />
                <span className="font-bold text-white">kodium-session-843b</span>
                <span className="text-zinc-600">::</span>
                <span className="text-zinc-400 text-[11px]">telemetry.stream</span>
              </div>
            </div>

            {/* Filter and Playback Controls */}
            <div className="flex items-center gap-2 text-xs">
              <div className="hidden sm:flex items-center gap-1 bg-zinc-900/80 p-1 rounded-lg border border-white/[0.06]">
                {["ALL", "TEST", "GIT", "DOCS"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-2 py-0.5 rounded text-[11px] transition-colors",
                      filter === f
                        ? "bg-white/10 text-white font-medium"
                        : "text-zinc-400 hover:text-zinc-200"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-2 py-1 rounded bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-amber-400" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-400" />
                      <span>Stream</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSpeed(speed === 1000 ? 400 : 1000)}
                  className="px-2 py-1 rounded bg-zinc-900 border border-white/10 text-zinc-400 hover:text-zinc-200 text-[11px]"
                >
                  {speed === 1000 ? "1x" : "2.5x"}
                </button>

                <button
                  onClick={() => {
                    setVisibleCount(1);
                    setIsPlaying(true);
                  }}
                  className="p-1.5 rounded bg-zinc-900 border border-white/10 text-zinc-400 hover:text-zinc-200"
                  title="Restart stream"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Output Content */}
          <div className="p-4 sm:p-6 bg-[#08090d] min-h-[380px] space-y-2.5 text-xs text-zinc-300">
            {filteredLogs.map((log, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-start gap-3 py-1 px-2.5 rounded-md transition-all duration-200",
                  log.highlight
                    ? "bg-white/10 border border-white/20 text-white font-semibold"
                    : "hover:bg-white/[0.02]"
                )}
              >
                {/* Time */}
                <span className="text-zinc-400 text-[11px] shrink-0 select-none">
                  [{log.time}]
                </span>

                {/* Category Pill */}
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 border select-none",
                    log.category === "CORE" && "bg-white/10 text-white border-white/20",
                    log.category === "BRAIN" && "bg-purple-500/10 text-purple-400 border-purple-500/20",
                    log.category === "AST" && "bg-zinc-800 text-zinc-200 border-white/20",
                    log.category === "GIT" && "bg-zinc-800 text-zinc-300 border-white/10",
                    log.category === "DOCS" && "bg-zinc-800 text-zinc-200 border-white/10",
                    log.category === "PATCH" && "bg-amber-500/10 text-amber-400 border-amber-500/20",
                    log.category === "TEST" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    log.category === "GATE" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  )}
                >
                  {log.category}
                </span>

                {/* Message */}
                <span className="flex-1 leading-relaxed text-[12px]">
                  {log.message}
                </span>

                {/* Status Indicator */}
                <div className="shrink-0 pt-0.5">
                  {log.status === "success" && (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  {log.status === "active" && (
                    <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
                  )}
                  {log.status === "pending" && (
                    <StatusDot status="pending" size="sm" />
                  )}
                </div>
              </div>
            ))}

            {/* Blinking Cursor Prompt */}
            <div className="flex items-center gap-2 pt-2 px-2.5 text-zinc-400 text-xs select-none">
              <span className="text-emerald-400">kodium@agent-sandbox:~$</span>
              <span className="w-2 h-4 bg-white inline-block animate-pulse" />
            </div>
          </div>

          {/* Terminal Bottom Telemetry Footer */}
          <div className="px-4 py-2.5 border-t border-white/[0.06] bg-[#07080c] flex flex-wrap items-center justify-between text-[11px] text-zinc-400">
            <div className="flex items-center gap-4">
              <span>Sandbox Status: <strong className="text-emerald-400">ISOLATED</strong></span>
              <span>Events: <strong className="text-zinc-300">{visibleCount}/{fullLogs.length}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-zinc-200" />
              <span>Cryptographic Audit Trail Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
