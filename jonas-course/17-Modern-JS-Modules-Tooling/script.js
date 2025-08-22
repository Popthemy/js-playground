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
console.log(add('apple', 7));
console.log(add('pizza', 7));

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
ShoppingCart2.addToCart('cola', 7);
ShoppingCart2.addToCart('pizza', 5);
console.log(ShoppingCart2.cart);

if (module.hot) {
  // hot module replacement
  // only parcel understand this : when we change anything in out
  // module parcel will update  our dist automatically
  // without reload of the page
  module.hot.accept();
}

class Person{
  #greeting = 'Hey👋'
  constructor(name){
    this.name = name;
    console.log(`${this.#greeting} ${this.name} `)
  }
}

const themy = new Person('Themy');

const names = ['Ade', 'Bola', 'Titi', 'Bisi']

console.log(...names)

Promise.resolve('I am doing polifiling').then(res=> console.log(res))

// instll each before installing them
// import all the polyfill for all even if not used

// import 'core-js/stable'
// import 'core-js/promise/array/find' // polyfill for find alone
// import 'core-js/promise/array' // polyfill for promise
import 'regenerator-runtime/runtime' // polyfill for async await