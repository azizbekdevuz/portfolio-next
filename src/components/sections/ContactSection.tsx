"use client";

import { useState, useEffect } from "react";
import { DesktopContactSection } from "../contact/DesktopContactSection";
import { MobileContactSection } from "../contact/MobileContactSection";

export function ContactSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once component mounts
    // This ensures we don't try to access window during SSR
    setIsClient(true);
    
    // Initial check of viewport width
    checkIfMobile();
    
    // Add event listener to track window resize
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Function to check if viewport width indicates a mobile device
  const checkIfMobile = () => {
    const mobileBreakpoint = 768; // Standard md breakpoint in Tailwind
    setIsMobile(window.innerWidth < mobileBreakpoint);
  };

  // During SSR or before client component mounts, return a loading state
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  // Once mounted on client, conditionally render based on viewport width
  return isMobile ? <MobileContactSection /> : <DesktopContactSection />;
}