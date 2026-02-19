import HeroSection from '@/components/sections/HeroSection'
import PowerUpsSection from '@/components/sections/PowerUpsSection'
import WhyChooseSection from '@/components/sections/WhyChooseSection'
import SeoLocalSection from '@/components/sections/SeoLocalSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Criação de Sites Profissionais em São Bernardo do Campo | Desde R$ 797 - PlayCode Agency",
  description: "Empresa de desenvolvimento web em São Bernardo do Campo. Criação de sites profissionais, lojas virtuais, sistemas empresariais e chatbots IA para WhatsApp. Atendemos ABC Paulista e Grande São Paulo. Entrega em 7 dias, suporte 24/7.",
  keywords: [
    "criação de sites São Bernardo do Campo", "desenvolvimento web ABC Paulista",
    "empresa de sites São Bernardo", "site profissional Grande São Paulo",
    "desenvolvimento de sites profissionais", "criação de sites responsivos",
    "sistemas empresariais São Bernardo do Campo", "loja virtual ABC",
    "site para pequenas empresas", "desenvolvimento de aplicações web",
    "criar site profissional", "site responsivo para empresa",
    "landing page profissional", "sistema web personalizado",
    "chatbot para empresas", "automação empresarial São Bernardo"
  ],
  openGraph: {
    title: "Criação de Sites Profissionais em São Bernardo do Campo | Desde R$ 797 - PlayCode Agency",
    description: "Empresa de desenvolvimento web em São Bernardo do Campo. Sites profissionais, lojas virtuais, sistemas e chatbots IA. Atendemos ABC Paulista e Grande São Paulo. Entrega em 7 dias!",
    url: "https://playcodeagency.xyz",
  },
  alternates: {
    canonical: "https://playcodeagency.xyz",
  },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PlayCode Agency",
            "description": "Empresa de desenvolvimento web em São Bernardo do Campo especializada em criação de sites profissionais, lojas virtuais, sistemas empresariais e chatbots IA para empresas do ABC Paulista e Grande São Paulo",
            "url": "https://playcodeagency.xyz",
            "logo": "https://playcodeagency.xyz/logo.png",
            "foundingDate": "2014",
            "founder": {
              "@type": "Person",
              "name": "Equipe PlayCode Agency"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-11-95653-4963",
              "contactType": "Atendimento ao Cliente",
              "availableLanguage": "Portuguese",
              "areaServed": "BR"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "São Bernardo do Campo",
              "addressRegion": "SP",
              "addressCountry": "BR"
            },
            "sameAs": [
              "https://github.com/playcodeagency",
              "https://linkedin.com/company/playcodeagency"
            ],
            "service": [
              {
                "@type": "Service",
                "name": "Desenvolvimento de Sites Profissionais",
                "description": "Criação de sites responsivos e profissionais para empresas, com design moderno, SEO otimizado e foco em resultados"
              },
              {
                "@type": "Service",
                "name": "Criação de Sistemas Personalizados",
                "description": "Desenvolvimento de aplicações web e sistemas sob medida para automatizar processos e aumentar a produtividade da sua empresa"
              },
              {
                "@type": "Service",
                "name": "Sites para Pequenas Empresas",
                "description": "Soluções acessíveis de desenvolvimento web para pequenas empresas e profissionais liberais que querem crescer no digital"
              }
            ],
            "areaServed": [
              { "@type": "City", "name": "São Bernardo do Campo" },
              { "@type": "City", "name": "Santo André" },
              { "@type": "City", "name": "São Caetano do Sul" },
              { "@type": "City", "name": "Diadema" },
              { "@type": "City", "name": "Mauá" }
            ],
            "knowsAbout": ["Desenvolvimento de Sites Profissionais", "Criação de Sites em São Bernardo do Campo", "Sistemas Empresariais ABC Paulista", "Lojas Virtuais", "Chatbots IA WhatsApp", "Automação Empresarial"]
          })
        }}
      />
      <HeroSection />
      <PowerUpsSection />
      <SeoLocalSection />
      <WhyChooseSection />
    </main>
  )
}
