const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes"); // Import des routes

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", emailRoutes); // Préfixe "/api" pour toutes les routes

// Route par défaut pour tester le serveur
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur Node.js !");
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
