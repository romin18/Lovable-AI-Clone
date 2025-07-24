'use client'

import { useState, useEffect, useRef } from 'react'

export function FeaturesSection() {
  const [isInView, setIsInView] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState(0)
  const [stats, setStats] = useState({
    websites: 47892,
    users: 12847,
    countries: 89,
    satisfaction: 98
  })
  const sectionRef = useRef<HTMLElement>(null)

  const features = [
    {
      icon: "🤖",
      title: 'AI That Actually Gets You',
      description: 'Our AI understands modern trends, your brand voice, and what actually converts. No generic templates - just websites that feel authentically yours.',
      gradient: 'from-purple-500 to-pink-500',
      delay: '0ms',
      stats: { number: '10K+', label: 'Sites This Month' },
      tags: ['Smart', 'Personal', 'Trending']
    },
    {
      icon: "⚡",
      title: 'Instant Everything',
      description: 'Why wait days when you can have it in seconds? From concept to live website faster than you can brew your coffee. Ready to mind-blow your friends?',
      gradient: 'from-blue-500 to-cyan-500',
      delay: '200ms',
      stats: { number: '< 15s', label: 'Average Build' },
      tags: ['Fast', 'Instant', 'Viral']
    },
    {
      icon: "📱",
      title: 'Mobile-First Always',
      description: 'Built for the TikTok generation. Every site looks stunning on mobile, loads instantly, and keeps your visitors scrolling for more.',
      gradient: 'from-green-500 to-emerald-500',
      delay: '400ms',
      stats: { number: '100%', label: 'Mobile Perfect' },
      tags: ['Mobile', 'Social', 'Modern']
    },
    {
      icon: "🔥",
      title: 'Trend-Setting Designs',
      description: 'Stay ahead of the curve with designs that feel fresh, modern, and totally shareable. Your website will be the one everyone asks about.',
      gradient: 'from-orange-500 to-red-500',
      delay: '600ms',
      stats: { number: '98%', label: 'Love Rate' },
      tags: ['Fresh', 'Viral', 'Creative']
    }
  ]

  const socialProof = [
    {
      category: 'Creators',
      items: ['Content creators building portfolios', 'Influencers launching brands', 'Artists showcasing work']
    },
    {
      category: 'Entrepreneurs', 
      items: ['Startups raising funding', 'Side hustles going viral', 'Digital nomads building empires']
    },
    {
      category: 'Professionals',
      items: ['Freelancers getting clients', 'Consultants building authority', 'Coaches growing communities']
    }
  ]

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Animate stats
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setStats(prev => ({
          websites: prev.websites + Math.floor(Math.random() * 5) + 1,
          users: prev.users + Math.floor(Math.random() * 3) + 1,
          countries: prev.countries + (Math.random() > 0.7 ? 1 : 0),
          satisfaction: Math.min(99, prev.satisfaction + (Math.random() > 0.9 ? 1 : 0))
        }))
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isInView])

  // Auto-cycle social proof tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % socialProof.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-green-500/8 to-emerald-500/8 rounded-full blur-3xl animate-morphing"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Section Header */}
        <div className={`text-center mb-20 transition-all duration-1500 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Live Stats Banner */}
          <div className="inline-flex items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 mb-8 animate-bounce-in">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold text-sm">{stats.websites.toLocaleString()} sites created</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">🌍</span>
              <span className="text-white font-semibold text-sm">{stats.countries} countries</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⭐</span>
              <span className="text-white font-semibold text-sm">{stats.satisfaction}% satisfaction</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Why Everyone's 
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-text-glow">
              Choosing Lovable
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Join the <span className="text-purple-400 font-semibold">fastest-growing</span> community of creators, entrepreneurs, and dreamers building the future with AI
          </p>
        </div>

        {/* Enhanced Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: isInView ? feature.delay : '0ms' }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Enhanced Card Container */}
              <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-white/20 hover:-translate-y-3 group-hover:bg-white/8 overflow-hidden">
                
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-3xl`}></div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  
                  {/* Icon with enhanced effects */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 animate-floating-glow`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    
                    {/* Orbital rings on hover */}
                    <div className={`absolute inset-0 w-16 h-16 transition-all duration-500 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}>
                      <div className={`absolute inset-0 border border-current rounded-full animate-orbit`} style={{ color: feature.gradient.includes('purple') ? '#a855f7' : feature.gradient.includes('blue') ? '#3b82f6' : feature.gradient.includes('green') ? '#10b981' : '#f97316' }}></div>
                      <div className={`absolute inset-2 border border-current rounded-full animate-orbit opacity-50`} style={{ animationDelay: '1s', animationDirection: 'reverse', color: feature.gradient.includes('purple') ? '#ec4899' : feature.gradient.includes('blue') ? '#06b6d4' : feature.gradient.includes('green') ? '#34d399' : '#fb7185' }}></div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300 text-sm">
                    {feature.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 mb-4">
                    {feature.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className={`text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r ${feature.gradient} text-white opacity-75 group-hover:opacity-100 transition-opacity duration-300`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
                    <div>
                      <div className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {feature.stats.number}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {feature.stats.label}
                      </div>
                    </div>
                    
                    {/* Arrow icon */}
                    <div className={`w-8 h-8 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0`}>
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Click ripple effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150 rounded-3xl"></div>
                </div>
              </div>

              {/* Floating particles on hover */}
              {hoveredCard === index && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${feature.gradient} rounded-full animate-float opacity-60`}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Social Proof Section */}
        <div className={`mb-20 transition-all duration-1500 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Trusted by the Next Generation
              </span>
            </h3>
            <p className="text-gray-400 text-lg">See who's already building their dreams with Lovable</p>
          </div>

          {/* Tabbed Social Proof */}
          <div className="max-w-4xl mx-auto">
            {/* Tab buttons */}
            <div className="flex justify-center gap-4 mb-8">
              {socialProof.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === index 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {socialProof[activeTab].items.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 animate-slide-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Call-to-Action Section */}
        <div className={`text-center transition-all duration-1500 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Join the 
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-text-glow">
                {' '}Revolution?
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Stop dreaming, start building. Your next viral website is just one click away 🚀
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 overflow-hidden">
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3">
                  🚀 Start Building Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-green-400">✓</span>
                <span>No credit card required</span>
                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                <span>Free forever plan</span>
              </div>
            </div>
            
            {/* Live counter */}
            <div className="mt-8 inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <span className="text-green-400 font-semibold text-sm">
                {stats.users.toLocaleString()} creators online right now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-50 animate-gradient"></div>
    </section>
  )
} 