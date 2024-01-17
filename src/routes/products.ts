import { Router } from 'express';
import controllers from '../database/controllers/products.controllers';

const ProductRoute = Router();

ProductRoute.post('/', controllers.createProductController);

export default ProductRoute;