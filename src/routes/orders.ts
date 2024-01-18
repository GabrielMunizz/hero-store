import { Router } from 'express';
import controller from '../controllers/orders.controllers';

const OrderRoute = Router();

OrderRoute.get('/', controller.gerOrdersController);

export default OrderRoute;