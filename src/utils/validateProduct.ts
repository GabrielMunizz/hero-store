import { ProductInputtableTypes } from '../database/models/product.model';

const validateProduct = (product:ProductInputtableTypes): string | null => {
  if (!product.name) return 'name is required';
  if (!product.orderId) return 'orderId is required';
  if (!product.price) return 'price is required';

  return null;
};

export default validateProduct;