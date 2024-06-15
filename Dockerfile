# Étape 1 : Construire l'application React
FROM node:20.14.0-alpine as build-react
WORKDIR /files_storage/test-app
COPY ./test-app/package*.json ./
RUN npm install
COPY ./test-app .
RUN npm run build

# Étape 2 : Construire le serveur Node.js avec PM2
FROM node:20.14.0-alpine as build
WORKDIR /files_storage
COPY ./server.js .
COPY --from=build-react /files_storage/test-app/build ./test-app/build
RUN npm install pm2 -g
CMD ["pm2-runtime", "server.js"]
