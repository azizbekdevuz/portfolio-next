"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { CountUpValue } from "../CountUpValue";
import { MobileInteractiveProfile } from "../MobileInteractiveProfile";
import { MobileIDETagline } from "../MobileIDETagline";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import ExploreButton from "./ExploreButton";

export default function HeroMobile() {
  const containerRef = useRef<HTMLElement>(null);
  const {isMobile} = useDeviceDetection();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Mobile version of Hero Section
  if (isMobile) {
    return (
      <motion.section
        id="hero"
        ref={containerRef}
        className="relative min-h-[100svh] py-6 flex flex-col justify-center overflow-hidden"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Simplified Background for Mobile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        
        {/* Optimized Background Effects for Mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at center, rgba(20, 157, 221, 0.5) 0%, transparent 50%)",
              backgroundSize: "200% 200%",
            }}
          />
        </div>
        
        {/* Main Content - Mobile Layout */}
        <div className="relative z-10 w-full max-w-md mx-auto px-4 flex flex-col items-center">
          {/* Mobile Profile Image - Top Position */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MobileInteractiveProfile />
          </motion.div>
          
          {/* Name and Title */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-text-light">
              Azizbek Arzikulov
            </h1>
            
            <motion.div
              className="text-xl text-text-secondary mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I&apos;m{" "}
              <span className="text-primary">
                <TypeAnimation
                  sequence={[
                    "Designer",
                    2000,
                    "Developer",
                    2000,
                    "Freelancer",
                    2000,
                  ]}
                  wrapper="span"
                  repeat={Infinity}
                />
              </span>
            </motion.div>
          </motion.div>
          
          {/* Mobile Tag Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full mb-6"
          >
            <MobileIDETagline />
          </motion.div>
          
          {/* Mobile Specializations - Scrollable */}
          <motion.div
            className="w-full mb-6 overflow-x-auto scrollbar-hide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex gap-3 pb-2" style={{ minWidth: "min-content" }}>
              {[
                { name: "Web Development", icon: "🌐", progress: 90 },
                { name: "UI/UX Design", icon: "🎨", progress: 85 },
                { name: "Full Stack", icon: "⚡", progress: 80 },
              ].map((skill) => (
                <motion.div
                  key={skill.name}
                  className="relative flex-shrink-0 px-4 py-1.5 bg-primary/5 rounded-full 
                            border border-primary/20 backdrop-blur-sm"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{skill.icon}</span>
                    <span className="text-primary text-sm whitespace-nowrap">{skill.name}</span>
                  </div>
                  
                  {/* Progress indicator always visible on mobile */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-primary/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Mobile Stats - Grid */}
          <motion.div
            className="w-full grid grid-cols-3 gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { value: 2, label: "Years Experience", symbol: "+" },
              { value: 4, label: "Projects Done", symbol: "+" },
              { value: 10, label: "Technologies", symbol: "+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center p-2 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-primary text-lg font-bold">
                    <CountUpValue start={0} end={stat.value} duration={1.5} />
                    {stat.symbol}
                  </div>
                  <div className="text-text-secondary/70 text-xs">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Mobile Location & Availability - Stacked */}
          <motion.div
            className="w-full flex flex-col gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/5
                        border border-primary/20"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-sm text-text-secondary/80">
                Available for projects
              </span>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/5
                        border border-primary/20"
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm text-text-secondary/80">
                <motion.span
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  📍
                </motion.span>
                Seoul, South Korea
              </span>
            </motion.div>
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <ExploreButton />
          </motion.div>
          
          {/* Simplified Scroll Indicator for Mobile */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-6 h-8 border-2 border-text-secondary/30 rounded-full p-1"
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-1.5 h-2 bg-primary rounded-full"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  y: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }
  
}