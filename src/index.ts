import express, { Request, Response} from 'express';
import 'dotenv/config';
import { fetchData } from './crowller/mercadolivre'
const app = express();

app.get('/', (req: Request, res: Response) => {
  fetchData('https://www.mercadolivre.com.br/apple-macbook-air-13-polegadas-2020-chip-m1-512-gb-de-ssd-8-gb-de-ram-cinza-espacial/p/MLB17828519?pdp_filters=category:MLB1652#searchVariation=MLB17828519&position=1&search_layout=grid&type=product&tracking_id=7ccbe300-c70f-474b-9d63-6a7b01bb4797');
  return res.json({
    message: 'Hello World'
  });
})

app.listen(process.env.APP_PORT, () => {
  console.log(`App listen on port ${process.env.APP_PORT}`)
})