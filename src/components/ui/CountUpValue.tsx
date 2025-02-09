"use client";

import { useEffect, useState } from "react";
import { useSpring } from "framer-motion";

interface CountUpProps {
  start: number;
  end: number;
  duration: number;
}

export function CountUpValue({
  start,
  end,
  duration,
}: CountUpProps): React.ReactElement {
  const [value, setValue] = useState(start);

  const springValue = useSpring(start, {
    stiffness: 100,
    damping: 30,
    duration,
  });

  useEffect(() => {
    springValue.set(end);

    const unsubscribe = springValue.on("change", (v) => {
      setValue(Math.floor(v));
    });

    return () => unsubscribe();
  }, [end, springValue]);

  return <>{value}</>;
}
