'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Star, Eye, Heart } from 'lucide-react'

// Mock data for demonstration
const mockProjects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'A modern e-commerce platform with AI-powered recommendations',
    status: 'active' as const,
    lastModified: new Date('2024-01-20'),
    framework: 'Next.js',
    deploymentStatus: 'deployed' as const,
    favorite: true,
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    status: 'building' as const,
    lastModified: new Date('2024-01-19'),
    framework: 'React',
    deploymentStatus: 'building' as const,
    favorite: false,
  },
  {
    id: '3',
    name: 'Portfolio Website',
    description: 'Personal portfolio with blog and project showcase',
    status: 'completed' as const,
    lastModified: new Date('2024-01-18'),
    framework: 'Next.js',
    deploymentStatus: 'deployed' as const,
    favorite: true,
  },
]

export function ProjectDashboard() {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [projects] = useState(mockProjects)

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    deployed: projects.filter(p => p.deploymentStatus === 'deployed').length,
    favorites: projects.filter(p => p.favorite).length,
  }

  return (
    <div className="space-y-8">
      {/* Community Discovery Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Discover what the community is building</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore apps built by the Lovable community and get inspired for your next project
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployed</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deployed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.favorites}</div>
          </CardContent>
        </Card>
      </div>

      {/* Projects grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Projects</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-4">
              <Folder className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first AI-powered application
            </p>
            <Button onClick={() => setShowNewProjectDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </Card>
        )}
      </div>

      <NewProjectDialog 
        open={showNewProjectDialog}
        onOpenChange={setShowNewProjectDialog}
      />
    </div>
  )
} 