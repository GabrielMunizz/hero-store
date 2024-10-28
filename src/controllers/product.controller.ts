import { Request, Response } from 'express';
import productsServices from '../services/products.services';
import { ProductInputtableTypes } from '../database/models/product.model';
import mapHTTPStatus from '../utils/mapHTTPStatus';

const getAllProducts = async (_req: Request, res: Response) => {
  const { status, data } = await productsServices.getAllProducts();

  res.status(mapHTTPStatus(status)).json(data);
};

const addProducts = async (req: Request, res: Response) => {
  const newProduct: ProductInputtableTypes = req.body;

  const { status, data } = await productsServices.addProducts(newProduct);

  return res.status(mapHTTPStatus(status)).json(data);
};

const findProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { status, data } = await productsServices.findProductById(Number(id));

  res.status(mapHTTPStatus(status)).json(data);
};

const updateProduct = async (req: Request, res: Response) => {
  const updatedData = req.body;

  const { status, data } = await productsServices.updateProduct(updatedData);

  res.status(mapHTTPStatus(status)).json(data);
};

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const { status } = await productsServices.deleteProduct(Number(id));

  res.status(mapHTTPStatus(status)).send();
};

export default {
  addProducts,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};