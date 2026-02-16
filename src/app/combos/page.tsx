'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Crown, 
  Rocket,
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Award,
  Target,
  Code,
  Database,
  Globe,
  Lock,
  Gauge,
  Layers
} from 'lucide-react'
import { useAudio, audioHelpers } from '@/lib/hooks/useAudio'
import { trackingHelpers } from '@/lib/hooks/useAchievements'

interface Technology {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'hosting' | 'security' | 'monitoring' | 'marketing'
  description: string
}

interface Combo {
  id: string
  name: string
  subtitle: string
  description: string
  icon: React.ElementType
  rarity: 'rare' | 'epic' | 'legendary'
  targetAudience: string
  setupCost: string
  monthlyCost: string
  developmentCost: string
  timeline: string
  technologies: Technology[]
  benefits: string[]
  useCases: string[]
  sla: string
  roi: string
  scalability: string
  addOns?: string[]
}

const COMBOS: Combo[] = [
  {
    id: 'presenca-digital',
    name: 'Presença Digital',
    subtitle: 'MAIS ACESSÍVEL - 35% OFF',
    description: 'Landing page profissional + SEO local + Google Meu Negócio. Tudo que você precisa para aparecer na internet e atrair seus primeiros clientes online',
    icon: Rocket,
    rarity: 'rare',
    targetAudience: 'Profissionais liberais e micro empresas',
    setupCost: 'R$ 1.497 (único)',
    monthlyCost: 'R$ 97/mês (manutenção)',
    developmentCost: 'De R$ 2.300 por R$ 1.497 (-35%)',
    timeline: '5-7 dias',
    sla: '99.5% uptime',
    roi: '1-3 meses',
    scalability: '1 landing page + Google',
    technologies: [
      { name: 'Landing Page Profissional', category: 'frontend', description: 'Página responsiva otimizada para conversão' },
      { name: 'SEO Local', category: 'marketing', description: 'Otimização para aparecer em buscas locais' },
      { name: 'Google Meu Negócio', category: 'marketing', description: 'Perfil completo configurado e otimizado' },
      { name: 'WhatsApp Business', category: 'backend', description: 'Botão flutuante + link direto' },
      { name: 'Hospedagem + SSL', category: 'hosting', description: '1 ano de hospedagem e certificado HTTPS' },
      { name: 'Google Analytics', category: 'monitoring', description: 'Monitoramento de visitas e conversões' }
    ],
    benefits: [
      'Entrega em 5-7 dias úteis',
      'Apareça no Google quando clientes pesquisarem',
      'Google Meu Negócio otimizado (mapa + avaliações)',
      'Economia de R$ 803 (35%) vs. serviços separados',
      'Hospedagem e domínio inclusos por 1 ano',
      '5 emails profissionais (@suaempresa.com)',
      'WhatsApp integrado para receber contatos',
      'Suporte por 6 meses após entrega'
    ],
    useCases: [
      'Dentistas, advogados, psicólogos, nutricionistas',
      'Personal trainers e coaches',
      'Eletricistas, encanadores, pintores',
      'Pequenos comércios locais',
      'Quem ainda não tem site e quer começar rápido'
    ],
    addOns: ['5 Emails profissionais', 'Cardápio digital (restaurantes)', 'Formulário inteligente', 'QR Code personalizado']
  },
  {
    id: 'atendimento-inteligente',
    name: 'Atendimento Inteligente',
    subtitle: 'MAIS VENDIDO - 30% OFF',
    description: 'Site completo + Chatbot WhatsApp com IA + Agendamento automático. Sua empresa atende, qualifica e agenda clientes 24h sem você precisar estar online',
    icon: Target,
    rarity: 'epic',
    targetAudience: 'Clínicas, consultórios e prestadores de serviço',
    setupCost: 'R$ 2.997 (setup)',
    monthlyCost: 'R$ 297/mês (IA + manutenção)',
    developmentCost: 'De R$ 4.291 por R$ 2.997 (-30%)',
    timeline: '10-14 dias',
    sla: '99.5% uptime',
    roi: '2-4 meses',
    scalability: 'Site + Chatbot IA 24h',
    technologies: [
      { name: 'Site Institucional', category: 'frontend', description: 'Até 5 páginas profissionais responsivas' },
      { name: 'Chatbot WhatsApp IA', category: 'backend', description: 'GPT treinado com dados do seu negócio' },
      { name: 'Agendamento Automático', category: 'backend', description: 'IA agenda reuniões sem intervenção humana' },
      { name: 'Google Meu Negócio', category: 'marketing', description: 'Presença local otimizada' },
      { name: 'SEO Otimizado', category: 'marketing', description: 'Apareça nas buscas do Google' },
      { name: 'Dashboard de Métricas', category: 'monitoring', description: 'Acompanhe atendimentos e conversões' }
    ],
    benefits: [
      'Chatbot IA responde seus clientes 24/7 no WhatsApp',
      'Agendamento automático de consultas e reuniões',
      'IA treinada com perguntas frequentes do SEU negócio',
      'Economia de R$ 1.294 (30%) vs. serviços separados',
      'Site profissional com até 5 páginas',
      'Transferência para humano quando necessário',
      'Qualificação automática de leads',
      'Relatórios mensais de atendimento e conversão'
    ],
    useCases: [
      'Clínicas médicas e odontológicas',
      'Escritórios de advocacia e contabilidade',
      'Imobiliárias e corretores',
      'Consultórios de psicologia e nutrição',
      'Empresas de serviço com alto volume de WhatsApp'
    ],
    addOns: ['CRM integrado', 'Remarketing automático', 'Follow-up por email', 'Integração com agenda Google']
  },
  {
    id: 'maquina-de-vendas',
    name: 'Máquina de Vendas',
    subtitle: 'PREMIUM - 40% OFF + BÔNUS',
    description: 'Site completo + Chatbot IA + Automação de vendas + SEO + Redes sociais. Sua operação digital completa rodando no piloto automático com IA',
    icon: Crown,
    rarity: 'legendary',
    targetAudience: 'Empresas que querem escalar vendas',
    setupCost: 'R$ 4.997 (setup)',
    monthlyCost: 'R$ 997/mês (tudo incluso)',
    developmentCost: 'De R$ 8.385 por R$ 4.997 (-40%)',
    timeline: '2-4 semanas',
    sla: '99.9% uptime',
    roi: '3-6 meses',
    scalability: 'Operação digital completa',
    technologies: [
      { name: 'Site Completo', category: 'frontend', description: 'Até 10 páginas + blog + landing pages' },
      { name: 'Chatbot IA Avançado', category: 'backend', description: 'WhatsApp + site com qualificação de leads' },
      { name: 'Automação de Vendas', category: 'backend', description: 'Follow-up, propostas e nurturing automáticos' },
      { name: 'SEO + GEO', category: 'marketing', description: 'Google + otimização para buscas por IA' },
      { name: 'Redes Sociais IA', category: 'marketing', description: '16 posts/mês gerados por IA' },
      { name: 'Analytics Completo', category: 'monitoring', description: 'Dashboard com todas as métricas de vendas' }
    ],
    benefits: [
      'Operação digital 100% automatizada com IA',
      'Chatbot IA + automação de follow-up de vendas',
      '16 posts/mês para redes sociais (gerados por IA)',
      'Economia de R$ 3.388 (40%) vs. serviços separados',
      'SEO + GEO (apareça no Google E em buscas por IA)',
      'Geração automática de propostas comerciais',
      'Recuperação de leads inativos por WhatsApp',
      'Relatórios semanais com IA de recomendações',
      'Equipe dedicada com gerente de projeto'
    ],
    useCases: [
      'E-commerces que querem escalar vendas',
      'Empresas com equipe comercial que precisa de mais leads',
      'Negócios com múltiplos canais de venda',
      'Franquias e redes com várias unidades',
      'Empresas investindo em marketing digital'
    ],
    addOns: ['Google Ads management', 'E-commerce integrado', 'App mobile PWA', 'CRM avançado com IA']
  }
]

const rarityConfig = {
  rare: {
    border: 'border-electric-blue/60',
    glow: 'shadow-[0_0_15px_rgba(0,212,255,0.4)]',
    gradient: 'from-electric-blue/20 to-electric-blue/10',
    text: 'text-electric-blue',
    accent: 'text-electric-blue',
    bg: 'bg-electric-blue/10'
  },
  epic: {
    border: 'border-gaming-purple/70',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.5)]',
    gradient: 'from-gaming-purple/25 to-gaming-purple/10',
    text: 'text-gaming-purple',
    accent: 'text-gaming-purple',
    bg: 'bg-gaming-purple/10'
  },
  legendary: {
    border: 'border-plasma-yellow/80',
    glow: 'shadow-[0_0_25px_rgba(255,234,0,0.6)]',
    gradient: 'from-plasma-yellow/30 to-plasma-yellow/10',
    text: 'text-plasma-yellow',
    accent: 'text-plasma-yellow',
    bg: 'bg-plasma-yellow/10'
  }
}

const categoryIcons: Record<string, React.ElementType> = {
  frontend: Code,
  backend: Database,
  database: Layers,
  hosting: Globe,
  security: Lock,
  monitoring: Gauge,
  marketing: TrendingUp
}

export default function CombosPage() {
  const [selectedCombo, setSelectedCombo] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'pricing'>('overview')
  const [mounted, setMounted] = useState(false)
  const { playContextMusic } = useAudio()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    trackingHelpers.trackPageView('/combos')
    // Music is now controlled by the MarioAutoPlay component globally
  }, [])

  const handleComboSelect = (comboId: string) => {
    audioHelpers.playPowerUpSelect()
    trackingHelpers.trackClick(`combo_select_${comboId}`)
    setSelectedCombo(selectedCombo === comboId ? null : comboId)
    setActiveTab('overview')
  }

  const handleTabChange = (tab: 'overview' | 'tech' | 'pricing') => {
    audioHelpers.playClick(false)
    setActiveTab(tab)
  }

  const handleQuoteRequest = (comboId?: string) => {
    audioHelpers.playClick(true)
    trackingHelpers.trackClick(`combo_quote_${comboId || 'custom'}`)
    
    // Navigate to contact page with combo pre-selected
    const params = new URLSearchParams()
    if (comboId) {
      params.set('combo', comboId)
      params.set('project_type', 'custom')
    }
    router.push(`/contato?${params.toString()}`)
  }

  const handleSpecialistContact = (comboId?: string) => {
    audioHelpers.playClick(false)
    trackingHelpers.trackClick(`combo_specialist_${comboId || 'custom'}`)
    
    // Navigate to WhatsApp with pre-filled message
    const message = comboId 
      ? `Olá! Gostaria de falar sobre o combo ${COMBOS.find(c => c.id === comboId)?.name || 'personalizado'} que vi no site.`
      : 'Olá! Gostaria de criar um combo personalizado para meu projeto.'
    
    const whatsappUrl = `https://wa.me/5511956534963?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-console">
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Star className="w-8 h-8 text-plasma-yellow" />
            <h1 className="gaming-title text-4xl lg:text-6xl font-bold text-neon-cyan neon-glow">
              PACOTES COMPLETOS DE DESENVOLVIMENTO WEB
            </h1>
            <Star className="w-8 h-8 text-plasma-yellow" />
          </div>
          
          <p className="gaming-subtitle text-xl lg:text-2xl text-led-white/80 max-w-4xl mx-auto mb-8">
            Pacotes completos com <strong>site + IA + automação</strong> em um só lugar.
            Economize até <strong>40%</strong> escolhendo o combo ideal para o seu negócio.
          </p>

          {/* ROI Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'Entrega', presenca: '5-7 dias', atendimento: '10-14 dias', maquina: '2-4 semanas' },
              { label: 'Investimento', presenca: 'R$ 1.497', atendimento: 'R$ 2.997', maquina: 'R$ 4.997' },
              { label: 'Retorno estimado', presenca: '1-3 meses', atendimento: '2-4 meses', maquina: '3-6 meses' }
            ].map((metric, index) => (
              <div key={index} className="gaming-card p-4">
                <div className="gaming-mono text-xs font-bold text-neon-cyan mb-3 uppercase">
                  {metric.label}
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-electric-blue">Presença:</span>
                    <span className="text-led-white">{metric.presenca}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gaming-purple">Atendimento:</span>
                    <span className="text-led-white">{metric.atendimento}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-plasma-yellow">Vendas:</span>
                    <span className="text-led-white">{metric.maquina}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Combos Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {COMBOS.map((combo, index) => {
            const config = rarityConfig[combo.rarity]
            const isSelected = selectedCombo === combo.id
            const Icon = combo.icon

            return (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -8 }}
                className={`
                  relative gaming-card cursor-pointer h-fit
                  bg-gradient-to-br ${config.gradient}
                  border-2 ${config.border}
                  hover:${config.glow}
                  transition-all duration-300
                  ${isSelected ? `${config.glow} scale-105` : ''}
                `}
                onClick={() => handleComboSelect(combo.id)}
                onMouseEnter={audioHelpers.playHover}
              >
                {/* Rarity Badge */}
                <div className="absolute -top-3 -right-3">
                  <div className={`
                    px-3 py-1 rounded-full text-xs font-bold gaming-mono uppercase
                    ${config.text} ${config.border} border ${config.bg}
                  `}>
                    {combo.rarity}
                  </div>
                </div>

                <div className="p-6">
                  {/* Icon & Title */}
                  <div className="text-center mb-6">
                    <div className={`
                      w-20 h-20 mx-auto mb-4 rounded-xl
                      bg-gradient-to-br ${config.gradient}
                      border-2 ${config.border}
                      flex items-center justify-center
                    `}>
                      <Icon size={40} className={config.text} />
                    </div>
                    
                    <h3 className={`gaming-title text-2xl font-bold mb-2 ${config.text}`}>
                      {combo.name}
                    </h3>
                    <div className={`gaming-mono text-sm font-bold ${config.accent} mb-2`}>
                      {combo.subtitle}
                    </div>
                    <p className="gaming-subtitle text-sm text-led-white/70 mb-4">
                      {combo.description}
                    </p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="gaming-mono text-xs text-led-white/60 mb-1">SETUP</div>
                      <div className={`gaming-display text-sm font-bold ${config.text}`}>
                        {combo.setupCost.split(' - ')[0]}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="gaming-mono text-xs text-led-white/60 mb-1">TIMELINE</div>
                      <div className={`gaming-display text-sm font-bold ${config.text}`}>
                        {combo.timeline}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="gaming-mono text-xs text-led-white/60 mb-1">ESCALA</div>
                      <div className={`gaming-display text-sm font-bold ${config.text}`}>
                        {combo.scalability}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="gaming-mono text-xs text-led-white/60 mb-1">SLA</div>
                      <div className={`gaming-display text-sm font-bold ${config.text}`}>
                        {combo.sla}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      w-full px-4 py-2 rounded-md gaming-mono text-sm font-bold
                      border ${config.border} ${config.text}
                      hover:bg-gradient-to-r ${config.gradient.replace('/10', '/20').replace('/5', '/10')}
                      transition-all duration-200 flex items-center justify-center gap-2
                    `}
                  >
                    {isSelected ? 'VER DETALHES' : 'EXPLORAR COMBO'}
                    <ArrowRight size={16} className={`transform transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                  </motion.button>
                </div>

                {/* Circuit Pattern */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="circuit-pattern opacity-10 w-full h-full" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Detailed View */}
        <AnimatePresence>
          {selectedCombo && (() => {
            const combo = COMBOS.find(c => c.id === selectedCombo)!
            const config = rarityConfig[combo.rarity]
            return (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className={`gaming-card border-2 ${config.border} ${config.bg} overflow-hidden`}
              >
                {/* Header */}
                <div className="p-6 border-b border-led-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <combo.icon size={32} className={config.text} />
                      <div>
                        <h2 className={`gaming-title text-3xl font-bold ${config.text}`}>
                          {combo.name}
                        </h2>
                        <div className="gaming-mono text-sm text-led-white/70">
                          {combo.targetAudience}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCombo(null)}
                      className="text-led-white/60 hover:text-neon-cyan"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-4">
                    {[
                      { id: 'overview', label: 'VISÃO GERAL', icon: Target },
                      { id: 'tech', label: 'TECNOLOGIAS', icon: Code },
                      { id: 'pricing', label: 'INVESTIMENTO', icon: DollarSign }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id as 'overview' | 'tech' | 'pricing')}
                        onMouseEnter={audioHelpers.playHover}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-md gaming-mono text-sm font-bold
                          transition-all duration-200
                          ${activeTab === tab.id 
                            ? `${config.text} ${config.bg} border ${config.border}` 
                            : 'text-led-white/60 hover:text-neon-cyan'
                          }
                        `}
                      >
                        <tab.icon size={16} />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Benefits */}
                      <div>
                        <h3 className="gaming-title text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
                          <CheckCircle size={20} />
                          BENEFÍCIOS PRINCIPAIS
                        </h3>
                        <ul className="space-y-3">
                          {combo.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-led-white/80">
                              <CheckCircle size={16} className="text-laser-green mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Use Cases */}
                      <div>
                        <h3 className="gaming-title text-xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
                          <Target size={20} />
                          CASOS DE USO IDEAIS
                        </h3>
                        <ul className="space-y-3">
                          {combo.useCases.map((useCase, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-led-white/80">
                              <Star size={16} className={`${config.text} mt-0.5 flex-shrink-0`} />
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'tech' && (
                    <div>
                      <h3 className="gaming-title text-xl font-bold text-neon-cyan mb-6 flex items-center gap-2">
                        <Code size={20} />
                        STACK TECNOLÓGICO
                      </h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {combo.technologies.map((tech, idx) => {
                          const CategoryIcon = categoryIcons[tech.category]
                          return (
                            <div key={idx} className="gaming-card p-4 border border-led-white/20">
                              <div className="flex items-center gap-2 mb-2">
                                <CategoryIcon size={16} className="text-neon-cyan" />
                                <span className="gaming-mono text-sm font-bold text-neon-cyan uppercase">
                                  {tech.category}
                                </span>
                              </div>
                              <div className="font-bold text-led-white mb-1">{tech.name}</div>
                              <div className="text-xs text-led-white/70">{tech.description}</div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Add-ons */}
                      {combo.addOns && (
                        <div>
                          <h4 className="gaming-title text-lg font-bold text-electric-blue mb-4">
                            🚀 ADD-ONS DISPONÍVEIS
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {combo.addOns.map((addon, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-electric-blue/20 border border-electric-blue/30 rounded text-sm gaming-mono text-electric-blue"
                              >
                                {addon}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'pricing' && (
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Pricing Details */}
                      <div>
                        <h3 className="gaming-title text-xl font-bold text-neon-cyan mb-6 flex items-center gap-2">
                          <DollarSign size={20} />
                          ESTRUTURA DE INVESTIMENTO
                        </h3>
                        <div className="space-y-4">
                          <div className="gaming-card p-4 border border-led-white/20">
                            <div className="flex justify-between items-center mb-2">
                              <span className="gaming-mono text-sm font-bold text-neon-cyan">SETUP INICIAL</span>
                              <span className="gaming-display text-lg font-bold text-laser-green">
                                {combo.setupCost}
                              </span>
                            </div>
                            <div className="text-xs text-led-white/70">
                              Configuração completa da infraestrutura e ambiente
                            </div>
                          </div>

                          <div className="gaming-card p-4 border border-led-white/20">
                            <div className="flex justify-between items-center mb-2">
                              <span className="gaming-mono text-sm font-bold text-electric-blue">CUSTO MENSAL</span>
                              <span className="gaming-display text-lg font-bold text-electric-blue">
                                {combo.monthlyCost}
                              </span>
                            </div>
                            <div className="text-xs text-led-white/70">
                              Hosting, serviços e infraestrutura em nuvem
                            </div>
                          </div>

                          <div className="gaming-card p-4 border border-led-white/20">
                            <div className="flex justify-between items-center mb-2">
                              <span className="gaming-mono text-sm font-bold text-plasma-yellow">DESENVOLVIMENTO</span>
                              <span className="gaming-display text-lg font-bold text-plasma-yellow">
                                {combo.developmentCost}
                              </span>
                            </div>
                            <div className="text-xs text-led-white/70">
                              Customização e desenvolvimento especializado
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ROI Metrics */}
                      <div>
                        <h3 className="gaming-title text-xl font-bold text-neon-cyan mb-6 flex items-center gap-2">
                          <TrendingUp size={20} />
                          MÉTRICAS DE ROI
                        </h3>
                        <div className="space-y-4">
                          {[
                            { label: 'Timeline de Entrega', value: combo.timeline, icon: Clock },
                            { label: 'Escalabilidade', value: combo.scalability, icon: Users },
                            { label: 'SLA Garantido', value: combo.sla, icon: Shield },
                            { label: 'ROI Break-even', value: combo.roi, icon: Award }
                          ].map((metric, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 bg-led-white/5 rounded-lg">
                              <metric.icon size={20} className={config.text} />
                              <div className="flex-1">
                                <div className="gaming-mono text-xs text-led-white/70 uppercase">
                                  {metric.label}
                                </div>
                                <div className="font-bold text-led-white">
                                  {metric.value}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Footer */}
                <div className="p-6 border-t border-led-white/20 bg-led-white/5">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={audioHelpers.playHover}
                      onClick={() => handleQuoteRequest(combo.id)}
                      className="gaming-button text-lg px-8 py-4"
                    >
                      <span className="relative z-10">SOLICITAR ORÇAMENTO</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={audioHelpers.playHover}
                      onClick={() => handleSpecialistContact(combo.id)}
                      className="gaming-card px-8 py-4 text-lg font-semibold text-neon-cyan border-neon-cyan hover:text-controller-black hover:bg-neon-cyan transition-all duration-300"
                    >
                      FALAR COM ESPECIALISTA
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          })()}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center gaming-card p-8 bg-gradient-to-r from-gaming-purple/20 to-neon-cyan/20 border-2 border-neon-cyan/50 mt-16"
        >
          <h2 className="gaming-title text-2xl lg:text-3xl font-bold text-neon-cyan mb-4">
            PRECISA DE ALGO DIFERENTE?
          </h2>
          <p className="text-lg text-led-white/80 mb-6 max-w-2xl mx-auto">
            Montamos um pacote personalizado para a sua empresa.
            Conte o que você precisa e criamos a solução ideal para o seu negócio.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={audioHelpers.playHover}
            onClick={() => handleQuoteRequest()}
            className="gaming-button text-lg px-8 py-4"
          >
            <span className="relative z-10">CRIAR COMBO PERSONALIZADO</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}