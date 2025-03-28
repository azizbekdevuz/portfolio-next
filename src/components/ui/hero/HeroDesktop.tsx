"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import { GlowEffect } from "@/components/effects/GlowEffect";
import { InteractiveProfile } from "./InteractiveProfile";
import { CountUpValue } from "@/components/inprogress/CountUpValue";
import { IDETagline } from "./IDETagline";
import ExploreButton from "./ExploreButton";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export default function HeroDesktop() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const {isMobile} = useDeviceDetection();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const springConfig = { stiffness: 100, damping: 30 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return; // Skip mouse tracking on mobile
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Original Desktop Version - Unchanged
  return (
    <motion.section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Enhanced Background Effects */}
      <ParticlesBackground mouseX={mouseXSpring} mouseY={mouseYSpring} />
      <GlowEffect mouseX={mouseXSpring} mouseY={mouseYSpring} />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div className="text-left" style={{ y, scale }}>
          <div>
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-text-light">
                Azizbek Arzikulov
              </h1>
              <motion.div
                className="absolute -inset-2 bg-primary/20 rounded-lg blur-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.div
              className="text-xl md:text-2xl text-text-secondary mb-4"
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

            {/* New: Tag Line */}
            <IDETagline />

            {/* Interactive Specializations */}
            <motion.div
              className="flex flex-wrap gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { name: "Web Development", icon: "🌐", progress: 90 },
                { name: "UI/UX Design", icon: "🎨", progress: 85 },
                { name: "Full Stack", icon: "⚡", progress: 80 },
              ].map((skill) => (
                <motion.div
                  key={skill.name}
                  className="group relative px-4 py-1.5 bg-primary/5 rounded-full 
                            border border-primary/20 backdrop-blur-sm cursor-pointer
                            hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{skill.icon}</span>
                    <span className="text-primary text-sm">{skill.name}</span>
                  </div>

                  {/* Progress indicator on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-primary/50"
                    initial={{ width: 0 }}
                    whileHover={{ width: `${skill.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />

                  {/* Tooltip on hover */}
                  <motion.div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5
                              bg-dark-light/90 rounded-lg text-xs invisible group-hover:visible
                              whitespace-nowrap backdrop-blur-sm border border-primary/20"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    {skill.progress}% Proficiency
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Live Stats with Counters */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-8"
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
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20
                                  hover:bg-primary/10 transition-all duration-300"
                  >
                    <motion.div
                      className="text-primary text-2xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <CountUpValue start={0} end={stat.value} duration={2} />
                      {stat.symbol}
                    </motion.div>
                    <div className="text-text-secondary/70 text-sm mt-1">
                      {stat.label}
                    </div>
                  </div>

                  {/* Floating particles on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full"
                        initial={{
                          x: 0,
                          y: 0,
                          opacity: 0.5,
                        }}
                        animate={{
                          x: Math.random() * 40 - 20,
                          y: Math.random() * 40 - 20,
                          opacity: 0,
                          scale: 0,
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Dynamic Location & Availability */}
            <motion.div
              className="flex items-center gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5
                          border border-primary/20 hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
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
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5
                          border border-primary/20 hover:bg-primary/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
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

            {/* Existing CTA Button */}
            <ExploreButton />
          </div>
        </motion.div>

        {/* Interactive Profile Section */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <InteractiveProfile
            isHovered={isProfileHovered}
            onHoverChange={setIsProfileHovered}
            mouseX={mouseXSpring}
            mouseY={mouseYSpring}
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-text-secondary/30 rounded-full p-1"
          animate={{
            y: [0, 8, 0],
            boxShadow: [
              "0 0 0 rgba(20, 157, 221, 0)",
              "0 0 10px rgba(20, 157, 221, 0.3)",
              "0 0 0 rgba(20, 157, 221, 0)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-1.5 h-3 bg-primary rounded-full"
            animate={{
              opacity: [0.5, 1, 0.5],
              y: [0, 8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}