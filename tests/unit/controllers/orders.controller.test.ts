import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderController from '../../../src/controllers/order.controller';
import orderServices, { FormattedOrder } from '../../../src/services/order.services';
import orderMock from '../../mocks/order.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Ao usar o orderController, deve ter o comportamento esperado', async () => {
    const serviceResponse: ServiceResponse<FormattedOrder[]> = {
      status: 'SUCCESSFUL',
      data: orderMock.validOrders,
    };

    sinon.stub(orderServices, 'getAllOrders').resolves(serviceResponse);

    await orderController.getOrders(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(orderMock.validOrders);
  })

});
