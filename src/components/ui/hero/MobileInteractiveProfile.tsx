"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function MobileInteractiveProfile() {
  const [isActive, setIsActive] = useState(false);
  
  // Simplified tap handler with single animation state
  const handleTap = () => {
    if (!isActive) {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 2000);
    }
  };
  
  return (
    <div className="relative w-[200px] h-[200px]">
      {/* Outer frame - simplified with CSS only animation */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-primary/30
                   ${isActive ? 'shadow-lg shadow-primary/30' : 'shadow-md shadow-primary/20'}`}
        onClick={handleTap}
      />

      {/* Profile Image Container - No 3D transforms */}
      <div
        className="absolute inset-4 rounded-full overflow-hidden border border-primary/30"
        onClick={handleTap}
      >
        {/* Main Image with priority loading */}
        <div className="relative w-full h-full">
          <Image
            src="/assets/img/profile-img.jpg"
            alt="Azizbek Arzikulov"
            fill
            sizes="(max-width: 768px) 200px, 400px"
            className="object-cover"
            priority={true}
            fetchPriority="high"
            loading="eager"
          />
        </div>

        {/* Simple Scan Line - Only shown when active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 1.5, ease: "linear" }}
          />
        )}
      </div>

      {/* Simple pulsing circle - CSS only */}
      <div
        className="absolute inset-[-5px] rounded-full border border-dashed border-primary/40 animate-pulse"
      />
    </div>
  );
}