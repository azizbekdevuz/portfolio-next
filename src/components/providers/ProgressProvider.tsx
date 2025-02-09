"use client";

import { createContext, useContext, useState } from "react";

type ProgressContextType = {
  progress: number;
  setProgress: (value: number) => void;
};

const ProgressContext = createContext<ProgressContextType>({
  progress: 0,
  setProgress: () => {},
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
