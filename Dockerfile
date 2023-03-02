# Use an official Node.js runtime as the base image
FROM node:18-alpine

ENV NODE_ENV=development
ENV PORT 3000


ENV DATABASE_mongodb=HandGallGG

ENV JWT_SECRET=tata
ENV JWT_EXPIRES_IN=90d
ENV JWT_COOKIE_EXPIRES_IN=90


# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application's code to the container
COPY . .

# Specify the command to run when the container starts
CMD [ "npm", "start" ]

# Expose the application's port
EXPOSE 3000
