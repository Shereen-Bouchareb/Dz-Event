const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Initialiser l'application Express
const app = express();

// Middleware pour autoriser les requêtes provenant de n'importe quel domaine (CORS)
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Importer les routes
const checklistTasksRoutes = require("./routes/checklistTaskRoutes");

// Utiliser les routes importées
app.use("/api/checklist", checklistTasksRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
