# ----------------------------
# Base image
# ----------------------------
FROM python:3.12-slim

# ----------------------------
# Install Node.js (for Next.js)
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
RUN python3 -m venv venv
RUN pip install --no-cache-dir -r requirements.txt

# ----------------------------
# Expose ports
# ----------------------------
EXPOSE 80

# ----------------------------
# Go back to root
# ----------------------------
WORKDIR /app
RUN npm install

# RUN pwd && ls -la
# RUN find /app -maxdepth 3 -type d
# RUN which python || true
# RUN python --version || true



CMD ["npm", "run", "docker-setup"]
