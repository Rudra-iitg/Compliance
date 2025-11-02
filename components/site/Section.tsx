"use client";
import React from "react";

type SectionProps = { id?: string; children: React.ReactNode; className?: string };

export const Section: React.FC<SectionProps> = ({ id, children, className = "" }) => (
  <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${className}`}>{children}</section>
);
