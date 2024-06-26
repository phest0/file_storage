# Étape 1 : Construire l'application React
FROM node:20.14.0-alpine as build-react

# Labels
LABEL version=v0.3
LABEL description="file_storage_react_app"

# Arguments
ARG APP_USER=appuser
ARG APP_GROUP=appgroup

# Création utilisateur, dossiers de travail et installation de pm2
RUN addgroup -S ${APP_GROUP} && \
adduser -S ${APP_USER} -G ${APP_GROUP} && \
mkdir /files_storage && \ 
chown -R ${APP_USER}:${APP_GROUP} /files_storage && \
mkdir -p /home/${APP_USER}/pm2/logs/out && \
mkdir -p /home/${APP_USER}/pm2/logs/error && \
chown -R ${APP_USER}:${APP_GROUP} /home/${APP_USER}/pm2 && \
npm install pm2 -g && \
pm2 install pm2-logrotate && \
pm2 set pm2-logrotate:retain 7

# Répertoire de travail
WORKDIR /files_storage

# Changement utilisateur
USER ${APP_USER}:${APP_GROUP}

RUN mkdir -p ./test-app

# Copie des fichiers de l'application React
COPY --chown=${APP_USER}:${APP_GROUP} ./test-app ./test-app

RUN cd ./test-app && npm install && npm run build && npm cache clean --force

COPY --chown=${APP_USER}:${APP_GROUP} ./package.json .
COPY --chown=${APP_USER}:${APP_GROUP} ./server.js .
COPY --chown=${APP_USER}:${APP_GROUP} ./ecosystem.config.js .
COPY --chown=${APP_USER}:${APP_GROUP} ./CERTS/ ./CERTS

# Installation des dépendances Node.js
RUN npm install && npm cache clean --force

# Exposer le port nécessaire
EXPOSE 443

# Commande de démarrage de PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
