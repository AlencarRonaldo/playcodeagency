'use client'

import AchievementProvider from '@/domains/gaming/components/AchievementProvider'
import KonamiEffects from '@/domains/gaming/components/KonamiEffects'
import MarioAutoPlay from '@/domains/gaming/components/MarioAutoPlay'

interface GamingLayoutProps {
  children: React.ReactNode
}

export default function GamingLayout({ children }: GamingLayoutProps) {
  return (
    <AchievementProvider>
      {children}
      <MarioAutoPlay />
      <KonamiEffects />
    </AchievementProvider>
  )
}