import axios from 'axios'

export interface DaytonaEnvironment {
  id: string
  name: string
  status: 'running' | 'stopped' | 'creating' | 'error'
  url?: string
  created: string
  updated: string
  metadata?: Record<string, unknown>
}

export interface CreateEnvironmentRequest {
  name: string
  template?: string
  gitUrl?: string
  branch?: string
  envVars?: Record<string, string>
  ports?: number[]
}

export interface DeploymentConfig {
  environmentId: string
  buildCommand?: string
  startCommand?: string
  outputDirectory?: string
  envVars?: Record<string, string>
}

class DaytonaClient {
  private apiKey: string
  private baseURL: string
  private target: string

  constructor() {
    this.apiKey = process.env.DAYTONA_API_KEY || ''
    this.baseURL = process.env.DAYTONA_API_URL || 'https://api.daytona.io'
    this.target = process.env.DAYTONA_TARGET || 'us'
    
    if (!this.apiKey) {
      console.warn('Daytona API key not found in environment variables')
    }
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    }
  }

  async createEnvironment(config: CreateEnvironmentRequest): Promise<DaytonaEnvironment> {
    try {
      const response = await axios.post(
        `${this.baseURL}/v1/environments`,
        {
          name: config.name,
          template: config.template || 'node',
          gitUrl: config.gitUrl,
          branch: config.branch || 'main',
          envVars: config.envVars || {},
          ports: config.ports || [3002],
          target: this.target
        },
        {
          headers: this.getHeaders()
        }
      )

      return response.data
    } catch (error) {
      console.error('Daytona create environment error:', error)
      throw new Error('Failed to create development environment')
    }
  }

  async getEnvironments(): Promise<DaytonaEnvironment[]> {
    try {
      const response = await axios.get(
        `${this.baseURL}/v1/environments`,
        {
          headers: this.getHeaders()
        }
      )

      return response.data
    } catch (error) {
      console.error('Daytona get environments error:', error)
      throw new Error('Failed to fetch environments')
    }
  }

  async getEnvironment(environmentId: string): Promise<DaytonaEnvironment> {
    try {
      const response = await axios.get(
        `${this.baseURL}/v1/environments/${environmentId}`,
        {
          headers: this.getHeaders()
        }
      )

      return response.data
    } catch (error) {
      console.error('Daytona get environment error:', error)
      throw new Error('Failed to fetch environment details')
    }
  }

  async startEnvironment(environmentId: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseURL}/v1/environments/${environmentId}/start`,
        {},
        {
          headers: this.getHeaders()
        }
      )
    } catch (error) {
      console.error('Daytona start environment error:', error)
      throw new Error('Failed to start environment')
    }
  }

  async stopEnvironment(environmentId: string): Promise<void> {
    try {
      await axios.post(
        `${this.baseURL}/v1/environments/${environmentId}/stop`,
        {},
        {
          headers: this.getHeaders()
        }
      )
    } catch (error) {
      console.error('Daytona stop environment error:', error)
      throw new Error('Failed to stop environment')
    }
  }

  async deleteEnvironment(environmentId: string): Promise<void> {
    try {
      await axios.delete(
        `${this.baseURL}/v1/environments/${environmentId}`,
        {
          headers: this.getHeaders()
        }
      )
    } catch (error) {
      console.error('Daytona delete environment error:', error)
      throw new Error('Failed to delete environment')
    }
  }

  async uploadFiles(environmentId: string, files: Record<string, string>): Promise<void> {
    try {
      await axios.post(
        `${this.baseURL}/v1/environments/${environmentId}/files`,
        {
          files
        },
        {
          headers: this.getHeaders()
        }
      )
    } catch (error) {
      console.error('Daytona upload files error:', error)
      throw new Error('Failed to upload files to environment')
    }
  }

  async executeCommand(
    environmentId: string, 
    command: string
  ): Promise<{ output: string; exitCode: number }> {
    try {
      const response = await axios.post(
        `${this.baseURL}/v1/environments/${environmentId}/exec`,
        {
          command
        },
        {
          headers: this.getHeaders()
        }
      )

      return response.data
    } catch (error) {
      console.error('Daytona execute command error:', error)
      throw new Error('Failed to execute command in environment')
    }
  }

  async deployProject(config: DeploymentConfig): Promise<{ deploymentId: string; url?: string }> {
    try {
      const response = await axios.post(
        `${this.baseURL}/v1/environments/${config.environmentId}/deploy`,
        {
          buildCommand: config.buildCommand || 'npm run build',
          startCommand: config.startCommand || 'npm start',
          outputDirectory: config.outputDirectory || 'build',
          envVars: config.envVars || {}
        },
        {
          headers: this.getHeaders()
        }
      )

      return response.data
    } catch (error) {
      console.error('Daytona deploy project error:', error)
      throw new Error('Failed to deploy project')
    }
  }

  async getDeploymentStatus(deploymentId: string): Promise<{
    status: 'pending' | 'building' | 'deployed' | 'failed'
    url?: string
    logs?: string[]
  }> {
    try {
      const response = await axios.get(
        `${this.baseURL}/v1/deployments/${deploymentId}`,
        {
          headers: this.getHeaders()
        }
      )

      return response.data
    } catch (error) {
      console.error('Daytona deployment status error:', error)
      throw new Error('Failed to get deployment status')
    }
  }

  async createProjectEnvironment(
    projectName: string,
    files: Record<string, string>,
    framework: string = 'nextjs'
  ): Promise<DaytonaEnvironment> {
    // Create environment
    const environment = await this.createEnvironment({
      name: projectName,
      template: framework,
      ports: [3002, 8080]
    })

    // Wait for environment to be ready
    await this.waitForEnvironment(environment.id)

    // Upload project files
    await this.uploadFiles(environment.id, files)

    // Install dependencies
    await this.executeCommand(environment.id, 'npm install')

    return environment
  }

  private async waitForEnvironment(environmentId: string, maxWaitTime = 300200): Promise<void> {
    const startTime = Date.now()
    
    while (Date.now() - startTime < maxWaitTime) {
      const environment = await this.getEnvironment(environmentId)
      
      if (environment.status === 'running') {
        return
      }
      
      if (environment.status === 'error') {
        throw new Error('Environment failed to start')
      }
      
      // Wait 5 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
    
    throw new Error('Environment creation timed out')
  }
}

export const daytona = new DaytonaClient() 