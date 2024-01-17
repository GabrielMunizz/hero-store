import { Request, Response } from 'express';
import services from '../services/products.services';

const createProductController = async (req: Request, res: Response): Promise<Response> => {
  const product = req.body;
 
  try {
    const response = await services.createProduct(product);
    if (response.status === 'SUCCESSFUL') {
      const newProduct = response.data;
      return res.status(201).json(newProduct);
    } 
    const errorMessage = response.data.message;

    if (response.status === 'INVALID DATA') {
      return res.status(400).json({ error: errorMessage });
    } 
    return res.status(500).json({ error: 'Erro ao criar o produto' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export default {
  createProductController,
};