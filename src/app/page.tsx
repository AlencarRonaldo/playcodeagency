import HeroSection from '@/components/sections/HeroSection'
import PowerUpsSection from '@/components/sections/PowerUpsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Criação de Sites Profissionais e Desenvolvimento Web para Empresas | PlayCode Agency",
  description: "Empresa de desenvolvimento web no Brasil. Criamos sites responsivos, sistemas personalizados e aplicações web que geram resultados reais para seu negócio. 10+ anos, 40+ clientes. Orçamento grátis!",
  keywords: [
    "desenvolvimento de sites profissionais", "criação de sites responsivos",
    "desenvolvimento web para empresas", "criação de sistemas personalizados",
    "site para pequenas empresas", "desenvolvimento de aplicações web",
    "empresa de desenvolvimento web no Brasil", "criar site profissional",
    "site responsivo para empresa", "landing page profissional",
    "sistema web personalizado", "chatbot para empresas",
    "site para profissionais liberais", "quanto custa um site profissional"
  ],
  openGraph: {
    title: "Criação de Sites Profissionais para Empresas | PlayCode Agency",
    description: "Precisa de um site profissional? Somos especialistas em desenvolvimento web para empresas. Sites responsivos, sistemas personalizados e resultados comprovados. Peça seu orçamento grátis!",
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
            "description": "Empresa de desenvolvimento web no Brasil especializada em criação de sites profissionais, sites responsivos, sistemas personalizados e aplicações web para empresas",
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
            "knowsAbout": ["Desenvolvimento de Sites Profissionais", "Criação de Sites Responsivos", "Sistemas Personalizados", "Desenvolvimento Web para Empresas", "Aplicações Web"]
          })
        }}
      />
      <HeroSection />
      <PowerUpsSection />
    </main>
  )
}
