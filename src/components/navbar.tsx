"use client";

import React, { useEffect, useState } from "react";
import { HelmMark } from "./ui/helm-mark";
import { Button } from "./ui/button";
import { StatusDot } from "./ui/status-dot";
import { Menu, X, Command, ArrowRight } from "lucide-react";
import { GithubIcon } from "./ui/icons";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenAccessModal: () => void;
  onOpenCommandPalette: () => void;
}

const REPOSITORY_URL = "https://github.com/gandhaarjoshi412/helm";

export function Navbar({
  onOpenAccessModal,
  onOpenCommandPalette,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const navLinks = [
    { name: "Product", href: "#demo" },
    { name: "Workflow", href: "#agent" },
    { name: "Brain", href: "#brain" },
    { name: "Control", href: "#autonomy" },
    { name: "Mobile", href: "#mobile" },
    { name: "Technology", href: "#architecture" },
  ];

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-[#08090b]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2.5"
          : "bg-transparent py-4 border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#top"
          onClick={(event) => handleNavClick(event, "#top")}
          className="flex items-center gap-3 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
          aria-label="HELM home"
        >
          <div className="p-1 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-sky-400/40 transition-colors">
            <HelmMark size={22} glow />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base">HELM</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <StatusDot status="healthy" size="sm" pulse={false} />
                PROTOTYPE
              </span>
            </div>
            <span className="hidden md:block text-[9px] font-mono tracking-wider text-zinc-400 -mt-0.5">
              AI DEVELOPER COMMAND CENTER
            </span>
          </div>
        </a>

        <nav
          className="hidden lg:flex items-center gap-1 rounded-full px-3 py-1 bg-white/[0.03] border border-white/[0.06] backdrop-blur-md"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.08] text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            title="Open command palette (Ctrl/Cmd + K)"
            aria-label="Open command palette"
          >
            <Command className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden md:inline">⌘K / Ctrl K</span>
            <span className="md:hidden">⌘K</span>
          </button>

          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            aria-label="Open HELM GitHub repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <Button variant="glass" size="sm" onClick={onOpenAccessModal} className="text-xs">
            Request Access
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenAccessModal}
            className="text-xs"
            iconRight={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Join the Build
          </Button>
        </div>

        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCommandPalette}
            className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            aria-label="Open command palette"
          >
            <Command className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="sm:hidden border-b border-white/[0.1] bg-[#0c0e13]/98 backdrop-blur-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col space-y-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className="px-3 py-2 text-sm font-medium text-zinc-200 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 text-sm text-zinc-200 hover:bg-white/[0.05] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              View Repository
            </a>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccessModal();
              }}
              className="w-full justify-center"
            >
              Join the Build
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
