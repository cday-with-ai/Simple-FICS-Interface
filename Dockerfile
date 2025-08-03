FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY packages/backend/package*.json ./
COPY packages/backend/tsconfig.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY packages/backend/src ./src

# Build the application
RUN npm run build

# Expose port
EXPOSE 3011

# Start the application
CMD ["npm", "start"]