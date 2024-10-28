const validProductName = 'Sedenta por Sangue';
const validPrice = '18 peças de ouro';
const validOrderId = 4;

const validProduct = {
  name: validProductName,
  price: validPrice,
  orderId: validOrderId,
}

const noProductName = {  
  price: validPrice,
  orderId: validOrderId,
}

const invalidProductName = {  
  name: 0,
  price: validPrice,
  orderId: validOrderId,
}

const invalidNameLength = {
  name: 'ps',
  price: validPrice,
  orderId: validOrderId,
}

const noProductPrice = {
  name: validProductName,  
  orderId: validOrderId,
}

const invalidProductPrice = {
  name: validProductName,
  price: 0,
  orderId: validOrderId,
}

const invalidPriceLength = {
  name: validProductName,
  price: 'ps',
  orderId: validOrderId,
}

const noOrderId = {
  name: validProductName,
  price: validPrice,  
}

const validProductList = [
  {
    id: 1,
    name: 'Excalibur',
    price: '10 peças de ouro',
    orderId: 1,
  },
  {
    id: 2,
    name: 'Espada Justiceira',
    price: '20 peças de ouro',
    orderId: 1,
  },
];

export default {
  validProduct,
  validProductList,
  noProductName,
  noProductPrice,
  invalidPriceLength,
  invalidProductPrice,
  noOrderId,
  invalidNameLength,
  invalidProductName,
}