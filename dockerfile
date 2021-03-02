# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "build"
FROM node:12 AS build
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . /app
# install node modules and build assets
RUN npm install --silent
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Containers run nginx with global directives and daemon off
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]