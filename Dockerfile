# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Add build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps to handle compatibility
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Generate sitemap
RUN node scripts/sitemap.js
RUN node scripts/robot.js

# Build the project
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]