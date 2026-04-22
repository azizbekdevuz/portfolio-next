"use client";

import { useRef, createContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { InteractiveBio } from "../about/InteractiveBio";
import { JourneyTimeline } from "../about/JourneyTimeline";
import { TechStack } from "../about/TechStack";
import { Achievements } from "../about/Achievements";
import type { BioSection } from "@/models/Bio";
import type { JourneyData } from "@/models/Journey";
import type { TechCategory } from "@/models/TechStack";
import type { Achievement } from "@/models/Achievement";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useI18n } from "@/components/i18n/I18nProvider";

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
  embedded?: boolean;
}

export function AboutSection({
  bioSections,
  journeyData,
  techStack,
  achievements,
  embedded = false,
}: AboutSectionProps) {
  const { messages } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const { isMobile } = useDeviceDetection();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and fade effects - reduced intensity for mobile
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Less dramatic parallax on mobile
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["10%", "-10%"] : ["20%", "-20%"]);

  const inner = (
    <BioContext.Provider value={bioSections}>
      <JourneyContext.Provider value={journeyData}>
        <TechStackContext.Provider value={techStack}>
          <AchievementsContext.Provider value={achievements}>
            <div className="relative z-10 container mx-auto min-w-0 px-4">
              {!embedded && (
                <motion.div
                  className={`mb-12 flex flex-col items-center ${isMobile ? "mb-10" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {isMobile ? (
                    <>
                      <div className="mb-3 flex items-center gap-2 font-mono text-sm">
                        <span className="text-accent/50">{messages.aboutSection.classKeyword}</span>
                        <h2 className="text-3xl font-bold text-fg">{messages.aboutSection.aboutTitle}</h2>
                      </div>
                      <div className="mb-3 flex items-center gap-2 font-mono text-sm">
                        <span className="text-accent/50">{messages.aboutSection.extendsKeyword}</span>
                        <span className="text-fg">{messages.aboutSection.storyTitle}</span>
                      </div>
                    </>
                  ) : (
                    <div className="mb-4 flex items-center gap-3 font-mono">
                      <span className="text-accent/50">{messages.aboutSection.classKeyword}</span>
                      <h2 className="text-4xl font-bold text-fg">{messages.aboutSection.aboutTitle}</h2>
                      <span className="text-accent/50">{messages.aboutSection.extendsKeyword}</span>
                      <span className="text-fg">{messages.aboutSection.storyTitle}</span>
                    </div>
                  )}
                  <motion.div
                    className="h-1 w-20 rounded-full bg-accent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              )}
              <InteractiveBio />
              <JourneyTimeline />
              <TechStack />
              <Achievements />
            </div>
          </AchievementsContext.Provider>
        </TechStackContext.Provider>
      </JourneyContext.Provider>
    </BioContext.Provider>
  );

  if (embedded) {
    return (
      <div className="min-h-0 min-w-0 border-t border-border py-4">
        {inner}
      </div>
    );
  }

  // If mobile, render mobile components
  if (isMobile) {
    return (
      <motion.section
        ref={containerRef}
        id="about"
        className="relative overflow-hidden border-t border-border py-12 md:py-16"
        style={{ opacity }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_100%_200px,var(--color-glow),transparent)]" />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]"
            style={{ y }}
          />
        </div>
        {inner}
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden border-t border-border py-14 md:py-20"
      style={{ opacity }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--color-glow),transparent)]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]"
          style={{ y }}
        />
      </div>
      {inner}
    </motion.section>
  );
}