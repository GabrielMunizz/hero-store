import { Router } from 'express';
import validateUser from '../middlewares/validateUser';
import loginControllers from '../controllers/login.controllers';

const LoginRoute = Router();

LoginRoute.post('/', validateUser, loginControllers.logUserController);

export default LoginRoute;