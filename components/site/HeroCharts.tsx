"use client";

import React, { useEffect, useRef } from "react";
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
);

export const HeroCharts: React.FC = () => {
  const barRef = useRef<HTMLCanvasElement | null>(null);
  const lineRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<Chart | null>(null);
  const lineChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const chartTextColor = "rgba(255, 255, 255, 0.7)";
    const chartGridColor = "rgba(0, 229, 255, 0.1)";
    const chartAccent = "rgba(0, 229, 255, 1)";
    const chartAccentBG = "rgba(0, 229, 255, 0.2)";
    const chartAccentBGLine = "rgba(0, 229, 255, 0.1)";

    if (barRef.current) {
      barChartRef.current = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: ["2014", "2024"],
          datasets: [
            {
              label: "Recognized Startups",
              data: [700, 140000],
              backgroundColor: chartAccentBG,
              borderColor: chartAccent,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, title: { display: false } },
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

    if (lineRef.current) {
      lineChartRef.current = new Chart(lineRef.current, {
        type: "line",
        data: {
          labels: ["2011", "2018", "2025"],
          datasets: [
            {
              label: "Total Unicorns",
              data: [1, 14, 120],
              backgroundColor: chartAccentBGLine,
              borderColor: chartAccent,
              pointBackgroundColor: "#00e5ff",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, title: { display: false } },
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

    return () => {
      barChartRef.current?.destroy();
      lineChartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <div className="grid gap-4">
        <div className="glass rounded-2xl p-5 border border-white/10">
          <div className="text-sm text-slate-300/90 mb-2">Indian Startup Ecosystem Growth</div>
          <div style={{ height: 220 }}>
            <canvas ref={barRef} />
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-white/10">
          <div className="text-sm text-slate-300/90 mb-2">India's Unicorns (Valued $1B+)</div>
          <div style={{ height: 220 }}>
            <canvas ref={lineRef} />
          </div>
        </div>

        <div className="glass rounded-2xl p-5 border border-white/10">
          <div className="text-sm text-slate-300/90 mb-2">Global Compliance Landscape</div>
          <ul className="text-sm m-0 p-0 list-none">
            <li className="py-1 border-b border-white/10"><strong className="text-teal-300">EU:</strong> GDPR</li>
            <li className="py-1 border-b border-white/10"><strong className="text-teal-300">India:</strong> DPDP Act</li>
            <li className="py-1 border-b border-white/10"><strong className="text-teal-300">USA:</strong> CCPA / CPRA</li>
            <li className="py-1 border-b border-white/10"><strong className="text-teal-300">Brazil:</strong> LGPD</li>
            <li className="py-1"><strong className="text-teal-300">China:</strong> PIPL</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
