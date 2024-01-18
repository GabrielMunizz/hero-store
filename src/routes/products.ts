import { Router } from 'express';
import controllers from '../controllers/products.controllers';
import midd from '../middlewares/validateProducts';

const ProductRoute = Router();

ProductRoute.get('/', controllers.getProductsController);
ProductRoute.post(
  '/',
  midd.validateEntriesLength,
  midd.validateProductFields,  
  midd.nameAndPriceExists,
  controllers.createProductController,
);

export default ProductRoute;