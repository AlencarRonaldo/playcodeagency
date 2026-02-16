'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, Check } from 'lucide-react'
import { trackingHelpers } from '@/lib/hooks/useAchievements'
import { audioHelpers } from '@/lib/hooks/useAudio'

export type PowerUpRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'

interface PowerUpCardProps {
  id?: string
  name: string
  description: string
  icon: LucideIcon
  rarity: PowerUpRarity
  level: number
  stats: {
    power: number
    efficiency: number
    innovation: number
  }
  price?: string
  isUnlocked?: boolean
  onSelect?: () => void
  className?: string
  fullDescription?: string
  features?: string[]
  isExpanded?: boolean
  onToggleExpansion?: () => void
}

const rarityConfig = {
  common: {
    border: 'border-[#a0a0a0]/60',
    glow: 'shadow-[0_0_20px_rgba(200,200,200,0.4)]',
    gradient: 'from-[#a0a0a0]/15 to-[#606060]/10',
    text: 'text-[#c0c0c0]',
    accent: 'text-[#c0c0c0]',
    badgeGlow: 'drop-shadow-[0_0_6px_rgba(200,200,200,0.6)]'
  },
  rare: {
    border: 'border-[#00BFFF]/80',
    glow: 'shadow-[0_0_25px_rgba(0,191,255,0.5),0_0_50px_rgba(0,191,255,0.2)]',
    gradient: 'from-[#00BFFF]/20 to-[#0066CC]/15',
    text: 'text-[#00D4FF]',
    accent: 'text-[#4DD9FF]',
    badgeGlow: 'drop-shadow-[0_0_10px_rgba(0,212,255,0.9)]'
  },
  epic: {
    border: 'border-[#A855F7]/80',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.5),0_0_50px_rgba(168,85,247,0.2)]',
    gradient: 'from-[#A855F7]/20 to-[#7C3AED]/15',
    text: 'text-[#C084FC]',
    accent: 'text-[#D8B4FE]',
    badgeGlow: 'drop-shadow-[0_0_10px_rgba(192,132,252,0.9)]'
  },
  legendary: {
    border: 'border-[#FFB800]/80',
    glow: 'shadow-[0_0_30px_rgba(255,184,0,0.5),0_0_60px_rgba(255,140,0,0.2)]',
    gradient: 'from-[#FFB800]/25 to-[#FF6B00]/15',
    text: 'text-[#FFD000]',
    accent: 'text-[#FFE566]',
    badgeGlow: 'drop-shadow-[0_0_12px_rgba(255,208,0,1)]'
  },
  mythic: {
    border: 'border-[#FF2D78]/80',
    glow: 'shadow-[0_0_30px_rgba(255,45,120,0.5),0_0_60px_rgba(255,0,255,0.2)]',
    gradient: 'from-[#FF2D78]/20 to-[#FF00FF]/15',
    text: 'text-[#FF5CA1]',
    accent: 'text-[#FF8EC4]',
    badgeGlow: 'drop-shadow-[0_0_12px_rgba(255,92,161,1)]'
  }
}

export default function PowerUpCard({
  id,
  name,
  description,
  icon: Icon,
  rarity,
  level,
  stats,
  price,
  isUnlocked = true,
  onSelect,
  className = '',
  fullDescription,
  features,
  isExpanded: controlledExpanded,
  onToggleExpansion
}: PowerUpCardProps) {
  const config = rarityConfig[rarity]
  const [internalExpanded, setInternalExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{x: number, y: number, duration: number, delay: number}>>([])
  
  // Use controlled state if provided, otherwise use internal state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded
  
  // Generate particles only on client
  useEffect(() => {
    setMounted(true)
    setParticles(
      Array.from({ length: 3 }).map(() => ({
        x: Math.random() * 200,
        y: Math.random() * 200,
        duration: 2 + Math.random(),
        delay: Math.random() * 3
      }))
    )
  }, [])

  // Track power-up view on mount
  useEffect(() => {
    if (id) {
      trackingHelpers.trackPowerUpView(id)
    }
  }, [id])

  const toggleExpansion = () => {
    if (onToggleExpansion) {
      onToggleExpansion()
    } else {
      setInternalExpanded(!internalExpanded)
      audioHelpers.playClick(false)
    }
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -8
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative group cursor-pointer
        bg-gradient-to-br ${config.gradient}
        backdrop-blur-xl border-2 ${config.border}
        rounded-xl p-5 transition-all duration-300
        hover:${config.glow}
        ${!isUnlocked ? 'opacity-60 grayscale' : ''}
        ${className}
      `}
      onMouseEnter={() => {
        audioHelpers.playHover()
        if (id) {
          trackingHelpers.trackHover(`powerup_${id}`)
        }
      }}
      onClick={() => {
        audioHelpers.playPowerUpSelect()
        if (id) {
          trackingHelpers.trackPowerUpSelect(id)
        }
        onSelect?.()
      }}
    >
      {/* Rarity Indicator */}
      <div className="absolute top-2 right-2">
        <div className={`
          px-2 py-1 rounded-md text-[10px] font-bold gaming-mono uppercase
          ${config.text} ${config.border} border-2
          ${config.gradient} bg-gradient-to-r
          shadow-lg backdrop-blur-sm ${config.badgeGlow}
          transform transition-all duration-300 hover:scale-110 hover:rotate-1
          animate-pulse-slow neon-glow-strong
          relative overflow-hidden
        `}>
          <span className="relative z-10">{rarity}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </div>
      </div>

      {/* Lock Indicator */}
      {!isUnlocked && (
        <div className="absolute inset-0 bg-controller-black/50 rounded-xl flex items-center justify-center">
          <div className="text-6xl opacity-50">🔒</div>
        </div>
      )}

      {/* Power-up Icon */}
      <div className={`
        w-14 h-14 mx-auto mb-3 rounded-lg
        bg-gradient-to-br ${config.gradient}
        border ${config.border}
        flex items-center justify-center
        group-hover:animate-powerup
      `}>
        <Icon size={28} className={config.text} />
      </div>

      {/* Power-up Info */}
      <div className="text-center mb-3">
        <h3 className={`gaming-title text-base font-bold mb-1 ${config.text}`}>
          {name}
        </h3>
        <p className="gaming-subtitle text-sm text-led-white/70 mb-2">
          {description}
        </p>

        {/* Level Indicator */}
        <div className="flex items-center justify-center space-x-1 mb-2">
          <span className="gaming-mono text-[10px] text-led-white/50">LVL</span>
          <span className={`gaming-display text-base font-bold ${config.text}`}>
            {level}
          </span>
        </div>
      </div>

      {/* Stats Bars */}
      <div className="space-y-1.5 mb-3">
        {Object.entries(stats).map(([statName, value]) => (
          <div key={statName} className="flex items-center justify-between">
            <span className="gaming-mono text-xs text-led-white/60 uppercase w-16">
              {statName}
            </span>
            <div className="flex-1 mx-2">
              <div className="hud-bar h-2">
                <motion.div
                  className={`h-full bg-gradient-to-r ${config.gradient.replace('/10', '/60').replace('/5', '/40')}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>
            <span className={`gaming-mono text-xs ${config.text} w-7 text-right`}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="border-t border-led-white/20 pt-3">
        <div className="flex items-center justify-between mb-2">
          {price ? (
            <div className="gaming-mono text-sm font-bold text-laser-green">
              {price}
            </div>
          ) : (
            <div className="gaming-mono text-[10px] text-led-white/50">
              UNLOCKED
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 rounded-md gaming-mono text-xs font-bold
              border ${config.border} ${config.text}
              hover:bg-gradient-to-r ${config.gradient.replace('/10', '/20').replace('/5', '/10')}
              transition-all duration-200
              ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            disabled={!isUnlocked}
            onMouseEnter={audioHelpers.playHover}
            onClick={(e) => {
              e.stopPropagation()
              if (isUnlocked) {
                audioHelpers.playClick(false)
                if (id) {
                  trackingHelpers.trackClick(`powerup_choose_${id}`)
                  trackingHelpers.trackPowerUpSelect(id)
                }
                
                // Redirect to contact page with service pre-selected
                const contactUrl = `/contato?servico=${encodeURIComponent(id)}&servico_nome=${encodeURIComponent(name)}`
                window.location.href = contactUrl
              } else {
                audioHelpers.playError()
              }
            }}
          >
            {isUnlocked ? 'ESCOLHER' : 'LOCKED'}
          </motion.button>
        </div>

        {/* Ver Detalhes Button */}
        {(fullDescription || features) && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full px-3 py-2 rounded-md gaming-mono text-xs font-bold
              border ${config.border} ${config.text} bg-transparent
              hover:${config.gradient.replace('/10', '/20').replace('/5', '/10')} hover:bg-gradient-to-r
              transition-all duration-200
              ${isExpanded ? 'border-opacity-100' : 'border-opacity-50'}
            `}
            onMouseEnter={audioHelpers.playHover}
            onClick={(e) => {
              e.stopPropagation()
              toggleExpansion()
              if (id) {
                trackingHelpers.trackClick(`powerup_details_${id}`)
              }
            }}
          >
            {isExpanded ? 'OCULTAR DETALHES' : 'VER DETALHES'}
          </motion.button>
        )}
      </div>

      {/* Expanded Details */}
      <motion.div
        initial={false}
        animate={{ 
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        {(fullDescription || features) && (
          <div className="border-t border-led-white/10 pt-4 mt-4">
            {/* Full Description */}
            {fullDescription && (
              <div className="mb-4">
                <h4 className={`gaming-mono text-xs font-bold ${config.text} mb-2 uppercase`}>
                  Descrição Completa
                </h4>
                <p className="gaming-subtitle text-xs text-led-white/80 leading-relaxed">
                  {fullDescription}
                </p>
              </div>
            )}

            {/* Features List */}
            {features && features.length > 0 && (
              <div>
                <h4 className={`gaming-mono text-xs font-bold ${config.text} mb-2 uppercase`}>
                  Recursos Inclusos
                </h4>
                <div className="space-y-1">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center space-x-2"
                    >
                      <Check size={12} className={`${config.text} flex-shrink-0`} />
                      <span className="gaming-mono text-xs text-led-white/70">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Hover Effect Overlay */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
        bg-gradient-to-br ${config.gradient.replace('/10', '/5').replace('/5', '/2')}
        transition-opacity duration-300 pointer-events-none
      `} />

      {/* Circuit Pattern */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="circuit-pattern opacity-20 w-full h-full" />
      </div>

      {/* Power-up Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 ${config.text} rounded-full`}
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 0
              }}
              animate={{
                y: [particle.y, particle.y - 50],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'linear'
              }}
              style={{
                boxShadow: `0 0 4px currentColor`
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}