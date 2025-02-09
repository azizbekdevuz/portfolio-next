"use client";

import { memo, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: React.ReactNode;
  intensity?: number;
}

export const MouseParallax = memo(function MouseParallax({
  children,
  intensity = 0.1,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      x.set((clientX - centerX) * intensity);
      y.set((clientY - centerY) * intensity);
    },
    [intensity, x, y],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return <motion.div style={{ x: springX, y: springY }}>{children}</motion.div>;
});
