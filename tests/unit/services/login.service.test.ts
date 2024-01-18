import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginServices from '../../../src/services/login.services';


describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Testa se logUser com usuário e senha validos, funciona corretamente', async() => {
    const mockUser = {
      id: 1,      
      username: 'Hagar',
      password: '$2a$10$P/XRelZiFNF0WWifaRvb/e04L6szRFbt6SPWMZBwAcFxqqM18RWum',
      vocation: 'Guerreiro',
      level: 10,
    }

    const mockCredentials = {
      username: 'Hagar',
      password: 'terrível'
    }   

    const mockBuild = UserModel.build(mockUser)

    sinon.stub(UserModel, 'findOne').resolves(mockBuild);

    const response = await loginServices.logUser(mockCredentials)

    expect(response.status).to.equal('SUCCESSFUL');
    
  })

  it('Testa se a senha for inválida retorna status "UNAUTHORIZED', async() => {
    const mockUser = {
      id: 1,      
      username: 'Hagar',
      password: '$2a$10$P/XRelZiFNF0WWifaRvb/e04L6szRFbt6SPWMZBwAcFxqqM18RWum',
      vocation: 'Guerreiro',
      level: 10,
    }

    const mockCredentials = {
      username: 'Hagar',
      password: 'senhaErrada'
    }   

    const mockBuild = UserModel.build(mockUser)

    sinon.stub(UserModel, 'findOne').resolves(mockBuild);

    const response = await loginServices.logUser(mockCredentials)

    expect(response.status).to.equal('UNAUTHORIZED');
    
  })

  it('Testa se username for inválido retorna status "UNAUTHORIZED', async() => {
    const mockUser = {
      id: 1,      
      username: 'Hagar',
      password: '$2a$10$P/XRelZiFNF0WWifaRvb/e04L6szRFbt6SPWMZBwAcFxqqM18RWum',
      vocation: 'Guerreiro',
      level: 10,
    }

    const mockCredentials = {
      username: 'invalidUser',
      password: 'terrível'
    }   

    sinon.stub(UserModel, 'findOne').withArgs({ where: { username: 'invalidUser' } }).resolves(null);
    

    const response = await loginServices.logUser(mockCredentials)
    console.log(response);

    expect(response.status).to.equal('UNAUTHORIZED');    
  })
});
