"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Workflow, Brain, Bot, Smartphone, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Product", href: "#demo", icon: Sparkles },
  { name: "How it works", href: "#how-it-works", icon: Workflow },
  { name: "Brain", href: "#brain", icon: Brain },
  { name: "Agent", href: "#agent", icon: Bot },
  { name: "Mobile", href: "#mobile", icon: Smartphone },
  { name: "Technology", href: "#architecture", icon: Cpu },
];

export function FloatingBottomNav() {
  const [activeNav, setActiveNav] = useState<string>("#demo");

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.substring(1));
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-25% 0px -40% 0px",
      threshold: 0.15,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveNav(href);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none max-w-[96vw] sm:max-w-max">
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-[#06070a]/90 border border-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-x-auto no-scrollbar max-w-full relative">
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {NAV_LINKS.map((link) => {
          const isActive = activeNav === link.href;
          const Icon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={cn(
                "relative px-3 sm:px-4 py-2 rounded-full transition-all duration-200 text-xs font-bold tracking-tight cursor-pointer whitespace-nowrap flex items-center gap-1.5 group select-none",
                isActive
                  ? "bg-white text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon
                className={cn(
                  "w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-200 shrink-0",
                  isActive ? "text-zinc-950" : "text-zinc-400 group-hover:text-white"
                )}
              />
              <span className="hidden xs:inline sm:inline">{link.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
