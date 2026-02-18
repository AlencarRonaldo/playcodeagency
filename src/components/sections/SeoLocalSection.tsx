'use client'

import { motion } from 'framer-motion'
import { Globe, Code, Cpu, MapPin, Check } from 'lucide-react'

const sitesItems = [
  'Sites institucionais otimizados para Google',
  'Lojas virtuais completas',
  'Landing pages de alta conversão',
  'Aplicações web personalizadas',
]

const sistemasItems = [
  'CRM sob medida',
  'Relatórios gerenciais inteligentes',
  'Controle de estoque',
  'Gestão de cadastros',
  'Integrações e automações',
  'Chatbots com inteligência artificial para WhatsApp',
]

const cidades = [
  'São Bernardo do Campo',
  'Santo André',
  'São Caetano do Sul',
  'Diadema',
  'Mauá',
  'Toda a Grande São Paulo',
]

export default function SeoLocalSection() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-5" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">

        {/* Bloco 1 - Intro Local */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="gaming-title text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            <span className="text-neon-cyan">Desenvolvimento de Sites e Sistemas</span>
            <br />
            <span className="text-magenta-power">em São Bernardo do Campo</span>
          </h2>

          <p className="text-base sm:text-lg text-led-white/80 max-w-3xl mx-auto mb-4 leading-relaxed">
            Se você procura uma <strong>empresa de desenvolvimento web em São Bernardo do Campo</strong>, a PlayCode Agency é especialista na criação de sites profissionais, lojas virtuais e sistemas empresariais sob medida para pequenas e médias empresas.
          </p>

          <p className="text-base sm:text-lg text-led-white/70 max-w-3xl mx-auto leading-relaxed">
            Atendemos empresas que desejam vender mais, automatizar processos e fortalecer sua presença digital na região do <strong>ABC Paulista</strong> e <strong>Grande São Paulo</strong>.
          </p>
        </motion.div>

        {/* Bloco 2 e 3 - Sites + Sistemas lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Criação de Sites */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="gaming-card p-6 sm:p-8 border-2 border-neon-cyan/40 bg-[#0d3550]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-neon-cyan" />
              </div>
              <h3 className="gaming-mono text-lg sm:text-xl font-bold text-neon-cyan">
                Criação de Sites Profissionais em SBC
              </h3>
            </div>

            <p className="text-sm sm:text-base text-led-white/70 mb-5 leading-relaxed">
              Desenvolvemos:
            </p>

            <div className="space-y-3">
              {sitesItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <Check className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                  <span className="text-sm sm:text-base text-led-white/80">{item}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-led-white/60 mt-5 leading-relaxed">
              Todos os projetos são responsivos, rápidos e preparados para gerar resultados reais.
            </p>
          </motion.div>

          {/* Sistemas Empresariais */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="gaming-card p-6 sm:p-8 border-2 border-gaming-purple/40 bg-[#271050]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gaming-purple/20 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-gaming-purple" />
              </div>
              <h3 className="gaming-mono text-lg sm:text-xl font-bold text-gaming-purple">
                Sistemas e Automação para Empresas do ABC
              </h3>
            </div>

            <p className="text-sm sm:text-base text-led-white/70 mb-5 leading-relaxed">
              Criamos sistemas personalizados com:
            </p>

            <div className="space-y-3">
              {sistemasItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <Check className="w-4 h-4 text-gaming-purple flex-shrink-0" />
                  <span className="text-sm sm:text-base text-led-white/80">{item}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-led-white/60 mt-5 leading-relaxed">
              Se sua empresa em São Bernardo do Campo precisa organizar processos e aumentar a produtividade, temos a solução ideal.
            </p>
          </motion.div>
        </div>

        {/* Bloco 4 - Atendemos Toda a Região */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-laser-green" />
            <h3 className="gaming-title text-xl sm:text-2xl lg:text-3xl font-bold text-laser-green">
              Atendemos Toda a Região
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {cidades.map((cidade, i) => (
              <motion.div
                key={cidade}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-lg border border-laser-green/40 bg-laser-green/10 text-laser-green font-semibold text-sm sm:text-base"
              >
                {cidade}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
