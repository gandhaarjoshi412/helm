"use client";

import React, { useState, useEffect } from "react";
import { KodiumMark } from "./ui/kodium-mark";
import { Button } from "./ui/button";
import { StatusDot } from "./ui/status-dot";
import { Menu, X, Command, ArrowRight, User, LogOut, Key, ChevronDown, Sparkles, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { GithubIcon } from "./ui/icons";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth-context";

interface NavbarProps {
  onOpenAccessModal: () => void;
  onOpenCommandPalette: () => void;
  onOpenAuthModal: () => void;
}

export function Navbar({ onOpenAccessModal, onOpenCommandPalette, onOpenAuthModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { user, signOut, deleteAccount } = useAuth();

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

  const getDisplayName = () => {
    if (!user) return "";
    const name = user.user_metadata?.full_name;
    if (name) return name;
    if (user.email) return user.email.split("@")[0];
    return "Developer";
  };

  const getInitial = () => {
    const name = getDisplayName();
    return name.charAt(0).toUpperCase();
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
        {/* Brand Logo & Descriptor */}
        <a
          href="#"
          className="flex items-center gap-3.5 group focus-visible:outline-none select-none"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl bg-white/[0.04] border border-white/10 transition-all duration-300 flex items-center justify-center shrink-0"
          >
            <KodiumMark size={24} glow />
          </motion.div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold tracking-wider text-white text-lg font-sans transition-colors duration-300">
                KODIUM
              </span>

              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold tracking-widest bg-white/[0.04] text-zinc-300 border border-white/10 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {user ? "AUTHENTICATED" : "OPERATIONAL"}
              </span>
            </div>

            <span className="hidden md:flex items-center gap-1.5 text-[9px] font-mono tracking-[0.16em] uppercase font-bold text-zinc-400 -mt-0.5">
              AI DEVELOPER COMMAND CENTER
            </span>
          </div>
        </a>

        {/* Right Action Items */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] dark:bg-white/[0.06] light:bg-slate-200 hover:bg-white/[0.14] dark:hover:bg-white/[0.14] text-zinc-300 dark:text-zinc-300 light:text-slate-700 hover:text-white border border-white/20 dark:border-white/20 light:border-slate-300 text-xs font-mono transition-all backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer"
            title="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-300 light:text-slate-600" />
            <span>⌘K</span>
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center p-2.5 rounded-full bg-white/[0.06] dark:bg-white/[0.06] light:bg-slate-200 text-zinc-300 dark:text-zinc-300 light:text-slate-800 hover:text-white dark:hover:text-white light:hover:text-slate-950 border border-white/20 dark:border-white/20 light:border-slate-300 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all cursor-pointer group"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Auth State Button or User Profile Pill */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-xs font-mono text-white transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-xs">
                  {getInitial()}
                </div>
                <span className="max-w-[110px] truncate font-medium">{getDisplayName()}</span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* User Profile Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0e1117] border border-white/15 p-2 shadow-2xl z-50 text-xs font-mono space-y-1 backdrop-blur-2xl"
                  >
                    <div className="px-3 py-2.5 border-b border-white/[0.08] mb-1">
                      <p className="text-white font-bold text-sm truncate">{getDisplayName()}</p>
                      <p className="text-zinc-400 text-[11px] font-mono truncate mt-0.5">{user.email}</p>
                    </div>

                    <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-between text-[11px] text-zinc-300">
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Key className="w-3.5 h-3.5 text-amber-400" />
                        CLI Session
                      </span>
                      <span className="text-emerald-400 font-bold text-[10px]">ACTIVE</span>
                    </div>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenAccessModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      Command Center Access
                    </button>

                    <button
                      onClick={async () => {
                        setUserMenuOpen(false);
                        await signOut();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer border-t border-white/[0.06] mt-1 pt-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>

                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        setConfirmDeleteOpen(true);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-2 cursor-pointer text-[11px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete Account
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Button
                variant="glass"
                size="sm"
                onClick={onOpenAuthModal}
                className="text-xs"
              >
                Sign In
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
            </>
          )}
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

          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5 font-mono text-xs">
            {user ? (
              <>
                <div className="px-3 py-2 rounded-lg bg-white/[0.06] border border-white/10 text-zinc-200 flex items-center justify-between">
                  <span>{user.email}</span>
                  <span className="text-emerald-400 font-bold text-[10px]">CONNECTED</span>
                </div>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await signOut();
                  }}
                  className="w-full justify-center text-rose-400"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuthModal();
                  }}
                  className="w-full justify-center"
                >
                  Sign In / Sign Up
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
              </>
            )}
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {confirmDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md rounded-2xl bg-[#0c0e13] border border-rose-500/30 p-6 shadow-2xl text-zinc-200"
            >
              <div className="flex items-center gap-3 mb-4 text-rose-400">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base font-sans">Delete Account?</h3>
                  <p className="text-xs text-zinc-400 font-mono">This action is permanent and cannot be undone.</p>
                </div>
              </div>

              <p className="text-xs text-zinc-300 mb-6 font-sans leading-relaxed">
                Are you sure you want to delete your Kodium account? This will permanently erase your user profile and active session.
              </p>

              <div className="flex items-center justify-end gap-3 font-mono">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmDeleteOpen(false)}
                  disabled={deleting}
                >
                  Cancel
                </Button>

                <button
                  onClick={async () => {
                    setDeleting(true);
                    await deleteAccount();
                    setDeleting(false);
                    setConfirmDeleteOpen(false);
                  }}
                  disabled={deleting}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Permanently Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
