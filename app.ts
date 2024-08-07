import express, {Express, Response} from 'express';

const app: Express = express();
const port: number = 3000;

app.use(express.json());

app.get('/', (res: Response) => {
  res.send('Hello World! again');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});