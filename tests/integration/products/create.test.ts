import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import service from '../../../src/services/products.services'
import productMock from '../../mocks/product.mock';
import app from '../../../src/app'
import ProductModel from '../../../src/database/models/product.model';import { create } from 'domain';
;



chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  // se o produto for criado corretamente, retorna uma resposta de sucesso.
  it('Testa se é possível criar um produto corretamente', async() => {

    const product = {
      id: 6,
      name: 'Produto de Teste',
      price: '10 moedas',
      orderId: 1,
    };

    const mockBuild = ProductModel.build(product);

    sinon.stub(ProductModel, 'create').resolves(mockBuild);    

    sinon.stub(service, 'createProduct').resolves({status: 'SUCCESSFUL', data: mockBuild})

    const httpResponse = await chai.request(app).post('/products').send(productMock.validProductBody);
    

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(mockBuild.dataValues);
  })

  // se o produto não tiver name, retorna um erro.
  it('Testa se enviar um produto sem "name" retorna o erro esperado', async() => {
    const httpRequestBody = productMock.noNameProductBody;

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({message: '"name" is required'});
  });
  
  // se o produto não tiver price, retorna um erro.
  it('Testa se enviar um produto sem "price" retorna o erro esperado', async() => {
    const httpRequestBody = productMock.noPriceProductBody;
    
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
    
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({message: '"price" is required'});
  });
  
  // se o produto não tiver orderId, retorna um erro.
  it('Testa se enviar um produto sem "orderId" retorna o erro esperado', async() => {
    const httpRequestBody = productMock.noOrderIdProductBody;

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
    

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({message: '"orderId" is required'});
  });

  it('Testa se enviar um produto com "id" incluso, retorna o erro esperado', async() => {
    const httpRequestBody = productMock.productBodyWithID;

    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);

    expect(httpResponse.status).to.equal(500);
    expect(httpResponse.body).to.be.deep.equal({error: "Erro interno do servidor"});
  });
});
