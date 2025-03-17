import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

// Simplified animation for mobile performance
const AnimatedSuggestion = memo(function AnimatedSuggestion({ 
  suggestion, 
  isActive = false
}: { 
  suggestion: string; 
  isActive?: boolean;
}) {
  return (
    <motion.div
      className={`rounded px-2 py-0.5 text-xs border shadow-sm
                ${isActive 
                  ? "bg-primary/20 text-text-light border-primary/30" 
                  : "bg-primary/10 text-text-secondary/80 border-primary/20"}`}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
    >
      {suggestion}
    </motion.div>
  );
});

export function MobileIDETagline() {
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  
  // Simplified suggestions for mobile
  const suggestions = [
    "experiences",
    "solutions",
    "interfaces",
    "products",
  ];
  
  // Show autocomplete with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAutocomplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Cycle through suggestions with longer interval for performance
  useEffect(() => {
    if (!showAutocomplete) return;

    const interval = setInterval(() => {
      setSuggestionIndex(prev => (prev + 1) % suggestions.length);
    }, 4000); // Longer interval for mobile

    return () => clearInterval(interval);
  }, [showAutocomplete, suggestions.length]);

  return (
    <motion.div
      className="relative font-mono text-sm bg-dark-light/20 rounded-lg p-3 border border-primary/20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Single line for mobile */}
      <div className="flex items-start flex-wrap">
        <motion.span
          className="text-primary/70 mr-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          &gt;
        </motion.span>
        
        <div className="flex items-center flex-wrap">
          <TypeAnimation
            sequence={["Building digital", 500]}
            wrapper="span"
            cursor={false}
            speed={50 as const}
            className="text-text-light"
          />
          
          {/* Blinking cursor */}
          <motion.span 
            className="inline-block w-1.5 h-3 bg-primary/70 ml-1 rounded-sm"
            animate={{ 
              opacity: [1, 0.4, 1],
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* Autocomplete suggestion - Only one at a time for mobile */}
      <AnimatePresence mode="wait">
        {showAutocomplete && (
          <motion.div
            key={`suggestion-${suggestionIndex}`}
            className="mt-2 ml-3 flex items-center"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-primary text-xs mr-2">└─</span>
            <AnimatedSuggestion 
              suggestion={suggestions[suggestionIndex]} 
              isActive={true}
            />
            <motion.span 
              className="text-primary ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              ✓
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}