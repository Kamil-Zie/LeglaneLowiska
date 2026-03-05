# ==========================================
# Etap 1: Budowanie aplikacji (Build Stage)
# ==========================================
FROM node:22.13.0-alpine AS build

# Ustawienie katalogu roboczego
WORKDIR /app

# Skopiowanie plików konfiguracyjnych i instalacja zależności
COPY package*.json ./
RUN ["npm", "install"]

# Skopiowanie reszty kodu (w tym folderów src i public)
COPY . .

# Zbudowanie aplikacji (wynik trafi do folderu /app/build)
RUN ["npm", "run", "build"]
# ==========================================
# Etap 2: Serwowanie aplikacji (Nginx)
# ==========================================
FROM nginx:alpine

# Skopiowanie gotowych (zbudowanych) plików z pierwszego etapu
# Create React App domyślnie tworzy folder "build"
COPY --from=build /app/build /usr/share/nginx/html

# Wystawienie portu 80 (domyślny port Nginx)
EXPOSE 80

# Uruchomienie Nginxa
CMD ["nginx", "-g", "daemon off;"]