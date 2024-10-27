import { Router } from 'express';

import productController from '../controllers/product.controller';
import productValidation from '../middlewares/productValidation';

const productRoute = Router();

productRoute.get('/products', productController.getAllProducts);
productRoute.post(
  '/products',
  productValidation.validateProductCreation,
  productController.addProducts,
);

export default productRoute;
