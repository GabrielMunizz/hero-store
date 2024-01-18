import { expect } from 'chai';
import sinon from 'sinon';
import productMock from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';
import service from '../../../src/services/products.services'

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Testa se createProduct cria um produto corretamente', async() => {
    const mockProductReq = productMock.validProductBody;
    const mockCreatedProd = productMock.productBodyWithID;

    const mockBuild = ProductModel.build(mockCreatedProd)

    sinon.stub(ProductModel, 'create').resolves(mockBuild);

    const response = await service.createProduct(mockProductReq);

    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(mockBuild);
  })

  it('Testa se getProducts retorna todos os produtos corretamente', async() => {
    const products = productMock.mockProducts;

    const mockBuild = ProductModel.bulkBuild(products)

    sinon.stub(ProductModel, 'findAll').resolves(mockBuild);

    const response = await service.getProducts();

    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(mockBuild);
  })
});
