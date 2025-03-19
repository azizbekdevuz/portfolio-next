"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// CountUp Component - Simplified for mobile performance
export const CountUpValue = ({
  end,
  duration = 1.5,
}: {
  end: number;
  duration?: number;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const progress = (Date.now() - startTime) / (duration * 1000);
      if (progress >= 1) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(end * progress));
      }
    }, 50); // Lower frequency updates for better performance

    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{Math.floor(value)}</>;
};

export function MobileInProgressSection() {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'roadmap'>('overview');
  const [contributions, ] = useState({
    codeLines: 12500,
    features: 24,
    optimizations: 18,
  });

  // Construction stages simplified for mobile
  const constructionStages = [
    {
      icon: "🏗️",
      title: "Foundation",
      description: "Core architecture setup",
      progress: 60,
    },
    {
      icon: "🔧",
      title: "Integration",
      description: "Connecting components",
      progress: 45,
    },
    {
      icon: "🖥️",
      title: "Interface",
      description: "Polishing UX/UI",
      progress: 30,
    },
  ];

  // Roadmap data
  const roadmapItems = [
    { 
      phase: "Current", 
      items: ["Skills Matrix", "Contact Form", "Project Cards", "Mobile Optimization"] 
    },
    { 
      phase: "Next Up", 
      items: ["Blog Integration", "Testimonials", "Dark/Light Modes", "Animations"] 
    },
    { 
      phase: "Future", 
      items: ["Case Studies", "Interactive Demos", "3D Elements", "API Integration"] 
    }
  ];

  return (
    <section id="in-progress" className="relative py-12 px-4 bg-dark-light/5">
      {/* Section Title - Simple and Clear */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-text-light mb-1">
          <span className="text-primary">[</span>
          Digital Ecosystem
          <span className="text-primary">]</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-2" />
        <div className="font-mono text-xs text-text-secondary flex items-center justify-center gap-2">
          <span className="text-primary">●</span>
          <span>In Development • 67% Complete</span>
        </div>
      </motion.div>

      {/* Tab Navigation - Mobile-friendly navigation */}
      <div className="flex rounded-lg bg-dark-light/20 p-1 mb-6 sticky top-4 z-30 border border-primary/10 backdrop-blur-md shadow-lg">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'progress', label: 'Progress' },
          { id: 'roadmap', label: 'Roadmap' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'overview' | 'progress' | 'roadmap')}
            className={`flex-1 py-2 text-center rounded-md text-sm font-medium transition-colors 
              ${activeTab === tab.id 
                ? 'bg-primary text-white shadow-md' 
                : 'text-text-secondary hover:bg-primary/10'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-dark-light/30 rounded-lg p-5 border border-primary/20 backdrop-blur-sm"
          >
            {/* Overview Content */}
            <div className="flex flex-col items-center text-center mb-4">
              <motion.div
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V7a1 1 0 011-1h1a1 1 0 001-1V4a2 2 0 114 0v1a1 1 0 001 1h2a1 1 0 001-1V4z"
                  />
                </svg>
              </motion.div>
              
              <h3 className="text-xl font-bold text-text-light mb-3">
                Crafting a Dynamic Digital Landscape
              </h3>
              
              <p className="text-text-secondary text-sm">
                This portfolio is an evolving digital ecosystem. Each component is meticulously 
                designed to showcase not just projects, but the journey of technological innovation.
              </p>
            </div>
            
            {/* Overall Progress Bar - simplified */}
            <div className="mt-4">
              <div className="flex justify-between mb-1 text-xs">
                <span className="text-text-secondary">Portfolio Completion</span>
                <span className="text-primary">65%</span>
              </div>
              <div className="w-full bg-dark-light/30 rounded-full h-2.5">
                <motion.div
                  className="bg-primary h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {Object.entries(contributions).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-dark-light/20 p-3 rounded-lg border border-primary/10"
                >
                  <div className="text-lg font-bold text-primary">
                    <CountUpValue end={value} />
                  </div>
                  <span className="text-text-secondary text-xs">
                    {key.replace(/([A-Z])/g, " $1").replace("code", "").trim()}
                  </span>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <motion.button
              className="w-full mt-5 py-3 bg-primary/10 border border-primary text-primary 
                       rounded-lg flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('progress')}
            >
              <span>View Construction Progress</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-dark-light/30 rounded-lg p-5 border border-primary/20 backdrop-blur-sm mb-4">
              <h3 className="text-lg font-bold text-text-light mb-3">Construction Stages</h3>
              
              {/* Vertical progress bars for better mobile layout */}
              <div className="space-y-4">
                {constructionStages.map((stage, index) => (
                  <div key={stage.title} className="bg-dark-light/20 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{stage.icon}</div>
                      <div>
                        <h4 className="text-primary font-medium text-sm">{stage.title}</h4>
                        <p className="text-text-secondary text-xs">{stage.description}</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-dark-light/20 rounded-full h-2.5">
                      <motion.div
                        className="bg-primary h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                    <div className="text-xs text-text-secondary mt-1 text-right">
                      {stage.progress}% Complete
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Updates */}
            <div className="bg-dark-light/30 rounded-lg p-5 border border-primary/20 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-text-light mb-3">Recent Updates</h3>
              
              <div className="space-y-2">
                {[
                  { date: "Mar 15", update: "Added mobile responsive design" },
                  { date: "Mar 12", update: "Improved contact form validation" },
                  { date: "Mar 08", update: "New project card animations" },
                  { date: "Mar 05", update: "Optimized loading performance" },
                ].map((update, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 p-2 border-b border-primary/10 last:border-b-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-primary/10 text-primary text-xs py-1 px-2 rounded font-mono whitespace-nowrap">
                      {update.date}
                    </div>
                    <div className="text-text-secondary text-sm">
                      {update.update}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button */}
              <motion.button
                className="w-full mt-4 py-3 bg-primary/10 border border-primary text-primary 
                         rounded-lg flex items-center justify-center gap-2"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('roadmap')}
              >
                <span>View Future Roadmap</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}

        {activeTab === 'roadmap' && (
          <motion.div
            key="roadmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-dark-light/30 rounded-lg p-5 border border-primary/20 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-text-light mb-3">Development Roadmap</h3>
              
              {/* Vertical timeline for mobile */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-primary/30">
                {roadmapItems.map((phase, phaseIndex) => (
                  <div key={phase.phase} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-8 top-0 border-2 border-dark-light" />
                    
                    {/* Phase content */}
                    <div>
                      <h4 className="text-primary font-medium mb-2">{phase.phase}</h4>
                      <div className="bg-dark-light/20 rounded-lg p-3">
                        <ul className="space-y-2">
                          {phase.items.map((item, itemIndex) => (
                            <motion.li 
                              key={item}
                              className="flex items-start gap-2 text-text-secondary text-sm"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 * itemIndex + 0.2 * phaseIndex }}
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Newsletter subscription for updates */}
              <div className="mt-6 bg-primary/5 rounded-lg p-4 border border-primary/10">
                <h4 className="text-text-light font-medium text-sm mb-2">Stay Updated</h4>
                <p className="text-text-secondary text-xs mb-3">
                  Get notified when new features are launched.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-dark-light/30 border border-primary/20 rounded-l-lg py-2 px-3 text-sm text-text-light outline-none flex-1"
                  />
                  <button className="bg-primary text-white rounded-r-lg py-2 px-3 text-sm font-medium">
                    Subscribe
                  </button>
                </div>
              </div>
              
              {/* Back button */}
              <motion.button
                className="w-full mt-4 py-3 bg-dark-light/30 border border-primary/20 text-text-secondary 
                         rounded-lg flex items-center justify-center gap-2"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('overview')}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span>Back to Overview</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}