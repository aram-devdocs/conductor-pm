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
  - `/ai/chat` - AI chat completion endpoint
  - `/ai/embedding` - Text embedding endpoint
- Poetry for Python dependency management
- Prisma for database ORM
- SQLite for local data storage
- Flexible AI integration supporting:
  - OpenAI API
  - Custom OpenAI-compatible endpoints
  - Ollama (planned)
- Caching system with:
  - Redis support for production
  - Local file-based caching for development
  - Automatic fallback mechanism
  - TTL support and expiration handling
  - Function result caching via decorators

### DevOps & Tools

- Docker for containerization
- Redis for distributed caching (in Docker)
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
   yarn setup
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
   
   # Configure AI provider
   OPENAI_API_KEY=your_api_key_here
   OPENAI_MODEL=gpt-4  # or your preferred model
   AI_PROVIDER=openai  # or custom/ollama

   # Configure caching
   USE_REDIS=false  # Use local cache for development
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_DB=0

   # Install Ollama (macOS/Linux)
   curl https://ollama.ai/install.sh | sh
   ```

2. Start the development environment:
   ```bash

   # Start the Electron application

   yarn start

   # In a separate terminal, start the Python development environment

   yarn python:dev
   ```

3. Docker commands:
   ```bash

   # Start containers

   yarn docker:up

   # View logs

   yarn docker:logs

   # Stop containers

   yarn docker:down
   ```

### Database Management

Prisma commands:
```bash

# Generate Prisma clients

yarn prisma:generate

# Run migrations

yarn prisma:migrate
```

## Project Structure

- \`/src\` - TypeScript/React frontend code
  - \`/screens\` - React components for different views
  - \`/components\` - Reusable UI components
  - \`/lib\` - Shared utilities and helpers
- \`/python_service\` - Python agent and backend services
  - \`/agent\` - AI agent implementation
  - \`/api\` - FastAPI routes and handlers
  - \`/utils\` - Utility modules including caching system
- \`/prisma\` - Database schema and migrations
- \`/docker\` - Docker configuration files

## Cache System

The application includes a flexible caching system that supports both Redis (for production) and local file-based caching (for development).

### Cache Configuration

The cache system can be configured through environment variables:

```bash
USE_REDIS=true|false  # Enable Redis or use local cache
REDIS_HOST=redis      # Redis host (use 'redis' for Docker)
REDIS_PORT=6379       # Redis port
REDIS_DB=0           # Redis database number
```

### Usage Examples

```python
from src.utils.cache import CacheManager

# Initialize cache manager
cache = CacheManager()

# Basic operations
cache.set("my_key", "my_value", ttl=3600)  # Cache for 1 hour
value = cache.get("my_key")
cache.delete("my_key")
cache.clear()

# Function result caching
@cache.cached(ttl=3600)
def expensive_operation(arg1, arg2):
    return some_expensive_computation(arg1, arg2)
```

### Cache Features

1. **Automatic Backend Selection**
   - Uses Redis in Docker environment
   - Falls back to local file-based cache in development
   - Graceful fallback if Redis connection fails

2. **TTL Support**
   - Set expiration time for cached items
   - Automatic cleanup of expired items
   - Default TTL configurable per cache instance

3. **Error Handling**
   - Graceful error recovery
   - Logging of cache operations
   - Fallback mechanisms for failed operations

4. **Function Decorator**
   - Cache function results automatically
   - Intelligent key generation based on arguments
   - Configurable TTL per function

5. **Serialization**
   - Automatic serialization of complex objects
   - Support for most Python data types
   - Compressed storage for large objects

### Best Practices

1. **Key Naming**
   - Use descriptive, hierarchical keys
   - Include version/type information if needed
   - Consider namespace prefixes for different services

2. **TTL Selection**
   - Set appropriate TTL based on data volatility
   - Use shorter TTL for frequently changing data
   - Consider infinite TTL for static data

3. **Cache Invalidation**
   - Implement clear invalidation strategies
   - Use cache.delete() for targeted invalidation
   - Use cache.clear() sparingly

4. **Error Handling**
   - Always handle cache misses gracefully
   - Implement fallback data retrieval
   - Log cache errors for monitoring

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
- Flexible AI integration:
  - Chat completions with configurable parameters
  - Text embeddings for semantic search
  - Support for multiple AI providers
  - Custom API endpoint configuration

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

## Available Commands

### Development Commands

- `yarn start`: Launch the Electron application in development mode
- `yarn python:dev`: Start the Python development environment with the AI agent
- `yarn setup`: Complete project setup, installing all dependencies and generating Prisma clients
- `yarn lint`: Run ESLint to check code quality and style

### Build and Packaging Commands

- `yarn package`: Package the Electron application for your current platform
- `yarn make`: Create distributable packages (installers) for the application
- `yarn publish`: Publish the application to a distribution platform

### Database Management

- `yarn prisma:generate`: Generate Prisma client based on the schema
- `yarn prisma:migrate`: Run database migrations
- `yarn python:fix-lock`: Update Poetry lock file without changing dependencies

### Python Environment

- `yarn python:setup`: Install Python dependencies using Poetry
- `yarn python:dev:fix`: Fix Poetry lock file and start the Python development environment

### Docker Commands

- `yarn docker:build`: Build Docker containers
- `yarn docker:up`: Start Docker containers in detached mode
- `yarn docker:down`: Stop and remove Docker containers
- `yarn docker:logs`: View logs from Docker containers

### Cleanup Command

- `yarn clean`: Remove `node_modules`, `.webpack`, and `.out` directories to resolve potential build issues

### Husky Hooks

- `yarn prepare`: Set up Husky git hooks for pre-commit checks

## Design System

Conductor PM uses a custom design system built on top of [Material-UI (MUI)](https://mui.com/), a popular React UI framework. The design system consists of reusable UI components organized into the Core UI system, which provides a consistent and efficient way to build user interfaces throughout the application.

### Storybook

We use [Storybook](https://storybook.js.org/) for developing and documenting our UI components. Storybook allows us to create isolated component examples, making it easier to test, document, and showcase our components.

To run Storybook locally, use the following command:

```bash
yarn storybook
```

This will start the Storybook development server, and you can access it at `http://localhost:6006`.

To build a static version of Storybook for deployment, run:

```bash
yarn build-storybook
```

The static files will be generated in the `storybook-static` directory.

### Core UI System

The Core UI system is a collection of reusable UI components built on top of MUI that provide a consistent and efficient way to build user interfaces in the Conductor PM application. It organizes components into categories such as inputs, data display, layout, navigation, and more.

For more detailed information on the Core UI system, including how to use and customize components, please refer to the [CORE.md](src/lib/ui/core/CORE.md) file.

### Storybook Commands

- `yarn storybook`: Start the Storybook development server
- `yarn build-storybook`: Build a static version of Storybook for deployment
