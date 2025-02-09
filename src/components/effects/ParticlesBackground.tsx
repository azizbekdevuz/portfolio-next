"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, MotionValue } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface Props {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export function ParticlesBackground({}: Props) {
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Particle[]>([]);

  // Generate deterministic particles for SSR
  const generateInitialParticles = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        x: (i * 2) % 100, // Deterministic x position
        y: (i * 3) % 100, // Deterministic y position
        size: (i % 3) + 1,
        opacity: 0.3,
        speed: 0.5,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    // Only randomize on client side after mount
    particlesRef.current = particlesRef.current.map((particle) => ({
      ...particle,
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      opacity: Number((Math.random() * 0.5 + 0.2).toFixed(2)),
      speed: Number((Math.random() * 0.5 + 0.5).toFixed(2)),
    }));
    setMounted(true);
  }, []);

  // Initialize with deterministic values
  if (!particlesRef.current.length) {
    particlesRef.current = generateInitialParticles();
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-light/20 via-dark to-dark-light/20" />

      {particlesRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            x: mounted ? [0, 20, 0] : 0,
            y: mounted ? [0, 20, 0] : 0,
            opacity: mounted
              ? [particle.opacity, particle.opacity * 0.5, particle.opacity]
              : particle.opacity,
          }}
          transition={{
            duration: 3 / particle.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.id * 0.1,
          }}
        />
      ))}

      {/* Ambient Light Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50" />
    </div>
  );
}
