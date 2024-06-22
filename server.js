const express = require("express");
const path = require("path");
const https = require("https");
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

// Port d'écoute pour le serveur HTTPS
const port = process.env.PORT || 80;
httpsServer.listen(port, () => {
  console.log(`Serveur Node.js écoutant en HTTPS sur le port ${port}`);
});
