import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

const createProduct = async (
  product: ProductInputtableTypes,
): Promise<ServiceResponse<ProductSequelizeModel>> => {
  const newProduct = await ProductModel.create(product);
  const responseService: ServiceResponse<ProductSequelizeModel> = {
    status: 'SUCCESSFUL',
    data: newProduct,
  };

  return responseService;
};

const getProducts = async (): Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const products = await ProductModel.findAll();
  
  const responseService: ServiceResponse<ProductSequelizeModel[]> = {
    status: 'SUCCESSFUL',
    data: products,
  };
  return responseService;
};

export default {
  createProduct,
  getProducts,
};
