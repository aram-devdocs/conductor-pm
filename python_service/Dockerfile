FROM python:3.11-slim

WORKDIR /app

# Install Node.js, npm, and system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g prisma \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Poetry and add it to PATH
ENV POETRY_HOME=/opt/poetry
RUN curl -sSL https://install.python-poetry.org | python3 - && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

# Install additional Python packages
RUN pip install --no-cache-dir openai httpx redis

ENV DATABASE_URL="file:/app/data.db"

# Copy Poetry configuration
COPY python_service/pyproject.toml ./

# Install dependencies
RUN poetry install --no-root --without dev

# Copy application code
COPY python_service/src ./src
COPY prisma/schema.prisma ./prisma/schema.prisma

# Generate Prisma client
RUN poetry run prisma generate --schema ./prisma/schema.prisma

CMD ["poetry", "run", "python", "-m", "src.agent"] 