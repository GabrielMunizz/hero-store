import { Request, Response } from 'express';
import orderServices from '../services/order.services';
import mapHTTPStatus from '../utils/mapHTTPStatus';

const getOrders = async (req: Request, res: Response) => {
  const { status, data } = await orderServices.getAllOrders();

  return res.status(mapHTTPStatus(status)).json(data);
};

export default {
  getOrders,
};