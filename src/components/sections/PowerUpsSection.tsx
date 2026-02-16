'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Bot, MenuSquare, Globe, ShoppingCart, Workflow, Search } from 'lucide-react'
import PowerUpCard from '@/components/gaming/PowerUpCard'
import { trackingHelpers } from '@/lib/hooks/useAchievements'
import { audioHelpers } from '@/lib/hooks/useAudio'

const powerUps = [
  {
    id: 'sites_landing',
    name: 'Sites e Landing Pages',
    description: 'Sites profissionais e landing pages de alta conversão que transformam visitantes em clientes',
    icon: Globe,
    rarity: 'epic' as const,
    level: 14,
    stats: { power: 90, efficiency: 95, innovation: 88 },
    price: 'A partir de R$ 997',
    fullDescription: 'Criamos sites institucionais e landing pages otimizadas com IA, entregues em até 7 dias. Design responsivo, SEO integrado e foco total em conversão. Ideal para empresas, profissionais liberais e prestadores de serviço que precisam de presença digital profissional.',
    features: [
      'Entrega em 7 dias (landing) ou 2-4 semanas (site completo)',
      'Design responsivo mobile-first',
      'SEO otimizado para Google',
      'Formulários de contato e WhatsApp',
      'Hospedagem e domínio inclusos no 1° ano',
      'Painel para editar textos e imagens',
      'Certificado SSL (HTTPS) grátis',
      'Integração Google Analytics'
    ]
  },
  {
    id: 'ai_chatbot',
    name: 'Chatbot WhatsApp com IA',
    description: 'Atendimento automático 24h no WhatsApp que responde, qualifica leads e vende por você',
    icon: Bot,
    rarity: 'legendary' as const,
    level: 16,
    stats: { power: 96, efficiency: 92, innovation: 98 },
    price: 'R$ 1.497 + R$ 297/mês',
    fullDescription: 'Chatbot inteligente com IA (GPT) integrado ao WhatsApp da sua empresa. Atende clientes 24h, responde dúvidas, qualifica leads e agenda reuniões automaticamente. O serviço mais procurado de 2026 — sua empresa vendendo enquanto você dorme.',
    features: [
      'IA treinada com dados do seu negócio',
      'Integração WhatsApp Business',
      'Atendimento automático 24/7',
      'Qualificação inteligente de leads',
      'Agendamento automático de reuniões',
      'Dashboard com métricas de atendimento',
      'Transferência para humano quando necessário',
      'Respostas personalizadas por contexto'
    ]
  },
  {
    id: 'ecommerce',
    name: 'Loja Virtual / E-commerce',
    description: 'Sua loja online completa com catálogo, carrinho, Pix e cartão — pronta para vender',
    icon: ShoppingCart,
    rarity: 'epic' as const,
    level: 15,
    stats: { power: 92, efficiency: 88, innovation: 90 },
    price: 'A partir de R$ 3.997',
    fullDescription: 'E-commerce completo e personalizado para sua empresa vender online. Catálogo de produtos, carrinho de compras, pagamento via Pix e cartão, controle de estoque e painel administrativo. Tudo integrado e pronto para receber pedidos.',
    features: [
      'Catálogo de produtos ilimitado',
      'Pagamento Pix, cartão e boleto',
      'Controle de estoque automático',
      'Painel administrativo completo',
      'Cálculo de frete integrado',
      'Design responsivo e rápido',
      'SEO para produtos no Google',
      'Integração com marketplaces'
    ]
  },
  {
    id: 'digital_menu',
    name: 'Cardápio Digital QR Code',
    description: 'Cardápio ou catálogo online acessível pelo celular do cliente com QR Code — atualização em tempo real',
    icon: MenuSquare,
    rarity: 'rare' as const,
    level: 12,
    stats: { power: 85, efficiency: 92, innovation: 80 },
    price: 'R$ 697 + R$ 97/mês',
    fullDescription: 'Cardápio digital responsivo para restaurantes, bares, cafeterias e delivery. Seu cliente escaneia o QR Code e vê o menu completo no celular. Você atualiza preços e pratos em tempo real pelo painel, sem precisar reimprimir nada.',
    features: [
      'QR Code personalizado com sua marca',
      'Atualização de preços em tempo real',
      'Fotos dos pratos em alta qualidade',
      'Categorias e filtros inteligentes',
      'Pedidos direto pelo WhatsApp',
      'Destaque para promoções do dia',
      'Funciona em qualquer celular',
      'Painel fácil de gerenciar'
    ]
  },
  {
    id: 'ai_automation',
    name: 'Automação e Agentes de IA',
    description: 'Automatize tarefas repetitivas e tenha agentes de IA trabalhando pelo seu negócio 24h',
    icon: Workflow,
    rarity: 'mythic' as const,
    level: 18,
    stats: { power: 98, efficiency: 96, innovation: 99 },
    price: 'R$ 1.997 + R$ 397/mês',
    fullDescription: 'A grande tendência de 2026: agentes de IA autônomos que executam tarefas pela sua empresa. Automatize follow-up de leads, geração de propostas, postagens em redes sociais, relatórios e muito mais. Conectamos suas ferramentas com IA inteligente usando n8n, Make e APIs.',
    features: [
      'Agentes de IA autônomos personalizados',
      'Automação de follow-up e vendas',
      'Geração automática de propostas',
      'Integração com suas ferramentas atuais',
      'Postagens automáticas em redes sociais',
      'Relatórios gerados por IA',
      'Workflows personalizados (n8n/Make)',
      'Redução de até 80% em tarefas manuais'
    ]
  },
  {
    id: 'seo_google',
    name: 'SEO e Presença no Google',
    description: 'Apareça na primeira página do Google e nas buscas por IA — atraia clientes que procuram seus serviços',
    icon: Search,
    rarity: 'rare' as const,
    level: 13,
    stats: { power: 85, efficiency: 90, innovation: 82 },
    price: 'A partir de R$ 997/mês',
    fullDescription: 'Estratégia completa de SEO + GEO (otimização para buscas por IA como ChatGPT e Google AI). Sua empresa aparece quando potenciais clientes pesquisam por serviços como os seus. Inclui otimização técnica, conteúdo estratégico e relatórios mensais de resultado.',
    features: [
      'Auditoria SEO técnica completa',
      'Otimização para Google e buscas por IA (GEO)',
      'Pesquisa de palavras-chave lucrativas',
      'Criação de conteúdo otimizado com IA',
      'Google Meu Negócio otimizado',
      'Relatórios mensais de posicionamento',
      'Link building estratégico',
      'Monitoramento de concorrentes'
    ]
  }
]

export default function PowerUpsSection() {
  const [expandedPowerUp, setExpandedPowerUp] = useState<string | null>(null)

  const togglePowerUpExpansion = (powerUpId: string) => {
    setExpandedPowerUp(prev => prev === powerUpId ? null : powerUpId)
    audioHelpers.playClick(false)
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Slogan Simples */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="gaming-mono text-lg font-bold text-plasma-yellow">
              SOLUÇÕES DIGITAIS QUE AUMENTAM SUAS VENDAS
            </div>
          </motion.div>

          <h2 className="gaming-title text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-neon-cyan">SERVIÇOS DE</span>
            <br />
            <span className="text-magenta-power">DESENVOLVIMENTO WEB</span>
          </h2>

          <p className="gaming-subtitle text-xl text-led-white/80 max-w-3xl mx-auto mb-8">
            <strong>Sites profissionais</strong>, <strong>chatbots WhatsApp com IA</strong>, <strong>lojas virtuais</strong>,
            <strong> automação inteligente</strong> e <strong>SEO</strong>. Tudo criado com inteligência artificial
            para entregar mais rápido, com mais qualidade e preços acessíveis.
          </p>

          {/* Collection Stats */}
          <div className="flex justify-center space-x-8">
            <div className="hud-element text-center px-6 py-3">
              <div className="gaming-display text-2xl font-bold text-laser-green">
                {powerUps.length}
              </div>
              <div className="gaming-mono text-xs text-led-white/60">
                SERVIÇOS DIGITAIS
              </div>
            </div>
            
            <div className="hud-element text-center px-6 py-3">
              <div className="gaming-display text-2xl font-bold text-electric-blue">
                40+
              </div>
              <div className="gaming-mono text-xs text-led-white/60">
                CLIENTES SATISFEITOS
              </div>
            </div>
            
            <div className="hud-element text-center px-6 py-3">
              <div className="gaming-display text-2xl font-bold text-plasma-yellow">
                10
              </div>
              <div className="gaming-mono text-xs text-led-white/60">
                ANOS EXPERIÊNCIA
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rarity Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="gaming-card p-4">
            <div className="flex flex-wrap justify-center gap-3">
              {['all', 'mythic', 'legendary', 'epic', 'rare'].map((filter) => (
                <button
                  key={filter}
                  className={`
                    px-4 py-2 rounded-md gaming-mono text-sm font-bold uppercase
                    transition-all duration-200 border
                    ${filter === 'all' 
                      ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10' 
                      : 'border-led-white/30 text-led-white/70 hover:border-neon-cyan hover:text-neon-cyan'
                    }
                  `}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Power-ups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {powerUps.map((powerUp, index) => (
            <motion.div
              key={powerUp.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: 'easeOut'
              }}
              viewport={{ once: true }}
            >
              <PowerUpCard
                {...powerUp}
                isExpanded={expandedPowerUp === powerUp.id}
                onToggleExpansion={() => togglePowerUpExpansion(powerUp.id)}
                onSelect={() => {
                  console.log(`Selected power-up: ${powerUp.name}`)
                  trackingHelpers.trackPowerUpSelect(powerUp.id)
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="gaming-card p-8 max-w-2xl mx-auto">
            <h3 className="gaming-title text-2xl font-bold mb-4 text-gaming-purple">
              NÃO SABE POR ONDE COMEÇAR?
            </h3>

            <p className="gaming-subtitle text-led-white/80 mb-6">
              Fale com nossa equipe e receba uma <strong>consultoria gratuita</strong> para
              entender qual solução de <strong>desenvolvimento web</strong> é ideal para o seu negócio.
              Sem compromisso, sem termos técnicos complicados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contato"
                onClick={() => {
                  audioHelpers.playClick(true)
                  trackingHelpers.trackClick('powerups_configure_project')
                }}
                onMouseEnter={audioHelpers.playHover}
                className="gaming-button text-lg px-8 py-4 text-center"
              >
                <span className="relative z-10">SOLICITAR ORÇAMENTO</span>
              </Link>
              
              <Link
                href="/combos"
                onClick={() => {
                  audioHelpers.playClick(false)
                  trackingHelpers.trackClick('powerups_view_combos')
                }}
                onMouseEnter={audioHelpers.playHover}
                className="gaming-card px-8 py-4 text-lg font-semibold text-electric-blue border-electric-blue hover:text-controller-black hover:bg-electric-blue transition-all duration-300 text-center"
              >
                VER PLANOS E PREÇOS
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Achievement System Preview - appears and auto-hides */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: [0, 1, 1, 0], x: [50, 0, 0, 50] }}
          transition={{ duration: 5, times: [0, 0.15, 0.7, 1], delay: 1 }}
          className="fixed bottom-20 right-4 z-30 pointer-events-none"
        >
          <div className="gaming-card p-4 max-w-xs border-laser-green bg-laser-green/10">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🏆</div>
              <div>
                <div className="gaming-mono text-xs text-laser-green font-bold">
                  ACHIEVEMENT UNLOCKED
                </div>
                <div className="gaming-mono text-xs text-led-white">
                  Power-up Explorer +50 XP
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}