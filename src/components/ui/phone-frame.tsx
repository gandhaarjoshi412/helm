import React from "react";
import { cn } from "@/lib/utils";
import { Wifi, Battery, Signal } from "lucide-react";
import { StatusDot } from "./status-dot";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  projectName?: string;
  statusText?: string;
  time?: string;
}

export function PhoneFrame({
  children,
  className,
  statusText = "LIVE",
  time = "10:42",
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto rounded-[44px] p-[10px] bg-gradient-to-b from-[#2a2e39] via-[#171a22] to-[#101217] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)]",
        className
      )}
      style={{ width: "320px", minHeight: "560px" }}
    >
      {/* Side physical buttons */}
      <div className="absolute -left-[12px] top-[100px] w-[3px] h-[26px] bg-[#2d323e] rounded-l-sm border-l border-white/20" />
      <div className="absolute -left-[12px] top-[140px] w-[3px] h-[44px] bg-[#2d323e] rounded-l-sm border-l border-white/20" />
      <div className="absolute -left-[12px] top-[195px] w-[3px] h-[44px] bg-[#2d323e] rounded-l-sm border-l border-white/20" />
      <div className="absolute -right-[12px] top-[130px] w-[3px] h-[60px] bg-[#2d323e] rounded-r-sm border-r border-white/20" />

      {/* Screen container */}
      <div className="relative rounded-[36px] bg-[#090b0e] overflow-hidden border border-white/[0.08] flex flex-col h-full min-h-[540px]">
        {/* Top Status Bar with Dynamic Island */}
        <div className="pt-3 px-5 pb-2 flex items-center justify-between text-[11px] text-zinc-400 select-none bg-zinc-950/80 z-20">
          <span className="font-semibold text-zinc-200">{time}</span>

          {/* Dynamic Island Pill */}
          <div className="w-[84px] h-[20px] bg-black rounded-full flex items-center justify-between px-2 shadow-inner border border-white/[0.08]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#151922] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-sky-400" />
            </div>
            <div className="flex items-center gap-1">
              <StatusDot status="healthy" size="sm" pulse={false} />
              <span className="text-[9px] font-mono text-zinc-400">{statusText}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5 text-zinc-200" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 flex flex-col overflow-y-auto relative z-10">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="py-2 flex justify-center bg-zinc-950/90 z-20">
          <div className="w-32 h-1 bg-zinc-700/80 rounded-full" />
        </div>
      </div>
    </div>
  );
}
