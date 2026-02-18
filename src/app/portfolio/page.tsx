'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ExternalLink,
  Github,
  Eye,
  Globe,
  Star,
  Award,
  Calendar,
  Users,
  Code,
  Play,
  Target
} from 'lucide-react'
import { useAudio, audioHelpers } from '@/lib/hooks/useAudio'
import { trackingHelpers } from '@/lib/hooks/useAchievements'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: 'web'
  technologies: string[]
  features: string[]
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  status: 'completed' | 'in-progress' | 'upcoming'
  client: string
  duration: string
  teamSize: number
  year: string
  images: string[]
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  impact: {
    users?: string
    revenue?: string
    performance?: string
    other?: string
  }
  awards?: string[]
}

const PROJECTS: Project[] = [
  {
    id: 'rc-suporte',
    title: 'RC Suporte',
    description: 'Site profissional para empresa de infraestrutura de TI - resultado: +150% em geração de leads',
    longDescription: 'Criamos um site institucional completo e responsivo para a RC Suporte, empresa de cabeamento estruturado e CFTV IP. O resultado foi um aumento de 150% na captação de novos clientes, com design profissional focado em conversão para o mercado B2B.',
    category: 'web',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Google Analytics', 'Responsive Design', 'Google Tag Manager'],
    features: ['Calculadora de serviços', 'Portfolio showcase', 'Depoimentos de clientes', 'Integração WhatsApp', 'Newsletter signup', 'Design responsivo'],
    rarity: 'epic',
    status: 'completed',
    client: 'RC Suporte',
    duration: '3 meses',
    teamSize: 3,
    year: '2023',
    images: ['/portfolio/rc-suporte-1.jpg', '/portfolio/rc-suporte-2.jpg'],
    liveUrl: 'https://rcsuporte.com.br',
    impact: {
      users: '10K+',
      performance: '+150% leads',
      other: 'Certificação Fluke'
    },
    awards: ['Melhor Site Corporativo B2B 2023']
  },
  {
    id: 'carvalho-pics',
    title: 'Carvalho\'s Pics Photography',
    description: 'Site profissional com galeria de 50K+ fotos e sistema de vendas online integrado',
    longDescription: 'Desenvolvemos um site responsivo e profissional para fotógrafo credenciado FIFA/CBF. Resultado: galeria com mais de 50.000 fotos, sistema de vendas online integrado, entrega expressa em 24-48h e cobertura de mais de 500 eventos esportivos.',
    category: 'web',
    technologies: ['React', 'Next.js', 'JavaScript', 'Google Analytics', 'E-commerce Integration', 'Image Optimization'],
    features: ['Galeria de 50K+ fotos', 'Sistema de vendas online', 'Entrega expressa 24-48h', 'Credenciamento FIFA/CBF', 'Múltiplas modalidades', 'Downloads para clientes'],
    rarity: 'legendary',
    status: 'completed',
    client: 'Rones Carvalho',
    duration: '4 meses',
    teamSize: 2,
    year: '2024',
    images: ['/portfolio/carvalho-pics-1.jpg', '/portfolio/carvalho-pics-2.jpg'],
    liveUrl: 'https://carvalhopics.com.br',
    impact: {
      users: '8 anos experiência',
      performance: '500+ eventos',
      other: '50K+ fotos'
    },
    awards: ['Fotografia Esportiva de Excelência 2024']
  },
  {
    id: 'painel-cidadao',
    title: 'Painel Cidadão',
    description: 'Sistema web participativo para cadastro público e troca de ideias entre cidadãos e gestão municipal',
    longDescription: 'Aplicação web progressiva (PWA) desenvolvida para facilitar a participação cidadã. O sistema permite que moradores enviem sugestões de melhorias, acompanhem demandas e interajam com a gestão pública de forma transparente e organizada. Funciona como app no celular e no computador.',
    category: 'web',
    technologies: ['Next.js', 'React', 'TypeScript', 'PWA', 'CSS Modules', 'API REST'],
    features: ['Cadastro público de sugestões', 'Sistema de autenticação', 'PWA (funciona como app)', 'Busca e filtros avançados', 'Notificações em tempo real', 'Design responsivo mobile-first'],
    rarity: 'epic',
    status: 'completed',
    client: 'Projeto Governamental',
    duration: '3 meses',
    teamSize: 2,
    year: '2025',
    images: ['/portfolio/painel-cidadao-1.jpg'],
    liveUrl: 'https://sistemacadastro-fawn.vercel.app/cadastro-publico',
    impact: {
      users: 'Público geral',
      performance: 'PWA instalável',
      other: 'Participação cidadã'
    }
  },
  {
    id: 'dashboard-analytics',
    title: 'Dashboard Analítico',
    description: 'Sistema personalizado de análise de vendas para marketplaces com dashboards interativos e relatórios',
    longDescription: 'Sistema de Business Intelligence desenvolvido sob medida para análise de vendas em múltiplos marketplaces. Inclui dashboards interativos, gráficos de performance, relatórios automáticos e autenticação segura. Permite que o empresário acompanhe todas as suas vendas em um único painel.',
    category: 'web',
    technologies: ['Next.js', 'React', 'TypeScript', 'Charts.js', 'API REST', 'Auth System'],
    features: ['Dashboards interativos', 'Análise multi-marketplace', 'Relatórios automáticos', 'Autenticação segura', 'Dark mode', 'Gráficos de performance'],
    rarity: 'epic',
    status: 'completed',
    client: 'Empresa de E-commerce',
    duration: '2 meses',
    teamSize: 2,
    year: '2025',
    images: ['/portfolio/dashboard-analytics-1.jpg'],
    liveUrl: 'https://dashboard-analytics-vert.vercel.app/login',
    impact: {
      users: 'Gestores',
      performance: 'Multi-marketplace',
      other: 'BI completo'
    }
  },
  {
    id: 'controle-financeiro',
    title: 'Gestão Financeira',
    description: 'Sistema web de controle financeiro empresarial com receitas, despesas e relatórios gerenciais',
    longDescription: 'Sistema de gestão financeira completo desenvolvido para empresas que precisam organizar suas finanças de forma profissional. Controle de receitas, despesas, fluxo de caixa, categorização automática e relatórios gerenciais em uma interface intuitiva e fácil de usar.',
    category: 'web',
    technologies: ['Next.js', 'React', 'TypeScript', 'API REST', 'Charts.js', 'Responsive Design'],
    features: ['Controle de receitas e despesas', 'Fluxo de caixa', 'Relatórios gerenciais', 'Categorização automática', 'Dashboard financeiro', 'Interface intuitiva'],
    rarity: 'rare',
    status: 'completed',
    client: 'Empresa Privada',
    duration: '2 meses',
    teamSize: 2,
    year: '2025',
    images: ['/portfolio/controle-financeiro-1.jpg'],
    liveUrl: 'https://controle-financeiro-kappa-ten.vercel.app/',
    impact: {
      users: 'Empresários',
      performance: 'Controle total',
      other: 'Relatórios auto.'
    }
  },
  {
    id: 'condotrack',
    title: 'CondoTrack Pro',
    description: 'Sistema SaaS para gestão de condomínios com controle de encomendas, notificações WhatsApp e auditoria',
    longDescription: 'Plataforma SaaS completa para modernizar a gestão condominial. Inclui controle digital de encomendas e correspondências, notificação automática via WhatsApp para moradores, sistema de login para síndicos e porteiros, relatórios em PDF, histórico completo com auditoria e busca avançada por unidade, nome ou status.',
    category: 'web',
    technologies: ['Next.js', 'React', 'TypeScript', 'WhatsApp API', 'PDF Export', 'SaaS Architecture'],
    features: ['Controle de encomendas digital', 'Notificação automática WhatsApp', 'Login síndico/porteiro', 'Relatórios em PDF', 'Busca avançada', 'Histórico com auditoria', 'PIN de acesso por morador', 'Planos Basic/Pro/Premium'],
    rarity: 'legendary',
    status: 'completed',
    client: 'PlayCode Agency (Produto Próprio)',
    duration: '4 meses',
    teamSize: 2,
    year: '2025',
    images: ['/portfolio/condotrack-1.jpg'],
    liveUrl: 'https://condotrack-nine.vercel.app/',
    impact: {
      users: 'Condomínios',
      performance: 'SaaS 3 planos',
      other: 'WhatsApp integrado'
    },
    awards: ['Produto SaaS PlayCode 2025']
  },
  {
    id: 'mobiguincho',
    title: 'MobiGuincho',
    description: 'Aplicação web para solicitação de guinchos com geolocalização, rastreamento e despacho em tempo real',
    longDescription: 'Sistema web responsivo para solicitação e gerenciamento de serviços de guincho. O cliente solicita o guincho pelo celular com geolocalização automática, e o sistema conecta com o guincheiro mais próximo em tempo real. Design mobile-first otimizado para uso rápido em situações de emergência.',
    category: 'web',
    technologies: ['Next.js', 'React', 'TypeScript', 'Geolocation API', 'Maps Integration', 'Responsive Design'],
    features: ['Solicitação de guincho online', 'Geolocalização automática', 'Design mobile-first', 'Interface para emergências', 'Rastreamento em tempo real', 'Despacho automático'],
    rarity: 'epic',
    status: 'completed',
    client: 'Empresa de Guinchos',
    duration: '3 meses',
    teamSize: 2,
    year: '2025',
    images: ['/portfolio/mobiguincho-1.jpg'],
    liveUrl: 'https://mobiguincho.vercel.app/',
    impact: {
      users: 'Motoristas',
      performance: 'Tempo real',
      other: 'Geolocalização'
    }
  },
]

const CATEGORIES = [
  { id: 'all', name: 'Todos', icon: Target, color: 'text-neon-cyan' },
  { id: 'web', name: 'Web Apps', icon: Globe, color: 'text-laser-green' },
]

const rarityConfig = {
  common: {
    border: 'border-[#3a4055]',
    glow: 'shadow-[0_0_12px_rgba(255,255,255,0.2)]',
    bg: 'bg-[#1a1f2e]',
    tagBg: 'bg-[#2a3040]',
    text: 'text-led-white',
    accent: 'text-led-white',
    btnDemoBg: 'bg-[#00b8b8] hover:bg-[#00d4d4]',
    btnDetailsBg: 'bg-[#2a3040] hover:bg-[#3a4055]'
  },
  rare: {
    border: 'border-[#1a6b8a]',
    glow: 'shadow-[0_0_15px_rgba(0,212,255,0.35)]',
    bg: 'bg-[#0c1e32]',
    tagBg: 'bg-[#0f2d4a]',
    text: 'text-electric-blue',
    accent: 'text-electric-blue',
    btnDemoBg: 'bg-[#0088aa] hover:bg-[#00a0c8]',
    btnDetailsBg: 'bg-[#0f2d4a] hover:bg-[#1a4060]'
  },
  epic: {
    border: 'border-[#6b3fa0]',
    glow: 'shadow-[0_0_18px_rgba(139,92,246,0.4)]',
    bg: 'bg-[#150e2e]',
    tagBg: 'bg-[#1e1545]',
    text: 'text-gaming-purple',
    accent: 'text-gaming-purple',
    btnDemoBg: 'bg-[#7c4ddb] hover:bg-[#9060ee]',
    btnDetailsBg: 'bg-[#1e1545] hover:bg-[#2a1e5c]'
  },
  legendary: {
    border: 'border-[#a08c00]',
    glow: 'shadow-[0_0_20px_rgba(255,234,0,0.45)]',
    bg: 'bg-[#1f1c05]',
    tagBg: 'bg-[#2e2a0a]',
    text: 'text-plasma-yellow',
    accent: 'text-plasma-yellow',
    btnDemoBg: 'bg-[#b8a000] hover:bg-[#d4b800]',
    btnDetailsBg: 'bg-[#2e2a0a] hover:bg-[#3e3810]'
  }
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { playContextMusic } = useAudio()

  useEffect(() => {
    setMounted(true)
    
    // Track page view
    trackingHelpers.trackPageView('/portfolio')
    
    // Play ambient music
    playContextMusic('default')
  }, [playContextMusic])

  const filteredProjects = selectedCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === selectedCategory)

  const handleCategorySelect = (categoryId: string) => {
    audioHelpers.playNavigation()
    trackingHelpers.trackClick(`portfolio_filter_${categoryId}`)
    setSelectedCategory(categoryId)
    setSelectedProject(null)
  }

  const handleProjectSelect = (projectId: string) => {
    audioHelpers.playPowerUpSelect()
    trackingHelpers.trackClick(`portfolio_project_${projectId}`)
    setSelectedProject(selectedProject === projectId ? null : projectId)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-console">
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Code className="w-6 h-6 sm:w-8 sm:h-8 text-neon-cyan hidden sm:block" />
            <h1 className="gaming-title text-2xl sm:text-4xl lg:text-6xl font-bold text-neon-cyan neon-glow">
              SITES E SISTEMAS QUE JÁ CRIAMOS
            </h1>
            <Code className="w-6 h-6 sm:w-8 sm:h-8 text-neon-cyan hidden sm:block" />
          </div>

          <p className="gaming-subtitle text-base sm:text-xl lg:text-2xl text-led-white/80 max-w-4xl mx-auto mb-6 sm:mb-8">
            Veja exemplos reais de <strong>sites profissionais</strong> e <strong>sistemas web</strong> que
            desenvolvemos para empresas como a sua. Resultados mensuráveis e clientes satisfeitos.
          </p>

          {/* Portfolio Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-12"
          >
            <div className="text-center">
              <div className="gaming-display text-3xl font-bold text-laser-green">{PROJECTS.length}</div>
              <div className="gaming-mono text-sm text-led-white/60">PROJETOS</div>
            </div>
            <div className="text-center">
              <div className="gaming-display text-3xl font-bold text-plasma-yellow">
                40+
              </div>
              <div className="gaming-mono text-sm text-led-white/60">CLIENTES</div>
            </div>
            <div className="text-center">
              <div className="gaming-display text-3xl font-bold text-magenta-power">
                {PROJECTS.filter(p => p.status === 'completed').length}
              </div>
              <div className="gaming-mono text-sm text-led-white/60">CONCLUÍDOS</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <div className="gaming-card p-4">
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((category) => {
                const CategoryIcon = category.icon
                const isSelected = selectedCategory === category.id
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={audioHelpers.playHover}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-md gaming-mono text-sm font-bold uppercase
                      transition-all duration-200 border
                      ${isSelected
                        ? `border-neon-cyan ${category.color} bg-neon-cyan/10` 
                        : 'border-led-white/30 text-led-white/70 hover:border-neon-cyan hover:text-neon-cyan'
                      }
                    `}
                  >
                    <CategoryIcon size={16} />
                    {category.name}
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-16"
          >
            {filteredProjects.map((project, index) => {
              const config = rarityConfig[project.rarity]
              const isSelected = selectedProject === project.id
              const categoryInfo = CATEGORIES.find(c => c.id === project.category)
              const CategoryIcon = categoryInfo?.icon || Globe

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className={`
                    relative cursor-pointer overflow-hidden rounded-lg
                    ${config.bg}
                    border ${config.border}
                    hover:${config.glow}
                    transition-all duration-300
                    ${isSelected ? config.glow : ''}
                  `}
                  onClick={() => handleProjectSelect(project.id)}
                  onMouseEnter={audioHelpers.playHover}
                >
                  {/* Rarity Badge */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                    <div className={`
                      px-2 py-0.5 rounded text-[10px] font-bold gaming-mono uppercase
                      ${config.text} ${config.tagBg}
                    `}>
                      {project.rarity}
                    </div>
                    {project.status === 'in-progress' && (
                      <div className="px-2 py-0.5 rounded text-[10px] font-bold gaming-mono uppercase bg-[#3a1030] text-magenta-power">
                        EM DEV
                      </div>
                    )}
                  </div>

                  {/* Awards Badge */}
                  {project.awards && project.awards.length > 0 && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-[#2e2a0a] rounded">
                        <Award size={10} className="text-plasma-yellow" />
                        <span className="gaming-mono text-[10px] font-bold text-plasma-yellow">
                          {project.awards.length}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    {/* Project Icon Area */}
                    <div className={`
                      w-full h-24 sm:h-28 mb-3 rounded-md overflow-hidden
                      ${config.tagBg}
                      border ${config.border}
                      flex items-center justify-center
                    `}>
                      <div className="text-center">
                        <CategoryIcon size={32} className={config.text} />
                        <div className="gaming-mono text-[10px] mt-1 text-led-white/50">
                          {project.category.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="mb-3">
                      <h3 className={`gaming-title text-sm font-bold mb-1 ${config.text} leading-tight`}>
                        {project.title}
                      </h3>
                      <p className="gaming-subtitle text-xs text-led-white/70 mb-2 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex justify-between items-center text-[10px] gaming-mono text-led-white/50 mb-2">
                        <span>{project.client}</span>
                        <span>{project.year}</span>
                      </div>

                      {/* Tech Stack Preview */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 2).map((tech, idx) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0.5 rounded text-[10px] gaming-mono ${config.text} ${config.tagBg}`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] gaming-mono text-led-white/50 bg-[#1a1f2e]">
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Impact Stats */}
                      {Object.keys(project.impact).length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {Object.entries(project.impact).slice(0, 2).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className={`gaming-display text-sm font-bold ${config.text}`}>
                                {value}
                              </div>
                              <div className="gaming-mono text-[10px] text-led-white/50 uppercase">
                                {key}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1.5 mb-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation()
                            audioHelpers.playClick(false)
                          }}
                          className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded ${config.btnDemoBg} text-white transition-all text-[10px] gaming-mono font-bold`}
                        >
                          <Eye size={12} />
                          DEMO
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation()
                            audioHelpers.playClick(false)
                          }}
                          className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded ${config.btnDetailsBg} text-led-white transition-all text-[10px] gaming-mono font-bold`}
                        >
                          <Github size={12} />
                          CODE
                        </a>
                      )}
                    </div>

                    {/* Expand Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full px-3 py-2 rounded gaming-mono text-xs font-bold
                        ${config.btnDetailsBg} text-led-white
                        transition-all duration-200 flex items-center justify-center gap-1
                      `}
                    >
                      {isSelected ? 'FECHAR' : 'DETALHES'}
                      <Play size={12} className={`transform transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                    </motion.button>
                  </div>

                  {/* Expanded Details */}
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`border-t ${config.border} p-4 overflow-hidden`}
                    >
                      {/* Long Description */}
                      <div className="mb-4">
                        <h4 className="gaming-mono text-xs font-bold text-neon-cyan mb-2">
                          DESCRICAO COMPLETA:
                        </h4>
                        <p className="text-xs text-led-white/80 leading-relaxed">
                          {project.longDescription}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="gaming-mono text-xs font-bold text-electric-blue mb-2">
                          FUNCIONALIDADES:
                        </h4>
                        <ul className="space-y-0.5">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-1.5 text-xs text-led-white/80">
                              <Star size={10} className="text-electric-blue flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* All Technologies */}
                      <div className="mb-4">
                        <h4 className="gaming-mono text-xs font-bold text-gaming-purple mb-2">
                          STACK COMPLETA:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 bg-[#1e1545] border border-[#6b3fa0]/40 rounded text-[10px] gaming-mono text-gaming-purple"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="mb-4">
                        <h4 className="gaming-mono text-xs font-bold text-magenta-power mb-2">
                          DETALHES:
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-1.5 text-xs">
                            <Calendar size={12} className="text-magenta-power" />
                            <span className="text-led-white/80">{project.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs">
                            <Users size={12} className="text-magenta-power" />
                            <span className="text-led-white/80">{project.teamSize} pessoas</span>
                          </div>
                        </div>
                      </div>

                      {/* Awards */}
                      {project.awards && project.awards.length > 0 && (
                        <div className="mb-4">
                          <h4 className="gaming-mono text-xs font-bold text-plasma-yellow mb-2">
                            RECONHECIMENTOS:
                          </h4>
                          <div className="space-y-1">
                            {project.awards.map((award, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-xs text-led-white/80">
                                <Award size={10} className="text-plasma-yellow" />
                                {award}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* All Impact Stats */}
                      {Object.keys(project.impact).length > 0 && (
                        <div className="mb-4">
                          <h4 className="gaming-mono text-xs font-bold text-laser-green mb-2">
                            IMPACTO:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(project.impact).map(([key, value]) => (
                              <div key={key} className={`text-center p-2 rounded ${config.tagBg}`}>
                                <div className="gaming-display text-sm font-bold text-laser-green">
                                  {value}
                                </div>
                                <div className="gaming-mono text-[10px] text-led-white/50 uppercase">
                                  {key}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={audioHelpers.playHover}
                            onClick={(e) => {
                              e.stopPropagation()
                              audioHelpers.playClick(true)
                              trackingHelpers.trackClick(`portfolio_demo_${project.id}`)
                            }}
                            className="flex-1 gaming-button text-xs py-2 text-center"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-1">
                              <ExternalLink size={14} />
                              VER DEMO
                            </span>
                          </motion.a>
                        )}
                        {project.caseStudyUrl && (
                          <motion.a
                            href={project.caseStudyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onMouseEnter={audioHelpers.playHover}
                            onClick={(e) => {
                              e.stopPropagation()
                              audioHelpers.playClick(false)
                              trackingHelpers.trackClick(`portfolio_case_study_${project.id}`)
                            }}
                            className={`flex-1 px-3 py-2 text-xs font-semibold text-electric-blue border border-electric-blue rounded hover:text-controller-black hover:bg-electric-blue transition-all duration-300 text-center`}
                          >
                            CASE STUDY
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center gaming-card p-4 sm:p-8 bg-gradient-to-r from-gaming-purple/20 to-neon-cyan/20 border-2 border-neon-cyan/50"
        >
          <h2 className="gaming-title text-xl sm:text-2xl lg:text-3xl font-bold text-neon-cyan mb-4">
            QUER UM SITE QUE TRAGA RESULTADOS ASSIM?
          </h2>
          <p className="text-lg text-led-white/80 mb-6 max-w-2xl mx-auto">
            Sua empresa também pode ter um site profissional que atrai clientes e gera vendas.
            Peça seu orçamento gratuito e sem compromisso.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contato"
              onClick={() => {
                audioHelpers.playClick(true)
                trackingHelpers.trackClick('portfolio_main_cta')
              }}
              onMouseEnter={audioHelpers.playHover}
              className="gaming-button text-lg px-8 py-4 text-center"
            >
              <span className="relative z-10">SOLICITAR ORÇAMENTO</span>
            </Link>
            
            <Link
              href="/servicos"
              onClick={() => {
                audioHelpers.playClick(false)
                trackingHelpers.trackClick('portfolio_services_link')
              }}
              onMouseEnter={audioHelpers.playHover}
              className="gaming-card px-8 py-4 text-lg font-semibold text-electric-blue border-electric-blue hover:text-controller-black hover:bg-electric-blue transition-all duration-300 text-center"
            >
              VER SERVIÇOS
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}