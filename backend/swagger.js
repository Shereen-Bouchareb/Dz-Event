
// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

// Options de configuration pour swagger-jsdoc
const options = {
  definition: {
    openapi: "3.0.0",  // spécifie la version de l'OpenAPI
    info: {
      title: "API Backend",  // Le titre de ton API
      version: "1.0.0",  // La version de l'API
      description: "Documentation pour l'API backend",  // Description de l'API
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'],  // Chemin vers les fichiers de routes et de contrôleurs
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
