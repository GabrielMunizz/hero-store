import { Request, Response } from 'express';
import services from '../services/orders.services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const gerOrdersController = async (_req: Request, res: Response) => {
  const response = await services.getOrders();

  return res.status(mapStatusHTTP(response.status)).json(response.data);
};

export default {
  gerOrdersController,
};