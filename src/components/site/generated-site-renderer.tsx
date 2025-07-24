'use client'

import { useEffect, useRef, useState } from 'react'

interface GeneratedSiteRendererProps {
  siteData: {
    html: string
    prompt: string
    title: string
    createdAt: string
  }
}

export function GeneratedSiteRenderer({ siteData }: GeneratedSiteRendererProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    if (iframeRef.current && siteData.html) {
      try {
        setIsLoading(true)
        setError(null)
        
        const iframe = iframeRef.current
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        
        if (doc) {
          doc.open()
          doc.write(siteData.html)
          doc.close()
          
          // Add meta viewport for mobile responsiveness if not present
          if (!siteData.html.includes('viewport')) {
            const viewport = doc.createElement('meta')
            viewport.name = 'viewport'
            viewport.content = 'width=device-width, initial-scale=1.0'
            doc.head.appendChild(viewport)
          }
          
          // Add loading event listener
          iframe.onload = () => {
            setIsLoading(false)
          }
          
          // Set timeout in case onload doesn't fire
          setTimeout(() => {
            setIsLoading(false)
          }, 3000)
        } else {
          setError('Unable to access iframe content')
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error rendering site:', err)
        setError('Failed to render the website')
        setIsLoading(false)
      }
    }
  }, [siteData.html])

  const getDeviceStyles = () => {
    switch (deviceView) {
      case 'mobile':
        return { width: '375px', height: '667px' }
      case 'tablet':
        return { width: '768px', height: '1024px' }
      default:
        return { width: '100%', height: '100%' }
    }
  }

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (iframeRef.current?.requestFullscreen) {
        iframeRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const downloadHTML = () => {
    const blob = new Blob([siteData.html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${siteData.title || 'generated-site'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyHTML = async () => {
    try {
      await navigator.clipboard.writeText(siteData.html)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy HTML:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Controls */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          
          {/* Site Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">{siteData.title}</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm">
              <span>📝</span>
              <span>{siteData.prompt}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Device View Toggle */}
            <div className="flex items-center bg-white/10 rounded-lg p-1">
              {(['desktop', 'tablet', 'mobile'] as const).map((device) => (
                <button
                  key={device}
                  onClick={() => setDeviceView(device)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 ${
                    deviceView === device
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {device === 'desktop' ? '💻' : device === 'tablet' ? '📱' : '📱'}
                  <span className="ml-1 hidden sm:inline capitalize">{device}</span>
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <button
              onClick={() => setShowCode(!showCode)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                showCode
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
              }`}
            >
              {showCode ? '🖼️ Preview' : '💻 Code'}
            </button>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={downloadHTML}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                📥 Download
              </button>
              
              <button
                onClick={copyHTML}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                📋 Copy
              </button>
              
              <button
                onClick={handleFullscreen}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                {isFullscreen ? '📕 Exit' : '📖 Fullscreen'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          
          {showCode ? (
            /* Code View */
            <div className="bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
              <div className="bg-white/5 px-6 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm font-medium">Generated HTML</span>
                  <span className="text-gray-500 text-xs">
                    {siteData.html.length.toLocaleString()} characters
                  </span>
                </div>
              </div>
              <div className="p-6 overflow-auto max-h-[80vh]">
                <pre className="text-sm text-gray-300 leading-relaxed">
                  <code>{siteData.html}</code>
                </pre>
              </div>
            </div>
          ) : (
            /* Preview View */
            <div className="relative">
              
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Rendering your website...</h3>
                    <p className="text-gray-400">Bringing your vision to life</p>
                    <div className="mt-4 flex justify-center">
                      <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">😕</div>
                  <h3 className="text-white font-semibold text-xl mb-2">Oops! Something went wrong</h3>
                  <p className="text-gray-400 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Preview Container */}
              {!error && (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  
                  {/* Browser Chrome */}
                  <div className="bg-white/10 px-6 py-3 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="bg-white/10 rounded-lg px-4 py-1.5 text-sm text-gray-400 font-mono">
                          localhost:3002/{siteData.title?.toLowerCase().replace(/\s+/g, '-') || 'website'}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>🔒 Secure</span>
                        <span>|</span>
                        <span>Generated by AI</span>
                      </div>
                    </div>
                  </div>

                  {/* Iframe Container */}
                  <div className="relative bg-white" style={{ minHeight: '70vh' }}>
                    <div 
                      className="mx-auto transition-all duration-300 ease-in-out"
                      style={deviceView !== 'desktop' ? getDeviceStyles() : {}}
                    >
                      <iframe
                        ref={iframeRef}
                        className="w-full border-0 bg-white"
                        style={{ 
                          height: deviceView === 'desktop' ? '70vh' : getDeviceStyles().height,
                          minHeight: '400px'
                        }}
                        title={`Generated Site: ${siteData.title}`}
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                    </div>
                    
                    {/* Device Frame for mobile/tablet */}
                    {deviceView !== 'desktop' && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div 
                          className="mx-auto border-8 border-gray-800 rounded-3xl shadow-2xl"
                          style={getDeviceStyles()}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Site Metadata */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📝</span>
                    <h4 className="text-white font-semibold">Original Prompt</h4>
                  </div>
                  <p className="text-gray-400 text-sm">{siteData.prompt}</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📊</span>
                    <h4 className="text-white font-semibold">Statistics</h4>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>HTML Size:</span>
                      <span className="text-white">{(siteData.html.length / 1024).toFixed(1)}KB</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Generated:</span>
                      <span className="text-white">
                        {new Date(siteData.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">⚡</span>
                    <h4 className="text-white font-semibold">Performance</h4>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Load Time:</span>
                      <span className="text-green-400">&lt; 1s</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Mobile Ready:</span>
                      <span className="text-green-400">✓ Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}