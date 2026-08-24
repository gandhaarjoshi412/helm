"use client";

import React, { useState, useEffect } from "react";
import { KodiumMark } from "./ui/kodium-mark";
import { Button } from "./ui/button";
import { StatusDot } from "./ui/status-dot";
import { Menu, X, Command, ArrowRight } from "lucide-react";
import { GithubIcon } from "./ui/icons";
import { ThemeToggle } from "./ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-black/90 dark:bg-black/90 light:bg-slate-50/90 backdrop-blur-xl border-b border-white/[0.08] dark:border-white/[0.08] light:border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5"
          : "bg-transparent py-4 border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Descriptor - Modernized Luxury Lockup */}
        <a
          href="#"
          className="flex items-center gap-3.5 group focus-visible:outline-none select-none"
        >
          {/* Minimal Squircle Logo Shield */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl bg-white/[0.04] border border-white/10 transition-all duration-300 flex items-center justify-center shrink-0"
          >
            <KodiumMark size={24} glow />
          </motion.div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              {/* Brand Name */}
              <span className="font-extrabold tracking-wider text-white text-lg font-sans transition-colors duration-300">
                KODIUM
              </span>

              {/* Operational Status Badge */}
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold tracking-widest bg-white/[0.04] text-zinc-300 border border-white/10 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                OPERATIONAL
              </span>
            </div>

            {/* Subtitle tag */}
            <span className="hidden md:flex items-center gap-1.5 text-[9px] font-mono tracking-[0.16em] uppercase font-bold text-zinc-400 -mt-0.5">
              AI DEVELOPER COMMAND CENTER
            </span>
          </div>
        </a>

        {/* Right Action Items */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] dark:bg-white/[0.06] light:bg-slate-200 hover:bg-white/[0.14] dark:hover:bg-white/[0.14] text-zinc-300 dark:text-zinc-300 light:text-slate-700 hover:text-white border border-white/20 dark:border-white/20 light:border-slate-300 text-xs font-mono transition-all backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer"
            title="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-300 light:text-slate-600" />
            <span>⌘K</span>
          </button>

          {/* GitHub link with Waving Octocat Animation */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center p-2.5 rounded-full bg-white/[0.06] dark:bg-white/[0.06] light:bg-slate-200 text-zinc-300 dark:text-zinc-300 light:text-slate-800 hover:text-white dark:hover:text-white light:hover:text-slate-950 border border-white/20 dark:border-white/20 light:border-slate-300 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all cursor-pointer group"
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
          <ThemeToggle />
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
        <div className="sm:hidden border-b border-white/[0.1] bg-[#0c0e13]/98 dark:bg-[#0c0e13]/98 light:bg-slate-100/98 backdrop-blur-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
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
    </motion.header>
  );
}

