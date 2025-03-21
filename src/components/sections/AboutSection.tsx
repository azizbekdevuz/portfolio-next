"use client";

import { useRef, createContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InteractiveBio } from "../about/InteractiveBio";
import { JourneyTimeline } from "../about/JourneyTimeline";
import { TechStack } from "../about/TechStack";
import { Achievements } from "../about/Achievements";
import { MobileInteractiveBio } from "../about/MobileInteractiveBio";
import { MobileJourneyTimeline } from "../about/MobileJourneyTimeline";
import { MobileTechStack } from "../about/MobileTechStack";
import { MobileAchievements } from "../about/MobileAchievements";
import type { BioSection } from "@/models/Bio";
import type { JourneyData } from "@/models/Journey";
import type { TechCategory } from "@/models/TechStack";
import type { Achievement } from "@/models/Achievement";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

// Create context objects to help with the transition
export const BioContext = createContext<BioSection[]>([]);
export const JourneyContext = createContext<JourneyData[]>([]);
export const TechStackContext = createContext<Record<string, TechCategory>>({});
export const AchievementsContext = createContext<Achievement[]>([]);

interface AboutSectionProps {
  bioSections: BioSection[];
  journeyData: JourneyData[];
  techStack: Record<string, TechCategory>;
  achievements: Achievement[];
}

export function AboutSection({
  bioSections,
  journeyData,
  techStack,
  achievements,
}: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { isMobile } = useDeviceDetection();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and fade effects - reduced intensity for mobile
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.9, 1], 
    [0, 1, 1, 0]
  );
  
  // Less dramatic parallax on mobile
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    isMobile ? ["10%", "-10%"] : ["20%", "-20%"]
  );

  // If mobile, render mobile components
  if (isMobile) {
    return (
      <motion.section
        ref={containerRef}
        id="about"
        className="relative min-h-screen py-12 overflow-hidden"
        style={{ opacity }}
      >
        {/* Simplified Background Elements for Mobile */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_100%_200px,rgba(20,157,221,0.03),transparent)]" />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                     bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]"
            style={{ y }}
          />
        </div>

        {/* Main Content Container */}
        <BioContext.Provider value={bioSections}>
          <JourneyContext.Provider value={journeyData}>
            <TechStackContext.Provider value={techStack}>
              <AchievementsContext.Provider value={achievements}>
                <div className="relative z-10 container mx-auto px-4">
                  {/* Section Title - Simplified for Mobile */}
                  <motion.div
                    className="flex flex-col items-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2 mb-3 font-mono text-sm">
                      <span className="text-primary/50">class</span>
                      <h2 className="text-3xl font-bold text-text-light">AboutMe</h2>
                    </div>
                    <div className="flex items-center gap-2 mb-3 font-mono text-sm">
                      <span className="text-primary/50">extends</span>
                      <span className="text-text-light">Story</span>
                    </div>
                    <motion.div
                      className="h-1 w-20 bg-primary rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>

                  {/* Mobile-Optimized Components */}
                  <MobileInteractiveBio />
                  <MobileJourneyTimeline />
                  <MobileTechStack />
                  <MobileAchievements />
                </div>
              </AchievementsContext.Provider>
            </TechStackContext.Provider>
          </JourneyContext.Provider>
        </BioContext.Provider>
      </motion.section>
    );
  }

  // Original Desktop Version - Unchanged
  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(20,157,221,0.03),transparent)]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                   bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]"
          style={{ y }}
        />
      </div>

      {/* Main Content Container */}
      <BioContext.Provider value={bioSections}>
        <JourneyContext.Provider value={journeyData}>
          <TechStackContext.Provider value={techStack}>
            <AchievementsContext.Provider value={achievements}>
              <div className="relative z-10 container mx-auto px-4">
                {/* Section Title */}
                <motion.div
                  className="flex flex-col items-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-4 font-mono">
                    <span className="text-primary/50">class</span>
                    <h2 className="text-4xl font-bold text-text-light">AboutMe</h2>
                    <span className="text-primary/50">extends</span>
                    <span className="text-text-light">Story</span>
                  </div>
                  <motion.div
                    className="h-1 w-20 bg-primary rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                  />
                </motion.div>

                {/* Interactive Bio */}
                <InteractiveBio />

                {/* Journey Timeline */}
                <JourneyTimeline />

                {/* Tech Stack */}
                <TechStack />

                {/* Achievements */}
                <Achievements />
              </div>
            </AchievementsContext.Provider>
          </TechStackContext.Provider>
        </JourneyContext.Provider>
      </BioContext.Provider>
    </motion.section>
  );
}