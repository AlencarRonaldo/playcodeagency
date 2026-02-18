'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Crown, 
  Shield, 
  Rocket,
  Check,
  X,
  Star,
  Trophy,
  Target,
  Brain,
  Globe,
  HeadphonesIcon,
  Zap
} from 'lucide-react'
import { useAudio, audioHelpers } from '@/lib/hooks/useAudio'
import { trackingHelpers } from '@/lib/hooks/useAchievements'
import CheckoutModal from '@/components/payment/CheckoutModal'
import { GAME_PLANS } from '@/lib/payments/plans-config'
import { GamePlan } from '@/lib/payments/types'

interface Plan {
  id: string
  name: string
  subtitle: string
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  price: {
    monthly: number
    yearly: number
    setup?: number
  }
  features: {
    name: string
    included: boolean
    description?: string
  }[]
  powerUps: string[]
  support: string
  projects: string
  revisions: string
  delivery: string
  popular?: boolean
  enterprise?: boolean
  isNew?: boolean
  icon: React.ElementType
  payment_links?: {
    monthly?: string
    yearly?: string
  }
}

interface AddOn {
  id: string
  name: string
  description: string
  price: number
  icon: React.ElementType
  category: 'development' | 'marketing' | 'support' | 'analytics'
  fullDescription?: string
  features?: string[]
  rarity?: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'
  level?: number
  stats?: {
    power: number
    efficiency: number
    innovation: number
  }
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    subtitle: 'Site para quem está começando',
    description: 'Landing page profissional perfeita para pequenas empresas e profissionais liberais',
    rarity: 'rare',
    price: {
      monthly: 797,
      yearly: 797
    },
    features: [
      { name: 'Landing Page Responsiva', included: true, description: 'Focado em vendas ou apresentação' },
      { name: 'SEO Básico', included: true, description: 'Otimização para mecanismos de busca' },
      { name: 'Formulário de Contato', included: true, description: 'Captação de leads básica' },
      { name: 'SSL Certificado', included: true, description: 'Segurança HTTPS' },
      { name: 'Analytics Básico', included: true, description: 'Google Analytics configurado' },
      { name: 'Hospedagem', included: false, description: 'Não incluído - Cliente contrata' },
      { name: 'Domínio', included: false, description: 'Não incluído - Cliente contrata' },
      { name: 'WhatsApp Integration', included: true, description: 'Botão flutuante configurado' },
      { name: 'E-commerce', included: false },
      { name: 'Blog/CMS', included: false },
      { name: 'Chatbot IA', included: false },
      { name: 'API Integrations', included: false }
    ],
    powerUps: ['HTML5', 'CSS3', 'JavaScript', 'SEO', 'WhatsApp'],
    support: '5x8 (dias úteis)',
    projects: '1 projeto',
    revisions: '2 rodadas',
    delivery: '7 dias',
    icon: Rocket,
    popular: true,
    payment_links: {
      monthly: 'https://pag.ae/7_SVzjRup',
      yearly: 'https://pag.ae/7_SVzjRup'
    }
  },
  {
    id: 'business-one',
    name: 'Business One',
    subtitle: 'Site profissional completo',
    description: 'Site responsivo one-page com todas as informações do seu negócio, ideal para atrair clientes',
    rarity: 'rare',
    price: {
      monthly: 1497,
      yearly: 1497
    },
    features: [
      { name: 'Website Profissional', included: true, description: '1 página dividida em seções personalizadas' },
      { name: 'SSL Certificado', included: true, description: 'Segurança HTTPS' },
      { name: 'Hospedagem', included: false, description: 'Não incluído - Cliente contrata' },
      { name: 'Domínio', included: false, description: 'Não incluído - Cliente contrata' },
      { name: 'Analytics Avançado', included: true, description: 'Google Analytics 4 configurado' },
      { name: 'Backup Automático', included: true, description: 'Proteção de dados semanal' },
      { name: 'WhatsApp Integration', included: true, description: 'Botão flutuante configurado' },
      { name: 'SEO Otimizado', included: true, description: 'Otimização on-page completa' },
      { name: 'Formulários Avançados', included: true, description: 'Captação de leads otimizada' },
      { name: 'Integração Redes Sociais', included: true, description: 'Facebook, Instagram, LinkedIn' },
      { name: 'Suporte Chat Online', included: true, description: 'Widget de chat integrado' },
      { name: 'E-commerce Básico', included: false },
      { name: 'API Integrations', included: false },
      { name: 'Chatbot IA', included: false },
      { name: 'Mobile App', included: false }
    ],
    powerUps: ['HTML5', 'CSS3', 'JavaScript', 'React', 'SEO', 'WhatsApp', 'Analytics'],
    support: '6x12 (seg-sáb)',
    projects: '1 one-page',
    revisions: '3 rodadas',
    delivery: '7 dias',
    popular: false,
    icon: Target,
    isNew: true, // Nova propriedade para o badge NOVO
    payment_links: {
      monthly: 'https://pag.ae/7_SVSPZ7H',
      yearly: 'https://pag.ae/7_SVSPZ7H'
    }
  },
  {
    id: 'professional',
    name: 'Pro Guild',
    subtitle: 'Para empresas em crescimento',
    description: 'Site completo com até 5 páginas, domínio e hospedagem incluídos. Tudo para sua empresa crescer online',
    rarity: 'rare',
    price: {
      monthly: 2497,
      yearly: 2497
    },
    features: [
      { name: 'Website Completo', included: true, description: 'Até 5 páginas personalizadas' },
      { name: 'Domínio Incluído', included: true, description: 'Registro .com.br por 1 ano' },
      { name: 'Hospedagem Anual', included: true, description: 'Hosting profissional por 1 ano' },
      { name: 'SSL Certificado', included: true, description: 'Segurança HTTPS' },
      { name: 'Analytics Avançado', included: true, description: 'Dashboards personalizados' },
      { name: 'Backup Automático', included: true, description: 'Proteção de dados' },
      { name: 'WhatsApp Integration', included: true, description: 'Botão flutuante configurado' },
      { name: 'SEO Avançado', included: true, description: 'Otimização técnica completa' },
      { name: 'Blog/CMS Avançado', included: false },
      { name: 'E-commerce Integrado', included: false },
      { name: 'Integração com APIs', included: false },
      { name: 'Chatbot IA', included: false },
      { name: 'Mobile App', included: false },
      { name: 'DevOps Avançado', included: false }
    ],
    powerUps: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'CMS', 'SEO', 'WhatsApp'],
    support: '7x12 (seg-dom)',
    projects: '2-3 projetos',
    revisions: '3 rodadas',
    delivery: '7 dias',
    popular: true,
    icon: Shield,
    payment_links: {
      monthly: 'https://pag.ae/7_SVAs4NL',
      yearly: 'https://pag.ae/7_SVAs4NL'
    }
  },
  {
    id: 'enterprise',
    name: 'Elite Force',
    subtitle: 'Para empresas consolidadas',
    description: 'Sistema web personalizado com IA, painel administrativo e automação para grandes operações',
    rarity: 'epic',
    price: {
      monthly: 7500,
      yearly: 75000
    },
    features: [
      { name: 'Plataforma Customizada', included: true, description: 'Solução sob medida' },
      { name: 'Integração de IA', included: true, description: 'Chatbot e automações inteligentes' },
      { name: 'Painel Administrativo', included: true, description: 'Sistema de gestão completo' },
      { name: 'DevOps Completo', included: true, description: 'CI/CD e monitoramento' },
      { name: 'Business Intelligence', included: true, description: 'Dashboards executivos' },
      { name: 'Security Audit', included: true, description: 'Auditoria de segurança' },
      { name: 'Load Balancing', included: true, description: 'Alta disponibilidade' },
      { name: 'Microservices', included: true, description: 'Arquitetura escalável' },
      { name: 'Infraestrutura Enterprise', included: true, description: 'Infraestrutura de alto desempenho' },
      { name: 'WhatsApp Integration', included: true, description: 'Botão flutuante configurado' },
      { name: 'SEO Avançado', included: true, description: 'Otimização técnica completa' },
      { name: 'Mobile App Nativo', included: false },
      { name: 'API Gateway', included: false },
      { name: 'White Label', included: false }
    ],
    powerUps: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'CMS', 'Database', 'AI/ML', 'Security', 'SEO', 'WhatsApp'],
    support: '24x7 (sempre)',
    projects: '5+ projetos',
    revisions: 'Ilimitadas',
    delivery: '8-16 semanas',
    icon: Crown,
    payment_links: {
      monthly: 'https://pag.ae/7_SVBsgNH',
      yearly: 'https://pag.ae/7_SVBsgNH'
    }
  },
  {
    id: 'legendary',
    name: 'Legendary Tier',
    subtitle: 'Parceria estratégica total',
    description: 'Equipe dedicada, sistema sob medida e tecnologia avançada para projetos de grande escala',
    rarity: 'legendary',
    price: {
      monthly: 15000,
      yearly: 150000,
      setup: 25000
    },
    features: [
      { name: 'Equipe Dedicada', included: true, description: 'Time exclusivo para seu projeto' },
      { name: 'Arquitetura Enterprise', included: true, description: 'Solução escalável ilimitada' },
      { name: 'IA Personalizada', included: true, description: 'Machine Learning customizado' },
      { name: 'Blockchain Integration', included: true, description: 'Web3 e contratos inteligentes' },
      { name: 'IoT Integration', included: true, description: 'Internet das Coisas' },
      { name: 'AR/VR Experiences', included: true, description: 'Realidade aumentada/virtual' },
      { name: 'Global CDN', included: true, description: 'Performance mundial' },
      { name: 'White Label', included: true, description: 'Marca própria' },
      { name: 'Strategic Consulting', included: true, description: 'Consultoria estratégica' },
      { name: 'Innovation Lab', included: true, description: 'P&D contínuo' },
      { name: 'WhatsApp Integration', included: true, description: 'Botão flutuante configurado' },
      { name: 'SEO Avançado', included: true, description: 'Otimização técnica completa' }
    ],
    powerUps: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'CMS', 'Database', 'AI/ML', 'Security', 'SEO', 'WhatsApp', 'Full Stack', 'Blockchain', 'IoT', 'AR/VR', 'DevOps'],
    support: 'Dedicado 24x7',
    projects: 'Ilimitados',
    revisions: 'Ilimitadas',
    delivery: 'Contínua',
    enterprise: true,
    icon: Rocket,
    payment_links: {
      // Para o plano Legendary, mantém vazio pois mostra "CONSULTAR"
      monthly: '',
      yearly: ''
    }
  }
]

const ADD_ONS: AddOn[] = [
  {
    id: 'chatbot-premium',
    name: 'AI Companion',
    description: 'Chatbot inteligente com processamento de linguagem natural',
    price: 1500,
    icon: Brain,
    category: 'development',
    rarity: 'legendary',
    level: 15,
    stats: { power: 95, efficiency: 88, innovation: 92 },
    fullDescription: 'Chatbot inteligente com IA ChatGPT integrada, capaz de responder perguntas complexas, fazer atendimento automatizado 24/7, integração com WhatsApp e sistema de tickets.',
    features: [
      'IA ChatGPT integrada',
      'Atendimento 24/7 automatizado',
      'Integração WhatsApp Business',
      'Sistema de tickets inteligente',
      'Treinamento personalizado',
      'Dashboard de analytics',
      'Histórico de conversas',
      'Respostas inteligentes'
    ]
  },
  {
    id: 'seo-boost',
    name: 'Search Master',
    description: 'Otimização SEO com IA para máxima visibilidade',
    price: 2800,
    icon: Target,
    category: 'marketing',
    rarity: 'common',
    level: 13,
    stats: { power: 82, efficiency: 90, innovation: 78 },
    fullDescription: 'Estratégia completa de SEO com auditoria técnica, pesquisa de palavras-chave, otimização on-page, criação de conteúdo otimizado e monitoramento de resultados.',
    features: [
      'Auditoria técnica completa',
      'Pesquisa de palavras-chave',
      'Otimização on-page',
      'Criação de conteúdo SEO',
      'Link building estratégico',
      'Monitoramento de rankings',
      'Relatórios mensais',
      'Google Analytics avançado'
    ]
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    description: 'Aplicativo multiplataforma para iOS e Android',
    price: 0,
    icon: Globe,
    category: 'development',
    rarity: 'epic',
    level: 20,
    stats: { power: 98, efficiency: 85, innovation: 95 },
    fullDescription: 'Desenvolvimento de aplicativo móvel multiplataforma para iOS e Android com design responsivo, sistema de notificações push e publicação nas lojas oficiais.',
    features: [
      'App multiplataforma',
      'Design responsivo premium',
      'Notificações push',
      'Recursos offline',
      'Publicação nas lojas',
      'Manutenção 6 meses',
      'Analytics integrado',
      'Performance otimizada'
    ]
  },
  {
    id: 'priority-support',
    name: 'Suporte Prioritário',
    description: 'Atendimento VIP com resposta em 1 hora',
    price: 800,
    icon: HeadphonesIcon,
    category: 'support',
    rarity: 'rare',
    level: 10,
    stats: { power: 75, efficiency: 95, innovation: 60 },
    fullDescription: 'Suporte técnico prioritário com atendimento em até 1 hora, acesso direto à equipe técnica, suporte por WhatsApp, email e telefone.',
    features: [
      'Resposta em até 1 hora',
      'Acesso direto à equipe',
      'WhatsApp, email e telefone',
      'Backup automático diário',
      'Monitoramento proativo',
      'Atualizações de segurança',
      'Relatórios de saúde',
      'Suporte 24/7'
    ]
  },
  {
    id: 'advanced-analytics',
    name: 'Mind Reader',
    description: 'Analytics inteligente com insights preditivos',
    price: 1650,
    icon: Star,
    category: 'analytics',
    rarity: 'mythic',
    level: 14,
    stats: { power: 88, efficiency: 92, innovation: 85 },
    fullDescription: 'Sistema avançado de analytics com dashboards interativos, relatórios automatizados, análise de comportamento do usuário e integração com ferramentas.',
    features: [
      'Dashboards interativos',
      'Relatórios automatizados',
      'Análise de comportamento',
      'Funis de conversão',
      'Métricas de engajamento',
      'Integração Google Analytics',
      'Facebook Pixel avançado',
      'ROI e métricas de negócio'
    ]
  }
]

const rarityConfig = {
  common: {
    border: 'border-led-white/40',
    glow: 'shadow-[0_0_15px_rgba(255,255,255,0.3)]',
    gradient: 'from-led-white/15 to-led-white/5',
    text: 'text-led-white',
    accent: 'text-led-white',
    bg: 'bg-led-white/5'
  },
  rare: {
    border: 'border-electric-blue/60',
    glow: 'shadow-[0_0_20px_rgba(0,212,255,0.4)]',
    gradient: 'from-electric-blue/25 to-electric-blue/10',
    text: 'text-electric-blue',
    accent: 'text-electric-blue',
    bg: 'bg-electric-blue/10'
  },
  epic: {
    border: 'border-gaming-purple/70',
    glow: 'shadow-[0_0_25px_rgba(139,92,246,0.5)]',
    gradient: 'from-gaming-purple/30 to-gaming-purple/15',
    text: 'text-gaming-purple',
    accent: 'text-gaming-purple',
    bg: 'bg-gaming-purple/15'
  },
  legendary: {
    border: 'border-plasma-yellow/80',
    glow: 'shadow-[0_0_30px_rgba(255,234,0,0.6)]',
    gradient: 'from-plasma-yellow/35 to-plasma-yellow/15',
    text: 'text-plasma-yellow',
    accent: 'text-plasma-yellow',
    bg: 'bg-plasma-yellow/15'
  },
  mythic: {
    border: 'border-laser-green/80',
    glow: 'shadow-[0_0_35px_rgba(34,197,94,0.7)]',
    gradient: 'from-laser-green/35 to-laser-green/15',
    text: 'text-laser-green',
    accent: 'text-laser-green',
    bg: 'bg-laser-green/15'
  }
}

export default function PlanosPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [mounted, setMounted] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [expandedPowerUp, setExpandedPowerUp] = useState<string | null>(null)
  const [checkoutModal, setCheckoutModal] = useState<{
    isOpen: boolean
    plan?: GamePlan
    billingCycle?: 'monthly' | 'annual'
  }>({ isOpen: false })
  const { playContextMusic } = useAudio()

  // Toggle card expansion
  const toggleCardExpansion = (planId: string) => {
    console.log('Toggling card:', planId, 'Current expanded card:', expandedCard)
    setExpandedCard(prev => {
      const newValue = prev === planId ? null : planId
      console.log('New expanded card value:', newValue)
      return newValue
    })
    audioHelpers.playClick(false)
  }

  // Toggle power-up expansion
  const togglePowerUpExpansion = (powerUpId: string) => {
    console.log('Toggling power-up:', powerUpId, 'Current expanded:', expandedPowerUp)
    setExpandedPowerUp(prev => {
      const newValue = prev === powerUpId ? null : powerUpId
      console.log('New expanded value:', newValue)
      return newValue
    })
    audioHelpers.playClick(false)
  }

  // Handle plan selection and open checkout
  const handlePlanSelection = (planId: string) => {
    const plan = PLANS.find(p => p.id === planId)
    
    // Se é o plano Legendary, abre WhatsApp para consulta
    if (planId === 'legendary') {
      const message = `🎮 Olá! Tenho interesse no plano *${plan?.name}* - Legendary Tier.

📋 *Detalhes:*
• ${plan?.description}
• Projetos: ${plan?.projects}
• Suporte: ${plan?.support}
• Recursos premium e ilimitados

Gostaria de agendar uma reunião para discutir um orçamento personalizado. Quando podemos conversar?`
      
      const whatsappUrl = `https://wa.me/5511956534963?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
      return
    }
    
    // Verifica se tem link de pagamento direto
    const currentCycle = billingCycle === 'yearly' ? 'yearly' : 'monthly'
    const paymentLink = plan?.payment_links?.[currentCycle]
    
    if (paymentLink) {
      // Redireciona para link direto do PagSeguro em uma nova aba segura
      const newWindow = window.open(paymentLink, '_blank', 'noopener,noreferrer');
      if (newWindow) {
        // Garante que a nova aba não tenha acesso à janela original
        newWindow.opener = null;
      }

    } else {
      // Fallback para o modal de checkout atual
      const gamePlan = GAME_PLANS.find(p => p.id === planId)
      if (gamePlan) {
        setCheckoutModal({
          isOpen: true,
          plan: gamePlan,
          billingCycle: billingCycle === 'yearly' ? 'annual' : 'monthly'
        })
      }
    }
  }

  const handleCloseCheckout = () => {
    setCheckoutModal({ isOpen: false })
  }

  // Enhanced badge animation styles
  const badgeStyles = `
    .badge-glow-popular {
      animation: popularGlow 2s ease-in-out infinite alternate, badgePulse 3s ease-in-out infinite;
    }
    .badge-glow-enterprise {
      animation: enterpriseGlow 2.5s ease-in-out infinite alternate, cyberpunkScan 4s linear infinite;
    }
    .badge-glow-new {
      animation: newBadgeGlow 2s ease-in-out infinite alternate, newBadgePulse 3s ease-in-out infinite;
    }
    @keyframes popularGlow {
      0% { box-shadow: 0 0 15px rgba(255, 234, 0, 0.6), 0 0 30px rgba(255, 234, 0, 0.4), 0 0 45px rgba(255, 234, 0, 0.2); }
      100% { box-shadow: 0 0 20px rgba(255, 234, 0, 0.8), 0 0 40px rgba(255, 234, 0, 0.6), 0 0 60px rgba(255, 234, 0, 0.4); }
    }
    @keyframes enterpriseGlow {
      0% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(236, 72, 153, 0.6), 0 0 60px rgba(139, 92, 246, 0.4); }
      100% { box-shadow: 0 0 30px rgba(236, 72, 153, 1), 0 0 60px rgba(236, 72, 153, 0.8), 0 0 90px rgba(139, 92, 246, 0.6); }
    }
    @keyframes newBadgeGlow {
      0% { box-shadow: 0 0 15px rgba(0, 212, 255, 0.7), 0 0 30px rgba(0, 212, 255, 0.5), 0 0 45px rgba(0, 212, 255, 0.3); }
      100% { box-shadow: 0 0 25px rgba(0, 212, 255, 0.9), 0 0 50px rgba(0, 212, 255, 0.7), 0 0 75px rgba(0, 212, 255, 0.5); }
    }
    @keyframes badgePulse {
      0%, 100% { transform: scale(1) rotate(2deg); }
      50% { transform: scale(1.05) rotate(1deg); }
    }
    @keyframes newBadgePulse {
      0%, 100% { transform: scale(1) rotate(-2deg); }
      50% { transform: scale(1.08) rotate(-1deg); }
    }
    @keyframes cyberpunkScan {
      0% { background-position: -100% 0; }
      100% { background-position: 100% 0; }
    }
  `

  useEffect(() => {
    setMounted(true)
    
    // Track page view
    trackingHelpers.trackPageView('/planos')
    
    // Music is now controlled by the MarioAutoPlay component globally
  }, [])

  // Removed unused handlePlanSelect function

  const handleBillingToggle = () => {
    audioHelpers.playNavigation()
    setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-console">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.playcodeagency.xyz" },
              { "@type": "ListItem", "position": 2, "name": "Planos e Preços", "item": "https://www.playcodeagency.xyz/planos" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Quanto tempo leva para criar um site profissional?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Um site simples (landing page) fica pronto em 7 dias. Sites com mais páginas levam de 2 a 4 semanas. Sistemas personalizados de 8 a 16 semanas, dependendo da complexidade."
                }
              },
              {
                "@type": "Question",
                "name": "O site funciona bem no celular?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim! Todos os nossos sites são 100% responsivos, ou seja, funcionam perfeitamente em celulares, tablets e computadores. Isso é essencial para o Google e para a experiência dos seus clientes."
                }
              },
              {
                "@type": "Question",
                "name": "Posso trocar de plano depois?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Com certeza! Você pode fazer upgrade a qualquer momento. Conforme sua empresa cresce, seu site cresce junto. Ajustamos os valores proporcionalmente."
                }
              },
              {
                "@type": "Question",
                "name": "Vocês fazem sites para quais tipos de empresa?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Atendemos pequenas empresas, profissionais liberais (advogados, psicólogos, coaches), restaurantes, lojas e empresas de serviços. Cada projeto é personalizado para o seu negócio."
                }
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Planos de Criação de Sites Profissionais",
            "description": "Quanto custa um site profissional? Planos de desenvolvimento web para empresas com preços transparentes, suporte dedicado e resultados garantidos",
            "brand": {
              "@type": "Organization",
              "name": "PlayCode Agency"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "Starter Pack",
                "description": "Landing page profissional e responsiva ideal para pequenas empresas e profissionais liberais",
                "price": "797",
                "priceCurrency": "BRL",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01",
                "priceValidUntil": "2024-12-31",
                "itemCondition": "https://schema.org/NewCondition"
              },
              {
                "@type": "Offer",
                "name": "Business One",
                "description": "Site profissional responsivo one-page para empresas que querem atrair mais clientes online",
                "price": "1497",
                "priceCurrency": "BRL",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01",
                "priceValidUntil": "2024-12-31",
                "itemCondition": "https://schema.org/NewCondition"
              },
              {
                "@type": "Offer",
                "name": "Pro Guild", 
                "description": "Site completo com até 5 páginas, domínio e hospedagem para empresas em crescimento",
                "price": "2497",
                "priceCurrency": "BRL",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-01-01",
                "priceValidUntil": "2024-12-31",
                "itemCondition": "https://schema.org/NewCondition"
              }
            ]
          })
        }}
      />
      {/* Enhanced Badge Animations CSS */}
      <style jsx>{badgeStyles}</style>

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
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-neon-cyan hidden sm:block" />
            <h1 className="gaming-title text-2xl sm:text-4xl lg:text-6xl font-bold text-neon-cyan neon-glow">
              QUANTO CUSTA UM SITE PROFISSIONAL
            </h1>
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-neon-cyan hidden sm:block" />
          </div>

          <p className="gaming-subtitle text-base sm:text-xl lg:text-2xl text-led-white/80 max-w-4xl mx-auto mb-6 sm:mb-8">
            Planos de <strong>criação de sites profissionais</strong> e <strong>desenvolvimento web</strong> para
            cada fase do seu negócio. Do site simples ao sistema completo, com preços transparentes.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className={`gaming-mono text-sm font-bold ${billingCycle === 'monthly' ? 'text-neon-cyan' : 'text-led-white/60'}`}>
              MENSAL
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={audioHelpers.playHover}
              onClick={handleBillingToggle}
              className="relative w-16 h-8 bg-led-white/20 rounded-full border border-neon-cyan/50 hover:border-neon-cyan transition-all duration-300"
            >
              <motion.div
                animate={{ x: billingCycle === 'yearly' ? 32 : 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-neon-cyan rounded-full shadow-lg"
              />
            </motion.button>
            <span className={`gaming-mono text-sm font-bold ${billingCycle === 'yearly' ? 'text-neon-cyan' : 'text-led-white/60'}`}>
              ANUAL
            </span>
            {billingCycle === 'yearly' && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-3 py-1 bg-laser-green/20 border border-laser-green/50 rounded-full gaming-mono text-xs font-bold text-laser-green"
              >
                💰 SAVE 15%
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
          {PLANS.map((plan, index) => {
            const config = rarityConfig[plan.rarity]
            const PlanIcon = plan.icon
            const currentPrice = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -8 }}
                className={`
                  relative gaming-card cursor-pointer overflow-visible
                  bg-gradient-to-br ${config.gradient}
                  border-2 ${config.border}
                  hover:${config.glow}
                  transition-all duration-300
                  ${plan.popular ? 'ring-2 ring-plasma-yellow/50 ring-offset-2 ring-offset-transparent' : ''}
                  ${plan.enterprise ? 'ring-2 ring-magenta-power/50 ring-offset-2 ring-offset-transparent' : ''}
                `}
                onMouseEnter={audioHelpers.playHover}
              >
                {/* Popular Badge - Maximum Visibility Cyberpunk Design */}
                {plan.popular && (
                  <div className="absolute -top-3 -right-3 z-50">
                    <div className="relative group">
                      {/* Reduzido: glow effect mais suave */}
                      <div className="absolute inset-0 bg-plasma-yellow/30 rounded-xl blur-xl animate-pulse scale-110"></div>
                      <div className="absolute inset-0 bg-yellow-300/20 rounded-xl blur-lg animate-pulse scale-125"></div>
                      
                      {/* Card darkening overlay for contrast */}
                      <div className="absolute -inset-20 bg-black/15 rounded-xl pointer-events-none"></div>
                      
                      {/* Main badge - medium size */}
                      <div className="relative badge-glow-popular bg-gradient-to-r from-plasma-yellow via-yellow-300 to-amber-400 text-controller-black px-4 py-2 gaming-mono text-xs font-black shadow-[0_4px_12px_rgba(255,234,0,0.8)] transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-500 border-2 border-yellow-200 rounded-md">
                        {/* Inner shine effect reduzido */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60 animate-pulse rounded-lg"></div>
                        
                        {/* Scanning line effect reduzido */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent h-full animate-pulse bg-size-200 bg-pos-x-minus-100"></div>
                        
                        <div className="relative flex items-center gap-1">
                          <span className="text-sm animate-bounce">🔥</span>
                          <span className="tracking-wide font-extrabold">POPULAR</span>
                          <span className="text-sm animate-bounce animation-delay-300">⚡</span>
                        </div>
                        
                        {/* Multiple glow borders reduzidos */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-plasma-yellow to-yellow-300 rounded-lg opacity-25 blur-sm"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-lg opacity-15 blur-md"></div>
                      </div>
                      
                      {/* Enhanced ribbon fold with dramatic shadow */}
                      <div className="absolute top-0 right-0 w-0 h-0 border-l-[16px] border-l-yellow-700 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent transform translate-x-4 drop-shadow-2xl"></div>
                      
                      {/* Multiple pulsing rings */}
                      <div className="absolute inset-0 border-3 border-plasma-yellow rounded-lg animate-ping opacity-50"></div>
                      <div className="absolute inset-0 border-2 border-yellow-300 rounded-lg animate-ping opacity-30 animation-delay-500"></div>
                      <div className="absolute inset-0 border-1 border-amber-400 rounded-lg animate-ping opacity-20 animation-delay-1000"></div>
                    </div>
                  </div>
                )}

                {/* Enterprise Badge - Maximum Impact Premium Design */}
                {plan.enterprise && (
                  <div className="absolute -top-3 -right-3 z-50">
                    <div className="relative group">
                      {/* Ultra-wide cyberpunk glow */}
                      <div className="absolute inset-0 bg-magenta-power/70 rounded-xl blur-2xl animate-pulse scale-125"></div>
                      <div className="absolute inset-0 bg-purple-500/50 rounded-xl blur-xl animate-pulse scale-150"></div>
                      <div className="absolute inset-0 bg-violet-400/30 rounded-xl blur-2xl animate-pulse scale-175"></div>
                      
                      {/* Card darkening overlay for contrast */}
                      <div className="absolute -inset-20 bg-black/25 rounded-xl pointer-events-none"></div>
                      
                      {/* Main enterprise badge - medium size */}
                      <div className="relative badge-glow-enterprise bg-gradient-to-r from-magenta-power via-purple-500 to-violet-600 text-white px-4 py-2 gaming-mono text-xs font-black shadow-[0_6px_20px_rgba(236,72,153,1)] transform -rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-500 border-2 border-pink-200 rounded-md">
                        {/* Neon inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-80 animate-pulse rounded-lg"></div>
                        
                        {/* Cyberpunk glitch effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent h-full animate-pulse"></div>
                        
                        <div className="relative flex items-center gap-1">
                          <span className="text-sm animate-bounce">👑</span>
                          <span className="tracking-wide font-extrabold">ENTERPRISE</span>
                          <span className="text-sm animate-bounce animation-delay-300">💎</span>
                        </div>
                        
                        {/* Multiple neon glow borders */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-magenta-power to-purple-500 rounded-lg opacity-40 blur-sm"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg opacity-30 blur-md"></div>
                        <div className="absolute -inset-3 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-lg opacity-20 blur-lg"></div>
                      </div>
                      
                      {/* Enhanced ribbon fold with dramatic neon shadow */}
                      <div className="absolute top-0 left-0 w-0 h-0 border-r-[16px] border-r-purple-900 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent transform -translate-x-4 drop-shadow-2xl"></div>
                      
                      {/* Glitch-style multiple rings with different timings */}
                      <div className="absolute inset-0 border-3 border-magenta-power rounded-lg animate-ping opacity-50"></div>
                      <div className="absolute inset-0 border-2 border-purple-400 rounded-lg animate-ping opacity-30 animation-delay-300"></div>
                      <div className="absolute inset-0 border-2 border-violet-400 rounded-lg animate-ping opacity-20 animation-delay-600"></div>
                      <div className="absolute inset-0 border-1 border-indigo-400 rounded-lg animate-ping opacity-15 animation-delay-900"></div>
                    </div>
                  </div>
                )}

                {/* NEW Badge - Cyberpunk Style for Business One */}
                {plan.isNew && (
                  <div className="absolute -top-3 -right-3 z-50">
                    <div className="relative group">
                      {/* Cyberpunk glow effect */}
                      <div className="absolute inset-0 bg-electric-blue/40 rounded-xl blur-xl animate-pulse scale-110"></div>
                      <div className="absolute inset-0 bg-neon-cyan/30 rounded-xl blur-lg animate-pulse scale-125"></div>
                      
                      {/* Card darkening overlay for contrast */}
                      <div className="absolute -inset-20 bg-black/10 rounded-xl pointer-events-none"></div>
                      
                      {/* Main NEW badge - medium size */}
                      <div className="relative badge-glow-new bg-gradient-to-r from-electric-blue via-neon-cyan to-electric-blue text-controller-black px-4 py-2 gaming-mono text-xs font-black shadow-[0_4px_12px_rgba(0,212,255,0.7)] transform -rotate-2 hover:rotate-0 hover:scale-110 transition-all duration-500 border-2 border-cyan-200 rounded-md">
                        {/* Inner cyberpunk shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70 animate-pulse rounded-lg"></div>
                        
                        {/* Cyberpunk scanning line effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent h-full animate-pulse bg-size-200 bg-pos-x-minus-100"></div>
                        
                        <div className="relative flex items-center gap-1">
                          <span className="text-sm animate-bounce">⚡</span>
                          <span className="tracking-wide font-extrabold">NOVO</span>
                          <span className="text-sm animate-bounce animation-delay-300">🆕</span>
                        </div>
                        
                        {/* Multiple cyberpunk glow borders */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue to-neon-cyan rounded-lg opacity-30 blur-sm"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan to-electric-blue rounded-lg opacity-20 blur-md"></div>
                      </div>
                      
                      {/* Enhanced ribbon fold with cyberpunk shadow */}
                      <div className="absolute top-0 left-0 w-0 h-0 border-r-[14px] border-r-cyan-700 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent transform -translate-x-3 drop-shadow-2xl"></div>
                      
                      {/* Multiple pulsing rings with cyberpunk colors */}
                      <div className="absolute inset-0 border-2 border-electric-blue rounded-lg animate-ping opacity-50"></div>
                      <div className="absolute inset-0 border-2 border-neon-cyan rounded-lg animate-ping opacity-30 animation-delay-500"></div>
                      <div className="absolute inset-0 border-1 border-cyan-400 rounded-lg animate-ping opacity-20 animation-delay-1000"></div>
                    </div>
                  </div>
                )}

                {/* Rarity Badge - Enhanced with better positioning */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`
                    px-3 py-1.5 rounded-lg text-xs font-bold gaming-mono uppercase
                    ${config.text} ${config.border} border-2 bg-gradient-to-r ${config.gradient}
                    shadow-[0_2px_8px_rgba(0,0,0,0.3)] backdrop-blur-sm
                    transform hover:scale-105 transition-transform duration-200
                  `}>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-current opacity-60"></span>
                      {plan.rarity}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Plan Icon */}
                  <div className={`
                    w-16 h-16 mx-auto mb-4 rounded-xl
                    bg-gradient-to-br ${config.gradient}
                    border ${config.border}
                    flex items-center justify-center
                  `}>
                    <PlanIcon size={32} className={config.text} />
                  </div>

                  {/* Plan Info */}
                  <div className="text-center mb-6">
                    <h3 className={`gaming-title text-xl font-bold mb-1 ${config.text}`}>
                      {plan.name}
                    </h3>
                    <p className="gaming-mono text-sm text-neon-cyan mb-2">
                      {plan.subtitle}
                    </p>
                    <p className="text-xs text-led-white/70 mb-4">
                      {plan.description}
                    </p>
                    
                    {/* Pricing */}
                    <div className="mb-4">
                      {plan.id === 'legendary' ? (
                        <>
                          <div className={`gaming-display text-3xl font-bold mb-1 ${config.text}`}>
                            CONSULTAR
                          </div>
                          <div className="gaming-mono text-xs text-led-white/60">
                            valor sob medida
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`gaming-display text-2xl font-bold mb-1 ${config.text}`}>
                            12x R$ {Math.ceil(currentPrice / 12).toLocaleString()}
                          </div>
                          <div className="gaming-mono text-xs text-led-white/60">
                            ou R$ {currentPrice.toLocaleString()} à vista
                          </div>
                          {plan.price.setup && plan.price.setup > 0 && (
                            <div className="gaming-mono text-xs text-led-white/50 mt-1">
                              + R$ {plan.price.setup.toLocaleString()} setup
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Key Stats - Always visible */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center">
                      <div className={`gaming-display text-sm font-bold ${config.text}`}>
                        {plan.projects}
                      </div>
                      <div className="gaming-mono text-xs text-led-white/60">
                        PROJETOS
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`gaming-display text-sm font-bold ${config.text}`}>
                        {plan.delivery}
                      </div>
                      <div className="gaming-mono text-xs text-led-white/60">
                        ENTREGA
                      </div>
                    </div>
                  </div>

                  {/* Select Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={audioHelpers.playHover}
                    onClick={(e) => {
                      e.stopPropagation()
                      audioHelpers.playClick(true)
                      trackingHelpers.trackClick(`plan_cta_${plan.id}`)
                      handlePlanSelection(plan.id)
                    }}
                    className="w-full px-4 py-3 rounded-md gaming-mono text-sm font-bold mb-3 gaming-button"
                  >
                    <span className="relative z-10 whitespace-nowrap">ESCOLHER PLANO</span>
                  </motion.button>

                  {/* Toggle Expansion Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={audioHelpers.playHover}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCardExpansion(plan.id)
                    }}
                    className={`
                      w-full px-4 py-2 rounded-md gaming-mono text-xs font-bold
                      border ${config.border} ${config.text} hover:${config.bg} 
                      transition-all duration-200 flex items-center justify-center gap-2
                    `}
                  >
                    {expandedCard === plan.id ? (
                      <>
                        <span>FECHAR</span>
                        <motion.div
                          animate={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▼
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <span>VER RECURSOS</span>
                        <motion.div
                          animate={{ rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▼
                        </motion.div>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: expandedCard === plan.id ? 'auto' : 0,
                    opacity: expandedCard === plan.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {expandedCard === plan.id && (
                    <div className="border-t border-led-white/20 p-6 space-y-4">
                      {/* Power-ups Complete List */}
                      <div>
                        <h4 className="gaming-mono text-sm font-bold text-neon-cyan mb-3 flex items-center gap-2">
                          TECNOLOGIAS INCLUÍDAS:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {plan.powerUps.map((powerUp, idx) => (
                            <span
                              key={idx}
                              className={`px-3 py-1 rounded text-xs gaming-mono ${config.text} border ${config.border} ${config.bg}`}
                            >
                              {powerUp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features Complete List */}
                      <div>
                        <h4 className="gaming-mono text-sm font-bold text-electric-blue mb-3 flex items-center gap-2">
                          📋 RECURSOS COMPLETOS:
                        </h4>
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm">
                              {feature.included ? (
                                <Check size={16} className="text-laser-green mt-0.5 flex-shrink-0" />
                              ) : (
                                <X size={16} className="text-led-white/40 mt-0.5 flex-shrink-0" />
                              )}
                              <div className={feature.included ? 'text-led-white' : 'text-led-white/40'}>
                                <div className="font-medium">{feature.name}</div>
                                {feature.description && (
                                  <div className="text-xs text-led-white/60 mt-1">
                                    {feature.description}
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Support & Service Info */}
                      <div className="bg-led-white/5 rounded-lg p-4">
                        <h5 className="gaming-mono text-sm font-bold text-gaming-purple mb-3">
                          🛡️ SUPORTE & SERVIÇOS:
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-led-white/60">Suporte:</span>
                            <div className={`font-bold ${config.text}`}>{plan.support}</div>
                          </div>
                          <div>
                            <span className="text-led-white/60">Revisões:</span>
                            <div className={`font-bold ${config.text}`}>{plan.revisions}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>


                {/* Circuit Pattern */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="circuit-pattern opacity-5 w-full h-full" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="gaming-title text-3xl lg:text-4xl font-bold text-neon-cyan mb-4 neon-glow">
              POTENCIALIZE SEU SITE COM EXTRAS
            </h2>
            <p className="gaming-subtitle text-lg text-led-white/80 max-w-3xl mx-auto">
              Adicione funcionalidades que fazem seu site trabalhar ainda mais para atrair clientes e gerar vendas.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {ADD_ONS.map((addon, index) => {
              const AddonIcon = addon.icon
              const config = rarityConfig[addon.rarity || 'common']
              return (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -8
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative group cursor-pointer
                    bg-gradient-to-br ${config.gradient}
                    backdrop-blur-xl border-2 ${config.border}
                    rounded-xl p-6 transition-all duration-300
                    hover:${config.glow}
                  `}
                  onMouseEnter={() => {
                    audioHelpers.playHover()
                    trackingHelpers.trackHover(`addon_${addon.id}`)
                  }}
                >
                  {/* Rarity Indicator */}
                  <div className="absolute top-3 right-3">
                    <div className={`
                      px-2 py-1 rounded-md text-xs font-bold gaming-mono uppercase
                      ${config.text} ${config.border} border
                      ${config.gradient} bg-gradient-to-r
                    `}>
                      {addon.rarity}
                    </div>
                  </div>

                  {/* Power-up Icon */}
                  <div className={`
                    w-16 h-16 mx-auto mb-4 rounded-xl
                    bg-gradient-to-br ${config.gradient}
                    border ${config.border}
                    flex items-center justify-center
                    group-hover:animate-powerup
                  `}>
                    <AddonIcon size={32} className={config.text} />
                  </div>

                  {/* Power-up Info */}
                  <div className="text-center mb-4">
                    <h3 className={`gaming-title text-lg font-bold mb-2 ${config.text}`}>
                      {addon.name}
                    </h3>
                    <p className="gaming-subtitle text-sm text-led-white/70 mb-3">
                      {addon.description}
                    </p>
                    
                    {/* Level Indicator */}
                    {addon.level && (
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <span className="gaming-mono text-xs text-led-white/50">LVL</span>
                        <span className={`gaming-display text-lg font-bold ${config.text}`}>
                          {addon.level}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stats Bars */}
                  {addon.stats && (
                    <div className="space-y-2 mb-4">
                      {Object.entries(addon.stats).map(([statName, value]) => (
                        <div key={statName} className="flex items-center justify-between">
                          <span className="gaming-mono text-xs text-led-white/60 uppercase w-20">
                            {statName}
                          </span>
                          <div className="flex-1 mx-2">
                            <div className="hud-bar h-2">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${config.gradient.replace('/15', '/60').replace('/5', '/40')}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${value}%` }}
                                transition={{ duration: 1, delay: 0.3 }}
                              />
                            </div>
                          </div>
                          <span className={`gaming-mono text-xs ${config.text} w-8 text-right`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="border-t border-led-white/20 pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="gaming-mono text-sm font-bold text-laser-green">
                        {addon.price === 0 ? 'CONSULTAR' : `R$ ${addon.price.toLocaleString()}`}
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          px-4 py-2 rounded-md gaming-mono text-xs font-bold
                          border ${config.border} ${config.text}
                          hover:bg-gradient-to-r ${config.gradient.replace('/15', '/20').replace('/5', '/10')}
                          transition-all duration-200
                        `}
                        onMouseEnter={audioHelpers.playHover}
                        onClick={(e) => {
                          e.stopPropagation()
                          audioHelpers.playClick(false)
                          trackingHelpers.trackClick(`addon_choose_${addon.id}`)
                          trackingHelpers.trackPowerUpSelect(addon.id)
                          
                          // Open WhatsApp with interest message
                          const message = addon.price === 0 
                            ? `🎮 Olá! Tenho interesse no power-up *${addon.name}*.

📋 *Detalhes:*
• ${addon.description}
• Valor: Sob consulta (personalizado conforme necessidade)
${addon.level ? `• Level: ${addon.level}` : ''}

Gostaria de agendar uma conversa para discutir os requisitos e receber um orçamento personalizado. Quando podemos conversar?`
                            : `🎮 Olá! Tenho interesse no power-up *${addon.name}* por R$ ${addon.price.toLocaleString()}.

📋 *Detalhes:*
• ${addon.description}
• Valor: R$ ${addon.price.toLocaleString()}
${addon.level ? `• Level: ${addon.level}` : ''}

Gostaria de saber mais informações e como proceder com a contratação. Quando podemos conversar?`
                          
                          const whatsappUrl = `https://wa.me/5511956534963?text=${encodeURIComponent(message)}`
                          window.open(whatsappUrl, '_blank')
                        }}
                      >
                        ESCOLHER
                      </motion.button>
                    </div>

                    {/* Ver Detalhes Button */}
                    {(addon.fullDescription || addon.features) && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          w-full px-3 py-2 rounded-md gaming-mono text-xs font-bold
                          border ${config.border} ${config.text} bg-transparent
                          hover:${config.gradient.replace('/15', '/20').replace('/5', '/10')} hover:bg-gradient-to-r
                          transition-all duration-200
                          ${expandedPowerUp === addon.id ? 'border-opacity-100' : 'border-opacity-50'}
                        `}
                        onMouseEnter={audioHelpers.playHover}
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('Button clicked for addon:', addon.id)
                          togglePowerUpExpansion(addon.id)
                          trackingHelpers.trackClick(`addon_details_${addon.id}`)
                        }}
                      >
                        {expandedPowerUp === addon.id ? 'OCULTAR DETALHES' : 'VER DETALHES'}
                      </motion.button>
                    )}
                  </div>

                  {/* Expanded Details */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: expandedPowerUp === addon.id ? 'auto' : 0,
                      opacity: expandedPowerUp === addon.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    {expandedPowerUp === addon.id && (addon.fullDescription || addon.features) && (
                      <div className="border-t border-led-white/10 pt-4 mt-4">
                        {/* Full Description */}
                        {addon.fullDescription && (
                          <div className="mb-4">
                            <h4 className={`gaming-mono text-xs font-bold ${config.text} mb-2 uppercase`}>
                              Descrição Completa
                            </h4>
                            <p className="gaming-subtitle text-xs text-led-white/80 leading-relaxed">
                              {addon.fullDescription}
                            </p>
                          </div>
                        )}

                        {/* Features List */}
                        {addon.features && addon.features.length > 0 && (
                          <div>
                            <h4 className={`gaming-mono text-xs font-bold ${config.text} mb-2 uppercase`}>
                              Recursos Inclusos
                            </h4>
                            <div className="space-y-1">
                              {addon.features.map((feature, index) => (
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
                    bg-gradient-to-br ${config.gradient.replace('/15', '/5').replace('/5', '/2')}
                    transition-opacity duration-300 pointer-events-none
                  `} />

                  {/* Circuit Pattern */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className="circuit-pattern opacity-20 w-full h-full" />
                  </div>

                  {/* Power-up Particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 ${config.text} rounded-full`}
                        initial={{
                          x: Math.random() * 200,
                          y: Math.random() * 200,
                          opacity: 0
                        }}
                        animate={{
                          y: [null, -50],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 3,
                          ease: 'linear'
                        }}
                        style={{
                          boxShadow: `0 0 4px currentColor`
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Comparison Table - Gaming Matrix Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="gaming-title text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-neon-cyan">COMPARATIVO</span>
              <br />
              <span className="text-electric-blue">DE PLANOS</span>
            </h2>
            <p className="gaming-subtitle text-lg text-led-white/80 max-w-3xl mx-auto">
              Compare recursos e funcionalidades para escolher o plano ideal
            </p>
          </div>

          {/* Gaming Matrix Table */}
          <div className="gaming-card p-3 sm:p-6 bg-gradient-to-b from-controller-black/90 to-controller-black/70 border-2 border-electric-blue/50 overflow-x-auto -mx-4 sm:mx-0 rounded-none sm:rounded-xl">
            {/* Matrix Header */}
            <div className="grid grid-cols-6 gap-4 mb-6 p-4 bg-gradient-to-r from-electric-blue/20 to-neon-cyan/20 rounded-lg border border-electric-blue/30">
              <div className="gaming-mono text-xs font-bold text-electric-blue uppercase">
                ESPECIFICAÇÕES
              </div>
              {PLANS.map(plan => (
                <div key={plan.id} className="text-center">
                  <div className={`gaming-title text-sm font-bold mb-1 ${rarityConfig[plan.rarity].text}`}>
                    {plan.name}
                  </div>
                  <div className={`text-xs gaming-mono uppercase px-2 py-1 rounded ${rarityConfig[plan.rarity].bg} ${rarityConfig[plan.rarity].border} border`}>
                    {plan.rarity}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Stats Section */}
            <div className="mb-8">
              <h3 className="gaming-title text-lg font-bold text-laser-green mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                DADOS PRINCIPAIS
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'PROJETOS', key: 'projects' },
                  { label: 'SUPORTE', key: 'support' },
                  { label: 'REVISÕES', key: 'revisions' },
                  { label: 'ENTREGA', key: 'delivery' }
                ].map((stat, idx) => (
                  <div key={idx} className="grid grid-cols-6 gap-4 py-2 border-b border-led-white/10 hover:bg-electric-blue/5 transition-all duration-200">
                    <div className="gaming-mono text-sm font-bold text-led-white/90 flex items-center">
                      {stat.label}
                    </div>
                    {PLANS.map(plan => (
                      <div key={plan.id} className="text-center">
                        <span className={`text-sm font-bold ${rarityConfig[plan.rarity].text}`}>
                          {plan[stat.key as keyof Plan] as string}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Power-ups Section */}
            <div className="mb-8">
              <h3 className="gaming-title text-lg font-bold text-gaming-purple mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                TECNOLOGIAS INCLUÍDAS
              </h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="gaming-mono text-sm font-bold text-led-white/90">
                  TECNOLOGIAS
                </div>
                {PLANS.map(plan => (
                  <div key={plan.id} className="space-y-2">
                    {plan.powerUps.map((powerUp, idx) => (
                      <div key={idx} className={`
                        text-xs gaming-mono px-2 py-1 rounded-md text-center
                        ${rarityConfig[plan.rarity].bg} ${rarityConfig[plan.rarity].border} border
                        ${rarityConfig[plan.rarity].text}
                      `}>
                        {powerUp}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Features Battle Grid */}
            <div className="mb-6">
              <h3 className="gaming-title text-lg font-bold text-neon-cyan mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                RECURSOS POR PLANO
              </h3>
              
              {/* Categorized Features */}
              {[
                {
                  category: 'DESENVOLVIMENTO',
                  icon: '⚔️',
                  features: [
                    'Landing Page Responsiva',
                    'Website Completo',
                    'Plataforma Customizada',
                    'Equipe Dedicada'
                  ]
                },
                {
                  category: 'HOSTING & INFRA',
                  icon: '🏰',
                  features: [
                    'Hospedagem 6 Meses Incluída',
                    'Hospedagem Anual',
                    'Infraestrutura Enterprise',
                    'Arquitetura Enterprise',
                    'Global CDN'
                  ]
                },
                {
                  category: 'SEO & MARKETING',
                  icon: '🎯',
                  features: [
                    'SEO Básico',
                    'SEO Avançado',
                    'WhatsApp Integration',
                    'Business Intelligence',
                    'Strategic Consulting'
                  ]
                },
                {
                  category: 'ADVANCED TECH',
                  icon: '🚀',
                  features: [
                    'Blog/CMS Avançado',
                    'E-commerce Integrado',
                    'Integração de IA',
                    'IA Personalizada',
                    'Blockchain Integration',
                    'IoT Integration',
                    'AR/VR Experiences'
                  ]
                },
                {
                  category: 'SECURITY & SUPPORT',
                  icon: '🛡️',
                  features: [
                    'SSL Certificado',
                    'Analytics Básico',
                    'Analytics Avançado',
                    'Backup Automático',
                    'Security Audit',
                    'Load Balancing',
                    'DevOps Completo',
                    'Innovation Lab'
                  ]
                }
              ].map((section, sectionIdx) => (
                <div key={sectionIdx} className="mb-6">
                  <h4 className="gaming-mono text-sm font-bold text-electric-blue mb-3 flex items-center gap-2">
                    <span>{section.icon}</span>
                    {section.category}
                  </h4>
                  <div className="space-y-2">
                    {section.features.map((featureName, featureIdx) => {
                      // Find this feature in each plan
                      const featureRow = PLANS.map(plan => {
                        const feature = plan.features.find(f => f.name === featureName)
                        return feature?.included || false
                      })
                      
                      return (
                        <div key={featureIdx} className="grid grid-cols-6 gap-4 py-2 hover:bg-led-white/5 transition-all duration-200">
                          <div className="text-sm text-led-white/80">
                            {featureName}
                          </div>
                          {featureRow.map((included, planIdx) => (
                            <div key={planIdx} className="text-center">
                              {included ? (
                                <Check size={18} className="text-laser-green mx-auto animate-pulse" />
                              ) : (
                                <X size={18} className="text-led-white/30 mx-auto" />
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Battle Verdict */}
            <div className="text-center p-6 bg-gradient-to-r from-gaming-purple/20 to-neon-cyan/20 rounded-lg border border-neon-cyan/30">
              <h3 className="gaming-title text-xl font-bold text-neon-cyan mb-2">
                ESCOLHA O PLANO CERTO
              </h3>
              <p className="gaming-subtitle text-sm text-led-white/80">
                Cada plano foi pensado para diferentes estágios e necessidades do seu negócio
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="gaming-title text-3xl font-bold text-neon-cyan mb-4">
              PERGUNTAS FREQUENTES
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                question: 'Quanto tempo leva para criar um site profissional?',
                answer: 'Um site simples (landing page) fica pronto em 7 dias. Sites com mais páginas levam de 2 a 4 semanas. Sistemas personalizados de 8 a 16 semanas, dependendo da complexidade.'
              },
              {
                question: 'O site funciona bem no celular?',
                answer: 'Sim! Todos os nossos sites são 100% responsivos, ou seja, funcionam perfeitamente em celulares, tablets e computadores. Isso é essencial para o Google e para a experiência dos seus clientes.'
              },
              {
                question: 'Posso trocar de plano depois?',
                answer: 'Com certeza! Você pode fazer upgrade a qualquer momento. Conforme sua empresa cresce, seu site cresce junto. Ajustamos os valores proporcionalmente.'
              },
              {
                question: 'Vocês fazem sites para quais tipos de empresa?',
                answer: 'Atendemos pequenas empresas, profissionais liberais (advogados, psicólogos, coaches), restaurantes, lojas e empresas de serviços. Cada projeto é personalizado para o seu negócio.'
              }
            ].map((faq, index) => (
              <div key={index} className="gaming-card p-4 sm:p-6">
                <h3 className="gaming-title text-base sm:text-lg font-bold text-neon-cyan mb-3">
                  {faq.question}
                </h3>
                <p className="text-sm text-led-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center gaming-card p-4 sm:p-8 bg-gradient-to-r from-gaming-purple/20 to-neon-cyan/20 border-2 border-neon-cyan/50"
        >
          <h2 className="gaming-title text-xl sm:text-2xl lg:text-3xl font-bold text-neon-cyan mb-4">
            NÃO SABE QUAL PLANO É IDEAL PARA VOCÊ?
          </h2>
          <p className="text-lg text-led-white/80 mb-6 max-w-2xl mx-auto">
            Fale com um especialista da PlayCode e receba uma recomendação personalizada
            para o seu tipo de negócio. Sem compromisso e sem termos técnicos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={audioHelpers.playHover}
              onClick={() => {
                audioHelpers.playClick(true)
                trackingHelpers.trackClick('plans_main_cta')
                
                // Open WhatsApp with specialist message
                const message = `🎮 Olá! Gostaria de falar com um especialista sobre os planos da PlayCode Agency.

📋 *Interesse:*
• Quero entender qual plano é ideal para meu negócio
• Tenho dúvidas sobre funcionalidades e recursos
• Gostaria de um orçamento personalizado

Quando podemos conversar para discutir minha necessidade?`
                
                const whatsappUrl = `https://wa.me/5511956534963?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, '_blank')
              }}
              className="gaming-button text-lg px-8 py-4"
            >
              <span className="relative z-10">FALAR COM ESPECIALISTA</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={audioHelpers.playHover}
              onClick={() => {
                audioHelpers.playClick(false)
                trackingHelpers.trackClick('plans_portfolio_link')
              }}
              className="gaming-card px-8 py-4 text-lg font-semibold text-electric-blue border-electric-blue hover:text-controller-black hover:bg-electric-blue transition-all duration-300"
            >
              VER PORTFÓLIO
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      {checkoutModal.plan && (
        <CheckoutModal
          isOpen={checkoutModal.isOpen}
          onClose={handleCloseCheckout}
          plan={checkoutModal.plan}
          billingCycle={checkoutModal.billingCycle}
        />
      )}
    </main>
  )
}