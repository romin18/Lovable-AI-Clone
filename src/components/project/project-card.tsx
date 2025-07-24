'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/utils'
import { 
  ExternalLink, 
  Star, 
  Clock, 
  Code, 
  MoreVertical,
  Play,
  GitBranch 
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  status: 'active' | 'building' | 'completed' | 'error'
  lastModified: Date
  framework: string
  deploymentStatus: 'deployed' | 'building' | 'failed' | 'pending'
  favorite: boolean
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'building':
        return 'warning'
      case 'completed':
        return 'info'
      case 'error':
      case 'failed':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  const getDeploymentStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'success'
      case 'building':
        return 'warning'
      case 'failed':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              {project.favorite && (
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={getStatusColor(project.status) as "success" | "warning" | "info" | "destructive" | "secondary"}>
            {project.status === 'building' && <Clock className="w-3 h-3 mr-1" />}
            {project.status}
          </Badge>
          <Badge variant={getDeploymentStatusColor(project.deploymentStatus) as "success" | "warning" | "destructive" | "secondary"}>
            {project.deploymentStatus}
          </Badge>
          <Badge variant="outline">
            {project.framework}
          </Badge>
        </div>

        {/* Project metadata */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(project.lastModified)}
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="h-3 w-3" />
            main
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1"
            variant={project.status === 'completed' ? 'default' : 'outline'}
          >
            <Code className="w-4 h-4 mr-2" />
            Edit
          </Button>
          {project.deploymentStatus === 'deployed' && (
            <Button size="sm" variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              View
            </Button>
          )}
          {project.status === 'building' && (
            <Button size="sm" variant="outline">
              <Play className="w-4 h-4 mr-2" />
              Deploy
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 