"use client";

import React, { useEffect, useCallback, memo } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// Optimized cursor component with performance improvements
export const OptimizedCursor = memo(function OptimizedCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Use springs with optimized settings for smoother movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Debounced cursor update using RAF for better performance
  const updateCursor = useCallback(
    (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    },
    [cursorX, cursorY],
  );

  useEffect(() => {
    document.body.style.cursor = "none";
    window.addEventListener("mousemove", updateCursor, { passive: true });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", updateCursor);
    };
  }, [updateCursor]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer ring with separate spring config for trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: useSpring(cursorX, { ...springConfig, damping: 35 }),
          y: useSpring(cursorY, { ...springConfig, damping: 35 }),
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
});
