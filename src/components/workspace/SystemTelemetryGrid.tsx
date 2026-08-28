"use client";

import React, { useState, useEffect } from "react";
import { Gauge, MemoryStick, Network, ShieldCheck } from "lucide-react";
import { checkBackendHealth } from "@/lib/api";

export function SystemTelemetryGrid() {
  const [latencyMs, setLatencyMs] = useState<number | null>(124);
  const [isHealthy, setIsHealthy] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const pingBackend = async () => {
      const start = performance.now();
      try {
        await checkBackendHealth();
        const duration = Math.round(performance.now() - start);
        if (mounted) {
          setLatencyMs(duration);
          setIsHealthy(true);
        }
      } catch {
        if (mounted) {
          setIsHealthy(false);
          setLatencyMs(null);
        }
      }
    };

    pingBackend();
    const interval = setInterval(pingBackend, 8000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const telemetry = [
    {
      title: "CPU LOAD",
      value: "64%",
      change: "+5%",
      changeType: "negative",
      progress: 64,
      color: "bg-white",
      icon: Gauge,
      iconColor: "text-white",
    },
    {
      title: "RAM USAGE",
      value: "28GB",
      subtext: "/ 32GB",
      progress: 88,
      color: "bg-white",
      icon: MemoryStick,
      iconColor: "text-white",
    },
    {
      title: "API LATENCY",
      value: latencyMs !== null ? `${latencyMs}ms` : "Offline",
      change: isHealthy ? "-12ms" : "Down",
      changeType: isHealthy ? "positive" : "negative",
      progress: latencyMs ? Math.min(100, Math.max(10, Math.round(latencyMs / 3))) : 0,
      color: "bg-emerald-400",
      icon: Network,
      iconColor: "text-emerald-400",
    },
    {
      title: "ERROR RATE",
      value: isHealthy ? "0.02%" : "Err 503",
      change: isHealthy ? "stable" : "high",
      changeType: isHealthy ? "neutral" : "negative",
      progress: isHealthy ? 2 : 90,
      color: "bg-emerald-400",
      icon: ShieldCheck,
      iconColor: isHealthy ? "text-emerald-400" : "text-rose-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
      {telemetry.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="glass-panel p-3.5 rounded-xl flex flex-col gap-1 border border-white/10"
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-semibold">
                {item.title}
              </span>
              <Icon className={`w-4 h-4 ${item.iconColor}`} />
            </div>

            <div className="flex items-end gap-2 my-0.5">
              <span className={`text-xl font-bold ${item.iconColor}`}>{item.value}</span>
              {item.subtext && (
                <span className="text-[10px] text-zinc-400 mb-0.5">{item.subtext}</span>
              )}
              {item.change && (
                <span
                  className={`text-[10px] mb-0.5 ${
                    item.changeType === "positive" || item.changeType === "neutral"
                      ? "text-emerald-400"
                      : "text-rose-400"
                  }`}
                >
                  {item.change}
                </span>
              )}
            </div>

            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color}`}
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
