const express = require("express");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");
require("dotenv").config(); // Charger les variables d'environnement

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Définir le dossier des vues (statique)
app.use(express.static("views"));

// Routes
app.use("/api", emailRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
