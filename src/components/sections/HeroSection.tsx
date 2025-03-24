"use client";

import dynamic from 'next/dynamic';
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { HeroSkeleton } from '../skeletons/SectionSkeletons';

// Use dynamic imports with proper loading states
const HeroDesktop = dynamic(() => import("../ui/hero/HeroDesktop"), {
  loading: () => <HeroSkeleton/>,
  ssr: false // Don't render desktop version on server to save bytes
});

const HeroMobile = dynamic(() => import("../ui/hero/HeroMobile"), {
  loading: () => <HeroSkeleton />,
  ssr: true // Pre-render mobile version for better FCP
});

export function HeroSection() {
  const { isMobile } = useDeviceDetection();
  
  // Fix: Properly return the mobile component
  if (isMobile) {
    return <HeroMobile />;
  }
  
  // Desktop version
  return <HeroDesktop />;
}