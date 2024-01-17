import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import validateProduct from '../utils/validateProduct';

const createProduct = async (
  product: ProductInputtableTypes,
): Promise<ServiceResponse<ProductSequelizeModel>> => {
  let responseService: ServiceResponse<ProductSequelizeModel>;
  const error = validateProduct(product);

  if (error) {
    responseService = { status: 'INVALID_DATA', data: { message: error } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  responseService = { status: 'SUCCESSFUL', data: newProduct };

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
