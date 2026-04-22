"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export function BackgroundGradient() {
  const { isMobile } = useDeviceDetection();
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollConfig = { layoutEffect: true, container: containerRef };
  const { scrollYProgress } = useScroll(scrollConfig);

  const gradientY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "50%" : "100%"],
  );

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[var(--gradient-mesh-a)] via-[var(--gradient-mesh-b)] to-[var(--gradient-mesh-c)]"
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
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.45]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, var(--color-glow), transparent 55%)",
        }}
      />
    </div>
  );
}
