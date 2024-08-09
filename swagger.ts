import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();
const app_url: string = process.env.APP_URL || '';
const app_port: number = parseInt(process.env.APP_PORT || '3000', 10);

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Attendance Management API',
      version: '1.0.0',
      description: 'API documentation for the Employee Attendance Management system',
    },
    servers: [
      {
        url: `${app_url}:${app_port}`, // Change this to your server's URL
      },
    ],
  },
  apis: ['./src/controllers/*.ts'], // Files containing Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
