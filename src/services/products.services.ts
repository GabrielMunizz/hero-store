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

const findProductById = async (id: number): Promise<ServiceResponse<ProductSequelizeModel>> => {
  const product = await ProductModel.findByPk(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

const deleteProduct = async (id: number): Promise<ServiceResponse<{ message: string }>> => {
  const product = await findProductById(id);

  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'product not found' } };
  }

  const removedProduct = await ProductModel.destroy({ where: { id } });

  if (removedProduct === 0) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: 'Ops! Something went wrong!' } };
  }

  return { status: 'NO_CONTENT', data: { message: 'Product removed!' } };
};

export default {
  addProducts,
  getAllProducts,
  findProductById,
  deleteProduct,
};
