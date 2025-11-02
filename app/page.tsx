"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChevronRight,
  Cpu,
  ScrollText,
  FileCheck2,
  AlarmClockCheck,
  SearchCheck,
  ShieldCheck,
  CheckCircle2,
  Landmark,
  Rocket,
  MessageSquare,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/site/Section";
import { Feature as FeatureTile } from "@/components/site/Feature";
import { HeroDataBackground } from "@/components/site/HeroDataBackground";
import Link from "next/link";

// --- Visual helpers ---
const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm glass border-white/10">
    <Rocket className="w-4 h-4" /> {children}
  </span>
);

const Parallax: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -top-24 -left-24 w-96 h-96 rounded-full blob" />
      <motion.div style={{ y: y2 }} className="absolute -bottom-32 -right-20 w-[34rem] h-[34rem] rounded-full blob" />
      <motion.div style={{ y: y3 }} className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full blob" />
    </div>
  );
};

// --- Sections ---
const Hero = () => (
  <Section id="home" className="relative pt-28 pb-24">
    <Parallax />
    <HeroDataBackground />
    <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <Pill>Compliance Project • DPDP 2023 ready</Pill>
        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
          Compliance that feels <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,var(--teal),var(--amber))" }}>frictionless</span>.
        </h1>
        <p className="mt-4 text-slate-300/90 max-w-xl">We turn India’s complex compliance stack into a guided, automated workflow—purpose-built for startups and SMBs. Smooth animations. Solid controls. Zero jargon.</p>
        <div className="mt-8 flex gap-3">
          <Button asChild className="bg-indigo-500 hover:bg-indigo-400">
            <Link href="/platform"><ChevronRight className="w-4 h-4 mr-1"/> See the platform</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link href="/dpdp">Learn DPDP</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {["5x faster", "Audit-ready", "Human-in-loop"].map((t) => (
            <div key={t} className="glass rounded-xl p-4 text-center text-sm">{t}</div>
          ))}
        </div>
      </div>
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
        <div className="absolute -inset-6 blur-2xl rounded-3xl" style={{ background: "conic-gradient(from 120deg, rgba(47,230,200,.25), rgba(99,102,241,.25), rgba(255,200,97,.25))" }}/>
        <Card className="relative glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cpu className="w-5 h-5 text-teal-300"/> AI Compliance Co‑pilot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-slate-200/90">
            <div className="grid sm:grid-cols-2 gap-4">
              <FeatureTile icon={<ScrollText className="w-4 h-4"/>} title="Reg mapping" text="We map laws/regs to your business model and generate tailored controls."/>
              <FeatureTile icon={<FileCheck2 className="w-4 h-4"/>} title="Auto‑documents" text="Notices, policies, RoPA, DPAs—generated, versioned, and signed."/>
              <FeatureTile icon={<AlarmClockCheck className="w-4 h-4"/>} title="Calendar & alerts" text="Never miss a due date: MCA, GST, labour, DPDP—smart reminders."/>
              <FeatureTile icon={<SearchCheck className="w-4 h-4"/>} title="Evidence capture" text="Attach proofs, run checks, and export audit‑ready trails."/>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </Section>
);

const Trust = () => (
  <Section id="trust" className="pt-0">
    <div className="grid sm:grid-cols-3 gap-4">
      {[{icon:<Rocket className="w-4 h-4"/>,label:"5x Faster"},{icon:<ShieldCheck className="w-4 h-4"/>,label:"Audit‑ready"},{icon:<CheckCircle2 className="w-4 h-4"/>,label:"Human‑in‑loop"}].map(({icon,label}) => (
        <div key={label} className="glass rounded-xl p-4 text-center text-sm flex items-center justify-center gap-2">
          {icon} <span>{label}</span>
        </div>
      ))}
    </div>
  </Section>
);

const Overview = () => (
  <Section id="overview">
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-semibold mb-3">Compliance, distilled</h2>
        <p className="text-slate-300/90 mb-4">Compliance Project turns India’s complex obligations into a guided, automated workflow. Map your business, generate controls, review with humans, and export audit trails—all in one place.</p>
        <div className="flex gap-3">
          <Button asChild className="bg-indigo-500 hover:bg-indigo-400">
            <Link href="/platform"><ChevronRight className="w-4 h-4 mr-1"/> Explore the platform</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <FeatureTile icon={<ScrollText className="w-4 h-4"/>} title="Reg mapping" text="Tailored controls mapped to your model."/>
        <FeatureTile icon={<FileCheck2 className="w-4 h-4"/>} title="Auto‑documents" text="Policies, RoPA, DPAs, notices."/>
        <FeatureTile icon={<AlarmClockCheck className="w-4 h-4"/>} title="Alerts & calendar" text="Never miss a deadline."/>
        <FeatureTile icon={<SearchCheck className="w-4 h-4"/>} title="Evidence capture" text="Audit‑ready exports."/>
      </div>
    </div>
  </Section>
);

const DPDPHighlight = () => (
  <Section id="dpdp-highlight" className="pt-0">
    <div className="glass rounded-2xl p-6">
      <div className="flex items-start gap-3">
        <Landmark className="w-5 h-5 text-amber-300 mt-1"/>
        <div>
          <h3 className="text-xl font-semibold mb-1">Digital Personal Data Protection Act, 2023</h3>
          <p className="text-slate-300/90">Understand roles, rights, lawful bases, and safeguards under DPDP. We operationalize the essentials with templates, workflows, and alerts.</p>
          <div className="mt-4">
            <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/dpdp">Learn about DPDP</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const HowItWorks = () => (
  <Section id="how-it-works">
    <h2 className="text-3xl font-semibold mb-6">How it works</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[{
        t:"Map & assess",
        d:"Answer guided prompts about your data, vendors, and processes.",
      },{
        t:"Generate controls",
        d:"Policies, notices, RoPA, DPAs and task lists auto‑generated.",
      },{
        t:"Human review",
        d:"Use the co‑pilot with citations; approve and version changes.",
      },{
        t:"Track & evidence",
        d:"Calendar, alerts, and exportable audit trails and proofs.",
      }].map(({t,d},i) => (
        <motion.div key={t} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass rounded-xl p-5">
          <div className="text-sm text-slate-300/80 mb-2">Step {i+1}</div>
          <div className="font-semibold mb-1">{t}</div>
          <div className="text-slate-300/90 text-sm">{d}</div>
        </motion.div>
      ))}
    </div>
    <div className="mt-6">
      <Button asChild className="bg-indigo-500 hover:bg-indigo-400"><Link href="/checklist">Open the checklist</Link></Button>
    </div>
  </Section>
);

const SocialProof = () => (
  <Section id="social-proof" className="pt-0">
    <div className="glass rounded-2xl p-6">
      <div className="text-sm text-slate-300/80 mb-4">Trusted by teams who care about being audit‑ready</div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 items-center">
        {["Acme", "Nova", "ZenData", "Quant", "Helix", "Orbit"].map((name) => (
          <div key={name} className="text-center text-slate-300/70 text-sm hover:text-white transition-colors">{name}</div>
        ))}
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {[{
          q:"We closed audits faster",
          a:"Cut prep time from weeks to days with clear tasks and exports.",
        },{
          q:"Not just templates",
          a:"The co‑pilot cites sources and keeps a signed reasoning trail.",
        }].map(({q,a}) => (
          <div key={q} className="glass rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2"><MessageSquare className="w-4 h-4"/><span className="font-medium">{q}</span></div>
            <p className="text-slate-300/90 text-sm">{a}</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const FinalCTA = () => (
  <Section id="get-started">
    <div className="text-center">
      <h2 className="text-3xl font-semibold">Ready to get compliant?</h2>
      <p className="text-slate-300/90 mt-2">Start free, explore the platform, or talk to us about high‑risk workflows.</p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="bg-indigo-500 hover:bg-indigo-400"><a href="/platform">See the platform</a></Button>
        <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10"><a href="/pricing">See pricing</a></Button>
      </div>
      <div className="mt-3">
        <Link href="/about" className="text-sm text-slate-300/80 hover:text-white inline-flex items-center gap-2"><Mail className="w-4 h-4"/> Contact</Link>
      </div>
    </div>
  </Section>
);

export default function ComplianceSite() {
  return (
    <div className="relative min-h-screen">
      <Hero />
      <Trust />
      <Overview />
      <DPDPHighlight />
      <HowItWorks />
      <SocialProof />
      <FinalCTA />
    </div>
  );
}
