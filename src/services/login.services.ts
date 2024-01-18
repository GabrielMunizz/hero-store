import UserModel from '../database/models/user.model';
import jwtValidade from '../utils/jwtValidade';
import { ServiceResponse } from '../types/ServiceResponse';
import { Login } from '../types/User';
import { Token } from '../types/Token';
import passwordFunctions from '../utils/passwordFunctions';

const logUser = async (login: Login): Promise<ServiceResponse<Token>> => {
  const findUser = await UserModel.findOne({ where: { username: login.username } });
  const { comparePasswords } = passwordFunctions;
  
  if (!findUser) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const match = await comparePasswords(login.password, findUser.dataValues.password as string);
  
  if (!match) return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  
  const { id, username } = findUser.dataValues;
  
  const token = jwtValidade.sign({ id, email: username });

  return {
    status: 'SUCCESSFUL',
    data: { token },
  };
};

export default {
  logUser,
};