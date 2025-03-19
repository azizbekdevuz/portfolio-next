"use client"; // ✅ Client Component

import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { OptimizedCursor } from "@/components/ui/Cursor";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { NavigationDots } from "@/components/navigation/NavigationDots";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";

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

      {/* Main content */}
      <main className="relative min-h-screen">{children}</main>
    </>
  );
}