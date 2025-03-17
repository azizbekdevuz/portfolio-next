"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

export function MobileInteractiveProfile() {
  const [isActive, setIsActive] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });
  const [hasOrientationSupport, setHasOrientationSupport] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef(0);
  
  // Setup device orientation detection
  useEffect(() => {
    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
      setHasOrientationSupport(true);
      
      const handleOrientation = (event: DeviceOrientationEvent) => {
        // Normalize orientation values to reasonable ranges for rotation
        if (event.beta !== null && event.gamma !== null) {
          setDeviceOrientation({
            beta: Math.min(Math.max(event.beta, -20), 20) / 40, // Normalize to [-0.5, 0.5]
            gamma: Math.min(Math.max(event.gamma, -20), 20) / 40, // Normalize to [-0.5, 0.5]
          });
        }
      };
      
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, []);
  
  // Auto-activate effect periodically
  useEffect(() => {
    // Set up interval to trigger the effect every 5 seconds
    intervalRef.current = setInterval(() => {
      // Only auto-activate if not recently manually activated
      if (Date.now() - lastTapRef.current > 5000) {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 1500);
      }
    }, 8000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Handle tap to activate effect
  const handleTap = () => {
    setIsActive(true);
    lastTapRef.current = Date.now();
    
    // Clear existing timeout if any
    setTimeout(() => setIsActive(false), 2000);
  };
  
  // Always create motion values at the top level
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const dummyValue = useMotionValue(0);
  
  // Always create transforms unconditionally
  const rotateXWithOrientation = tiltY;
  const rotateYWithOrientation = tiltX;
  const rotateXWithoutOrientation = useTransform(dummyValue, [0, 1], [0, 0]);
  const rotateYWithoutOrientation = useTransform(dummyValue, [0, 1], [0, 0]);
  
  // Use the correct values based on orientation support
  const rotateX = hasOrientationSupport ? rotateXWithOrientation : rotateXWithoutOrientation;
  const rotateY = hasOrientationSupport ? rotateYWithOrientation : rotateYWithoutOrientation;
  
  useEffect(() => {
    if (hasOrientationSupport) {
      tiltX.set(deviceOrientation.gamma * 15); // Convert to appropriate rotation angle
      tiltY.set(deviceOrientation.beta * 15); // Convert to appropriate rotation angle
    }
  }, [deviceOrientation.beta, deviceOrientation.gamma, hasOrientationSupport, tiltX, tiltY]);
  
  return (
    <div className="relative w-[200px] h-[200px]">
      {/* Outer Frame with simplified effects */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-primary/30"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        animate={{
          boxShadow: isActive
            ? "0 0 25px rgba(20, 157, 221, 0.5)"
            : "0 0 15px rgba(20, 157, 221, 0.3)",
        }}
        onTap={handleTap}
      >
        {/* Simplified Tech Lines - Fewer for better performance */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-[1px] bg-primary/30"
              style={{
                top: `${(i + 1) * 25}%`,
                opacity: isActive ? 0.5 : 0.2,
              }}
              animate={{
                x: isActive ? [-100, 100] : 0,
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

      {/* Profile Image Container - Simplified for mobile */}
      <motion.div
        className="absolute inset-4 rounded-full overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        onTap={handleTap}
      >
        {/* Simplified Glitch Effect - Only show when active */}
        {isActive && (
          <>
            <motion.div
              className="absolute inset-0 bg-primary/30"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{
                clipPath: [
                  "inset(0 0 100% 0)",
                  "inset(20% 0 40% 0)",
                  "inset(0 0 100% 0)",
                ],
              }}
              transition={{ duration: 0.3, times: [0, 0.5, 1] }}
            />
          </>
        )}

        {/* Main Image */}
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: isActive ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/assets/img/profile-img.jpg"
            alt="Azizbek Arzikulov"
            fill
            sizes="200px"
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Simplified Scan Line */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
          animate={{
            y: isActive ? ["0%", "100%"] : "0%",
          }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: isActive ? 1 : 0,
          }}
        />
      </motion.div>

      {/* Simplified Particle Field - Fewer particles */}
      <div className="absolute inset-[-20px] pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${(i * 30) % 100}%`,
              top: `${(i * 25) % 100}%`,
              opacity: 0.3,
            }}
            animate={
              isActive
                ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Pulsing Circle - Mobile-specific interaction hint */}
      <motion.div
        className="absolute inset-[-5px] rounded-full border border-dashed border-primary/40"
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Touch Indicator - Shows briefly when component loads */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg text-primary opacity-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1, 0.8] }}
        transition={{ duration: 2, delay: 1 }}
      >
        👆 Tap me
      </motion.div>
    </div>
  );
}