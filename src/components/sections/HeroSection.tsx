'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { useAudio, audioHelpers } from '@/lib/hooks/useAudio'
import { trackingHelpers } from '@/lib/hooks/useAchievements'

const headlineLines = [
  { text: 'CRIAÇÃO DE SITES', color: 'text-neon-cyan' },
  { text: 'PROFISSIONAIS PARA', color: 'text-magenta-power' },
  { text: 'EMPRESAS QUE QUEREM VENDER MAIS', color: 'text-gaming-purple' },
]

const diferenciais = [
  { text: 'Entrega em até 7 dias', color: 'plasma-yellow' },
  { text: 'Atendimento rápido e personalizado', color: 'neon-cyan' },
  { text: 'Suporte 24/7', color: 'plasma-yellow' },
  { text: 'Projetos a partir de R$ 797', color: 'laser-green', pulse: true },
]

export default function HeroSection() {
  const [isBooting, setIsBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [currentBootMessage, setCurrentBootMessage] = useState('')
  const [typedLines, setTypedLines] = useState<string[]>(['', '', ''])
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [typingDone, setTypingDone] = useState(false)

  const { playContextMusic } = useAudio()

  // Typewriter effect
  const startTyping = useCallback(() => {
    let lineIdx = 0
    let charIdx = 0

    const typeChar = () => {
      if (lineIdx >= headlineLines.length) {
        setTypingDone(true)
        return
      }

      const fullText = headlineLines[lineIdx].text
      if (charIdx <= fullText.length) {
        setTypedLines(prev => {
          const updated = [...prev]
          updated[lineIdx] = fullText.slice(0, charIdx)
          return updated
        })
        setCurrentLine(lineIdx)
        charIdx++
        setTimeout(typeChar, 45)
      } else {
        lineIdx++
        charIdx = 0
        setTimeout(typeChar, 300)
      }
    }

    typeChar()
  }, [])

  useEffect(() => {
    if (isBooting) {
      const bootMessages = [
        'INITIALIZING PLAYCODE MATRIX...',
        'LOADING GAMING PROTOCOLS...',
        'ESTABLISHING AI CONNECTION...',
        'CALIBRATING CREATIVE ENGINES...',
        'ACTIVATING DIGITAL UNIVERSE...',
        'SYSTEM READY - WELCOME PLAYER ONE!'
      ]

      const bootSequence = async () => {
        for (let i = 0; i < bootMessages.length; i++) {
          setCurrentBootMessage(bootMessages[i])
          setBootProgress(((i + 1) / bootMessages.length) * 100)
          await new Promise(resolve => setTimeout(resolve, 800))
        }

        setTimeout(() => {
          setIsBooting(false)
          audioHelpers.playBootComplete()
          trackingHelpers.trackPageView('/hero')
          setTimeout(startTyping, 400)
        }, 1000)
      }

      bootSequence()
    }
  }, [isBooting, playContextMusic, startTyping])

  // Blinking cursor
  useEffect(() => {
    if (!isBooting) {
      const interval = setInterval(() => setShowCursor(prev => !prev), 530)
      return () => clearInterval(interval)
    }
  }, [isBooting])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-console">
      {/* Subtle background */}
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-20">
        {/* Boot Sequence Animation */}
        <AnimatePresence>
          {isBooting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="gaming-mono text-terminal-green text-lg mb-8">
                {currentBootMessage}
              </div>

              <div className="hud-bar w-64 sm:w-96 mx-auto mb-4">
                <motion.div
                  className="hud-bar-fill bg-gradient-power"
                  style={{ width: `${bootProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="gaming-mono text-neon-cyan text-sm">
                PROGRESS: {Math.round(bootProgress)}%
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content - appears after boot */}
        <AnimatePresence>
          {!isBooting && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              {/* 1. Headline - Typewriter */}
              <h1 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                <span className="sr-only">PlayCode Agency - Criação de Sites Profissionais em São Bernardo do Campo - </span>
                {headlineLines.map((line, i) => (
                  <span key={i}>
                    <span className={line.color}>
                      {typedLines[i]}
                      {currentLine === i && !typingDone && (
                        <span className={`inline-block w-[3px] h-[0.9em] ml-1 align-middle ${showCursor ? 'bg-current' : 'bg-transparent'}`} />
                      )}
                    </span>
                    {i < headlineLines.length - 1 && <br />}
                  </span>
                ))}
                {typingDone && (
                  <span className={`inline-block w-[3px] h-[0.9em] ml-1 align-middle ${showCursor ? 'bg-gaming-purple' : 'bg-transparent'}`} />
                )}
              </h1>

              {/* 2. Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base sm:text-lg lg:text-xl text-led-white/80 max-w-3xl mx-auto mb-4 leading-relaxed"
              >
                Somos especialistas em desenvolvimento de sites, lojas virtuais e sistemas empresariais sob medida para pequenas e médias empresas em <strong>São Bernardo do Campo</strong> e <strong>Grande São Paulo</strong>.
              </motion.p>

              {/* 3. Benefício forte */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-base sm:text-lg lg:text-xl text-neon-cyan/90 font-semibold max-w-2xl mx-auto mb-8"
              >
                Transformamos sua presença digital em resultados reais.
              </motion.p>

              {/* 4. Diferenciais visuais */}
              <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
                {diferenciais.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={item.pulse
                      ? { opacity: 1, y: 0, boxShadow: ['0 0 8px rgba(0,255,65,0.3)', '0 0 20px rgba(0,255,65,0.7)', '0 0 8px rgba(0,255,65,0.3)'] }
                      : { opacity: 1, y: 0 }
                    }
                    transition={item.pulse
                      ? { opacity: { delay: 0.6 + index * 0.1, duration: 0.5 }, y: { delay: 0.6 + index * 0.1, duration: 0.5 }, boxShadow: { duration: 1.5, repeat: Infinity, delay: 1 } }
                      : { delay: 0.6 + index * 0.1, duration: 0.5 }
                    }
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border border-${item.color}/40 bg-${item.color}/10 backdrop-blur-sm shadow-[0_0_12px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300 ${item.pulse ? 'border-laser-green' : ''}`}
                  >
                    <Check className={`w-5 h-5 text-${item.color} flex-shrink-0`} />
                    <span className={`text-sm sm:text-base font-semibold text-${item.color}`}>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-12 pt-8 border-t border-led-white/10"
              >
                <div className="text-center">
                  <div className="font-orbitron text-3xl font-bold text-laser-green">40+</div>
                  <div className="text-sm text-led-white/60 mt-1">Sites Entregues</div>
                </div>
                <div className="text-center">
                  <div className="font-orbitron text-3xl font-bold text-plasma-yellow">40+</div>
                  <div className="text-sm text-led-white/60 mt-1">Empresas Atendidas</div>
                </div>
                <div className="text-center">
                  <div className="font-orbitron text-3xl font-bold text-magenta-power">10+</div>
                  <div className="text-sm text-led-white/60 mt-1">Anos no Mercado</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
