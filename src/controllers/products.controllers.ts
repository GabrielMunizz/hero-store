import { Request, Response } from 'express';
import { createProduct } from '../services/products.services';

export const createProductController = async (req: Request, res: Response) => {
  const product = req.body;

  try {
    const newProduct = await createProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

export const addProductControler = {};