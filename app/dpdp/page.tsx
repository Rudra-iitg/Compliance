"use client";
import React from "react";
import { Landmark, LockKeyhole, ShieldCheck, ListChecks, Building2, Scale } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Feature as FeatureTile } from "@/components/site/Feature";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DPDPPage(){
  const bullets = [
    { icon: <LockKeyhole className="w-5 h-5"/>, title: "Lawful basis & notice", text: "Process digital personal data with consent or legitimate uses; provide clear notice of purposes." },
    { icon: <ShieldCheck className="w-5 h-5"/>, title: "Security safeguards", text: "Implement reasonable security to prevent data breach; report breaches as per rules." },
    { icon: <ListChecks className="w-5 h-5"/>, title: "Data Principal rights", text: "Access, correction, erasure, grievance redressal, and the right to nominate." },
    { icon: <Building2 className="w-5 h-5"/>, title: "Significant Data Fiduciaries", text: "Govt.-notified entities face additional obligations like DPIAs, audits, DPO, and data audits." },
    { icon: <Scale className="w-5 h-5"/>, title: "Penalties", text: "Serious violations can attract penalties up to ₹250 crore depending on the breach category." },
  ];

  return (
    <Section id="dpdp">
      <div className="flex items-center gap-3 mb-8"><Landmark className="w-5 h-5 text-amber-300"/><h1 className="text-3xl font-semibold tracking-tight">Digital Personal Data Protection Act, 2023 — essentials</h1></div>
      <div className="grid lg:grid-cols-3 gap-6">
        {bullets.map((b) => (
          <FeatureTile key={b.title as string} icon={b.icon} title={b.title} text={b.text} />
        ))}
      </div>
      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader><CardTitle>Who is a Data Fiduciary?</CardTitle></CardHeader>
          <CardContent className="text-slate-300/90 leading-relaxed">
            An entity that determines the purpose and means of processing digital personal data. Processors act on behalf of a fiduciary. Some fiduciaries may be notified as <em>Significant Data Fiduciaries</em> based on risk factors (volume/sensitivity of data, risk to individuals, sovereignty/electoral impact, use of emerging tech), bringing extra duties like DPIA, audit, and appointing a DPO.
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader><CardTitle>Rights of individuals (Data Principals)</CardTitle></CardHeader>
          <CardContent className="text-slate-300/90 leading-relaxed">
            Access your data, request correction/erasure, seek grievance redressal, and nominate someone to act for you in case of death/incapacity. Clear notices and easy consent withdrawal must be provided.
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <Card className="glass">
          <CardHeader><CardTitle>Children’s data</CardTitle></CardHeader>
          <CardContent className="text-slate-300/90">Verifiable parental consent, no tracking/behavioural monitoring or targeted ads to children. Limited exemptions may be prescribed.
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader><CardTitle>Legitimate uses</CardTitle></CardHeader>
          <CardContent className="text-slate-300/90">Certain situations allow processing without explicit consent (e.g., compliance with law/judicial order, medical emergency, disaster response, or reasonable expectations in limited contexts), with safeguards.
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader><CardTitle>Penalties</CardTitle></CardHeader>
          <CardContent className="text-slate-300/90">A schedule under the Act caps penalties by category; failure to implement security safeguards can attract up to ₹250 crore per instance. Factors like severity and duration influence final amounts.
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
