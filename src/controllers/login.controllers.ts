import { Response, Request } from 'express';
import services from '../services/login.services';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { Login } from '../types/User';

const logUserController = async (req: Request, res: Response) => {
  const login: Login = req.body;

  const serviceResponse = await services.logUser(login);
  const { status, data } = serviceResponse;

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  logUserController,
};