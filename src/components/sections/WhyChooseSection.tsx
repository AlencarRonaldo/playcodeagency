'use client'

import { motion } from 'framer-motion'
import { Zap, Smartphone, Brain, TrendingUp } from 'lucide-react'

const advantages = [
  {
    icon: Zap,
    title: 'ENTREGA RÁPIDA',
    description: 'Landing pages em até 7 dias e sites completos em 2-4 semanas. Sem enrolação, com qualidade profissional.',
    stat: '7 dias',
    statLabel: 'LANDING PAGE',
    color: 'text-plasma-yellow',
    borderColor: 'border-plasma-yellow',
    bgColor: 'bg-plasma-yellow/10',
    glowColor: 'shadow-[0_0_15px_rgba(255,215,0,0.15)]',
  },
  {
    icon: Smartphone,
    title: 'SITES RESPONSIVOS',
    description: 'Todos os sites são mobile-first: funcionam perfeitamente em celular, tablet e desktop.',
    stat: '100%',
    statLabel: 'RESPONSIVO',
    color: 'text-neon-cyan',
    borderColor: 'border-neon-cyan',
    bgColor: 'bg-neon-cyan/10',
    glowColor: 'shadow-[0_0_15px_rgba(0,212,255,0.15)]',
  },
  {
    icon: Brain,
    title: 'EXPERIÊNCIA',
    description: '10+ anos no mercado de desenvolvimento web, 40+ projetos entregues com sucesso para empresas de todos os tamanhos.',
    stat: '10+',
    statLabel: 'ANOS NO MERCADO',
    color: 'text-gaming-purple',
    borderColor: 'border-gaming-purple',
    bgColor: 'bg-gaming-purple/10',
    glowColor: 'shadow-[0_0_15px_rgba(147,51,234,0.15)]',
  },
  {
    icon: TrendingUp,
    title: 'MAIS VENDAS',
    description: 'Sites otimizados para conversão com SEO, formulários inteligentes e integração com WhatsApp para capturar clientes.',
    stat: '95%',
    statLabel: 'SATISFAÇÃO',
    color: 'text-laser-green',
    borderColor: 'border-laser-green',
    bgColor: 'bg-laser-green/10',
    glowColor: 'shadow-[0_0_15px_rgba(0,255,65,0.15)]',
  },
]

export default function WhyChooseSection() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="gaming-title text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-neon-cyan">POR QUE ESCOLHER A</span>
            <br />
            <span className="text-magenta-power">PLAYCODE?</span>
          </h2>

          <p className="gaming-subtitle text-base sm:text-xl text-led-white/80 max-w-2xl mx-auto">
            Combinamos <strong>velocidade</strong>, <strong>experiência</strong> e <strong>tecnologia de ponta</strong> para
            entregar sites que realmente geram resultados para o seu negócio.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((item, index) => {
            const Icon = item.icon
            const isFirst = index === 0
            return (
              <motion.div
                key={item.title}
                initial={isFirst ? { scale: 0, rotate: 180, opacity: 0 } : { opacity: 0, y: 40 }}
                whileInView={isFirst ? { scale: 1, rotate: 0, opacity: 1 } : { opacity: 1, y: 0 }}
                transition={isFirst ? { duration: 0.8, ease: 'easeOut' } : { duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative gaming-card p-6 text-center border-2 ${item.borderColor} ${item.bgColor} ${item.glowColor} hover:scale-105 transition-transform duration-300`}
              >
                {/* Game icon frame (first card only) */}
                {isFirst ? (
                  <div className={`w-16 h-20 relative mx-auto mb-4 bg-gradient-to-b from-plasma-yellow/20 to-yellow-300/20 rounded-lg border-2 ${item.borderColor} flex items-center justify-center`}>
                    <div className="text-3xl">⚡</div>
                  </div>
                ) : (
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg ${item.bgColor} mb-4`}>
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                )}

                <div className={`gaming-display text-3xl font-bold ${item.color} mb-1`}>
                  {item.stat}
                </div>
                <div className="gaming-mono text-xs text-led-white/50 mb-3">
                  {item.statLabel}
                </div>

                <h3 className={`gaming-mono text-lg font-bold ${item.color} mb-2`}>
                  {item.title}
                </h3>

                <p className="gaming-subtitle text-sm text-led-white/70 leading-relaxed">
                  {item.description}
                </p>

                {/* Pulsating glow effect (first card only) */}
                {isFirst && (
                  <>
                    <div className="flex justify-center mt-3 space-x-1">
                      <div className="w-2 h-2 bg-plasma-yellow rounded-full" />
                      <div className="w-2 h-2 bg-plasma-yellow rounded-full" />
                      <div className="w-2 h-2 bg-plasma-yellow rounded-full" />
                    </div>
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 8px rgba(255,215,0,0.3)',
                          '0 0 20px rgba(255,215,0,0.6)',
                          '0 0 8px rgba(255,215,0,0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-lg pointer-events-none"
                    />
                  </>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
