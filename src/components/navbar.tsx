"use client";

import React, { useState, useEffect } from "react";
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

export function Navbar({ onOpenAccessModal, onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Product", href: "#demo" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Brain", href: "#brain" },
    { name: "Agent", href: "#agent" },
    { name: "Mobile", href: "#mobile" },
    { name: "Technology", href: "#architecture" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
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
        {/* Brand Logo & Descriptor */}
        <a
          href="#"
          className="flex items-center gap-3 group focus-visible:outline-none"
        >
          <div className="p-1 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-sky-400/40 transition-colors">
            <HelmMark size={22} glow />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base">
                HELM
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <StatusDot status="healthy" size="sm" pulse={false} />
                OPERATIONAL
              </span>
            </div>
            <span className="hidden md:block text-[9px] font-mono tracking-wider text-zinc-400 -mt-0.5">
              AI DEVELOPER COMMAND CENTER
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full px-3 py-1 bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Items */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-white/[0.08] text-xs font-mono transition-colors"
            title="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-zinc-400" />
            <span>⌘K</span>
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-colors"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Request Access Button */}
          <Button
            variant="glass"
            size="sm"
            onClick={onOpenAccessModal}
            className="text-xs"
          >
            Request Access
          </Button>

          {/* Primary CTA */}
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

        {/* Mobile menu hamburger button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCommandPalette}
            className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300"
            aria-label="Open command palette"
          >
            <Command className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/[0.1] bg-[#0c0e13]/98 backdrop-blur-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-zinc-200 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
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
            <Button
              variant="glass"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccessModal();
              }}
              className="w-full justify-center"
            >
              Request Access
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
