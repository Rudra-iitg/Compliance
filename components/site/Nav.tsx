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
    <div className="fixed z-40 top-4 left-1/2 -translate-x-1/2 glass rounded-full pl-3 pr-6 py-2 flex items-center gap-6">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo2.png" alt="Compliance" width={24} height={24} />
        <span className="text-sm font-medium hidden sm:inline">Compliance</span>
      </Link>
      {links.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`navlink text-sm ${pathname === href ? "text-white" : "text-slate-200 hover:text-white"}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};
