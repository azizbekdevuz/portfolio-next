"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";

interface SkillNode {
  id: string;
  title: string;
  icon: string;
  description: string;
  tools: string[];
  experience: string;
  projects?: string[];
  workspace: {
    title: string;
    tools: { name: string; icon: string }[];
    environment: string;
  };
}

const skillNodes: SkillNode[] = [
  {
    id: "webdev",
    title: "Web Development",
    icon: "💻",
    description:
      "Full-stack development specializing in modern web technologies and AI integration",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "Framer Motion",
      "Three.js",
      "AWS",
      "Docker",
    ],
    experience: "2+ years",
    projects: ["ZDesigner AI", "Professor Website", "Portfolio"],
    workspace: {
      title: "Development Environment",
      tools: [
        { name: "React", icon: "/icons/react.svg" },
        { name: "Next", icon: "/icons/nextjs.svg" },
        { name: "NodeJS", icon: "/icons/nodejs.svg" },
        { name: "GitHub", icon: "/icons/github.svg" },
        { name: "Docker", icon: "/icons/docker.svg" },
        { name: "Vercel", icon: "/icons/vercel.svg" },
        { name: "AWS", icon: "/icons/aws.svg" },
      ],
      environment: "Modern Development Setup",
    },
  },
  {
    id: "design",
    title: "Graphic Design",
    icon: "🎨",
    description:
      "Creative visual design focusing on brand identity, UI/UX, and marketing materials",
    tools: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Figma",
      "UI/UX Design",
      "Brand Design",
      "Social Media Graphics",
    ],
    experience: "1+ year",
    projects: ["POZITIV Denta Branding", "Social Media Designs"],
    workspace: {
      title: "Design Studio",
      tools: [
        { name: "Photoshop", icon: "/icons/photoshop.svg" },
        { name: "Illustrator", icon: "/icons/illustrator.svg" },
        { name: "Figma", icon: "/icons/figma.svg" },
      ],
      environment: "Creative Workspace",
    },
  },
  {
    id: "smm",
    title: "Social Media Management",
    icon: "📱",
    description:
      "Strategic social media management focusing on growth and engagement",
    tools: [
      "Content Strategy",
      "Analytics",
      "Community Management",
      "Campaign Planning",
      "Growth Hacking",
      "Engagement Optimization",
    ],
    experience: "1 year",
    projects: ["POZITIV Denta SMM", "Personal Brand Management"],
    workspace: {
      title: "Social Command Center",
      tools: [
        { name: "Analytics", icon: "/icons/analytics.svg" },
        { name: "Telegram", icon: "/icons/telegram.svg" },
        { name: "Instagram", icon: "/icons/instagram.svg" },
        { name: "Facebook", icon: "/icons/facebook.svg" },
      ],
      environment: "Digital Marketing Hub",
    },
  },
  {
    id: "english",
    title: "English Tutoring",
    icon: "📚",
    description:
      "Personalized English language instruction focusing on practical communication skills",
    tools: [
      "IELTS Preparation",
      "Business English",
      "Conversational English",
      "Grammar & Vocabulary",
      "Pronunciation",
      "Academic Writing",
    ],
    experience: "1 year",
    projects: ["Private Tutoring", "Group Classes"],
    workspace: {
      title: "Virtual Classroom",
      tools: [
        { name: "Zoom", icon: "/icons/zoom.svg" },
        { name: "Google Classroom", icon: "/icons/classroom.svg" },
      ],
      environment: "Interactive Learning Space",
    },
  },
];

export function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string>("webdev");
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<"overview" | "details">("overview");
  const [activeTab, setActiveTab] = useState<"about" | "tools" | "projects">("about");
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Check if the screen size is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const activeNode = skillNodes.find((node) => node.id === activeSkill);

  // Scroll to top of details view when selecting a new skill in details mode
  useEffect(() => {
    if (currentView === "details" && skillsContainerRef.current) {
      skillsContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeSkill, currentView]);

  // Handle back button action
  const handleBack = () => {
    setCurrentView("overview");
  };

  // Handle skill selection
  const handleSelectSkill = (skillId: string) => {
    setActiveSkill(skillId);
    // On mobile, automatically switch to details view when selecting skill
    if (isMobile) {
      setCurrentView("details");
      setActiveTab("about"); // Reset to the first tab
    }
  };

  // Desktop mouse movement handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  // Mobile version
  if (isMobile) {
    return (
      <motion.section
        ref={containerRef}
        id="skills"
        className="relative min-h-[100svh] py-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Simplified Background for Mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_300px_at_50%_30%,rgba(20,157,221,0.02),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a101f_1px,transparent_1px),linear-gradient(to_bottom,#0a101f_1px,transparent_1px)]
                     bg-[size:3rem_3rem] opacity-40" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 container mx-auto px-4">
          {/* Section Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-text-light mb-2">My Skills</h2>
            <div className="h-1 w-16 bg-primary rounded-full mx-auto"></div>
          </motion.div>

          {/* Two Views: Overview (Grid) and Details (Focused View) */}
          <AnimatePresence mode="wait">
            {currentView === "overview" ? (
              /* OVERVIEW: Skill Cards Grid */
              <motion.div
                key="overview"
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {skillNodes.map((skill) => (
                  <motion.div
                    key={skill.id}
                    className={`relative rounded-lg overflow-hidden border ${
                      skill.id === activeSkill ? "border-primary" : "border-primary/20"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectSkill(skill.id)}
                  >
                    {/* Card with Info */}
                    <div className="p-4 bg-dark-light/30 h-full flex flex-col">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{skill.icon}</span>
                        <h3 className="text-base font-medium text-text-light">{skill.title}</h3>
                      </div>
                      
                      {/* Experience Badge */}
                      <div className="mb-2">
                        <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {skill.experience}
                        </span>
                      </div>
                      
                      {/* Short Description */}
                      <p className="text-xs text-text-secondary line-clamp-2 mb-3">
                        {skill.description}
                      </p>
                      
                      {/* View More Button */}
                      <div className="mt-auto text-xs text-primary flex items-center">
                        <span>View details</span>
                        <span className="ml-1">→</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* DETAILS: Individual Skill Focused View */
              <motion.div
                key="details"
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                ref={skillsContainerRef}
              >
                {activeNode && (
                  <>
                    {/* Back Button */}
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center gap-1 text-sm text-primary mb-4"
                    >
                      <span>←</span>
                      <span>Back to all skills</span>
                    </button>
                    
                    {/* Skill Header */}
                    <div className="bg-dark-light/20 rounded-t-lg p-4 border border-primary/30 border-b-0">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{activeNode.icon}</span>
                        <div>
                          <h3 className="text-xl font-medium text-text-light">
                            {activeNode.title}
                          </h3>
                          <span className="text-primary text-sm">
                            {activeNode.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tab Navigation */}
                    <div className="flex border-b border-primary/30">
                      <button
                        onClick={() => setActiveTab("about")}
                        className={`flex-1 py-2 text-center text-sm font-medium ${
                          activeTab === "about" 
                            ? "text-primary border-b-2 border-primary" 
                            : "text-text-secondary"
                        }`}
                      >
                        About
                      </button>
                      <button
                        onClick={() => setActiveTab("tools")}
                        className={`flex-1 py-2 text-center text-sm font-medium ${
                          activeTab === "tools" 
                            ? "text-primary border-b-2 border-primary" 
                            : "text-text-secondary"
                        }`}
                      >
                        Tools
                      </button>
                      {activeNode.projects && (
                        <button
                          onClick={() => setActiveTab("projects")}
                          className={`flex-1 py-2 text-center text-sm font-medium ${
                            activeTab === "projects"
                              ? "text-primary border-b-2 border-primary"
                              : "text-text-secondary"
                          }`}
                        >
                          Projects
                        </button>
                      )}
                    </div>
                    
                    {/* Tab Content */}
                    <div className="bg-dark-light/20 rounded-b-lg p-4 border border-primary/30 border-t-0 min-h-[50vh]">
                      <AnimatePresence mode="wait">
                        {/* About Tab */}
                        {activeTab === "about" && (
                          <motion.div
                            key="about"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="text-text-light font-medium mb-3">Overview</h4>
                            <p className="text-text-secondary mb-6 text-sm">
                              {activeNode.description}
                            </p>
                            
                            <h4 className="text-text-light font-medium mb-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {activeNode.tools.map((tool) => (
                                <span
                                  key={tool}
                                  className="px-2 py-1 rounded-full text-xs bg-dark-light/30 
                                          border border-primary/20 text-primary"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                            
                            <div className="bg-primary/5 rounded-lg p-3 border border-primary/20 mt-6">
                              <h4 className="text-primary text-sm font-medium mb-2">{activeNode.workspace.environment}</h4>
                              <p className="text-text-secondary text-xs">
                                {activeNode.workspace.title} with specialized tools for optimal productivity
                                and efficient workflow. Tap the Tools tab to learn more.
                              </p>
                            </div>
                          </motion.div>
                        )}
                        
                        {/* Tools Tab */}
                        {activeTab === "tools" && (
                          <motion.div
                            key="tools"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="text-text-light font-medium mb-4">
                              {activeNode.workspace.title}
                            </h4>
                            
                            <div className="grid grid-cols-3 gap-3">
                              {activeNode.workspace.tools.map((tool, index) => (
                                <motion.div
                                  key={tool.name}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="bg-dark-light/30 p-3 rounded-lg border border-primary/20 flex flex-col items-center"
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="relative w-10 h-10 mb-2">
                                    <Image
                                      src={tool.icon}
                                      alt={tool.name}
                                      fill
                                      sizes="40px"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                  <span className="text-center text-xs text-text-secondary">
                                    {tool.name}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                            
                            <div className="mt-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
                              <p className="text-xs text-text-secondary">
                                These are the primary tools and technologies I use for {activeNode.title.toLowerCase()} projects, 
                                allowing me to deliver high-quality results efficiently.
                              </p>
                            </div>
                          </motion.div>
                        )}
                        
                        {/* Projects Tab */}
                        {activeTab === "projects" && activeNode.projects && (
                          <motion.div
                            key="projects"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h4 className="text-text-light font-medium mb-4">Featured Projects</h4>
                            
                            <div className="space-y-3">
                              {activeNode.projects.map((project, index) => (
                                <motion.div
                                  key={project}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="p-3 bg-dark-light/30 rounded-lg border border-primary/20"
                                >
                                  <div className="flex items-center justify-between">
                                    <h5 className="text-sm font-medium text-text-light">{project}</h5>
                                    <span className="text-xs text-primary">View →</span>
                                  </div>
                                  <p className="text-xs text-text-secondary mt-1">
                                    A {activeNode.title.toLowerCase()} project showcasing my skills in
                                    {activeNode.tools.slice(0, 2).join(", ")} and more.
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                            
                            <div className="mt-6 text-center">
                              <button className="px-4 py-2 bg-primary/10 text-primary text-sm rounded-lg border border-primary/30">
                                See all projects
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    );
  }

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