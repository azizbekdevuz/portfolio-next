import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export function IDETagline() {
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const codeLines = [
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
        "solutions for modern web challenges",
        "innovations in digital interfaces",
        "transformative tech strategies",
      ],
      completion: "✓",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAutocomplete(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <motion.div
      className="relative font-mono text-lg mb-6 bg-dark-light/20 rounded-lg p-4 border border-primary/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
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
        <TypeAnimation
          sequence={["Building digital", 500]}
          wrapper="span"
          cursor={false}
          speed={50}
          className="text-text-light"
        />

        {/* Autocomplete Suggestions */}
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
              {codeLines[0].suggestions.slice(0, 2).map((suggestion, index) => (
                <motion.div
                  key={`suggestion-${index}`}
                  className="bg-primary/10 rounded px-2 py-0.5 text-sm text-text-secondary/80 
                              border border-primary/20 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {suggestion}
                </motion.div>
              ))}
              <motion.div
                className="bg-primary/10 rounded px-2 py-0.5 text-sm text-text-secondary/80 
                            border border-primary/20 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                {codeLines[0].completion}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Second line */}
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
              speed={50}
              className="text-text-secondary"
            />

            {/* Autocomplete Suggestions */}
            <motion.div
              className="ml-2 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              {codeLines[1].suggestions.slice(0, 1).map((suggestion, index) => (
                <motion.div
                  key={`suggestion-${index}`}
                  className="bg-primary/10 rounded px-2 py-0.5 text-sm text-text-secondary/80 
                              border border-primary/20 shadow-sm"
                >
                  web technologies
                </motion.div>
              ))}
              <span className="text-primary">✓</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
