import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@/lib/api/anthropic'
import { testCalculatorHTML } from '@/lib/test-calculator'
import { testWeatherAppHTML } from '@/lib/test-weather-app'
import { testRestaurantHTML } from '@/lib/test-restaurant'
import { testCryptoDashboardHTML } from '@/lib/test-crypto-dashboard'
import { testTextToVideoHTML } from '@/lib/test-text-to-video'

export interface GenerateSiteRequest {
  prompt: string
}

// In-memory storage for generated sites with persistence across hot reloads
const globalForGeneratedSites = globalThis as unknown as {
  generatedSites: Map<string, {
    html: string
    prompt: string
    title: string
    createdAt: string
  }> | undefined
}

const generatedSites = globalForGeneratedSites.generatedSites ?? new Map<string, {
  html: string
  prompt: string
  title: string
  createdAt: string
}>()

if (process.env.NODE_ENV === 'development') {
  globalForGeneratedSites.generatedSites = generatedSites
}

// Initialize storage and log startup
if (generatedSites.size === 0) {
  console.log('🏗️ Site storage initialized')
} else {
  console.log(`🔄 Site storage restored with ${generatedSites.size} existing sites`)
}

function debugStorage() {
  console.log(`📦 Storage state: ${generatedSites.size} sites stored`)
  console.log(`📝 Site keys: [${Array.from(generatedSites.keys()).join(', ')}]`)
}

function extractTitleFromHTML(html: string): string | null {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i)
  return titleMatch ? titleMatch[1] : null
}

function cleanGeneratedHTML(html: string): string {
  return html
    .replace(/```html/g, '')
    .replace(/```/g, '')
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateSiteRequest = await request.json()
    const { prompt } = body

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Generate a site name from the prompt
    const siteName = generateSiteName(prompt)
    console.log(`🚀 Generating site with name: ${siteName}`)

    // Check if this is a test request
    if (prompt.toLowerCase().includes('test calculator')) {
      const cleanHTML = testCalculatorHTML
      
      generatedSites.set(siteName, {
        html: cleanHTML,
        prompt,
        createdAt: new Date().toISOString(),
        title: 'Test Calculator'
      })

      console.log(`✅ Test calculator stored with key: ${siteName}`)
      debugStorage()

      return NextResponse.json({
        siteName,
        message: 'Test calculator generated successfully',
        url: `http://localhost:3002/${siteName}`
      })
    }

    if (prompt.toLowerCase().includes('test weather')) {
      const cleanHTML = testWeatherAppHTML
      
      generatedSites.set(siteName, {
        html: cleanHTML,
        prompt,
        createdAt: new Date().toISOString(),
        title: 'Test Weather App'
      })

      console.log(`✅ Test weather app stored with key: ${siteName}`)
      debugStorage()

      return NextResponse.json({
        siteName,
        message: 'Test weather app generated successfully',
        url: `http://localhost:3002/${siteName}`
      })
    }

    if (prompt.toLowerCase().includes('test restaurant')) {
      const cleanHTML = testRestaurantHTML
      
      generatedSites.set(siteName, {
        html: cleanHTML,
        prompt,
        createdAt: new Date().toISOString(),
        title: 'Test Restaurant'
      })

      console.log(`✅ Test restaurant stored with key: ${siteName}`)
      debugStorage()

      return NextResponse.json({
        siteName,
        message: 'Test restaurant generated successfully',
        url: `http://localhost:3002/${siteName}`
      })
    }

    if (prompt.toLowerCase().includes('test crypto') || prompt.toLowerCase().includes('test trading')) {
      const cleanHTML = testCryptoDashboardHTML
      
      generatedSites.set(siteName, {
        html: cleanHTML,
        prompt,
        createdAt: new Date().toISOString(),
        title: 'CryptoTrade Pro Dashboard'
      })

      console.log(`✅ Test crypto dashboard stored with key: ${siteName}`)
      debugStorage()

      return NextResponse.json({
        siteName,
        message: 'Test crypto dashboard generated successfully',
        url: `http://localhost:3002/${siteName}`
      })
    }

    // Check for video generation requests
    if (detectProjectType(prompt) === 'video-generator') {
      const cleanHTML = testTextToVideoHTML
      
      generatedSites.set(siteName, {
        html: cleanHTML,
        prompt,
        createdAt: new Date().toISOString(),
        title: 'TextToVideo AI - Video Generator'
      })

      console.log(`✅ Text-to-video generator stored with key: ${siteName}`)
      debugStorage()

      return NextResponse.json({
        siteName,
        message: 'Text-to-video generator generated successfully',
        url: `http://localhost:3000/${siteName}`,
        title: 'TextToVideo AI - Video Generator'
      })
    }

    // Create sophisticated AI prompt based on the request type
    const aiPrompt = createAdvancedPrompt(prompt)

    console.log(`🤖 Generating AI site for prompt: ${prompt}`)

    // Generate the site using Anthropic with increased capacity for comprehensive content
    const generatedHTML = await anthropic.generateAdvancedCode(aiPrompt, 'Professional Web Application')
    const cleanHTML = cleanGeneratedHTML(generatedHTML)

    console.log(`📄 Generated HTML length: ${cleanHTML.length} characters`)

    // Store the generated site with enhanced debugging
    const siteData = {
      html: cleanHTML,
      prompt,
      createdAt: new Date().toISOString(),
      title: extractTitleFromHTML(cleanHTML) || siteName
    }

    generatedSites.set(siteName, siteData)
    
    console.log(`✅ AI-generated site stored with key: ${siteName}`)
    debugStorage()

    return NextResponse.json({
      siteName,
      message: 'Website generated successfully',
      url: `http://localhost:3002/${siteName}`,
      title: siteData.title
    })

  } catch (error) {
    console.error('❌ Site generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate site',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const siteName = searchParams.get('siteName')

    console.log(`🔍 GET request for siteName: "${siteName}"`)
    debugStorage()

    if (siteName) {
      // Prevent favicon.ico and other non-site requests
      if (siteName === 'favicon.ico' || siteName.includes('.') || siteName.length < 3) {
        console.log(`🚫 Rejecting invalid siteName: ${siteName}`)
        return new NextResponse('Not Found', { status: 404 })
      }

      const site = generatedSites.get(siteName)
      
      if (!site) {
        console.log(`❌ Site not found: ${siteName}`)
        console.log(`📝 Available sites: [${Array.from(generatedSites.keys()).join(', ')}]`)
        
        return NextResponse.json(
          { 
            error: 'Site not found',
            siteName,
            availableSites: Array.from(generatedSites.keys())
          },
          { status: 404 }
        )
      }

      console.log(`✅ Site found and returning: ${siteName}`)
      return NextResponse.json(site)
    } else {
      // Return all sites
      const sites = Array.from(generatedSites.entries()).map(([name, site]) => ({
        name,
        ...site
      }))
      
      console.log(`📋 Returning all sites: ${sites.length} total`)
      return NextResponse.json({ sites })
    }

  } catch (error) {
    console.error('❌ Get site error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve site',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function generateSiteName(prompt: string): string {
  const cleaned = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
  
  const timestamp = Date.now().toString().slice(-6)
  return `${cleaned}-${timestamp}`
}

function detectProjectType(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase()
  
  // Trading/Finance
  if (lowerPrompt.includes('trading') || lowerPrompt.includes('crypto') || lowerPrompt.includes('financial') || lowerPrompt.includes('investment') || lowerPrompt.includes('portfolio') && lowerPrompt.includes('dashboard')) {
    return 'trading-dashboard'
  }
  
  // E-commerce
  if (lowerPrompt.includes('ecommerce') || lowerPrompt.includes('e-commerce') || lowerPrompt.includes('store') || lowerPrompt.includes('shop') || lowerPrompt.includes('marketplace') || lowerPrompt.includes('product')) {
    return 'ecommerce'
  }
  
  // Portfolio/Personal
  if (lowerPrompt.includes('portfolio') && !lowerPrompt.includes('dashboard') || lowerPrompt.includes('personal') || lowerPrompt.includes('resume') || lowerPrompt.includes('cv')) {
    return 'portfolio'
  }
  
  // SaaS/Landing
  if (lowerPrompt.includes('saas') || lowerPrompt.includes('landing') || lowerPrompt.includes('startup') || lowerPrompt.includes('business')) {
    return 'saas-landing'
  }
  
  // Food/Restaurant
  if (lowerPrompt.includes('restaurant') || lowerPrompt.includes('food') || lowerPrompt.includes('recipe') || lowerPrompt.includes('menu') || lowerPrompt.includes('cafe')) {
    return 'restaurant'
  }
  
  // Fitness/Health
  if (lowerPrompt.includes('fitness') || lowerPrompt.includes('health') || lowerPrompt.includes('wellness') || lowerPrompt.includes('meditation') || lowerPrompt.includes('workout')) {
    return 'fitness'
  }
  
  // Education
  if (lowerPrompt.includes('education') || lowerPrompt.includes('learning') || lowerPrompt.includes('course') || lowerPrompt.includes('tutorial') || lowerPrompt.includes('training')) {
    return 'education'
  }
  
  // Video/AI Generation
  if (lowerPrompt.includes('video') || lowerPrompt.includes('text to video') || lowerPrompt.includes('video generator') || lowerPrompt.includes('ai video') || lowerPrompt.includes('video creation')) {
    return 'video-generator'
  }
  
  // Blog/Content
  if (lowerPrompt.includes('blog') || lowerPrompt.includes('news') || lowerPrompt.includes('magazine') || lowerPrompt.includes('content')) {
    return 'blog'
  }
  
  // Dashboard/Analytics
  if (lowerPrompt.includes('dashboard') || lowerPrompt.includes('analytics') || lowerPrompt.includes('admin') || lowerPrompt.includes('management')) {
    return 'dashboard'
  }
  
  return 'general'
}

function createAdvancedPrompt(userPrompt: string): string {
  const projectType = detectProjectType(userPrompt)
  const isDarkMode = userPrompt.toLowerCase().includes('dark mode') || userPrompt.toLowerCase().includes('dark theme')
  
  let specificInstructions = ''
  const colorScheme = isDarkMode ? 'dark' : 'light'
  let sampleData = ''
  
  switch (projectType) {
    case 'trading-dashboard':
      specificInstructions = `
CRYPTO TRADING DASHBOARD SPECIFICATIONS:
- Create a sophisticated trading dashboard with real-time market data visualization
- Include interactive charts (candlestick, line charts) showing price movements
- Add a trading panel with buy/sell functionality
- Display portfolio overview with profit/loss indicators
- Include watchlist with trending cryptocurrencies
- Add market statistics and analysis panels
- Use professional financial UI patterns
- Include dark theme with green/red accents for gains/losses
- Add responsive design for mobile trading
- Include modern data tables with sorting and filtering`
      
      sampleData = `
REALISTIC SAMPLE DATA TO INCLUDE:
- Bitcoin: $42,850.23 (+2.45% / +$1,024.50)
- Ethereum: $2,856.12 (-1.23% / -$35.67)
- Portfolio Value: $124,532.89 (+$3,241.50 today)
- Total P&L: +15.6% (+$16,892.34)
- Trading Volume: $28.5B (24h)
- Market Cap: $1.2T
- Fear & Greed Index: 67 (Greed)
- Popular coins: SOL, ADA, DOT, MATIC, AVAX
- Recent trades, order book data, price alerts`
      break
      
    case 'ecommerce':
      specificInstructions = `
E-COMMERCE STORE SPECIFICATIONS:
- Create a modern online store with product catalog
- Include shopping cart and checkout functionality
- Add product filters, search, and categories
- Display product reviews and ratings
- Include promotional banners and featured products
- Add user account and wishlist features
- Use modern e-commerce UI patterns
- Include mobile-responsive product grid
- Add payment integration UI mockups
- Include inventory and stock indicators`
      
      sampleData = `
REALISTIC SAMPLE DATA TO INCLUDE:
- Featured products with high-quality images
- Product categories: Electronics, Fashion, Home, Beauty
- Customer reviews (4.5★ ratings)
- Pricing with discounts and promotions
- Free shipping offers
- Popular items and bestsellers
- Product specifications and descriptions
- Size guides and color options
- Recently viewed items`
      break
      
    case 'saas-landing':
      specificInstructions = `
SAAS LANDING PAGE SPECIFICATIONS:
- Create a conversion-focused landing page
- Include compelling headline and value proposition
- Add feature highlights with icons and descriptions
- Include social proof (testimonials, logos, statistics)
- Add pricing tiers with comparison table
- Include call-to-action buttons throughout
- Add FAQ section and support information
- Use modern SaaS design patterns
- Include demo or trial signup forms
- Add integration logos and technical specs`
      
      sampleData = `
REALISTIC SAMPLE DATA TO INCLUDE:
- "Increase productivity by 300% with AI-powered automation"
- Customer logos: Microsoft, Google, Slack, Shopify
- "Trusted by 50,000+ companies worldwide"
- Pricing: Starter ($29/mo), Pro ($99/mo), Enterprise ($299/mo)
- Features: AI Analytics, Team Collaboration, 24/7 Support
- Testimonials with real names and companies
- Performance metrics and ROI data`
      break
      
    case 'portfolio':
      specificInstructions = `
PORTFOLIO WEBSITE SPECIFICATIONS:
- Create a personal/professional portfolio showcase
- Include hero section with professional introduction
- Add project gallery with case studies
- Include skills and expertise sections
- Add contact form and social media links
- Include about section with personal story
- Use clean, professional design patterns
- Add smooth scrolling and animations
- Include testimonials from clients/colleagues
- Add downloadable resume/CV functionality`
      break
      
    case 'video-generator':
      specificInstructions = `
TEXT-TO-VIDEO GENERATOR SPECIFICATIONS:
- Create a sophisticated AI-powered text-to-video generation platform
- Include a large, prominent text input area for video prompts
- Add video generation controls with style options (Professional, Creative, Minimal)
- Display a functional video player with proper controls (play, pause, volume, fullscreen)
- Include video generation progress indicators and loading states
- Add video preview thumbnails and generation history
- Include export options (MP4, different resolutions, download)
- Use modern AI tool design patterns with gradients and glassmorphism
- Add realistic demo videos that actually play and show content
- Include social sharing features and video analytics
- Add subscription tiers and usage limits display
- Include advanced video settings (duration, aspect ratio, voice options)
- Add proper error handling and user feedback systems
- Include tutorial/help sections and feature highlights`
      
      sampleData = `
REALISTIC SAMPLE DATA AND FUNCTIONALITY:
- Demo videos: Sample AI-generated videos that actually play
- Video formats: MP4, WebM, MOV support
- Resolution options: 720p, 1080p, 4K
- Duration options: 15s, 30s, 60s, 120s
- Voice options: Male, Female, Narrator styles
- Style presets: Corporate, Casual, Educational, Marketing
- Generated video examples with real playable content
- Progress indicators: "Generating script...", "Creating visuals...", "Rendering audio..."
- Export options with realistic file sizes and download links
- Usage tracking: "3/10 videos generated this month"
- Success messages: "Video generated successfully!" with proper modal dialogs
- Include realistic video thumbnails and metadata`
      break
      
    default:
      specificInstructions = `
GENERAL WEBSITE SPECIFICATIONS:
- Create a modern, professional website matching the user's request
- Include relevant sections and content for the specified purpose
- Use appropriate design patterns for the industry/use case
- Add interactive elements and smooth animations
- Include proper navigation and user experience
- Make it conversion-focused with clear calls to action`
  }

  return `Create a complete, production-ready, professional HTML website based on this specific request: "${userPrompt}"

${specificInstructions}

CORE TECHNICAL REQUIREMENTS:
1. Generate a COMPLETE HTML document with proper DOCTYPE, head, and body
2. Include sophisticated, modern CSS with advanced styling techniques
3. Use ${colorScheme} theme with appropriate color schemes
4. Make it fully responsive (mobile-first design)
5. Include interactive JavaScript for dynamic functionality
6. Add smooth animations, transitions, and micro-interactions
7. Use CSS Grid and Flexbox for complex layouts
8. Include proper semantic HTML for accessibility
9. Add comprehensive meta tags for SEO optimization
10. Use modern CSS features (custom properties, calc(), clamp())

DESIGN EXCELLENCE:
- Professional typography with perfect hierarchy
- Consistent spacing system (8px grid)
- Modern UI components (glassmorphism, subtle shadows)
- Sophisticated color palette with proper contrast
- Smooth hover effects and transitions
- Loading states and interactive feedback
- Professional icons and imagery placeholders
- Mobile-optimized touch targets
- Accessibility considerations (ARIA labels, focus states)

CONTENT & DATA:
${sampleData}
- Use realistic, professional content relevant to the request
- Include proper headings, descriptions, and call-to-actions
- Add sample data that makes sense for the use case
- Include placeholder images with proper alt text
- Make all content engaging and conversion-focused
- Add proper contact information and links

ADVANCED FEATURES:
- Interactive charts and data visualizations (if applicable)
- Form validation with user feedback
- Search and filter functionality (if applicable)
- Modal dialogs and dropdown menus
- Responsive navigation with mobile menu
- Loading animations and skeleton screens
- Error states and empty states
- Progressive enhancement principles

PERFORMANCE & QUALITY:
- Optimized CSS with minimal redundancy
- Efficient JavaScript with proper event handling
- Fast loading with optimized asset loading
- Cross-browser compatibility
- Clean, maintainable code structure
- Proper vendor prefixes for CSS
- Mobile performance optimization

Generate ONLY the complete HTML document with embedded CSS and JavaScript. No explanations, no markdown formatting, just the clean HTML code ready for production use.`
} 