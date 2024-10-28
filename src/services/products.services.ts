/* eslint-disable sonarjs/no-duplicate-string */
import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse, ServiceResponseSuccessful } from '../types/ServiceResponse';

const getAllProducts = async (): Promise<ServiceResponseSuccessful<ProductSequelizeModel[]>> => {
  const allProducts = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: allProducts };
};

const addProducts = async (
  product: ProductInputtableTypes,
): Promise<ServiceResponse<ProductSequelizeModel>> => {
  const newProduct = await ProductModel.create(product);

  return { status: 'CREATED', data: newProduct };
};

const findProductById = async (id: number): Promise<ServiceResponse<ProductSequelizeModel>> => {
  const product = await ProductModel.findByPk(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

const updateProduct = async (
  updatedData: Product,
): Promise<ServiceResponse<{ message: string }>> => {
  const { id, ...rest } = updatedData;

  const [affectedRows] = await ProductModel.update(rest, {
    where: { id },    
  });

  if (affectedRows === 0) {
    return { status: 'NOT_FOUND', data: { message: 'product not found' } };
  } 

  return { status: 'SUCCESSFUL', data: { message: 'product updated!' } };
};

const deleteProduct = async (id: number): Promise<ServiceResponse<{ message: string }>> => {
  const removedProduct = await ProductModel.destroy({ where: { id } });

  if (removedProduct === 0) {
    return { status: 'NOT_FOUND', data: { message: 'product not found' } };
  }

  return { status: 'NO_CONTENT', data: { message: 'Product removed!' } };
};

export default {
  addProducts,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
