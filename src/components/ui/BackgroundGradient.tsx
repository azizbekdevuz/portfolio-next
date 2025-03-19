"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export function BackgroundGradient() {
  const { isMobile } = useDeviceDetection();
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Always call useScroll() in the same way
  const scrollConfig = { layoutEffect: true, container: containerRef };
  const { scrollYProgress } = useScroll(scrollConfig);

  // ✅ Adjust behavior instead of modifying the hook call order
  const gradientY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "50%" : "100%"]
  );

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
        style={{
          y: gradientY,
          willChange: isMobile ? "transform" : "auto",
        }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: isMobile ? 0.5 : 1,
        }}
      />
    </div>
  );
}