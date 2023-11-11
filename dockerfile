# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json from the client folder
COPY front-end/package*.json ./front-end/
COPY front-end/package-lock.json ./front-end/

# Copy package.json and package-lock.json from the server folder
COPY server/package*.json ./server/
COPY server/package-lock.json ./server/

# Install project dependencies for both client and server
RUN cd ./front-end && npm install
RUN cd ./server && npm install

# Copy the rest of your application code to the container
COPY . .

# Set the environment variable for the application por
ENV PORT=8080

# Expose a port (if your app listens on a specific port)
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
