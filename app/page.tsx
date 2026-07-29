import { FaqSection } from '@/components/faq-section'
import { HeroSection } from '@/components/hero-section'
import { PromoBanner } from '@/components/promo-banner'
import { ReasonsToJoin } from '@/components/reasons-to-join'
import { SiteFooter } from '@/components/site-footer'
import { TrendingRow } from '@/components/trending-row'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <main>
        <HeroSection />
        <TrendingRow />
        <ReasonsToJoin />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}
