import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productMock from '../../mocks/product.mock';
import productsServices from '../../../src/services/products.services';
import ProductModel, { ProductSequelizeModel } from '../../../src/database/models/product.model';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import productController from '../../../src/controllers/product.controller';

chai.use(sinonChai);

describe('Testes do productController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Ao usar a função getProducts, deve retornar status 200 e a lista de produtos', async() => {

    const mockBuild = ProductModel.bulkBuild(productMock.validProductList);
    const mockServiceResponse: ServiceResponse<ProductSequelizeModel[]> = {
      status: 'SUCCESSFUL',
      data: mockBuild,
    };

    sinon.stub(productsServices, 'getAllProducts').resolves(mockServiceResponse);

    await productController.getAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponse.data);
  });

  it('Ao usar a função addProducts, deve retornar status 201 e o produto criado', async() => {
    const mockBuild = ProductModel.build(productMock.validProduct);
    const mockServiceResponse: ServiceResponse<ProductSequelizeModel> = {
      status: 'CREATED',
      data: mockBuild,
    };

    sinon.stub(productsServices, 'addProducts').resolves(mockServiceResponse);

    await productController.addProducts(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockServiceResponse.data);
  });
  
  it('Ao usar a função findProductById, deve retornar status 200 e o produto encontrado', async() => {
    const mockBuild = ProductModel.build({id: 1, ...productMock.validProduct});
    const mockServiceResponse: ServiceResponse<ProductSequelizeModel> = {
      status: 'SUCCESSFUL',
      data: mockBuild,
    };

    req.params = {id: '1'};

    sinon.stub(productsServices, 'findProductById').resolves(mockServiceResponse);

    await productController.findProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponse.data);
  });
  
  it('Ao usar a função updateProduct, deve retornar status 200 e o produto encontrado', async() => {
    const mockBuild = ProductModel.build({id: 1, ...productMock.validProduct});
    const mockServiceResponse: ServiceResponse<{message: string}> = {
      status: 'SUCCESSFUL',
      data: {message: 'product updated!'},
    };

    sinon.stub(productsServices, 'updateProduct').resolves(mockServiceResponse);

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockServiceResponse.data);
  });
  
  it('Ao usar a função deleteProduct, deve retornar status 204', async() => {    
    const mockServiceResponse: ServiceResponse<{message: string}> = {
      status: 'NO_CONTENT',
      data: {message: 'Product removed!'},
    };

    req.params = {id: '1'};

    sinon.stub(productsServices, 'deleteProduct').resolves(mockServiceResponse);
    res.send = sinon.stub().returns(res);

    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.send).to.have.been.calledOnce;    
  });
});
