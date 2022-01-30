import express, { Request, Response } from 'express';
import 'make-promises-safe';

import cors from 'cors';
const app = express();

app.use(cors()); 
app.use(express.json());
import modules from './routes/index.routes';


app.use(modules);
app.get('/', (req: Request, res: Response) => {
  return res.json({
    message: 'Hello World'
  })
});

export default app;