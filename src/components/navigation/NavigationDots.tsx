'use client'

import { motion, useScroll } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'

const sections = ['hero', 'about', 'skills', 'projects', 'contact']

export function NavigationDots() {
  const { scrollYProgress } = useScroll()
  const activeSection = useActiveSection()

  return (
    <motion.div 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50
                 flex flex-col gap-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {sections.map((section) => (
        <motion.a
          key={section}
          href={`#${section}`}
          className={`w-3 h-3 rounded-full transition-colors duration-200
                     ${activeSection === section 
                       ? 'bg-primary' 
                       : 'bg-white/20 hover:bg-white/40'}`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
      
      {/* Scroll progress line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-white/20"
        style={{
          scaleY: scrollYProgress,
          transformOrigin: 'top'
        }}
      />
    </motion.div>
  )
}