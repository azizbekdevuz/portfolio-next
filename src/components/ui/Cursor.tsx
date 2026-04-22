"use client";

import React, { useEffect, useCallback, memo, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { CUSTOM_CURSOR_EVENT, type CustomCursorEventDetail } from "@/lib/custom-cursor";

export const OptimizedCursor = memo(function OptimizedCursor() {
  const [suppressed, setSuppressed] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  const ringSpring = { ...springConfig, damping: 35 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const ringSpringX = useSpring(cursorX, ringSpring);
  const ringSpringY = useSpring(cursorY, ringSpring);

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
    const onChrome = (e: Event) => {
      const ce = e as CustomEvent<CustomCursorEventDetail>;
      setSuppressed(Boolean(ce.detail?.suppress));
    };
    window.addEventListener(CUSTOM_CURSOR_EVENT, onChrome);
    return () => window.removeEventListener(CUSTOM_CURSOR_EVENT, onChrome);
  }, []);

  useEffect(() => {
    if (suppressed) {
      document.body.style.cursor = "";
      return;
    }
    document.body.style.cursor = "none";
    window.addEventListener("mousemove", updateCursor, { passive: true });
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", updateCursor);
    };
  }, [suppressed, updateCursor]);

  if (suppressed) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[220] h-4 w-4 rounded-full bg-accent mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[220] h-8 w-8 rounded-full border border-accent mix-blend-difference"
        style={{
          x: ringSpringX,
          y: ringSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
});
