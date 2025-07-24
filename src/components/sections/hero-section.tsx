'use client'

import { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStage, setGenerationStage] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [activePreview, setActivePreview] = useState(0)
  const [userCount, setUserCount] = useState(12847)
  const heroRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const stages = [
    { text: "🎨 Designing your vibe...", icon: "✨", color: "from-pink-500 to-rose-500" },
    { text: "🚀 Building something epic...", icon: "🔥", color: "from-purple-500 to-indigo-500" },
    { text: "⚡ Adding the magic touch...", icon: "💫", color: "from-blue-500 to-cyan-500" },
    { text: "🎯 Making it perfect for you...", icon: "🎊", color: "from-green-500 to-emerald-500" },
    { text: "✨ Almost ready to blow your mind!", icon: "🎉", color: "from-orange-500 to-red-500" }
  ]

  const trendingPrompts = [
    { text: "test crypto", emoji: "📈", trend: "NEW!" },
    { text: "AI-powered fitness app with social features", emoji: "💪", trend: "+342%" },
    { text: "Sustainable fashion e-commerce store", emoji: "🌱", trend: "+198%" },
    { text: "Mental wellness app with meditation", emoji: "🧘", trend: "+156%" },
    { text: "Food delivery app with AR menu", emoji: "🍔", trend: "+234%" }
  ]

  const showcaseExamples = [
    {
      title: "Startup Landing",
      preview: "Modern SaaS platform with dark theme, animated gradients, and interactive demos",
      tech: ["React", "AI", "Analytics"],
      color: "from-purple-600 to-pink-600",
      image: "🚀"
    },
    {
      title: "E-commerce Store", 
      preview: "Trendy fashion store with product filters, reviews, and social shopping",
      tech: ["Commerce", "Social", "Mobile"],
      color: "from-blue-600 to-cyan-600", 
      image: "🛍️"
    },
    {
      title: "Portfolio Site",
      preview: "Creative portfolio with 3D animations, smooth scrolling, and contact forms",
      tech: ["Design", "3D", "Contact"],
      color: "from-green-600 to-emerald-600",
      image: "🎨"
    }
  ]

  // Enhanced mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight
      setMousePosition({ x: x * 20, y: y * 20 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Load animation and user count animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    
    // Animate user count
    const countInterval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 3000)

    // Auto-cycle preview examples
    const previewInterval = setInterval(() => {
      setActivePreview(prev => (prev + 1) % showcaseExamples.length)
    }, 4000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(countInterval)
      clearInterval(previewInterval)
    }
  }, [])

  const simulateProgress = () => {
    let progressValue = 0
    let stageIndex = 0
    
    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 15 + 5
      
      if (progressValue >= 100) {
        progressValue = 100
        clearInterval(progressInterval)
        setGenerationStage('🎉 Your website is ready to rock!')
      } else {
        const newStageIndex = Math.floor((progressValue / 100) * stages.length)
        if (newStageIndex !== stageIndex && newStageIndex < stages.length) {
          stageIndex = newStageIndex
          setGenerationStage(stages[stageIndex].text)
        }
      }
      
      setGenerationProgress(progressValue)
    }, 800)
    
    return progressInterval
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Tell us what you want to build! 💭', {
        icon: '✨',
        style: { 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          fontWeight: '600',
          borderRadius: '12px'
        }
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationStage(stages[0].text)

    const progressInterval = simulateProgress()
    
    try {
      const response = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        clearInterval(progressInterval)
        setGenerationProgress(100)
        setGenerationStage('🎉 Your website is ready to rock!')
        
        toast.success(`🔥 ${data.siteName} is live and looking amazing!`, {
          style: { 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            fontWeight: '600',
            borderRadius: '12px'
          },
          duration: 4000
        })

        setTimeout(() => {
          router.push(`/${data.siteName}`)
        }, 2000)
      } else {
        throw new Error(data.error || 'Failed to generate site')
      }
    } catch {
      clearInterval(progressInterval)
      setIsGenerating(false)
      toast.error('Oops! Something went wrong. Let\'s try again! 🔄', {
        icon: '💫',
        style: { 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: '#fff',
          fontWeight: '600',
          borderRadius: '12px'
        }
      })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden" ref={heroRef}>
      {/* Advanced Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 animate-gradient"></div>
        
        {/* Animated mesh gradient */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at ${30 - mousePosition.x}% ${70 - mousePosition.y}%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at ${70 + mousePosition.x}% ${30 + mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
          }}
        ></div>
        
        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-morphing"></div>
        
        {/* Interactive particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative flex-1 flex flex-col z-10">
        {/* Modern Header with Glassmorphism */}
        <header className={`flex items-center justify-between p-6 backdrop-blur-xl bg-white/5 border-b border-white/10 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 animate-floating-glow">
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
          
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {['Community', 'Showcase', 'Pricing', 'Learn'].map((item, index) => (
              <a 
                key={item}
                href="#" 
                className={`text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 relative group animate-slide-down font-medium`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300 font-medium">{userCount.toLocaleString()} users online</span>
            </div>
            <button className="text-sm text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl btn-shimmer">
              Get Started Free
            </button>
          </div>
        </header>

        {/* Enhanced Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 relative">
          <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Main Content */}
            <div className={`text-center lg:text-left transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              
              {/* Trending Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-pink-500/30 rounded-full px-4 py-2 mb-6 animate-bounce-in">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-pink-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-white font-medium text-sm">🔥 Trending: AI is the future</span>
              </div>

              {/* Main Heading with Gradient Animation */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                <span className="inline-block animate-slide-up">Build</span>
                {' '}
                <span className="inline-block animate-slide-up" style={{ animationDelay: '200ms' }}>
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-text-glow">
                    Anything
                  </span>
                </span>
                <br />
                <span className="inline-block animate-slide-up" style={{ animationDelay: '400ms' }}>with</span>
                {' '}
                <span className="inline-flex items-center gap-2 animate-slide-up" style={{ animationDelay: '600ms' }}>
                  <span className="text-4xl md:text-5xl lg:text-6xl animate-floating-glow">🤖</span>
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    AI Magic
                  </span>
                </span>
              </h1>
              
              <p className={`text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-light max-w-2xl transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                Just describe what you want, and watch AI create stunning websites, apps, and digital experiences in 
                <span className="text-cyan-400 font-semibold"> seconds, not hours</span> ⚡
              </p>

              {/* Enhanced Input Section */}
              <div className={`max-w-2xl transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1000ms' }}>
                <div className="relative group mb-6">
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
                  
                  {/* Input container */}
                  <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                    
                    <div className="flex items-center gap-3 p-2">
                      <div className="flex-1">
                        <textarea
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleGenerate()
                            }
                          }}
                          placeholder="✨ Describe your dream website or app..."
                          className="w-full bg-transparent border-0 px-4 py-4 text-white placeholder-gray-400 focus:outline-none resize-none text-lg font-medium"
                          rows={2}
                          disabled={isGenerating}
                        />
                      </div>
                      
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white p-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 group-hover:shadow-xl"
                      >
                        {isGenerating ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trending Examples */}
                {!isGenerating && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-pink-400">🔥</span>
                      <span className="font-medium">Trending ideas this week:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingPrompts.slice(0, 3).map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setPrompt(example.text)}
                          className={`group bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-2 rounded-xl text-sm transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-105 animate-scale-in flex items-center gap-2`}
                          style={{ animationDelay: `${1200 + index * 100}ms` }}
                        >
                          <span>{example.emoji}</span>
                          <span className="font-medium">{example.text}</span>
                          <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                            {example.trend}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Interactive Preview */}
            <div className={`hidden lg:block transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
              <div className="relative">
                
                {/* Preview Card */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-lg">✨ Live Preview</h3>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${showcaseExamples[activePreview].color} opacity-20`}></div>
                    
                    <div className="relative p-6 h-full flex flex-col justify-between">
                      <div>
                        <div className="text-4xl mb-3">{showcaseExamples[activePreview].image}</div>
                        <h4 className="text-white font-bold text-xl mb-2">
                          {showcaseExamples[activePreview].title}
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {showcaseExamples[activePreview].preview}
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        {showcaseExamples[activePreview].tech.map((tech, i) => (
                          <span key={i} className="bg-white/10 text-white px-2 py-1 rounded-lg text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview indicators */}
                  <div className="flex justify-center gap-2 mt-4">
                    {showcaseExamples.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActivePreview(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activePreview ? 'bg-purple-500 w-6' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Floating stats */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl shadow-xl animate-float">
                  <div className="text-xs font-medium">⚡ Generated in 12s</div>
                </div>
                
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                  <div className="text-xs font-medium">🔥 +2.3k this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Processing Modal */}
        {isGenerating && (
          <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center z-50 animate-scale-in">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 max-w-lg w-full mx-4 shadow-2xl relative overflow-hidden">
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 animate-gradient"></div>
              
              <div className="relative z-10">
                {/* AI Robot Animation */}
                <div className="flex flex-col items-center text-center mb-10">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl animate-floating-glow">
                      <span className="text-4xl">🤖</span>
                    </div>
                    
                    {/* Orbital rings */}
                    <div className="absolute inset-0 w-24 h-24">
                      <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-orbit"></div>
                      <div className="absolute inset-2 border-2 border-pink-500/30 rounded-full animate-orbit" style={{ animationDelay: '1s', animationDirection: 'reverse' }}></div>
                      <div className="absolute inset-4 border border-cyan-500/30 rounded-full animate-orbit" style={{ animationDelay: '2s' }}></div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-3 animate-text-glow">
                    Creating Magic ✨
                  </h3>
                  <p className="text-gray-300 text-lg">
                    AI is crafting your perfect website
                  </p>
                </div>

                {/* Enhanced Progress */}
                <div className="space-y-6">
                  <div className="relative">
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                      <div 
                        className={`h-full bg-gradient-to-r ${stages[Math.floor((generationProgress / 100) * stages.length)]?.color || 'from-purple-500 to-pink-500'} rounded-full transition-all duration-700 ease-out relative`}
                        style={{ width: `${generationProgress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>0%</span>
                      <span className="font-bold text-white">{Math.round(generationProgress)}%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Current Stage */}
                  <div className="text-center">
                    <p className="text-white font-medium text-lg animate-pulse">
                      {generationStage}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      { icon: "⚡", text: "Lightning fast", done: generationProgress > 20 },
                      { icon: "🎨", text: "Beautiful design", done: generationProgress > 40 },
                      { icon: "📱", text: "Mobile optimized", done: generationProgress > 60 },
                      { icon: "🚀", text: "SEO ready", done: generationProgress > 80 }
                    ].map((feature, index) => (
                      <div key={index} className={`flex items-center gap-2 transition-all duration-500 ${feature.done ? 'text-green-400' : 'text-gray-500'}`}>
                        <span className={`${feature.done ? 'animate-bounce' : ''}`}>{feature.icon}</span>
                        <span className={`${feature.done ? 'font-medium' : ''}`}>{feature.text}</span>
                        {feature.done && <span className="text-green-400">✓</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 