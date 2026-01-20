# ----------------------------
# Base image
# ----------------------------
FROM python:3.12-slim

# ----------------------------
# Install Node.js (for Next.js), Nginx, PgLoader
# ----------------------------
RUN apt-get update && \
    apt-get install -y curl gnupg build-essential nginx && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/* 

# ----------------------------
# Nginx
# ----------------------------
# FROM nginx:1.18.0-alpine
# WORKDIR /etc/nginx/templates
COPY /nginx/nginx.conf /etc/nginx/nginx.conf

# ----------------------------
# Environment variables
# ----------------------------
ARG ACCESS_TOKEN_EXPIRE_MINUTES
ARG SQLITE_PATH
ARG POSTGRES_URL
ARG SECRET_KEY
ARG ALGORITHM
ARG PROJECT_ENV

# ----------------------------
# Bake ARGS into Image
# ----------------------------
ENV ACCESS_TOKEN_EXPIRE_MINUTES=${ACCESS_TOKEN_EXPIRE_MINUTES}
ENV SQLITE_PATH=${SQLITE_PATH}
ENV POSTGRES_URL=${POSTGRES_URL}
ENV SECRET_KEY=${SECRET_KEY}
ENV ALGORITHM=${ALGORITHM}
ENV PROJECT_ENV=${PROJECT_ENV}

# ----------------------------
# Set working directory
# ----------------------------
WORKDIR /app

# ----------------------------
# Copy backend and frontend code
# ----------------------------
COPY . .


# ----------------------------
# Install backend dependencies
# ----------------------------
WORKDIR /app/backend
RUN pip install --no-cache-dir -r requirements.txt
RUN python3 main.py
RUN python3 ./scripts/migrate_db_to_postgres.py

# ----------------------------
# Install frontend dependencies
# ----------------------------
WORKDIR /app/frontend
ENV NEXT_PUBLIC_PROXY=true
RUN npm install
RUN npm run build



# ----------------------------
# Expose ports
# ----------------------------
EXPOSE 10000

# ----------------------------
# Go back to root
# ----------------------------
WORKDIR /app
RUN npm install

# ----------------------------
# File Testing
# ----------------------------
# RUN pwd && ls -la
# RUN find /app -maxdepth 3 -type d
# RUN which python || true
# RUN python --version || true



CMD ["npm", "run", "docker-setup"]
