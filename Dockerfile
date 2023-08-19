# Use an official Nginx image as a parent image
FROM nginx:stable-alpine

# Set the working directory in the container to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Copy the current directory contents into the container at /usr/share/nginx/html
COPY ./dist /usr/share/nginx/html

# Run Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
