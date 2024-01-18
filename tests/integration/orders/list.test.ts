import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import OrderModel from '../../../src/database/models/order.model'
import services from '../../../src/services/orders.services'
import app from '../../../src/app'

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  
  it('Testa se retorna todos os pedidos corretamente', async() => {
    const orders = [
      {
        id: 1,
        userId: 1,
        productIds: [
          2,
          1
        ]
      },
      {
        id: 2,
        userId: 3,
        productIds: [
          4,
          3
        ]
      },
    ];

    const mockBuild = OrderModel.bulkBuild(orders);

    sinon.stub(OrderModel, 'findAll').resolves(mockBuild);

    sinon.stub(services, 'getOrders').resolves({status: 'SUCCESSFUL', data: orders});

    const httpResponse = await chai.request(app).get('/orders')

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(orders);
  })
});
