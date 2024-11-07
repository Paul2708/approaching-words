# Dockerfile
# Use Node.js as the base image for building the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variables at build time
# This is where you inject environment variables if needed during the build process
ARG VITE_WS_URL
ENV VITE_WS_URL=${VITE_WS_URL}

# Build the React app
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine AS production

# Copy the React build files to Nginx's HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
