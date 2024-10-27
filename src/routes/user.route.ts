import { Router } from 'express';
import userController from '../controllers/user.controller';
import userValidation from '../middlewares/userValidation';

const userRouter = Router();

userRouter.post('/login', userValidation, userController.userLogin);

export default userRouter;