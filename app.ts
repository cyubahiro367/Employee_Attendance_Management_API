import express, {Express} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import employeeRoutes from './src/routes/employeeRoutes';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);
const databaseUrl: string = process.env.DATABASE_URL || '';

mongoose.connect(databaseUrl).then(() => {
  console.log(`App running at http://localhost:${port}`);
  app.listen(port);
}).catch(() => {
  console.log("we found some errors");
});

app.use(express.json());

app.use('/api', employeeRoutes);