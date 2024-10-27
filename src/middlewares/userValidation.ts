import { NextFunction, Request, Response } from 'express';
import mapHTTPStatus from '../utils/mapHTTPStatus';

const validateUserName = (username: string) => {
  if (username === undefined || username === '') {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }
  
  return null;
};

const validatePassword = (password: string) => {
  if (password === undefined || password === '') {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }

  return null;
};

const userValidation = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const usernameError = validateUserName(username);
  const passwordError = validatePassword(password);
  
  const error = [usernameError, passwordError].find((userError) => userError?.data);
  if (error) {
    return res.status(mapHTTPStatus(error.status)).json(error.data);
  }

  next();
};

export default userValidation;