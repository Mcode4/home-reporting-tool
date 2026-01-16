# ----------------------------
# Base image
# ----------------------------
FROM python:3.12-slim

# ----------------------------
# Environment variables
# ----------------------------
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV NODE_ENV production

# ----------------------------
# Set working directory
# ----------------------------
WORKDIR /app

# ----------------------------
# Install backend dependencies
# ----------------------------
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ----------------------------
# Install Node.js (for Next.js)
# ----------------------------
RUN apt-get update && \
    apt-get install -y curl gnupg build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pm2 && \
    rm -rf /var/lib/apt/lists/*

# ----------------------------
# Copy backend and frontend code
# ----------------------------
COPY . .

# ----------------------------
# Install frontend dependencies and build
# ----------------------------
WORKDIR /app/nextjs
RUN npm install
RUN npm run build

# ----------------------------
# Go back to root
# ----------------------------
WORKDIR /app

# ----------------------------
# Expose ports
# ----------------------------
EXPOSE 8000 3000

# ----------------------------
# Start both backend and frontend via PM2
# ----------------------------
CMD ["pm2-runtime", "ecosystem.config.js"]
