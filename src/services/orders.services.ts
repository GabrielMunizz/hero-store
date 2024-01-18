import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { FormattedOrders } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

const orders = {
  include: {
    model: ProductModel, 
    as: 'productIds',   
    attributes: ['id'],    
  },
};

const getOrders = async (): Promise<ServiceResponse<FormattedOrders[]>> => {
  const findOrders = await OrderModel.findAll(orders);

  const mappedOrders = findOrders.map((order) => {
    const mappedOrder = order.toJSON() as unknown as FormattedOrders;
    
    mappedOrder.productIds = (mappedOrder.productIds || []).map((product) =>
      (typeof product === 'object' ? product.id : product));

    return mappedOrder;
  });
  console.log(mappedOrders);
  
  const responseService: ServiceResponse<FormattedOrders[]> = {
    status: 'SUCCESSFUL',
    data: mappedOrders,
  };
    
  return responseService;
};

export default {
  getOrders,
};