FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_WS_API_URL
ARG VITE_GOOGLE_MAPS_API_KEY
ARG VITE_GA_MEASUREMENT_ID
ENV VITE_WS_API_URL=$VITE_WS_API_URL
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]