import { NextRequest, NextResponse } from 'next/server'
import { daytona } from '@/lib/api/daytona'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id
    
    const environment = await daytona.getEnvironment(projectId)
    
    return NextResponse.json({
      id: environment.id,
      name: environment.name,
      status: environment.status,
      url: environment.url,
      created: environment.created,
      updated: environment.updated,
      metadata: environment.metadata
    })

  } catch (error) {
    console.error('Get project error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id
    
    await daytona.deleteEnvironment(projectId)
    
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete project error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to delete project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 