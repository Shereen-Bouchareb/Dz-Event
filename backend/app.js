const express = require('express');
const cors = require('cors');
const app = express(); 
const bodyParser = require('body-parser');


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');  


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(bodyParser.json());


// Utilisation de Swagger UI pour la documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const prestataireRoutes = require('./routes/prestataireRoutes');
const commentsRoutes = require('./routes/commentsRoutes');  
const servicesRoutes = require('./routes/serviceRoutes');
//const availabilityRoutes = require('./routes/availabilityRoutes');
const profileRoutes = require('./routes/profileRoutes'); 
const checklistTasksRoutes = require('./routes/checklistTaskRoutes');
const reservationsRoutes= require('./routes/reservationsRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', authRoutes);  
app.use('/profile', profileRoutes); 
//app.use('/availability', availabilityRoutes); 
app.use('/services', servicesRoutes);
app.use('/comments', commentsRoutes); 
app.use('/reservations', reservationsRoutes); 
app.use('/checklistTasks', checklistTasksRoutes);      
app.use('/prestataires', prestataireRoutes);      
      

app.get('/', (req, res) => {
  res.send('Server is running');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong', details: err.message });
});


module.exports = app;