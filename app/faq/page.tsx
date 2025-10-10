"use client";
import React from "react";
import { Section } from "@/components/site/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FAQPage(){
  const faqs = [
    {
      q:"How does your AI stay audit‑friendly?",
      a:"Every suggestion includes a citation trail, snapshot of the underlying source, and a human‑review toggle. You can export a signed reasoning log for auditors.",
    },{
      q:"Is this only for DPDP?",
      a:"No—DPDP is core, but we also track ROC/MCA, GST, labour (PF/ESI), Shops & Establishments, IT/security controls, and sectoral add‑ons.",
    },{
      q:"Do you store our data?",
      a:"You control residency. Choose India region by default. Enterprise plan supports on‑prem or air‑gapped deployments.",
    },{
      q:"Will this fit early‑stage startups?",
      a:"Yes. Start with a guided baseline: notices, consent, and breach drill. Add advanced modules as you grow.",
    }
  ];
  return (
    <Section id="faq">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">Frequently asked</h1>
        <p className="text-slate-300/90">Short, straight answers for founders.</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {faqs.map(({q,a}) => (
          <Card key={q} className="glass">
            <CardHeader><CardTitle>{q}</CardTitle></CardHeader>
            <CardContent className="text-slate-300/90 leading-relaxed">{a}</CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
