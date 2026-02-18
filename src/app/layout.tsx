import type { Metadata, Viewport } from "next";
import { Orbitron, Exo_2, JetBrains_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import "@/lib/polyfills";
import AchievementProvider from "@/components/gaming/AchievementProvider";
import KonamiEffects from "@/components/gaming/KonamiEffects";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MarioAutoPlay from "@/components/audio/MarioAutoPlay";
import GlobalParticles from "@/components/ui/GlobalParticles";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo = Exo_2({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Desenvolvimento de Sites Profissionais | Empresa de Desenvolvimento Web no Brasil - PlayCode Agency",
    template: "%s | PlayCode Agency - Desenvolvimento Web Profissional"
  },
  description: "Empresa de desenvolvimento web no Brasil especializada em criação de sites responsivos, sistemas personalizados e aplicações web para pequenas empresas. 10+ anos, 40+ projetos entregues. Orçamento grátis!",
  keywords: [
    "desenvolvimento de sites profissionais", "criação de sites responsivos",
    "desenvolvimento web para empresas", "criação de sistemas personalizados",
    "site para pequenas empresas", "desenvolvimento de aplicações web",
    "empresa de desenvolvimento web no Brasil", "agência de desenvolvimento web",
    "criar site profissional", "desenvolvimento web São Paulo",
    "criação de site institucional", "site responsivo para empresa",
    "sistema web sob medida", "landing page profissional",
    "desenvolvimento web com inteligência artificial", "chatbot para empresas",
    "site para profissionais liberais", "site para consultório",
    "loja virtual profissional", "e-commerce personalizado",
    "SEO para empresas", "otimização de sites para Google",
    "orçamento criação de site", "quanto custa um site profissional"
  ],
  authors: [{ name: "PlayCode Agency", url: "https://playcodeagency.xyz" }],
  creator: "PlayCode Agency",
  publisher: "PlayCode Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://playcodeagency.xyz",
    title: "Criação de Sites Profissionais e Desenvolvimento Web para Empresas | PlayCode Agency",
    description: "Sua empresa precisa de um site profissional? Somos especialistas em desenvolvimento de sites responsivos, sistemas personalizados e aplicações web. 10+ anos de experiência. Peça seu orçamento grátis.",
    siteName: "PlayCode Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PlayCode Agency - Desenvolvimento de Sites Profissionais e Sistemas Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Criação de Sites Profissionais para Empresas | PlayCode Agency",
    description: "Desenvolvimento de sites responsivos, sistemas personalizados e aplicações web para empresas. 10+ anos de experiência, 40+ clientes satisfeitos. Orçamento grátis!",
    images: ["/twitter-image.jpg"],
    creator: "@playcodeagency",
  },
  verification: { google: "vPgKvk4GHRarF5mSTdieJ23UCaQnilCsUCynCyqdwdA" },
  alternates: {
    canonical: "https://playcodeagency.xyz",
    languages: {
      'pt-BR': "https://playcodeagency.xyz",
    },
  },
  category: "technology",
  classification: "Desenvolvimento Web, Criação de Sites, Sistemas Personalizados, Aplicações Web",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" itemScope itemType="https://schema.org/Organization" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00d4ff" />
      </head>
      <body
        className={`${orbitron.variable} ${exo.variable} ${jetbrainsMono.variable} ${rajdhani.variable} antialiased`}
        suppressHydrationWarning
      >
        <AchievementProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <MarioAutoPlay />
          <WhatsAppFloat 
            phoneNumber="5511956534963"
            position="bottom-left"
            companyName="PlayCode Agency"
            showTooltip={true}
            message="Olá! Gostaria de saber mais sobre os serviços da PlayCode Agency 🎮"
          />
          <GlobalParticles />
          <KonamiEffects />
        </AchievementProvider>
      </body>
    </html>
  );
}
