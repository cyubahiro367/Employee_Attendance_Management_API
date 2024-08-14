import express, {Express, Request, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import attendanceRoutes from './src/routes/attendanceRoutes'
import employeeRoutes from './src/routes/employeeRoutes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { errorHandler } from './src/middleware/errorHandler';
import bodyParser from 'body-parser';



dotenv.config();

const app: Express = express();
const app_url: string = process.env.APP_URL || '';
const app_port: number = parseInt(process.env.APP_PORT || '3000', 10);
const databaseUrl: string = process.env.DATABASE_URL || '';

mongoose.connect(databaseUrl).then(() => {
  console.log(`App running at ${app_url}:${app_port}`);
  app.listen(app_port);
}).catch(() => {
  console.log("we found some errors");
});

app.use(bodyParser.json());
app.use(errorHandler);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Employee routes
app.use('/api', employeeRoutes);

// Attendance routes
app.use('/api', attendanceRoutes);

app.use('*', (req: Request, res: Response): void => {
  res.status(404).json({ message: 'Route not found' });
});