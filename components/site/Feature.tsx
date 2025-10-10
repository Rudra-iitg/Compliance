"use client";
import React from "react";
import { motion } from "framer-motion";

export const Feature: React.FC<{ icon: React.ReactNode; title: React.ReactNode; text: React.ReactNode; className?: string }>
  = ({ icon, title, text, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`glass rounded-2xl p-6 border border-white/10 ${className}`.trim()}
  >
    <div className="flex items-center gap-3 mb-3 text-teal-300">
      {icon}
      <h4 className="font-semibold tracking-tight">{title}</h4>
    </div>
    <p className="text-sm text-slate-300/90 leading-relaxed">{text}</p>
  </motion.div>
);
