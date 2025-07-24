'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ExternalLink, Star, Eye, Heart, Search, Filter, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

// Mock community apps data
const communityApps = [
  {
    id: '1',
    title: 'Task Manager Pro',
    description: 'A beautiful task management app with team collaboration features',
    category: 'Internal Tools',
    author: 'Sarah Chen',
    likes: 234,
    views: 1250,
    isStarred: false,
    thumbnail: '🎯',
    tags: ['Productivity', 'Teams', 'React'],
    url: '#'
  },
  {
    id: '2',
    title: 'Portfolio Showcase',
    description: 'Modern portfolio website with smooth animations and dark mode',
    category: 'Website',
    author: 'Alex Kumar',
    likes: 189,
    views: 890,
    isStarred: true,
    thumbnail: '💼',
    tags: ['Portfolio', 'Animation', 'Next.js'],
    url: '#'
  },
  {
    id: '3',
    title: 'Recipe Finder',
    description: 'Find recipes based on ingredients you have at home',
    category: 'Consumer App',
    author: 'Maria Garcia',
    likes: 156,
    views: 2340,
    isStarred: false,
    thumbnail: '🍳',
    tags: ['Food', 'Search', 'Mobile'],
    url: '#'
  },
  {
    id: '4',
    title: 'Budget Tracker',
    description: 'Personal finance tracker with expense categorization',
    category: 'Personal',
    author: 'John Smith',
    likes: 203,
    views: 1560,
    isStarred: true,
    thumbnail: '💰',
    tags: ['Finance', 'Personal', 'Charts'],
    url: '#'
  },
  {
    id: '5',
    title: 'CRM Dashboard',
    description: 'Customer relationship management system for small businesses',
    category: 'B2B App',
    author: 'Emily Johnson',
    likes: 167,
    views: 980,
    isStarred: false,
    thumbnail: '📊',
    tags: ['CRM', 'Business', 'Analytics'],
    url: '#'
  },
  {
    id: '6',
    title: 'Event Planner',
    description: 'Plan and organize events with guest management and scheduling',
    category: 'Prototype',
    author: 'David Wilson',
    likes: 145,
    views: 750,
    isStarred: false,
    thumbnail: '🎪',
    tags: ['Events', 'Planning', 'Calendar'],
    url: '#'
  }
]

const categoryColors = {
  'Internal Tools': 'from-blue-500 to-cyan-500',
  'Website': 'from-purple-500 to-pink-500',
  'Personal': 'from-green-500 to-emerald-500',
  'Consumer App': 'from-orange-500 to-red-500',
  'B2B App': 'from-indigo-500 to-purple-500',
  'Prototype': 'from-pink-500 to-rose-500'
}



export function CommunityDiscovery() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('likes')
  const [likedApps, setLikedApps] = useState<string[]>([])
  const [starredApps, setStarredApps] = useState<string[]>(['2', '4'])

  const categories = ['All', 'Internal Tools', 'Website', 'Personal', 'Consumer App', 'B2B App', 'Prototype']

  const filteredAndSortedApps = useMemo(() => {
    const filtered = communityApps.filter(app => {
      const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           app.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.likes - a.likes
        case 'views':
          return b.views - a.views
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
  }, [searchQuery, selectedCategory, sortBy])

  const handleLike = (appId: string) => {
    setLikedApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    )
    toast.success('❤️ App liked!')
  }

  const handleStar = (appId: string) => {
    setStarredApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    )
    toast.success('⭐ Added to favorites!')
  }

  return (
    <div className="space-y-8">
      {/* Community Discovery Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="h-8 w-8 text-purple-600" />
          <h2 className="text-3xl font-bold tracking-tight">Community Showcase</h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Discover amazing apps built by our community. Get inspired and start building your own!
        </p>
        
        {/* Search and Filter Controls */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search apps, creators, or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="likes">Most Liked</option>
                <option value="views">Most Viewed</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            size="sm"
            className={selectedCategory === category ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
            {category !== 'All' && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {communityApps.filter(app => app.category === category).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedApps.length} of {communityApps.length} apps
        </p>
      </div>

      {/* Community Apps Grid */}
      <AnimatePresence mode="wait">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedApps.map((app, index) => {
            const gradientClass = categoryColors[app.category as keyof typeof categoryColors]
            const isLiked = likedApps.includes(app.id)
            const isStarred = starredApps.includes(app.id)
            
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 overflow-hidden hover:scale-105">
                  <div className="relative">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{app.thumbnail}</span>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs font-medium backdrop-blur-sm">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradientClass} mr-1`} />
                        {app.category}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8 bg-background/80 hover:bg-background">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Title and author */}
                      <div>
                        <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                          {app.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">by {app.author}</p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {app.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {app.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs hover:bg-purple-50 transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-4 text-sm">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleLike(app.id)
                            }}
                            className={`flex items-center gap-1 transition-colors hover:scale-110 ${
                              isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                            }`}
                          >
                            <Heart className={`h-3 w-3 ${isLiked ? 'fill-current' : ''}`} />
                            {app.likes + (isLiked ? 1 : 0)}
                          </button>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Eye className="h-3 w-3" />
                            {app.views}
                          </div>
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 hover:scale-110 transition-transform"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStar(app.id)
                          }}
                        >
                          <Star className={`h-4 w-4 ${
                            isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground hover:text-yellow-400'
                          }`} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </AnimatePresence>

      {/* Load more */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load more apps
        </Button>
      </div>
    </div>
  )
} 