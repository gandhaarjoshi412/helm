"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/theme-context";

export function FluidBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let targetMouseX = width * 0.5;
    let targetMouseY = height * 0.5;
    let mouseX = width * 0.5;
    let mouseY = height * 0.5;

    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Grid Dimensions
    const rows = 36;
    const cols = 52;
    let time = 0;

    const render = () => {
      time += 0.018;

      // Smooth interpolation for mouse and scroll velocity
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const isDark = theme === "dark";
      const totalScrollHeight = document.body.scrollHeight - height || 1;
      const scrollRatio = Math.min(1, Math.max(0, scrollY / totalScrollHeight));

      const focalLength = 380;
      const centerX = width * 0.5;
      const centerY = height * 0.45;

      // Dynamic Camera Perspective based on Scroll Position
      const cameraRotation = time * 0.15 + scrollRatio * Math.PI * 0.75;
      const waveAmplitude = 35 + Math.sin(time * 0.8) * 12 + scrollRatio * 25;

      // Draw Fluid Ribbon Wave 1 (Upper Flowing Stream)
      ctx.beginPath();
      const numPoints = 80;
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const x = t * width;
        
        // Liquid Sine Curve with Mouse & Scroll Reactivity
        const mouseDist = Math.hypot(x - mouseX, (height * 0.3) - mouseY);
        const mouseForce = Math.max(0, (250 - mouseDist) / 250);

        const waveY =
          height * (0.2 + scrollRatio * 0.3) +
          Math.sin(t * Math.PI * 4 + time * 1.5 + scrollRatio * 6) * (40 + mouseForce * 60) +
          Math.cos(t * Math.PI * 2 - time) * 20;

        if (i === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }

      const ribbonGradient = ctx.createLinearGradient(0, 0, width, 0);
      if (isDark) {
        ribbonGradient.addColorStop(0, "rgba(56, 189, 248, 0.0)");
        ribbonGradient.addColorStop(0.3, "rgba(56, 189, 248, 0.25)");
        ribbonGradient.addColorStop(0.7, "rgba(99, 102, 241, 0.25)");
        ribbonGradient.addColorStop(1, "rgba(168, 85, 247, 0.0)");
      } else {
        ribbonGradient.addColorStop(0, "rgba(2, 132, 199, 0.0)");
        ribbonGradient.addColorStop(0.3, "rgba(2, 132, 199, 0.22)");
        ribbonGradient.addColorStop(0.7, "rgba(99, 102, 241, 0.22)");
        ribbonGradient.addColorStop(1, "rgba(14, 165, 233, 0.0)");
      }
      ctx.strokeStyle = ribbonGradient;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Render 3D Fluid Liquid Grid Topology
      const grid: { x: number; y: number; z: number; px: number; py: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const u = (c / (cols - 1) - 0.5) * 1400;
          const v = (r / (rows - 1) - 0.5) * 1400;

          // Rotated Perspective Projection
          const rx = u * Math.cos(cameraRotation) - v * Math.sin(cameraRotation);
          const ry = u * Math.sin(cameraRotation) + v * Math.cos(cameraRotation);

          // Calculate distance to mouse cursor in screen space
          const pxRough = centerX + rx * 0.4;
          const pyRough = centerY + ry * 0.4;
          const distToMouse = Math.hypot(pxRough - mouseX, pyRough - mouseY);
          const mouseRipple = Math.max(0, (300 - distToMouse) / 300) * 45 * Math.sin(time * 3);

          // 3D Elevation Heightfield
          const elevation =
            Math.sin(rx * 0.004 + time * 1.2 + scrollRatio * 4) * waveAmplitude +
            Math.cos(ry * 0.005 + time * 0.9) * (waveAmplitude * 0.8) +
            Math.sin((rx + ry) * 0.0025 + time * 1.4) * 15 +
            mouseRipple;

          const z3d = ry + 750 + Math.sin(time * 0.4) * 50;
          const scale = focalLength / (focalLength + z3d);

          const px = centerX + rx * scale;
          const py = centerY + (elevation - 180) * scale + scrollRatio * 80;

          grid[r][c] = { x: rx, y: ry, z: elevation, px, py };
        }
      }

      // Draw 3D Topology Wireframe Mesh
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];

          // Horizontal Connectors
          if (c < cols - 1) {
            const nextC = grid[r][c + 1];
            ctx.beginPath();
            ctx.moveTo(pt.px, pt.py);
            ctx.lineTo(nextC.px, nextC.py);

            if (isDark) {
              const alpha = Math.max(0.02, 0.22 - (r / rows) * 0.18);
              ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
              ctx.lineWidth = 1;
            } else {
              const alpha = Math.max(0.03, 0.25 - (r / rows) * 0.2);
              ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
              ctx.lineWidth = 1.1;
            }
            ctx.stroke();
          }

          // Vertical Connectors
          if (r < rows - 1) {
            const nextR = grid[r + 1][c];
            ctx.beginPath();
            ctx.moveTo(pt.px, pt.py);
            ctx.lineTo(nextR.px, nextR.py);

            if (isDark) {
              const alpha = Math.max(0.02, 0.18 - (r / rows) * 0.15);
              ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
              ctx.lineWidth = 0.85;
            } else {
              const alpha = Math.max(0.03, 0.2 - (r / rows) * 0.16);
              ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
              ctx.lineWidth = 0.95;
            }
            ctx.stroke();
          }

          // Fluid Glowing Nodes (3D Particle Dots)
          if ((r + c) % 3 === 0) {
            const size = Math.max(0.6, (pt.z + waveAmplitude) / (waveAmplitude * 2) * 2.4);
            ctx.beginPath();
            ctx.arc(pt.px, pt.py, size, 0, Math.PI * 2);

            if (isDark) {
              ctx.fillStyle = pt.z > 10 ? "#38bdf8" : "#818cf8";
              ctx.shadowColor = "#38bdf8";
              ctx.shadowBlur = 5;
            } else {
              ctx.fillStyle = pt.z > 10 ? "#0284c7" : "#6366f1";
              ctx.shadowColor = "#0284c7";
              ctx.shadowBlur = 3;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: theme === "dark" ? 0.75 : 0.55 }}
    />
  );
}
