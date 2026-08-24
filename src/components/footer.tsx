import React from "react";
import { HelmMark } from "./ui/helm-mark";
import { StatusDot } from "./ui/status-dot";
import { Terminal } from "lucide-react";
import { GithubIcon } from "./ui/icons";

export function Footer() {
  return (
    <footer className="relative py-12 bg-[#050608] border-t border-white/[0.06] text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/[0.06]">
          {/* Brand & Mission */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <HelmMark size={20} glow />
              <span className="font-bold text-white tracking-tight text-sm">HELM</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[11px] text-zinc-400">AI DEVELOPER COMMAND CENTER</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans max-w-sm">
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
              href="mailto:contact@helm.dev"
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
            <span>HELM Engine Core v0.9.4</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400 font-semibold">Built for iQOO Hackathon 2026</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <span>© {new Date().getFullYear()} HELM Systems. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
