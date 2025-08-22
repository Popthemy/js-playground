// exporting module
console.log('Exporting Module');

const shippingCost = 10;
const totalQuantity = 20;
const totalPrice = 1000;
const cart = [];

// named export
export const addToCart = function (product, quantity) {
  cart.push({ product: product, quantity: quantity });
  console.log(`${product} with ${quantity} have been added to cart`);
  return;
};

// multiple export
export { totalPrice, totalQuantity as qt };

// default export no name
export default function (product, quantity) {
  cart.push({ product: product, quantity: quantity });
  console.log(`${product} with ${quantity} have been added to cart`);
  return;
}

// await is code blocking
// console.log('Getting user');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('User fetched');

