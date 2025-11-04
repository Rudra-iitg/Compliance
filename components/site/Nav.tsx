"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav: React.FC = () => {
  const pathname = usePathname();
  const links: Array<{ label: string; href: string }> = [
    { label: "Home", href: "/" },
  { label: "Tour", href: "/tour" },
    { label: "Platform", href: "/platform" },
    { label: "DPDP 2023", href: "/dpdp" },
    { label: "Checklist", href: "/checklist" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <div className="fixed z-40 top-4 left-1/2 -translate-x-1/2 glass rounded-full pl-5 pr-5 py-3.5 flex items-center gap-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo2.png" alt="Compliance" width={28} height={28} />
        <span className="text-sm font-medium hidden sm:inline">Compliance</span>
      </Link>
      {links.map(({ label, href }) => {
        const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`navlink text-sm ${isActive ? "active text-white" : "text-slate-200 hover:text-white"}`}
          >
            {label}
          </Link>
        );
      })}
      <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10 ml-4">
        <Link href="/login" className="inline-flex items-center h-10 px-5 rounded-md border border-white/20 text-white hover:bg-white/10 text-sm">Login</Link>
        <Link href="/signup" className="inline-flex items-center h-10 px-5 rounded-md bg-teal-300/90 text-black hover:opacity-90 text-sm">Get Started</Link>
      </div>
    </div>
  );
};
