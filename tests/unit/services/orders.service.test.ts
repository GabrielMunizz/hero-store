import { expect } from 'chai';
import sinon from 'sinon';
import orderServices from '../../../src/services/order.services';
import orderMock from '../../mocks/order.mock';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('Ao passar um pedido sem formatação, a função formatOrders deve formatar o pedido corretamente', () => {
    const parameter = orderMock.rawOrdersMock;

    const formattedOrder = orderServices.formatOrders(parameter);
    

    expect(formattedOrder).to.deep.equal([
      { id: 2, userId: 3, productIds: [1, 2] },
      { id: 3, userId: 2, productIds: [3, 1] },
    ]);
  });

  it('Ao usar o orderService, deve retornar uma lista de pedidos formatada', async () => {
    const serviceResponse = await orderServices.getAllOrders();

    expect(serviceResponse.status).to.be.equal('SUCCESSFUL')
    expect(serviceResponse.data).to.be.deep.equal(orderMock.validOrders);
  })
});
