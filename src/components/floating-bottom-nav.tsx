"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const checkScrollPosition = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;

      // 1. Top of page safeguard
      if (scrollY < 250) {
        setActiveNav("#demo");
        ticking = false;
        return;
      }

      // 2. Bottom of page safeguard
      if (windowHeight + scrollY >= bodyHeight - 100) {
        setActiveNav("#architecture");
        ticking = false;
        return;
      }

      // 3. Score visible sections
      let bestMatch = "#demo";
      let maxScore = -1;

      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          const visibleHeight = Math.max(
            0,
            Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
          );

          if (visibleHeight > 0) {
            const centerOffset = Math.abs((rect.top + rect.bottom) / 2 - windowHeight / 2);
            const score = visibleHeight / (centerOffset + 100);

            if (score > maxScore) {
              maxScore = score;
              bestMatch = link.href;
            }
          }
        }
      }

      setActiveNav(bestMatch);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId.current = requestAnimationFrame(checkScrollPosition);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkScrollPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
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
    <div className="fixed bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none max-w-[96vw] sm:max-w-max">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex items-center gap-0.5 sm:gap-1.5 p-1 sm:p-2 rounded-full bg-[#06070a]/75 border border-white/20 border-t-white/35 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.4),0_0_35px_rgba(255,255,255,0.06)] font-sans text-xs overflow-x-auto no-scrollbar max-w-full relative"
      >
        {/* Specular Highlight Rim */}
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

        {NAV_LINKS.map((link) => {
          const isActive = activeNav === link.href;
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={cn(
                "relative px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full transition-colors duration-150 text-[11px] sm:text-xs font-bold tracking-tight cursor-pointer whitespace-nowrap z-10 flex items-center gap-1.5 group",
                isActive
                  ? "text-zinc-950"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.08]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="floatingBottomPillActive"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.5),inset_0_1px_0_rgba(255,255,255,0.9)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Icon
                className={cn(
                  "w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 transition-transform duration-150 shrink-0 group-hover:scale-110",
                  isActive ? "text-zinc-950" : "text-zinc-400 group-hover:text-white"
                )}
              />
              <span className="relative z-10 hidden xs:inline sm:inline">{link.name}</span>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
