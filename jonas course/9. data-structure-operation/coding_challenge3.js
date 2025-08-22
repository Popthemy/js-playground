'use strict';

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);


// 1.
// const eventLog 
gameEvents.delete(64);
// console.log(gameEvents);

for (const [i, el] of gameEvents ){
  // console.log(`${i < 45 ? '[FIRST HALF}': '[SECOND HALF]'} ${i}: ${el}` );
};

const events = [...new Set(gameEvents.values())];

// console.log([...events]);
 


// strings

const airline = 'GoodNews Air';
const plane = "Boeing30";

// console.log(airline[9])
// console.log(plane.length)

// getting the first and last occurence and it is case sensitive
// console.log(airline.indexOf('o'))
// console.log(airline.lastIndexOf('o'))  
// console.log(airline.indexOf('Air'))

// console.log(airline.slice(4)); // using start and the end will be the length of the string
// console.log(airline.slice(4,7)); // using start and end 


// change case
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

const passengerName = 'oyINdaMola';
console.log(passengerName[0].toUpperCase() + passengerName.slice(1).toLowerCase());

const announcement = 'All passengers come to boarding door 23. Boarding door 23!'
// console.log(announcement.replaceAll('door', 'gate'));

// string operator that returns boolean
// console.log(airline.includes('z'));
// console.log(airline.startsWith('G'));

const checkBaggage = function (items){
  const baggage = items.toLowerCase(); // best practice to convert to lowercase
  if (baggage.includes('knife') || baggage.includes('gun')){
    console.log('Not allowed');
  } else {
    console.log('Welcome abroad');
  }
};
// checkBaggage('socks and Gun');
// checkBaggage('Buns and gums');

// split mtd
const fullName = 'Themy Olla'.split(' ');
const [firstName, lastName] = fullName;
// console.log(firstName, lastName);

// join word together
// console.log(['Mr.', firstName, lastName].join(' '));

// padStart and padEnd

const maskCreditCard = function(number){
  const strNumber = (number + '').slice(-4)
  console.log(strNumber.padEnd('12','*'));
  console.log(strNumber.padStart('12','*'));
};

maskCreditCard(574920109382);

// repeat to create a long string
console.log('Bad Weather...  All departure... '.repeat(10));
