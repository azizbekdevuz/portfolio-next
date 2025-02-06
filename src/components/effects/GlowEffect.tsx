'use client'

import { useEffect, useState } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'

interface Props {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export function GlowEffect({ mouseX, mouseY }: Props) {
  const [mounted, setMounted] = useState(false)
  const size = 400

  const glowX = useTransform(
    mouseX,
    mounted ? [0, document.documentElement.clientWidth] : [0, 1000],
    mounted ? [-size/2, document.documentElement.clientWidth - size/2] : [0, 0]
  )

  const glowY = useTransform(
    mouseY,
    mounted ? [0, document.documentElement.clientHeight] : [0, 1000],
    mounted ? [-size/2, document.documentElement.clientHeight - size/2] : [0, 0]
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      className="pointer-events-none absolute opacity-50"
      style={{
        width: size,
        height: size,
        x: glowX,
        y: glowY,
        opacity: mounted ? 0.5 : 0,
        background: 'radial-gradient(circle, rgba(20,157,221,0.15) 0%, rgba(20,157,221,0) 70%)',
      }}
    />
  )
}