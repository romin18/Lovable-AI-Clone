import { NextRequest, NextResponse } from 'next/server'
import { anthropic } from '@/lib/api/anthropic'
import { daytona } from '@/lib/api/daytona'

export interface GenerateProjectRequest {
  name: string
  description: string
  prompt?: string
  template?: string
  framework?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateProjectRequest = await request.json()
    
    const { name, description, framework = 'Next.js' } = body

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Project name and description are required' },
        { status: 400 }
      )
    }

    // Generate project structure using Anthropic AI
    const projectStructure = await anthropic.generateProjectStructure(
      name,
      description,
      framework
    )

    // Create development environment with Daytona
    const environment = await daytona.createProjectEnvironment(
      name,
      projectStructure.structure,
      framework.toLowerCase()
    )

    // Return the project details
    return NextResponse.json({
      projectId: environment.id,
      name,
      description,
      framework,
      environment: {
        id: environment.id,
        status: environment.status,
        url: environment.url
      },
      files: Object.keys(projectStructure.structure),
      readme: projectStructure.readme,
      packageJson: projectStructure.packageJson
    })

  } catch (error) {
    console.error('Project generation error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to generate project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(_request: NextRequest) {
  try {
    // Get list of all projects (environments)
    const environments = await daytona.getEnvironments()
    
    const projects = environments.map(env => ({
      id: env.id,
      name: env.name,
      status: env.status,
      url: env.url,
      created: env.created,
      updated: env.updated
    }))

    return NextResponse.json({ projects })

  } catch (error) {
    console.error('Get projects error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch projects',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 