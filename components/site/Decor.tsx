"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.2 });
  return (
    <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 origin-left" >
      <div className="h-full" style={{ background: "linear-gradient(90deg, var(--teal), var(--amber))" }} />
    </motion.div>
  );
};

export const CursorRing: React.FC = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!ringRef.current) return;
      ringRef.current.style.left = e.clientX + "px";
      ringRef.current.style.top = e.clientY + "px";
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ringRef} className="cursor-ring" aria-hidden />;
};
