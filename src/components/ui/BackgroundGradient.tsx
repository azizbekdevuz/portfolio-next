"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function BackgroundGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
        style={{ y: gradientY }}
      />
    </div>
  );
}
