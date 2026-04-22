"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/components/i18n/I18nProvider";

export default function ProjectUnavailable() {
  const { messages } = useI18n();
  const pu = messages.projectUnavailable;
  const [glitchIndex, setGlitchIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const len = pu.statusLines.length;
    const interval = setInterval(() => {
      setGlitchIndex((prev) => (prev + 1) % len);
    }, 3000);
    return () => clearInterval(interval);
  }, [pu.statusLines.length]);

  if (!isMounted) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-dark/80">
        <div className="text-primary">{pu.loading}</div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-dark/80">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20"
        suppressHydrationWarning
      />

      <motion.div
        className="absolute top-0 h-1 w-full bg-primary/30 blur-sm"
        animate={{
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center p-6 text-center">
        <motion.div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary text-primary"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </motion.div>

        <motion.div
          className="relative mb-4 font-mono text-2xl font-bold text-primary"
          animate={{
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {pu.statusLines[glitchIndex]}
        </motion.div>

        <p className="max-w-md text-muted">{pu.body}</p>

        {isMounted && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute whitespace-nowrap font-mono text-xs text-primary/10"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: -20,
                  opacity: 0,
                }}
                animate={{
                  y: "100%",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {Math.random().toString(2).slice(2, 10)}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
