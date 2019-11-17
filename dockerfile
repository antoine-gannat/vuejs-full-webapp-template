FROM node:lts-alpine

#### SERVER ####

WORKDIR /app/server

COPY ./server/package*.json ./

RUN npm i --prod

COPY ./server/. ./

RUN npm run build

COPY ./server/src/openapi.yaml ./dist/

#### WEBAPP ####

WORKDIR /app/webapp

COPY ./webapp/package*.json ./

RUN npm i --prod

COPY ./webapp/. ./

RUN npm run build

EXPOSE 4000

CMD node /app/server/dist/server.js