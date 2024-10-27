import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productMock from '../../mocks/product.mock';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Ao fazer uma requisição get para /products deve voltar uma lista de produtos', async() => {
    const httpRequestBody = productMock.validProductList;

    const mockGetProducts = ProductModel.bulkBuild(httpRequestBody);
    sinon.stub(ProductModel, 'findAll').resolves(mockGetProducts);

    const httpResponse = await chai.request(app).get('/products');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(httpRequestBody);
  })

});
