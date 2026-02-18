'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Globe,
  ShoppingCart,
  Cpu,
  BarChart3,
  Package,
  Users,
  Bot,
  Workflow,
  Check,
  MapPin,
  Clock,
  HeadphonesIcon,
  DollarSign,
  TrendingUp,
  ChevronDown,
  MessageCircle,
  Shield,
  Award,
  Zap,
} from 'lucide-react'
import { audioHelpers } from '@/lib/hooks/useAudio'
import { trackingHelpers } from '@/lib/hooks/useAchievements'

/* ── Dados ── */

const servicos = [
  {
    icon: Globe,
    title: 'Criação de Sites Profissionais',
    desc: 'Desenvolvemos sites institucionais, landing pages e portfólios totalmente responsivos, otimizados para Google e projetados para converter visitantes em clientes reais.',
  },
  {
    icon: ShoppingCart,
    title: 'Lojas Virtuais e E-commerce',
    desc: 'E-commerce completo com catálogo de produtos, carrinho de compras, pagamento via Pix e cartão, controle de estoque integrado e painel administrativo intuitivo.',
  },
  {
    icon: Cpu,
    title: 'Sistemas Empresariais Personalizados',
    desc: 'Aplicações web sob medida para automatizar processos internos da sua empresa, eliminar retrabalho e aumentar a produtividade da equipe no dia a dia.',
  },
  {
    icon: BarChart3,
    title: 'CRM sob Medida e Relatórios',
    desc: 'CRM personalizado para gerenciar clientes, acompanhar negociações e gerar relatórios gerenciais com dados em tempo real para decisões mais inteligentes.',
  },
  {
    icon: Package,
    title: 'Controle de Estoque e Cadastros',
    desc: 'Sistemas completos de gestão de estoque, cadastro de produtos, fornecedores e clientes — tudo integrado e acessível de qualquer dispositivo.',
  },
  {
    icon: Bot,
    title: 'Chatbots com IA para WhatsApp',
    desc: 'Atendimento automático 24 horas no WhatsApp com inteligência artificial treinada especificamente para responder dúvidas e qualificar leads do seu negócio.',
  },
  {
    icon: Workflow,
    title: 'Automações Empresariais',
    desc: 'Automatize follow-ups de vendas, envio de propostas comerciais, postagens em redes sociais e outras tarefas repetitivas com agentes de IA e workflows inteligentes.',
  },
]

const beneficios = [
  { icon: Clock, text: 'Entrega em até 7 dias para landing pages' },
  { icon: HeadphonesIcon, text: 'Atendimento rápido e personalizado' },
  { icon: MessageCircle, text: 'Suporte técnico disponível 24/7' },
  { icon: DollarSign, text: 'Projetos a partir de R$ 797' },
  { icon: TrendingUp, text: 'Foco total em resultado e conversão' },
  { icon: Users, text: '40+ empresas atendidas com sucesso' },
  { icon: Shield, text: 'Sites seguros com certificado SSL' },
  { icon: Zap, text: 'Sites rápidos e otimizados para Google' },
]

const cidades = [
  'São Bernardo do Campo', 'Santo André', 'São Caetano do Sul',
  'Diadema', 'Mauá', 'Ribeirão Pires', 'Rio Grande da Serra',
  'São Paulo', 'Guarulhos', 'Osasco', 'Barueri', 'Campinas',
]

const faqs = [
  {
    q: 'Quanto custa criar um site profissional em São Bernardo do Campo?',
    a: 'Na PlayCode Agency, os projetos de criação de site começam a partir de R$ 797 para landing pages otimizadas. Sites institucionais completos e lojas virtuais têm valores que variam conforme a complexidade e as funcionalidades necessárias. Oferecemos orçamento gratuito e sem compromisso — você sabe exatamente o investimento antes de começar.',
  },
  {
    q: 'Em quanto tempo meu site ou sistema fica pronto?',
    a: 'Landing pages são entregues em até 7 dias úteis. Sites institucionais completos levam de 2 a 4 semanas, e sistemas empresariais mais robustos de 4 a 8 semanas, dependendo do escopo. Trabalhamos com cronograma definido, entregas parciais e atualizações frequentes para que você acompanhe cada etapa do desenvolvimento.',
  },
  {
    q: 'Vocês atendem empresas fora de São Bernardo do Campo?',
    a: 'Sim! Embora nossa base seja em São Bernardo do Campo, atendemos empresas em todo o ABC Paulista, Grande São Paulo e também clientes em outras regiões do Brasil. Todo o processo pode ser conduzido de forma 100% remota, com reuniões por videochamada e acompanhamento em tempo real do projeto.',
  },
  {
    q: 'O que é um CRM personalizado e como ele ajuda minha empresa?',
    a: 'CRM é a sigla para Customer Relationship Management — um sistema para gerenciar o relacionamento com seus clientes. Diferente de soluções genéricas do mercado, o CRM personalizado que desenvolvemos se adapta ao fluxo de trabalho específico da sua empresa. Ele organiza contatos, acompanha negociações em andamento, automatiza follow-ups e gera relatórios que ajudam você a vender mais e perder menos oportunidades de negócio.',
  },
]

/* ── Animações ── */

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

/* ── Componente ── */

export default function SaoBernardoPage() {
  return (
    <div className="min-h-screen bg-gradient-console">
      <div className="absolute inset-0 circuit-pattern opacity-5 pointer-events-none" />

      <div className="relative z-10">

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-laser-green" />
                <span className="gaming-mono text-sm text-laser-green font-bold">SÃO BERNARDO DO CAMPO · ABC PAULISTA · SP</span>
              </div>

              <h1 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="text-neon-cyan">Criação de Sites Profissionais</span>
                <br />
                <span className="text-magenta-power">para Empresas em São Bernardo</span>
                <br />
                <span className="text-gaming-purple">do Campo e Grande São Paulo</span>
              </h1>

              <p className="text-lg sm:text-xl text-led-white/80 max-w-3xl mx-auto mb-4 leading-relaxed">
                A PlayCode Agency é uma empresa de <strong>desenvolvimento web em São Bernardo do Campo</strong> especializada em criar sites, lojas virtuais e sistemas empresariais que geram resultados concretos para pequenas e médias empresas do ABC Paulista.
              </p>

              <p className="text-base sm:text-lg text-neon-cyan/90 font-semibold max-w-2xl mx-auto mb-8">
                Mais de 40 projetos entregues. Entrega em até 7 dias. Suporte 24/7.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  onClick={() => {
                    audioHelpers.playClick(true)
                    trackingHelpers.trackClick('sbc_hero_cta')
                  }}
                  className="gaming-button text-lg px-8 py-4 text-center animate-urgent-glow"
                >
                  <span className="relative z-10">SOLICITAR ORÇAMENTO GRÁTIS</span>
                </Link>
                <a
                  href="https://wa.me/5511956534963?text=Olá!%20Vi%20o%20site%20e%20gostaria%20de%20um%20orçamento%20para%20minha%20empresa%20em%20SBC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg border-2 border-laser-green text-laser-green hover:bg-laser-green hover:text-controller-black transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  FALAR NO WHATSAPP
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════ CONTEXTO LOCAL ═══════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <h2 className="gaming-title text-2xl sm:text-3xl font-bold text-neon-cyan mb-6">
                Por que sua empresa em São Bernardo do Campo precisa de um site profissional?
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-led-white/80 leading-relaxed">
                <p>
                  São Bernardo do Campo é uma das cidades mais dinâmicas da Grande São Paulo. Com milhares de empresas ativas nos setores de comércio, serviços e indústria, a disputa pela atenção do consumidor no ambiente digital cresce a cada mês. Nesse cenário, depender apenas de indicações boca a boca ou de perfis em redes sociais limita seriamente o potencial de crescimento do seu negócio.
                </p>
                <p>
                  Um site profissional funciona como o vendedor que nunca tira folga: está disponível 24 horas por dia, aparece quando alguém pesquisa no Google por serviços na sua região e transmite a credibilidade que o cliente precisa para tomar a decisão de entrar em contato. Empresas que investem em <strong>criação de site em São Bernardo do Campo</strong> com foco em SEO e conversão percebem aumento no volume de contatos qualificados já nas primeiras semanas.
                </p>
                <p>
                  Na PlayCode Agency, entendemos de perto a realidade das pequenas e médias empresas da região do ABC. Não entregamos templates genéricos nem soluções engessadas. Cada projeto é construído do zero, pensado para o seu público, para o seu mercado e para os seus objetivos de negócio. É <strong>desenvolvimento web em São Bernardo do Campo</strong> com foco real em resultado — não apenas em aparência.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════ SERVIÇOS ═══════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="text-center mb-10">
              <h2 className="gaming-title text-2xl sm:text-3xl font-bold mb-4">
                <span className="text-neon-cyan">Soluções digitais que desenvolvemos para</span>
                <br />
                <span className="text-magenta-power">empresas em São Bernardo e região</span>
              </h2>
              <p className="text-base sm:text-lg text-led-white/70 max-w-3xl mx-auto">
                De sites institucionais a sistemas ERP completos, cada solução é projetada para resolver problemas reais e gerar retorno mensurável para sua empresa no ABC Paulista e Grande São Paulo.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicos.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="gaming-card p-6 border border-neon-cyan/20 hover:border-neon-cyan/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-neon-cyan/10 flex items-center justify-center mb-4 group-hover:bg-neon-cyan/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <h3 className="gaming-mono text-base font-bold text-led-white mb-2">{s.title}</h3>
                    <p className="text-sm text-led-white/70 leading-relaxed">{s.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ CRM E SISTEMAS ═══════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <h2 className="gaming-title text-2xl sm:text-3xl font-bold text-gaming-purple mb-6">
                CRM personalizado e sistemas sob medida para o ABC Paulista
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-led-white/80 leading-relaxed">
                <p>
                  Se você é empresário em São Bernardo do Campo e ainda gerencia seus clientes em planilhas, controla estoque de cabeça ou perde vendas por falta de organização, chegou a hora de mudar esse cenário. Um <strong>sistema ERP São Bernardo</strong> desenvolvido sob medida transforma completamente a forma como sua empresa opera.
                </p>
                <p>
                  Nosso <strong>CRM personalizado SBC</strong> garante que nenhum lead fique sem resposta. Cada contato que entra é registrado, cada negociação é acompanhada e cada follow-up é disparado no momento certo. Os relatórios gerenciais que criamos mostram, em tempo real, como seu negócio está performando — receita, conversão, ticket médio, tudo na palma da mão.
                </p>
                <p>
                  Para empresas que recebem dezenas de mensagens diárias no WhatsApp, nossos chatbots com inteligência artificial respondem automaticamente, qualificam leads, agendam reuniões e direcionam apenas os contatos prontos para comprar. Sua equipe deixa de perder tempo com perguntas repetitivas e foca no que realmente importa: fechar negócios e atender bem.
                </p>
                <p>
                  Nossos sistemas de controle de estoque eliminam a contagem manual, alertam quando um produto está acabando e integram tudo ao fluxo de vendas. Sistemas de cadastro de clientes, fornecedores e produtos funcionam em qualquer dispositivo, sem precisar instalar nada. É tecnologia de ponta acessível para empresas de todos os tamanhos na Grande São Paulo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════ METODOLOGIA ═══════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <h2 className="gaming-title text-2xl sm:text-3xl font-bold text-plasma-yellow mb-6">
                Desenvolvimento web com foco em resultado para a Grande São Paulo
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-led-white/80 leading-relaxed">
                <p>
                  O que diferencia a PlayCode de outras empresas de <strong>desenvolvimento web na Grande São Paulo</strong> é simples: não vendemos apenas páginas bonitas. Entregamos ferramentas de vendas. Cada site que construímos é pensado para aparecer no Google, carregar rápido no celular e conduzir o visitante até o botão de contato ou compra.
                </p>
                <p>
                  Trabalhamos com metodologia transparente: reunião inicial para entender seu negócio, proposta detalhada com prazo e escopo definidos, entregas parciais para sua aprovação e suporte contínuo após o lançamento. Você participa de cada etapa e nunca fica no escuro sobre o andamento do projeto.
                </p>
                <p>
                  Seja uma <strong>empresa de site SBC</strong> que precisa de uma landing page rápida para captar leads ou uma indústria que necessita de um sistema completo de gestão, nosso processo é o mesmo: ouvir, planejar, executar e entregar com qualidade. Por isso, mais de 40 empresas da região já confiaram seus projetos à PlayCode Agency.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════ BENEFÍCIOS + AUTORIDADE ═══════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="text-center mb-8">
              <h2 className="gaming-title text-2xl sm:text-3xl font-bold text-laser-green mb-4">
                Por que mais de 40 empresas escolheram a PlayCode Agency
              </h2>
              <p className="text-base text-led-white/70 max-w-2xl mx-auto">
                Conheça os motivos que fazem da PlayCode a escolha de empresários em São Bernardo do Campo e região.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {beneficios.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.div
                    key={b.text}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 px-5 py-4 rounded-lg border border-laser-green/30 bg-laser-green/5"
                  >
                    <Icon className="w-5 h-5 text-laser-green flex-shrink-0" />
                    <span className="text-base text-led-white/85 font-medium">{b.text}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* Prova de autoridade */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 gaming-card p-6 sm:p-8 border border-neon-cyan/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-plasma-yellow" />
                <h3 className="gaming-mono text-lg font-bold text-plasma-yellow">Nossa trajetória</h3>
              </div>
              <p className="text-base sm:text-lg text-led-white/80 leading-relaxed">
                São mais de <strong className="text-neon-cyan">10 anos de experiência</strong> no mercado de desenvolvimento web. Já entregamos mais de <strong className="text-neon-cyan">40 projetos</strong> para empresas dos segmentos de comércio, serviços, saúde, educação, logística, indústria e varejo. Cada projeto é acompanhado do início ao fim, com reuniões de alinhamento, entregas parciais e suporte dedicado após o lançamento. Não somos uma fábrica de sites — somos parceiros de crescimento das empresas que atendem.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════ CIDADES ATENDIDAS ═══════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-plasma-yellow" />
                <h2 className="gaming-title text-xl sm:text-2xl font-bold text-plasma-yellow">
                  Atendemos São Bernardo do Campo e toda a Grande São Paulo
                </h2>
              </div>

              <p className="text-base text-led-white/70 mb-6 max-w-2xl mx-auto">
                Nossa base é em São Bernardo do Campo, mas atendemos empresas em todo o ABC Paulista, Grande São Paulo e projetos remotos para qualquer cidade do Brasil.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {cidades.map((c, i) => (
                  <motion.span
                    key={c}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    viewport={{ once: true }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
                      c === 'São Bernardo do Campo'
                        ? 'border-plasma-yellow text-plasma-yellow bg-plasma-yellow/10'
                        : 'border-led-white/20 text-led-white/70 bg-led-white/5'
                    }`}
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════ FAQ ═══════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="text-center mb-10">
              <h2 className="gaming-title text-2xl sm:text-3xl font-bold text-neon-cyan mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-base text-led-white/70 max-w-2xl mx-auto">
                Tire suas dúvidas sobre criação de sites e sistemas em São Bernardo do Campo.
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group gaming-card p-0 border border-neon-cyan/20 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-base sm:text-lg font-semibold text-led-white/90 hover:text-neon-cyan transition-colors duration-200 list-none">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-neon-cyan flex-shrink-0 ml-4 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-sm sm:text-base text-led-white/70 leading-relaxed border-t border-neon-cyan/10 pt-4">
                    {faq.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════ CTA FINAL ═══════════════════════ */}
        <section className="py-16 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="gaming-card p-8 sm:p-12 border-2 border-neon-cyan/50"
            >
              <h2 className="gaming-title text-2xl sm:text-3xl font-bold mb-4">
                <span className="text-neon-cyan">Pronto para levar sua empresa</span>
                <br />
                <span className="text-magenta-power">para o próximo nível digital?</span>
              </h2>

              <p className="text-base sm:text-lg text-led-white/80 mb-4 max-w-xl mx-auto leading-relaxed">
                Solicite agora seu orçamento gratuito e descubra como um site profissional ou sistema sob medida pode transformar os resultados da sua empresa em São Bernardo do Campo e região.
              </p>

              <p className="text-sm sm:text-base text-laser-green font-semibold mb-8">
                Projetos a partir de R$ 797 · Entrega em até 7 dias · Sem compromisso
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  onClick={() => {
                    audioHelpers.playClick(true)
                    trackingHelpers.trackClick('sbc_cta_final')
                  }}
                  className="gaming-button text-lg px-8 py-4 text-center animate-urgent-glow"
                >
                  <span className="relative z-10">QUERO MEU ORÇAMENTO GRÁTIS</span>
                </Link>
                <a
                  href="https://wa.me/5511956534963?text=Olá!%20Quero%20um%20orçamento%20para%20minha%20empresa%20em%20São%20Bernardo%20do%20Campo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-lg border-2 border-laser-green text-laser-green hover:bg-laser-green hover:text-controller-black transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  CHAMAR NO WHATSAPP
                </a>
              </div>

              <p className="text-sm text-led-white/50 mt-6">
                Resposta em até 2 horas em horário comercial.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════ JSON-LD SCHEMAS ═══════════════════════ */}

        {/* FAQPage Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.a
                }
              }))
            })
          }}
        />

        {/* LocalBusiness / ProfessionalService Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "PlayCode Agency - Criação de Sites em São Bernardo do Campo",
              "description": "Empresa de desenvolvimento web em São Bernardo do Campo especializada em criação de sites profissionais, lojas virtuais, sistemas empresariais, CRM personalizado e chatbots com IA para WhatsApp.",
              "url": "https://playcodeagency.xyz/sao-bernardo-do-campo",
              "telephone": "+55-11-95653-4963",
              "email": "contato@playcodeagency.xyz",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "São Bernardo do Campo",
                "addressRegion": "SP",
                "postalCode": "09750-000",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-23.6914",
                "longitude": "-46.5646"
              },
              "areaServed": [
                { "@type": "City", "name": "São Bernardo do Campo" },
                { "@type": "City", "name": "Santo André" },
                { "@type": "City", "name": "São Caetano do Sul" },
                { "@type": "City", "name": "Diadema" },
                { "@type": "City", "name": "Mauá" },
                { "@type": "City", "name": "Ribeirão Pires" },
                { "@type": "City", "name": "São Paulo" },
                { "@type": "City", "name": "Guarulhos" },
                { "@type": "City", "name": "Osasco" }
              ],
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://github.com/playcodeagency",
                "https://linkedin.com/company/playcodeagency"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Serviços de Desenvolvimento Web",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Criação de Sites Profissionais",
                      "description": "Sites institucionais, landing pages e portfólios otimizados para Google"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Lojas Virtuais e E-commerce",
                      "description": "E-commerce completo com catálogo, pagamento online e painel administrativo"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Sistemas Empresariais e CRM",
                      "description": "Sistemas sob medida, CRM personalizado, controle de estoque e relatórios gerenciais"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Chatbots com IA para WhatsApp",
                      "description": "Atendimento automático 24h com inteligência artificial para WhatsApp Business"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "40",
                "bestRating": "5"
              }
            })
          }}
        />

        {/* BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "PlayCode Agency",
                  "item": "https://playcodeagency.xyz"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "São Bernardo do Campo",
                  "item": "https://playcodeagency.xyz/sao-bernardo-do-campo"
                }
              ]
            })
          }}
        />
      </div>
    </div>
  )
}
