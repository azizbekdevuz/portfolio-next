"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the context type
interface DeviceContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Create context with default values
const DeviceContext = createContext<DeviceContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
});

// Custom hook to use the device context
export const useDeviceDetection = () => useContext(DeviceContext);

// Provider component
export function DeviceDetectionProvider({ children }: { children: ReactNode }) {
  // Default to false values - will be updated in useEffect
  const [deviceData, setDeviceData] = useState<DeviceContextType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    // Function to check device type
    const checkDevice = () => {
      const width = window.innerWidth;
      
      setDeviceData({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    // Run once on mount
    checkDevice();
    
    // Add event listener with debounce for better performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkDevice, 250);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceData}>
      {children}
    </DeviceContext.Provider>
  );
}