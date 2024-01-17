import { Router } from 'express';
import { createProductController } from '../controllers/products.controllers';

const ProductRoute = Router();

ProductRoute.post('/', createProductController);

export default ProductRoute;