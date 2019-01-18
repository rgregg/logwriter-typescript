# Docker Parent Image with Node and Typescript
FROM reidweb1/node-typescript:1.0.0

# Create Directory for the Container
WORKDIR /app

# Copy the files we need to our new Directory
ADD . /app

# Expose the port outside of the container
EXPOSE 8080

# Grab dependencies and transpile src directory to dist
RUN npm install && tsc

# Start the server
ENTRYPOINT ["node", "dist/"]