import { Request, Response } from 'express';
import userServices from '../services/user.services';
import { UserLogin } from '../types/User';
import mapHTTPStatus from '../utils/mapHTTPStatus';

const userLogin = async (req: Request, res: Response) => {
  const { username, password }: Omit<UserLogin, 'id'> = req.body;
  const { status, data } = await userServices.userLogin({ username, password });

  res.status(mapHTTPStatus(status)).json(data);
};

export default {
  userLogin,
};