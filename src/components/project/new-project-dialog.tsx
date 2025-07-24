'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Sparkles, Wand2, Globe, Database, ShoppingCart, MessageSquare, Camera, User } from 'lucide-react'

interface NewProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const projectTemplates = [
  {
    id: 'ecommerce',
    name: 'E-commerce Store',
    description: 'Online store with payment processing',
    icon: ShoppingCart,
    tags: ['React', 'Stripe', 'Inventory'],
  },
  {
    id: 'blog',
    name: 'Blog Platform',
    description: 'Content management and publishing',
    icon: MessageSquare,
    tags: ['Next.js', 'CMS', 'SEO'],
  },
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    description: 'Showcase your work and skills',
    icon: User,
    tags: ['Responsive', 'Gallery', 'Contact'],
  },
  {
    id: 'dashboard',
    name: 'Admin Dashboard',
    description: 'Data visualization and management',
    icon: Database,
    tags: ['Charts', 'Tables', 'Analytics'],
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Marketing and lead generation',
    icon: Globe,
    tags: ['Marketing', 'Forms', 'CTA'],
  },
  {
    id: 'social',
    name: 'Social Media App',
    description: 'User profiles and social features',
    icon: Camera,
    tags: ['Auth', 'Real-time', 'Posts'],
  },
]

export function NewProjectDialog({ open, onOpenChange }: NewProjectDialogProps) {
  const [step, setStep] = useState<'template' | 'details' | 'generating'>('template')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = projectTemplates.find(t => t.id === templateId)
    if (template) {
      setProjectName(template.name)
      setProjectDescription(template.description)
    }
  }

  const handleContinue = () => {
    if (step === 'template') {
      setStep('details')
    } else if (step === 'details') {
      setStep('generating')
      generateProject()
    }
  }

  const generateProject = async () => {
    setIsGenerating(true)
    // Simulate AI generation process
    setTimeout(() => {
      setIsGenerating(false)
      onOpenChange(false)
      // Reset form
      setStep('template')
      setSelectedTemplate(null)
      setProjectName('')
      setProjectDescription('')
      setCustomPrompt('')
    }, 3002)
  }

  const handleBack = () => {
    if (step === 'details') {
      setStep('template')
    } else if (step === 'generating') {
      setStep('details')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        {step === 'template' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Create New Project
              </DialogTitle>
              <DialogDescription>
                Choose a template or describe your project idea in natural language
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Quick templates */}
              <div>
                <h3 className="font-medium mb-3">Quick Start Templates</h3>
                <div className="grid grid-cols-2 gap-3">
                  {projectTemplates.map((template) => {
                    const Icon = template.icon
                    return (
                      <div
                        key={template.id}
                        onClick={() => handleTemplateSelect(template.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedTemplate === template.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {template.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {template.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Custom project */}
              <div className="border-t pt-6">
                <h3 className="font-medium mb-3">Or describe your own idea</h3>
                <Textarea
                  placeholder="Describe your project idea in natural language... e.g., 'Create a recipe sharing app where users can upload photos of their dishes, rate recipes, and follow their favorite chefs.'"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={!selectedTemplate && !customPrompt.trim()}
              >
                Continue
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'details' && (
          <>
            <DialogHeader>
              <DialogTitle>Project Details</DialogTitle>
              <DialogDescription>
                Fine-tune your project details before generation
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Project Name</label>
                <Input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="My Awesome App"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="A brief description of what your app does..."
                  rows={3}
                />
              </div>

              {customPrompt && (
                <div>
                  <label className="text-sm font-medium">Custom Requirements</label>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={4}
                  />
                </div>
              )}

              {selectedTemplate && (
                <div>
                  <label className="text-sm font-medium">Template Features</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {projectTemplates
                      .find(t => t.id === selectedTemplate)
                      ?.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={!projectName.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Project
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'generating' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="animate-spin">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                Generating Your Project
              </DialogTitle>
              <DialogDescription>
                AI is creating your application... This may take a few moments.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
                  <Wand2 className="w-8 h-8 text-purple-600 animate-pulse" />
                </div>
                <h3 className="font-medium mb-2">Building "{projectName}"</h3>
                <p className="text-sm text-muted-foreground">
                  Setting up your development environment with Daytona...
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { step: 'Analyzing requirements', completed: true },
                  { step: 'Generating code structure', completed: true },
                  { step: 'Setting up Daytona environment', completed: false },
                  { step: 'Installing dependencies', completed: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.completed ? 'bg-green-500' : 'bg-muted'
                    }`} />
                    <span className={`text-sm ${
                      item.completed ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {item.step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleBack} disabled={isGenerating}>
                Cancel
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
} 