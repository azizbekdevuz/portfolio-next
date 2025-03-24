"use client";

import { useState, useEffect, useRef, memo } from "react";
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

// Function to generate particles - not memoized since it's just a utility function
function generateInitialParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 8) % 100, // Increased spacing for fewer DOM interactions
    y: (i * 12) % 100,
  }));
}

// Properly memoized tech lines component
const TechLines = memo(function TechLines({ 
  isHovered 
}: { 
  isHovered: boolean 
}) {
  // Reduced number of lines from 8 to 6
  return (
    <div className="absolute inset-0 rounded-full overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-full h-[1px] bg-primary/30"
          style={{
            top: `${(i + 1) * 16.6}%`, // Adjusted spacing
            opacity: isHovered ? 0.5 : 0.2,
          }}
          animate={{
            x: isHovered ? [-100, 100] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.15, // Slightly increased delay for performance
          }}
        />
      ))}
    </div>
  );
});

// Properly memoized particle field component
const ParticleField = memo(function ParticleField({ 
  particles, 
  isHovered, 
  mounted 
}: { 
  particles: Particle[];
  isHovered: boolean;
  mounted: boolean;
}) {
  // Reduced number of particles
  const visibleParticles = particles.slice(0, 12);
  
  return (
    <div className="absolute inset-[-50px] pointer-events-none">
      {visibleParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: mounted ? 0.3 : 0,
          }}
          animate={
            mounted && isHovered
              ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }
              : {} // No animation when not hovered
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: particle.id * 0.2, // Increased delay for less CPU load
          }}
        />
      ))}
    </div>
  );
});

// Properly memoized tech circle component
const TechCircle = memo(function TechCircle({
  isHovered
}: {
  isHovered: boolean
}) {
  return (
    <motion.div
      className="absolute inset-[-2px] rounded-full"
      initial={{ rotate: 0 }}
      animate={{ rotate: isHovered ? 360 : 0 }}
      transition={{ 
        duration: 20, 
        repeat: Infinity, 
        ease: "linear",
      }}
    >
      {/* Reduced number of tech circle points from 12 to 8 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full"
          style={{
            transform: `rotate(${i * 45}deg) translateY(-150px)`, // Adjusted spacing
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
            delay: i * 0.2, // Increased delay
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
  );
});

// Conditional data flow component
const DataFlowEffect = memo(function DataFlowEffect() {
  return (
    <div className="absolute inset-0">
      {/* Reduced from 6 to 4 data flow lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-12 bg-gradient-to-b from-primary/40 to-transparent"
          style={{
            left: `${(i + 1) * 25}%`, // Adjusted spacing
            top: "-20px",
          }}
          animate={{
            y: ["-100%", "200%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3, // Increased delay
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
});

export function InteractiveProfile({
  isHovered,
  onHoverChange,
  mouseX,
  mouseY,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const particlesRef = useRef<Particle[]>(generateInitialParticles(15)); // Reduced from 20 to 15
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Optimize the mounting effect to run once
  useEffect(() => {
    setMounted(true);
    
    // Use requestAnimationFrame for smoother dimension calculation
    requestAnimationFrame(() => {
      setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    });

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setDimensions({
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
        });
      }, 100); // Debounce to prevent excessive updates
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Optimize glitch effect interval
  useEffect(() => {
    if (isHovered && mounted) {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
      
      glitchIntervalRef.current = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }, 3000); // Reduced frequency from 2000ms to 3000ms
      
      return () => {
        if (glitchIntervalRef.current) {
          clearInterval(glitchIntervalRef.current);
          glitchIntervalRef.current = null;
        }
      };
    }
  }, [isHovered, mounted]);

  // Pre-compute transform values with optimized ranges
  const rotateX = useTransform(
    mouseY,
    [0, dimensions.height],
    mounted ? [10, -10] : [0, 0], // Reduced range from 15 to 10
  );
  
  const rotateY = useTransform(
    mouseX,
    [0, dimensions.width],
    mounted ? [-10, 10] : [0, 0], // Reduced range from 15 to 10
  );

  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto will-change-transform">
      {/* Outer Frame */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-primary/30"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
          willChange: "transform, box-shadow",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 30px rgba(20, 157, 221, 0.5)"
            : "0 0 20px rgba(20, 157, 221, 0.3)",
        }}
        transition={{
          boxShadow: { duration: 0.5 } // Optimized transition
        }}
      >
        {/* Tech Lines - Memoized */}
        <TechLines isHovered={isHovered} />
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
          willChange: "transform",
        }}
      >
        {/* Simplified Glitch Effect - Only rendered when active */}
        {glitchActive && (
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
            sizes="(max-width: 768px) 200px, 400px" // Added sizes for better image loading
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Optimized Scan Line - Only animate when hovered */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
            animate={{
              y: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.div>

      {/* Optimized Particle Field - Memoized */}
      <ParticleField 
        particles={particlesRef.current} 
        isHovered={isHovered} 
        mounted={mounted} 
      />

      {/* Tech Circle - Memoized */}
      <TechCircle isHovered={isHovered} />

      {/* Data Flow Effect - Only rendered when hovered */}
      {isHovered && <DataFlowEffect />}

      {/* Simplified Holographic Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/20 mix-blend-overlay rounded-full"
        animate={{
          opacity: isHovered ? [0.3, 0.5, 0.3] : 0.3,
        }}
        transition={{
          duration: 3, // Slowed down from 2 to 3 seconds
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}