"use client";
import React from "react";
import { Section } from "@/components/site/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage(){
  const plans = [
    { name: "Starter", price: "₹0", tag: "For early teams", features: ["Compliance health check", "DPDP templates", "Email alerts", "Up to 3 users"] },
    { name: "Growth", price: "₹6,999/mo", tag: "SMBs scaling", features: ["Automated filings calendar", "Consent ledger", "DPIA builder", "Slack/MS Teams bots", "Unlimited requests"] },
    { name: "Enterprise", price: "Custom", tag: "High-risk/SDF", features: ["Dedicated DPO workspace", "Audit trails", "Custom controls mapping", "SSO & fine-grained roles", "On-prem/air-gapped"] },
  ];
  return (
    <Section id="pricing">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">Simple pricing for real progress</h1>
        <p className="text-slate-300/90">Start free. Scale as your risk surface grows.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <Card key={p.name} className={`glass ${i===1?"ring-1 ring-teal-300/40":""}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between"><span>{p.name}</span><span className="text-xs text-amber-300">{p.tag}</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold mb-4">{p.price}</div>
              <ul className="space-y-2 text-slate-200/90">
                {p.features.map(f => <li key={f} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5"/> {f}</li>)}
              </ul>
              <button className="w-full mt-6 bg-indigo-500 hover:bg-indigo-400 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white">Get started</button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
