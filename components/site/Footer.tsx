"use client";
import React from "react";
import { ShieldCheck, Globe, Mail, Github } from "lucide-react";
import Link from "next/link";

export const Footer: React.FC = () => (
  <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-slate-300/80">
    <div className="grid md:grid-cols-3 gap-6 items-center">
      <div className="space-y-2">
        <div className="flex items-center gap-2 font-semibold text-white"><ShieldCheck className="w-5 h-5 text-teal-300"/> Compliance Project</div>
        <p>Built in India. DPDP‑ready. Human‑in‑the‑loop.</p>
      </div>
      <div className="flex gap-4 justify-center md:justify-start">
        <Link href="/tour" className="hover:text-white">Tour</Link>
        <Link href="/dpdp" className="hover:text-white">DPDP 2023</Link>
        <Link href="/platform" className="hover:text-white">Platform</Link>
        <Link href="/pricing" className="hover:text-white">Pricing</Link>
        <Link href="/faq" className="hover:text-white">FAQ</Link>
      </div>
      <div className="flex items-center gap-4 justify-end">
        <a href="#" aria-label="Globe"><Globe className="w-4 h-4"/></a>
        <a href="#" aria-label="Mail"><Mail className="w-4 h-4"/></a>
        <a href="#" aria-label="GitHub"><Github className="w-4 h-4"/></a>
      </div>
    </div>
    <div className="mt-6 text-xs text-slate-400/70">© {new Date().getFullYear()} Compliance Project. This site provides general information and is not legal advice.</div>
  </footer>
);
