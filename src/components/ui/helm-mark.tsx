import React from "react";
import { KodiumMark } from "./kodium-mark";

interface HelmMarkProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export function HelmMark({ className, size = 28, glow = false }: HelmMarkProps) {
  return <KodiumMark className={className} size={size} glow={glow} />;
}
