'use strict';

// Default paramters values for function

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
