"use client";
import React from "react";
import { BotMessageSquare, BarChart3, Database, ClipboardList, Bell, FileWarning } from "lucide-react";
import { Feature as FeatureTile } from "@/components/site/Feature";
import { Section } from "@/components/site/Section";

export default function PlatformPage() {
  return (
    <Section className="pt-10">
      <h1 className="text-3xl font-semibold mb-6">Platform</h1>
      <p className="text-slate-300/90 mb-8">Explore modules across policy Q&A, risk scoring, and consent ledger.</p>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FeatureTile icon={<BotMessageSquare className="w-5 h-5"/>} title="Policy Q&A on your data" text="Bring your docs and data. Our models answer with citations and retain an audit log."/>
        </div>
        <FeatureTile icon={<BarChart3 className="w-5 h-5"/>} title="Risk scoring" text="See risk heatmaps across DPDP, MCA, GST, Labour, and IT controls."/>
        <FeatureTile icon={<Database className="w-5 h-5"/>} title="Consent Ledger" text="Track consents, withdrawals, and purposes—API & dashboard."/>
        <div className="lg:col-span-2">
          <FeatureTile icon={<ClipboardList className="w-5 h-5"/>} title="DPIA builder" text="Guided DPIA for high‑risk processing & children’s data checks."/>
        </div>
        <FeatureTile icon={<Bell className="w-5 h-5"/>} title="Breach workflow" text="One‑click incident triage, tasks, and regulator/customer notices."/>
        <FeatureTile icon={<FileWarning className="w-5 h-5"/>} title="Filings calendar" text="ROC, GST, TDS, PF/ESI, Shops & Establishments—auto‑tracked."/>
      </div>
    </Section>
  );
}
