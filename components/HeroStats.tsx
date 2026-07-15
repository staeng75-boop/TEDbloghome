"use client";

import { useEffect, useRef, useState } from "react";

// 히어로 통계 숫자: 화면에 보이는 순간 0부터 목표값까지 올라가는 카운트업.
const STATS = [
  { prefix: "약 ", target: 30, suffix: "년", label: "정보보호 분야 경력" },
  { prefix: "", target: 9, suffix: "종", label: "보유 자격 (CISSP·ISO 등)" },
  { prefix: "", target: 40, suffix: "+", label: "수행 프로젝트" },
];

const DURATION_MS = 1600;

export default function HeroStats() {
  const ref = useRef<HTMLDListElement>(null);
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState(STATS.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - t0) / DURATION_MS, 1);
      // easeOutCubic: 처음엔 빠르게, 끝에서 부드럽게 감속
      const eased = 1 - Math.pow(1 - progress, 3);
      setValues(STATS.map((s) => Math.round(s.target * eased)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  return (
    <dl
      ref={ref}
      className="mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3"
    >
      {STATS.map((s, i) => (
        <div key={s.label} className="border-l-2 border-gold/70 pl-4">
          <dt className="text-sm text-slate-400">{s.label}</dt>
          <dd className="mt-1 text-2xl font-bold text-white tabular-nums">
            {s.prefix}
            {values[i]}
            {s.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}
