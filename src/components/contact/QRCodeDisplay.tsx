"use client";

import { motion } from "framer-motion";
import QRCode from "react-qr-code";

interface QRCodeDisplayProps {
  value: string;
  isHovered?: boolean;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  isHovered,
}) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* QR Code Container */}
      <motion.div
        className="relative bg-white p-2 rounded-lg shadow-lg overflow-hidden"
        animate={{
          rotateY: isHovered ? 180 : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        <QRCode
          value={value}
          size={88}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          viewBox={`0 0 256 256`}
          level="H"
        />

        {/* Scan Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/10 to-primary/0"
          animate={{
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-2 bg-primary/20 rounded-xl blur-xl opacity-0 
                   group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Scan Indicator */}
      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                   text-xs text-primary opacity-0 group-hover:opacity-100 
                   transition-opacity duration-300"
        initial={{ y: 10 }}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scan me
      </motion.div>
    </motion.div>
  );
};
