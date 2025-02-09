"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-dark/50 backdrop-blur-sm">
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
