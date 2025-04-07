# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY prisma/ ./prisma/
COPY .env* ./

# Install dependencies with Prisma
RUN apk update && \
    apk add --no-cache curl openssl && \
    npm ci --include=dev && \
    npx prisma generate

# Copy all source files
COPY . .

# Build application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy production dependencies
COPY package*.json ./
COPY .env* ./
RUN npm ci --omit=dev

# Copy built files and prisma schema
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

# Migration and startup
CMD ["sh", "-c", "sleep 5 && npx prisma migrate deploy && node dist/main.js"]