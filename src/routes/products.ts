import { Router } from 'express';
import controllers from '../controllers/products.controllers';

const ProductRoute = Router();

ProductRoute.get('/', controllers.getProductsController);
ProductRoute.post('/', controllers.createProductController);

export default ProductRoute;