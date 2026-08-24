"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (accessModalOpen) return;
        setCommandPaletteOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [accessModalOpen]);

  const openAccessModal = () => {
    setCommandPaletteOpen(false);
    setAccessModalOpen(true);
  };

  return (
    <main
      id="top"
      className="min-h-screen bg-[#08090b] text-[#f3f4f6] relative selection:bg-sky-500/25 selection:text-white"
    >
      <Navbar
        onOpenAccessModal={openAccessModal}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      <Hero onOpenAccessModal={openAccessModal} />
      <ProblemSection />
      <DifferenceSection />
      <ProjectBrain />
      <AgentExecution />
      <AgentTerminal />
      <AutonomySection />
      <MobileCommandCenter />
      <CollaborationSection />
      <ShipSection />
      <ArchitectureSection />
      <ModelSection />
      <UseCases />
      <FinalCta onOpenAccessModal={openAccessModal} />
      <Footer />

      <AccessModal
        isOpen={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenAccessModal={openAccessModal}
      />
    </main>
  );
}
