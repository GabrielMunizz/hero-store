import { Request, Response, NextFunction } from 'express';
import { ProductInputtableTypes } from '../database/models/product.model';

const nameAndPriceExists = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, orderId } = req.body as ProductInputtableTypes;
  
  if (name === undefined) return res.status(400).json({ message: '"name" is required' });
  if (price === undefined) return res.status(400).json({ message: '"price" is required' });
  if (orderId === undefined) return res.status(400).json({ message: '"orderId" is required' });

  next();
};

const validateProductFields = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body as ProductInputtableTypes;
  
  if (name && typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }

  if (price && typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }

  next();
};

const validateEntriesLength = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body as ProductInputtableTypes;

  if (name && name.length < 3) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  } 
  
  if (price && price.length < 3) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }
  next();
};

export default {
  nameAndPriceExists,
  validateProductFields,
  validateEntriesLength,
};