"use client";

import { useState, useEffect } from "react";

export const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768); // Standard md breakpoint
    };
    
    // Only run on client-side
    if (typeof window !== "undefined") {
      checkDevice();
      window.addEventListener('resize', checkDevice);
      return () => window.removeEventListener('resize', checkDevice);
    }
  }, []);
  
  return { isMobile };
};