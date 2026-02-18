'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock, Shield, Zap, Code, Users } from 'lucide-react'
import { useAchievements, trackingHelpers } from '@/lib/hooks/useAchievements'
import { audioHelpers } from '@/lib/hooks/useAudio'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  project_type: string
  budget_range: string
  message: string
  urgency: string
}

interface ContactInfo {
  icon: React.ElementType
  title: string
  details: string[]
  color: string
}

export default function ContatoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_type: '',
    budget_range: '',
    message: '',
    urgency: 'normal'
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [selectedCombo, setSelectedCombo] = useState<string>('')
  
  const { } = useAchievements()

  // Check URL params for pre-selected combo or service
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const combo = urlParams.get('combo')
      const servico = urlParams.get('servico')
      const projectType = urlParams.get('project_type')
      
      if (combo) {
        setSelectedCombo(combo)
        setFormData(prev => ({
          ...prev,
          project_type: projectType || 'custom',
          message: `Gostaria de solicitar orçamento para o combo ${combo}. `
        }))
      } else if (servico) {
        setFormData(prev => ({
          ...prev,
          project_type: servico,
          message: `Gostaria de solicitar orçamento para o serviço de ${servico.replace('-', ' ')}. `
        }))
      }
    }
  }, [])

  const contactInfo: ContactInfo[] = [
    {
      icon: Phone,
      title: 'TELEFONE / WHATSAPP',
      details: ['+55 (11) 95653-4963', 'WhatsApp Business 24/7'],
      color: 'text-neon-cyan'
    },
    {
      icon: Mail,
      title: 'EMAIL',
      details: ['contato@playcodeagency.xyz', 'Response time: < 2h'],
      color: 'text-electric-blue'
    },
    {
      icon: MapPin,
      title: 'LOCALIZAÇÃO',
      details: ['São Bernardo do Campo, SP', 'Remote & On-site'],
      color: 'text-magenta-power'
    },
    {
      icon: Clock,
      title: 'HORÁRIO DE ATENDIMENTO',
      details: ['24/7 Digital Support', 'Mon-Fri: 9h-18h BRT'],
      color: 'text-laser-green'
    }
  ]

  const projectTypes = [
    { value: 'website', label: '🌐 Website/Landing Page', points: 100 },
    { value: 'webapp', label: '⚡ Web Application', points: 300 },
    { value: 'mobile', label: '📱 Mobile App', points: 500 },
    { value: 'ai', label: '🤖 AI Integration', points: 800 },
    { value: 'ecommerce', label: '🛒 E-commerce', points: 400 },
    { value: 'custom', label: '🚀 Custom Solution', points: 1000 }
  ]

  const budgetRanges = [
    { value: 'starter', label: '🎯 Starter Pack (R$ 797 - R$ 1.497)', multiplier: 1 },
    { value: 'business', label: '🏢 Business One (R$ 1.497 - R$ 2.497)', multiplier: 1.5 },
    { value: 'pro', label: '🚀 Pro Guild (R$ 2.497 - R$ 5.000)', multiplier: 2 },
    { value: 'enterprise', label: '🏛️ Enterprise (R$ 5.000+)', multiplier: 2.5 },
    { value: 'custom', label: '💎 Orçamento Personalizado', multiplier: 2.2 }
  ]

  const urgencyLevels = [
    { value: 'low', label: '🐌 Standard (30-60 days)', color: 'text-led-white' },
    { value: 'normal', label: '⚡ Fast Track (15-30 days)', color: 'text-electric-blue' },
    { value: 'high', label: '🚀 Rush (7-15 days)', color: 'text-plasma-yellow' },
    { value: 'critical', label: '🔥 Emergency (< 7 days)', color: 'text-magenta-power' }
  ]

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) errors.name = 'Nome é obrigatório'
    else if (formData.name.trim().length < 2) errors.name = 'Nome deve ter pelo menos 2 caracteres'
    if (!formData.email.trim()) errors.email = 'Email é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email inválido'
    if (!formData.project_type) errors.project_type = 'Selecione o tipo de projeto'
    if (!formData.message.trim()) errors.message = 'Descreva seu projeto'
    else if (formData.message.trim().length < 10) errors.message = 'Mensagem deve ter pelo menos 10 caracteres'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const calculateLeadScore = (): number => {
    let score = 0
    
    // Project type score
    const projectType = projectTypes.find(p => p.value === formData.project_type)
    if (projectType) score += projectType.points
    
    // Budget multiplier
    const budget = budgetRanges.find(b => b.value === formData.budget_range)
    if (budget) score *= budget.multiplier
    
    // Company bonus
    if (formData.company.trim()) score += 200
    
    // Phone bonus (higher intent)
    if (formData.phone.trim()) score += 150
    
    // Message length bonus
    if (formData.message.length > 100) score += 100
    
    // Urgency multiplier
    const urgencyMultipliers = { low: 0.8, normal: 1, high: 1.3, critical: 1.5 }
    score *= urgencyMultipliers[formData.urgency as keyof typeof urgencyMultipliers]
    
    return Math.round(score)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      audioHelpers.playError()
      return
    }
    
    // Reset status and start submission
    setSubmitStatus('idle')
    setIsSubmitting(true)
    audioHelpers.playClick(true)
    
    try {
      const leadScore = calculateLeadScore()
      
      console.log('📝 Enviando formulário de contato:', {
        name: formData.name,
        email: formData.email,
        project_type: formData.project_type,
        lead_score: leadScore
      })
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lead_score: leadScore,
          submitted_at: new Date().toISOString(),
          source: 'contact_page'
        }),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      console.log('📝 Response status:', response.status)
      console.log('📝 Response ok:', response.ok)
      console.log('📝 Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (response.ok) {
        try {
          const responseData = await response.json()
          console.log('📝 Response data:', responseData)
          
          setSubmitStatus('success')
          audioHelpers.playAchievementUnlocked('epic')
          
          // Track achievement
          trackingHelpers.trackContactForm({
            project_type: formData.project_type,
            budget_range: formData.budget_range,
            lead_score: leadScore
          })
          
          // Reset form
          setFormData({
            name: '', email: '', phone: '', company: '',
            project_type: '', budget_range: '', message: '', urgency: 'normal'
          })
        } catch (parseError) {
          console.error('📝 Error parsing success response:', parseError)
          setSubmitStatus('error')
          audioHelpers.playError()
        }
        
      } else {
        // Handle API error response
        try {
          const errorData = await response.json()
          console.error('API Error Response:', JSON.stringify(errorData, null, 2))
          console.error('API Status:', response.status, response.statusText)
        } catch (readError) {
          const textData = await response.text().catch(() => 'unreadable')
          console.error('API Error (text):', textData, 'Status:', response.status)
        }
        setSubmitStatus('error')
        audioHelpers.playError()
      }
      
    } catch (error) {
      console.error('Contact form error:', error)
      
      // Detailed error logging
      if (error instanceof Error) {
        console.error('📝 Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        })
        
        // Check for specific error types
        if (error.name === 'AbortError') {
          console.error('📝 Request timed out after 30 seconds')
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
          console.error('📝 Network error - check connection')
        }
      } else {
        console.error('📝 Unknown error type:', typeof error, error)
      }
      
      setSubmitStatus('error')
      audioHelpers.playError()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // Play hover sound for select changes
    if (['project_type', 'budget_range', 'urgency'].includes(field)) {
      audioHelpers.playHover()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-console relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.playcodeagency.xyz" },
              { "@type": "ListItem", "position": 2, "name": "Contato", "item": "https://www.playcodeagency.xyz/contato" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "PlayCode Agency",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+55-11-95653-4963",
                  "contactType": "Atendimento ao Cliente",
                  "availableLanguage": "Portuguese",
                  "serviceArea": {
                    "@type": "Country",
                    "name": "Brasil"
                  },
                  "hoursAvailable": "24/7"
                },
                {
                  "@type": "ContactPoint",
                  "email": "contato@playcodeagency.xyz",
                  "contactType": "Suporte Técnico",
                  "responseTime": "PT2H"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "São Bernardo do Campo",
                "addressRegion": "SP",
                "addressCountry": "BR"
              },
              "openingHours": "Mo-Su 00:00-23:59",
              "sameAs": [
                "https://wa.me/5511956534963"
              ]
            }
          })
        }}
      />
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />
      

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h1 className="gaming-title text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 neon-glow">
            <span className="text-neon-cyan">SOLICITE SEU</span>
            <br />
            <span className="text-magenta-power">ORÇAMENTO GRÁTIS</span>
          </h1>
          <p className="gaming-subtitle text-base sm:text-xl text-led-white/80 max-w-2xl mx-auto">
            Preencha o formulário e receba uma proposta personalizada em até 2 horas. Sem compromisso.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="gaming-card p-4 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-gaming rounded flex items-center justify-center">
                <Code className="w-5 h-5 text-neon-cyan" />
              </div>
              <h2 className="gaming-title text-2xl font-bold text-neon-cyan">
                CONTE-NOS SOBRE SEU PROJETO
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="hud-element">
                  <label className="gaming-mono text-xs text-led-white/70 mb-2 block">
                    SEU NOME *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onFocus={() => audioHelpers.playHover()}
                    className={`gaming-input ${formErrors.name ? 'border-red-500' : ''}`}
                    placeholder="Seu nome completo"
                  />
                  {formErrors.name && (
                    <span className="text-red-400 text-xs mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                <div className="hud-element">
                  <label className="gaming-mono text-xs text-led-white/70 mb-2 block">
                    SEU EMAIL *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onFocus={() => audioHelpers.playHover()}
                    className={`gaming-input ${formErrors.email ? 'border-red-500' : ''}`}
                    placeholder="seu@email.com"
                  />
                  {formErrors.email && (
                    <span className="text-red-400 text-xs mt-1 block">{formErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="hud-element">
                  <label className="gaming-mono text-xs text-led-white/70 mb-2 block">
                    TELEFONE / WHATSAPP
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onFocus={() => audioHelpers.playHover()}
                    className="gaming-input"
                    placeholder="(11) 95653-4963"
                  />
                </div>

                <div className="hud-element">
                  <label className="gaming-mono text-xs text-led-white/70 mb-2 block">
                    EMPRESA
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    onFocus={() => audioHelpers.playHover()}
                    className="gaming-input"
                    placeholder="Nome da empresa"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="hud-element">
                <label className="gaming-mono text-xs text-led-white/70 mb-2 block">
                  TIPO DE PROJETO *
                </label>
                <select
                  value={formData.project_type}
                  onChange={(e) => handleInputChange('project_type', e.target.value)}
                  className={`gaming-input ${formErrors.project_type ? 'border-red-500' : ''}`}
                >
                  <option value="">Selecione o tipo de projeto</option>
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {formErrors.project_type && (
                  <span className="text-red-400 text-xs mt-1 block">{formErrors.project_type}</span>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="hud-element">
                  <label className="gaming-mono text-xs text-led-white/70 mb-2 block">
                    FAIXA DE INVESTIMENTO
                  </label>
                  <select
                    value={formData.budget_range}
                    onChange={(e) => handleInputChange('budget_range', e.target.value)}
                    className="gaming-input"
                  >
                    <option value="">Selecione a faixa de investimento</option>
                    {budgetRanges.map(budget => (
                      <option key={budget.value} value={budget.value}>
                        {budget.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="hud-element">
                  <label className="gaming-mono text-xs text-led-white/70 mb-2 block">
                    PRAZO DESEJADO
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="gaming-input"
                  >
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="hud-element">
                <label className="gaming-mono text-xs text-led-white/70 mb-2 block">
                  DESCREVA SEU PROJETO *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onFocus={() => audioHelpers.playHover()}
                  className={`gaming-input h-32 resize-none ${formErrors.message ? 'border-red-500' : ''}`}
                  placeholder="Descreva seu projeto, objetivos e requisitos específicos..."
                />
                {formErrors.message && (
                  <span className="text-red-400 text-xs mt-1 block">{formErrors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => audioHelpers.playHover()}
                className="gaming-button w-full py-4 text-lg font-bold flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
                    ENVIANDO...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    SOLICITAR ORÇAMENTO GRÁTIS
                  </>
                )}
              </motion.button>
            </form>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 gaming-card bg-laser-green/10 border-laser-green p-4"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-laser-green" />
                    <div>
                      <h3 className="gaming-mono font-bold text-laser-green">MENSAGEM ENVIADA!</h3>
                      <p className="text-sm text-led-white/70">
                        Responderemos em até 2 horas. Obrigado pelo contato!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 gaming-card bg-red-500/10 border-red-500 p-4"
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-red-400" />
                    <div>
                      <h3 className="gaming-mono font-bold text-red-400">ERRO AO ENVIAR</h3>
                      <p className="text-sm text-led-white/70">
                        Ocorreu um erro. Tente novamente ou entre em contato pelo WhatsApp.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info & Quick Access */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Quick Contact Methods */}
            <div className="gaming-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-gaming rounded flex items-center justify-center">
                  <Users className="w-5 h-5 text-magenta-power" />
                </div>
                <h3 className="gaming-title text-xl font-bold text-magenta-power">
                  CANAIS DE CONTATO
                </h3>
              </div>

              <div className="grid gap-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="hud-element p-4 hover:bg-led-white/5 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${info.color} mt-1`}>
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="gaming-mono text-sm font-bold text-led-white mb-1">
                          {info.title}
                        </h4>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-sm text-led-white/70">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Business Hours & Response Time */}
            <div className="gaming-card p-6">
              <h3 className="gaming-title text-lg font-bold text-electric-blue mb-4">
                NOSSO COMPROMISSO
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-led-white/70">Tempo de resposta:</span>
                  <span className="text-laser-green font-bold">&lt; 2 horas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-led-white/70">Início do projeto:</span>
                  <span className="text-electric-blue font-bold">24-48h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-led-white/70">Suporte:</span>
                  <span className="text-magenta-power font-bold">24/7 Digital</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-led-white/70">Taxa de sucesso:</span>
                  <span className="text-plasma-yellow font-bold">99.9%</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="gaming-card p-6 border-plasma-yellow bg-plasma-yellow/5">
              <h3 className="gaming-title text-lg font-bold text-plasma-yellow mb-4">
                🚨 PROJETO URGENTE?
              </h3>
              <p className="text-sm text-led-white/80 mb-4">
                Para projetos urgentes, ligue ou envie mensagem diretamente:
              </p>
              <a 
                href="tel:+5511999998888"
                className="gaming-button bg-plasma-yellow text-controller-black py-2 px-4 text-sm font-bold inline-flex items-center gap-2"
                onMouseEnter={() => audioHelpers.playHover()}
                onClick={() => audioHelpers.playClick(true)}
              >
                <Phone className="w-4 h-4" />
                (11) 95653-4963
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}