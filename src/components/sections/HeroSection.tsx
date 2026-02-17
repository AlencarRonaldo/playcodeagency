'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio, audioHelpers } from '@/lib/hooks/useAudio'
import { useAchievements, trackingHelpers } from '@/lib/hooks/useAchievements'

interface HUDStats {
  hp: number
  xp: number
  level: number
  achievements: number
}

export default function HeroSection() {
  const [isBooting, setIsBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [currentBootMessage, setCurrentBootMessage] = useState('')
  const [hudStats, setHudStats] = useState<HUDStats>({
    hp: 0,
    xp: 0,
    level: 1,
    achievements: 0
  })
  const [matrixRainData] = useState<Array<{delay: number, fontSize: number, char: string}>>([])
  const [particlesData, setParticlesData] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([])

  const { playContextMusic } = useAudio()
  const { } = useAchievements()

  // Generate matrix rain data on client side only
  useEffect(() => {
    // Generate particles data
    const particles = Array.from({ length: 10 }).map(() => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 5
    }))
    setParticlesData(particles)
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
        
        // Boot complete - start HUD animation
        setTimeout(() => {
          setIsBooting(false)
          animateHUDStats()
          
          // Play boot complete sound (music now handled by MarioAutoPlay component)
          audioHelpers.playBootComplete()
          // Music is now controlled by the MarioAutoPlay component
        }, 1000)
      }
      
      bootSequence()
    }
  }, [isBooting, playContextMusic])

  const animateHUDStats = () => {
    // Animate HP bar
    let currentHp = 0
    const hpInterval = setInterval(() => {
      currentHp += 2
      setHudStats(prev => ({ ...prev, hp: Math.min(currentHp, 95) }))
      if (currentHp >= 95) clearInterval(hpInterval)
    }, 50)

    // Animate XP bar with delay
    setTimeout(() => {
      let currentXp = 0
      const xpInterval = setInterval(() => {
        currentXp += 3
        setHudStats(prev => ({ ...prev, xp: Math.min(currentXp, 78) }))
        if (currentXp >= 78) clearInterval(xpInterval)
      }, 40)
    }, 500)

    // Animate level and achievements
    setTimeout(() => {
      setHudStats(prev => ({ ...prev, level: 42, achievements: 12 }))
      audioHelpers.playLevelUp()
      
      // Track page view for achievements
      trackingHelpers.trackPageView('/hero')
    }, 1200)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-console">

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Boot Sequence */}
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
              
              {/* Boot Progress Bar */}
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

        {/* Main Hero Content */}
        <AnimatePresence>
          {!isBooting && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-8 items-center"
            >
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="gaming-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 neon-glow text-neon-cyan"
                >
                  <span className="sr-only">PlayCode Agency - Empresa de Criação de Sites Profissionais no Brasil - </span>
                  CRIAÇÃO DE SITES
                  <br />
                  <span className="text-magenta-power">PROFISSIONAIS PARA</span>
                  <br />
                  <span className="text-gaming-purple">EMPRESAS QUE VENDEM</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="gaming-subtitle text-base sm:text-xl lg:text-2xl mb-8 text-led-white/80 max-w-xl mx-auto lg:mx-0"
                >
                  Desenvolvemos <strong>sites profissionais</strong>, <strong>chatbots WhatsApp com inteligência artificial</strong>, <strong>lojas virtuais</strong> e <strong>automações</strong> que transformam visitantes em clientes. Entrega em até <strong>7 dias</strong>, suporte 24/7 e preços a partir de <strong>R$ 797</strong>.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <button 
                    className="gaming-button text-lg px-8 py-4 animate-urgent-glow hover:animate-cta-pulse focus:animate-cta-pulse"
                    onMouseEnter={() => audioHelpers.playHover()}
                    onClick={() => {
                      audioHelpers.playClick(true)
                      trackingHelpers.trackClick('hero_start_mission')
                      // Navigate to contact or services page
                      window.location.href = '/contato'
                    }}
                  >
                    <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">SOLICITAR ORÇAMENTO GRÁTIS</span>
                  </button>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 mt-8"
                >
                  <div className="text-center">
                    <div className="gaming-display text-2xl font-bold text-laser-green">40+</div>
                    <div className="gaming-mono text-sm text-led-white/60">SITES ENTREGUES</div>
                  </div>
                  <div className="text-center">
                    <div className="gaming-display text-2xl font-bold text-plasma-yellow">40+</div>
                    <div className="gaming-mono text-sm text-led-white/60">EMPRESAS ATENDIDAS</div>
                  </div>
                  <div className="text-center">
                    <div className="gaming-display text-2xl font-bold text-magenta-power">10+</div>
                    <div className="gaming-mono text-sm text-led-white/60">ANOS NO MERCADO</div>
                  </div>
                </motion.div>
              </div>

              {/* Right HUD Interface */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative"
              >
                {/* HUD Container */}
                <div className="gaming-card p-3 sm:p-5 relative">
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex justify-between items-center mb-6">
                      <div className="gaming-mono text-neon-cyan text-sm">
                        POR QUE ESCOLHER A PLAYCODE
                      </div>
                      <div className="gaming-mono text-laser-green text-sm">
                        RESULTADOS COMPROVADOS
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 space-y-6">
                    {/* Competitive Advantages Display */}
                    <div className="flex justify-center mb-6">
                      <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        {/* Advantage 1 - Speed & Delivery */}
                        <motion.div
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                          className="relative text-center p-4 gaming-card border-2 border-laser-green bg-laser-green/10 "
                        >
                          {/* Speed Icon Frame */}
                          <div className="w-16 h-20 relative mx-auto mb-3 bg-gradient-to-b from-laser-green/20 to-green-400/20 rounded-lg border-2 border-laser-green flex items-center justify-center">
                            {/* Simple Lightning Icon */}
                            <div className="text-3xl">⚡</div>
                          </div>
                          
                          {/* Advantage Info */}
                          <div className="gaming-mono text-xs text-laser-green font-bold">ENTREGA RÁPIDA</div>
                          <div className="gaming-mono text-xs text-led-white/50">Seu site no ar em dias</div>

                          {/* Key Metrics */}
                          <div className="text-xs text-laser-green mt-1">Sites em 7 dias</div>
                          <div className="text-xs text-laser-green">Sistemas em 2-4 sem.</div>
                          
                          {/* Trust Indicators */}
                          <div className="flex justify-center mt-2 space-x-1">
                            <div className="w-2 h-2 bg-laser-green rounded-full"></div>
                            <div className="w-2 h-2 bg-laser-green rounded-full"></div>
                            <div className="w-2 h-2 bg-laser-green rounded-full"></div>
                          </div>
                          
                          {/* Speed Glow */}
                          <motion.div
                            animate={{ 
                              boxShadow: [
                                '0 0 8px rgba(0,255,127,0.3)',
                                '0 0 16px rgba(0,255,127,0.6)',
                                '0 0 8px rgba(0,255,127,0.3)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-lg pointer-events-none"
                          />
                        </motion.div>

                        {/* Advantage 2 - Quality & Reliability */}
                        <motion.div
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                          className="relative text-center p-4 gaming-card border-2 border-electric-blue bg-electric-blue/10 "
                        >
                          {/* Quality Shield Frame */}
                          <div className="w-16 h-20 relative mx-auto mb-3 bg-gradient-to-b from-electric-blue/20 to-neon-cyan/20 rounded-lg border-2 border-electric-blue flex items-center justify-center">
                            {/* Simple Shield Icon */}
                            <div className="text-3xl">🛡️</div>
                          </div>
                          
                          {/* Advantage Info */}
                          <div className="gaming-mono text-xs text-electric-blue font-bold">SITES RESPONSIVOS</div>
                          <div className="gaming-mono text-xs text-led-white/50">Perfeito em qualquer tela</div>

                          {/* Key Metrics */}
                          <div className="text-xs text-electric-blue mt-1">Mobile, Tablet e PC</div>
                          <div className="text-xs text-electric-blue">SEO otimizado</div>
                          
                          {/* Trust Indicators */}
                          <div className="flex justify-center mt-2 space-x-1">
                            <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                            <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                            <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
                          </div>
                          
                          {/* Quality Glow */}
                          <motion.div
                            animate={{ 
                              boxShadow: [
                                '0 0 8px rgba(0,212,255,0.3)',
                                '0 0 16px rgba(0,212,255,0.6)',
                                '0 0 8px rgba(0,212,255,0.3)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-lg pointer-events-none"
                          />
                        </motion.div>

                        {/* Advantage 3 - Experience & Innovation */}
                        <motion.div
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
                          className="relative text-center p-4 gaming-card border-2 border-gaming-purple bg-gaming-purple/10 "
                        >
                          <div className="w-16 h-20 relative mx-auto mb-3 bg-gradient-to-b from-gaming-purple/20 to-magenta-power/20 rounded-lg border-2 border-gaming-purple flex items-center justify-center">
                            {/* Simple Brain/Innovation Icon */}
                            <div className="text-3xl">🧠</div>
                          </div>
                          
                          {/* Advantage Info */}
                          <div className="gaming-mono text-xs text-gaming-purple font-bold">EXPERIÊNCIA</div>
                          <div className="gaming-mono text-xs text-led-white/50">10+ anos no mercado</div>

                          {/* Key Metrics */}
                          <div className="text-xs text-gaming-purple mt-1">40+ projetos entregues</div>
                          <div className="text-xs text-gaming-purple">Clientes satisfeitos</div>
                          
                          <div className="flex justify-center mt-2 space-x-1">
                            <div className="w-2 h-2 bg-gaming-purple rounded-full"></div>
                            <div className="w-2 h-2 bg-gaming-purple rounded-full"></div>
                            <div className="w-2 h-2 bg-gaming-purple rounded-full"></div>
                          </div>
                          
                          {/* Innovation Glow */}
                          <motion.div
                            animate={{ 
                              boxShadow: [
                                '0 0 12px rgba(139,92,246,0.4)',
                                '0 0 24px rgba(139,92,246,0.7)',
                                '0 0 12px rgba(139,92,246,0.4)'
                              ]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 rounded-lg pointer-events-none"
                          />
                        </motion.div>

                        {/* Advantage 4 - Results & ROI */}
                        <motion.div
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
                          className="relative text-center p-4 gaming-card border-2 border-plasma-yellow bg-plasma-yellow/10 "
                        >
                          <div className="w-16 h-20 relative mx-auto mb-3 bg-gradient-to-b from-plasma-yellow/20 to-yellow-300/20 rounded-lg border-2 border-plasma-yellow flex items-center justify-center">
                            {/* Simple Trophy Icon */}
                            <div className="text-3xl">🏆</div>
                          </div>
                          
                          {/* Advantage Info */}
                          <div className="gaming-mono text-xs text-plasma-yellow font-bold">MAIS VENDAS</div>
                          <div className="gaming-mono text-xs text-led-white/50">Resultados mensuráveis</div>

                          {/* Key Metrics */}
                          <div className="text-xs text-plasma-yellow mt-1">+150% em leads</div>
                          <div className="text-xs text-plasma-yellow">ROI comprovado</div>
                          
                          {/* Success Indicators */}
                          <div className="flex justify-center mt-2 space-x-1">
                            <div className="w-2 h-2 bg-plasma-yellow rounded-full"></div>
                            <div className="w-2 h-2 bg-plasma-yellow rounded-full"></div>
                            <div className="w-2 h-2 bg-plasma-yellow rounded-full"></div>
                          </div>
                          
                          {/* Success Crown */}
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gradient-to-r from-plasma-yellow to-yellow-300 rounded-t-lg border border-plasma-yellow flex items-center justify-center">
                            <span className="text-xs text-controller-black font-bold">👑</span>
                          </div>
                          
                          {/* Results Glow */}
                          <motion.div
                            animate={{ 
                              boxShadow: [
                                '0 0 15px rgba(255,234,0,0.5)',
                                '0 0 30px rgba(255,234,0,0.8)',
                                '0 0 15px rgba(255,234,0,0.5)'
                              ]
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 rounded-lg pointer-events-none"
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Client Success Rate */}
                    <div className="hud-element">
                      <div className="flex justify-between items-center mb-2">
                        <span className="gaming-mono text-xs">SATISFAÇÃO DOS CLIENTES</span>
                        <span className="gaming-mono text-xs text-laser-green">{hudStats.hp}%</span>
                      </div>
                      <div className="hud-bar">
                        <motion.div
                          className="hud-bar-fill bg-gradient-to-r from-laser-green to-electric-blue"
                          initial={{ width: 0 }}
                          animate={{ width: `${hudStats.hp}%` }}
                          transition={{ duration: 2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Uptime */}
                    <div className="hud-element">
                      <div className="flex justify-between items-center mb-2">
                        <span className="gaming-mono text-xs">UPTIME GARANTIDO</span>
                        <span className="gaming-mono text-xs text-electric-blue">99.9%</span>
                      </div>
                      <div className="hud-bar">
                        <motion.div
                          className="hud-bar-fill bg-gradient-to-r from-electric-blue to-gaming-purple"
                          initial={{ width: 0 }}
                          animate={{ width: '99.9%' }}
                          transition={{ duration: 2.5, delay: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Trust Metrics */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="hud-element text-center">
                        <div className="gaming-display text-2xl font-bold text-magenta-power">
                          40+
                        </div>
                        <div className="gaming-mono text-xs opacity-70">PROJETOS ENTREGUES</div>
                      </div>

                      <div className="hud-element text-center">
                        <div className="gaming-display text-2xl font-bold text-plasma-yellow">
                          10+
                        </div>
                        <div className="gaming-mono text-xs opacity-70">ANOS DE EXPERIÊNCIA</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badge Notification */}
                <motion.div
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0], x: [-200, 0, 0, -200] }}
                  transition={{ duration: 6, times: [0, 0.15, 0.7, 1], delay: 3 }}
                  className="absolute top-2 right-2 z-20 gaming-card p-3 border-laser-green bg-laser-green/10 pointer-events-none"
                >
                  <div className="gaming-mono text-xs text-laser-green">
                    ✅ EMPRESA BRASILEIRA
                  </div>
                  <div className="gaming-mono text-xs font-bold">
                    10+ Anos | 40+ Empresas Atendidas
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient Gaming Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particlesData.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-cyan rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear'
            }}
            style={{
              boxShadow: '0 0 10px currentColor'
            }}
          />
        ))}
      </div>
    </section>
  )
}