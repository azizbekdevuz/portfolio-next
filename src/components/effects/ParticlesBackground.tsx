"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, MotionValue, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  // Use Intersection Observer to check if component is in viewport
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Determine device type based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Generate particles based on device and preferences
  const generateInitialParticles = useCallback(() => {
    // Fewer particles on mobile
    const particleCount = isMobile ? 25 : 50;
    
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
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
  }, [isMobile]);

  useEffect(() => {
    // Regenerate particles when mobile status changes
    particlesRef.current = generateInitialParticles();
    
    // Only randomize on client side after mount if animation is allowed
    if (!prefersReducedMotion) {
      particlesRef.current = particlesRef.current.map((particle) => ({
        ...particle,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        opacity: Number((Math.random() * 0.5 + 0.2).toFixed(2)),
        speed: Number((Math.random() * 0.5 + 0.5).toFixed(2)),
      }));
    }
    
    setMounted(true);
  }, [generateInitialParticles, prefersReducedMotion]);

  // Initialize with deterministic values if needed
  if (!particlesRef.current.length) {
    particlesRef.current = generateInitialParticles();
  }

  // Determine if animation should run
  const shouldAnimate = mounted && inView && !prefersReducedMotion;

  return (
    <div 
      ref={inViewRef} 
      className="absolute inset-0 overflow-hidden"
    >
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
          animate={
            shouldAnimate
              ? {
                  x: [0, 20, 0],
                  y: [0, 20, 0],
                  opacity: [
                    particle.opacity,
                    particle.opacity * 0.5,
                    particle.opacity,
                  ],
                }
              : {}
          }
          transition={
            shouldAnimate
              ? {
                  duration: 3 / particle.speed,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.id * 0.1,
                }
              : {}
          }
        />
      ))}

      {/* Ambient Light Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50" />
    </div>
  );
}