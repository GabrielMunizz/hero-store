import express from 'express';

import productRoute from './routes/product.route';
import orderRouter from './routes/order.route';
import userRouter from './routes/user.route';

const app = express();

app.use(express.json());
app.use(productRoute);
app.use(orderRouter);
app.use(userRouter);

export default app;
