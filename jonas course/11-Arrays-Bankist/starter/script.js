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
const acc1Movement = account1.movements;
// displayMovements(acc1Movement);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, movement) {
    return acc + movement;
  }, 0);
  labelBalance.textContent = `${balance}$`;
};

// calcDisplayBalance(acc1Movement);

const calcDisplaySummary = function (user) {
  const movements = user.movements;
  const incomes = movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);
  labelSumIn.textContent = `${incomes}EUR`;

  const out = movements
    .filter(movement => movement < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}EUR`;

  const interest = movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * user.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}$EUR`;
};

const usernameDisplay = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(cur => cur[0])
      .join('');
  });
};

usernameDisplay(accounts);
console.log(accounts);

let currentAccount;

const displayUIMessage = user => {
  labelWelcome.textContent = `Welcome back, ${user?.owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;

  // clear the iser details username and password
  inputLoginPin.value = inputLoginUsername.value = '';
  // make the cursor to loose focus
  inputLoginPin.blur();
};

const successLogin = function (user) {
  // display ui and message
  displayUIMessage(user);
  // display movement
  displayMovements(user.movements);
  // display balance
  calcDisplayBalance(user.movements);
  // display summary
  calcDisplaySummary(user);
};

const loginUser = function (accs) {
  const username = inputLoginUsername.value;
  const pin = inputLoginPin.value;

  currentAccount = accs.find(acc => acc.username === username);
  // optional chaining so when user doesn't exist it doesn't throw an error
  console.log(currentAccount);
  return currentAccount?.pin === Number(pin)
    ? successLogin(currentAccount)
    : 'incorrect details';
};

// loginuser(accounts);

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();
  // console.log('submitted');
  loginUser(accounts);
});

////////////////////////////////////////////////
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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// MAP: it take a call back function and array to return a brand new array 
// as a result of working the function on each array element

const eurToUSD = 1.1;
const movementToUSD  = movements.map(function(movement){
  return movement * eurToUSD;
})

console.log(movementToUSD);

const movementDescriptions = movements.map((movement, index) =>`Movement${index +1}: You ${movement > 0 ? 'deposit' : 'withdraw'} ${Math.abs(movement)}`
)
console.log(movementDescriptions.join('\n'));


// FILTER : same as the map method but return a new array that pass the condition of the function
// the callback should return a boolean if the value pass it make it to the new array

const deposits = movements.filter(function(movement){
  return movement > 0;
})

const withdrawals = movements.filter(function(movement){
  return movement < 0;
})
console.log(deposits);
console.log(withdrawals);

// find method work similar to the filter but return the first element that satisfy the condition.
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

// REDUCE : reduce the element of an array to a single value e.g adding all element together
// reduce method takes 2 parameter : handler and initial value. The handler also takes 4 argument 
// first is the acc : sum of prev result
// second current element, third : index , fourth : the array.

// arrow function
const balance = movements.reduce( (accumulator, movement) => accumulator+ movement, 0)

// using normal function
// const balance = movements.reduce( function(accumulator, movement)
// { return accumulator +  movement;}, 0)

// use reduce to fetch the highest value
const maxMovement = movements.reduce(function(acc, movement,){
  return acc > movement ? acc : movement;
} , movements[0])

console.log(balance);
console.log(maxMovement);

// coding challenge 2
const dogs1 = [5,2,4,1,15,8,3];

const calAverageHumanAge =function (ages){
  const humanAges = ages.map(function(age){
    return age <= 2 ? 2 * age : 16 + age * 4;
  });
  console.log(humanAges);
  const adultHuman = humanAges.filter((age)=> age > 18);

  const average = adultHuman.reduce((acc,cur,i, arr)=>acc+ cur/arr.length , 0);
  return average;
  // const ageTotal = adultHuman.reduce((acc,cur)=>acc+cur , 0);
  // return ageTotal/adultHuman.length;
}

console.log(calAverageHumanAge(dogs1));
*/

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUSD = 1.1;
const totalDepospitsUSD = movements
  .filter(movement => movement > 0)
  .map(movement => movement * eurToUSD, 0)
  .reduce((acc, movement) => acc + movement);
console.log(totalDepospitsUSD);
