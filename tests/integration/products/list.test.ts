import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import service from '../../../src/services/products.services'
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Testa se retorna todos os produtos corretamente', async() => {
    const products = [
      {
        id: 6,
        name: 'Produto de Teste',
        price: '10 moedas',
        orderId: 1,
      },
      {
        id: 7,
        name: 'Produto de Teste 2',
        price: '20 moedas',
        orderId: 2,
      },
    ];

    const mockBuild = ProductModel.bulkBuild(products);

    sinon.stub(ProductModel, 'findAll').resolves(mockBuild);

    sinon.stub(service, 'getProducts').resolves({status: 'SUCCESSFUL', data: mockBuild});

    const httpResponse = await chai.request(app).get('/products')

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(products);    
  })
});
