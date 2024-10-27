import { NextFunction, Request, Response } from 'express';
import mapHTTPStatus from '../utils/mapHTTPStatus';

const validateProductName = (name: string) => {
  if (name === undefined) {
    return { status: 'INVALID_DATA', data: { message: '"name" is required' } };
  }

  if (typeof name !== 'string') {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" must be a string' },
    };
  }

  if (name.length < 3) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"name" length must be at least 3 characters long' },
    };
  }

  return null;
};

const validateProductPrice = (price: string) => {
  if (price === undefined) {
    return { status: 'INVALID_DATA', data: { message: '"price" is required' } };
  }

  if (typeof price !== 'string') {
    return { status: 'UNPROCESSABLE_ENTITY', data: { message: '"price" must be a string' } };
  }

  if (price.length < 3) {
    return {
      status: 'UNPROCESSABLE_ENTITY',
      data: { message: '"price" length must be at least 3 characters long' },
    };
  }

  return null;
};

const validateProductCreation = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;
  const productNameError = validateProductName(name);
  const productPriceError = validateProductPrice(price);
  const error = [productNameError, productPriceError].find((productError) => productError?.status);

  if (error) {
    return res.status(mapHTTPStatus(error.status)).json(error.data);
  }

  next();
};

export default {
  validateProductCreation,
};