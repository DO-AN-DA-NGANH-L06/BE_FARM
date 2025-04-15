const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FarmGenius API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./swaggerDocs.js'], 
});

module.exports = swaggerSpec;
