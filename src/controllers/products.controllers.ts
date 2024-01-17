import { Request, Response } from 'express';
import services from '../services/products.services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const createProductController = async (req: Request, res: Response): Promise<Response> => {
  const product = req.body;
 
  try {
    const response = await services.createProduct(product);
    if (response.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }
    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const getProductsController = async (_req: Request, res: Response) => {
  try {
    const response = await services.getProducts();

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  } 
};

export default {
  createProductController,
  getProductsController,
};