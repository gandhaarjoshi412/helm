"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProblemSection } from "@/components/problem-section";
import { DifferenceSection } from "@/components/difference-section";
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
import { AccessModal } from "@/components/access-modal";
import { CommandPalette } from "@/components/command-palette";

export default function HomePage() {
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#08090b] text-[#f3f4f6] relative selection:bg-sky-500/25 selection:text-white">
      {/* Sticky Elevated Navigation */}
      <Navbar
        onOpenAccessModal={() => setAccessModalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Hero Section & Embedded Live Command Center Demo */}
      <Hero onOpenAccessModal={() => setAccessModalOpen(true)} />

      {/* Problem: Fragmented Development Workflow */}
      <ProblemSection />

      {/* The Difference: Understand, Act, Control */}
      <DifferenceSection />

      {/* Persistent Project Brain & Codebase Map */}
      <ProjectBrain />

      {/* Agent Execution Pipeline: Ask -> Plan -> Execute -> Verify -> Ship */}
      <AgentExecution />

      {/* Live Agent Terminal Stream */}
      <AgentTerminal />

      {/* Human Control & Autonomy Boundaries Matrix */}
      <AutonomySection />

      {/* Phone Command Center & Voice Control */}
      <MobileCommandCenter />

      {/* Collaboration: Developers & Agents Shared State */}
      <CollaborationSection />

      {/* End-to-End "Without Your Laptop" Climax Story */}
      <ShipSection />

      {/* Technical Architecture Blueprint */}
      <ArchitectureSection />

      {/* Model-Agnostic Engine Layer */}
      <ModelSection />

      {/* 4 Focused Real-World Use Cases */}
      <UseCases />

      {/* Final Command Center CTA */}
      <FinalCta onOpenAccessModal={() => setAccessModalOpen(true)} />

      {/* Minimal Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <AccessModal
        isOpen={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenAccessModal={() => setAccessModalOpen(true)}
      />
    </main>
  );
}
