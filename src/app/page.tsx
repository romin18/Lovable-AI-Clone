import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { FooterSection } from '@/components/sections/footer-section'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <main className="relative">
        {/* Hero Section - Full height with sophisticated design */}
        <section className="relative">
          <HeroSection />
        </section>
        
        {/* Features Section - Enhanced with animations */}
        <section className="relative z-10">
          <FeaturesSection />
        </section>
      </main>
      
      {/* Footer Section - Professional and interactive */}
      <FooterSection />
    </div>
  )
} 