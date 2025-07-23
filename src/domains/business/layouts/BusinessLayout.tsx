import Header from '@/shared/ui/Header'
import Footer from '@/shared/ui/Footer'
import WhatsAppFloat from '@/shared/ui/WhatsAppFloat'

interface BusinessLayoutProps {
  children: React.ReactNode
}

export default function BusinessLayout({ children }: BusinessLayoutProps) {
  return (
    <>
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppFloat 
        phoneNumber="5511956534963"
        position="bottom-left"
        companyName="PlayCode Agency"
        showTooltip={true}
        message="Olá! Gostaria de saber mais sobre os serviços da PlayCode Agency 🎮"
      />
    </>
  )
}