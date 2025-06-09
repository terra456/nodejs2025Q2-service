FROM node:22.16.0-alpine3.22

# Set working directory
WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

RUN npm install --legacy-peer-deps

COPY . .

CMD ["sh", "-c", "npm run db:deploy && npm run start:dev"]