"use client";
import React from "react";
import { Landmark, LockKeyhole, ShieldCheck, ListChecks, Building2, Scale, Gavel, Shield, FileWarning, GlobeLock, Users, AlertCircle, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CardWrap: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string; delay?: string }>=({title, icon, children, className="", delay=""})=> (
  <div className={`dpdp-card ${className} fade-in-up ${delay}`}>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <div className="text-slate-300/90 leading-relaxed text-sm">
      {children}
    </div>
  </div>
);

export default function DPDPPage(){
  // Add and remove body class for the shadow map background on this route only
  React.useEffect(() => { 
    document.body.classList.add("dpdp-map"); 
    return () => document.body.classList.remove("dpdp-map"); 
  }, []);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="dpdp-hero">
        <div className="max-w-5xl mx-auto px-4">
          <div className="dpdp-hero-icon fade-in-up">
            <Shield className="w-10 h-10 text-teal-300"/>
          </div>
          <h1 className="dpdp-hero-title fade-in-up delay-100">
            Understanding the Digital Personal Data Protection Act (DPDP) 2023
          </h1>
          <p className="dpdp-hero-subtitle max-w-3xl mx-auto fade-in-up delay-200">
            Your Essential Guide to India's New Data Privacy Law and Its Impact on Businesses and Individuals
          </p>
          <p className="text-slate-300/70 max-w-2xl mx-auto mb-6 fade-in-up delay-300">
            The Digital Personal Data Protection Act, 2023 is India's comprehensive data protection legislation that establishes clear rules for how organizations must handle personal data. This landmark law introduces stringent obligations for businesses while empowering individuals with significant rights over their personal information.
          </p>
          <div className="flex items-center justify-center gap-4 fade-in-up delay-400">
            <a 
              href="https://egazette.gov.in/WriteReadData/2023/247847.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-md border border-white/20 text-white hover:bg-white/10 text-sm transition-colors"
            >
              <Download className="w-4 h-4"/>
              Download Official Act (PDF)
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* SECTION 1: The Key Players */}
      <section className="dpdp-section">
        <h2 className="dpdp-section-header">
          <Users className="w-6 h-6 inline-block mr-2 align-text-bottom"/>
          The Key Players — Who is Involved?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          <CardWrap className="accent-indigo" title="Who is a Data Fiduciary?" icon={<Shield className="w-5 h-5 text-teal-300"/>} delay="delay-100">
            An entity that determines the purpose and means of processing digital personal data. Processors act on behalf of a fiduciary. Some may be classified as <strong>Significant Data Fiduciaries (SDFs)</strong> based on volume/sensitivity of data or risk, bringing additional obligations.
          </CardWrap>
          <CardWrap className="accent-teal" title="Rights of Individuals (Data Principals)" icon={<ListChecks className="w-5 h-5 text-teal-300"/>} delay="delay-200">
            Data Principals (users) have the right to access their data, request correction or erasure, seek grievance redressal, and nominate someone to act on their behalf in case of death or incapacity. Organizations must provide clear notices and enable easy consent withdrawal.
          </CardWrap>
          <CardWrap className="accent-cyan" title="Data Protection Board of India (DPBI)" icon={<Building2 className="w-5 h-5 text-teal-300"/>} delay="delay-300">
            The DPBI is the primary enforcement authority established by the Act. It handles grievance redressal, manages data breach reports, conducts investigations, and has the power to impose significant penalties for non-compliance.
          </CardWrap>
        </div>
      </section>

      {/* SECTION 2: Core Principles */}
      <section className="dpdp-section">
        <h2 className="dpdp-section-header">
          <Scale className="w-6 h-6 inline-block mr-2 align-text-bottom"/>
          The Core Principles — What Are the Rules?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          <CardWrap className="accent-teal" title="Lawful Basis & Notice" icon={<LockKeyhole className="w-5 h-5 text-teal-300"/>} delay="delay-100">
            Organizations must process personal data either with explicit consent or under legitimate uses defined by the Act. Clear notice must be provided to users about the purposes of data collection and processing.
          </CardWrap>
          <CardWrap className="accent-indigo" title="Security Safeguards" icon={<ShieldCheck className="w-5 h-5 text-teal-300"/>} delay="delay-200">
            Data Fiduciaries must implement reasonable security measures to prevent data breaches. In the event of a breach, they must immediately report it to both the DPBI and affected individuals, detailing the nature and remedial actions.
          </CardWrap>
          <CardWrap className="accent-cyan" title="Deemed Consent (Legitimate Uses)" icon={<Gavel className="w-5 h-5 text-teal-300"/>} delay="delay-300">
            The Act allows data processing without explicit consent for "legitimate uses" including: voluntary data provision (e.g., Contact Us forms), employment purposes, fraud protection, medical emergencies, vital interests protection, and government service delivery.
          </CardWrap>
        </div>
      </section>

      {/* SECTION 3: Specific Duties & High-Risk Areas */}
      <section className="dpdp-section">
        <h2 className="dpdp-section-header">
          <AlertCircle className="w-6 h-6 inline-block mr-2 align-text-bottom"/>
          Specific Duties & High-Risk Areas
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          <CardWrap className="accent-amber" title="Children's Data" icon={<ShieldCheck className="w-5 h-5 text-teal-300"/>} delay="delay-100">
            Processing children's data requires verifiable parental consent. Organizations are prohibited from tracking, behavioral monitoring, or serving targeted advertisements to children. The government may prescribe limited exemptions.
          </CardWrap>
          <CardWrap className="accent-indigo" title="Extra Duties for Significant Data Fiduciaries (SDFs)" icon={<Building2 className="w-5 h-5 text-teal-300"/>} delay="delay-200">
            SDFs (classified based on data volume/sensitivity or risk) face heightened obligations: appointing a Data Protection Officer (DPO) based in India, conducting periodic Data Protection Impact Assessments (DPIAs), and appointing an Independent Data Auditor.
          </CardWrap>
          <CardWrap className="accent-cyan" title="Data Breach Reporting" icon={<FileWarning className="w-5 h-5 text-teal-300"/>} delay="delay-300">
            Immediate breach notification is mandatory. Data Fiduciaries must report breaches to the DPBI and affected individuals without delay, providing details about the breach nature, potential impact, and remedial measures being undertaken.
          </CardWrap>
        </div>
      </section>

      {/* SECTION 4: Consequences & Exemptions */}
      <section className="dpdp-section">
        <h2 className="dpdp-section-header">
          <Scale className="w-6 h-6 inline-block mr-2 align-text-bottom"/>
          Consequences & Exemptions
        </h2>
        
        {/* Large Penalties Card (Full Width) */}
        <div className="max-w-4xl mx-auto mb-6">
          <CardWrap className="accent-amber" title="Schedule of Penalties (Per Instance)" icon={<FileWarning className="w-5 h-5 text-teal-300"/>} delay="delay-100">
            <div className="space-y-3">
              <p className="font-semibold text-base text-amber-300">The Act imposes severe financial penalties for non-compliance:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 mt-0.5">•</span>
                  <span><strong>Up to ₹250 Crore:</strong> Failure to implement reasonable security safeguards to prevent a data breach.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 mt-0.5">•</span>
                  <span><strong>Up to ₹200 Crore:</strong> Failing to notify the DPBI and affected users of a breach.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 mt-0.5">•</span>
                  <span><strong>Up to ₹200 Crore:</strong> Non-compliance with obligations regarding children's data processing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-300 mt-0.5">•</span>
                  <span><strong>Up to ₹150 Crore:</strong> Failing to meet the extra duties imposed on Significant Data Fiduciaries.</span>
                </li>
              </ul>
              <p className="text-xs mt-3 text-slate-400">Note: Final penalty amounts consider factors such as severity, duration, and nature of the violation.</p>
            </div>
          </CardWrap>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mt-6">
          <CardWrap className="accent-teal" title="Legitimate Uses Without Consent" icon={<Gavel className="w-5 h-5 text-teal-300"/>} delay="delay-200">
            Certain situations permit processing without explicit consent: compliance with law or judicial orders, medical emergencies, disaster response, protection of vital interests, reasonable expectations in limited contexts, and for fulfilling contractual obligations.
          </CardWrap>
          <CardWrap className="accent-indigo" title="Exemptions & Special Cases" icon={<GlobeLock className="w-5 h-5 text-teal-300"/>} delay="delay-300">
            Government-notified Startups may receive time-bound exemptions from certain provisions to reduce compliance burden. The Act explicitly does not apply to data processed for personal or domestic use, or to personal data voluntarily made public by individuals.
          </CardWrap>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="dpdp-section pt-16 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="dpdp-card accent-teal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-2">Need More Details?</h3>
              <p className="text-slate-300/90">
                Have high-risk workflows, SDF/SRO needs, or procurement requirements? Talk to us and we'll tailor a compliance rollout specifically for your organization.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link href="/contact" className="inline-flex items-center justify-center h-11 px-6 rounded-md border border-white/20 text-white hover:bg-white/10 text-sm transition-colors">
                Talk to us
              </Link>
              <Link href="/platform" className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-teal-300/90 text-black hover:opacity-90 text-sm font-medium transition-opacity">
                See the platform
              </Link>
            </div>
          </div>
          
          {/* Official Link */}
          <div className="mt-8 text-center">
            <a 
              href="https://egazette.gov.in/WriteReadData/2023/247847.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4"/>
              Read the full, official Digital Personal Data Protection Act, 2023 (PDF)
            </a>
          </div>
        </div>
      </section>

      </div>
    </div>
  );
}