# Stage 1
FROM node:20.16.0
WORKDIR /dev-nestjs

# install all modules
COPY package*.json ./
RUN npm ci

# copy files require to run
COPY prisma/ prisma/
COPY views/ views/
COPY .env .env
RUN npm run db:generate

COPY tsconfig*.json ./
COPY src/ src/

CMD ["npm", "run", "start:migrate:dev"]
