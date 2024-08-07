import express, {Express, Response} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);
const databaseUrl: string = process.env.DATABASE_URL || '';

mongoose.connect(databaseUrl).then(() => {
  console.log(`App running at http://localhost:${port}`);
  app.listen(port);
}).catch((error) => {
  console.log(error);
});

app.use(express.json());

app.get('/', (res: Response) => {
  res.send('Hello World! again');
});