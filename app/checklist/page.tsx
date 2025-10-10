"use client";
import React from "react";
import { Section } from "@/components/site/Section";
import { ListChecks, CheckCircle2 } from "lucide-react";

export default function ChecklistPage(){
  const items = [
    "Register a Data Protection Officer / Grievance Officer",
    "Map data flows & build a RoPA (Record of Processing Activities)",
    "Draft notices, consent text, and a privacy policy aligned to DPDP",
    "Set up a Consent Ledger + preference center",
    "Create workflows for access / correction / erasure / grievance",
    "Vendor risk assessment & DPAs with processors",
    "Security controls: encryption, backups, breach drill & reporting",
    "DPIA templates for high-risk processing + child data checks",
  ];
  return (
    <Section id="checklist">
      <div className="flex items-center gap-3 mb-6"><ListChecks className="w-5 h-5 text-teal-300"/><h1 className="text-3xl font-semibold">Foundational startup compliance checklist</h1></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 glass rounded-xl p-4">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-teal-300"/>
            <span className="text-slate-200/90">{item}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
