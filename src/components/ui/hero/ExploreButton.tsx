import { memo } from "react";
import { motion } from "framer-motion";

const ExploreButton = memo(function ExploreButton() {
    const handleClick = () => {
      const projectsSection = document.getElementById("projects");
      if (!projectsSection) return;
  
      window.scrollTo({
        top: projectsSection.offsetTop,
        behavior: "smooth",
      });
    };
  
    return (
      <motion.button
        onClick={handleClick}
        className="group relative px-6 py-2.5 overflow-hidden rounded-full
                  bg-transparent border border-primary text-primary
                  transition-all duration-300"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px rgba(20, 157, 221, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span
          className="relative z-10 transition-colors duration-300 
                      group-hover:text-text-light"
        >
          Explore My Work
        </span>
        <motion.div
          className="absolute inset-0 bg-primary"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
        />
      </motion.button>
    );
  });

export default ExploreButton;