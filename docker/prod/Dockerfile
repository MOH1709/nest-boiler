# Stage 1
FROM node:20.16.0 AS build
WORKDIR /build

# install all modules
COPY package*.json ./
RUN npm ci

# copy files to create build
COPY prisma/ prisma/
COPY .env .env
RUN npm run db:generate

COPY tsconfig*.json ./
COPY src/ src/
RUN npm run build

# clean/uninstall the dev modules
RUN npm ci --omit=dev


# Stage 2
FROM node:20.16.0 AS run
WORKDIR /app

COPY --from=build build/package*.json .
COPY --from=build build/tsconfig*.json .
COPY --from=build build/node_modules node_modules/
COPY --from=build build/prisma prisma
COPY --from=build build/dist dist
COPY --from=build build/.env .env

CMD ["npm", "run", "start:migrate:prod"]
