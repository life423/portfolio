# Use an official Nginx image as a parent image
FROM nginx:stable-alpine

# Set the working directory in the container to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Copy the built dist folder into Nginx
COPY ./dist /usr/share/nginx/html

# This docker image listens on port 80 for incoming connections
EXPOSE 80

# Run Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]