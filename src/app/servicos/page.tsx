'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Globe,
  ShoppingCart,
  Bot,
  Rocket,
  Code,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  MenuSquare,
  Workflow,
  Search
} from 'lucide-react'
import { useAudio, audioHelpers } from '@/lib/hooks/useAudio'
import { trackingHelpers } from '@/lib/hooks/useAchievements'

interface Service {
  id: string
  name: string
  description: string
  icon: React.ElementType
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'
  features: string[]
  technologies: string[]
  deliverables: string[]
  timeline: string
  price: string
  priceNote?: string
  highlighted?: boolean
}

const SERVICES: Service[] = [
  {
    id: 'sites-landing',
    name: 'Sites e Landing Pages',
    description: 'Sites profissionais e landing pages de alta conversão que transformam visitantes em clientes reais',
    icon: Globe,
    rarity: 'epic',
    features: [
      'Design responsivo mobile-first',
      'SEO otimizado para Google',
      'Formulários de contato e WhatsApp',
      'Hospedagem e domínio inclusos no 1° ano',
      'Painel para editar textos e imagens',
      'Certificado SSL (HTTPS) grátis'
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    deliverables: ['Site publicado e funcionando', 'Painel administrativo', 'QR Code e materiais digitais', 'Treinamento de uso'],
    timeline: '7 dias (landing) / 2-4 semanas (site)',
    price: 'A partir de R$ 997',
    priceNote: 'Landing page R$ 997 | Site completo R$ 2.997+',
    highlighted: true
  },
  {
    id: 'ai-chatbot',
    name: 'Chatbot WhatsApp com IA',
    description: 'Atendimento automático 24h no WhatsApp que responde, qualifica leads e vende por você',
    icon: Bot,
    rarity: 'legendary',
    features: [
      'IA treinada com dados do seu negócio',
      'Integração WhatsApp Business',
      'Atendimento automático 24/7',
      'Qualificação inteligente de leads',
      'Agendamento automático de reuniões',
      'Transferência para humano quando necessário'
    ],
    technologies: ['OpenAI GPT', 'WhatsApp API', 'LangChain', 'Node.js', 'Dashboard Analytics'],
    deliverables: ['Chatbot configurado e treinado', 'Integração WhatsApp ativa', 'Dashboard de métricas', 'Treinamento da equipe'],
    timeline: '1-2 semanas',
    price: 'R$ 1.497 + R$ 297/mês',
    priceNote: 'Setup único + mensalidade com suporte e atualizações',
    highlighted: true
  },
  {
    id: 'ecommerce',
    name: 'Loja Virtual / E-commerce',
    description: 'Sua loja online completa com catálogo, carrinho, Pix e cartão — pronta para vender',
    icon: ShoppingCart,
    rarity: 'epic',
    features: [
      'Catálogo de produtos ilimitado',
      'Pagamento Pix, cartão e boleto',
      'Controle de estoque automático',
      'Painel administrativo completo',
      'Cálculo de frete integrado',
      'SEO para produtos no Google'
    ],
    technologies: ['Next.js', 'Stripe/MercadoPago', 'React', 'TypeScript', 'API REST'],
    deliverables: ['Loja online publicada', 'Painel de gestão', 'Integração de pagamentos', 'Treinamento completo'],
    timeline: '3-6 semanas',
    price: 'A partir de R$ 3.997',
    priceNote: 'Inclui setup de pagamentos e primeiros 50 produtos'
  },
  {
    id: 'digital-menu',
    name: 'Cardápio Digital QR Code',
    description: 'Cardápio ou catálogo online no celular do cliente — atualização em tempo real, sem reimprimir',
    icon: MenuSquare,
    rarity: 'rare',
    features: [
      'QR Code personalizado com sua marca',
      'Atualização de preços em tempo real',
      'Fotos dos pratos em alta qualidade',
      'Categorias e filtros inteligentes',
      'Pedidos direto pelo WhatsApp',
      'Destaque para promoções do dia'
    ],
    technologies: ['Next.js', 'React', 'QR Code API', 'WhatsApp Integration', 'Cloud Storage'],
    deliverables: ['Cardápio digital publicado', 'QR Codes impressos', 'Painel de gestão', 'Treinamento de uso'],
    timeline: '5-7 dias',
    price: 'R$ 697 + R$ 97/mês',
    priceNote: 'Setup + mensalidade com hospedagem e atualizações ilimitadas'
  },
  {
    id: 'ai-automation',
    name: 'Automação e Agentes de IA',
    description: 'Automatize tarefas repetitivas com agentes de IA que trabalham pelo seu negócio 24h',
    icon: Workflow,
    rarity: 'legendary',
    features: [
      'Agentes de IA autônomos personalizados',
      'Automação de follow-up e vendas',
      'Geração automática de propostas',
      'Integração com suas ferramentas atuais',
      'Postagens automáticas em redes sociais',
      'Redução de até 80% em tarefas manuais'
    ],
    technologies: ['OpenAI GPT', 'n8n', 'Make/Zapier', 'WhatsApp API', 'APIs Personalizadas'],
    deliverables: ['Workflows automatizados', 'Agentes de IA configurados', 'Integrações ativas', 'Documentação e treinamento'],
    timeline: '1-3 semanas',
    price: 'R$ 1.997 + R$ 397/mês',
    priceNote: 'Setup + mensalidade com manutenção e novos workflows',
    highlighted: true
  },
  {
    id: 'seo-google',
    name: 'SEO e Presença no Google',
    description: 'Apareça na 1ª página do Google e nas buscas por IA — atraia clientes que procuram seus serviços',
    icon: Search,
    rarity: 'rare',
    features: [
      'Auditoria SEO técnica completa',
      'Otimização para Google e buscas por IA (GEO)',
      'Pesquisa de palavras-chave lucrativas',
      'Criação de conteúdo otimizado com IA',
      'Google Meu Negócio otimizado',
      'Relatórios mensais de posicionamento'
    ],
    technologies: ['Google Analytics', 'Search Console', 'SEMrush', 'IA para Conteúdo', 'Schema.org'],
    deliverables: ['Relatório de auditoria', 'Plano de ação SEO', 'Conteúdos otimizados', 'Relatórios mensais'],
    timeline: 'Resultados em 2-4 meses',
    price: 'A partir de R$ 997/mês',
    priceNote: 'Plano mensal com relatórios e otimização contínua'
  }
]

const rarityConfig = {
  common: {
    border: 'border-led-white/30',
    glow: 'shadow-[0_0_10px_rgba(255,255,255,0.3)]',
    gradient: 'from-led-white/10 to-led-white/5',
    text: 'text-led-white',
    accent: 'text-led-white'
  },
  rare: {
    border: 'border-electric-blue/60',
    glow: 'shadow-[0_0_15px_rgba(0,212,255,0.4)]',
    gradient: 'from-electric-blue/20 to-electric-blue/10',
    text: 'text-electric-blue',
    accent: 'text-electric-blue'
  },
  epic: {
    border: 'border-gaming-purple/70',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.5)]',
    gradient: 'from-gaming-purple/25 to-gaming-purple/10',
    text: 'text-gaming-purple',
    accent: 'text-gaming-purple'
  },
  legendary: {
    border: 'border-plasma-yellow/80',
    glow: 'shadow-[0_0_25px_rgba(255,234,0,0.6)]',
    gradient: 'from-plasma-yellow/30 to-plasma-yellow/10',
    text: 'text-plasma-yellow',
    accent: 'text-plasma-yellow'
  },
  mythic: {
    border: 'border-laser-green/90',
    glow: 'shadow-[0_0_35px_rgba(34,197,94,0.9)]',
    gradient: 'from-laser-green/30 to-laser-green/10',
    text: 'text-laser-green',
    accent: 'text-laser-green'
  }
}

export default function ServicosPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { playContextMusic } = useAudio()

  useEffect(() => {
    setMounted(true)
    
    // Track page view
    trackingHelpers.trackPageView('/servicos')
    
    // Play ambient music
    // Music is now controlled by the MarioAutoPlay component globally
  }, [])

  const handleServiceSelect = (serviceId: string) => {
    audioHelpers.playPowerUpSelect()
    trackingHelpers.trackClick(`service_${serviceId}`)
    setSelectedService(selectedService === serviceId ? null : serviceId)
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
              { "@type": "ListItem", "position": 2, "name": "Serviços", "item": "https://www.playcodeagency.xyz/servicos" }
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
                "name": "Quanto custa criar um site profissional?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Na PlayCode Agency, sites profissionais começam a partir de R$ 997 para landing pages e R$ 2.997+ para sites completos com múltiplas páginas. O valor depende da complexidade e funcionalidades desejadas."
                }
              },
              {
                "@type": "Question",
                "name": "Em quanto tempo meu site fica pronto?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Landing pages ficam prontas em 7 dias. Sites completos de 2 a 4 semanas. E-commerce de 3 a 6 semanas. Sistemas personalizados de 8 a 16 semanas."
                }
              },
              {
                "@type": "Question",
                "name": "O chatbot WhatsApp com IA funciona 24 horas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim! O chatbot com inteligência artificial atende seus clientes 24 horas por dia, 7 dias por semana, respondendo perguntas, qualificando leads e agendando reuniões automaticamente."
                }
              },
              {
                "@type": "Question",
                "name": "Vocês fazem sites responsivos para celular?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sim, todos os nossos sites são 100% responsivos e mobile-first. Funcionam perfeitamente em celulares, tablets e computadores, garantindo a melhor experiência para seus clientes."
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
            "@type": "Service",
            "provider": {
              "@type": "Organization",
              "name": "PlayCode Agency",
              "url": "https://www.playcodeagency.xyz"
            },
            "serviceType": "Desenvolvimento de Sites Profissionais e Aplicações Web",
            "description": "Criação de sites responsivos, desenvolvimento web para empresas, sistemas personalizados e aplicações web sob medida",
            "areaServed": "BR",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Serviços de Desenvolvimento",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Sites e Landing Pages Profissionais",
                    "description": "Criação de sites responsivos e landing pages de alta conversão a partir de R$ 997"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Chatbot WhatsApp com Inteligência Artificial",
                    "description": "Atendimento automático 24h no WhatsApp com IA que qualifica leads e vende por você"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Loja Virtual e E-commerce",
                    "description": "E-commerce completo com catálogo, carrinho, pagamento Pix e cartão a partir de R$ 3.997"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Automação e Agentes de IA",
                    "description": "Agentes de IA autônomos que automatizam vendas, follow-up e tarefas repetitivas da sua empresa"
                  }
                }
              ]
            }
          })
        }}
      />
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
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-neon-cyan hidden sm:block" />
            <h1 className="gaming-title text-2xl sm:text-4xl lg:text-6xl font-bold text-neon-cyan neon-glow">
              DESENVOLVIMENTO DE SITES PROFISSIONAIS E SISTEMAS WEB
            </h1>
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-neon-cyan hidden sm:block" />
          </div>

          <p className="gaming-subtitle text-base sm:text-xl lg:text-2xl text-led-white/80 max-w-4xl mx-auto mb-6 sm:mb-8">
            <strong>Sites profissionais</strong>, <strong>chatbots com IA</strong>, <strong>e-commerce</strong>,
            <strong> automação inteligente</strong> e <strong>SEO</strong> — tudo criado com inteligência artificial
            para entregar mais rápido e com qualidade superior. Preços reais, sem surpresas.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-12"
          >
            <div className="text-center">
              <div className="gaming-display text-3xl font-bold text-laser-green">40+</div>
              <div className="gaming-mono text-sm text-led-white/60">PROJETOS</div>
            </div>
            <div className="text-center">
              <div className="gaming-display text-3xl font-bold text-plasma-yellow">40+</div>
              <div className="gaming-mono text-sm text-led-white/60">CLIENTES</div>
            </div>
            <div className="text-center">
              <div className="gaming-display text-3xl font-bold text-magenta-power">24/7</div>
              <div className="gaming-mono text-sm text-led-white/60">SUPORTE</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
          {SERVICES.map((service, index) => {
            const config = rarityConfig[service.rarity]
            const isSelected = selectedService === service.id
            const Icon = service.icon

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -8 }}
                className={`
                  relative gaming-card cursor-pointer
                  bg-gradient-to-br ${config.gradient}
                  border-2 ${config.border}
                  hover:${config.glow}
                  transition-all duration-300
                  ${isSelected ? `${config.glow} scale-105` : ''}
                  ${service.highlighted ? 'ring-2 ring-plasma-yellow/50' : ''}
                `}
                onClick={() => handleServiceSelect(service.id)}
                onMouseEnter={audioHelpers.playHover}
              >
                {/* Highlighted Badge */}
                {service.highlighted && (
                  <div className="absolute -top-3 -right-3 bg-plasma-yellow text-controller-black px-3 py-1 rounded-full gaming-mono text-xs font-bold">
                    ⭐ POPULAR
                  </div>
                )}

                {/* Rarity Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`
                    px-2 py-1 rounded-md text-xs font-bold gaming-mono uppercase
                    ${config.text} ${config.border} border
                    ${config.gradient} bg-gradient-to-r
                  `}>
                    {service.rarity}
                  </div>
                </div>

                <div className="p-6">
                  {/* Service Icon */}
                  <div className={`
                    w-16 h-16 mx-auto mb-4 rounded-xl
                    bg-gradient-to-br ${config.gradient}
                    border ${config.border}
                    flex items-center justify-center
                  `}>
                    <Icon size={32} className={config.text} />
                  </div>

                  {/* Service Info */}
                  <div className="text-center mb-6">
                    <h3 className={`gaming-title text-xl font-bold mb-3 ${config.text}`}>
                      {service.name}
                    </h3>
                    <p className="gaming-subtitle text-sm text-led-white/70 mb-4">
                      {service.description}
                    </p>
                    
                    {/* Price */}
                    <div className={`text-center mb-3 gaming-display text-lg font-bold ${config.text}`}>
                      {service.price}
                    </div>

                    {/* Timeline */}
                    <div className="text-center mb-4">
                      <span className="gaming-mono text-xs text-led-white/60">
                        {service.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
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
                    {isSelected ? 'FECHAR DETALHES' : 'VER DETALHES'}
                    <ArrowRight 
                      size={16} 
                      className={`transform transition-transform ${isSelected ? 'rotate-90' : ''}`} 
                    />
                  </motion.button>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-led-white/20 p-6 overflow-hidden"
                  >
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="gaming-mono text-sm font-bold text-neon-cyan mb-3">
                        🚀 RECURSOS INCLUSOS:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-led-white/80">
                            <CheckCircle size={16} className="text-laser-green mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="gaming-mono text-sm font-bold text-electric-blue mb-3">
                        ⚡ TECNOLOGIAS:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-electric-blue/20 border border-electric-blue/30 rounded text-xs gaming-mono text-electric-blue"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-6">
                      <h4 className="gaming-mono text-sm font-bold text-magenta-power mb-3">
                        📦 ENTREGÁVEIS:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.deliverables.map((deliverable, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-led-white/80">
                            <Star size={12} className="text-magenta-power" />
                            {deliverable}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Details */}
                    {service.priceNote && (
                      <div className={`mb-6 p-3 rounded-lg border ${config.border} bg-gradient-to-r ${config.gradient}`}>
                        <div className={`gaming-mono text-sm font-bold ${config.text} mb-1`}>
                          💰 {service.price}
                        </div>
                        <div className="gaming-mono text-xs text-led-white/60">
                          {service.priceNote}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onMouseEnter={audioHelpers.playHover}
                      onClick={(e) => {
                        e.stopPropagation()
                        audioHelpers.playClick(true)
                        trackingHelpers.trackClick(`service_cta_${service.id}`)
                        
                        // Navigate to contact page with service context
                        window.location.href = `/contato?servico=${service.id}`
                      }}
                      className="w-full gaming-button text-sm py-3 mb-2"
                    >
                      <span className="relative z-10">SOLICITAR ORÇAMENTO</span>
                    </motion.button>
                  </motion.div>
                )}

                {/* Circuit Pattern */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  <div className="circuit-pattern opacity-10 w-full h-full" />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="gaming-title text-3xl lg:text-4xl font-bold text-neon-cyan mb-8 neon-glow">
            COMO FUNCIONA O DESENVOLVIMENTO DO SEU SITE
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: Target, title: '1. ENTENDEMOS', desc: 'Ouvimos o que sua empresa precisa e definimos a melhor solução juntos' },
              { icon: Code, title: '2. CRIAMOS', desc: 'Desenvolvemos seu site ou sistema com design moderno e responsivo' },
              { icon: Rocket, title: '3. ENTREGAMOS', desc: 'Publicamos tudo funcionando e pronto para receber seus clientes' },
              { icon: Users, title: '4. CUIDAMOS', desc: 'Oferecemos suporte contínuo para que tudo funcione perfeitamente' }
            ].map((step, index) => {
              const StepIcon = step.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="gaming-card p-6 text-center hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-neon-cyan/20 border border-neon-cyan/50 rounded-xl flex items-center justify-center">
                    <StepIcon size={32} className="text-neon-cyan" />
                  </div>
                  <h3 className="gaming-display text-lg font-bold text-neon-cyan mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-led-white/70">
                    {step.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="gaming-title text-3xl lg:text-4xl font-bold text-neon-cyan mb-4 neon-glow">
              PERGUNTAS FREQUENTES SOBRE NOSSOS SERVIÇOS
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                question: 'Quanto custa criar um site profissional?',
                answer: 'Na PlayCode Agency, sites profissionais começam a partir de R$ 997 para landing pages e R$ 2.997+ para sites completos. O valor depende da complexidade e funcionalidades desejadas.'
              },
              {
                question: 'Em quanto tempo meu site fica pronto?',
                answer: 'Landing pages ficam prontas em 7 dias. Sites completos de 2 a 4 semanas. E-commerce de 3 a 6 semanas. Sistemas personalizados de 8 a 16 semanas.'
              },
              {
                question: 'O chatbot WhatsApp com IA funciona 24 horas?',
                answer: 'Sim! O chatbot com inteligência artificial atende seus clientes 24/7, respondendo perguntas, qualificando leads e agendando reuniões automaticamente.'
              },
              {
                question: 'Vocês fazem sites responsivos para celular?',
                answer: 'Sim, todos os nossos sites são 100% responsivos e mobile-first. Funcionam perfeitamente em celulares, tablets e computadores.'
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
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center gaming-card p-4 sm:p-8 bg-gradient-to-r from-gaming-purple/20 to-neon-cyan/20 border-2 border-neon-cyan/50"
        >
          <h2 className="gaming-title text-2xl lg:text-3xl font-bold text-neon-cyan mb-4">
            SUA EMPRESA MERECE UM SITE PROFISSIONAL
          </h2>
          <p className="text-lg text-led-white/80 mb-6 max-w-2xl mx-auto">
            Peça um orçamento sem compromisso e descubra como um site bem feito pode
            trazer mais clientes e aumentar suas vendas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={audioHelpers.playHover}
              onClick={() => {
                audioHelpers.playClick(true)
                trackingHelpers.trackClick('services_main_cta')
                
                // Navigate to contact page
                window.location.href = '/contato'
              }}
              className="gaming-button text-lg px-8 py-4"
            >
              <span className="relative z-10">SOLICITAR ORÇAMENTO GRÁTIS</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={audioHelpers.playHover}
              onClick={() => {
                audioHelpers.playClick(false)
                trackingHelpers.trackClick('services_portfolio_link')
                window.location.href = '/portfolio'
              }}
              className="gaming-card px-8 py-4 text-lg font-semibold text-electric-blue border-electric-blue hover:text-controller-black hover:bg-electric-blue transition-all duration-300"
            >
              VER PORTFÓLIO
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}