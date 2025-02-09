"use client";

import { useState, useEffect } from "react";
import {
  MotionValue,
  useSpring,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";

interface BookAnimation {
  scrollYProgress: MotionValue<number>;
  bookScale: MotionValue<number>;
  bookRotation: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  pageRotation: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  pagesProgress: number[];
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void;
}

export function useBookAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
): BookAnimation {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [pagesProgress, setPagesProgress] = useState<number[]>([]);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Initial book approach and scale
  const bookScale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  // Spring config for smooth animations
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };

  // Mouse-based rotation with springs
  const rotationX = useSpring(
    useTransform(mouseY, [-300, 300], [5, -5]),
    springConfig,
  );
  const rotationY = useSpring(
    useTransform(mouseX, [-300, 300], [-5, 5]),
    springConfig,
  );

  // Book rotation during scroll
  const bookRotationX = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const bookRotationY = useTransform(scrollYProgress, [0, 0.2], [-15, 0]);

  // Combined transformations
  const bookRotation = {
    x: useSpring(bookRotationX, springConfig),
    y: useSpring(bookRotationY, springConfig),
  };

  const pageRotation = {
    x: rotationX,
    y: rotationY,
  };

  // Page turning progress calculation
  useEffect(() => {
    if (!containerRef.current) return;

    const updatePagesProgress = () => {
      const scrollPercent = scrollYProgress.get();
      const numPages = 5; // Adjust based on your total pages
      const pageProgressValues: number[] = [];

      // Calculate progress for each page
      for (let i = 0; i < numPages; i++) {
        const pageStart = 0.2 + i * 0.15; // Start after initial book zoom
        const pageEnd = pageStart + 0.15;
        let progress = 0;

        if (scrollPercent > pageStart) {
          progress = Math.min(
            (scrollPercent - pageStart) / (pageEnd - pageStart),
            1,
          );
        }

        pageProgressValues.push(progress);
      }

      setPagesProgress(pageProgressValues);
    };

    const unsubscribe = scrollYProgress.on("change", updatePagesProgress);
    updatePagesProgress(); // Initial calculation

    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, containerRef]);

  // Mouse movement handler
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate mouse position relative to container center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Set mouse position values with dampening
    mouseX.set((e.clientX - centerX) * 0.5);
    mouseY.set((e.clientY - centerY) * 0.5);
  };

  // Return all animation values and handlers
  return {
    scrollYProgress,
    bookScale,
    bookRotation,
    pageRotation,
    pagesProgress,
    handleMouseMove,
  };
}
