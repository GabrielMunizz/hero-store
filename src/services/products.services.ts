import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

const getAllProducts = async (): Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const allProducts = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: allProducts };
};

const addProducts = async (
  product: ProductInputtableTypes,
): Promise<ServiceResponse<ProductSequelizeModel>> => {
  const newProduct = await ProductModel.create(product);

  return { status: 'CREATED', data: newProduct };
};

export default {
  addProducts,
  getAllProducts,
};
