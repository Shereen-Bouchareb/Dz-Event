const swaggerJsdoc = require('swagger-jsdoc');

// Options de configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DZ Events API',
      version: '1.0.0',
      description: 'API documentation for the DZ Events platform',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers les fichiers de routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
