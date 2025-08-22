'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayCurrencySign = (num,locale,cur)=>{
  const options = {
    style:'currency',
    currency:cur
  }

  return new Intl.NumberFormat(locale, options).format(num);
}

const formatMovementDate = function (date, locale){
  const calcDaysPassed = (date1, date2) => 
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${daysPassed.getDay}()`.padStart(2,0);
  // const month = `${daysPassed.getMonth() + 1}()`.padStart(2,0);
  // const year = daysPassed.getMonth();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // console.log('i got here movement', formatMovementDate(acc.movementsDates[4]));

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  const localization = acc.locale;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i])

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1} ${type}</div>
          <div class="movements__date">${formatMovementDate(date, localization)}</div>
        <div class="movements__value">${displayCurrencySign(mov.toFixed(2),localization, acc.currency)}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${displayCurrencySign(acc.balance.toFixed(2),acc.locale, acc.currency)}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${displayCurrencySign(incomes.toFixed(2), acc.locale,  acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${displayCurrencySign(Math.abs(out).toFixed(2),acc.locale, acc.currency)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${displayCurrencySign(interest.toFixed(2),acc.locale,  acc.currency)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const logOutTimer = function () {

  const tick = () => {
    // set the time in the ui
    labelTimer.textContent = `${String(Math.trunc(time / 60)).padStart(2,'0'
    )}:${String(time % 60).padStart(2, '0')}`;
    // decrement our time
    if (time === 0) {
      labelWelcome.textContent = `Login to get started!`;
      containerApp.style.opacity = 0;
      clearInterval(timer); // stop the countdown
    }
    time--;
  };

  let time = 100;
  tick(); // so as to set the value timer before it start to countdown
  const timer = setInterval(tick, 1000);
  return timer; // we need to return timer so we can reset it counter
}


///////////////////////////////////////
// Event handlers
let currentAccount, timer;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


// experimenting date
const now = new Date();
const option = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'short',
};

// labelDate.textContent = new Intl.DateTimeFormat('en-US',option).format(now); // format according to US format
labelDate.textContent = new Intl.DateTimeFormat('ng-la', option).format(now); // format according to afrikans format

// getting the locale from the browser navigator
const locale = navigator.language;
labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now); // format according to afrikans format

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  const userName =inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  currentAccount = accounts.find(
    acc => acc.username === userName
  );
  console.log(currentAccount);

  if (currentAccount?.pin === pin ) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // set the date
    const now = Date.now();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
  
    // labelDate.textContent = new Intl.DateTimeFormat(
    //   currentAccount.locale,
    //   options
    // ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // update time
    if(timer) clearInterval(timer) // incase of a shared device then we won't resume at the time of the other person for the current user
    timer = logOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // during activity we want to restart the counter tracking user action
    clearInterval(timer);
    timer = logOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(()=> {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // during activity we want to restart the counter tracking user action
      clearInterval(timer);
      timer = logOutTimer();

    }, 2500) // execute the code after 2.5 second
    console.log('loan processing')
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    // during activity we want to restart the counter tracking user action
    clearInterval(timer);
    timer = logOutTimer();
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;

  // during activity we want to restart the counter tracking user action
  clearInterval(timer);
  timer = logOutTimer();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//working with numbers
/* 
console.log(Math.sqrt(25));
console.log(25 ** (1/2)); 
console.log(8 ** (1/3));
console.log(Math.min( 1,'3', 4, 6, 7, 8, 9));
console.log(Math.max(8 , 1,10,3));


console.log(Number.parseFloat('10px'));
console.log(Math.PI * Number.parseFloat('10px') ** 2); // area of a cicrle

// random number
console.log(Math.trunc(Math.random() * 6) + 1);

// random number btw min and max number
const randomInt = (min,max) => Math.floor(Math.random() * (max - min) +1) + min;

console.log(randomInt(10,20))

// rounding up : all the method does type coercion
// console.log(Math.trunc(23.333)); // remove decimal number
// console.log(Math.trunc(23.999)); // remove decimal number

console.log(Math.ceil(23.333)); // 
console.log(Math.ceil(23.999)); // 

console.log(Math.floor(23.333)); //
console.log(Math.floor(23.999)); //

console.log(Math.round(23.333)); //
console.log(Math.round(23.999)); //

console.log(Math.round(-23.333)); //
console.log(Math.floor(-23.999)); // work appropriately even with negative number

// float number: concert to the decimal number using to fixed , it convert to 
// string anf we can easily convert to number by adding `+` at the begining og th input
console.log((2.7).toFixed(0)); 
console.log((2.756).toFixed(4)); 
console.log((2.756).toFixed(2));
console.log((+2.756).toFixed(2));
console.log(typeof (2.756).toFixed(2)); // string
console.log(typeof +(2.756).toFixed(2)); // number


// remainder %

// even number when divided by 2 has no rem but odd has rem

const isEven = num => num % 2 === 0;
console.log(isEven(5));
console.log(isEven(10));


// number separator : 
console.log(123_456_789_000);// helps us to write readable number, _ are ignored during when printing out 
console.log(123_45000);// helps us to write readable number, _ are ignored during when printing out 

// adding + to a number convert to number
// const tryNum = prompt('Enter a number');
// console.log(typeof +alert)

// to create big int , number larger than 2**53-1, this is the Number.MAX_SAFE_INTEGER
// to concert to bigint add n or use the bigInt()
console.log(2 **53-1);
console.log(9007199254740991567n); // convert to big int using n suffix
console.log(BigInt(9007199254740991567)); // convert using bigInt
console.log(900719925474099145);

// during operation we can't mix big int an ordinary number
const hugeNum = 90071992547409919007199254740991n;
const smallNum = 45;

console.log(hugeNum * BigInt(smallNum))

console.log(20n > 15 );
console.log(20n === 20 ); //fail because strict equality doesn't do type coercion
console.log(20n == 20 ); //does type coercion

console.log(hugeNum + ' real huge number');

// console.log(10n / 3 ); // divide with big int
console.log(10n / 3n ); // it scape the decimal of and return the lowest big int 3n 
console.log(10 /3 ); // 3.3333


// DATE
// Z as part of time means: UTC which is the coordinated universal time that is the time without any timezone in London without daylight saving.
const now = new Date();
console.log(now); 

console.log(new Date('Jun 26 2025'))
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2030, 6, 33)); // notice the month is starts from 0, and also the data automatically 
// adjust i.e if the data specified is greater than the number of days for that month it automatically 
// use that date in the next month

console.log(new Date(0)); // to get the unix time 


// working with dates
const future = new Date(2030, 6, 33, 8, 32);
console.log(future); // Fri Aug 02 2030 08:32:00
console.log(future.getFullYear()); // 2030
console.log(future.getMonth()); // 7
console.log(future.getDate()); // 2
console.log(future.getMinutes()); // 32
console.log(future.getHours()); // 8
console.log(future.toISOString()); // give time in UTC standard
console.log(future.getTime()); //1911886320000 (the time from unix time to that date)

console.log(new Date(Date.now())); // to get the current date

// set method for the date

future.setFullYear(2020);
console.log(future);


// calculation involving date
const future = new Date(2030,10,5,8,15);
// console.log(+future); // or use Number to convert to number. it gives the total millisecond from unix date Jan 01, 1970
const past = new Date(2025,10,5);

const yearDiff = (future, past) => {
  const diff = Math.round(Math.abs((future - past ) / (24*60*60*1000)))
  return diff / 365;
};
console.log(new Intl.DateTimeFormat('en-US').format( yearDiff(future,past)));


const num =  38884764.23;
// there are 3 styles we an apply unit, currency, percentage

const options = {
  style: 'currency',
  currency : 'eur'
}

console.log('Germany', new Intl.NumberFormat('de-DE', options).format(num))
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);


// setting time using Time timeout and interval
// SetTimeout : it runs the code in the handler (func.) when the time given to the function as argument has elapsed.
// the timeout arg : first the time followed by other parameter we have

const ingredients = ['pepper', 'tomato', 'garlic'];
const customerAllergy = 'garlic'
const soupTimer = setTimeout(ingredients => console.log(`food ingredients ${[...ingredients]}.`), 
  5000, ingredients)
console.log('Waiting for soup.......')

// the timer will be cleared if the ingredient includes customer allergic ingredient
if (ingredients.includes(customerAllergy)) clearTimeout(soupTimer);

// set interval: it execute the handler at a specified interval
let myHour;
let myMinutes;

setInterval(()=>{
  const now = new Date();
  let hour = now.getHours()
  let minutes = now.getMinutes()

  if (hour !== myHour) {
    myHour = hour;
    console.log(`Hour:${hour}`)
  }
  if (minutes !== myMinutes) {
    myMinutes = minutes
    console.log(`Minutes:${minutes}`);
  }
  console.log(`Seconds: ${now.getSeconds()}`)
}, 3000);
*/
