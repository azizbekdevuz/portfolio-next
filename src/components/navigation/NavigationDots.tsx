"use client";

import { motion } from "framer-motion";
import { useEffect, memo, useState } from "react";

export const NavigationDots = memo(function NavigationDots() {
  const [activeSection, setActiveSection] = useState("hero");

  // Improved scroll handler with throttling
  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
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
        requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll handler
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = element.offsetTop;
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      {["hero", "about", "projects"].map((section) => (
        <motion.a
          key={section}
          href={`#${section}`}
          onClick={(e) => handleClick(e, section)}
          className={`w-3 h-3 rounded-full transition-all duration-200 ${
            activeSection === section
              ? "bg-primary scale-125"
              : "bg-white/20 hover:bg-white/40"
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
    </motion.div>
  );
});
