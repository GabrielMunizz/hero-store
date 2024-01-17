import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';

export const createProduct = async (
  product: ProductInputtableTypes,
): Promise<ProductSequelizeModel> => {
  try {
    const newProduct = await ProductModel.create(product);

    return newProduct;
  } catch (error) {
    console.error('Erro ao criar o produto', error);
    throw error;
  }
};

export const addProduct = [];
