# Stage 1

FROM node:10-alpine as node

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2

FROM nginx:1.17.1-alpine
COPY --from=node /app/dist/tourweb /usr/share/nginx/html
