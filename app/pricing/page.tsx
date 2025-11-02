"use client";
import React from "react";
import { Section } from "@/components/site/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Minus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage(){
  const plans = [
    { name: "Starter", price: "₹0", tag: "For early teams", features: ["Compliance health check", "DPDP templates", "Email alerts", "Up to 3 users"] },
    { name: "Growth", price: "₹6,999/mo", tag: "Most popular", features: ["Automated filings calendar", "Consent ledger", "DPIA builder", "Slack/MS Teams bots", "Unlimited requests"] },
    { name: "Enterprise", price: "Custom", tag: "High-risk/SDF", features: ["Dedicated DPO workspace", "Audit trails", "Custom controls mapping", "SSO & fine-grained roles", "On-prem/air-gapped"] },
  ];
  const compare = [
    { name: "Compliance health check", starter: true, growth: true, enterprise: true },
    { name: "DPDP templates", starter: true, growth: true, enterprise: true },
    { name: "Automated filings calendar", starter: false, growth: true, enterprise: true },
    { name: "Consent ledger", starter: false, growth: true, enterprise: true },
    { name: "DPIA builder", starter: false, growth: true, enterprise: true },
    { name: "Slack / MS Teams bots", starter: false, growth: true, enterprise: true },
    { name: "Users", starter: "Up to 3", growth: "Up to 50", enterprise: "Unlimited" },
    { name: "SSO & granular roles", starter: false, growth: false, enterprise: true },
    { name: "Dedicated DPO workspace", starter: false, growth: false, enterprise: true },
    { name: "Custom controls mapping", starter: false, growth: false, enterprise: true },
    { name: "Audit trails", starter: false, growth: false, enterprise: true },
    { name: "On-prem / air-gapped", starter: false, growth: false, enterprise: true },
  ];
  return (
    <>
      <Section id="pricing">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold">Simple pricing for real progress</h1>
          <p className="text-slate-300/90">Start free. Scale as your risk surface grows.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <Card key={p.name} className={`glass relative overflow-hidden ${i===1 ? "ring-1 ring-teal-300/40" : ""}`}>
              {i===1 && (
                <div className="absolute -inset-16 bg-[conic-gradient(from_120deg,rgba(47,230,200,.18),rgba(99,102,241,.18),rgba(255,200,97,.18))] blur-2xl" aria-hidden/>
              )}
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2">{i===1 && <Star className="w-4 h-4 text-teal-300"/>}{p.name}</span>
                  <span className="text-xs text-amber-300">{p.tag}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-semibold mb-4">{p.price}</div>
                <ul className="space-y-2 text-slate-200/90">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 text-teal-300"/> {f}</li>
                  ))}
                </ul>
                <Button asChild className="w-full mt-6 bg-indigo-500 hover:bg-indigo-400">
                  <a href={p.name === "Enterprise" ? "/about" : "/platform"}>
                    {p.name === "Enterprise"
                      ? "Contact Sales"
                      : p.name === "Starter"
                      ? "Get started for free"
                      : "Get started"}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center text-xs text-slate-300/70">All prices in INR. Taxes extra. Cancel anytime.</div>
      </Section>

      {/* Comparison Section */}
      <Section id="comparison" className="pt-0">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Compare plans</h2>
          <p className="text-slate-300/90">Pick the plan that fits your risk profile and team size.</p>
        </div>
        <div className="glass rounded-2xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-4 text-sm">
            <div className="p-3 font-medium bg-white/5">Feature</div>
            <div className="p-3 font-medium text-center bg-white/5">Starter</div>
            <div className="p-3 font-medium text-center bg-white/5">Growth</div>
            <div className="p-3 font-medium text-center bg-white/5">Enterprise</div>
            {compare.map((row, idx) => (
              <React.Fragment key={row.name}>
                <div className={`p-3 ${idx%2?"bg-white/0":"bg-white/5"}`}>{row.name}</div>
                {[row.starter, row.growth, row.enterprise].map((val, i) => (
                  <div key={i} className={`p-3 text-center ${idx%2?"bg-white/0":"bg-white/5"}`}>
                    {val === true ? (
                      <CheckCircle2 className="inline w-4 h-4 text-teal-300"/>
                    ) : val === false ? (
                      <Minus className="inline w-4 h-4 text-slate-400"/>
                    ) : (
                      <span className="text-slate-200/90">{val as string}</span>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Section>

      {/* Need more details */}
      <Section id="contact" className="pt-0">
        <div className="glass rounded-2xl p-6 border border-white/10">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-1">Need more details?</h3>
              <p className="text-slate-300/90">Have high-risk workflows, SDF/SRO needs, or procurement requirements? Talk to us and we’ll tailor a rollout.</p>
            </div>
            <div className="flex gap-3 md:justify-end">
              <Button asChild className="bg-indigo-500 hover:bg-indigo-400"><a href="/about">Talk to us</a></Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10"><a href="/platform">See the platform</a></Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
