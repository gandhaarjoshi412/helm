"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
}

const navLinks: NavItem[] = [
  { name: "Product", href: "#demo" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Brain", href: "#brain" },
  { name: "Agent", href: "#agent" },
  { name: "Mobile", href: "#mobile" },
  { name: "Technology", href: "#architecture" },
];

export function FloatingBottomNav() {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("#demo");

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.substring(1));
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0.25,
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentDisplayHref = hoveredHref || activeSection;

  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 px-3 max-w-[95vw] pointer-events-auto">
      {/* Outer Glassmorphic Container with Translucency & Specular Highlights */}
      <div className="relative flex items-center gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-zinc-950/40 dark:bg-zinc-950/40 light:bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 dark:border-white/20 light:border-slate-300 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.3)] overflow-hidden">
        {/* Top Rim Glass Sheen Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {/* Navigation Links */}
        {navLinks.map((link) => {
          const isCurrentActive = currentDisplayHref === link.href;

          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={() => setHoveredHref(link.href)}
              onMouseLeave={() => setHoveredHref(null)}
              className={cn(
                "relative px-4 sm:px-5 py-2 text-sm sm:text-base font-medium tracking-wide transition-all duration-300 cursor-pointer rounded-full select-none flex items-center justify-center group z-10",
                isCurrentActive
                  ? "text-white dark:text-white light:text-slate-900 font-semibold drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
                  : "text-zinc-400 dark:text-zinc-400 light:text-slate-600 hover:text-zinc-100 dark:hover:text-zinc-100 light:hover:text-slate-900"
              )}
            >
              <span className="relative z-10">{link.name}</span>

              {/* Animated Glass Capsule Background Pill */}
              {isCurrentActive && (
                <motion.div
                  layoutId="activeBottomNavGlassCapsule"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-full bg-white/[0.14] dark:bg-white/[0.14] light:bg-slate-200/80 border border-white/30 dark:border-white/30 light:border-slate-400/50 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.4)] -z-0"
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
