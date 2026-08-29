"use client";

import React, { useState, useEffect } from "react";
import { FileText, RefreshCw, Filter, Trash2, Download } from "lucide-react";
import { fetchSystemLogs } from "@/lib/api";

export function SystemLogsView() {
  const [logs, setLogs] = useState<Array<{ id: string; level: string; component: string; message: string; timestamp: string }>>([]);
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSystemLogs(levelFilter);
      setLogs(data);
    } catch (err) {
      console.error("Failed to load logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    fetchSystemLogs(levelFilter)
      .then((data) => {
        if (active) setLogs(data);
      })
      .catch((err) => {
        console.error("Failed to load logs:", err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    const timer = setInterval(() => {
      fetchSystemLogs(levelFilter)
        .then((data) => {
          if (active) setLogs(data);
        })
        .catch((err) => {
          console.error("Failed to load logs:", err);
        });
    }, 8000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [levelFilter]);

  const handleDownload = () => {
    const text = logs.map((l) => `[${l.timestamp}] [${l.level}] [${l.component}] ${l.message}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `helm-system-logs-${new Date().toISOString().slice(0, 10)}.log`;
    a.click();
  };

  return (
    <div className="space-y-4 font-mono max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#07080c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-white" />
            <h2 className="text-lg font-bold text-white tracking-tight">System Runtime Logs</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-white font-bold">
              {logs.length} Lines
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            Live execution stream &amp; kernel traces across HELM API &amp; AST Workers
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Level Filter */}
          <div className="flex items-center bg-black/60 p-1 rounded-xl border border-white/10 text-xs">
            {["ALL", "INFO", "STREAM", "WARN", "ERROR"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                  levelFilter === lvl ? "bg-white text-black shadow-md" : "text-zinc-400 hover:text-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <button
            onClick={loadLogs}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Refresh Logs"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
          </button>

          <button
            onClick={handleDownload}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            title="Export Logs"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Log Console */}
      <div className="p-4 rounded-2xl bg-[#040508] border border-white/10 shadow-2xl space-y-2 min-h-[450px] overflow-y-auto terminal-scroll">
        {logs.length === 0 ? (
          <div className="py-20 text-center text-zinc-500 text-xs">
            No system log lines available.
          </div>
        ) : (
          logs.map((log) => {
            const isError = log.level === "ERROR";
            const isWarn = log.level === "WARN";
            const isStream = log.level === "STREAM";

            return (
              <div
                key={log.id}
                className="flex items-start gap-3 text-xs py-1.5 px-2 rounded hover:bg-white/[0.03] transition-colors"
              >
                <span className="text-zinc-500 text-[10px] shrink-0 pt-0.5">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 uppercase ${
                    isError
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      : isWarn
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : isStream
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-white/10 text-zinc-300 border border-white/10"
                  }`}
                >
                  {log.level}
                </span>
                <span className="text-zinc-400 font-bold shrink-0">[{log.component}]</span>
                <span className="text-zinc-200 leading-relaxed break-all font-mono">{log.message}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
