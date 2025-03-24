"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import { skillNodes } from "../skills/skillsList";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

export default function SkillsDesktop() {
  const [activeSkill, setActiveSkill] = useState<string>("webdev");
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceDetection();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const activeNode = skillNodes.find((node) => node.id === activeSkill);

  // Desktop mouse movement handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Original Desktop Version
  return (
    <motion.section
      ref={containerRef}
      id="skills"
      className="relative min-h-screen py-20 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Enhanced Background with Dynamic Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(20,157,221,0.03),transparent)]" />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                     bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]"
          style={{
            rotateX: mouseY,
            rotateY: mouseX,
            transformPerspective: 1000,
          }}
        />

        {/* Dynamic Glow Effect */}
        <motion.div
          className="absolute blur-[100px] rounded-full bg-primary/20"
          style={{
            width: 400,
            height: 400,
            x: mouseX,
            y: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Enhanced Section Title */}
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4 font-mono">
            <span className="text-primary/50">class</span>
            <h2 className="text-4xl font-bold text-text-light">SkillMatrix</h2>
            <span className="text-primary/50">extends</span>
            <span className="text-text-light">Expertise</span>
          </div>
          <motion.div
            className="h-1 w-20 bg-primary rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid lg:grid-cols-[1.5fr_2.5fr] gap-8">
          {/* Skill Navigation Panel */}
          <div className="space-y-4">
            {skillNodes.map((node, index) => (
              <motion.button
                key={node.id}
                onClick={() => setActiveSkill(node.id)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full p-6 rounded-lg text-left transition-all duration-300
                           border group relative overflow-hidden
                           ${
                             activeSkill === node.id
                               ? "border-primary bg-primary/10"
                               : "border-primary/20 hover:border-primary/50"
                           }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Skill Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl">{node.icon}</span>
                    <div>
                      <h3 className="text-xl text-text-light font-medium">
                        {node.title}
                      </h3>
                      <span className="text-primary text-sm">
                        {node.experience}
                      </span>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm mb-3">
                    {node.description}
                  </p>

                  {/* Mini Tools Preview */}
                  <div className="flex flex-wrap gap-2">
                    {node.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-1 rounded-full bg-dark-light/30 
                                 text-xs text-primary/80"
                      >
                        {tool}
                      </span>
                    ))}
                    {node.tools.length > 3 && (
                      <span className="text-text-secondary text-xs">
                        +{node.tools.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Background Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.button>
            ))}
          </div>

          {/* Detailed Skill View */}
          <AnimatePresence mode="wait">
            {activeNode && (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-dark-light/20 rounded-lg p-8 border border-primary/20
                          backdrop-blur-sm relative overflow-hidden"
              >
                {/* Workspace Section */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-2xl text-text-light mb-6 font-medium">
                    {activeNode.workspace.title}
                  </h3>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    {activeNode.workspace.tools.map((tool, index) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                      >
                        <motion.div
                          className="p-4 rounded-lg bg-dark-light/30 border border-primary/20
                                    hover:border-primary/50 transition-colors duration-300"
                          whileHover={{ y: -5 }}
                        >
                          <div className="relative w-10 h-10 mx-auto mb-3">
                            <Image
                              src={tool.icon}
                              alt={tool.name}
                              fill
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <p className="text-center text-sm text-text-secondary group-hover:text-text-light">
                            {tool.name}
                          </p>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Projects & Experience */}
                <div className="space-y-6">
                  {/* Projects Section */}
                  {activeNode.projects && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-text-light mb-3">
                        Featured Projects
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {activeNode.projects.map((project) => (
                          <div
                            key={project}
                            className="px-4 py-2 rounded-lg bg-primary/5 border border-primary/20
                                     text-primary text-sm"
                          >
                            {project}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Tools & Technologies */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="text-text-light mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeNode.tools.map((tool) => (
                        <div
                          key={tool}
                          className="px-3 py-1 rounded-full bg-dark-light/30
                                   border border-primary/20 text-sm text-primary"
                        >
                          {tool}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 opacity-10
                              bg-gradient-conic from-primary via-transparent to-transparent
                              blur-3xl"
                />
                <div
                  className="absolute bottom-0 left-0 w-64 h-64 opacity-10
                              bg-gradient-conic from-transparent via-primary to-transparent
                              blur-3xl"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}