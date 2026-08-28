"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProblemSection } from "@/components/problem-section";
import { DifferenceSection } from "@/components/difference-section";
import { WorkflowWalkthrough } from "@/components/workflow-walkthrough";
import { ProjectBrain } from "@/components/project-brain";
import { AgentExecution } from "@/components/agent-execution";
import { AgentTerminal } from "@/components/agent-terminal";
import { AutonomySection } from "@/components/autonomy-section";
import { MobileCommandCenter } from "@/components/mobile-command-center";
import { CollaborationSection } from "@/components/collaboration-section";
import { ShipSection } from "@/components/ship-section";
import { ArchitectureSection } from "@/components/architecture-section";
import { ModelSection } from "@/components/model-section";
import { UseCases } from "@/components/use-cases";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { FloatingBottomNav } from "@/components/floating-bottom-nav";
import { AccessModal } from "@/components/access-modal";
import { AuthModal } from "@/components/auth-modal";
import { CommandPalette } from "@/components/command-palette";
import { FadeIn } from "@/components/ui/fade-in";

import { Preloader } from "@/components/ui/preloader";

import { motion } from "framer-motion";

export default function HomePage() {
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-[#08090b] dark:bg-[#08090b] light:bg-white text-[#f3f4f6] dark:text-[#f3f4f6] light:text-slate-900 relative selection:bg-white/20 selection:text-white overflow-hidden pb-16 transition-colors duration-300">
      {/* High-Tech Preloader Screen */}
      <Preloader onComplete={() => setIsLoaded(true)} />

      {/* Persistent Floating Bottom Dock Navigation Pill */}
      <FloatingBottomNav />

      {/* Website Revealed After 100% Loading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Sticky Elevated Navigation */}
        <Navbar
          onOpenAccessModal={() => setAccessModalOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenAuthModal={() => setAuthModalOpen(true)}
        />



        {/* Hero Section & Embedded Live Command Center Demo */}
        <Hero
          onOpenAccessModal={() => setAccessModalOpen(true)}
          onOpenAuthModal={() => setAuthModalOpen(true)}
        />

        {/* Problem: Fragmented Development Workflow */}
        <FadeIn direction="up" duration={0.7}>
          <ProblemSection />
        </FadeIn>

        {/* The Difference: Understand, Act, Control */}
        <FadeIn direction="up" duration={0.7}>
          <DifferenceSection />
        </FadeIn>

        {/* End-to-End Interactive 12-Stage Product Walkthrough */}
        <FadeIn direction="up" duration={0.7}>
          <WorkflowWalkthrough />
        </FadeIn>

        {/* Persistent Project Brain & Codebase Map */}
        <FadeIn direction="up" duration={0.7}>
          <ProjectBrain />
        </FadeIn>

        {/* Agent Execution Pipeline: Ask -> Plan -> Execute -> Verify -> Ship */}
        <FadeIn direction="up" duration={0.7}>
          <AgentExecution />
        </FadeIn>

        {/* Live Agent Terminal Stream */}
        <FadeIn direction="up" duration={0.7}>
          <AgentTerminal />
        </FadeIn>

        {/* Human Control & Autonomy Boundaries Matrix */}
        <FadeIn direction="up" duration={0.7}>
          <AutonomySection />
        </FadeIn>

        {/* Phone Command Center & Voice Control */}
        <FadeIn direction="up" duration={0.7}>
          <MobileCommandCenter />
        </FadeIn>

        {/* Collaboration: Developers & Agents Shared State */}
        <FadeIn direction="up" duration={0.7}>
          <CollaborationSection />
        </FadeIn>

        {/* End-to-End "Without Your Laptop" Climax Story */}
        <FadeIn direction="up" duration={0.7}>
          <ShipSection />
        </FadeIn>

        {/* Technical Architecture Blueprint */}
        <FadeIn direction="up" duration={0.7}>
          <ArchitectureSection />
        </FadeIn>

        {/* Model-Agnostic Engine Layer */}
        <FadeIn direction="up" duration={0.7}>
          <ModelSection />
        </FadeIn>

        {/* 4 Focused Real-World Use Cases */}
        <FadeIn direction="up" duration={0.7}>
          <UseCases />
        </FadeIn>

        {/* Final Command Center CTA */}
        <FadeIn direction="up" duration={0.7}>
          <FinalCta onOpenAccessModal={() => setAccessModalOpen(true)} />
        </FadeIn>

        {/* Minimal Footer */}
        <Footer />
      </motion.div>

      {/* Interactive Global Modals */}
      <AccessModal
        isOpen={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenAccessModal={() => setAccessModalOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />
    </main>
  );
}
