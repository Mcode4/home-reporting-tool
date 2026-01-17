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
    # npm install -g pm2 && \
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
# ENV PYTHONDONTWRITEBYTECODE 1
# ENV PYTHONUNBUFFERED 1

ENV FASTAPI_PORT=8000
ENV ACCESS_TOKEN_EXPIRE_MINUTES=60
ENV SQLITE_PATH=report_tool_db.db

ARG PORT
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
RUN pip install --no-cache-dir -r requirements.txt

# ----------------------------
# Install frontend dependencies and build
# ----------------------------
# WORKDIR /app/frontend
# RUN npm install
# RUN npm run build

# ----------------------------
# Expose ports
# ----------------------------
# EXPOSE 8000 3000
EXPOSE 80

# ----------------------------
# Go back to root
# ----------------------------
WORKDIR /app
RUN npm install


CMD ["npm", "run", "docker-setup"]





# ----------------------------
# Start both backend and frontend via PM2
# ----------------------------
# CMD ["pm2-runtime", "ecosystem.config.js"]
