import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Portfólio - Projetos de Sites Profissionais e Sistemas Web",
  description: "Veja nossos projetos de criação de sites profissionais, lojas virtuais, sistemas personalizados e chatbots com IA. 40+ projetos entregues para empresas de diversos segmentos.",
  keywords: [
    "portfólio desenvolvimento web", "projetos sites profissionais",
    "cases de sucesso criação de sites", "exemplos de sites profissionais",
    "portfólio agência digital", "projetos e-commerce",
    "sites criados por agência", "exemplos landing page"
  ],
  openGraph: {
    title: "Portfólio de Projetos - PlayCode Agency",
    description: "40+ projetos entregues: sites profissionais, lojas virtuais, sistemas e chatbots com IA. Veja nossos cases de sucesso.",
    url: "https://www.playcodeagency.xyz/portfolio",
  },
  alternates: {
    canonical: "https://www.playcodeagency.xyz/portfolio",
  },
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
