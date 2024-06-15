const express = require("express");
const path = require("path");

const app = express();

console.log("__dirname", __dirname);
// Servir les fichiers statiques depuis le dossier build
app.use(express.static(path.join(__dirname, "test-app", "dist")));

// Gérer les requêtes GET vers '/' en renvoyant l'index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "test-app", "dist", "index.html"));
});

// Port d'écoute pour le serveur
const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`Serveur Node.js écoutant sur le port ${port}`);
});
