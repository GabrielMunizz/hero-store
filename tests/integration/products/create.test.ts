import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models'
import { createProductController } from '../../../src/database/controllers/products.controllers'
import {Request, Response} from 'express'

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Testa se é possível criar um produto corretamente', async() => {
    const mock = sinon.stub(ProductModel, "createSchema").resolves({
      id: 1,
      name: 'Produto de Teste',
      price: '10',
      orderId: 1,
    })

    const req = { body: { name: 'Produto de Teste', price: '10', orderId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    }
    
    await createProductController(req, res)
  })
});
