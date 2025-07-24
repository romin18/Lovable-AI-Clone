'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { GeneratedSiteRenderer } from '@/components/site/generated-site-renderer'

interface SiteData {
  html: string
  prompt: string
  title: string
  createdAt: string
}

export default function SitePage() {
  const params = useParams()
  const sitename = params.sitename as string
  const [siteData, setSiteData] = useState<SiteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    async function fetchSiteData() {
      console.log(`🔍 Fetching site data for: ${sitename}`)
      
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/generate-site?siteName=${sitename}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        console.log(`📡 Response status: ${response.status}`)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error(`❌ Error response:`, errorData)
          
          if (response.status === 404) {
            setError(`Site "${sitename}" not found. It may have expired or the URL is incorrect.`)
          } else {
            setError(`Failed to load site: ${errorData.error || 'Unknown error'}`)
          }
          return
        }
        
        const data = await response.json()
        console.log(`✅ Site data received:`, { 
          hasHtml: !!data.html, 
          htmlLength: data.html?.length,
          title: data.title,
          prompt: data.prompt 
        })
        
        if (!data.html) {
          setError('Site data is incomplete - no HTML content found')
          return
        }
        
        setSiteData(data)
      } catch (err) {
        console.error('❌ Fetch error:', err)
        setError('Failed to connect to server. Please check your connection and try again.')
      } finally {
        setLoading(false)
      }
    }

    if (sitename && sitename !== 'favicon.ico') {
      fetchSiteData()
    }
  }, [sitename, retryCount])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          {/* Enhanced loading animation */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-purple-200/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">
            🚀 Loading Your Website
          </h3>
          <p className="text-purple-300 text-base mb-4">
            Retrieving "{sitename}"...
          </p>
          <div className="w-full bg-purple-800/30 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !siteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Website Not Found
          </h1>
          <p className="text-red-300 mb-6 text-lg leading-relaxed">
            {error || `The website "${sitename}" doesn't exist or may have expired.`}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleRetry}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              🔄 Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              ❤️ Create New Website
            </button>
          </div>
          
          {retryCount > 0 && (
            <p className="text-purple-400 text-sm mt-4">
              Retry attempt: {retryCount}
            </p>
          )}
        </div>
      </div>
    )
  }

  return <GeneratedSiteRenderer siteData={siteData} />
} 