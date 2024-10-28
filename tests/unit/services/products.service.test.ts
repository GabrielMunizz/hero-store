import { expect } from 'chai';
import sinon from 'sinon';
import productServices from '../../../src/services/products.services';
import productMock from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';

describe('Testes dos casos de sucesso do productsService', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('Ao usar a função getAllProducts, deve retornar status "SUCCESSFUL" e uma lista de produtos', async () => {
    const mockBuild = ProductModel.bulkBuild(productMock.validProductList);   
    
    sinon.stub(ProductModel, 'findAll').resolves(mockBuild);

    const serviceReponse = await productServices.getAllProducts();

    expect(serviceReponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceReponse.data).to.be.deep.equal(mockBuild);
  }
)
  it('Ao usar a função addProduct, deve retornar status "CREATED" e o produto adicionado', async () => {
    const mockBuild = ProductModel.build(productMock.validProduct);

    sinon.stub(ProductModel, 'create').resolves(mockBuild);

    const serviceResponse = await productServices.addProducts(productMock.validProduct);

    expect(serviceResponse.status).to.be.equal('CREATED');
    expect(serviceResponse.data).to.be.deep.equal(mockBuild);
  })

  it('Ao usar a função findProductById, deve retornar status "SUCCESSFUL" e o produto encontrado', async () => {
    const mockProduct = {id: 1, ...productMock.validProduct}

    const mockBuild = ProductModel.build(mockProduct);   

    sinon.stub(ProductModel, 'findByPk').resolves(mockBuild);

    const serviceReponse = await productServices.findProductById(1);

    expect(serviceReponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceReponse.data).to.be.deep.equal(mockBuild);

  })

  it('Ao usar a função updateProduct, deve retornar o status "SUCCESSFUL" e o produto atualizado', async () => {
    
    const mockUpdatedProduct = {id: 1, name: 'Balestra de Van Helsing', price: '15 peças de ouro', orderId: 2}   

    sinon.stub(ProductModel, 'update').resolves([1]);
    
    const updatedServiceResponse= await productServices.updateProduct(mockUpdatedProduct);

    expect(updatedServiceResponse.status).to.be.equal('SUCCESSFUL');
    expect(updatedServiceResponse.data).to.be.deep.equal({ message: 'product updated!' });
  })

  it('Ao usar a função deleteProduct, deve retornar o status "NO_CONTENT".', async () => {  

    sinon.stub(ProductModel, 'destroy').resolves(1);
    
    const updatedServiceResponse= await productServices.deleteProduct(1);

    expect(updatedServiceResponse.status).to.be.equal('NO_CONTENT');   
  })
});

describe('Testes dos casos de falhas do productsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Ao usar a função findProductById, deve retornar status "NOT_FOUND" e uma mensagem', async () => {
    
    sinon.stub(ProductModel, 'findByPk').resolves(null);

    const serviceResponse = await productServices.findProductById(10);

    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({message: 'product not found'});
  });

  it('Ao usar a função updateProduct, deve retornar status "NOT_FOUND" e uma mensagem', async () => {
    const mockUpdatedProduct = {id: 10, name: 'Balestra de Van Helsing', price: '15 peças de ouro', orderId: 2}

    sinon.stub(ProductModel, 'update').resolves([0]);

    const serviceResponse = await productServices.updateProduct(mockUpdatedProduct);

    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({message: 'product not found'});
  });

  it('Ao usar a função deleteProduct, deve retornar status "NOT_FOUND" e uma mensagem', async () => {
    const mockId = 10;

    sinon.stub(ProductModel, 'destroy').resolves(0);

    const serviceResponse = await productServices.deleteProduct(mockId);

    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data).to.be.deep.equal({message: 'product not found'});
  });
});