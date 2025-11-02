"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  DoughnutController,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  DoughnutController,
);

/**
 * Subtle background data layer for the Hero section.
 * - Contains two tiny charts (real data, simplified):
 *   - Recognized Indian startups (2014 → 2024)
 *   - India's unicorns (2011 → 2025)
 * - Shows a simple "map" card with region markers for key privacy regimes.
 * - Entire layer is decorative (pointer-events: none) and low opacity.
 */
export const HeroDataBackground: React.FC = () => {
  const barRef = useRef<HTMLCanvasElement | null>(null);
  const lineRef = useRef<HTMLCanvasElement | null>(null);
  const donutRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<Chart | null>(null);
  const lineChartRef = useRef<Chart | null>(null);
  const donutChartRef = useRef<Chart | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [dots, setDots] = useState<Array<{ x: number; y: number; r: number; delay: number }>>([]);
  const [wires, setWires] = useState<Array<{ points: Array<{ x: number; y: number }>; key: string }>>([]);

  useEffect(() => {
    const chartTextColor = "rgba(255, 255, 255, 0.65)";
    const chartGridColor = "rgba(0, 229, 255, 0.12)";
    const chartAccent = "rgba(0, 229, 255, 1)";
    const chartAccentBG = "rgba(0, 229, 255, 0.18)";

    if (barRef.current) {
      barChartRef.current = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: ["2014", "2024"],
          datasets: [
            {
              label: "Recognized Startups (DPIIT, India)",
              // Approximate real figures (publicly reported): ~700 in 2014 → 145,000+ in 2024
              data: [700, 145000],
              backgroundColor: chartAccentBG,
              borderColor: chartAccent,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, title: { display: false }, tooltip: { enabled: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: chartGridColor },
              ticks: { color: chartTextColor, callback: (v) => (Number(v) >= 1000 ? `${Number(v) / 1000}k` : `${v}`) },
            },
            x: {
              grid: { display: false },
              ticks: { color: chartTextColor },
            },
          },
        },
      });
    }

    if (lineRef.current) {
      lineChartRef.current = new Chart(lineRef.current, {
        type: "line",
        data: {
          labels: ["2011", "2018", "2024", "2025"],
          datasets: [
            {
              label: "India Unicorn Count",
              // Approximate public counts; decorative background, not analytical.
              data: [1, 14, 110, 115],
              backgroundColor: "rgba(0, 229, 255, 0.10)",
              borderColor: chartAccent,
              pointBackgroundColor: "#00e5ff",
              fill: true,
              tension: 0.35,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, title: { display: false }, tooltip: { enabled: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: chartGridColor },
              ticks: { color: chartTextColor },
            },
            x: {
              grid: { display: false },
              ticks: { color: chartTextColor },
            },
          },
        },
      });
    }

    if (donutRef.current) {
      donutChartRef.current = new Chart(donutRef.current, {
        type: "doughnut",
        data: {
          labels: ["Europe", "Americas", "Asia", "Africa", "Oceania"],
          // Rough distribution of countries/regions with DP laws (decorative; based on public counts ~160+ total)
          datasets: [{
            data: [45, 35, 55, 22, 6],
            backgroundColor: [
              "rgba(56,189,248,0.45)",
              "rgba(52,211,153,0.45)",
              "rgba(99,102,241,0.45)",
              "rgba(251,191,36,0.45)",
              "rgba(248,113,113,0.45)",
            ],
            borderColor: "rgba(255,255,255,0.2)",
            borderWidth: 1,
          }],
        },
        options: {
          cutout: "62%",
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    // Subtle cursor glow that follows the pointer with easing
    const glow = glowRef.current;
    let raf = 0;
    let tx = 0, ty = 0; // target
    let x = 0, y = 0;   // current
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as Window).document.body.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      if (!raf) loop();
    };
    const loop = () => {
      x = lerp(x, tx, 0.12);
      y = lerp(y, ty, 0.12);
      if (glow) glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`; // center a 400x400 glow
      raf = Math.hypot(x - tx, y - ty) < 0.5 ? 0 : requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);

    // Generate random dots and connector lines once on mount (viewBox space 1200x700)
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const makeDot = () => ({ x: rand(40, 1160), y: rand(40, 660), r: rand(1.2, 2.6), delay: rand(0, 3) });
    const makeWire = (idx: number) => {
      const segs = Math.floor(rand(3, 6));
      const points: Array<{ x: number; y: number }> = [];
      let x = rand(60, 1140);
      let y = rand(80, 620);
      points.push({ x, y });
      for (let i = 0; i < segs; i++) {
        // step mostly horizontally with slight vertical jitter
        x += rand(-120, 140);
        y += rand(-40, 40);
        x = Math.max(20, Math.min(1180, x));
        y = Math.max(20, Math.min(680, y));
        points.push({ x, y });
      }
      return { points, key: `w${idx}` };
    };
    setDots(Array.from({ length: 26 }, makeDot));
    setWires(Array.from({ length: 12 }, (_, i) => makeWire(i)));

    return () => {
      barChartRef.current?.destroy();
      lineChartRef.current?.destroy();
      donutChartRef.current?.destroy();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(closest-side, rgba(0,229,255,0.08), rgba(0,229,255,0.04) 60%, transparent 70%)",
          filter: "blur(8px)",
          transform: "translate(-9999px, -9999px)",
        }}
      />
      {/* Decorative circuit lines (subtle) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="rgba(0,229,255,0.18)" strokeWidth="1">
          <path d="M60 160 H240 V240 H360" />
          <circle cx="240" cy="200" r="4" fill="rgba(0,229,255,0.35)" />
          <path d="M980 100 V200 H880" />
          <circle cx="880" cy="200" r="3" fill="rgba(0,229,255,0.35)" />
          <path d="M200 560 H420 V520 H520" />
          <circle cx="420" cy="520" r="4" fill="rgba(0,229,255,0.35)" />
          <path d="M760 560 H920 V480 H1080" />
          <circle cx="920" cy="480" r="4" fill="rgba(0,229,255,0.35)" />
        </g>
      </svg>

      {/* Random network wires and twinkling dots (low opacity) */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          {wires.map(({ points, key }) => (
            <polyline
              key={key}
              points={points.map((p) => `${p.x},${p.y}`).join(" ")}
              stroke="rgba(0,229,255,0.16)"
              strokeWidth="1"
              fill="none"
            />
          ))}
        </g>
        <g>
          {dots.map((d, i) => (
            <circle key={`d${i}`} cx={d.x} cy={d.y} r={d.r} fill="#00e5ff" opacity="0.28">
              <animate attributeName="opacity" values="0.12;0.35;0.12" dur="3.2s" begin={`${(i * 0.18 + d.delay).toFixed(2)}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      </svg>

      {/* Tiny charts positioned around the hero */}
      <div className="absolute top-[8%] right-[8%] w-[240px] md:w-[280px] h-[120px] xl:top-[10%] xl:right-[6%] xl:w-[300px] xl:h-[130px] opacity-40">
        <div className="glass rounded-xl border border-white/10 p-2 w-full h-full">
          <canvas ref={lineRef} />
        </div>
      </div>

      <div className="absolute bottom-[14%] left-[6%] w-[240px] md:w-[280px] h-[120px] xl:bottom-[12%] xl:left-[6%] xl:w-[300px] xl:h-[130px] opacity-40">
        <div className="glass rounded-xl border border-white/10 p-2 w-full h-full">
          <canvas ref={barRef} />
        </div>
      </div>

      {/* Donut chart: countries with privacy laws by region */}
      <div className="absolute top-[22%] left-[8%] w-[200px] md:w-[220px] h-[120px] xl:top-[18%] xl:left-[6%] xl:w-[230px] xl:h-[130px] opacity-40">
        <div className="glass rounded-xl border border-white/10 p-2 w-full h-full">
          <canvas ref={donutRef} />
        </div>
      </div>

      {/* Mini KPI card */}
      <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[280px] md:w-[320px] xl:w-[360px] opacity-40">
        <div className="glass rounded-xl border border-white/10 p-3 text-[10px] md:text-xs text-slate-200/70 flex justify-between">
          <div>
            <div className="text-teal-300 font-semibold">160+ countries</div>
            <div className="opacity-80">have comprehensive DP laws</div>
          </div>
          <div className="text-right">
            <div className="text-teal-300 font-semibold">20+ US states</div>
            <div className="opacity-80">with privacy statutes</div>
          </div>
        </div>
      </div>

      {/* Simple map card with region markers (GDPR, DPDP, etc.) */}
      <div className="absolute bottom-[8%] right-[14%] w-[320px] h-[160px] xl:bottom-[6%] xl:right-[12%] xl:w-[360px] xl:h-[180px] opacity-40 hidden sm:block">
        <div className="glass rounded-xl border border-white/10 p-3 w-full h-full relative">
          <svg viewBox="0 0 800 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="798" height="398" rx="14" ry="14" fill="none" stroke="rgba(255,255,255,0.1)" />
            {/* rough continents silhouettes */}
            <g fill="rgba(255,255,255,0.06)">
              <path d="M120 160 C180 120, 240 120, 300 150 C340 170, 300 200, 240 210 C200 215, 150 200, 120 180 Z" />
              <path d="M420 160 C470 140, 540 130, 620 160 C660 180, 660 210, 600 220 C520 235, 470 220, 430 200 Z" />
              <path d="M300 250 C340 240, 380 240, 420 260 C440 270, 430 285, 380 290 C340 295, 310 280, 300 270 Z" />
            </g>
            {/* markers */}
            <g>
              <circle cx="580" cy="180" r="5" fill="#00e5ff" />
              <text x="590" y="176" fontSize="12" fill="rgba(255,255,255,0.8)">India</text>

              <circle cx="500" cy="165" r="4" fill="#00e5ff" />
              <text x="510" y="162" fontSize="12" fill="rgba(255,255,255,0.8)">EU</text>

              <circle cx="200" cy="180" r="4" fill="#00e5ff" />
              <text x="210" y="176" fontSize="12" fill="rgba(255,255,255,0.8)">USA</text>

              <circle cx="360" cy="220" r="4" fill="#00e5ff" />
              <text x="370" y="218" fontSize="12" fill="rgba(255,255,255,0.8)">Brazil</text>

              <circle cx="660" cy="185" r="4" fill="#00e5ff" />
              <text x="670" y="182" fontSize="12" fill="rgba(255,255,255,0.8)">China</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Extra sparkline cards for a fuller background */}
      <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2 w-[260px] md:w-[300px] h-[100px] xl:w-[340px] xl:h-[110px] xl:bottom-[24%] opacity-40 hidden sm:block">
        <div className="glass rounded-xl border border-white/10 p-2 w-full h-full">
          <svg viewBox="0 0 300 100" className="w-full h-full">
            <g stroke="rgba(0,229,255,0.18)">
              <line x1="0" y1="80" x2="300" y2="80" />
            </g>
            <path d="M10 70 L60 65 L110 60 L160 55 L210 40 L260 35" fill="none" stroke="#00e5ff" strokeWidth="2" opacity="0.8" />
            <circle cx="260" cy="35" r="3" fill="#00e5ff" />
          </svg>
        </div>
      </div>

      <div className="absolute top-[32%] right-[26%] w-[220px] h-[90px] xl:right-[24%] xl:w-[240px] opacity-40 hidden md:block">
        <div className="glass rounded-xl border border-white/10 p-2 w-full h-full">
          <svg viewBox="0 0 220 90" className="w-full h-full">
            <g fill="rgba(0,229,255,0.18)">
              <rect x="10" y="40" width="20" height="30" />
              <rect x="40" y="30" width="20" height="40" />
              <rect x="70" y="20" width="20" height="50" />
              <rect x="100" y="28" width="20" height="42" />
              <rect x="130" y="18" width="20" height="52" />
              <rect x="160" y="34" width="20" height="36" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
