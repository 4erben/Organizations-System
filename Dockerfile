# Use an official Node.js image with version 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files from the project folder to the working directory
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code from the project folder to the container
COPY app/. ./

# Expose the port your app runs on (8080)
EXPOSE 8080

# Command to run your application
CMD ["node", "app.js"]
