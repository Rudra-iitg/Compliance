"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";

type Step = {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
};

const steps: Step[] = [
  {
    id: "step-1",
    title: "Struggling with Endless Compliance?",
    description:
      "Running a startup is already hard, but compliance adds another mountain of stress. Endless forms, scattered rules, and confusing legal jargon can leave entrepreneurs feeling stuck.",
    imageAlt: "Overwhelmed Entrepreneur (Start)",
  },
  {
    id: "step-2",
    title: "Compliance Feels Like a Burden",
    description:
      "From data protection to employee regulations, the weight of compliance can feel like it’s crushing small businesses. The DPDP Act 2023 has introduced stricter requirements that many startups are not ready for.",
    imageAlt: "Crushed by Compliance (Documents Piling Up)",
  },
  {
    id: "step-3",
    title: "Understanding the DPDP Act 2023",
    description:
      "The Digital Personal Data Protection Act, 2023 is India’s first full-scale data privacy law. It sets clear rules for how startups must collect, store, and process customer data.",
    imageAlt: "The Act Explained (DPDP 2023)",
  },
  {
    id: "step-4",
    title: "AI to the Rescue",
    description:
      "This is where our AI-powered compliance platform steps in. It reads, organizes, and simplifies all legal documents. Instead of wasting weeks decoding regulations, you get clear, step-by-step guidance.",
    imageAlt: "Our AI Appears (Organizing Chaos)",
  },
  {
    id: "step-5",
    title: "Compliance Made Effortless",
    description: "Our tools automatically:",
    imageAlt: "Simplifying Compliance (Dashboards & Automation)",
  },
  {
    id: "step-6",
    title: "Focus on Growth, Not Paperwork",
    description:
      "With compliance handled, startups can finally shift their focus back to what matters: building great products, reaching customers, and scaling their vision. Compliance is no longer a barrier—it’s an enabler.",
    imageAlt: "Startup Success (Freed from Papers)",
  },
  {
    id: "step-7",
    title: "Be Future-Ready with Compliance AI",
    description:
      "The DPDP Act 2023 is only the beginning. Regulations will keep evolving, but with our AI, you’ll always stay one step ahead. 👉 Take a Tour today and see how compliance becomes effortless.",
    imageAlt: "Call to Action (Future-Ready)",
  },
];

const ImageCard: React.FC<{ alt: string; src: string; tilt?: number }> = ({ alt, src, tilt = -2 }) => (
  <motion.div
  initial={{ opacity: 0, y: 40, scale: 0.96, rotate: tilt }}
  whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
    viewport={{ once: false, amount: 0.35 }}
  transition={{ type: "spring", stiffness: 140, damping: 22 }}
  whileHover={{ scale: 1.02 }}
  className="group relative w-full max-w-2xl"
  >
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
      <img
        src={src}
        alt={alt}
    className="w-full h-[60vh] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
      />
    </div>
    <div className="pointer-events-none absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
      boxShadow: "0 0 0 1px rgba(255,255,255,.06), 0 20px 50px rgba(0,0,0,.4)",
    }} />
  </motion.div>
);

const TextBlock: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.4 }}
    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    className="max-w-xl"
  >
    <h2 className="text-3xl font-semibold mb-3">{title}</h2>
    <p className="text-slate-300/90 text-lg">{description}</p>
  </motion.div>
);

// New themed block with different lighting and parallax text
const ThemeShiftBlock: React.FC<{ innerRef?: React.RefObject<HTMLDivElement | null> }> = ({ innerRef }) => {
  const localRef = useRef<HTMLDivElement | null>(null);
  const ref = innerRef ?? localRef;
  const inView = useInView(ref, { amount: 0.5, once: false });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -60]);
  // Fast but smooth shift to darker theme, then stay dark through this block
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 1]);

  return (
    <section ref={ref} id="theme-shift" className="relative min-h-screen flex items-center">
      {/* Crossfading overlay gradient for a different lighting */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(2,6,23,0.95), rgba(15,23,42,0.95)), radial-gradient(60% 60% at 20% 30%, rgba(99,102,241,0.18), transparent), radial-gradient(50% 50% at 80% 70%, rgba(47,230,200,0.16), transparent)",
          opacity: overlayOpacity,
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h2 style={{ y: y1 }} className="text-4xl font-semibold mb-4">From Noise to Clarity</motion.h2>
          <motion.p style={{ y: y2 }} className="text-slate-300/90 text-lg">
            After mapping and automation, teams operate with confidence. Obligations, evidence, and reviews live in one place — no spreadsheets, no guesswork. The system adapts as regulations evolve.
          </motion.p>
          <div className="mt-6 flex gap-3">
            <Button asChild className="bg-indigo-500 hover:bg-indigo-400"><Link href="/platform">Try the platform</Link></Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10"><Link href="/pricing">See pricing</Link></Button>
          </div>
        </div>
        <motion.div initial={{opacity:0, scale:.96, rotate:-2}} whileInView={{opacity:1, scale:1, rotate:0}} viewport={{once:false, amount:.4}} transition={{type:"spring", stiffness:140, damping:22}} className="glass rounded-3xl p-6">
          <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10" />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-6 rounded bg-white/5 border border-white/10" />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function TourPage() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const angle = useTransform(scrollYProgress, [0, 1], [120, 360]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.4]);
  const bg = useTransform([angle, opacity], ([a, o]) => `conic-gradient(from ${a}deg, rgba(47,230,200,${o}), rgba(99,102,241,${o}), rgba(255,200,97,${o}))`);

  // Global dark background that crossfades in starting from the theme-shift section and persists
  const themeRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: themeProgress } = useScroll({ target: themeRef, offset: ["start 90%", "end start"] });
  const darkOpacity = useTransform(themeProgress, [0, 0.2, 1], [0, 1, 1]);
  const darkAngle = useTransform(scrollYProgress, [0, 1], [0, 540]);
  const darkBg = useTransform(darkAngle, (a) =>
    `linear-gradient(135deg, rgba(2,6,23,0.96), rgba(15,23,42,0.96)), conic-gradient(from ${a}deg, rgba(47,230,200,0.08), rgba(99,102,241,0.12), rgba(255,200,97,0.08))`
  );

  // Determine active section for dot navigation
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const handler = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-tour-section]"));
      const center = window.innerHeight / 2;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      nodes.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIdx(best);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const FloatingShapes = () => (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -120]) }} className="absolute -top-24 -left-24 w-96 h-96 rounded-full blob" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }} className="absolute -bottom-32 -right-20 w-[34rem] h-[34rem] rounded-full blob" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }} className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full blob" />
    </div>
  );

  const SectionDots: React.FC = () => (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
      {steps.map((s, i) => (
        <button
          key={s.id}
          aria-label={`Go to ${s.title}`}
          onClick={() => scrollToId(s.id)}
          className={`w-3 h-3 rounded-full border border-white/30 transition-colors ${activeIdx === i ? "bg-white/80" : "bg-white/10 hover:bg-white/20"}`}
        />
      ))}
    </div>
  );

  return (
    <div ref={pageRef} className="relative">
      {/* Animated background using existing theme colors */}
      <motion.div aria-hidden className="fixed inset-0 -z-10" style={{ backgroundImage: bg }} />
  {/* Dark theme background that crossfades in from the theme-shift onward */}
  <motion.div aria-hidden className="fixed inset-0 -z-9 pointer-events-none" style={{ backgroundImage: darkBg, opacity: darkOpacity }} />
  <FloatingShapes />
  <SectionDots />

      {/* Intro hero */}
      <Section id="tour-hero" className="relative min-h-screen flex items-center pt-24">
        <div className="mx-auto text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1 text-sm">Take the tour</div>
          <h1 className="mt-5 text-4xl sm:text-5xl font-semibold tracking-tight">How we solve compliance</h1>
          <p className="mt-4 text-slate-300/90">A quick, immersive walkthrough of mapping, generation, tracking, and audit‑readiness — built for India.</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild className="bg-indigo-500 hover:bg-indigo-400"><Link href="/platform">Explore platform</Link></Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10"><Link href="/dpdp">What is DPDP?</Link></Button>
          </div>
        </div>
      </Section>

      {/* 7 immersive sections */}
  {steps.map((s, i) => (
        <Section key={s.id} id={s.id} className="min-h-screen flex items-center" >
          <div data-tour-section className={`w-full ${""}`}>
            <div className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}>
      <ImageCard alt={s.imageAlt} src={`/${i+1}.png`} tilt={i % 2 === 0 ? -2 : 2} />
              <div className="space-y-4">
                <TextBlock title={s.title} description={s.description} />
                {/* Contextual bullets */}
                {(() => {
                  const bullets =
                    i === 2
                      ? [
                          "Consent-first: Every business must collect user consent before storing personal data.",
                          "User Rights: Customers can request access, correction, or deletion of their data.",
                          "Penalties: Fines can reach up to ₹250 crore for violations.",
                        ]
                      : i === 4
                      ? [
                          "Generate checklists for your business.",
                          "Highlight risks before they become penalties.",
                          "Provide real-time dashboards so you always know where you stand.",
                        ]
                      : null;
                  return bullets ? (
                    <>
                      <ul className="text-slate-300/80 list-disc pl-5 space-y-1">
                        {bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      {i === 4 && (
                        <p className="text-slate-300/90 mt-2">No more manual tracking. No more fear of missing deadlines.</p>
                      )}
                    </>
                  ) : null;
                })()}
                <div className="flex gap-3">
                  {i === 2 ? (
                    <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10"><Link href="/dpdp">Learn about DPDP</Link></Button>
                  ) : (
                    <Button asChild className="bg-indigo-500 hover:bg-indigo-400"><Link href="/platform">See the platform</Link></Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Section>
      ))}

  {/* Theme-shift section: different lighting + parallax text */}
  <ThemeShiftBlock innerRef={themeRef} />

      {/* DPDP Deep‑Dive */}
      <Section id="dpdp-deep-dive" className="min-h-screen flex items-center">
        <div className="w-full">
          <h2 className="text-3xl font-semibold mb-6">DPDP 2023 — quick deep‑dive</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[{
              t: "Roles & scope",
              d: "Data Fiduciaries decide purpose and means; processors act on instructions. Applies to digital personal data in India and certain processing outside India that targets individuals in India.",
            },{
              t: "Consent & notices",
              d: "Clear, specific notices with a valid lawful basis; withdrawals honored as easily as consent was given.",
            },{
              t: "Rights",
              d: "Access, correction, erasure, grievance redressal; a consent manager may be used by Data Principals.",
            },{
              t: "Security & breaches",
              d: "Reasonable safeguards and breach intimation to the Data Protection Board of India and affected individuals when warranted.",
            },{
              t: "Cross‑border transfers",
              d: "Transfers permitted subject to countries notified by the Central Government and applicable conditions.",
            },{
              t: "Penalties",
              d: "Significant monetary penalties for non‑compliance; accountability and prompt remediation are emphasized.",
            }].map(({t,d}) => (
              <motion.div key={t} initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:false, amount:.35}} transition={{duration:.45}} className="glass rounded-2xl p-5">
                <div className="font-semibold mb-2">{t}</div>
                <p className="text-slate-300/90 text-sm">{d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-sm text-slate-400/80">
            Sources: public summaries and the text of the law. Please consult official notifications for the latest.
          </div>
        </div>
      </Section>

      {/* Horizontal scroller: Key Rights */}
      <Section id="rights" className="min-h-screen flex items-center">
        <div className="w-full">
          <h2 className="text-3xl font-semibold mb-4">Key rights (at a glance)</h2>
          <div className="overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 min-w-max pr-8">
              {[{
                t: "Access",
                d: "Know what data is processed and request a copy in a reasonable format.",
              },{
                t: "Correction",
                d: "Correct inaccurate or misleading personal data maintained about you.",
              },{
                t: "Erasure",
                d: "Request deletion when no longer necessary or when consent is withdrawn.",
              },{
                t: "Grievance",
                d: "Escalate unresolved issues to grievance redressal and, if needed, to the Board.",
              }].map(({t,d},i) => (
                <motion.div key={t} initial={{opacity:0, x:40}} whileInView={{opacity:1, x:0}} viewport={{once:false, amount:.4}} transition={{type:"spring", stiffness:140, damping:22, delay:i*0.05}} className="snap-center w-[22rem] glass rounded-2xl p-5">
                  <div className="font-semibold mb-2">{t}</div>
                  <p className="text-slate-300/90 text-sm">{d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section id="tour-cta" className="min-h-[70vh] flex items-center">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-semibold">Ready to get started?</h2>
          <p className="text-slate-300/90 mt-3">Take the next step — try the platform or open the checklist. Replace any images above with your own to customize the story.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-indigo-500 hover:bg-indigo-400"><Link href="/platform">Get Started</Link></Button>
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10"><Link href="/checklist">Open Checklist</Link></Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
