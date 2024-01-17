import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../models/product.model';
import { ServiceResponse } from '../../types/ServiceResponse';

const validateProduct = (product:ProductInputtableTypes): string | null => {
  if (!product.name) return 'name is required';
  if (!product.orderId) return 'orderId is required';
  if (!product.price) return 'price is required';

  return null;
};

const createProduct = async (
  product: ProductInputtableTypes,
): Promise<ServiceResponse<ProductSequelizeModel>> => {
  let responseService: ServiceResponse<ProductSequelizeModel>;
  const error = validateProduct(product);

  if (error) {
    responseService = { status: 'INVALID DATA', data: { message: error } };
    return responseService;
  }

  const newProduct = await ProductModel.create(product);

  responseService = { status: 'SUCCESSFUL', data: newProduct };

  return responseService;
};

export default {
  createProduct,
};
