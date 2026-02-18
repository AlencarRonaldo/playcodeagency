import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Criação de Sites em São Bernardo do Campo | PlayCode",
  description: "Criação de sites profissionais em São Bernardo do Campo. Lojas virtuais, sistemas empresariais e CRM sob medida para empresas do ABC. Entrega em 7 dias. Desde R$ 797.",
  keywords: [
    "criação de site em São Bernardo do Campo",
    "desenvolvimento web São Bernardo do Campo",
    "empresa de site SBC",
    "site profissional São Bernardo",
    "loja virtual São Bernardo do Campo",
    "sistema ERP São Bernardo",
    "CRM personalizado SBC",
    "desenvolvimento web Grande São Paulo",
    "agência digital ABC Paulista",
    "criação de sites ABC",
    "sistema empresarial São Bernardo do Campo",
    "chatbot WhatsApp São Bernardo",
    "automação empresarial SBC",
    "site para empresa São Bernardo do Campo",
  ],
  openGraph: {
    title: "Criação de Sites em São Bernardo do Campo | PlayCode Agency",
    description: "Sites profissionais, lojas virtuais, CRM e sistemas sob medida para empresas em São Bernardo do Campo e ABC Paulista. Entrega em 7 dias!",
    url: "https://playcodeagency.xyz/sao-bernardo-do-campo",
  },
  alternates: {
    canonical: "https://playcodeagency.xyz/sao-bernardo-do-campo",
  },
}

export default function SaoBernardoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
