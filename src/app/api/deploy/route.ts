import { NextRequest, NextResponse } from 'next/server'
import { daytona } from '@/lib/api/daytona'

export interface DeployRequest {
  projectId: string
  buildCommand?: string
  startCommand?: string
  outputDirectory?: string
  envVars?: Record<string, string>
}

export async function POST(request: NextRequest) {
  try {
    const body: DeployRequest = await request.json()
    
    const { projectId, buildCommand, startCommand, outputDirectory, envVars } = body

    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      )
    }

    // Deploy the project
    const deployment = await daytona.deployProject({
      environmentId: projectId,
      buildCommand,
      startCommand,
      outputDirectory,
      envVars
    })

    return NextResponse.json({
      deploymentId: deployment.deploymentId,
      url: deployment.url,
      status: 'pending'
    })

  } catch (error) {
    console.error('Deploy project error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to deploy project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const deploymentId = searchParams.get('deploymentId')

    if (!deploymentId) {
      return NextResponse.json(
        { error: 'Deployment ID is required' },
        { status: 400 }
      )
    }

    const deployment = await daytona.getDeploymentStatus(deploymentId)

    return NextResponse.json(deployment)

  } catch (error) {
    console.error('Get deployment status error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to get deployment status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 