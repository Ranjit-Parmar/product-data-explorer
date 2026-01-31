FROM node:20

WORKDIR /usr/src/app

# Install system dependencies required by Playwright + postgres client
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    xdg-utils \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install node dependencies
RUN npm install

# Install Playwright browser (VERY IMPORTANT)
RUN npx playwright install chromium

# Optional but recommended
RUN npm install -g ts-node typescript postgresql

# Copy project files
COPY . .

# Expose backend port
EXPOSE 3000

# Wait for DB → seed → start app
CMD ["sh", "-c", "./wait-for-postgres.sh postgres ts-node src/seed.ts && npm run start:dev"]
