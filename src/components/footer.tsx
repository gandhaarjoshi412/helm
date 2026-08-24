import React from "react";
import { KodiumMark } from "./ui/kodium-mark";
import { StatusDot } from "./ui/status-dot";
import { GithubIcon } from "./ui/icons";

export function Footer() {
  return (
    <footer className="relative py-12 bg-black border-t border-white/[0.06] text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/[0.06]">
          {/* Brand & Mission */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                <KodiumMark size={20} glow />
              </div>
              <span className="font-extrabold text-white tracking-wider text-base">KODIUM</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">AI DEVELOPER COMMAND CENTER</span>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-600 font-sans max-w-sm">
              Your development environment, under control. Persistent codebase intelligence, autonomous agent orchestration, and remote ship sovereignty.
            </p>
          </div>

          {/* Clean Anchor Navigation Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a href="#demo" className="hover:text-white transition-colors">
              Product
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              Technology
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:contact@kodium.dev"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom Metadata & Hackathon Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <StatusDot status="healthy" size="sm" pulse={false} />
            <span>Kodium Engine Core v0.9.4</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400 font-semibold">Built for iQOO Hackathon 2026</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <span>© {new Date().getFullYear()} Kodium Systems. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
