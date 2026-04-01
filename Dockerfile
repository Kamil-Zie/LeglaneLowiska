# Stage 1: Build React frontend
FROM node:22-alpine AS frontend-build
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Stage 2: Backend
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

# Copy React build into backend
COPY --from=frontend-build /frontend/build ./client/build

EXPOSE 8080
ENV PORT=8080
CMD ["node", "app.js"]