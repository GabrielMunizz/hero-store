import express from 'express';
import ProductRoute from './routes/products';
import OrderRoute from './routes/orders';
import LoginRoute from './routes/login';

const app = express();

app.use(express.json());

app.use('/products', ProductRoute);
app.use('/orders', OrderRoute);
app.use('/login', LoginRoute);

export default app;
