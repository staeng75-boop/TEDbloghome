"use client";

import { useEffect, useRef } from "react";

export default function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      big: boolean;
    }[] = [];
    let bigIndexes: number[] = [];
    const start = performance.now();

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(32, Math.min(90, Math.floor((w * h) / 14000)));
      nodes = Array.from({ length: count }, (_, i) => {
        const big = i % 7 === 0;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: big ? 3 + Math.random() * 1.5 : 1.2 + Math.random() * 1.8,
          big,
        };
      });
      bigIndexes = nodes
        .map((n, i) => (n.big ? i : -1))
        .filter((i) => i >= 0);
    };

    // 옵시디언 그래프 뷰처럼 촘촘하게 얽히도록 연결 반경을 넓게 잡음(약 80% 연결감)
    const LINK = 190;
    const BLINK_CYCLE = 5000;
    const BLINK_FLASH = 1100;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.4;
            ctx.strokeStyle = `rgba(140, 190, 230, ${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      const elapsed = performance.now() - start;
      const activeBig =
        bigIndexes.length > 0
          ? bigIndexes[
              Math.floor(elapsed / BLINK_CYCLE) % bigIndexes.length
            ]
          : -1;
      const timeInCycle = elapsed % BLINK_CYCLE;
      const flash =
        timeInCycle < BLINK_FLASH
          ? Math.sin((timeInCycle / BLINK_FLASH) * Math.PI)
          : 0;

      nodes.forEach((n, i) => {
        const isFlashing = i === activeBig;
        if (isFlashing) {
          ctx.save();
          ctx.shadowColor = "rgba(210, 235, 255, 0.9)";
          ctx.shadowBlur = 14 * flash;
          ctx.fillStyle = `rgba(225, 240, 255, ${0.9 + 0.1 * flash})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + n.r * flash * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = n.big
            ? "rgba(210, 232, 250, 0.85)"
            : "rgba(200, 225, 245, 0.75)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
