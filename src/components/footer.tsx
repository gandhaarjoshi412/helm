import React from "react";
import { HelmMark } from "./ui/helm-mark";
import { StatusDot } from "./ui/status-dot";
import { GithubIcon } from "./ui/icons";

const REPOSITORY_URL = "https://github.com/gandhaarjoshi412/helm";

export function Footer() {
  return (
    <footer className="relative py-12 bg-[#050608] border-t border-white/[0.06] text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/[0.06]">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <HelmMark size={20} glow />
              <span className="font-bold text-white tracking-tight text-sm">HELM</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[11px] text-zinc-400">AI DEVELOPER COMMAND CENTER</span>
            </div>
            <p className="text-xs text-zinc-400 font-sans max-w-sm">
              A hackathon prototype for controlling software-development workflows
              from desktop and mobile through one command surface.
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
            aria-label="Footer navigation"
          >
            <a href="#demo" className="hover:text-white transition-colors">
              Product
            </a>
            <a href="#agent" className="hover:text-white transition-colors">
              Workflow
            </a>
            <a href="#architecture" className="hover:text-white transition-colors">
              Technology
            </a>
            <a href="#mobile" className="hover:text-white transition-colors">
              Mobile
            </a>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Repository</span>
            </a>
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <StatusDot status="healthy" size="sm" pulse={false} />
            <span>Interactive prototype</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400 font-semibold">Built for iQOO Hackathon 2026</span>
          </div>

          <div className="text-center sm:text-right text-zinc-500">
            © {new Date().getFullYear()} HELM.
          </div>
        </div>
      </div>
    </footer>
  );
}
