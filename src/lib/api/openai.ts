import axios from 'axios'

export interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface OpenAIRequest {
  model: string
  messages: OpenAIMessage[]
  max_tokens?: number
  temperature?: number
  stream?: boolean
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// Singleton pattern for OpenAI client
class OpenAIClient {
  private apiKey: string
  private baseURL: string

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || ''
    this.baseURL = process.env.OPENAI_API_URL || 'https://api.openai.com'
    
    if (!this.apiKey) {
      console.warn('OPENAI_API_KEY is not set')
    }
  }

  async generateVideoScript(prompt: string): Promise<string> {
    const systemPrompt = `You are an expert video script writer specializing in creating engaging, professional video content from text prompts.

Your task is to convert user text into a compelling video script with the following elements:
1. Opening hook (first 3 seconds)
2. Main content delivery with smooth transitions
3. Visual and audio cues for video production
4. Engaging pace and rhythm
5. Clear call-to-action or conclusion

Make the script suitable for AI video generation platforms like Hedra.ai, focusing on:
- Clear narration timing
- Visual scene descriptions
- Emotional tone and pacing
- Professional presentation style

Generate a script that would work well for text-to-video AI models.`

    try {
      const response = await axios.post(
        `${this.baseURL}/v1/chat/completions`,
        {
          model: 'gpt-4-turbo-preview',
          max_tokens: 2000,
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: `Create a professional video script for: "${prompt}"`
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      )

      return response.data.choices[0].message.content
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error('Failed to generate video script with OpenAI')
    }
  }

  async generateVideoMetadata(prompt: string): Promise<{
    title: string
    description: string
    tags: string[]
    duration: string
    style: string
  }> {
    const systemPrompt = `You are an expert video content strategist. Generate video metadata including title, description, tags, estimated duration, and visual style for the given prompt.

Return the response in JSON format:
{
  "title": "Engaging video title",
  "description": "Detailed video description",
  "tags": ["tag1", "tag2", "tag3"],
  "duration": "30-60 seconds",
  "style": "Professional/Cinematic/Casual/etc"
}`

    try {
      const response = await axios.post(
        `${this.baseURL}/v1/chat/completions`,
        {
          model: 'gpt-4-turbo-preview',
          max_tokens: 500,
          temperature: 0.3,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: `Generate video metadata for: "${prompt}"`
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      )

      const content = response.data.choices[0].message.content
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      // Fallback if JSON parsing fails
      return {
        title: `AI Generated Video: ${prompt.substring(0, 50)}...`,
        description: `A professional video generated from the prompt: ${prompt}`,
        tags: ['AI', 'Generated', 'Video', 'Professional'],
        duration: '30-60 seconds',
        style: 'Professional'
      }
    } catch (error) {
      console.error('OpenAI metadata generation error:', error)
      throw new Error('Failed to generate video metadata')
    }
  }

  async improveVideoPrompt(prompt: string): Promise<string> {
    const systemPrompt = `You are an expert prompt engineer for AI video generation platforms like Hedra.ai, Runway, and Pika Labs.

Your task is to optimize user prompts for better video generation results by:
1. Adding specific visual details
2. Including cinematography terms
3. Specifying mood and atmosphere
4. Adding technical parameters
5. Ensuring clarity and specificity

Transform basic prompts into detailed, professional video generation prompts.`

    try {
      const response = await axios.post(
        `${this.baseURL}/v1/chat/completions`,
        {
          model: 'gpt-4-turbo-preview',
          max_tokens: 800,
          temperature: 0.5,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: `Optimize this prompt for AI video generation: "${prompt}"`
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      )

      return response.data.choices[0].message.content
    } catch (error) {
      console.error('OpenAI prompt optimization error:', error)
      return prompt // Return original prompt if optimization fails
    }
  }

  async generateVideoDescription(prompt: string): Promise<string> {
    const systemPrompt = `You are a professional video description writer. Create engaging, SEO-optimized descriptions for videos based on the given prompt. Include relevant keywords and make it compelling for viewers.`

    try {
      const response = await axios.post(
        `${this.baseURL}/v1/chat/completions`,
        {
          model: 'gpt-3.5-turbo',
          max_tokens: 300,
          temperature: 0.6,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: `Write a video description for: "${prompt}"`
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        }
      )

      return response.data.choices[0].message.content
    } catch (error) {
      console.error('OpenAI description generation error:', error)
      return `A professional video generated from the prompt: ${prompt}`
    }
  }
}

// Export singleton instance
export const openai = new OpenAIClient() 