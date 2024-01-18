export type Order = {
  id: number;
  userId: number;
  productId?: number;
};

export type FormattedOrders = 
  {
    id: number;
    userId: number;
    productIds: [
      {
        id: number
      },
    ] | number[]
  };
