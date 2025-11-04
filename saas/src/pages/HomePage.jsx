import React, { useEffect, useRef } from 'react'
import { Chart, BarElement, BarController, CategoryScale, LinearScale, LineController, LineElement, PointElement, Filler, Tooltip, Legend, Title } from 'chart.js'

Chart.register(BarElement, BarController, CategoryScale, LinearScale, LineController, LineElement, PointElement, Filler, Tooltip, Legend, Title)

export default function HomePage() {
  const barRef = useRef(null)
  const lineRef = useRef(null)
  const barChart = useRef(null)
  const lineChart = useRef(null)

  useEffect(() => {
    // tsParticles background via global script (loaded in index.html)
    const loadParticles = async () => {
      if (!window.tsParticles) return
      await window.tsParticles.load({
        id: 'tsparticles',
        options: {
          background: { color: { value: '#0b0c2a' } },
          fullScreen: { enable: true, zIndex: -1 },
          interactivity: {
            events: { onHover: { enable: true, mode: 'grab' } },
            modes: { grab: { distance: 140, links: { opacity: 0.4 } } }
          },
          particles: {
            number: { value: 80, density: { enable: true } },
            color: { value: '#00e5ff' },
            links: { color: { value: '#00e5ff' }, enable: true, opacity: 0.2, width: 1, distance: 150 },
            move: { enable: true, speed: 0.5 },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.3 }
          }
        }
      })
    }
    loadParticles()

    const text = 'rgba(255,255,255,0.7)'
    const grid = 'rgba(0,229,255,0.1)'
    const accent = 'rgba(0,229,255,1)'
    const accentBG = 'rgba(0,229,255,0.2)'
    const accentBGLine = 'rgba(0,229,255,0.1)'

    if (barRef.current) {
      barChart.current = new Chart(barRef.current, {
        type: 'bar',
        data: { labels: ['2014','2024'], datasets: [{ label: 'Recognized Startups', data: [700, 140000], backgroundColor: accentBG, borderColor: accent, borderWidth: 1 }]},
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: grid }, ticks: { color: text } }, x: { grid: { display: false }, ticks: { color: text } } } }
      })
    }

    if (lineRef.current) {
      lineChart.current = new Chart(lineRef.current, {
        type: 'line',
        data: { labels: ['2011','2018','2025'], datasets: [{ label: 'Total Unicorns', data: [1,14,120], backgroundColor: accentBGLine, borderColor: accent, pointBackgroundColor: '#00e5ff', fill: true, tension: 0.4 }]},
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: grid }, ticks: { color: text } }, x: { grid: { display: false }, ticks: { color: text } } } }
      })
    }

    return () => {
      barChart.current?.destroy()
      lineChart.current?.destroy()
    }
  }, [])

  return (
    <div className="relative">
      <div id="tsparticles"></div>
      <main className="relative max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center text-white">
        <section>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Compliance that feels <span className="text-accent">frictionless.</span></h1>
          <p className="mt-4 text-white/80 max-w-xl">We turn India's complex compliance stack into a guided, automated workflow—purpose-built for startups and SMBs. Smooth animations. Solid controls. Zero jargon.</p>
          <div className="mt-8 flex gap-3">
            <a href="/signup" className="px-4 py-2 rounded-md bg-accent text-black text-sm font-medium">Get Started for Free</a>
            <a href="/contact" className="px-4 py-2 rounded-md border border-white/20 text-white text-sm hover:bg-white/10">Book a Demo</a>
          </div>
        </section>
        <section className="grid gap-4">
          <div className="glass p-5">
            <div className="text-sm text-white/80 mb-2">Indian Startup Ecosystem Growth</div>
            <div className="h-[220px]"><canvas ref={barRef} /></div>
          </div>
          <div className="glass p-5">
            <div className="text-sm text-white/80 mb-2">India's Unicorns (Valued $1B+)</div>
            <div className="h-[220px]"><canvas ref={lineRef} /></div>
          </div>
          <div className="glass p-5">
            <div className="text-sm text-white/80 mb-2">Global Compliance Landscape</div>
            <ul className="text-sm">
              <li className="py-1 border-b border-white/10"><strong className="text-accent">EU:</strong> GDPR</li>
              <li className="py-1 border-b border-white/10"><strong className="text-accent">India:</strong> DPDP Act</li>
              <li className="py-1 border-b border-white/10"><strong className="text-accent">USA:</strong> CCPA / CPRA</li>
              <li className="py-1 border-b border-white/10"><strong className="text-accent">Brazil:</strong> LGPD</li>
              <li className="py-1"><strong className="text-accent">China:</strong> PIPL</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}
