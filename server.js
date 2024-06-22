const express = require("express");
const path = require("path");
const https = require("https");
const httpProxy = require("http-proxy");
const fs = require("fs");

const app = express();

// Chargement des certificats SSL/TLS
const privateKey = fs.readFileSync("./CERTS/privkey.pem", "utf8");
const certificate = fs.readFileSync("./CERTS/fullchain.pem", "utf8");

const credentials = { key: privateKey, cert: certificate };

// Servir les fichiers statiques depuis le dossier build
app.use(express.static(path.join(__dirname, "test-app", "dist")));

// Gérer les requêtes GET vers '/' en renvoyant l'index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "test-app", "dist", "index.html"));
});

// Créer un serveur HTTPS
const httpsServer = https.createServer(credentials, app);

// Définir le port d'écoute pour le serveur HTTPS
const port = process.env.PORT || 443;

// Définir un proxy pour les autres requêtes HTTP(S)
const proxy = httpProxy.createProxyServer({
  secure: true, // Permettre les connexions HTTPS vers le backend
  changeOrigin: true, // Modifier l'origine des en-têtes de requête pour correspondre à la cible
});

// Exemple de reverse proxy pour la route /
app.all("*", function (req, res) {
  proxy.web(req, res, { target: "https://localhost:443" });
});

// Écouter les requêtes HTTPS sur le port spécifié
httpsServer.listen(port, () => {
  console.log(`Serveur Node.js écoutant en HTTPS sur le port ${port}`);
});
