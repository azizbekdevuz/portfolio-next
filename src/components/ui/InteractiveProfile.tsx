"use client";

import { useState, useEffect, useRef } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";

interface Props {
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

function generateInitialParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 5) % 100,
    y: (i * 7) % 100,
  }));
}

export function InteractiveProfile({
  isHovered,
  onHoverChange,
  mouseX,
  mouseY,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const particlesRef = useRef(generateInitialParticles(20));
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    setMounted(true);
    setDimensions({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });

    // Randomize particles after mount
    particlesRef.current = particlesRef.current.map((particle) => ({
      ...particle,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));

    const handleResize = () => {
      setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isHovered && mounted) {
      const interval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, mounted]);

  const rotateX = useTransform(
    mouseY,
    [0, dimensions.height],
    mounted ? [15, -15] : [0, 0],
  );
  const rotateY = useTransform(
    mouseX,
    [0, dimensions.width],
    mounted ? [-15, 15] : [0, 0],
  );

  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto">
      {/* Outer Frame */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-primary/30"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 30px rgba(20, 157, 221, 0.5)"
            : "0 0 20px rgba(20, 157, 221, 0.3)",
        }}
      >
        {/* Tech Lines */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-[1px] bg-primary/30"
              style={{
                top: `${(i + 1) * 12.5}%`,
                opacity: isHovered ? 0.5 : 0.2,
              }}
              animate={{
                x: isHovered ? [-100, 100] : 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Profile Image Container */}
      <motion.div
        className="absolute inset-4 rounded-full overflow-hidden"
        onHoverStart={() => onHoverChange(true)}
        onHoverEnd={() => onHoverChange(false)}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
      >
        {/* Glitch Effect */}
        {glitchActive && (
          <>
            <motion.div
              className="absolute inset-0 bg-primary/30"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{
                clipPath: [
                  "inset(0 0 100% 0)",
                  "inset(20% 0 40% 0)",
                  "inset(60% 0 20% 0)",
                  "inset(0 0 100% 0)",
                ],
              }}
              transition={{ duration: 0.2, times: [0, 0.4, 0.6, 1] }}
            />
            <motion.div
              className="absolute inset-0 bg-primary/30 mix-blend-screen"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{
                clipPath: [
                  "inset(100% 0 0 0)",
                  "inset(40% 0 20% 0)",
                  "inset(20% 0 60% 0)",
                  "inset(100% 0 0 0)",
                ],
              }}
              transition={{ duration: 0.2, times: [0, 0.4, 0.6, 1] }}
            />
          </>
        )}

        {/* Main Image */}
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/assets/img/profile-img.jpg"
            alt="Azizbek Arzikulov"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Scan Line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
          animate={{
            y: isHovered ? ["0%", "100%"] : "0%",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Particle Field */}
      <div className="absolute inset-[-50px] pointer-events-none">
        {particlesRef.current.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: mounted ? 0.3 : 0,
            }}
            animate={
              mounted
                ? {
                    scale: isHovered ? [1, 1.5, 1] : 1,
                    opacity: isHovered ? [0.3, 0.7, 0.3] : 0.3,
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: particle.id * 0.1,
            }}
          />
        ))}
      </div>

      {/* Tech Circle */}
      <motion.div
        className="absolute inset-[-2px] rounded-full"
        initial={{ rotate: 0 }}
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-150px)`,
            }}
            animate={
              isHovered
                ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }
                : {
                    scale: 1,
                    opacity: 0.3,
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          stroke="rgba(20, 157, 221, 0.2)"
          strokeWidth="0.2"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="49"
            strokeDasharray="307"
            strokeDashoffset={isHovered ? 0 : 307}
            transition={{ duration: 2 }}
          />
        </svg>
      </motion.div>

      {/* Data Flow Effect */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-12 bg-gradient-to-b from-primary/40 to-transparent"
            style={{
              left: `${(i + 1) * 16.666}%`,
              top: "-20px",
            }}
            animate={{
              y: isHovered ? ["-100%", "200%"] : "-100%",
              opacity: isHovered ? [0, 1, 0] : 0,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Holographic Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/20 mix-blend-overlay rounded-full"
        animate={{
          opacity: isHovered ? [0.3, 0.5, 0.3] : 0.3,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
    </div>
  );
}
