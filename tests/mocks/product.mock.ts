const noNameProductBody = {
  price: '10',
  orderId: 1,
}

const noPriceProductBody = {
  name: 'Produto de Teste',  
  orderId: 1,
}

const noOrderIdProductBody = {
  name: 'Produto de Teste',
  price: '10',
}

const productBodyWithID = {
  id: 2,
  name: 'Martelo de Thor',
  price: '30 peças de ouro',
  orderId: 4,
};

const validProductBody = {   
  name: 'Produto de Teste',
  price: '10',
  orderId: 1,
}

const mockProducts = [
  {
    id: 6,
    name: 'Produto de Teste',
    price: '10 moedas',
    orderId: 1,
  },
  {
    id: 7,
    name: 'Produto de Teste 2',
    price: '20 moedas',
    orderId: 2,
  },
];

export default {
  validProductBody,
  noNameProductBody,
  noPriceProductBody,
  noOrderIdProductBody,
  productBodyWithID,
  mockProducts,
}