"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LanguageSwitcherInline } from "@/components/i18n/LanguageSwitcher";
import { SectionPrimaryNav } from "@/components/navigation/SectionPrimaryNav";

export function MobileNavigation() {
  const { messages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/90 shadow-sm backdrop-blur-md"
        aria-label={isOpen ? messages.mobileNav.closeMenu : messages.mobileNav.openMenu}
      >
        <motion.div
          className="flex h-6 w-6 flex-col items-center justify-center gap-1.5"
          animate={isOpen ? "open" : "closed"}
        >
          <motion.span
            className="block h-0.5 w-5 origin-center bg-fg"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 2 },
            }}
          />
          <motion.span
            className="block h-0.5 w-5 origin-center bg-fg"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
          />
          <motion.span
            className="block h-0.5 w-5 origin-center bg-fg"
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -2 },
            }}
          />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-page/95 backdrop-blur-md"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex w-full max-w-sm flex-col items-stretch gap-6 px-6">
              <SectionPrimaryNav layout="mobileDrawer" onAfterNavigate={() => setIsOpen(false)} />
              <div className="border-t border-border/60 pt-6">
                <LanguageSwitcherInline />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
