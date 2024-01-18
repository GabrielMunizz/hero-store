import express from 'express';
import ProductRoute from './routes/products';
import OrderRoute from './routes/orders';

const app = express();

app.use(express.json());

app.use('/products', ProductRoute);
app.use('/orders', OrderRoute);

export default app;
