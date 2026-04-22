"use client";

import { useEffect, useState } from "react";

export function CountUpValue({
  start = 0,
  end,
  duration = 2,
}: {
  start?: number;
  end: number;
  duration?: number;
}) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const progress = (Date.now() - startTime) / (duration * 1000);
      if (progress >= 1) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(start + (end - start) * progress);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [start, end, duration]);

  return <>{Math.floor(value)}</>;
}
