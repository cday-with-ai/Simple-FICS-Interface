FROM node:18-alpine

# Create app directory
WORKDIR /app/packages/backend

# Copy package files
COPY packages/backend/package*.json ./
COPY packages/backend/tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY packages/backend/src ./src

# Build the application
RUN npm run build

# Expose port
EXPOSE 3011

# Start the application
CMD ["npm", "start"]