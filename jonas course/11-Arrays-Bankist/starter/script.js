'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// -- begins building bankist app

const displayMovements = function (movement) {
  // set the element in the movement container to empty the default data
  containerMovements.innerHTML = '';

  movement.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // tag to be inserted
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// most of the string method applies to an arr also e.g reverse, slice, splice,
/* 
const arr = ['a','b','c', 'd', 'e'];
const arr2 = ['k','j','i','h','g', 'f'];

// console.log(arr2.reverse()) // affect our mutate our real array
console.log(arr.concat(arr2));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// using for each method that loop through a iterable
// the continue and break statement doesn't operate here
// the forEach loop also pass the index and the arr we are looping over int the order: element, index, array

movements.forEach(function(movement,index){
  if (movement > 0){
    console.log(`Movement ${index +1} You deposited \$ ${movement}`);
  } else{
    console.log(`Movement ${index + 1} You withdraw \$ ${Math.abs(movement)}`);
  };
})


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, Map){
  console.log(`${key}: ${value}`);
})

console.log('---FOR EACH ON SET ---')
const uniqueCurrencies = new Set(['USD', 'EUR', 'USD','YEN', 'CHF']);

// set doesn't  have index or key so we can neglect it value. 
uniqueCurrencies.forEach(function(value, _, set){
  console.log(`${value}: ${value}`);
});
*/

// ----- coding challenge 1

const checkDogs = function (dogsJulia, dogsKate) {
  const dogList = dogsJulia.concat(dogsKate);
  dogList.forEach(function (age, index) {
    const adultOrPuppy = age >= 3 ? 'an adult' : 'still a puppy';

    console.log(
      `Dog number ${index + 1} is ${adultOrPuppy} and is ${age} years old`
    );
  });
};

const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

const julia1Copy = julia1.slice(1, 3);
checkDogs(julia1Copy, kate1);
