import chai, { expect } from 'chai';
import sinon from 'sinon';
import productMock from '../../mocks/product.mock';

import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';

import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Ao receber um produto sem nome, deve retornar um erro', async () => {

    const httpRequestBody = productMock.noProductName;

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({"message": "\"name\" is required"})
  })

  it('Ao receber um produto com nome diferente de string, deve retornar um erro', async () => {

    const httpRequestBody = productMock.invalidProductName;

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({"message": "\"name\" must be a string"})
  })

  it('Ao receber um produto com nome menor que 3 caracteres, deve retornar um erro', async () => {

    const httpRequestBody = productMock.invalidNameLength;

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({"message": "\"name\" length must be at least 3 characters long"})
  })

  it('Ao receber um produto sem preço, deve retornar um erro', async () => {

    const httpRequestBody = productMock.noProductPrice;

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({"message": "\"price\" is required"})
  })

  it('Ao receber um produto com preço diferente de string, deve retornar um erro', async () => {

    const httpRequestBody = productMock.invalidProductPrice;

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({"message": "\"price\" must be a string"})
  })

  it('Ao receber um produto com preço menor que 3 caracteres, deve retornar um erro', async () => {

    const httpRequestBody = productMock.invalidPriceLength;

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({"message": "\"price\" length must be at least 3 characters long"})
  })

  it('Ao receber um produto válido, deve retornar o objeto do produto com o id correto', async () => {
    const httpRequestBody = productMock.validProduct;

    const mockProductCreation = ProductModel.build({id: 4, ...productMock.validProduct});
    sinon.stub(ProductModel, 'create').resolves(mockProductCreation);
    
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal({id: 4, ...productMock.validProduct})
  })

});
