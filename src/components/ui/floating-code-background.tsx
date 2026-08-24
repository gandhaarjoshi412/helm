"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { Terminal, Code2, Cpu, GitBranch, ShieldCheck, Zap, Layers, FileCode } from "lucide-react";

interface FloatingCodeWidgetData {
  id: string;
  filename: string;
  icon: React.ElementType;
  language: string;
  code: string[];
  position: string;
  floatDelay: number;
  floatDuration: number;
}

const widgets: FloatingCodeWidgetData[] = [
  {
    id: "widget-1",
    filename: "ast_indexer.rs",
    icon: Cpu,
    language: "RUST",
    code: [
      "pub async fn index_ast(graph: &mut ASTGraph) -> Result<()> {",
      "  let hops = graph.resolve_context_hops().await?;",
      "  let vector = embedder::compute(hops)?;",
      "  Ok(graph.sync(vector))",
      "}",
    ],
    position: "left-[2%] md:left-[4%] lg:left-[6%] top-[10%] md:top-[14%]",
    floatDelay: 0,
    floatDuration: 6,
  },
  {
    id: "widget-2",
    filename: "agent_orchestrator.ts",
    icon: Code2,
    language: "TS",
    code: [
      "const patch = await agent.solveTask({",
      "  prompt: 'Fix 408 timeout surge',",
      "  maxDepth: 4,",
      "  autoVerify: true,",
      "});",
    ],
    position: "right-[2%] md:right-[4%] lg:right-[6%] top-[12%] md:top-[18%]",
    floatDelay: 1.5,
    floatDuration: 7,
  },
  {
    id: "widget-3",
    filename: "sandbox_verify.py",
    icon: ShieldCheck,
    language: "PYTHON",
    code: [
      "@verifier.isolated_environment",
      "def run_integration_suite(patch_diff):",
      "    result = pytest.run(patch_diff)",
      "    assert result.exit_code == 0",
      "    return Telemetry(pass=47, ms=312)",
    ],
    position: "left-[3%] lg:left-[8%] bottom-[20%] lg:bottom-[28%]",
    floatDelay: 0.8,
    floatDuration: 6.5,
  },
  {
    id: "widget-4",
    filename: "telemetry.json",
    icon: Zap,
    language: "JSON",
    code: [
      "{",
      '  "status": "HEALTHY",',
      '  "latency_ms": 12,',
      '  "brain_files": 342,',
      '  "confidence": 0.994',
      "}",
    ],
    position: "right-[3%] lg:right-[8%] bottom-[16%] lg:bottom-[24%]",
    floatDelay: 2.2,
    floatDuration: 8,
  },
  {
    id: "widget-5",
    filename: "remote_dispatch.sh",
    icon: Terminal,
    language: "BASH",
    code: [
      "$ kodium agent dispatch --task 'Stripe backoff'",
      "└─ Sandbox verified (47/47 passing)",
      "└─ Remote ship approved from Mobile UI",
    ],
    position: "hidden xl:block left-[12%] top-[48%]",
    floatDelay: 1.0,
    floatDuration: 7.5,
  },
  {
    id: "widget-6",
    filename: "memory_graph.rs",
    icon: Layers,
    language: "RUST",
    code: [
      "pub struct SymbolCache {",
      "  nodes: DashMap<SymbolId, NodeRef>,",
      "  invalidation_gen: AtomicU64,",
      "}",
    ],
    position: "hidden xl:block right-[12%] top-[45%]",
    floatDelay: 2.8,
    floatDuration: 6.8,
  },
  {
    id: "widget-7",
    filename: "model_router.py",
    icon: Cpu,
    language: "PYTHON",
    code: [
      "class ModelRouter:",
      "  def select_optimal_engine(self, task_complexity):",
      "    return 'claude-3-5-sonnet' if complexity > 0.8 else 'gpt-4o'",
    ],
    position: "hidden lg:block left-[32%] top-[4%]",
    floatDelay: 0.5,
    floatDuration: 7.2,
  },
  {
    id: "widget-8",
    filename: "checkout_retry.diff",
    icon: GitBranch,
    language: "DIFF",
    code: [
      "+ const res = await backoff(() => stripe.charges.create({",
      "+   amount, currency: 'usd'",
      "+ }), { retries: 5, delay: 200 });",
      "- const res = await stripe.charges.create({ amount });",
    ],
    position: "hidden lg:block right-[32%] top-[4%]",
    floatDelay: 1.8,
    floatDuration: 8.5,
  },
];

interface InteractiveWidgetProps {
  widget: FloatingCodeWidgetData;
  mousePos: { x: number; y: number };
}

function InteractiveWidget({ widget, mousePos }: InteractiveWidgetProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  // Smooth springs for repulsion movement
  const springX = useSpring(0, { stiffness: 180, damping: 20 });
  const springY = useSpring(0, { stiffness: 180, damping: 20 });

  useEffect(() => {
    if (!cardRef.current || mousePos.x === -1000) return;

    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const dx = cardCenterX - mousePos.x;
    const dy = cardCenterY - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const radius = 220; // Repulsion radius in pixels

    if (distance < radius) {
      setIsNear(true);
      const force = (1 - distance / radius) * 65; // Repulsion push strength in px
      const angle = Math.atan2(dy, dx);
      const pushX = Math.cos(angle) * force;
      const pushY = Math.sin(angle) * force;

      springX.set(pushX);
      springY.set(pushY);
    } else {
      setIsNear(false);
      springX.set(0);
      springY.set(0);
    }
  }, [mousePos, springX, springY]);

  const Icon = widget.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: isNear ? 0.95 : [0.4, 0.7, 0.4],
        y: [-12, 12, -12],
        rotate: isNear ? [-2, 2, -2] : [-1, 1, -1],
      }}
      transition={{
        opacity: isNear
          ? { duration: 0.2 }
          : {
              duration: widget.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: widget.floatDelay,
            },
        y: {
          duration: widget.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: widget.floatDelay,
        },
        rotate: {
          duration: widget.floatDuration * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: widget.floatDelay,
        },
      }}
      style={{
        x: springX,
        y: springY,
      }}
      whileHover={{
        scale: 1.06,
        opacity: 1,
        transition: { duration: 0.2 },
      }}
      className={cn(
        "absolute max-w-[280px] sm:max-w-[330px] p-3 sm:p-3.5 rounded-xl transition-colors duration-300 pointer-events-auto cursor-pointer",
        "bg-zinc-950/80 backdrop-blur-md font-mono text-[10.5px] leading-relaxed select-none",
        isNear
          ? "border border-white/40 shadow-[0_0_35px_rgba(255,255,255,0.18)]"
          : "border border-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.04)] hover:border-white/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]",
        "hidden sm:block",
        widget.position
      )}
    >
      {/* Widget Title Bar */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-zinc-400">
        <div className="flex items-center gap-1.5 font-bold text-zinc-200">
          <Icon className={cn("w-3.5 h-3.5", isNear ? "text-white" : "text-zinc-400")} />
          <span className={cn(isNear && "text-white font-extrabold")}>{widget.filename}</span>
        </div>
        <span
          className={cn(
            "text-[9px] px-1.5 py-0.5 rounded font-bold border",
            isNear
              ? "bg-white/20 text-white border-white/30"
              : "bg-white/[0.06] text-zinc-400 border-white/5"
          )}
        >
          {widget.language}
        </span>
      </div>

      {/* Snippet Lines */}
      <div className="space-y-0.5 font-mono text-zinc-400">
        {widget.code.map((line, lineIdx) => {
          const isComment = line.trim().startsWith("//") || line.trim().startsWith("#");
          const isKeyword =
            line.includes("pub async") ||
            line.includes("const ") ||
            line.includes("def ") ||
            line.includes("Result") ||
            line.includes("class ");
          const isDiffAdd = line.startsWith("+");
          const isDiffDel = line.startsWith("-");
          const isSuccess = line.includes("HEALTHY") || line.includes("Sandbox verified");

          return (
            <div
              key={lineIdx}
              className={cn(
                "truncate",
                isComment && "text-zinc-500 italic",
                isKeyword && "text-zinc-200 font-semibold",
                isDiffAdd && "text-emerald-400 font-semibold",
                isDiffDel && "text-rose-400 font-semibold",
                isSuccess && "text-emerald-400 font-bold"
              )}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* Glowing Corner Dot */}
      <div
        className={cn(
          "absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full transition-all duration-300",
          isNear
            ? "bg-white shadow-[0_0_10px_rgba(255,255,255,1)] animate-ping"
            : "bg-white/40 shadow-[0_0_6px_rgba(255,255,255,0.8)]"
        )}
      />
    </motion.div>
  );
}

export function FloatingCodeBackground({ className }: { className?: string }) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none z-0",
        className
      )}
    >
      {widgets.map((widget) => (
        <InteractiveWidget key={widget.id} widget={widget} mousePos={mousePos} />
      ))}
    </div>
  );
}
