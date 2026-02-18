import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Combos e Pacotes - Soluções Digitais Completas para Empresas",
  description: "Combos especiais de desenvolvimento web: site + chatbot, e-commerce + SEO, automação completa. Economize até 30% combinando serviços. Orçamento grátis!",
  keywords: [
    "combo site e chatbot", "pacote desenvolvimento web",
    "combo e-commerce seo", "pacote site profissional",
    "combo automação empresarial", "pacote marketing digital",
    "desconto criação de sites", "promoção desenvolvimento web"
  ],
  openGraph: {
    title: "Combos e Pacotes de Desenvolvimento Web - PlayCode Agency",
    description: "Combos especiais: site + chatbot, e-commerce + SEO. Economize até 30% combinando serviços digitais.",
    url: "https://www.playcodeagency.xyz/combos",
  },
  alternates: {
    canonical: "https://www.playcodeagency.xyz/combos",
  },
}

export default function CombosLayout({ children }: { children: React.ReactNode }) {
  return children
}
