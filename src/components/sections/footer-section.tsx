'use client'

import { useState, useEffect } from 'react'

export function FooterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [socialStats, setSocialStats] = useState({
    discord: '12.4K',
    twitter: '8.9K', 
    github: '15.2K',
    youtube: '4.6K'
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Animate social stats
  useEffect(() => {
    const interval = setInterval(() => {
      setSocialStats(prev => ({
        discord: `${(parseFloat(prev.discord) + 0.1).toFixed(1)}K`,
        twitter: `${(parseFloat(prev.twitter) + 0.1).toFixed(1)}K`,
        github: `${(parseFloat(prev.github) + 0.2).toFixed(1)}K`,
        youtube: `${(parseFloat(prev.youtube) + 0.1).toFixed(1)}K`
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const quickLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Dashboard', href: '#', emoji: '🎛️' },
        { name: 'Templates', href: '#', emoji: '🎨' },
        { name: 'AI Features', href: '#', emoji: '🤖' },
        { name: 'Analytics', href: '#', emoji: '📊' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Discord Server', href: '#', emoji: '💬' },
        { name: 'GitHub', href: '#', emoji: '💻' },
        { name: 'Showcase', href: '#', emoji: '✨' },
        { name: 'Blog', href: '#', emoji: '📝' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#', emoji: '📚' },
        { name: 'API Reference', href: '#', emoji: '⚡' },
        { name: 'Video Tutorials', href: '#', emoji: '🎥' },
        { name: 'Best Practices', href: '#', emoji: '💡' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#', emoji: '🚀' },
        { name: 'Careers', href: '#', emoji: '💼' },
        { name: 'Press Kit', href: '#', emoji: '📰' },
        { name: 'Contact', href: '#', emoji: '📧' }
      ]
    }
  ]

  const socialLinks = [
    { 
      name: 'Discord', 
      href: '#', 
      icon: '💬',
      count: socialStats.discord,
      gradient: 'from-indigo-500 to-purple-500',
      hoverColor: 'hover:text-indigo-400'
    },
    { 
      name: 'Twitter', 
      href: '#', 
      icon: '🐦',
      count: socialStats.twitter,
      gradient: 'from-blue-400 to-cyan-400',
      hoverColor: 'hover:text-blue-400'
    },
    { 
      name: 'GitHub', 
      href: '#', 
      icon: '⭐',
      count: socialStats.github,
      gradient: 'from-gray-500 to-gray-600',
      hoverColor: 'hover:text-gray-400'
    },
    { 
      name: 'YouTube', 
      href: '#', 
      icon: '🎬',
      count: socialStats.youtube,
      gradient: 'from-red-500 to-pink-500',
      hoverColor: 'hover:text-red-400'
    }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Top border gradient */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Newsletter Section */}
          <div className={`text-center mb-16 transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="max-w-2xl mx-auto">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-white font-medium text-sm">🚀 Join the Movement</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay in the 
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-text-glow">
                  {' '}Loop
                </span>
              </h3>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Get the latest AI trends, exclusive templates, and be the first to know about new features. 
                <span className="text-purple-400 font-semibold"> No spam, just value</span> ✨
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubscribe} className="relative max-w-md mx-auto">
                <div className="relative group">
                  
                  {/* Glowing border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 overflow-hidden">
                    <div className="flex items-center">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 bg-transparent px-6 py-4 text-white placeholder-gray-400 focus:outline-none"
                        disabled={isSubscribed}
                      />
                      <button
                        type="submit"
                        disabled={!email.trim() || isSubscribed}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 font-semibold transition-all duration-300 disabled:opacity-50 hover:scale-105"
                      >
                        {isSubscribed ? '✓' : '→'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {isSubscribed && (
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm font-medium animate-bounce-in backdrop-blur-xl">
                    🎉 Welcome to the future!
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className={`lg:col-span-1 transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                    <span className="text-white font-bold text-xl">❤️</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Lovable
                  </span>
                  <div className="text-xs text-emerald-400 font-medium">✨ AI Powered</div>
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                Empowering the next generation of creators to build amazing digital experiences with AI. 
                <span className="text-purple-400">Join the revolution</span> 🚀
              </p>
              
              {/* Social Stats */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-green-400">🌍</span>
                  <span>Active in 89+ countries</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-purple-400">⚡</span>
                  <span>50K+ sites generated this month</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            {quickLinks.map((section, sectionIndex) => (
              <div 
                key={section.title}
                className={`transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${400 + sectionIndex * 100}ms` }}
              >
                <h4 className="text-white font-bold mb-6 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={link.name}>
                      <a 
                        href={link.href}
                        className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 animate-slide-up"
                        style={{ animationDelay: `${800 + sectionIndex * 100 + linkIndex * 50}ms` }}
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">{link.emoji}</span>
                        <span className="group-hover:font-medium transition-all duration-300">{link.name}</span>
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media Section */}
          <div className={`border-t border-white/10 pt-8 transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="text-center mb-8">
              <h4 className="text-white font-bold text-xl mb-4">
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Join Our Community
                </span>
              </h4>
              <p className="text-gray-400">Connect with creators, get support, and share your builds</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`group bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-center animate-scale-in`}
                  style={{ animationDelay: `${1200 + index * 100}ms` }}
                >
                  <div className={`text-3xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {social.icon}
                  </div>
                  <div className="text-white font-bold mb-1 group-hover:text-gray-100">
                    {social.name}
                  </div>
                  <div className={`text-sm font-semibold bg-gradient-to-r ${social.gradient} bg-clip-text text-transparent`}>
                    {social.count} members
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 rounded-2xl`}></div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`border-t border-white/10 pt-8 transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Copyright */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <span>© 2024 Lovable.</span>
                  <span className="text-pink-400 animate-pulse">Made with AI ❤️</span>
                </div>
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">Privacy</a>
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">Terms</a>
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">Cookies</a>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium text-xs">All Systems Operational</span>
                </div>
                <div className="text-gray-500 text-xs">
                  99.9% Uptime
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 