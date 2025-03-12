import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Language {
  code: string;
  name: string;
  level: string;
  proficiency: number;
  domains: string[];
  keywords: string[];
  icon: string;
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    level: "Fluent",
    proficiency: 95,
    domains: ["Technical", "Business", "Academic", "Casual"],
    keywords: ["IELTS 6.5", "Technical Writing", "Public Speaking"],
    icon: "/icons/uk.svg",
  },
  {
    code: "ko",
    name: "Korean",
    level: "Intermediate",
    proficiency: 60,
    domains: ["Academic", "Daily Life", "Basic Business"],
    keywords: ["TOPIK", "University Level", "Conversational"],
    icon: "/icons/kr.svg",
  },
  {
    code: "uz",
    name: "Uzbek",
    level: "Native",
    proficiency: 100,
    domains: ["Native", "Literary", "Technical", "Academic"],
    keywords: ["Mother Tongue", "Technical Translation", "Content Creation"],
    icon: "/icons/uz.svg",
  },
  {
    code: "ru",
    name: "Russian",
    level: "Conversational",
    proficiency: 50,
    domains: ["Business", "Technical", "Academic", "Literature"],
    keywords: ["Business Communication", "Technical Docs", "Literature"],
    icon: "/icons/ru.svg",
  },
];

// Proficiency level classification with consistent color scheme
const getProficiencyColor = (proficiency: number): string => {
  if (proficiency >= 90) return "bg-emerald-500";
  if (proficiency >= 70) return "bg-blue-500";
  if (proficiency >= 50) return "bg-amber-500";
  return "bg-rose-500";
};

const getProficiencyLabel = (proficiency: number): string => {
  if (proficiency >= 90) return "Expert";
  if (proficiency >= 70) return "Advanced";
  if (proficiency >= 50) return "Intermediate";
  return "Beginner";
};

export const LanguageSection: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);

  // More meaningful data visualization based on actual proficiency values
  const getBarHeights = (lang: Language) => {
    // Generate heights based on actual proficiency with some variation
    return Array.from({ length: 10 }, () => {
      const base = lang.proficiency * 0.7;
      const variance = Math.random() * 20 - 10; // +/- 10% variance
      return Math.max(10, Math.min(100, base + variance));
    });
  };

  return (
    <section className="mt-16 py-6">
      {/* Section Title - Simplified and more readable */}
      <motion.div
        className="flex flex-col items-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 font-mono">
          <span className="text-primary/50">interface</span>
          <h3 className="text-2xl font-bold text-text-light">LanguageMatrix</h3>
          <span className="text-primary/50">implements Communication</span>
        </div>
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"
          animate={{
            opacity: [0.5, 1, 0.5],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Language Grid - Better spacing and consistent sizing */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.code}
            className="h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className="h-full flex flex-col p-6 rounded-lg border border-primary/20 
                        bg-dark-light/50 transition-all duration-300"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                borderColor: "rgba(20, 157, 221, 0.4)",
              }}
              onHoverStart={() => setActiveLanguage(lang.code)}
              onHoverEnd={() => setActiveLanguage(null)}
            >
              {/* Header with flag and language name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src={lang.icon}
                    alt={`${lang.name} flag`}
                    fill
                    className="object-contain rounded-sm"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-light">
                    {lang.name}
                  </h3>
                  <div className="text-sm text-primary/90">{lang.level}</div>
                </div>
              </div>

              {/* Proficiency Bar - More accessible with label */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-text-secondary mb-1">
                  <span>Proficiency</span>
                  <span>{lang.proficiency}%</span>
                </div>
                <div className="h-2 bg-dark-light/60 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${getProficiencyColor(lang.proficiency)}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </div>

              {/* Domains - Always visible for better accessibility */}
              <div className="flex flex-wrap gap-1 mb-4">
                {lang.domains.slice(0, 3).map((domain) => (
                  <span
                    key={domain}
                    className="px-2 py-0.5 text-xs rounded-full 
                            bg-primary/10 text-primary"
                  >
                    {domain}
                  </span>
                ))}
                {lang.domains.length > 3 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-primary/5 text-primary">
                    +{lang.domains.length - 3}
                  </span>
                )}
              </div>

              {/* Bottom section */}
              <div className="mt-auto">
                {/* Expandable Details */}
                <AnimatePresence>
                  {activeLanguage === lang.code && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm text-text-light/90 mb-4 overflow-hidden"
                    >
                      <h4 className="font-medium mb-2">Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {lang.keywords.map((keyword) => (
                          <span key={keyword} className="text-text-secondary">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Proficiency Level Indicator */}
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-1 rounded-full ${activeLanguage === lang.code ? "bg-primary/20 text-primary" : "bg-dark-light/80 text-text-secondary"}`}
                  >
                    {getProficiencyLabel(lang.proficiency)}
                  </span>

                  {/* Simplified visualization - more meaningful and accessible */}
                  <div className="flex items-end h-6 gap-0.5">
                    {getBarHeights(lang).map((height, i) => (
                      <motion.div
                        key={i}
                        className={`w-1 rounded-t ${getProficiencyColor(lang.proficiency)} opacity-50`}
                        initial={{ height: "20%" }}
                        animate={{
                          height:
                            activeLanguage === lang.code
                              ? `${height * 0.4}%`
                              : "20%",
                        }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
