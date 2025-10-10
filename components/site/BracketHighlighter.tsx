"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Box = { x: number; y: number; w: number; h: number; r: string };

// A single overlay that moves/resizes to frame the hovered/tapped element with 4 neon corner brackets.
export const BracketHighlighter: React.FC = () => {
  const [box, setBox] = useState<Box | null>(null);
  const currentEl = useRef<HTMLElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    document.body.classList.add("has-bracket-overlay");
    return () => document.body.classList.remove("has-bracket-overlay");
  }, []);

  const computeRect = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    // Keep the corner radius consistent with the target
    const radius = cs.borderRadius || "0px";
    setBox({ x: rect.left, y: rect.top, w: rect.width, h: rect.height, r: radius });
  };

  const updateFromPoint = (x: number, y: number) => {
    const node = document.elementFromPoint(x, y) as HTMLElement | null;
    const target = node?.closest?.(
      ".hover-brackets, .glass, button, section, a, .card"
    ) as HTMLElement | null;
    if (target) {
      if (currentEl.current !== target) {
        currentEl.current = target;
      }
      computeRect(target);
    } else {
      currentEl.current = null;
      setBox(null);
    }
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => updateFromPoint(e.clientX, e.clientY));
    };
    const onLeave = () => {
      currentEl.current = null;
      setBox(null);
    };
    const onScroll = () => {
      if (currentEl.current) computeRect(currentEl.current);
    };
    const onResize = onScroll;

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Touch: show on tap and hide on second tap elsewhere
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      updateFromPoint(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      // Keep visible if finger lifted over same element; hide on second tap outside handled by next touchstart
      // Optional: hide after short delay if no current element
      if (!currentEl.current) setBox(null);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Draw 8 short lines at the 4 corners using layered background-images, matching theme accent
  const bracketBG = {
    background: [
      "linear-gradient(var(--teal), var(--teal)) left 8px top 8px / 18px 2px no-repeat",
      "linear-gradient(var(--teal), var(--teal)) left 8px top 8px / 2px 18px no-repeat",
      "linear-gradient(var(--teal), var(--teal)) right 8px top 8px / 18px 2px no-repeat",
      "linear-gradient(var(--teal), var(--teal)) right 8px top 8px / 2px 18px no-repeat",
      "linear-gradient(var(--teal), var(--teal)) left 8px bottom 8px / 18px 2px no-repeat",
      "linear-gradient(var(--teal), var(--teal)) left 8px bottom 8px / 2px 18px no-repeat",
      "linear-gradient(var(--teal), var(--teal)) right 8px bottom 8px / 18px 2px no-repeat",
      "linear-gradient(var(--teal), var(--teal)) right 8px bottom 8px / 2px 18px no-repeat",
    ].join(", "),
  } as React.CSSProperties;

  return (
    <AnimatePresence>
      {box && (
        <motion.div
          aria-hidden
          className="fixed pointer-events-none z-40"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{
            opacity: 0.9,
            scale: 1,
            x: box.x,
            y: box.y,
            width: box.w,
            height: box.h,
            borderRadius: box.r,
          }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.18 }}
          style={bracketBG}
        />
      )}
    </AnimatePresence>
  );
};
