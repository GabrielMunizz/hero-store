import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { Order } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';

type RawOrder = Omit<Order, 'productIds'> & { productIds: { id: number }[] };
export type FormattedOrder = Omit<RawOrder, 'productIds'> & { productIds: number[] };

const formatOrders = (orders: RawOrder[]): FormattedOrder[] => orders.map((order) => {
  const formatOrder = {
    id: order.id,
    userId: order.userId,
    productIds: order.productIds.map((productObject) => productObject.id),
  };
  return formatOrder;
});

const getAllOrders = async (): Promise<ServiceResponse<FormattedOrder[]>> => {
  const getOrders = await OrderModel.findAll({
    include: [{ model: ProductModel, as: 'productIds', attributes: ['id'] }],
    attributes: ['id', 'userId'],
  });
  const rawOrders: RawOrder[] = getOrders.map((order) => order.toJSON());
  
  const formattedOrders = formatOrders(rawOrders);

  return { status: 'SUCCESSFUL', data: formattedOrders };
};

export default {
  getAllOrders,
  formatOrders,
};