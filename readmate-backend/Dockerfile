# ─── Stage 1: build
FROM node:20 AS builder

WORKDIR /usr/src/app

# Kopiujemy manifesty i instalujemy zależności
COPY package*.json ./
RUN npm ci

# Kopiujemy kod i budujemy aplikację
COPY . .
RUN npm run build

# ─── Stage 2: production
FROM node:20-slim AS runner

WORKDIR /usr/src/app

# Kopiujemy tylko to, co potrzebne do uruchomienia
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Instalujemy tylko produkcyjne zależności
RUN npm ci --only=production && \
    npm cache clean --force

# Expose port (domyślnie 3000)
EXPOSE 3000

# Uruchamiamy aplikację jako root
CMD ["node", "dist/main.js"]