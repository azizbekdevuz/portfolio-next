import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

type CodeLine = {
  prefix: string;
  suggestions: string[];
  completion: string;
};

interface IDETaglineProps {
  lines?: CodeLine[];
  delay?: number;
  className?: string;
  cycleInterval?: number;
}

// Separate animated suggestion component for better performance
const AnimatedSuggestion = memo(function AnimatedSuggestion({ 
  suggestion, 
  isActive = false
}: { 
  suggestion: string; 
  isActive?: boolean;
}) {
  return (
    <motion.div
      className={`rounded px-2 py-0.5 text-sm border shadow-sm
                ${isActive 
                  ? "bg-primary/20 text-text-light border-primary/30" 
                  : "bg-primary/10 text-text-secondary/80 border-primary/20"}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [5, 0]
      }}
      exit={{ opacity: 0, scale: 0.9, y: 5 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {suggestion}
    </motion.div>
  );
});

// Second line with cycling suggestions
const SecondLine = memo(function SecondLine({ 
  showAutocomplete, 
  codeLine,
  activeSuggestionIndex
}: { 
  showAutocomplete: boolean; 
  codeLine: CodeLine;
  activeSuggestionIndex: number;
}) {
  const autocompleteVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Get the current active suggestion text to display
  const activeSuggestion = codeLine.suggestions[activeSuggestionIndex % codeLine.suggestions.length];
  const displayedSuggestion = activeSuggestion?.split(' ').slice(-2).join(' ') || '';

  return (
    <AnimatePresence>
      {showAutocomplete && (
        <motion.div
          key="second-line"
          className="ml-6 flex items-center gap-2 whitespace-nowrap"
          variants={autocompleteVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <span className="text-primary">└─</span>
          <TypeAnimation
            sequence={["experiences with web technologies", 500]}
            wrapper="span"
            cursor={false}
            speed={50 as const}
            className="text-text-secondary"
          />

          {/* Autocomplete Suggestions */}
          <motion.div
            className="ml-2 flex items-center gap-2"
          >
            <AnimatePresence mode="wait">
              <AnimatedSuggestion 
                key={`second-suggestion-${activeSuggestionIndex}`} 
                suggestion={displayedSuggestion} 
                isActive={true}
              />
            </AnimatePresence>
            <motion.span 
              className="text-primary"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              ✓
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export function IDETagline({ 
  lines,
  delay = 1500, 
  className = "",
  cycleInterval = 3000
}: IDETaglineProps) {
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [firstLineSuggestionIndex, setFirstLineSuggestionIndex] = useState(0);
  const [secondLineSuggestionIndex, setSecondLineSuggestionIndex] = useState(0);

  // Default code lines if none provided
  const codeLines = useMemo(() => lines || [
    {
      prefix: "> Building digital",
      suggestions: [
        "experiences",
        "solutions",
        "innovations",
        "transformations",
      ],
      completion: "[...]",
    },
    {
      prefix: "└─ ",
      suggestions: [
        "experiences with web technologies",
        "modern web challenges",
        "digital interfaces",
        "tech strategies",
      ],
      completion: "✓",
    },
  ], [lines]);

  // Show autocomplete with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAutocomplete(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Cycle through first line suggestions
  useEffect(() => {
    if (!showAutocomplete) return;

    const interval = setInterval(() => {
      setFirstLineSuggestionIndex(prev => 
        (prev + 1) % codeLines[0].suggestions.length
      );
    }, cycleInterval);

    return () => clearInterval(interval);
  }, [showAutocomplete, codeLines, cycleInterval]);

  // Cycle through second line suggestions with a different offset
  useEffect(() => {
    if (!showAutocomplete) return;

    const interval = setInterval(() => {
      setSecondLineSuggestionIndex(prev => 
        (prev + 1) % codeLines[1].suggestions.length
      );
    }, cycleInterval * 1.5); // Slightly different timing for variation

    return () => clearInterval(interval);
  }, [showAutocomplete, codeLines, cycleInterval]);

  // Memoize animation variants to prevent unnecessary re-renders
  const autocompleteVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  }), []);

  return (
    <motion.div
      className={`relative font-mono text-lg mb-6 bg-dark-light/20 rounded-lg p-4 border border-primary/20 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 0 15px rgba(20, 157, 221, 0.1)"
      }}
      layout
    >
      {/* First line */}
      <div className="flex items-start gap-2">
        <motion.span
          className="text-primary/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          &gt;
        </motion.span>
        <div className="flex items-center">
          <TypeAnimation
            sequence={["Building digital", 500]}
            wrapper="span"
            cursor={false}
            speed={50 as const}
            className="text-text-light"
          />
          <motion.span 
            className="inline-block w-2 h-4 bg-primary/70 ml-1 rounded-sm"
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

        {/* Autocomplete Suggestions - Cycling through options */}
        <AnimatePresence>
          {showAutocomplete && (
            <motion.div
              key="autocomplete-1"
              className="ml-2 flex items-center gap-2"
              variants={autocompleteVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AnimatePresence mode="wait">
                <AnimatedSuggestion 
                  key={`first-suggestion-${firstLineSuggestionIndex}`}
                  suggestion={codeLines[0].suggestions[firstLineSuggestionIndex]} 
                  isActive={true}
                />
              </AnimatePresence>
              <AnimatedSuggestion suggestion={codeLines[0].completion} isActive={false} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Second line - extracted to a separate component */}
      <SecondLine 
        showAutocomplete={showAutocomplete} 
        codeLine={codeLines[1]}
        activeSuggestionIndex={secondLineSuggestionIndex}
      />
    </motion.div>
  );
}