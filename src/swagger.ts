import swaggerJsdoc from 'swagger-jsdoc';
import packageJSON from '../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: packageJSON.name,
      version: packageJSON.version,
      description: packageJSON.description,
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

export const specs = swaggerJsdoc(options);
