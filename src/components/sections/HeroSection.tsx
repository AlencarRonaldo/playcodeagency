'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { useAudio, audioHelpers } from '@/lib/hooks/useAudio'
import { trackingHelpers } from '@/lib/hooks/useAchievements'

const diferenciais = [
  { text: 'Entrega em até 7 dias', color: 'laser-green' },
  { text: 'Suporte 24/7', color: 'neon-cyan' },
  { text: 'Preços a partir de R$ 797', color: 'plasma-yellow' },
  { text: 'Soluções personalizadas para PMEs', color: 'magenta-power' },
]

export default function HeroSection() {
  const [isBooting, setIsBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [currentBootMessage, setCurrentBootMessage] = useState('')

  const { playContextMusic } = useAudio()

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
        }, 1000)
      }

      bootSequence()
    }
  }, [isBooting, playContextMusic])

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
              {/* 1. Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-orbitron text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="sr-only">PlayCode Agency - Empresa de Criação de Sites Profissionais no Brasil - </span>
                <span className="text-neon-cyan">CRIAÇÃO DE SITES</span>
                <br />
                <span className="text-magenta-power">PROFISSIONAIS PARA</span>
                <br />
                <span className="text-gaming-purple">EMPRESAS QUE VENDEM</span>
              </motion.h1>

              {/* 2. Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base sm:text-lg lg:text-xl text-led-white/80 max-w-3xl mx-auto mb-4 leading-relaxed"
              >
                Desenvolvemos sites, lojas virtuais e sistemas empresariais sob medida com CRM, relatórios, controle de estoque, cadastros e chatbots com IA para WhatsApp.
              </motion.p>

              {/* 3. Frase de Beneficio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-base sm:text-lg lg:text-xl text-neon-cyan/90 font-semibold max-w-2xl mx-auto mb-8"
              >
                Automatize processos, organize sua empresa e transforme visitantes em clientes todos os dias.
              </motion.p>

              {/* 4. Diferenciais visuais */}
              <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
                {diferenciais.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border border-${item.color}/40 bg-${item.color}/10 backdrop-blur-sm shadow-[0_0_12px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300`}
                  >
                    <Check className={`w-5 h-5 text-${item.color} flex-shrink-0`} />
                    <span className={`text-sm sm:text-base font-semibold text-${item.color}`}>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* 5. CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  href="/contato"
                  onClick={() => {
                    audioHelpers.playClick(true)
                    trackingHelpers.trackClick('hero_orcamento')
                  }}
                  onMouseEnter={() => audioHelpers.playHover()}
                  className="gaming-button text-lg px-8 py-4 text-center animate-urgent-glow hover:animate-cta-pulse focus:animate-cta-pulse"
                >
                  <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">SOLICITAR ORÇAMENTO GRÁTIS</span>
                </Link>

                <a
                  href="https://wa.me/5511956534963?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20PlayCode%20Agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    audioHelpers.playClick(false)
                    trackingHelpers.trackClick('hero_whatsapp')
                  }}
                  onMouseEnter={() => audioHelpers.playHover()}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg border-2 border-laser-green text-laser-green hover:bg-laser-green hover:text-controller-black transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  FALAR NO WHATSAPP
                </a>
              </motion.div>

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
