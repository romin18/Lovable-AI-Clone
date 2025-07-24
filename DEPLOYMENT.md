# Deployment Guide - Lovable Clone

This guide will help you deploy and configure your Lovable clone application.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Anthropic API key
- Daytona API key
- Git repository access

### 1. Environment Setup

Copy the environment file and fill in your API keys:
```bash
cp env.example .env.local
```

Required environment variables:
```env
# Core APIs (Required)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
DAYTONA_API_KEY=your_daytona_api_key_here

# Optional but recommended
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Installation

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start development server
npm run dev
```

### 3. Production Deployment

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Docker
```bash
# Build Docker image
docker build -t lovable-clone .

# Run container
docker run -p 3002:3002 --env-file .env.local lovable-clone
```

#### Option C: Traditional Hosting
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Daytona Integration Setup

### 1. Daytona Environment Management

The application uses Daytona for:
- Creating development environments
- Managing project deployments
- File system operations
- Command execution

### 2. Using Daytona CLI

Install Daytona CLI for local development:
```bash
# Download and install Daytona
curl -sf https://download.daytona.io/install.sh | sh

# Initialize Daytona
daytona serve
```

### 3. Creating Workspaces

You can create workspaces directly with Daytona:
```bash
# Create workspace from repository
daytona create https://github.com/your-username/your-project

# Create workspace from template
daytona create --template nextjs my-project
```

## 🌟 Features Overview

### AI-Powered Project Generation
- Uses Anthropic Claude for intelligent code generation
- Supports multiple frameworks (Next.js, React, Vue, etc.)
- Template-based quick start options
- Natural language project descriptions

### Development Environment Management
- Automated Daytona environment creation
- One-click deployment
- Real-time collaboration
- Environment variable management

### Modern UI/UX
- Responsive design with Tailwind CSS
- Dark/light theme support
- Smooth animations with Framer Motion
- Accessible components with Radix UI

## 📊 Architecture

```
Frontend (Next.js 14)
├── UI Components (Radix UI + Tailwind)
├── State Management (Zustand)
└── API Routes

Backend Services
├── Anthropic AI Integration
├── Daytona Environment Management
└── Project File Management
```

## 🔒 Security Considerations

1. **API Keys**: Store all API keys in environment variables
2. **Rate Limiting**: Implement rate limiting for API endpoints
3. **Input Validation**: Validate all user inputs
4. **CORS**: Configure CORS properly for production
5. **HTTPS**: Always use HTTPS in production

## 🐛 Troubleshooting

### Common Issues

#### 1. Anthropic API Errors
```bash
# Check API key
echo $ANTHROPIC_API_KEY

# Test API connection
curl -H "x-api-key: $ANTHROPIC_API_KEY" https://api.anthropic.com/v1/messages
```

#### 2. Daytona Connection Issues
```bash
# Check Daytona status
daytona server info

# Restart Daytona server
daytona serve --restart
```

#### 3. Build Failures
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables

Make sure these are set in production:
- `ANTHROPIC_API_KEY`
- `DAYTONA_API_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 📈 Performance Optimization

### 1. Caching Strategy
- Static files cached with CDN
- API responses cached with Redis
- Database queries optimized

### 2. Code Splitting
- Dynamic imports for large components
- Route-based code splitting
- Lazy loading for images

### 3. Monitoring
- Error tracking with Sentry
- Performance monitoring
- User analytics

## 🔄 Updates and Maintenance

### Regular Tasks
1. Update dependencies monthly
2. Monitor API usage and costs
3. Backup environment configurations
4. Review security logs

### Scaling Considerations
- Use database for project persistence
- Implement queue system for long-running tasks
- Add load balancing for high traffic
- Consider microservices architecture

## 📞 Support

For issues related to:
- **Anthropic API**: Check [Anthropic Documentation](https://docs.anthropic.com/)
- **Daytona**: Check [Daytona Documentation](https://daytona.io/docs/)
- **Next.js**: Check [Next.js Documentation](https://nextjs.org/docs)

## 🛠️ Development

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

---

🎉 **Congratulations!** Your Lovable clone is now ready for deployment. Start building amazing applications with AI! 