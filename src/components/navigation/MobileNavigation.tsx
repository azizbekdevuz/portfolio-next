"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  
  // Similar scroll handling as NavigationDots but optimized for mobile
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 50; // Less offset for mobile
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame to optimize scroll performance
        requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    // Add passive flag to improve scroll performance
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial check
    updateActiveSection();
    
    // Cleanup
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  // Function to handle smooth scrolling
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Close the menu
    setIsOpen(false);
    
    // Get the section's top position
    const offset = element.offsetTop;
    
    // Smooth scroll to the section
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };
  
  return (
    <>
      {/* Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-dark-light/80 backdrop-blur-md border border-primary/20"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          className="w-6 h-6 flex flex-col justify-center items-center gap-1.5"
          animate={isOpen ? "open" : "closed"}
        >
          {/* Hamburger icon animation */}
          <motion.span className="w-5 h-0.5 bg-primary block origin-center" 
            variants={{ 
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 2 } 
            }}
          />
          <motion.span className="w-5 h-0.5 bg-primary block origin-center" 
            variants={{ 
              closed: { opacity: 1 },
              open: { opacity: 0 } 
            }}
          />
          <motion.span className="w-5 h-0.5 bg-primary block origin-center" 
            variants={{ 
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -2 } 
            }}
          />
        </motion.div>
      </button>
      
      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-dark-light/95 backdrop-blur-md flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {["hero", "about", "skills", "projects", "contact", "in-progress"].map(section => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className={`text-xl ${activeSection === section ? "text-primary font-bold" : "text-text-light/70"}`}
                  onClick={(e) => scrollToSection(e, section)}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}