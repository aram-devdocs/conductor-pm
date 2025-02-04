# Conductor PM

An AI-powered project management system that runs locally and helps automate project management tasks, scheduling, and team coordination.

## Overview

Conductor PM is an open-source project management tool that leverages AI to automate routine project management tasks. It runs locally using Electron for the client interface while maintaining a powerful backend agent that can handle tasks 24/7. The system is designed to be privacy-focused, running entirely on your local machine with the ability to connect to various AI backends including Ollama.

### Key Features (Current & Planned)

- 🤖 AI-powered task management and scheduling
- 📊 Sprint status tracking and reporting
- 📅 Automated daily summaries and stakeholder updates
- 🔄 Integration with Notion for ticket management
- 🚀 Local-first architecture with future cloud deployment options
- 🔐 Configurable AI backends (Ollama, OpenAI-compatible endpoints)
- 🐳 Docker-based agent system for flexible deployment

## Architecture

The system consists of three main components:

1. **Electron Client**: React-based desktop application that provides the user interface
2. **Python AI Agent**: FastAPI-based service handling communication, task management, and AI interactions
3. **Database**: SQLite for local data storage

```
┌───────────────────────┐      ┌──────────────────────┐
│   Electron Client     │◄────►│    Python AI Agent   │
│  (React Frontend)     │      │    (FastAPI + ORM)   │
└─────────── ───────────┘      └──────────┬───────────┘
                                          │
                      ┌───────────────┐   │
                      │    SQLite     │◄──┤
                      │   Database    │   │
                      └───────────────┘   │
                                          │
                      ┌─────────────┐◄────┘
                      │  Ollama AI  │
                      │ Local Model │
                      └─────────────┘
```

The Python AI Agent communicates with the SQLite database through Prisma ORM, ensuring type-safe database operations and consistent data access patterns. The agent handles communication with the OpenAI compatible AI backend of your choice, or a local Ollama instance.

## Technology Stack

### Frontend

- Electron + React for cross-platform desktop application
- TypeScript for type-safe development
- Ant Design for UI components
- Webpack for bundling

### Backend

- Python-based AI agent
- FastAPI for REST API with endpoints:
  - `/health` - Health check endpoint
  - `/sprint/current` - Get current sprint details
  - `/users` - Get all users
- Poetry for Python dependency management
- Prisma for database ORM
- SQLite for local data storage

### DevOps & Tools

- Docker for containerization
- Husky for git hooks and pre-commit checks
- ESLint for code quality
- Poetry for Python package management

## Getting Started

### Prerequisites

- Node.js (LTS version)
- Python 3.11+
- Docker and Docker Compose
- Poetry (Python package manager)
- Ollama (for local AI model hosting)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aram-devdocs/conductor-pm
   cd conductor-pm
   ```

2. Run the setup script:
   ```bash
   npm run setup
   ```

This will:

- Install Node.js dependencies
- Set up Python environment with Poetry
- Generate Prisma clients
- Build Docker containers

### Development Environment Setup

1. Configure your environment:
  ```bash
   # Copy example environment files
   cp .env.example .env
   cp python_service/.env.example python_service/.env

   # Add API configuration to python_service/.env:
   API_HOST=0.0.0.0
   API_PORT=8000

   # Install Ollama (macOS/Linux)
   curl https://ollama.ai/install.sh | sh
   ```

2. Start the development environment:
   ```bash

   # Start the Electron application

   npm start

   # In a separate terminal, start the Python development environment

   npm run python:dev
   ```

3. Docker commands:
   ```bash

   # Start containers

   npm run docker:up

   # View logs

   npm run docker:logs

   # Stop containers

   npm run docker:down
   ```

### Database Management

Prisma commands:
```bash

# Generate Prisma clients

npm run prisma:generate

# Run migrations

npm run prisma:migrate
```

## Project Structure

- \`/src\` - TypeScript/React frontend code
  - \`/screens\` - React components for different views
  - \`/components\` - Reusable UI components
  - \`/lib\` - Shared utilities and helpers
- \`/python_service\` - Python agent and backend services
  - \`/agent\` - AI agent implementation
  - \`/api\` - FastAPI routes and handlers
- \`/prisma\` - Database schema and migrations
- \`/docker\` - Docker configuration files

## Current State

The MVP currently supports:

- Basic environment configuration
- Agent setup and management
- Task scheduling system
- Summary generation and storage
- Local database integration
- Ollama model management
- REST API endpoints for:
  - Health checks
  - Sprint information
  - User management

### AI Agent Capabilities

The agent currently supports:

- Scheduled task execution using cron expressions
- Daily summary generation
- Basic project status tracking
- Local model inference using Ollama
- Persistent task storage using SQLite

## Roadmap

- [ ] Web deployment support
- [ ] Enhanced AI agent capabilities
  - [ ] Natural language task creation
  - [ ] Automated status updates
  - [ ] Meeting summaries
- [ ] Multiple AI model support
  - [ ] OpenAI
  - [ ] Anthropic
  - [ ] Local models
- [ ] Team collaboration features
- [ ] Advanced project analytics
- [ ] Cloud deployment options
- [ ] Mobile application support

## Contributing

We welcome contributions to Conductor PM! Here's how you can help:

1. **Fork the Repository**

   - Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
   - Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
   - Push to the branch (\`git push origin feature/AmazingFeature\`)
   - Open a Pull Request

2. **Development Guidelines**

   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed
   - Ensure all tests pass before submitting PR
   - Use conventional commits

3. **Pre-commit Hooks**
   We use Husky to run pre-commit checks:
   - TypeScript type checking
   - ESLint
   - Prettier formatting
   - Python black formatting
   - Python isort import sorting

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Electron Forge](https://www.electronforge.io/)
- Powered by [Ollama](https://ollama.ai/)
- Inspired by the need for intelligent project management automation

---

For more detailed documentation and guides, please visit our [GitHub Discussions](https://github.com/yourusername/conductor-pm/discussions) page.
