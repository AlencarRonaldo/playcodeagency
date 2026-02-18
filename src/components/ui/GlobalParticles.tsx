'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function GlobalParticles() {
  const [particles, setParticles] = useState<Array<{
    left: number
    duration: number
    delay: number
    size: number
    travel: number
  }>>([])

  useEffect(() => {
    const h = window.innerHeight
    const data = Array.from({ length: 25 }).map(() => ({
      left: Math.random() * 100,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
      size: 3 + Math.random() * 6,
      travel: h + 60,
    }))
    setParticles(data)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-neon-cyan"
          style={{
            left: `${p.left}%`,
            bottom: -20,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 10px rgba(0,212,255,0.7), 0 0 20px rgba(0,212,255,0.3)',
          }}
          animate={{
            y: [0, -p.travel],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
