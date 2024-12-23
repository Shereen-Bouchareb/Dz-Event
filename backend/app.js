const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Middleware pour Express
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Permet de parser les données JSON dans les requêtes
app.use(cookieParser());

const profileRoutes = require('./routes/profileRoutes'); // Routes pour le profil
const signuppresRoutes = require('./routes/signuppresRoutes');       // Routes pour l'authentification
const commentsRoutes = require('./routes/commentsRoutes');  // Routes pour les messages
const loginRoutes = require('./routes/loginRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const checklistTaskRoutes = require('./routes/checklistTaskRoutes'); // Routes de la checklist
const signupuserRoutes = require('./routes/signupuserRoutes');
const prestataireRoutes = require('./routes/prestataireRoutes');


app.use('/prestataire',prestataireRoutes);
app.use('/profile', profileRoutes); // Routes pour les profils
app.use('/signuppres', signuppresRoutes);       // Routes pour l'authentification
app.use('/comments', commentsRoutes); // Routes pour les messages
app.use('/login', loginRoutes);
app.use('/gallery', galleryRoutes);
app.use('/services', serviceRoutes);
app.use('/checklistTask', checklistTaskRoutes); // Routes pour la gestion des checklists
app.use('/signupuser', signupuserRoutes);
