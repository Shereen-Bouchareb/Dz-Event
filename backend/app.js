const express = require('express');
const cors = require('cors');
const app = express(); 
const bodyParser = require('body-parser');



// Importation de la configuration Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');  // Importer ton fichier swagger.js



app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(bodyParser.json());

const prestataireRoutes = require('./routes/prestataireRoutes');
const commentsRoutes = require('./routes/commentsRoutes');  
const servicesRoutes = require('./routes/serviceRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const profileRoutes = require('./routes/profileRoutes'); 
const checklistTasksRoutes = require('./routes/checklistTaskRoutes');
const reservationsRoutes= require('./routes/reservationsRoutes');
const authRoutes = require('./routes/authRoutes');


// Utilisation de Swagger UI pour la documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use('/api', authRoutes);  
app.use('/profile', profileRoutes); 
app.use('/availability', availabilityRoutes); 
app.use('/services', servicesRoutes);
app.use('/comments', commentsRoutes); 
app.use('/reservations', reservationsRoutes); 
app.use('/chacklistTasks', checklistTasksRoutes);      
app.use('/prestataire', prestataireRoutes);      
      

app.get('/', (req, res) => {
 //res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.send('Server is running');
});


// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
});


module.exports = app;