"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface DeviceContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const DeviceContext = createContext<DeviceContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
});

export const useDeviceDetection = () => useContext(DeviceContext);

export function DeviceDetectionProvider({ children }: { children: ReactNode }) {
  const [deviceData, setDeviceData] = useState<DeviceContextType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      
      setDeviceData({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    checkDevice();

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