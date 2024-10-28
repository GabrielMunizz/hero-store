import { Router } from 'express';

import productController from '../controllers/product.controller';
import productValidation from '../middlewares/productValidation';

const productRoute = Router();

productRoute.get('/products', productController.getAllProducts);
productRoute.patch('/products', productController.updateProduct);
productRoute.get('/products/:id', productController.findProductById);
productRoute.delete('/products/:id', productController.deleteProduct);
productRoute.post(
  '/products',
  productValidation.validateProductCreation,
  productController.addProducts,
);

export default productRoute;
