"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { CountUpValue } from "@/components/inprogress/CountUpValue";
import { MobileInteractiveProfile } from "./MobileInteractiveProfile";
import ExploreButton from "./ExploreButton";

export default function OptimizedHeroMobile() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <motion.section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] py-6 flex flex-col justify-center overflow-hidden"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Simplified Background for Mobile - CSS only, no animations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Static gradient background instead of animated one */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent opacity-20" />
      
      {/* Main Content - Mobile Layout */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 flex flex-col items-center">
        {/* Mobile Profile Image - Top Position with optimized component */}
        <div className="mb-6">
          <MobileInteractiveProfile />
        </div>
        
        {/* Name and Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-text-light">
            Azizbek Arzikulov
          </h1>
          
          <div className="text-xl text-text-secondary mb-4">
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
          </div>
        </div>
        
        {/* Simplified Tag Line - Static version */}
        <div className="relative font-mono text-sm bg-dark-light/20 rounded-lg p-3 border border-primary/20 overflow-hidden mb-6">
          <span className="text-primary/70 mr-1">&gt;</span>
          <span className="text-text-light">Building digital experiences</span>
        </div>
        
        {/* Mobile Specializations - Static for better performance */}
        <div className="w-full mb-6 overflow-x-auto pb-2 flex gap-3">
          {[
            { name: "Web Development", icon: "🌐", progress: 90 },
            { name: "UI/UX Design", icon: "🎨", progress: 85 },
            { name: "Full Stack", icon: "⚡", progress: 80 },
          ].map((skill) => (
            <div
              key={skill.name}
              className="relative flex-shrink-0 px-4 py-1.5 bg-primary/5 rounded-full 
                        border border-primary/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{skill.icon}</span>
                <span className="text-primary text-sm whitespace-nowrap">{skill.name}</span>
              </div>
              
              {/* Static progress indicator instead of animated */}
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-primary/50"
                style={{ width: `${skill.progress}%` }}
              />
            </div>
          ))}
        </div>
        
        {/* Mobile Stats - Grid */}
        <div className="w-full grid grid-cols-3 gap-3 mb-6">
          {[
            { value: 2, label: "Years Experience", symbol: "+" },
            { value: 4, label: "Projects Done", symbol: "+" },
            { value: 10, label: "Technologies", symbol: "+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="relative"
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
            </div>
          ))}
        </div>
        
        {/* Mobile Location & Availability - Static versions */}
        <div className="w-full flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/5
                        border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-text-secondary/80">
              Available for projects
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/5
                        border border-primary/20">
            <span className="text-sm text-text-secondary/80">
              📍 Seoul, South Korea
            </span>
          </div>
        </div>
        
        {/* CTA Button */}
        <div>
          <ExploreButton />
        </div>
        
        {/* Static Scroll Indicator for Mobile */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="w-6 h-8 border-2 border-text-secondary/30 rounded-full p-1">
            <div className="w-1.5 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}