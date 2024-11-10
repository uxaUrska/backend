import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API za vodenje stroškov in uspešnosti podjetja',
      version: '1.0.0',
      description: 'API dokumentacija za aplikacijo',
      contact: {
        name: 'Podpora',
        email: 'podpora@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Lokalni strežnik'
      }
    ]
  },
  apis: ['./src/routes/*.ts'] // Pot do datotek z API definicijami
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
