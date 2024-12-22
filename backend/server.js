const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const profileRoutes = require('./routes/profileRoutes'); // Routes pour le profil
const signuppresRoutes = require('./routes/signuppresRoutes');       // Routes pour l'authentification
const commentsRoutes = require('./routes/commentsRoutes');  // Routes pour les messages
const loginRoutes = require('./routes/loginRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const db = require('./config/db');
const ratingRoutes = require('./routes/ratingRoutes');
const checklistTaskRoutes = require('./routes/checklistTaskRoutes'); // Routes de la checklist
const signupuserRoutes = require('./routes/signupuserRoutes');


const app = express();

// Middleware pour Express
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Permet de parser les données JSON dans les requêtes
app.use(cookieParser());
// Intégration des routes Express
// Routes Express
app.use('/api/profile', profileRoutes); // Routes pour les profils
app.use('/api/signuppres', signuppresRoutes);       // Routes pour l'authentification
app.use('/comments', commentsRoutes); // Routes pour les messages
app.use('/api/login', loginRoutes);
app.use('/api/gallery', galleryRoutes);
// Routes des services
app.use('/api/services', serviceRoutes);

app.use('/api', ratingRoutes);

app.use('/api/checklistTask', checklistTaskRoutes); // Routes pour la gestion des checklists
// Enregistrement du routeur d'utilisateur
app.use('/api/signupuser', signupuserRoutes);
// Création du serveur HTTP natif
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/signup')) {
    authRoutes(req, res); // Authentification via le module HTTP natif
  } else if (req.url.startsWith('/profile')) {
    profileRoutes(req, res); // Gestion des profils via le module HTTP natif
  } else if (req.url.startsWith('/api/gallery')) {
    app(req, res); // Déléguer les routes de galerie à Express
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route non trouvée.' }));
  }
});

// Servir les fichiers uploadés
app.use('/uploads', express.static('uploads'));


// Configuration du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
