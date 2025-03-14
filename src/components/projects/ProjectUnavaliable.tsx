import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const glitchText = [
  "ACCESS DENIED",
  "PROJECT OFFLINE",
  "CLASSIFIED",
  "RESTRICTED",
];

export default function ProjectUnavailable() {
  const [glitchIndex, setGlitchIndex] = useState(0);
  // Add client-side only rendering flag
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted flag
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setGlitchIndex((prev) => (prev + 1) % glitchText.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Server-side fallback
  if (!isMounted) {
    return (
      <div className="relative w-full h-full bg-dark/80 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-dark/80 rounded-lg overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" suppressHydrationWarning />

      {/* Scanning Line Effect */}
      <motion.div
        className="absolute top-0 w-full h-1 bg-primary/30 blur-sm"
        animate={{
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 3,
          ease: "linear",
          repeat: Infinity,
        }}
      />

      {/* Main Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        {/* Warning Icon */}
        <motion.div
          className="mb-6 text-primary w-16 h-16 flex items-center justify-center border-2 border-primary rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </motion.div>

        {/* Glitch Text Effect */}
        <motion.div
          className="text-2xl font-bold text-primary mb-4 font-mono relative"
          animate={{
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {glitchText[glitchIndex]}
        </motion.div>

        {/* Descriptive Text */}
        <p className="text-text-secondary max-w-md">
          This project is not publicly available at the moment.
          <br />
          Check back later for updates.
        </p>

        {/* Binary Rain Effect - only rendered client-side */}
        {isMounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-primary/10 text-xs font-mono whitespace-nowrap"
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