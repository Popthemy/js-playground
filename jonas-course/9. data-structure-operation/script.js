'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
const getflightCode = str => str.slice(0,3).toUpperCase();

for (const flight of flights.split('+')){
  const [type, from, to , time] = flight.split(';');
  const newType = type.replaceAll('_', '');
  console.log(
    ` ${newType.startsWith('Delayed') ? '❌' : ''} ${newType} ${getflightCode(from)} to ${getflightCode(to)} (${time.replace(':', 'h')})`.padStart(45,'=')
  );
}


const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);



// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  
  //normal ways
  // order: function (startIndex, mainIndex) {
  //   return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
  // },
  // using advance literals for function
  order(startIndex, mainIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: { open: 12, close: 22,
    },
    fri: { open: 11, close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  orderDelivered: function(time=0, meal='rice', customerName='bobo') {
    return `An Order delivered from ${this.name} at ${time} containing ${meal} for ${customerName}`;
  },
};

const days = ['mon', 'tue', 'wed', 'thur', 'fri', 'sat'];
// optional chaining ?. (work like nullish coalescence ) 
// if the value on the left is null it doesn't return instead of error

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'Closed';
  console.log(`we are opened at ${open} on ${day}!`)
}

// option chaining on method checking if a method exist
console.log(restaurant.orderDelivered?.(19, 'indomie', 'titi') ?? "Method doesn't exist");
console.log(restaurant.orderTracking?.() ?? "Method doesn't exist");

// optional chaining on array
const users = [
  {username:'themy', year:200, nationality: 'nigeria'}
]

// console.log(users[0]?.username1 ?? 'user array is empty')

// looping over object properties : key
const properties = Object.keys(restaurant.openingHours);
// console.log(properties);

let openStr = `We are open on ${properties.length} days:`

for (const day of properties) {
  openStr += `${day}, `;
};
// console.log(openStr);

// looping over object properties :values
const values = Object.values(restaurant.openingHours);
// console.log(values);

const entries = Object.entries(restaurant.openingHours);
console.log(entries);

for (const [key, {open, close}] of entries){
  console.log(`On ${key}, we open at ${open} and close at ${close}.`)
}


/* 
// when adding a function the order of the parameter doesn't matter and we can use default value also
restaurant.orderDelivered({
  meal:restaurant.mainMenu.at(-1)
});

const {myTime=0, meal} = {myTime:[0,203], meal:restaurant.mainMenu, customerName:'themy'}
console.log(myTime)
// destructuring of array
// to destruct an object we have to know the name of the variable and the order doesn;t matter

const {name,categories, openingHours} = restaurant;
console.log(name, openingHours, categories);

// we can also change the name of the variable
const { name: restaurantName, categories:courseCategories, openingHours:bizHours } = restaurant;
console.log(restaurantName, courseCategories, bizHours);

// setting default values  
const {menu=[], name:myRestaurantName =[]} = restaurant;
console.log(menu,myRestaurantName);

// mutating values
let a =222;
let b=44;

const obj = {a:3,b:4,r:5};
({a,b} = obj);
console.log(a,b);

const {fri:{open:o, close:c}} = openingHours;
console.log(o,c);



// manual destructuring of array
const arr  = [1,2,3];
const a = arr[0];
const b = arr[1];
const c = arr[2];

console.log(a,b,c);

// Es6 destructuring
const [x,y,z] = arr;
console.log(x,y,z);

// accessing variable while skipping the one we don't need
let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// swapping variables
[secondary, main] = [main, secondary];
// console.log(main, secondary);

console.log(restaurant.order(2,0));
const [start, mainCourse] = restaurant.order(2, 0);
console.log(start,mainCourse);

// nested destructuring

const [q,, [w,r]] =  [1,2,[3.4,5]];
console.log(q,w,r);

// setting default value for the unpacking value: used when we don't know the length of the object
const [k=0,l=0,m=0,n=0] = [1,2];
console.log(k,l,m,n);


// spread operation ...arr . it takes an array like we are writing items separated by comma

const arr = [2,3,5];
const newArr = [9,0, ...arr];
console.log(newArr)
console.log(...newArr) // write the item individually

// it is used to create shallow copy and merge  array
const menuCopy = [...restaurant.mainMenu];
console.log(menuCopy);

const categoriesAndMen = [...restaurant.mainMenu, ...restaurant.categories];
console.log(categoriesAndMen);

// spread operator works on iterable(set,string,arr,maps) and object


// Rest operator : it is used to pack arr. it is on the LHS while spread is on the RHS

const [i,j,k, ...others] = [1,2,3,4,5,6,7];
console.log(i,j,k,others);

// the rest element must be the last element and it doesn't include skipped element
const [menu1, , , menu3, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu1, menu3, otherFood)

const {sat, ...workDays } = {...restaurant.openingHours};
console.log(sat, workDays);

//Rest is used when we will write variable separated by commas, while spread when we will write values seperated

// && and || operator . that take any data type and return any data type
// || it return the first truthy value or last falsy value

console.log(3 || 0); 

// && it return the last truthy value or first element if it is falsy
console.log('nice' && 'bobo')
console.log(0 && 'bobo')



// nullish coalesce work with undefined or null value ??

restaurant.numGuest = 0;
const guests =  restaurant.numGuest || 10;
console.log(guests);

// nullish operator ?? : in case where the value is zero it displays the real value unlike ||
const guestCorrect = restaurant.numGuest ?? 10;
console.log(guestCorrect);

// logical assignment operator 

const rest1 = {
  name: 'Chciken republic',
  guest: 0,
  owner: 'Mr. Tunde'
}

const rest2 = {
  name: 'Ya koyo',
  deal: 2
}

// logical ||= when a value is set to 0 it assign a new value to it
// rest1.guest ||= 10
// rest2.guest ||= 10

// nullish assignment operator(null or undefined)
rest1.guest ??= 10
rest2.guest ??= 10

// AND assignment operator (check and set the value to anonymous)

rest1.owner = rest1.owner && '<anonymous>';
rest2.owner = rest2.owner && '<anonymous>';


rest1.owner &&= '<anonymous>'; // if first value is not present it return the first falsy value
rest2.owner &&= '<anonymous>'; // if the value is present set anonymous as the truthy value

console.log(rest1, rest2)
*/

const odds = {
  team1: 1.33,
  x: 3.25,
  team2: 6.5,
};


const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [ 'Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies', 'Kimmich', 'Goretzka', 'Coman', 'Muller', 'Gnarby', 'Lewandowski'],
    [ 'Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze'],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  // es6 ways of object literals
  odds,
};

const [player1, player2] = game.players;
const [gk1, ...fieldPlayers1] = player1;
const [gk2, ...fieldPlayers2] = player2;

// console.log(gk, fieldPlayers);

const allPlayers = [...player1, ...player2]
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...player1]
// console.log(players1Final);

const {team1, x:draw, team2} = game.odds
// const {odd:{team1, x:draw, team2}} = game;

game.printGoals = function (...players) {
  return  `${players.length} goal were scored`;
};

// console.log(game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich'));
// console.log(game.printGoals(...game.scored));

// allPlayers.forEach(element => console.log(element));

game.won = function(teamA, teamB){
  teamA < teamB && console.log(`${teamA} is likely to win`);
  teamA > teamB && console.log(`${teamB} is likely to win`);
};

// game.won(team1, team2);

// for-of each . When we need only the item we use item , if we need index access .entries()\
// for (const item of allPlayers) console.log(` first example ${item}`);

// for (const [i, el] of allPlayers.entries())  console.log(` second example ${i +1}: ${el}`);

// console.log(game);

