import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMock from '../../mocks/loginMock';

import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Ao fazer login sem username, deve retornar um erro', async () => {
    const httpRequestBody = loginMock.noUsernameLogin;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({"message": "\"username\" and \"password\" are required"});
  })

  it('Ao fazer login sem password, deve retornar um erro', async () => {
    const httpRequestBody = loginMock.noPasswordLogin;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({"message": "\"username\" and \"password\" are required"});
  })

  it('Ao fazer login com username que não consta no banco de dados, deve retornar um erro', async () => {
    const httpRequestBody = loginMock.usernameNotFound;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ "message": "Username or password invalid" });
  })

  it('Ao fazer login com uma senha inválida, deve retornar um erro', async () => {
    const httpRequestBody = loginMock.invalidPassword;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ "message": "Username or password invalid" });
  })

  it('Ao fazer login válido, deve retornar um token', async () => {
    const httpRequestBody = loginMock.validLogin;

    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody);

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  })

});
