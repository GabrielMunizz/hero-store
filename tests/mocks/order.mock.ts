const validOrders = [
   {
     id: 1,
     productIds: [
       2,
       1
     ],
     userId: 1,
   },
   {
     id: 2,
     productIds: [
       4,
       3
     ],
     userId: 3,
   },
   {
     id: 3,
     productIds: [
       5,
     ],
     userId: 2,     
   }
  ]

  const rawOrdersMock = [
    {
      id: 2,
      userId: 3,
      productIds: [{id: 1}, {id: 2}]
    },
    {
      id: 3,
      userId: 2,
      productIds: [{id: 3}, {id: 1}]
    }
  ]

export default {
  validOrders,
  rawOrdersMock
};