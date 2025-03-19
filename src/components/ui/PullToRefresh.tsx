"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function PullToRefresh({ children }: { children: React.ReactNode }) {
  const [refreshing, setRefreshing] = useState(false);
  const y = useMotionValue(0);
  const pullProgress = useTransform(y, [0, 100], [0, 1]);
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={(_, info) => {
        if (info.offset.y > 100) {
          handleRefresh();
        }
      }}
      style={{ y }}
      className="min-h-screen"
    >
      {/* Pull indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 flex justify-center items-center h-16 pointer-events-none z-50"
        style={{ opacity: pullProgress }}
      >
        <motion.div 
          className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
          style={{ rotate: useTransform(pullProgress, [0, 1], [0, 360]) }}
        />
      </motion.div>
      
      {/* Loading indicator */}
      {refreshing && (
        <motion.div 
          className="fixed top-0 left-0 right-0 flex justify-center items-center h-16 bg-dark-light/80 backdrop-blur-sm z-50"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
        >
          <motion.div 
            className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
      
      {children}
    </motion.div>
  );
}