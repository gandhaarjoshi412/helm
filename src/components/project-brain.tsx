"use client";

import React, { useState } from "react";
import {
  Cpu,
  Layers,
  Database,
  Server,
  Code,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  ExternalLink,
  Shield,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Panel } from "./ui/panel";
import { Button } from "./ui/button";
import { FloatingCodeBackground } from "./ui/floating-code-background";
import { cn } from "@/lib/utils";

export function ProjectBrain() {
  const [selectedQuery, setSelectedQuery] = useState<number>(0);

  const queries = [
    {
      id: 0,
      prompt: "Where does checkout get its payment credentials?",
      highlightNodes: ["Payments", "Checkout", "StripeClient", "EnvConfig"],
      trace: [
        { step: "Checkout", file: "src/app/checkout/page.tsx", line: "L84", role: "Dispatches checkout intent" },
        { step: "PaymentService", file: "src/services/payment.ts", line: "L24", role: "Resolves merchant account & fees" },
        { step: "StripeClient", file: "src/lib/stripe.ts", line: "L12", role: "Injects scoped credentials from KMS" },
        { step: "Environment configuration", file: ".env.production", line: "L18", role: "STRIPE_SECRET_KEY / WEBHOOK_SECRET" },
      ],
      explanation:
        "Checkout invokes PaymentService, which fetches decrypted API secrets via the StripeClient singleton configured in environment variables.",
    },
    {
      id: 1,
      prompt: "How does the AR Viewer cache 3D menu assets?",
      highlightNodes: ["AR Viewer", "Menu UI", "Redis", "AssetLoader"],
      trace: [
        { step: "AR Viewer", file: "src/components/ar/viewer.tsx", line: "L52", role: "Requests GLTF dish asset" },
        { step: "AssetLoader", file: "src/services/assets.ts", line: "L19", role: "Checks memory buffer & ETag" },
        { step: "Redis Cache", file: "src/lib/redis.ts", line: "L44", role: "Fetches signed pre-cached URL (TTL 24h)" },
        { step: "CDN Storage", file: "infra/s3.tf", line: "L10", role: "CloudFront edge delivery origin" },
      ],
      explanation:
        "The AR Viewer requests 3D models through AssetLoader, which checks Redis for hot cache hit before fetching from CDN edge.",
    },
    {
      id: 2,
      prompt: "Which routes require authenticated session tokens?",
      highlightNodes: ["Auth", "Restaurant API", "Orders", "PostgreSQL"],
      trace: [
        { step: "Auth Guard", file: "src/middleware.ts", line: "L15", role: "Intercepts request header Authorization: Bearer" },
        { step: "JWT Validator", file: "src/services/auth.ts", line: "L68", role: "Verifies asymmetric signature & tenant permissions" },
        { step: "Restaurant API & Orders", file: "src/api/routes/*.ts", line: "L1-L120", role: "Protected handlers" },
      ],
      explanation:
        "Every endpoint under /api/v1/orders and /api/v1/restaurant is wrapped by Edge Middleware and validated against PostgreSQL tenant records.",
    },
  ];

  const current = queries[selectedQuery];

  // Tree nodes definition
  const tree = {
    frontend: [
      { name: "Menu UI", key: "Menu UI", path: "src/components/menu/" },
      { name: "AR Viewer", key: "AR Viewer", path: "src/components/ar/" },
      { name: "Admin Portal", key: "Admin", path: "src/app/admin/" },
    ],
    backend: [
      { name: "Auth Service", key: "Auth", path: "src/services/auth.ts" },
      { name: "Restaurant API", key: "Restaurant API", path: "src/api/restaurant.ts" },
      { name: "Orders Engine", key: "Orders", path: "src/services/orders.ts" },
      { name: "Payments / Stripe", key: "Payments", path: "src/services/payment.ts" },
    ],
    infrastructure: [
      { name: "PostgreSQL", key: "PostgreSQL", path: "prisma/schema.prisma" },
      { name: "Redis Cache", key: "Redis", path: "src/lib/redis.ts" },
      { name: "CI/CD & Cloud", key: "CI/CD", path: ".github/workflows/" },
    ],
  };

  const isHighlighted = (key: string) => {
    return current.highlightNodes.some((k) => k.toLowerCase() === key.toLowerCase());
  };

  return (
    <section id="brain" className="relative py-28 bg-black dark:bg-black light:bg-white overflow-hidden border-t border-b border-white/[0.06]">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[350px] bg-gradient-to-b from-white/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <Badge variant="mono" size="sm" className="font-mono">
            PERSISTENT PROJECT BRAIN
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            It understands the project, not just the prompt.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-slate-600 leading-relaxed font-normal">
            Kodium constructs and updates a continuous knowledge graph of your entire repository. When you or an agent asks a question, Kodium navigates the true architecture — tracing imports, call-stacks, environment configs, and documentation in milliseconds.
          </p>
        </div>

        {/* Interactive Query Switcher */}
        <div className="mb-6">
          <div className="text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">
            Select an architecture inquiry to trace:
          </div>
          <div className="flex flex-wrap gap-2">
            {queries.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setSelectedQuery(idx)}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-xs font-mono transition-all text-left border flex items-center gap-2",
                  selectedQuery === idx
                    ? "bg-white/10 text-white border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.15)] font-semibold"
                    : "bg-zinc-900/80 text-zinc-400 border-white/[0.06] hover:border-white/20 hover:text-zinc-200"
                )}
              >
                <FileSearch className="w-3.5 h-3.5 text-zinc-200 shrink-0" />
                <span>“{q.prompt}”</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Codebase Map + Trace Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Interactive Codebase Architecture Map (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0c0e14] border border-white/[0.08] p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 font-mono text-xs text-white">
                <Cpu className="w-4 h-4 text-zinc-200" />
                <span className="font-bold">PLATESIGHT</span>
                <span className="text-zinc-500">/</span>
                <span className="text-zinc-400">Architecture Topology Graph</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ACTIVE GRAPH
              </span>
            </div>

            {/* Visual Topology Tree */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {/* Frontend Branch */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2 text-zinc-300 font-semibold text-[11px] uppercase tracking-wider pb-2 border-b border-white/[0.06]">
                  <Layers className="w-3.5 h-3.5 text-zinc-200" />
                  <span>Frontend</span>
                </div>
                <div className="space-y-2">
                  {tree.frontend.map((node) => {
                    const active = isHighlighted(node.key);
                    return (
                      <div
                        key={node.name}
                        className={cn(
                          "p-2 rounded-lg border transition-all text-[11.5px]",
                          active
                            ? "bg-white/10 border-white/40 text-white shadow-[0_0_12px_rgba(255,255,255,0.2)] font-semibold"
                            : "bg-zinc-900/40 border-white/[0.04] text-zinc-400"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{node.name}</span>
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{node.path}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Backend Branch */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2 text-zinc-300 font-semibold text-[11px] uppercase tracking-wider pb-2 border-b border-white/[0.06]">
                  <Server className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Backend Core</span>
                </div>
                <div className="space-y-2">
                  {tree.backend.map((node) => {
                    const active = isHighlighted(node.key);
                    return (
                      <div
                        key={node.name}
                        className={cn(
                          "p-2 rounded-lg border transition-all text-[11.5px]",
                          active
                            ? "bg-emerald-500/20 border-emerald-400/50 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)] font-semibold"
                            : "bg-zinc-900/40 border-white/[0.04] text-zinc-400"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{node.name}</span>
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{node.path}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Infra Branch */}
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2 text-zinc-300 font-semibold text-[11px] uppercase tracking-wider pb-2 border-b border-white/[0.06]">
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  <span>Infrastructure</span>
                </div>
                <div className="space-y-2">
                  {tree.infrastructure.map((node) => {
                    const active = isHighlighted(node.key);
                    return (
                      <div
                        key={node.name}
                        className={cn(
                          "p-2 rounded-lg border transition-all text-[11.5px]",
                          active
                            ? "bg-amber-500/20 border-amber-400/50 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)] font-semibold"
                            : "bg-zinc-900/40 border-white/[0.04] text-zinc-400"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span>{node.name}</span>
                          {active && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{node.path}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Insight Message */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Model: <strong className="text-zinc-200">Kodium AST Graph Engine</strong></span>
              <span className="text-zinc-300 font-medium">Continuous 0ms incremental re-index</span>
            </div>
          </div>

          {/* Right: Path Navigation & Reference Inspector (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0e1117] border border-white/[0.08] p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-zinc-200" />
                  Resolved Context Path
                </span>
                <Badge variant="mono" size="sm">
                  {current.trace.length} Hops Traced
                </Badge>
              </div>

              {/* Step Sequence Path */}
              <div className="space-y-3 font-mono text-xs">
                {current.trace.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-950/90 border border-white/[0.06] relative group hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-white/10 border border-white/20 text-zinc-200 text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-white text-xs">{step.step}</span>
                      </div>
                      <span className="text-[11px] text-zinc-400">{step.line}</span>
                    </div>

                    <div className="text-[11px] text-zinc-200 pl-7 font-mono font-medium">
                      {step.file}
                    </div>

                    <div className="text-[11px] text-zinc-400 pl-7 mt-1">
                      {step.role}
                    </div>
                  </div>
                ))}
              </div>

              {/* Natural language summary box */}
              <div className="mt-4 p-3.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-300 leading-relaxed font-sans">
                <strong className="text-white font-mono text-xs block mb-1">Kodium Summary:</strong>
                {current.explanation}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>Codebase AST mapped</span>
              <span className="text-emerald-400 font-medium">Confidence: 99.4%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
