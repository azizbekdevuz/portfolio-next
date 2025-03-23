"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Sample testimonial data
const TESTIMONIALS = [
  // Development testimonials
  {
    id: 1,
    name: "Alex Johnson",
    role: "CTO",
    company: "TechMatrix",
    text: "The React components and architecture in this project were exceptionally well-structured. Performance optimizations resulted in a 40% faster load time.",
    category: "development",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Lead Developer",
    company: "CodeCraft",
    text: "Your Next.js implementation set a new standard for our team. The state management and API integration was flawless.",
    category: "development",
    rating: 5,
  },
  // Design testimonials
  {
    id: 3,
    name: "Michael Park",
    role: "UI/UX Director",
    company: "DesignWave",
    text: "The animations and micro-interactions brought our brand to life. Users specifically mentioned how intuitive the interface feels.",
    category: "design",
    rating: 5,
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Creative Director",
    company: "Visionary Studios",
    text: "Remarkable attention to visual details while maintaining accessibility standards. The dark mode implementation was especially impressive.",
    category: "design",
    rating: 5,
  },
  // General testimonials
  {
    id: 5,
    name: "Daniel Kim",
    role: "Product Manager",
    company: "InnovateX",
    text: "Working with you was a true highlight. You understood our requirements instantly and delivered beyond expectations, on time and with exceptional quality.",
    category: "general",
    rating: 5,
  },
  {
    id: 6,
    name: "Lisa Wei",
    role: "Startup Founder",
    company: "NextGen Solutions",
    text: "From concept to deployment, the entire process was smooth and professional. Our conversion rates increased by 35% after launch.",
    category: "general",
    rating: 5,
  },
];

interface FloatingTestimonialsProps {
  isMobile: boolean;
  children?: React.ReactNode;
}

export default function FloatingTestimonials({ isMobile, children }: FloatingTestimonialsProps) {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [currentCorner, setCurrentCorner] = useState<"bottomRight" | "bottomLeft" | "topRight" | "topLeft">("bottomRight");
  const [filter, setFilter] = useState<"all" | "development" | "design" | "general">("all");
  const [animationType, setAnimationType] = useState<"glitch" | "float" | "scan">("float");
  const [hoverState, setHoverState] = useState(false);
  const cornerTimer = useRef<NodeJS.Timeout | null>(null);
  const animationTimer = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(false);

  // Filtered testimonials
  const filteredTestimonials = TESTIMONIALS.filter(
    (t) => filter === "all" || t.category === filter
  );

  // Position mapping
  const cornerPositions = {
    bottomRight: "bottom-4 right-4",
    bottomLeft: "bottom-4 left-4", 
    topRight: "top-4 right-4",
    topLeft: "top-4 left-4"
  };

  // Handle corner rotation - Only when component is mounted and not open
  useEffect(() => {
    isMounted.current = true;
    
    const rotateCorner = () => {
      if (!isMounted.current || isOpen) return;
      
      // Only change corner when not open
      const corners: Array<"bottomRight" | "bottomLeft" | "topRight" | "topLeft"> = [
        "bottomRight", "bottomLeft", "topRight", "topLeft"
      ];
      
      // Get next corner
      const currentIndex = corners.indexOf(currentCorner);
      const nextIndex = (currentIndex + 1) % corners.length;
      setCurrentCorner(corners[nextIndex]);
      
      // Also change animation type
      const animations: Array<"glitch" | "float" | "scan"> = ["glitch", "float", "scan"];
      const randomIndex = Math.floor(Math.random() * animations.length);
      setAnimationType(animations[randomIndex]);
    };
    
    // Set timer for corner rotation
    cornerTimer.current = setTimeout(rotateCorner, 10000 + Math.random() * 5000);
    
    // Cleanup
    return () => {
      if (cornerTimer.current) {
        clearTimeout(cornerTimer.current);
      }
    };
  }, [currentCorner, isOpen]);
  
  useEffect(() => {
    const timerRef = animationTimer.current;
  
    return () => {
      if (timerRef) clearTimeout(timerRef);
    };
  }, []);
  
  
  const handleFilterChange = (newFilter: "all" | "development" | "design" | "general") => {
    setFilter(newFilter);
  };
  
  // Get transition animation based on current corner
  const getTransitionAnimation = () => {
    switch (currentCorner) {
      case "bottomRight":
        return { x: [50, 0], y: [50, 0], opacity: [0, 1] };
      case "bottomLeft":
        return { x: [-50, 0], y: [50, 0], opacity: [0, 1] };
      case "topRight":
        return { x: [50, 0], y: [-50, 0], opacity: [0, 1] };
      case "topLeft":
        return { x: [-50, 0], y: [-50, 0], opacity: [0, 1] };
    }
  };

  return (
    <div className="fixed z-[9999] pointer-events-none">
      {/* This renders any children passed to the component, like the cursor */}
      {children}
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          // Floating button state
          <motion.div
            key="floating-button"
            className={`pointer-events-auto fixed ${cornerPositions[currentCorner]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              scale: 1,
              ...getTransitionAnimation()
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              type: "spring",
              damping: 20,
              stiffness: 300
            }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
          >
            <motion.div
              className="relative w-12 h-12 md:w-14 md:h-14 rounded-full 
                       bg-dark-light border border-primary/30 backdrop-blur-md
                       cursor-pointer overflow-hidden flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated Star */}
              <div className={`text-primary text-xl ${
                animationType === "float" ? "animate-float" : 
                animationType === "glitch" ? "animate-glitch" : 
                "animate-scan"
              }`}>
                ★
              </div>
              
              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0, 0.7]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-primary/10"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
            
            {/* Count Badge */}
            <motion.div
              className="absolute -top-1 -right-1 bg-primary text-dark-light text-xs 
                       rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: hoverState ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {TESTIMONIALS.length}
            </motion.div>
          </motion.div>
        ) : (
          // Open panel state 
          <motion.div
            key="open-panel"
            className={`
              pointer-events-auto fixed ${cornerPositions[currentCorner]}
              ${isMobile ? 'w-[calc(100vw-32px)]' : 'w-96'} 
              max-h-[80vh] bg-dark-light/95 backdrop-blur-md rounded-lg
              border border-primary/30 overflow-hidden shadow-lg
            `}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-primary/20 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-text-light">Client Testimonials</h3>
                <div className="text-text-secondary text-xs flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1"></span>
                  <span>{filteredTestimonials.length} reviews</span>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-text-light transition-colors 
                         p-1 rounded-full bg-dark/40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex border-b border-primary/20 bg-dark/30">
              {(["all", "development", "design", "general"] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`
                    py-2 px-3 text-sm transition-colors relative
                    ${filter === category 
                      ? 'text-primary' 
                      : 'text-text-secondary hover:text-text-light'}
                  `}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {filter === category && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="filterIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            {/* Testimonials List */}
            <div className="overflow-y-auto p-3 max-h-[60vh]">
              <AnimatePresence>
                {filteredTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="bg-dark/70 border border-primary/10 rounded-lg p-4
                             hover:border-primary/30 transition-colors mb-3"
                  >
                    <div className="relative mb-3">
                      <div className="text-text-secondary text-sm italic">
                        &quot;{testimonial.text}&quot;
                      </div>
                      
                      {/* Subtle tech line at bottom of quote */}
                      <div className="absolute -bottom-2 left-0 right-0 h-px 
                                    bg-gradient-to-r from-transparent via-primary/30 to-transparent" 
                           style={{
                             animation: "tech-line-flow 3s linear infinite"
                           }}
                      />
                    </div>
                    
                    <div className="flex items-center mt-4">
                      {/* Avatar Circle */}
                      <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden 
                                    border border-primary/20 bg-primary/20 
                                    flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                        
                        {/* Subtle glow effect */}
                        <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl opacity-30"
                             style={{
                               animation: "profile-glow 4s ease-in-out infinite"
                             }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="text-text-light font-medium text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-primary text-xs">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                      
                      {/* Rating Stars */}
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-xs ${
                              i < testimonial.rating 
                                ? 'text-primary' 
                                : 'text-gray-600'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}