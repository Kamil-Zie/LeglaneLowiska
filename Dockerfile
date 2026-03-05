# ==========================================
# Etap 1: Budowanie aplikacji (Build Stage)
# ==========================================
FROM node:22.13.0-alpine AS build

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Skopiowanie plików package.json oraz package-lock.json
COPY package*.json ./

# Instalacja zależności
RUN npm ci

# Skopiowanie całego kodu źródłowego (w tym folderów public i src)
COPY . .

# Zbudowanie aplikacji produkcyjnej (pliki trafią do folderu /app/build)
RUN npm run build

# ==========================================
# Etap 2: Serwowanie aplikacji (Nginx)
# ==========================================
FROM nginx:alpine

# Skopiowanie skompilowanych plików z Etapu 1 do domyślnego folderu Nginxa
COPY --from=build /app/build /usr/share/nginx/html

# (Opcjonalnie) Jeśli używasz React Routera, Nginx wymaga dodatkowej konfiguracji,
# aby poprawnie obsługiwać odświeżanie stron. Na ten moment używamy domyślnej.

# Udostępnienie portu 80
EXPOSE 80

# Uruchomienie serwera Nginx
CMD ["nginx", "-g", "daemon off;"]