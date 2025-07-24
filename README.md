# Lovable Clone

A powerful AI-powered app builder clone built with Next.js, integrating Lovable SDK and Daytona for seamless development environment management and deployment.

## 🚀 Features

- **AI-Powered App Building**: Natural language app creation using Anthropic's Claude
- **Visual Code Editor**: Monaco Editor integration for real-time code editing
- **Development Environment Management**: Daytona integration for containerized dev environments
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and Radix UI
- **Real-time Collaboration**: Multi-user project collaboration capabilities
- **GitHub Integration**: Direct code export and version control
- **Deployment Ready**: Seamless deployment with Daytona's environment management

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **Monaco Editor** - VSCode-like code editor
- **Framer Motion** - Smooth animations

### Backend & APIs
- **Anthropic Claude** - AI-powered code generation
- **Daytona SDK** - Development environment management
- **Lovable SDK** - App building capabilities
- **Supabase** - Backend-as-a-Service
- **GitHub API** - Version control integration

### State Management & Utils
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lovable-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your API keys:
   - `ANTHROPIC_API_KEY` - Your Anthropic API key
   - `DAYTONA_API_KEY` - Your Daytona API key
   - Add other required keys as needed

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3002](http://localhost:3002)

## 🔧 Configuration

### Required Environment Variables

#### Core APIs
- `ANTHROPIC_API_KEY` - For AI-powered code generation
- `DAYTONA_API_KEY` - For development environment management
- `DAYTONA_API_URL` - Daytona API endpoint (default: https://api.daytona.io)

#### Optional Integrations
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET` - For GitHub integration
- `SUPABASE_URL` & `SUPABASE_ANON_KEY` - For backend services
- `STRIPE_PUBLISHABLE_KEY` & `STRIPE_SECRET_KEY` - For payment processing

See `env.example` for the complete list of environment variables.

## 🏗️ Project Structure

```
lovable-clone/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── editor/        # Code editor components
│   │   ├── project/       # Project management components
│   │   └── layout/        # Layout components
│   ├── lib/               # Utility libraries
│   │   ├── api/           # API clients
│   │   ├── auth/          # Authentication
│   │   └── utils/         # Helper functions
│   ├── hooks/             # Custom React hooks
│   ├── store/             # State management
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── public/                # Static assets
├── docs/                  # Documentation
└── config files...
```

## 🚦 Getting Started

### 1. Create Your First Project

1. Click "New Project" in the dashboard
2. Choose a template or start from scratch
3. Describe your app in natural language
4. Watch as the AI generates your code

### 2. Edit and Customize

- Use the integrated Monaco Editor for code modifications
- Chat with the AI to request changes
- Preview your app in real-time

### 3. Deploy with Daytona

- Set up your development environment with one click
- Deploy to staging or production environments
- Manage environment variables and configurations

## 🔌 Integrations

### Daytona Integration

The app integrates with Daytona for:
- **Environment Management**: Create and manage containerized development environments
- **Deployment**: Deploy applications to various environments
- **Git Operations**: Clone repositories and manage version control
- **File System**: Upload, download, and manage project files
- **Process Management**: Execute commands and run code

### Lovable SDK Integration

Leverages Lovable's capabilities for:
- **AI-Powered Generation**: Natural language to code conversion
- **Template System**: Pre-built templates and components
- **Integration Ecosystem**: Connect with popular services

## 🔒 Security

- All API keys are stored securely as environment variables
- Client-side operations are properly validated
- Rate limiting implemented for API calls
- Secure authentication with NextAuth.js

## 🧪 Development

### Running Tests
```bash
npm run test
# or
yarn test
```

### Type Checking
```bash
npm run type-check
# or
yarn type-check
```

### Linting
```bash
npm run lint
# or
yarn lint
```

## 📚 API Documentation

### Anthropic Integration
The app uses Anthropic's Claude API for AI-powered code generation. See [Anthropic API docs](https://docs.anthropic.com/) for more information.

### Daytona Integration
Development environment management is handled through the Daytona SDK. See [Daytona docs](https://docs.daytona.io/) for more information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)

## 🙏 Acknowledgments

- [Lovable](https://lovable.dev) - For the inspiration and SDK
- [Daytona](https://daytona.io) - For development environment management
- [Anthropic](https://anthropic.com) - For AI capabilities
- [Vercel](https://vercel.com) - For hosting and deployment

## 🔮 Roadmap

- [ ] Multi-language support
- [ ] Advanced AI model integration
- [ ] Team collaboration features
- [ ] Advanced deployment options
- [ ] Plugin system for extensions
- [ ] Mobile app support

---

Built with ❤️ using Next.js, Anthropic Claude, and Daytona 