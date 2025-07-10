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

const calcDisplayBalance = function (user) {
  user.balance = user.movements.reduce(function (acc, movement) {
    return acc + movement;
  }, 0);
  labelBalance.textContent = `${user.balance}€`;
};

// calcDisplayBalance(acc1Movement);

const calcDisplaySummary = function (user) {
  const movements = user.movements;
  const incomes = movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => acc + movement, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter(movement => movement < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * user.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
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
// console.log(accounts);

let currentAccount;

const displayUIMessage = user => {
  labelWelcome.textContent = `Welcome back, ${user?.owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;

  // clear the user details username and password
  inputLoginPin.value = inputLoginUsername.value = '';
  // make the cursor to loose focus
  inputLoginPin.blur();
};

const updateUI = function (user) {
  // display movement
  displayMovements(user.movements);
  // display balance
  calcDisplayBalance(user);
  // display summary
  calcDisplaySummary(user);
};

const successLogin = function (user) {
  // display ui and message
  displayUIMessage(user);

  updateUI(user);
};

const loginUser = function (accs) {
  const username = inputLoginUsername.value;
  const pin = inputLoginPin.value;

  currentAccount = accs.find(acc => acc.username === username);
  // optional chaining so when user doesn't exist it doesn't throw an error
  // console.log(currentAccount);

  return currentAccount?.pin === Number(pin)
    ? successLogin(currentAccount)
    : 'incorrect details';
};

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();
  // console.log('submitted');
  loginUser(accounts);
});

const delAccount = function (user) {
  const index = accounts.findIndex(acc => acc.owner === user?.owner);
  console.log(`log out account accountNUmber:`, accounts[index]);
  accounts.splice(index, 1);
  console.log(`account after logout:`, accounts);

  containerApp.style.opacity = 0;
  inputClosePin.value = inputCloseUsername.value = '';
};

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const pin = inputClosePin.value;
  const username = inputCloseUsername.value;
  if (
    currentAccount.username === username &&
    currentAccount.pin === Number(pin)
  ) {
    delAccount(currentAccount);
    console.log('valid user');
  }
});

const borrowLoan = function (user) {
  const amount = Number(inputLoanAmount.value);
  const passRule = user.movements.some(
    movement => movement >= amount > 0 && amount * 0.1
  );
  if (passRule) {
    user.movements.push(amount);
    updateUI(user);
    alert('Loan Successful');
  } else {
    alert('Insufficient credit worthiness');
  }
  inputLoanAmount.value = '';
};

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  borrowLoan(currentAccount);
});

const transferMoney = function (user) {
  const amount = Number(inputTransferAmount.value);
  const username = inputTransferTo.value;
  const receiverAcc = accounts.find(acc => acc.username === username);

  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    user.balance >= amount &&
    receiverAcc?.username !== user.username
  ) {
    receiverAcc.movements.push(amount);
    user.movements.push(-amount);
    updateUI(user);
    console.log(`transfer success`);
  } else {
    console.log('Invalid transfer');
  }
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  transferMoney(currentAccount);
});

let sorted = false;
const sortMovements = function (user) {
  console.log(user.movements);
  if (sorted) {
    user.movements.sort((a, b) => a - b);
  } else {
    user.movements.sort((a, b) => b - a);
  }
  sorted = sorted === true ? false : true;
  console.log(user.movements);
  updateUI(user);
};

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortMovements(currentAccount);
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


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUSD = 1.1;

const totalDepositsUSD = movements
  .filter(movement => movement > 0)
  .map(movement => movement * eurToUSD, 0)
  .reduce((acc, movement) => acc + movement);
console.log(totalDepositsUSD);


// prev implementation
// const calAverageHumanAge =function (ages){
//   const humanAges = ages.map(function(age){
//     return age <= 2 ? 2 * age : 16 + age * 4;
//   });
//   console.log(humanAges);
//   const adultHuman = humanAges.filter((age)=> age > 18);

//   const average = adultHuman.reduce((acc,cur,i, arr)=>acc+ cur/arr.length , 0);
//   return average;
//   // const ageTotal = adultHuman.reduce((acc,cur)=>acc+cur , 0);
//   // return ageTotal/adultHuman.length;
// }

const dogAges = [5, 2, 4, 1, 15, 8, 3];

// implementation using chaining method
const rwCalAverageHumanAge = dogAges
  .map(age => age <= 2 ? 2 * age : 16 + age * 4)
  .filter(age => age > 18)
  .reduce((acc,age,i,arr) => acc + age/arr.length, 0 );

console.log(rwCalAverageHumanAge);


// some return true if any value matches the condition it an extension of the includes

const dogAges = [5, 2, 4, 1, 15, 0, 3];

const gt12 = dogAges.some(age => age > 12);
console.log(gt12);

// Every : checks if all element are true like the and method
// since all value is not less than 0 we get false
const everyCondition = age => age < 0;
const allPositive = dogAges.every(everyCondition);
console.log(allPositive);


// sorting method. it works perfectly  on strings. it mutate the orginal array
const names = ['themy', 'olla', 'ore', 'oab', 'babalola', 'bintu'];
names.sort();
// console.log(names);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// movements.sort(); // doesn't do a  very good work on number by default

// to sort numbers in ascending order 
// the idea for comparing A > B is they element in the arr (anyone) when A > B 
// their subtraction result in a positive number meaning A will be sorted before B and vice versa

// movements.sort((A, B)=>{
//   if (A > B){
//     return 1
//   } else{
//     return -1
//   }
// })
movements.sort((A, B)=> A - B);
console.log('Ascending Order')
console.log(movements);

// to sort in descending order
console.log('Descending Order');
// movements.sort((A, B)=>{
//   if (A > B){
//     return -1
//   } else{
//     return 1
//   }
// })
movements.sort((A, B)=> B - A)
console.log(movements);


// using array to create an array of a certain length and fill to include element
// when we create an array with only the length the only operation we can perform is fill

const x = new Array(5);
console.log(x);
// console.log(x.fill(1)); // fill the whole cell
console.log(x.fill(1,2,4)); // works like slice fill 1 starting from index 2 to 4 

const y = Array.from({length:7}, () => 1);
console.log(y);

const z = Array.from({length:7}, (_,i) => i + 1);
console.log(z);


// we can create array from method e.g getting all movement from the UI
labelBalance.addEventListener('click',function(){
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'), // obejct to create array from
    el=> Number(el.textContent.replace('€','')) // map method
  )
  console.log(movementUI);
  
  const movementUI2 = [...document.querySelectorAll('.movements__value')]
  console.log(movementUI2);
})


// flat method : when we have array of array with different level of nesting we can convert to a single array

const arr = [1, [2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // give arr of 1-8 there is present value of 1 for the depth

const arr2 = [1, [2, [3]], [4, [5, 6]], 7, 8];
console.log(arr.flat(2)); // give arr of 1-8 ins a single array because of the depth specified

// flat you can specify depth 1,2,3,4 as argument to flat()
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, movement) => acc + movement, 0);
console.log(overallBalance);

//flatmap : you can't specify depth, it set as 1
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, movement) => acc + movement, 0);
console.log(overallBalance2);


const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
    sum[cur > 0 ? 'deposit' : 'withdrawal'] += cur;
    // cur > 0 ? (sum.deposit += cur) : (sum.withdrawal += cur);
    return sum
  }, {deposit:0, withdrawal:0});

console.log(sums);
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 340, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// const recommendedFood = function () {
//   return ;
// };

const eatingRate = function () {
  const upperBound = 1.1 * this.recommendedFood();
  const lowerBound = 0.9 * this.recommendedFood();

  console.log(upperBound, lowerBound, this.recommendedFood(), this.curFood);

  if (this.curFood > upperBound) {
    return 'Too much';
  } else if (this.curFood < lowerBound) {
    return 'Too little';
  } else {
    return 'Normal';
  }
};

// 1: recommended portion
dogs.forEach(dog => (dog.recommendedFood = function () { 
  return Math.trunc(this.weight ** 0.75 * 28)}));
// console.log(dogs);

// 2:
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahDog);
const sarahDogEatingRate = eatingRate.bind(sarahDog);
// console.log(sarahDogEatingRate());
// console.log(dogs);

//3: too much , too little
const DogsFoodRate = dogs.reduce(
  (acc, dog) => {
    dog.eatingRate = eatingRate.bind(dog);
    console.log(dog.eatingRate());

    if (dog.eatingRate() == 'Too little') {
      acc.little.push(dog);
    } else if (dog.eatingRate() === 'Too much') {
      acc.tooMuch.push(dog);
    }
    return acc;
  },
  { tooMuch: [], little: [] }
);

// console.log(DogsFoodRate);
// 4: log string to the console for dogs in number 3
DogsFoodRate.tooMuch.forEach(dog => {
  console.log(
    `${
      dog.owners.length > 1 ? dog.owners.join(' and ') : dog.owners[0]
    }'s dogs eats too much!`
  );
});

DogsFoodRate.little.forEach(dog => {
  console.log(
    `${
      dog.owners.length > 1 ? dog.owners.join(' and ') : dog.owners[0]
    }'s dogs eats too little!`
  );
});



// console.log(normalFeedingDog);

// 5 any dog eat exact amount
console.log(dogs.some(dog =>{
  console.log(dog.curFood, dog.recommendedFood());
  dog.curFood === dog.recommendedFood()}));

// 6 : get if any dog eat normal ration
const abnormalFeedingDog = [...DogsFoodRate.little, ...DogsFoodRate.tooMuch];
// console.log(abnormalFeedingDog);

const normalFeedingDog = dogs.find(dog => {
  return !abnormalFeedingDog.includes(dog);
});

console.log(`${
    normalFeedingDog.owners.length > 1 ? normalFeedingDog.owners.join(' and ') : normalFeedingDog.owners[0]
  }'s dogs eat normal!`
);

// 8
console.log(dogs);
const sortedDog = dogs
  .slice()
  .sort((a, b) => a.recommendedFood() - b.recommendedFood());
console.log(sortedDog);

