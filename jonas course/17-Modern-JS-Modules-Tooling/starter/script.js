// importing module

console.log('Importing module');
// import { addToCart , totalPrice as price, qt} from "./shoppingCart.js";

// console.log(addToCart('Cola', 7))
// console.log(price, qt)

// import * as ShoppingCart from './shoppingCart.js'

// console.log(ShoppingCart.addToCart('cola', 7));
// console.log(ShoppingCart.totalPrice, ShoppingCart.qt);

import add from './shoppingCart.js';
console.log(add('Cola', 7));

// const products = fetch('https://blakkart-backend-new.onrender.com/api/v1/products/');
// console.log(products);
// products.then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.error('Error fetching products:', err));

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

// const getlastPost = async function(){
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   const lastPost = data.at(-1)
//   return {title:lastPost.title, text:lastPost.body}
// }

// console.log(await getlastPost())

// how module work before ES6 : it uses IIFE and with closure(a function have access to variable present at his birth)
const ShoppingCart2 = (function () {
  const totalQuantity = 23;
  const totalPrice = 237;
  const shippingCost = 10;
  const cart = [];

  const addToCart = (product, quantity) => {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to the cart with shipping cost:${shippingCost}`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from the supplier`);
  };
  // function or variable to be export will be return
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('cola', 7);
ShoppingCart2.addToCart('pizza', 5);
