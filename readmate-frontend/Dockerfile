
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ../nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
