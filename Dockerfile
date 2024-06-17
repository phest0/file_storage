# Étape 1 : Construire l'application React
FROM node:20.14.0-alpine as build-react

# Labels
LABEL version=v0.1
LABEL description="file_storage_react_app"

# Arguments
ARG APP_USER=appuser
ARG APP_GROUP=appgroup

# Création utilisateur
RUN addgroup -S ${APP_GROUP} && adduser -S ${APP_USER} -G ${APP_GROUP}

# Répertoire de travail
WORKDIR /files_storage/test-app

# Changement utilisateur
USER ${APP_USER}:${APP_GROUP}

# Copie des fichiers de package.json et installation des dépendances
COPY --chown=${APP_USER}:${APP_GROUP} ./test-app/package*.json ./

RUN cd ./test-app && npm install

# Copie des fichiers de l'application React et construction
COPY --chown=${APP_USER}:${APP_GROUP} ./test-app .

RUN cd ./test-app && npm run build

# Nettoyage des fichiers temporaires
RUN cd ./test-app && npm cache clean --force && \
    rm -rf /tmp/*

# Étape 2 : Construire le serveur Node.js avec PM2
FROM node:20.14.0-alpine as build

# Labels
LABEL version=v0.1
LABEL description="file_storage_node_server"

# Arguments
ARG APP_USER=appuser
ARG APP_GROUP=appgroup

# Création utilisateur
RUN addgroup -S ${APP_GROUP} && adduser -S ${APP_USER} -G ${APP_GROUP}

# Répertoire de travail
WORKDIR /files_storage

# Changement utilisateur
USER ${APP_USER}:${APP_GROUP}

# Copie des fichiers de package.json, server.js et configuration PM2
COPY --chown=${APP_USER}:${APP_GROUP} ./package*.json ./
COPY --chown=${APP_USER}:${APP_GROUP} ./server.js ./
COPY --chown=${APP_USER}:${APP_GROUP} ./ecosystem.config.cjs ./

# Installation des dépendances Node.js
RUN npm install

# Nettoyage des fichiers temporaires
RUN npm cache clean --force && \
    rm -rf /tmp/*

# Copie des fichiers de l'application React construite
COPY --from=build-react --chown=${APP_USER}:${APP_GROUP} /files_storage/test-app/dist ./test-app/dist

# Installation de PM2, configuration des logs et exposition du port
RUN npm install pm2 -g && \
    pm2 install pm2-logrotate && \
    pm2 set pm2-logrotate:retain 7 && \
    mkdir -p /home/${APP_USER}/pm2/logs/out && \
    mkdir -p /home/${APP_USER}/pm2/logs/error && \
    chown -R ${APP_USER}:${APP_GROUP} /home/${APP_USER}/pm2

# Exposer le port nécessaire
EXPOSE 3200

# Commande de démarrage de PM2
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]