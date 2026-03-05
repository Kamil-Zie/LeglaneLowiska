FROM node:22.13.0-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .
RUN npm run build

FROM nginx:alpine as runner

WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .

EXPOSE 80