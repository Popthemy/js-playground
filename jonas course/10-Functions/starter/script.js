'use strict';

// Default e values for function

/* 
const bookings = [];

const createBooking = function (
  flightNum = undefined,
  numPassenger = 1,
  price = 199 * numPassenger
) {
  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LHS345');
// to skip arguments
createBooking('LHS345', undefined, 300);

const flight = 'LH342';
const themy = {
  name: 'themy ola',
  phoneNumber: 7062264650,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH555';
  passenger.phoneNumber = '0' + passenger.phoneNumber;

  if (passenger.phoneNumber.slice(1) === '7062264650') {
    alert('Checked in');
  } else {
    alert('Wrong Passport');
  }
};
// when we change any value of a object passed to function
//  inside the function it affect the value outside the function. because of passing by value

// JS USES PASSING BY REFERENCE
// checkIn(flight, themy)
console.log(flight);
console.log(themy);

const oneWord = function (str) {
  return str.replaceAll(' ', '').toLowerCase();
};

const capitalizeSentence = function (str) {
  const [first, ...others] = str.split(' ');
  return [first[0].toUpperCase() + first.slice(1), ...others].join(' ');
};

const transformWord = function (str, fn) {
  console.log(`transformed new word: ${fn(str)} by ${fn.name}`);
};

transformWord('JavaScript is a Programming Language', oneWord);
transformWord('JavaScript is a Programming Language', capitalizeSentence);

// function returning function using closure under the hood

const greet = greeting => name => console.log(`${greeting}, ${name}`);

const greeter = greet('hi');
greeter('bola');
// another way of calling it
greet('hello')('themy');

const lufthansa = {
  airline: 'lufthansa',
  iatacode: 'LH',
  bookings: [],
  // this is a property written with enhance object literal
  book(flightNumber, name) {
    this.bookings.push({ flight: `${this.iatacode} ${flightNumber}`, name });
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNumber}`
    );
  },
};

lufthansa.book(236, 'themy olla');
console.log(lufthansa);

const easyJet = {
  airline: 'Easy Jet',
  iatacode: 'EJ',
  bookings: [],
};
console.log(easyJet);

const book = lufthansa.book;
// easyJet.book = book; // instead of this we can set the method manually

// call method to set the this keyword
book.call(easyJet, 777, 'Ali Muhammed');

// apply method to set the this keyword
book.apply(easyJet, [777, 'Boby Tyson']);

// instead of the apply method we can use the spread operator with call
book.call(easyJet, ...[777, 'Boby Tyson']);

// using bind method creates a new copy of the method
const bookEJ = book.bind(easyJet);
bookEJ(43, 'Bummi Akorede');
bookEJ(43, 'Remi Williams');

// applying partial application  e.g for all flight 20 register a team
const bookLT20 = book.bind(lufthansa, 20);
bookLT20('Olusegun Obasanj');
bookLT20('Olusegun Bola');
bookLT20('Olusegun Tunde');
bookLT20('Olusegun Elizabeth');

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this.planes);
  this.planes++;
  console.log(`New planes is added to our fleet ${this.planes}`);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));


// partial application with bind
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 300));

// to apply a default value we can use bind to set the default rate,  set the object position to null
const addVAT = addTax.bind(null, 0.33);

console.log(addVAT(400));
console.log(addVAT(50));

const newAddTax = (rate, value) => () => {
  rate = 0.33;
  return value + value * rate;
}
console.log(newAddTax(0.1, 400)());

const poll = {
  question: 'What is your favourite programming language?',
  option: ['0: Javascript', '1: python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  displayResult(type){
    if (type === 'array'){
      console.log(this.answers);
    }else if (type === 'string') {
      console.log(this.join(','))
    }},
};

const registerNewAnswer = function () {
  const answer = Number(prompt(`${poll.question} \n ${poll.option.join('\n')}\n(write option number) `));
  
  console.log(poll);
  answer >= 0 && answer <= 3 ? poll.answers[answer]++ : console.log('option is not in bound 0-3'); 
  console.log(poll);

  const resultType = prompt('Choose result representation: Array or String').toLowerCase();
  poll.displayResult(resultType);
};

document.querySelector('.poll').addEventListener('click', registerNewAnswer);


// const poll = {
//   question: 'What is your favourite programming language?',
//   option: ['0: Javascript', '1: python', '2: Rust', '3: C++'],
//   answers: new Array(4).fill(0),
//   displayResult(type=array) {
//     if (type === 'string') {
//       console.log(this.join(','));
//     } else{
//       console.log(this.answers);
//     }
//   },
// };

const testData = {
  answers: [5, 2, 3],
};
const testData2 = {
  answers: [5, 2,4,5,6, 3],
};


const resultFunc = poll.displayResult.bind(testData);
resultFunc('array');

const resultFunc2 = poll.displayResult.bind(testData2);
resultFunc2('array');

// immediately invoked function expression: this are function 
// that only execute once and disappear after their execution.

(function(){
  console.log('I am the first function to run once');
})();

(() => console.log('second example of IIFE using arrow function'))();

// Closure: it an internal representation that give a function access to 
// variable of the parent function even after the function has returned 
// you can view the closure using console.dir(func_name)

const secureBooking = function(){
  let passenger = 0;

  return function(){
    passenger++;
    console.log(passenger);
  }
};
const booker = secureBooking()
booker()
booker()
console.dir(booker) // check the closure for the variable

// closure doesn't happen only when a function is returned

const boardPassenger = function (n, wait) {
  const perGroup = n/3;

  // the setTimeout is a function that take a function handler and time 
  setTimeout( 
    function (){
      console.log( `We are now boarding all ${n} passengers`);
      console.log(`There are 3 groups, each with ${perGroup} pasengers`);
    }
    , wait * 60)
  console.log(`We start boarding in ${wait} seconds`);
}

boardPassenger(180,3);
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  header.addEventListener('click',function (){
    header.style.color = 'blue';
    console.log('Thank you i just got activated')
  });}
)()