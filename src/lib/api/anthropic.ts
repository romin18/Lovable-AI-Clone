import axios from 'axios'

export interface AnthropicMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface AnthropicRequest {
  model: string
  max_tokens: number
  messages: AnthropicMessage[]
  temperature?: number
  system?: string
}

export interface AnthropicResponse {
  content: Array<{
    type: string
    text: string
  }>
  model: string
  role: string
  stop_reason: string
  stop_sequence: null
  usage: {
    input_tokens: number
    output_tokens: number
  }
}

// Singleton pattern for Anthropic client
class AnthropicClient {
  private apiKey: string
  private baseURL: string

  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY || ''
    this.baseURL = process.env.ANTHROPIC_API_URL || 'https://api.anthropic.com'
    
    if (!this.apiKey) {
      console.warn('ANTHROPIC_API_KEY is not set')
    }
  }

  async generateCode(prompt: string, projectType?: string): Promise<string> {
    const systemPrompt = `You are an expert full-stack developer and AI assistant specialized in creating modern web applications. 

Your task is to generate clean, production-ready code based on user requirements. Follow these guidelines:

1. Use modern best practices and latest versions of frameworks
2. Include proper error handling and validation
3. Generate responsive, accessible UI components
4. Use TypeScript for type safety
5. Include proper documentation and comments
6. Follow established patterns and conventions

Project Context: ${projectType || 'Web Application'}

Generate complete, working code that can be immediately used in a production environment.`

    try {
      const response = await axios.post(
        `${this.baseURL}/v1/messages`,
        {
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 4000,
          temperature: 0.1,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          }
        }
      )

      return response.data.content[0].text
    } catch (error) {
      console.error('Anthropic API error:', error)
      throw new Error('Failed to generate code with Anthropic AI')
    }
  }

  async generateAdvancedCode(prompt: string, projectType?: string): Promise<string> {
    const systemPrompt = `You are an elite full-stack developer and AI assistant specializing in creating sophisticated, production-ready web applications with modern technologies.

Your expertise includes:
- Advanced HTML5, CSS3, and JavaScript techniques
- Modern responsive design patterns and mobile-first approaches
- Professional UI/UX design principles and accessibility standards
- Interactive data visualizations and dynamic content
- Performance optimization and SEO best practices
- Cross-browser compatibility and progressive enhancement

Project Context: ${projectType || 'Professional Web Application'}

Generate complete, sophisticated, production-ready code that exceeds industry standards and provides exceptional user experience. Focus on creating visually stunning, highly functional applications that feel professional and modern.`

    try {
      const response = await axios.post(
        `${this.baseURL}/v1/messages`,
        {
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 8000, // Increased token limit for complex applications
          temperature: 0.05, // Lower temperature for more consistent, professional output
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01'
          },
          timeout: 60000 // Increased timeout for complex generation
        }
      )

      return response.data.content[0].text
    } catch (error) {
      console.error('Anthropic Advanced API error:', error)
      
      // Fallback to regular generation if advanced fails
      console.log('Falling back to regular generation...')
      return this.generateCode(prompt, projectType)
    }
  }

  async generateProjectStructure(
    projectName: string,
    description: string,
    framework: string = 'Next.js'
  ): Promise<{
    structure: Record<string, string>
    readme: string
    packageJson: object
  }> {
    const prompt = `Generate a complete project structure for a ${framework} application.

Project Name: ${projectName}
Description: ${description}
Framework: ${framework}

Please provide:
1. Complete file structure with all necessary files
2. README.md content
3. package.json with all dependencies

Return the response in the following JSON format:
{
  "structure": {
    "src/app/page.tsx": "// file content here",
    "src/components/ui/button.tsx": "// file content here",
    // ... all other files
  },
  "readme": "# Project README content",
  "packageJson": {
    "name": "project-name",
    "dependencies": {}
  }
}

Make sure the code is production-ready and follows best practices.`

    try {
      const response = await this.generateCode(prompt, framework)
      
      // Parse the JSON response
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1])
      }
      
      // Fallback if JSON parsing fails
      return {
        structure: {
          'src/app/page.tsx': response
        },
        readme: `# ${projectName}\n\n${description}`,
        packageJson: {
          name: projectName.toLowerCase().replace(/\s+/g, '-'),
          version: '0.1.0',
          dependencies: {}
        }
      }
    } catch (error) {
      console.error('Error generating project structure:', error)
      throw new Error('Failed to generate project structure')
    }
  }

  async improveCode(code: string, improvements: string): Promise<string> {
    const prompt = `Improve the following code based on these requirements:

${improvements}

Current code:
\`\`\`
${code}
\`\`\`

Please provide the improved version with explanations of changes made.`

    return this.generateCode(prompt)
  }

  async explainCode(code: string): Promise<string> {
    const prompt = `Explain this code in detail, including:
1. What it does
2. How it works
3. Key features and patterns used
4. Potential improvements

Code:
\`\`\`
${code}
\`\`\``

    return this.generateCode(prompt)
  }
}

// Export singleton instance
export const anthropic = new AnthropicClient() 