import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model';
import service from '../../../src/services/login.services'
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Testa se um usuário válido consegue fazer login corretamente', async() => {
    const mockUser = {
      id: 1,      
      username: 'Hagar',
      password: 'terrível',
      vocation: 'Guerreiro',
      level: 10,
    }
    const mockToken = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJIYWdhciIsImlhdCI6MTcwNTYwNjY0NX0.FiCXeR8GQIbsVBNN0IZcbIa0FnZS1nZ7rfyDeFWD-mE'
    }

    const mockCredentials = {
      username: 'Hagar',
      password: 'terrível'
    }

    const mockBuild = UserModel.build(mockUser);

    sinon.stub(UserModel, 'findOne').resolves(mockBuild);

    sinon.stub(service, 'logUser').resolves({status: 'SUCCESSFUL', data: mockToken});

    const httpResponse = await chai.request(app).post('/login').send(mockCredentials);

    
    
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(mockToken);   
    expect(httpResponse.body).to.have.property('token');    
  })
});
