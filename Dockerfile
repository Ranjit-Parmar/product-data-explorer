FROM node:20

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g ts-node typescript postgresql

# Copy project files
COPY . .

# Install postgresql client for wait script
RUN apt-get update && apt-get install -y postgresql-client

# Expose backend port
EXPOSE 3000

# Command: wait for Postgres, seed DB, start backend
CMD ["sh", "-c", "./wait-for-postgres.sh postgres ts-node src/seed.ts && npm run start:dev"]
