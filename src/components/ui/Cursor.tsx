'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        (target.onclick !== null)
      )
    }

    const handleMouseLeave = () => {
      // Optional: Hide custom cursor when mouse leaves the window
      setPosition({ x: -100, y: -100 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.body.style.cursor = '' // Restore default cursor on unmount
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isPointer ? 1.5 : 1,
          opacity: position.x < 0 ? 0 : 1 // Hide when mouse leaves window
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 800,
          damping: 30
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.2 : 1,
          opacity: position.x < 0 ? 0 : 1 // Hide when mouse leaves window
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 400,
          damping: 20
        }}
      />
    </>
  )
}