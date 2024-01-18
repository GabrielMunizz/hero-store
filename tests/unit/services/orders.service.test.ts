import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ordersServices from '../../../src/services/orders.services';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testa se getServices retorna o resultado esperado', async() => {

    const findAllStub = sinon.stub(OrderModel, 'findAll');

    const mockOrders = [
      {
        id: 1,
        userId: 1,
        productIds: [
           2 ,
           1,
        ],
      },
      {
        id: 2,
        userId: 3,
        productIds: [
          4,
          3,
        ],
      },
    ]

    const mockBuild = OrderModel.bulkBuild(mockOrders);

    findAllStub.resolves(mockBuild);

    const result = await ordersServices.getOrders();

    sinon.assert.calledOnce(findAllStub);

    expect(result.status).to.equal('SUCCESSFUL'); 
  })

});
