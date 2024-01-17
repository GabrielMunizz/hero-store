import express from 'express';
import ProductRoute from './routes/products';

const app = express();

app.use(express.json());

app.use('/products', ProductRoute);

export default app;
