import React from "react";
import { cn } from "@/lib/utils";
import { Wifi, Signal } from "lucide-react";
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
    <div className={cn("w-full sm:w-[340px] mx-auto", className)}>
      {/* Desktop & Tablet: Full Hardware Simulated Phone Chassis */}
      <div
        className="hidden sm:block relative mx-auto rounded-[46px] p-[8px] bg-gradient-to-b from-zinc-700 via-zinc-850 to-zinc-950 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95)] border border-white/20 ring-1 ring-white/10 transition-all duration-300 select-none min-h-[680px]"
        style={{ width: "340px" }}
      >
        {/* Precision Android Side Physical Hardware Buttons (Right Side Power & Volume) */}
        <div className="absolute -right-[4px] top-[140px] w-[4px] h-[44px] bg-zinc-600 rounded-r-md border-r border-white/30 shadow-md" />
        <div className="absolute -right-[4px] top-[200px] w-[4px] h-[88px] bg-zinc-600 rounded-r-md border-r border-white/30 shadow-md" />

        {/* Screen container */}
        <div className="relative rounded-[38px] bg-black overflow-hidden border border-white/10 flex flex-col h-full min-h-[664px] shadow-2xl">
          {/* Screen Glass Sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-transparent z-20" />

          {/* Android Punch-Hole Camera (Center Top) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-3.5 w-3.5 h-3.5 rounded-full bg-[#050608] border border-white/20 flex items-center justify-center z-40 shadow-inner">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
          </div>

          {/* Android Status Bar */}
          <div className="pt-3 px-5 pb-1 flex items-center justify-between text-[11px] text-zinc-400 select-none bg-black z-30 font-mono relative">
            <div className="flex items-center gap-2 pl-1">
              <span className="font-bold text-white text-[12px] font-sans tracking-tight">{time}</span>
              <div className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded-full border border-white/10 text-[9px] text-zinc-300 font-bold">
                <StatusDot status="healthy" size="sm" pulse={false} />
                <span>{statusText}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-300 pr-1">
              <span className="text-[9.5px] font-bold text-zinc-300 font-sans tracking-tighter">5G</span>
              <Signal className="w-3 h-3 text-white" />
              <Wifi className="w-3 h-3 text-white" />
              <span className="text-[10px] font-bold text-zinc-200">98%</span>
              <div className="w-4 h-2 rounded-[2px] border border-white/80 p-[1px] flex items-center">
                <div className="w-full h-full bg-white rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen Content Area */}
          <div className="flex-1 flex flex-col overflow-y-auto relative z-10 font-mono pt-4">
            {children}
          </div>

          {/* Android Bottom Navigation Bar / Pill */}
          <div className="py-2.5 flex justify-center bg-black z-30">
            <div className="w-28 h-[4px] bg-white/70 rounded-full shadow-xs" />
          </div>
        </div>
      </div>

      {/* Mobile / Android Devices: Native Glass Card View (Phone Shell Removed) */}
      <div className="block sm:hidden w-full rounded-2xl bg-zinc-950/90 border border-white/15 p-3 shadow-2xl font-mono">
        {children}
      </div>
    </div>
  );
}
