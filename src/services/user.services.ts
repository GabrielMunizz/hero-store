import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import { UserLogin } from '../types/User';
import jwtValidation from '../utils/jwt.validation';

const findUser = async (username: string): Promise<UserLogin | null> => {
  const foundUser = await UserModel.findOne({ where: { username } });
  
  if (foundUser) {
    const formatUser: UserLogin = foundUser.toJSON();
    return formatUser;
  }

  return null;
};

const userLogin = async (user: Omit<UserLogin, 'id'>): Promise<ServiceResponse<Token>> => {
  const { username, password } = user;

  const foundUser = await findUser(username);

  if (!foundUser) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  if (!bcrypt.compareSync(password, foundUser.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { username: foundUsername, id } = foundUser;

  const token = jwtValidation.sign({ id, username: foundUsername });

  return { status: 'SUCCESSFUL', data: { token } };
};

export default {
  userLogin,
};