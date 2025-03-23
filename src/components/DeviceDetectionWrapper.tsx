"use client"; 

import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { OptimizedCursor } from "@/components/ui/Cursor";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { NavigationDots } from "@/components/navigation/NavigationDots";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import FloatingTestimonials from "./ui/FloatingTestimonials";

export default function DeviceDetectionWrapper({ children }: { children: React.ReactNode }) {
  const { isMobile } = useDeviceDetection();

  return (
    <>
      {/* Custom cursor */}
      {!isMobile && <OptimizedCursor />}

      {/* Animated background gradient */}
      <BackgroundGradient />

      {/* Dynamic navigation dots */}
      {isMobile ? <MobileNavigation /> : <NavigationDots />}

      {/* Floating testimonials - outside normal document flow */}
      <FloatingTestimonials isMobile={isMobile}>
        {!isMobile && <OptimizedCursor />}
      </FloatingTestimonials>

      {/* Main content */}
      <main className="relative min-h-screen">{children}</main>
    </>
  );
}